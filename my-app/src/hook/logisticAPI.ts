import { useQuery } from "@tanstack/react-query";
//-------------------------------------------------------------------------------------------

const source = "http://localhost:8080"
interface DonateItem {
    item_name: string
}

export function useItems() {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["logistic"],
        queryFn: async () => {
            const res = await fetch(`${source}/logistic`)
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