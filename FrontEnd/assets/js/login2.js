const url = "http://localhost:5678/api/users/login";
const errorMessage = document.getElementById("errorMessage");
const email = document.getElementById("email");
const password = document.getElementById("password");

const submit = document.getElementById("submit");

const fetchHandler = async () => {
    const user = {
        email: email.value, 
        password: password.value,
    }
    const options = {
        method: "POST",
        //JSON.stringify : convertit en chaîne JSON
        body: JSON.stringify(user),
        headers: {"Content-type": "application/json",},
    }
    try {
        const response = await fetch(url, options);
    if (response.status === 200) {
        const userData = await response.json();
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
    fetchHandler();
});

