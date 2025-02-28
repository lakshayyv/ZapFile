import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUploadValidator, FileUploadValidatorType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "sonner";
import { upload } from "@/actions/file";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { mutate } from "swr";

export default function FileUpload() {
  const { edgestore } = useEdgeStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressVisible, setProgressVisible] = useState(false);

  const form = useForm<FileUploadValidatorType>({
    resolver: zodResolver(FileUploadValidator),
    defaultValues: {
      description: "",
      passkey: "",
      file: undefined,
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setSelectedFile(file);
        form.setValue("file", file);
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  async function onSubmit(values: FileUploadValidatorType) {
    setProgressVisible(true);
    try {
      if (!values.file) {
        toast.error("Please upload a file before submitting.");
        return;
      }

      const store_response = await edgestore.publicFiles.upload({
        file: values.file,
        options: {
          temporary: true,
        },
        onProgressChange: (progress) => {
          setProgress(progress);
        },
      });

      const db_response = await upload({
        name: values.file.name,
        passkey: values.passkey,
        description: values.description || undefined,
        url: store_response.url,
      });
      await edgestore.publicFiles.confirmUpload({ url: store_response.url });
      mutate("/api/files");
      toast.success(db_response.message || "File uploaded successfully");
    } catch (error: any) {
      toast.error(error.message || "Error uploading file");
    }
    setProgressVisible(false);
    setProgress(0);
    form.reset();
    setSelectedFile(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Upload a file</h1>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a description (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passkey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passkey</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a passkey to access the file"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel>Upload File</FormLabel>
              <FormControl>
                <div
                  {...getRootProps()}
                  className={`border-2 bg-transparent border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
                    isDragActive
                      ? "border-purple-600"
                      : "border-gray-600 bg-black-600"
                  }`}
                >
                  <input {...getInputProps()} />
                  <UploadCloud className="mx-auto w-10 h-10 text-gray-500" />
                  <p className="text-gray-600">
                    {isDragActive
                      ? "Drop the file here..."
                      : "Drag & drop a file here, or click to browse"}
                  </p>
                  {selectedFile && (
                    <p className="mt-2 text-purple-600 font-medium">
                      {selectedFile.name}
                    </p>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {progressVisible && (
          <div className="h-2 border border-white rounded overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-150"
              style={{ width: progress + "%" }}
            />
          </div>
        )}
        <Button
          type="submit"
          disabled={progressVisible}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
        >
          {progressVisible ? `Uploading ${Math.floor(progress)}%` : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
