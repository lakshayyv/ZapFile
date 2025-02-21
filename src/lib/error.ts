import { NextResponse } from "next/server";

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export function ErrorHandler(error: any) {
  if (error instanceof CustomError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }
  return NextResponse.json(
    { message: "Somthing went wrong", data: error },
    { status: 500 }
  );
}
