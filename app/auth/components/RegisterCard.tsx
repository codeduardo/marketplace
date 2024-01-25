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
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { toast } from "react-toastify";

export const RegisterCard = ({
  setTab,
}: {
  setTab: Dispatch<SetStateAction<string>>;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    if (!name) return setErrors((prev) => ({ ...prev, name: true }));
    if (!email) return setErrors((prev) => ({ ...prev, email: true }));
    if (!password) return setErrors((prev) => ({ ...prev, password: true }));
    const body = { name, email, password };

    await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(async (res) => {
      const result = await res.json();
      if (res.ok) {
        toast.info("Usuario creado !", {
          theme: "dark",
        });
        setErrors({
          name: false,
          email: false,
          password: false,
        });
        if (formRef.current) {
          formRef.current.reset();
        }
        setTab("login");
      } else {
        return toast.error(result.error);
      }
    });
  };

  return (
    <Card>
      <form ref={formRef} onSubmit={handleSubmit}>
        <CardHeader className="text-center">
          <CardTitle>Registrarse</CardTitle>
          <CardDescription>Registre un usuario.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="current">Usuario</Label>
            <Input id="name" type="text" name="name" />
            {errors.name && (
              <span className="text-[13px] text-red-700">
                Ingrese un usuario
              </span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="current">Correo</Label>
            <Input id="email" type="email" name="email" />
            {errors.email && (
              <span className="text-[13px] text-red-700">
                Ingrese un correo
              </span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="new">Contraseña</Label>
            <Input id="password" type="password" name="password" />
            {errors.password && (
              <span className="text-[13px] text-red-700">
                Ingrese una contraseña
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Registrarse</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
