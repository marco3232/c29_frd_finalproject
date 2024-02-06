export function register() {
    let form = document.querySelector(".RegisterFormBody form"); 
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const passwordInput1 = form.passwordInput1.value;
        const passwordInput2 = form.passwordInput2.value;

        if (passwordInput1 !== passwordInput2) {
            alert("Error... ", "The password is not match!");
            return;
        } else {
            alert("Success", "Registered success", "success");
        }

        const res = await fetch("/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: form.username.value,
                password: form.passwordInput1.value,
                email: form.email.value,
            }),
        });
        const result = await res.json();

        if (res.status == 200) {
            console.log(result);
            window.location.href = "/";
            return;
        }

        alert("Error... ", "Account exists!");
    });
}
register();

function alert() {
    alert("Success", "Book has been collected", "success");
}