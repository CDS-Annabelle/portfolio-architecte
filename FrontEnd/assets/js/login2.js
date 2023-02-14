const url = "http://localhost:5678/api/users/login";
const errorMessage = document.getElementById("errorMessage");
const email = document.getElementById("email");
const password = document.getElementById("password");

const submit = document.getElementById("submit");

const fetchHandler = async () => {
    try {
        const response = await fetch(url, {
            method: "POST",
            //JSON.stringify : convertit en chaîne JSON
            body: JSON.stringify({
                email: email.value, 
                password: password.value,
        }),
        headers: {
            "Content-type": "application/json",
        },
    });
    if (response.status === 200) {
        const userData = response.json();
        console.log(userData);
        if (userData) {
            window.sessionStorage.setItem("userData", JSON.stringify(userData));
            window.sessionStorage.setItem("token", userData.token);
            window.location.replace("./index.html");
            }
        }else {
            errorMessage.innerHTML = "Votre email et/ou mot de passe ne correspondent pas";
        }
    } catch (error) {
        console.log(error);        
    }
};

submit.addEventListener("click", (e) => {
    e.preventDefault(); 
    fetchHandler.apply();
});

