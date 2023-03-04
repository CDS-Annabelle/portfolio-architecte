import {toggleModal} from "./utils/functions.js"

const url = "http://localhost:5678/api/works";

const modalTriggers = document.querySelectorAll(".modal-trigger");

const modal1 = document.getElementById('modal1');
window.onclick = (e) => {
    if (e.target == modal1) {
        modal1.style.display = "none";
    }
}

// Affichage de la modale
modalTriggers.forEach(trigger => trigger.addEventListener('click', toggleModal));
toggleModal()


// affichage des thumbnails dans la modale
async function getThumbnail(){
    let response = await fetch(url);
    let data = await response.json();
    let display ="";
    for (let work of data) {
        display += `
        <figure class="thumbnail">
            <img class="img-thumbnail" id="${work.id}" src="${work.imageUrl}" alt="${work.title}" crossorigin="anonymous">
            <a href="#" id="delete-link"><i class="fa-solid fa-trash-can" data-delete="${work.id}"></i></a>
            <div id="message-delete"></div>
			<div class = "text-edit">éditer</div>
        </figure>
        `
    }
    document.getElementById("thumbnail-modal").innerHTML = display;
}
getThumbnail()


// suppression sur chaque thumbnail de la modale
async function deleteWorks(id) {
    try {
        const res = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        });
        if(!res.ok){
            console.log("error");
        } 
    
    } catch (error) {
        console.log("erreur lors de la suppression");
    }
}

document.addEventListener("click", function(e) {
    if (e.target.dataset.delete) {
        e.preventDefault();
        messageSucces(e.target.dataset.delete);
        deleteWorks(id);
    }
})


function messageSucces(id) {
    const pictureDelete = "Voulez-vous vraiment supprimer cette image ?";
    if (confirm(pictureDelete) == true) {
        deleteWorks(id)
    } 
}

