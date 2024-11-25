'use client'

import { createContext, useEffect, useReducer, useState } from "react"
import { Filter, Task } from "../lib/definition"
import ToolBar from "../ui/version_2/toolbar"
import TaskList from "../ui/version_2/task_list"
import clsx from "clsx"

type TaskAction =
  | { type: "SAVE_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: {name: string, startDate: string, endDate: string} }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "TOGGLE_TASK_COMPLETION"; payload: string }

const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch(action.type) {
    case "SAVE_TASKS":
      return action.payload
    
    case "ADD_TASK":
      return [...state, { id: Date.now().toString(), name: action.payload.name, startDate: action.payload.startDate, endDate: action.payload.endDate, completed: false }]
    
    case "DELETE_TASK":
      return state.filter((task: Task) =>
        task.id !== action.payload
      )
    
    case "TOGGLE_TASK_COMPLETION":
      return state.map((task: Task) => 
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      )
    
    default:
      return state
  }
}

interface AppContextProps {
  tasks: Task[],
  tasksDispatch: React.Dispatch<TaskAction>,
  filter: Filter,
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
}

export const AppContext = createContext<AppContextProps | null>(null)

export default function Page() {
  const [isAppInitialized, setIsAppInitialized] = useState<boolean>(false)
  const [tasks, tasksDispatch] = useReducer(taskReducer, [])
  const [filter, setFilter] = useState<Filter>({})

  // GET/SAVE DATA
  useEffect(() => {
    const savedTasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]")
    tasksDispatch({ type: "SAVE_TASKS", payload: savedTasks })
    setIsAppInitialized(true)
  }, [])

  useEffect(() => {
    if(isAppInitialized) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks, isAppInitialized])

  const [verySecretBgImage, setVerySecretBgImage] = useState<boolean>(false)

  return (
    <AppContext.Provider value={{
      tasks,
      tasksDispatch,
      filter,
      setFilter
    }}>
      <div className="flex justify-center">
        <div className="flex flex-col gap-y-4 w-full p-6 sm:p-6">
          <div onClick={() => setVerySecretBgImage((prev) => !prev)} className={clsx(
            "w-full flex items-end p-4 rounded-md relative overflow-hidden",
            {
              "bg-gradient-to-tr from-violet-600 to-sky-600 h-48": !verySecretBgImage,
              "h-96 bg-cover bg-no-repeat bg-center bg-[url('https://64.media.tumblr.com/37793d1130587f23a1a96e09f45956d3/1180627617cec052-77/s500x750/0978efa9ec52aa9cd87139cbca52f9dfb77ef4ee.jpg')]": verySecretBgImage
            }
          )}>
            <h1 className="text-violet-50 text-3xl font-extrabold md:text-4xl">{verySecretBgImage ? "Tasks are everywhere ahhh" : "Todo App (Ver 2)"}</h1>
            <img src="/complete_mark.png" alt="backdrop" className={clsx(
              "absolute z-10 -top-24 -right-24 -rotate-[25deg] w-72 md:w-96",
              {
                "hidden": verySecretBgImage
              }
            )}/>
          </div>
          <ToolBar/>
          <TaskList/>
        </div>
      </div>
    </AppContext.Provider>
  )
}
