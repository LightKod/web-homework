'use client'

import { FunnelIcon } from "@heroicons/react/24/solid"
import { FormEvent, useRef, useState } from "react"
import Sheet, { SheetRef } from "../sheet"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

export default function FilterTask() {
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const { replace } = useRouter()

    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [taskState, setTaskState] = useState<string>("")

    const sheetRef = useRef<SheetRef>(null)

    const closeSheet = () => {
        if(sheetRef.current){
            sheetRef.current.closeSheet()
        }
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        
        const params = new URLSearchParams(searchParams)
        if(name !== "") {
            params.set("name", name)
        } else {
            params.delete("name")
        }
        if(taskState !== "") {
            params.set("completed", taskState)
        } else {
            params.delete("completed")
        }

        closeSheet()
        replace(`${pathName}?${params.toString()}`)
    }

    return (
        <>
            <button type="button" onClick={() => setIsSheetOpen(true)} className="flex gap-x-2 items-center justify-center rounded-md text-gray-950 hover:text-violet-800 transition-all duration-300">
                <FunnelIcon className="w-4 md:w-5"/>
                <p className="text-xs font-bold md:text-sm">Filters</p>
            </button>

            <Sheet ref={sheetRef} isVisible={isSheetOpen} size="lg" heading="Filter tasks" onClose={() => setIsSheetOpen(false)}>
                <div className="h-full overflow-hidden grow-0 relative">
                    <form onSubmit={handleSubmit} className="h-full overflow-y-auto flex flex-col gap-y-4 pb-16">
                        <p className="text-xs text-gray-500">You can filter your created tasks using the below fields.</p>
                        <div className="relative mt-2 flex flex-col">
                            <input type="text" id="name" value={name} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " onChange={(e) => setName(e.target.value)}/>
                            <label htmlFor="name" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Task's name</label>
                        </div>
                        <div className="relative mt-2 flex flex-col">
                            <select id="taskState" value={taskState} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" onChange={(e) => setTaskState(e.target.value)}>
                                <option value="">Both</option>
                                <option value="true">Completed</option>
                                <option value="false">Incomplete</option>
                            </select>
                            <label htmlFor="taskState" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:text-violet-800 duration-300">Task's state</label>
                        </div>
                        <button type="submit" className="absolute bottom-0 w-full text-violet-50 text-sm font-bold bg-gray-950 py-4 px-2 rounded-md hover:bg-violet-800 transition-colors duration-300">Apply filters</button>
                    </form>
                </div>
            </Sheet> 
        </>
    )
}