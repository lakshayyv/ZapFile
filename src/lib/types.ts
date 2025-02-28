import z from "zod";

export type FileType = {
  id: string;
  name: string;
  description?: string;
  url: string;
  public_token: string;
  passkey: string;
};

export const FileUploadValidator = z.object({
  description: z.string().optional(),
  passkey: z.string().min(1, "This field is required"),
  file: z
    .instanceof(File, { message: "File is required" })
    .refine((file) => file !== undefined, { message: "File is required" }),
});

export type FileUploadValidatorType = z.infer<typeof FileUploadValidator>;
