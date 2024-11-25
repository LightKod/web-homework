export type Task = {
    id: string
    name: string,
    startDate: string,
    endDate: string,
    completed: boolean
}

export type Filter = {
    name?: string,
    completed?: boolean,
}