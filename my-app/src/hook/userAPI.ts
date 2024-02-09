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
    try {
        const res = await fetch(`${source}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName: firstName, lastName: lastName, password: password, email: email, mobile_phone: phoneNumber })
        });

        const data = await res.json();

        if (res.ok) {
            console.log(data);
            window.location.href = "/";
        } else {
            throw new Error(data.message);
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}

//-------------------------------------------------------------------------------------------

export async function loginUser(email: string, password: string) {
    try {
        const res = await fetch(`${source}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        });

        if (res.ok) {
            alert("Login successful");
        } else {
            const errorData = await res.json();
            console.error("Login error:", errorData.message);
            alert("Login failed: " + errorData.message);
        }
    } catch (error: any) {
        console.error("Login error:", error.message);
        alert("Login failed: Network error");
    }
}



