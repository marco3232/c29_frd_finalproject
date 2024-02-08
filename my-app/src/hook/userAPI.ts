const source = "http://localhost:3000"
import { useQuery } from "@tanstack/react-query";


export function register() {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch(`${source}/donate/items`)
            const result = await res.json()
            return result.data as []
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