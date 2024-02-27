import { useQuery } from "@tanstack/react-query";
// import { CheckOutTransactionType } from "../slice/checkOutSlice";


const source = "http://localhost:8080";

export function useCheckOutInfo() {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["checkouts"],
        queryFn: async () => {
            const res = await fetch(`${source}/checkout`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const result = await res.json();

            return result.data
        }
    });
    if (isLoading || isFetching) return "Data Loading";
    if (error) {
        return "Error";
    }
    if (!data) {
        return []
    }
    return data
}

export async function addCheckOut(
    checkInIds: number[],
    // checkoutTransaction: CheckOutTransactionType
) {
    const body = {
        checkInIds,
        // checkoutTransaction
    }
    console.log({ body })
    const res = await fetch(`${source}/checkout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body)
    });

    let resp = await res.json();
    return resp.message;
}