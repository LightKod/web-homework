import { Task } from "@/app/lib/definition";
import { getToken } from "@/app/lib/utility";
import TaskListContent from "./task_list_content";

export default async function TaskList({
    name,
    completed
} : {
    name: string,
    completed: string
}) {
    let tasks: Task[] = []

    try {
        const response = await fetch(`http://localhost:3001/tasks?name=${name}${completed !== '' ? `&completed=${completed}` : ''}`, {
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        if(response.status === 401) {
            throw new Error("401")
        }
        if(!response.ok) {
            throw new Error("Something went wrong")
        }

        const data = await response.json()
        tasks = data.tasks.map((item: any) => ({
            id: item.id,
            name: item.name,
            startDate: item.startDate.split("T")[0],
            endDate: item.endDate.split("T")[0],
            completed: item.completed
        }))
    }
    catch (error) {
        throw error 
    }

    return (
        <TaskListContent tasks={tasks}/>
    )
}