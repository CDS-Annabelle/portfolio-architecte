const url = "http://localhost:5678/api/users/login";
const errorMessage = document.getElementById("errorMessage");
const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

const handleResponse = async (response) => {
    if (response.ok) {
        const userData = await response.json();
        console.log(userData);
        if (userData) {
            window.sessionStorage.setItem("userData", JSON.stringify(userData));
            window.sessionStorage.setItem("token", userData.token);
            window.location.replace("./index.html");
        }
    } else {
        errorMessage.innerHTML = "Votre email et/ou mot de passe ne correspondent pas";
    }
};

const fetchHandler = async (event) => {
    event.preventDefault();
    const user = {
        email: email.value,
        password: password.value,
    };
    const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    };
    try {
        const response = await fetch(url, options);
        handleResponse(response);
    } catch (error) {
        console.log(error);
    }
};

submit.addEventListener("click", fetchHandler);
