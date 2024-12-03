'use client'

import { registerAction } from "@/app/lib/action"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"

const registerSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format")
})

export type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterForm() {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = (data: RegisterFormValues) => {
        registerAction(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-96 p-6 flex flex-col gap-y-4 bg-white rounded-md shadow-md">
            <div className="w-full rounded-md bg-gradient-to-tr from-sky-600 to-violet-600 h-16"/>
            <div className="flex flex-col gap-y-2">
                <h1 className="font-extrabold text-2xl text-gray-950 text-end">Register</h1>
                <p className="text-xs text-gray-500 text-end">Complete and submit the below form to create an account</p>
                <p className="text-xs text-gray-500 text-end">Already had an account? {' '}
                    <Link href="/version-3/login" className="underline hover:text-violet-800 transition-colors duration-300">Login</Link>
                </p>
            </div>
            <div className="relative mt-2 flex flex-col">
                <input {...register("email")} type="email" id="email" className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" "/>
                <label htmlFor="email" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Email</label>
                {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
            </div>
            <div className="relative mt-2 flex flex-col">
                <input {...register("username")} type="text" id="username" className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" "/>
                <label htmlFor="username" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Username</label>
                {errors.username && <p className="text-red-500 text-xs mt-2">{errors.username.message}</p>}
            </div>
            <div className="relative mt-2 flex flex-col">
                <input {...register("password")} type="password" id="password" className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" "/>
                <label htmlFor="password" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Password</label>
                {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
            </div>
            <button type="submit" className="text-violet-50 min-w-full text-sm font-semibold border-2 border-gray-950 bg-gray-950 py-2.5 w-full rounded-md hover:border-violet-800 hover:bg-violet-800 md:min-w-0 transition-colors duration-300">Login</button>
        </form>
    )
}