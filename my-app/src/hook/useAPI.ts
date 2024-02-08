import { useQuery } from "@tanstack/react-query";
//-------------------------------------------------------------------------------------------

const source = "http://localhost:8080"
interface userValues {
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    phoneNumber: number,
}

//-------------------------------------------------------------------------------------------

export function useItems() {
    const { isLoading, error, data, isFetching } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch(`${source}/auth/register`)
            const result = await res.json()
            return result.data as userValues[]
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
}

//-------------------------------------------------------------------------------------------

export async function createUsers(firstName: string, lastName: string, password: string, email: string, phoneNumber: number) {
    const res = await fetch(`${source}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ firstName: firstName, lastName: lastName, password: password, email: email, mobile_phone: phoneNumber })
    })
    let resp = await res.json()
    return resp.message
};