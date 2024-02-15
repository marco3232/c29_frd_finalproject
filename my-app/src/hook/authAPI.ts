export async function localLogin(email: string, password: string) {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_SERVER}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (!res.ok) {
            throw new Error('Failed to login');
        }

        const result = await res.json();

        if (!result.token) {
            throw new Error('Invalid response from server');
        }

        localStorage.setItem('token', result.token);
        return true;
    } catch (error) {
        console.error('Login failed:', error);
        return false;
    }
}
