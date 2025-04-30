import { createFileRoute } from '@tanstack/react-router'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { useToast } from '@/hooks/use-toast';
import {z} from "zod";
interface Data{
    email:string;
    password:string;
}
const userSchema=z.object({
  email:z.string().email("Invalid email"),
  password:z.string().min(8,"password must be atleast 8 characters").max(20,"password must be less than 20 characters"),
})
export const Route = createFileRoute('/login')({
  component: RouteComponent,
})


function RouteComponent() {
    const router=useRouter();
    const { toast } = useToast();
  const {register, handleSubmit, formState:{errors},reset}=useForm({
          resolver:zodResolver(userSchema),
          defaultValues:{
              email:"",
              password:"",
          }
      })
      const onSubmit=(data:Data)=>{
        try{
          fetch("http://localhost:5000/login",{

              method:"POST",
              headers:{
                  "Content-Type":"application/json",
              },
              body:JSON.stringify(data),
          }).then(async (res)=>{
              if(res.ok){
                toast({
                  title: "Login successful",
                  description: "You have successfully logged in.",
                  duration: 3000,
                  variant:'success'
                });
                 const responseData=await res.json();
                 const token=responseData.token;
                  localStorage.setItem("token",token);
                router.navigate({to:"/"})


              }
              else{
                const errorData=await res.json();
                toast({
                  title: "Invalid credentials",
                  description: errorData.message,
                  duration: 3000,
                  variant:'destructive'
                });
              }
              router.navigate({to:"/signup"})
          })
        }
        catch(err){
            console.log(err);
        }
          reset();
      }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <Card className="w-96 h-96 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-2">
        <label>Email</label>
        <input id="email" type="email" className="border rounded-md" placeholder="" {...register("email")}/>
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
        <div className="grid grid-cols-1 gap-2">
        <label>Password</label>
        <input id="password"className="border rounded-md" type="password" placeholder="" {...register("password")}/>
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>
        <Button type="submit" className="mt-4 w-full bg-blue-500 text-white hover:bg-blue-600">
            Login
        </Button>
        </form>
        <div className="flex flex-row justify-evenly mt-10">
        <p >Don't have an account</p>
        <a href="/signup" className='text-blue-500 hover:underline'>Signup</a>
        </div>
    </Card>
    </div>
);
}
