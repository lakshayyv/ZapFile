import client from "@/config/db";
import { ErrorHandler } from "@/lib/error";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const { id } = await context.params;
    const response = await client.file.findUnique({ where: { id: id } });
    if (response) {
      return NextResponse.json(
        {
          message: "File fetched successfully",
          data: response,
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        message: "File doest exist",
      },
      { status: 404 }
    );
  } catch (error) {
    return ErrorHandler(error);
  }
};

export const DELETE = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  try {
    const { id } = await context.params;
    const response = await client.file.delete({ where: { id: id } });
    if (response) {
      return NextResponse.json(
        {
          message: "File deleted successfully",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "File does not exist" },
      { status: 200 }
    );
  } catch (error) {
    return ErrorHandler(error);
  }
};
