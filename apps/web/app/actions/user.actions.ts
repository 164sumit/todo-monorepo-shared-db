
// // 'use server'
// // import { AuthError, CredentialsSignin } from "next-auth";

// import { PrismaClient } from ".prisma/client";
// import { signOut } from "@/auth";

// // import { auth, signIn, signOut } from "@/app/auth";


// // // import { signIn, signOut } from "@/auth";

// // export const signInWithGoogle = async () => {
// //     await signIn("google");
// // }

// // export const signinWithGitHub = async () => {
// //     await signIn("github");
// // }

// export const signout = async () => {
//     await signOut();
// }

// // export const signInWithCreds = async (email: string, password: string, redirect: boolean = false) =>  {
// //     try {
        
// //        await signIn("credentials", {
// //             email,
// //             password,
// //         })
       
// //     } catch (error) {
// //       if(error instanceof AuthError){
// //         console.log(Date.now(),error.cause?.err?.message);
        
// //         return {error:error.cause?.err?.message}
// //         // switch(error.type){
// //         //   case "CredentialsSignin":
// //         //   default:
// //         //     return {error:"something went wrong"}
// //         // }
// //       }
// //       throw error
// //     }

// // }





// // interface User {
// //   name: string;
// //   email: string;
// //   password: string;
// //   userType: string;
// // }

// export async function registerUser(formData:any): Promise<any> {
//   try {
//     const prisma = new PrismaClient();
//     const user=await prisma.user.create(formData);
//     return {
//       succes:true
//     }
    
//   } catch (error:any) {
    
//     // return {
//     //   succes:false
//     // }
//     throw new Error(error.message)
    
//   }
   
// }