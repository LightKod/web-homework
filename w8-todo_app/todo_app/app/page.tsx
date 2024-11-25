'use client'

import { useEffect, useState } from "react"
import { Filter, Task } from "./lib/definition"
import ToolBar from "./ui/version_1/toolbar"
import TaskList from "./ui/version_1/task_list"
import clsx from "clsx"

export default function Page() {
  const [isAppInitialized, setIsAppInitialized] = useState<boolean>(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<Filter>({})

  const handleAddTask = (name: string, startDate: string, endDate: string) => {
    setTasks([...tasks, { id: Date.now().toString(), name, startDate, endDate, completed: false }])
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(
      tasks.filter((task: Task) =>
        task.id !== taskId
      )
    )
  }

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task: Task) => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const handleFilterChange = (value: Filter) => {
    setFilter(value)
  }

  // GET/SAVE DATA
  useEffect(() => {
    const savedTasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]")
    setTasks(savedTasks)
    setIsAppInitialized(true)
  }, [])

  useEffect(() => {
    if(isAppInitialized) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks, isAppInitialized])

  const [verySecretBgImage, setVerySecretBgImage] = useState<boolean>(false)

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-y-4 w-full p-6 sm:p-6">
        <div onClick={() => setVerySecretBgImage((prev) => !prev)} className={clsx(
          "w-full flex items-end p-4 rounded-md relative overflow-hidden",
          {
            "bg-gradient-to-tr from-violet-600 to-sky-600 h-48": !verySecretBgImage,
            "h-96 bg-cover bg-no-repeat bg-center bg-[url('https://64.media.tumblr.com/37793d1130587f23a1a96e09f45956d3/1180627617cec052-77/s500x750/0978efa9ec52aa9cd87139cbca52f9dfb77ef4ee.jpg')]": verySecretBgImage
          }
        )}>
          <h1 className="text-violet-50 text-3xl font-extrabold md:text-4xl">{verySecretBgImage ? "Tasks are everywhere ahhh" : "Todo App (Ver 1)"}</h1>
          <img src="/complete_mark.png" alt="backdrop" className={clsx(
            "absolute z-10 -top-24 -right-24 -rotate-[25deg] w-72 md:w-96",
            {
              "hidden": verySecretBgImage
            }
          )}/>
        </div>
        <ToolBar addTask={handleAddTask} changeFilter={handleFilterChange}/>
        <TaskList tasks={tasks} filter={filter} deleteTask={handleDeleteTask} toggleTaskCompletion={toggleTaskCompletion}/>
      </div>
    </div>
  )
}
