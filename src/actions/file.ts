import axios, { isAxiosError } from "axios";

export const upload = async (payload: {
  name: string;
  passkey: string;
  description?: string;
  url: string;
}) => {
  try {
    const response = await axios.post("/api/file/upload", payload);
    return { data: response.data };
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.data.data.code === "P2002") {
        return { error: "File already exists" };
      }
    }
    return { error: "Error uploading file" };
  }
};

export const deleteById = async (id: string) => {
  try {
    const response = await axios.delete(`/api/file/${id}`);
    return { data: response.data };
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    return { error: "Error uploading file" };
  }
};
