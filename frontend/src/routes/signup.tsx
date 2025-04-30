import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useToast } from "@/hooks/use-toast"
import { z } from 'zod';
interface Data{
  name:string;
  email:string;
  password:string;
}
const userSchema=z.object({
name:z.string().min(3,"name must be atleast 3 characters").max(20,"name must be less than 20 characters"),
email:z.string().email("Invalid email"),
password:z.string().min(8,"password must be atleast 8 characters").max(20,"password must be less than 20 characters"),
})

export const Route = createFileRoute('/signup')({
  component: RouteComponent,
})


function RouteComponent() {
  const { toast } = useToast();
   const {register, handleSubmit, formState:{errors},reset}=useForm({
            resolver:zodResolver(userSchema),
            defaultValues:{
                email:"",
                password:"",
            }
        })
        const onSubmit=(data:Data)=>{
          fetch("https://login-signup-auth-using-jwt.onrender.com/signup",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
          }).then((res)=>{
            if(res.ok){
              toast({
                title: "User created successfully",
                variant:"success",
            })
          }
            else{
              toast({
                title: "User already exists",
                variant: "destructive",
            })
            }
          })
          reset();
      }
  return <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
    <Card className="w-96 h-96 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-2">
        <label>Username</label>
        <input id="name" type="text" className="border rounded-md" placeholder="" {...register("name")}/>
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>
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
            Signup
        </Button>
        </form>
        
    </Card>
  </div>
}
