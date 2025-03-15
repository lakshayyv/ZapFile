import client from "@/config/db";
import { ErrorHandler } from "@/lib/error";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  try {
    const { id } = await req.query;
    const response = await client.file.findUnique({
      where: { id: id as string },
    });
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

export const DELETE = async (req: NextApiRequest) => {
  try {
    const { id } = await req.query;
    const response = await client.file.delete({ where: { id: id as string } });
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
