"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addUser = async ({name,email,password}:any) => {
  try {
    
    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    console.log("User created!");
    return {
      succes:true
    }
  } catch (error:any) {
    throw new Error(error)
  }
};
