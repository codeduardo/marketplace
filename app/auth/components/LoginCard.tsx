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
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
};
export const LoginCard = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await signIn("credentials", { ...data, redirect: false });
    if (!res?.ok) {
      return toast.error("Error al intentar ingresar.", {
        theme: "dark",
      });
    }
    router.push("/");
  };
  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="text-center">
          <CardTitle>Inicio de sesión</CardTitle>
          <CardDescription>
            Ingrese con un usuario y una contraseña
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "Escribe una email.",
                },
              })}
            />
            {errors.email && (
              <span className="text-[13px] text-red-700">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="******"
              {...register("password", {
                required: {
                  value: true,
                  message: "Escribe una contraseña.",
                },
              })}
            />
            {errors.password && (
              <span className="text-[13px] text-red-700">
                {errors.password.message}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button>Ingresar</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
