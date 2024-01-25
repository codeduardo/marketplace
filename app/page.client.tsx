"use client";

import { Input } from "@/components/ui/input";
import { Header } from "./Header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AiFillEdit } from "react-icons/ai";
import { useAppSelector } from "@/redux/hooks";
import { DialogDemo } from "./components/modal";

type ProductsProps = {
  id: string;
  name: string;
  price: string;
  weight: string;
  package: string;
  unit: string;
};
export default function Home({ products }: { products: ProductsProps[] }) {
  const session = useAppSelector((store) => store.sessionReducer);
  return (
    <main className="min-h-scree pt-[20%]">
      <Header />

      <h2 className="text-center text-2xl text-white"> Buscar Producto </h2>
      <div className="flex w-full max-w-sm items-center space-x-2 p-4">
        <Input
          type="email"
          placeholder="producto..."
          className="text-black focus:outline-none"
        />
        <Button type="submit">Buscar</Button>
      </div>
      <div className="h-[420px] overflow-auto px-4 ">
        <Table className="rounded-lg border border-white">
          {products.length === 0 && (
            <TableCaption>No existen productos.</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead className="text-black">Nombre</TableHead>
              <TableHead className="w-auto text-black">Precio</TableHead>
              {session && <TableHead className="t w-auto"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  {product.name}-{product.package}-{product.unit}-
                  {product.weight}
                </TableCell>
                <TableCell>{product.price}</TableCell>
                {session && (
                  <TableCell className="cursor-pointer text-primary">
                    <DialogDemo id={product.id}>
                      <AiFillEdit className="text-xl" />
                    </DialogDemo>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
