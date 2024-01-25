import { NextRequest, NextResponse } from "next/server";
import db from "@/app/libs/prismadb";

export const GET = async (request: NextRequest, { params }) => {
  const product = await db.product.findFirst({ where: { id: params.id } });
  if (!product)
    return NextResponse.json({ message: "encontrado" }, { status: 404 });

  return NextResponse.json(product);
};
export const PUT = async (request: NextRequest, { params }) => {
  const data = await request.json();
  await db.product.update({
    where: {
      id: params.id,
    },
    data,
  });
  return NextResponse.json("Producto actualizado correctamente");
};

export const DELETE = async (request: NextResponse, { params }) => {
  await db.product.delete({
    where: { id: params.id },
  });
  return NextResponse.json("Producto eliminado correctamente");
};
