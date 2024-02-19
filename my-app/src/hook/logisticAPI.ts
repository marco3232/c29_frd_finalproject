import { useQuery } from "@tanstack/react-query";
//-------------------------------------------------------------------------------------------

const source = "http://localhost:8080"
interface DonateItem {
    id:number
    item_name: string
    qty:number
}

export function useDonateItems() {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["logistic"],
        queryFn: async () => {
            const res = await fetch(`${source}/logistic`,{
                headers: {
                  "Authorization":`Bearer ${localStorage.getItem('token')}`
                },
              })
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