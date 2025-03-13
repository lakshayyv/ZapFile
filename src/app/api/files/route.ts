import { NextRequest, NextResponse } from "next/server";
import client from "@/config/db";
import { getServerSession } from "next-auth";
import { CustomError, ErrorHandler } from "@/lib/error";
import { AUTH_OPTIONS } from "@/lib/auth";

const handler = async (req: NextRequest) => {
  try {
    const session = await getServerSession(AUTH_OPTIONS);
    if (session && session.user) {
      if (req.method === "GET") {
        const response = await client.file.findMany({
          where: { userId: session.user.id },
        });
        return NextResponse.json(
          { message: "Files fetched successFully", data: response },
          { status: 200 }
        );
      }
    } else {
      throw new CustomError("Unauthorized", 401);
    }
  } catch (error) {
    return ErrorHandler(error);
  }
};

export { handler as GET };
