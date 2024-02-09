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

export async function getDonateItems(item_name: string) {
    const res = await fetch(`${source}/donate/items}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ item_name: item_name })
    });

    const resp = await res.json()

    return resp.message as string;
}

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

export async function toggleItem(id: number) {
    const res = await fetch(`${source}/todo/item/toggle/${id}`, {
        method: "PUT",
    })
    let resp = await res.json()
    return resp.message as string

}