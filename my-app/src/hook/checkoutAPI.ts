import { useQuery } from "@tanstack/react-query";
import { CheckOutTransactionType,} from "../slice/checkOutSlice";


const source = "http://localhost:8080";

export function useCheckOutInfo() {
    const { isLoading, error, data, isFetching, refetch } = useQuery({
        queryKey: ["checkouts"],
        queryFn: async () => {
            const res = await fetch(`${source}/finalcheckout`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const result = await res.json();

            return result.data
        }
    });
    if (isLoading || isFetching) return ["Data Loading", refetch];
    if (error) {
        return ["Error", refetch];
    }
    if (!data) {
        return ["Error", refetch]
    }
    return [data, refetch]
}

// export async function getAmount() {
//     const res = await fetch(`${source}/totalamount`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${localStorage.getItem("token")}`,
//         },

//     });

//     let resp = await res.json();
//     console.log("check resppppp",resp)
//     return resp.message;
// }


export async function addCheckOut(
    donateItemIds: number[],
    checkoutTransaction: CheckOutTransactionType
) {
    const body = {
        donateItemIds,
        checkoutTransaction
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