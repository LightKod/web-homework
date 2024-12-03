import NewTask from "./new_task"
import FilterTask from "./filter_task"

export default function ToolBar() {
    return (
        <div className="flex gap-x-4 justify-between items-center">
            <NewTask/>
            <FilterTask/>
        </div>
    )
}