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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "../../Header";
import { LoginCard } from "../components/LoginCard";
import { RegisterCard } from "../components/RegisterCard";
import { useState } from "react";

const LoginPage = () => {
  const [tab, setTab] = useState<string>("login");
  return (
    <div>
      <div className=" flex justify-center pt-[20%] align-middle text-white">
        <Header />
        <div className="grid w-full px-4">
          <Tabs defaultValue={tab} className="w-full ">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Ingresar</TabsTrigger>
              <TabsTrigger value="register">Registrar</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginCard />
            </TabsContent>
            <TabsContent value="register">
              <RegisterCard setTab={setTab} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
