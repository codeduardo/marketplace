import { api } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IoMdTrash } from "react-icons/io";

type Inputs = {
  name: string;
  price: string;
  weight: string;
  package: string;
  unit: string;
};

export function DialogDemo({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  useEffect(() => {
    (async () => {
      const {
        name,
        price,
        weight,
        package: packageProduct,
        unit,
      } = await api.product.getById(id);
      reset({ name, price, package: packageProduct, unit, weight });
    })();
  }, []);

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
    const res = await api.product.update(id, data);
    if (!res) return toast.error("No se puedo actualizar", { theme: "dark" });
    return toast.success("Actualizado correctamente", { theme: "dark" });
  };
  const handleDelete = async (id: string) => {
    const res = await api.product.delete(id);
    if (!res) return toast.error("No se puedo eliminar", { theme: "dark" });
    return toast.success("Eliminado correctamente", { theme: "dark" });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[90%] rounded-md sm:max-w-[425px]">
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <IoMdTrash
              className="cursor-pointer text-2xl"
              onClick={() => handleDelete(id)}
            />
            <DialogTitle>Editar producto</DialogTitle>
          </DialogHeader>
          <div className="grid w-full grid-cols-2 items-center gap-4 pt-4">
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
          <DialogFooter className="pt-4">
            <Button type="submit">Guardar cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
