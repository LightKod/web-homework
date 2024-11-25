'use client'

import { Filter, Task } from "@/app/lib/definition";
import { TrashIcon, CheckIcon } from "@heroicons/react/24/outline";
import { CalendarIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function TaskList({ 
    tasks,
    filter,
    deleteTask,
    toggleTaskCompletion
} : {
    tasks: Task[],
    filter: Filter,
    deleteTask: (taskId: string) => void,
    toggleTaskCompletion: (taskId: string) => void
}) {
    const today = new Date(Date.now())

    let filteredTasks = [...tasks]
    if(filter.name) {
        filteredTasks = filteredTasks.filter((task) => 
            task.name.toLowerCase().includes(filter.name!.toLowerCase())
        )
    }
    if(filter.completed !== undefined) {
        filteredTasks = filteredTasks.filter((task) => 
            task.completed === filter.completed
        )
    }

    return (
        <>
            {filteredTasks.map((task: Task, index: number) => {
                const startDate = new Date(task.startDate)
                const endDate = new Date(task.endDate)

                return (
                    <div key={index} className={clsx(
                        "flex w-full",
                        {
                            "divide-x-2 divide-gray-300 divide-dashed": !task.completed
                        }
                    )}>
                        <div className="grid grid-cols-[6fr_4fr_1fr] gap-2 items-center grow p-4 bg-white rounded-md shadow-md relative overflow-hidden">
                            <p className="absolute text-gray-950 font-black opacity-15 text-6xl -left-6 top-1/2 -translate-y-1/2 italic">{`#${index + 1}`}</p>
                            <p className={clsx(
                                "text-sm text-gray-950 font-semibold",
                                {
                                    "line-through": task.completed
                                }
                            )}>
                                {task.name}
                            </p>
                            <div className="w-full flex flex-col gap-y-2 items-center">
                                <div className="hidden gap-x-2 text-gray-500 items-center md:flex">
                                    <CalendarIcon className="w-4 shrink-0"/>
                                    <p className="text-sm text-center">{`${task.startDate} ~ ${task.endDate}`}</p>
                                </div>
                                <div className={clsx(
                                    "px-4 py-2 text-xs text-violet-50 font-semibold rounded-md transition-all duration-300",
                                    {
                                        "bg-gray-500":  !task.completed && startDate > today,
                                        "bg-blue-600": !task.completed && startDate <= today && endDate >= today,
                                        "bg-red-600": !task.completed && endDate < today,
                                        "bg-green-600": task.completed
                                    }
                                )}>
                                    {
                                        !task.completed && startDate > today ? "Todo" 
                                        : !task.completed && startDate <= today && endDate >= today ? "Ongoing" 
                                        : !task.completed && endDate < today ? "Overdue"
                                        : "Completed"
                                    }
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button onClick={() => deleteTask(task.id)} className="text-gray-950 hover:text-red-600 transition-all duration-300">
                                    <TrashIcon className="w-5"/>
                                </button>
                            </div>
                        </div>
                        {task.completed ? (
                            <button type="button" onClick={() => toggleTaskCompletion(task.id)} className="flex items-center justify-center h-full min-w-[4rem] shrink-0 p-4 md:min-w-[5.75rem]">
                                <div className="w-full h-full bg-contain bg-no-repeat bg-center bg-[url('/complete_mark.png')]"/>
                            </button>
                        ) : (
                            <button type="button" onClick={() => toggleTaskCompletion(task.id)} className="flex items-center justify-center h-full min-w-[4rem] shrink-0 p-4 bg-white rounded-md shadow-md text-gray-950 hover:text-violet-800 md:min-w-[5.75rem] transition-all duration-300">
                                <CheckIcon className="w-5"/>
                            </button>
                        )}
                    </div>
                )
            })}
        </>
    )
}