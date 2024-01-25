import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient = (global as any).prismadb ?? new PrismaClient();

export default prisma;
if (process.env.NODE_ENV !== "production") (global as any).prismadb = prisma;
