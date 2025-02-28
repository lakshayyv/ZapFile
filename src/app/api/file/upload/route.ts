import { AUTH_OPTIONS } from "@/lib/auth";
import { CustomError, ErrorHandler } from "@/lib/error";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import client from "@/config/db";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(AUTH_OPTIONS);
    const payload = await req.json();
    payload.passkey = bcrypt.hashSync(
      payload.passkey,
      Number(process.env.SALT_ROUNDS) || 10
    );
    if (!(session && session.user)) {
      throw new CustomError("Unauthorized", 401);
    }
    const response = await client.file.create({
      data: {
        name: payload.name,
        url: payload.url,
        description: payload.description || null,
        passkey: payload.passkey,
        userId: session.user.id,
        public_token: session.user.public_token,
        expiry: new Date(),
      },
    });
    return NextResponse.json({ message: "File uploaded successfully" });
  } catch (error) {
    return ErrorHandler(error);
  }
};
