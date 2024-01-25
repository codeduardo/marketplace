import { NextRequest, NextResponse } from "next/server";
import db from "@/app/libs/prismadb";
import bcrypt from "bcrypt";

export const POST = async (request: NextRequest) => {
  const data = (await request.json()) as {
    name: string;
    email: string;
    password: string;
  };

  const user = await db.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (user) {
    return NextResponse.json(
      {
        error: "el correo ya existe",
      },
      { status: 409 }, //CONFLICT
    );
  }

  const newPassword = await bcrypt.hash(data.password, 10);

  await db.user.create({ data: { ...data, password: newPassword } });

  return NextResponse.json(
    {
      message: "usuario creado correctamente",
    },
    { status: 201 },
  );
};
