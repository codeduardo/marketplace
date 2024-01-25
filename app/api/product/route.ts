import { NextRequest, NextResponse } from "next/server";
import db from "@/app/libs/prismadb";

export const GET = async () => {
  const listProduct = await db.product.findMany();
  return NextResponse.json(listProduct);
};
export const POST = async (request: NextRequest) => {
  const data = await request.json();

  const newProduct = await db.product.create({ data });
  if (!newProduct)
    return NextResponse.json(
      {
        error: "el correo ya existe",
      },
      { status: 400 }, //BAD REQUEST
    );
  return NextResponse.json("Producto creado exitosamente");
};
export const PUT = async (request: NextRequest, { params }) => {
  console.log(params.id);
  const data = await request.json();
  const newProduct = await db.product.update({
    where: {
      id: params.id,
    },
    data,
  });
  console.log(newProduct);
  return NextResponse.json("Producto actualizado correctamente");
};
