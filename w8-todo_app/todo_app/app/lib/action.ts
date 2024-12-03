'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { TaskFormValues } from "../ui/version_3/new_task";
import { getToken } from "./utility";
import { LoginFormValues } from "../ui/version_3/login_form";
import { cookies } from "next/headers";
import { RegisterFormValues } from "../ui/version_3/register_form";

export async function goToLogin() {
    cookies().delete('accessToken')
    redirect("/version-3/login")
}

export async function loginAction(data: LoginFormValues) {
    try {
        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: data.username,
                password: data.password
            })
        })

        if(!response.ok){
            throw new Error(`${response.status}`)
        }

        const result = await response.json()
        cookies().set('accessToken', result.accessToken, {
            maxAge: 60*60
        })
    }
    catch (error) {
        throw error
    }

    redirect('/version-3')
}

export async function registerAction(data: RegisterFormValues) {
    try {
        const response = await fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: data.email,
                username: data.username,
                password: data.password
            })
        })

        if(!response.ok){
            throw new Error(`${response.status}`)
        }
    }
    catch (error) {
        throw error
    }

    redirect('/version-3/login')
}

export async function addTask(data: TaskFormValues) {
    try {
        const response = await fetch('http://localhost:3001/tasks', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${getToken()}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: data.name,
                startDate: data.startDate,
                endDate: data.endDate,
                completed: "0"
            })
        })

        if(!response.ok){
            throw new Error(`${response.status}`)
        }
    }
    catch (error) {
        throw error
    }

    revalidatePath('/version-3')
    redirect('/version-3')
}

export async function removeTask(taskId: string) {
    try {
        const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        })

        if(!response.ok){
            throw new Error(`${response.status}`)
        }
    }
    catch (error) {
        throw error
    }

    revalidatePath('/version-3')
    redirect('/version-3')
}

export async function toggleTaskCompletion(taskId: string) {
    try {
        const response = await fetch(`http://localhost:3001/tasks/toggle/${taskId}`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
        })

        if(!response.ok){
            throw new Error(`${response.status}`)
        }
    }
    catch (error) {
        throw error
    }

    revalidatePath('/version-3')
    redirect('/version-3')
}