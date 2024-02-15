import { useMutation } from 'react-query';
//-------------------------------------------------------------------------------------------

const source = "http://localhost:8080";
interface userValues {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phoneNumber: number;
}

//-------------------------------------------------------------------------------------------

// export async function createUsers(firstName: string, lastName: string, password: string, email: string, phoneNumber: number) {
//     try {
//         const res = await fetch(`${source}/auth/register`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({ eng_surname: firstName, eng_given_name: lastName, password: password, email: email, mobile_phone: phoneNumber })
//         });

//         const data = await res.json();

//         if (res.ok) {
//             console.log(data);
//             window.location.href = "/";
//         } else {
//             throw new Error(data.message);
//         }
//     } catch (error: any) {
//         throw new Error(error.message);
//     }
// }



export async function createUser({ firstName, lastName, password, email, phoneNumber }: { firstName: string, lastName: string, password: string, email: string, phoneNumber: number }) {
    try {
        const res = await fetch(`${source}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ eng_surname: firstName, eng_given_name: lastName, password, email, mobile_phone: phoneNumber })
        });

        const data = await res.json();

        if (res.ok) {
            console.log(data);
            // window.location.href = "/";
        } else {
            throw new Error(data.message)
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}
//-------------------------------------------------------------------------------------------

export async function loginUser(email: string, password: string) {
    try {
        const res = await fetch(`${source}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: password }),
        });

        const data = await res.json();

        if (res.ok) {
            alert("Login successful");
            console.log(data);
            window.location.assign("/");
        } else {
            alert("Login failed: " + data.message);
        }
    } catch (error: any) {
        alert("Login failed: Network error");
    }
}

//-------------------------------------------------------------------------------------------


export async function addItem(title: string, description: string) {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, description })
    })

    const result = await res.json()
    return result.data
}