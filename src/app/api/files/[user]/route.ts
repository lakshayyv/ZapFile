import client from "@/config/db";
import { ErrorHandler } from "@/lib/error";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest) => {
  try {
    const { user } = await req.query;
    const response = await client.file.findMany({
      where: { public_token: user as string },
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
