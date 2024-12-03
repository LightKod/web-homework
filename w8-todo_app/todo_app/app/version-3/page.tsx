import { Suspense } from "react";
import Logo from "../ui/version_3/logo";
import ToolBar from "../ui/version_3/toolbar";
import LoadingTask from "../ui/version_3/loading_task";
import TaskList from "../ui/version_3/task_list";

export default function Page({
    searchParams 
}: {
    searchParams?: { 
        name?:string;
        completed?:string 
}}) {
    const name = searchParams?.name || ''
    const completed = searchParams?.completed || ''

    return (
        <div className="flex justify-center">
            <div className="flex flex-col gap-y-4 w-full p-6 sm:p-6">
                <Logo/>
                <ToolBar/>
                <Suspense fallback={<LoadingTask/>}>
                    <TaskList name={name} completed={completed}/>
                </Suspense>
            </div>
        </div>
    )
}