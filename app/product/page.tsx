"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Header } from "../Header";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRef } from "react";
import { api } from "@/api";
type Inputs = {
  name: string;
  price: string;
  weight: string;
  package: string;
  unit: string;
};
const ProductPage = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { reset, register, handleSubmit, setValue, watch } = useForm<Inputs>({
    defaultValues: {
      name: "",
      price: "",
      weight: "",
      package: "unidad",
      unit: "x1",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const product = await api.product.create(data);
    if (!product) return;
    if (product) {
      toast.info("Producto creado correctamente!", {
        theme: "dark",
      });
    }
    if (formRef.current) {
      formRef.current.reset();
    }
    reset();
  };
  return (
    <>
      <Header />
      <div className="w-full px-4 pt-[20%]">
        <Card>
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Crear producto</CardTitle>
              <CardDescription>Ingrese datos de su producto.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full grid-cols-2 items-center gap-4">
                <div className="col-span-2 flex flex-col space-y-1.5">
                  <Label htmlFor="name">Nombre del producto</Label>
                  <Input
                    className="text-black"
                    id="name"
                    placeholder="..."
                    {...register("name", {
                      required: {
                        value: true,
                        message: "",
                      },
                    })}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="package">Empaque</Label>
                  <Select
                    onValueChange={(e) => {
                      setValue("package", e);
                    }}
                    value={watch("package")}
                  >
                    <SelectTrigger id="package" className="text-black">
                      <SelectValue placeholder="..." />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="unidad">unidad</SelectItem>
                      <SelectItem value="bolsa">bolsa</SelectItem>
                      <SelectItem value="botella">botella</SelectItem>
                      <SelectItem value="caja">caja</SelectItem>
                      <SelectItem value="lata">lata</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="weight">{`Peso (Kilo,Litro,...)`}</Label>
                  <Input
                    className="text-black"
                    id="weight"
                    placeholder="..."
                    {...register("weight", {
                      required: {
                        value: true,
                        message: "Este campo es requerido peso",
                      },
                    })}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="unit">Unidad</Label>
                  <Select
                    onValueChange={(e) => {
                      setValue("unit", e);
                    }}
                    value={watch("unit")}
                  >
                    <SelectTrigger id="unit">
                      <SelectValue placeholder="x1" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="x1">x1</SelectItem>
                      <SelectItem value="x2">x2</SelectItem>
                      <SelectItem value="x3">x3</SelectItem>
                      <SelectItem value="x4">x4</SelectItem>
                      <SelectItem value="x6">x6</SelectItem>
                      <SelectItem value="x12">x12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="price">Precio</Label>
                  <Input
                    className="text-black"
                    id="price"
                    placeholder="..."
                    {...register("price", {
                      required: {
                        value: true,
                        message: "",
                      },
                    })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>Limpiar</Button>
              <Button variant="secondary" type="submit">
                Guardar
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ProductPage;
