const url = "http://localhost:5678/api/users/login";
const errorMessage = document.getElementById("errorMessage");
const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

submit.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            //JSON.stringify : convertit en chaîne JSON
            body: JSON.stringify({email: email.value, password: password.value}),
        })

        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                errorMessage.innerHTML = "Votre email et/ou mot de passe ne correspondent pas";
                return Promise.reject();
            }
        })

        .then(userData => {
            if (userData) {
            // sessionStorage id et token tant que le navigateur est ouvert
            window.sessionStorage.setItem("userData", JSON.stringify(userData));
            window.sessionStorage.setItem("token", userData.token);
            window.location.replace("./index.html");
            }
        })

    .catch(() => console.log("error"));
    
})

