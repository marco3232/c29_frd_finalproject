const source = "http://localhost:8080";

interface userValues {
    chiSurname: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phoneNumber: number;
}
// -------------------------------------------------------------------------------------------

export async function createUser({ firstName, lastName, chiSurname, chiGivenName, email, phoneNumber, password }: { firstName: string, lastName: string, chiSurname: string, chiGivenName: string, email: string, phoneNumber: number, password: string }) {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${source}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                eng_surname: lastName, eng_given_name: firstName, chi_surname: chiSurname, chi_given_name: chiGivenName, email, mobile_phone: phoneNumber, password,
            })
        });

        const data = await res.json();

        if (res.ok) {
            console.log(data);
        } else {
            throw new Error(data.message)
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}
//-------------------------------------------------------------------------------------------

export async function loginUser({ email, password }: { email: string, password: string }) {
    try {
        const res = await fetch(`${source}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            return data
        } else {
            throw new Error(data.message || 'Login failed: Unknown error');
        }
    } catch (error: any) {
        throw new Error(error.message);
    }

}

//-------------------------------------------------------------------------------------------

export async function getUserInfo(token: string) {
    const response = await fetch(`${source}/auth/user`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    });
    const data = await response.json();
    if (!data) {
        throw new Error('User name not found in user info');
    }
    return data;
}

