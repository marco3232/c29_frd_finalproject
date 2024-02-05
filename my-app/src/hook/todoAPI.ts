import { useQuery } from "@tanstack/react-query";
//-------------------------------------------------------------------------------------------

const source = "http://localhost:8080"
interface TodoItem {
    id: number
    title: string
    description: string
    status: boolean
}

export function useTodoItems() {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["todoItems"],
        queryFn: async () => {
            const res = await fetch(`${source}/todo/items`)
            const result = await res.json()
            return result.data as TodoItem[]
        }
    })

    if (isLoading || isFetching) return "Data Loading"
    if (error) {
        return "Error "
    }
    if (!data) {
        return []
    }
    return data;
};

//-------------------------------------------------------------------------------------------

export async function addNewItems(title: string, description: string) {
    const res = await fetch(`${source}/todo/item`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title_input: title, description_input: description })
    })
    let resp = await res.json()
    return resp.message

};

//-------------------------------------------------------------------------------------------

