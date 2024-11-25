'use client'

import { Filter } from "@/app/lib/definition"
import NewTask from "./new_task"
import FilterTask from "./filter_task"

export default function ToolBar({
    addTask,
    changeFilter
} : {
    addTask: (name: string, startDate: string, endDate: string) => void
    changeFilter: (value: Filter) => void
}) {
    return (
        <div className="flex gap-x-4 justify-between items-center">
            <NewTask addTask={addTask}/>
            <FilterTask changeFilter={changeFilter}/>
        </div>
    )
}