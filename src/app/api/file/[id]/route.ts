import client from "@/config/db";
import { ErrorHandler } from "@/lib/error";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = await params;
    const response = await client.file.delete({ where: { id: id } });
    if (response) {
      return NextResponse.json({
        message: "File deleted successfully",
      });
    }
    return NextResponse.json({ message: "File does not exist" });
  } catch (error) {
    return ErrorHandler(error);
  }
};
