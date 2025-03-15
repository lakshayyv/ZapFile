import client from "@/config/db";
import { ErrorHandler } from "@/lib/error";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { user: string } }
) => {
  try {
    const { user } = await context.params;
    const response = await client.file.findMany({
      where: { public_token: user },
    });
    return NextResponse.json(
      {
        message: "Files fetched successfully",
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return ErrorHandler(error);
  }
};
