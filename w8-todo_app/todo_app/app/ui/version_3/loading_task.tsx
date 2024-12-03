export default function LoadingTask() {
    return (
        <div className="flex justify-center w-full divide-x-2 divide-gray-300 divide-dashed animate-pulse">
            <div className="grow h-[4rem] bg-gray-500 rounded-md shadow-md md:h-[5.75rem]"/>
            <div className="h-full min-w-[4rem] shrink-0 p-4 md:min-w-[5.75rem] bg-gray-500 rounded-md shadow-md"/>
        </div>
    )
}