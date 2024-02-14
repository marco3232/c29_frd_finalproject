import { useQuery } from "@tanstack/react-query";
//-------------------------------------------------------------------------------------------

const source = "http://localhost:8080"
interface DonateItem {
    item_name: string
}

export function useItems() {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["donate_items"],
        queryFn: async () => {
            const res = await fetch(`${source}/donate/items`)
            const result = await res.json()
            return result.data as DonateItem[]
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

export async function addNewItems(quantity_input: number) {
    const res = await fetch(`${source}/donate/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({quantity_input: quantity_input })
    })
    let resp = await res.json()
    return resp.message

};

//-------------------------------------------------------------------------------------------

// export async function toggleItem(id: number) {
//     const res = await fetch(`${source}/todo/item/toggle/${id}`, {
//         method: "PUT",
//     })
//     let resp = await res.json()
//     return resp.message as string

// }