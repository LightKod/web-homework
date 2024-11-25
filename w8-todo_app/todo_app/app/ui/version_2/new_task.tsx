'use client'

import { PlusCircleIcon } from "@heroicons/react/24/solid"
import { FormEvent, useContext, useRef, useState } from "react"
import Modal, { ModalRef } from "../modal"
import { AppContext } from "@/app/version-2/page"

export default function NewTask() {
    const { tasksDispatch } = useContext(AppContext)!

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>("")
    const [startDate, setStartDate] = useState<string>("")
    const [endDate, setEndDate] = useState<string>("")

    const modalRef = useRef<ModalRef>(null)

    const closeModal = () => {
        if(modalRef.current){
            modalRef.current.closeModal()
        }
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if(name !== "" && startDate !== "" && endDate !== ""){
            tasksDispatch({ type: "ADD_TASK", payload: {name, startDate, endDate}})
            setName("")
            setStartDate("")
            setEndDate("")
            closeModal()
        }
    }

    return (
        <>
            <button type="button" onClick={() => setIsModalOpen(true)} className="flex gap-x-2 items-center justify-center px-4 py-2.5 rounded-md text-violet-50 bg-gray-950 hover:bg-violet-800 transition-all duration-300">
                <PlusCircleIcon className="w-4 md:w-5"/>
                <p className="text-xs font-bold md:text-sm">New task</p>
            </button>

            <Modal ref={modalRef} isVisible={isModalOpen} size="lg" heading="Add a new task" onClose={() => setIsModalOpen(false)}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                    <p className="text-xs text-gray-500">Complete and submit the below form to add a new task.</p>
                    <div className="relative mt-2 flex flex-col">
                        <input type="text" id="name" value={name} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setName(e.target.value)}/>
                        <label htmlFor="name" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Task's name</label>
                    </div>
                    <div className="flex gap-x-4 mt-2">
                        <div className="relative w-1/2 flex flex-col">
                            <input type="date" id="start_date" value={startDate} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setStartDate(e.target.value)}/>
                            <label htmlFor="start_date" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Start date</label>
                        </div>
                        <div className="relative w-1/2 flex flex-col">
                            <input type="date" id="end_date" value={endDate} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setEndDate(e.target.value)}/>
                            <label htmlFor="end_date" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">End date</label>
                        </div>
                    </div>
                    <div className="flex mt-2 flex-col-reverse gap-y-4 md:flex-row md:gap-y-0 md:gap-x-4 md:justify-end">
                        <button type="button" onClick={closeModal} className="text-violet-500 min-w-full text-sm font-semibold border-2 border-violet-500 py-2.5 px-4 rounded-md hover:border-violet-800 hover:text-violet-800 md:min-w-0 transition-colors duration-300">Cancel</button>
                        <button type="submit" className="text-violet-50 min-w-full text-sm font-semibold border-2 border-gray-950 bg-gray-950 py-2.5 px-4 rounded-md hover:border-violet-800 hover:bg-violet-800 md:min-w-0 transition-colors duration-300">Submit</button>
                    </div>
                </form>
            </Modal>
        </>   
    )
}