// Modal
/*const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const url = 'http://localhost:5678/api/works';


modalTriggers.forEach(trigger => trigger.addEventListener('click', toggleModal))

function toggleModal() {
    modalContainer.classList.toggle('active')
}

async function getThumbnail() {
    let response = await fetch(url);
    console.log(response);
    let data = await response.json();
    let display = "";
    data.map((values) => {
        display += `
        <div class="cards">
        <button class="deleteButton" id="${values.id}">Supprimer</button>
        <img src=${values.imageUrl} alt=${values.title}>
        <h3>Edit</h3>
        </div>`
    })
    document.getElementById("root").innerHTML = display;
};

getThumbnail();
*/

const url = "http://localhost:5678/api/works";

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const postsLists = document.querySelector(".posts-list");
const addPostForm = document.querySelector(".add-post-form");
const titleValue = document.getElementById("title-value");

let output="";

modalTriggers.forEach(trigger => trigger.addEventListener('click', toggleModal))

function toggleModal() {
    modalContainer.classList.toggle('active')
}

const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `
        <div class="cards">
            <div class="card-body" data-id=${post._id}>
            <img class="img-thumbnail" src="${post.imageUrl}" alt="${post.title}">
                <a href="#" class="card-link" id="edit-post">Edit</a>
                <a href="#" class="card-link" id="delete-post">Delete</a>
            </div>
        </div>
        `;
    })
    postsLists.innerHTML = output;
}

fetch(url)
.then(res => res.json())
.then(data => renderPosts(data))


postsLists.addEventListener('click', (e) => {
    e.preventDefault();
    let deleteButton = e.target.id == "delete-post";


    let id = e.target.parentElement.dataset.id;

    // Delete - Remove
    if(deleteButton) {
        fetch(`${url}/${id}`, {
        method: "DELETE",
    })
        .then(res => res.json())
        .then(data => location.reload())
    }
})

// edit
addPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(titleValue.value)

    fetch(url, {
        method: "POST",
        headers : {
            "content-type": "appplication/json",
        },
        body: JSON.stringify({
            title: titleValue.value,
        })
    })

    .then(res => res.json())
    .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderPosts(dataArr);
    })
})