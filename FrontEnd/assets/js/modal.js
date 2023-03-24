import {getCategories, getWorks} from "./utils/data.js"
import {displayGalleryObjectsByCategoryId, addListenersToCategoryButtons} from "./utils/functions.js"

const categories = await getCategories();

const url = "http://localhost:5678/api/works";

// modal 1 et 2 - Affichage
const modal1 = document.getElementById("modal-1");
const modal2 = document.getElementById("modal-2");
const openModalBtn1 = document.getElementById("open-modal-1");
const btnOpenModal2 = document.getElementById("open-modal-2");
const closeModalBtn1 = document.querySelector(".close1");
const closeModalBtn2 = document.querySelector(".close2");

//modal2 - ajout photo
const thumbnailModal = document.getElementById("modal-2");
const image = document.querySelector("#add-picture");
const title = document.querySelector("#title_input");
const category = document.querySelector("#category_input");
const displayPicture = thumbnailModal.querySelector(".display-picture");



btnOpenModal2.onclick = () => {
  modal1.style.display = "none"; // Fermer la modale 1
  modal2.style.display = "block"; // Ouvrir la modale 2
}

window.onclick = (e) =>  {
  if (e.target == modal1) {
    modal1.style.display = "none";
  }
  if (e.target == modal2) {
    modal2.style.display = "none";
  }
}

openModalBtn1.addEventListener("click", openModal1);

function openModal1() {
    modal1.style.display = "block";
  }

closeModalBtn1.addEventListener("click", closeModal1);
function closeModal1() {
    modal1.style.display = "none";
}

closeModalBtn2.addEventListener("click", closeModal2);
function closeModal2() {
    modal2.style.display = "none";
}

const previousModal1 = document.querySelector(".prev-modal1");
previousModal1.addEventListener("click", () => {
    closeModal2(openModal1);
    openModal1(closeModal2);
});
  
  

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
			<div class = "text-edit">éditer</div>
        </figure>
        `
    }
    document.getElementById("thumbnail-modal").innerHTML = display;
}
getThumbnail()


// suppression des thumbnails de la modale
async function deleteProject(id) {
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
        } else {
            return false;
        }
    
    } catch (error) {
        console.log("erreur lors de la suppression");
    }
}

window.addEventListener("click", (e) =>  {
    if (e.target.dataset.delete) {
        e.preventDefault();
        messageSucces(e.target.dataset.delete);
    }
})

async function messageSucces(id) {
    const pictureDelete = "Voulez-vous vraiment supprimer cette image ?";
    if (confirm(pictureDelete) == true) {
        deleteProject(id);
        getThumbnail();
        const works = await getWorks();
        displayGalleryObjectsByCategoryId(works, "0");
        addListenersToCategoryButtons(works, categories);
    } 
}

// 2ème modale - ajout photo
// upload image
const displayImage = (imageFile, content) => {
    let uploadPicture;
    imageFile.addEventListener("change", function () {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            uploadPicture = reader.result;
            content.style.backgroundImage = `url(${uploadPicture})`;
        });
        reader.readAsDataURL(imageFile.files[0]);
        content.style.display = "block";
    });
};
const imageFile = document.querySelector("#add-picture");
displayImage(imageFile, displayPicture);

// Bouton valider
const submitButton = document.querySelector("#modal_form_validation");
const formAddPicture = document.querySelector("#form-add");
formAddPicture.addEventListener("input", () => buttonEffect(submitButton));

// Ajout photo
formAddPicture.addEventListener("submit", async e => {
    e.preventDefault();
    const addThumbnail = new FormData(formAddPicture);

    // Erreurs dans le formulaire
    if (!addThumbnail.get("image") || !addThumbnail.get("title") || !addThumbnail.get("category")
    ) {
        generateFormError(addThumbnail);
    } else {
        await sendNewProject(url, addThumbnail, categories)
    }
});

const buttonEffect = (button) => {
    if (image.value && title.value && category.value) {
        button.classList.remove("button-off");
    } else {
        button.classList.add("button-off");
    }
};

function generateFormError(addThumbnail) {
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("error_form");
    formAddPicture.insertBefore(errorContainer, submitButton);
    let errorForm = document.querySelector(".error_form");
    if (errorForm) {
        formAddPicture.removeChild(errorForm);
    }
    // Affichage des erreurs
    if (!addThumbnail.get("category")) {
        errorContainer.innerText = "Choisissez une catégorie !";
    }
    if (!addThumbnail.get("title")) {
        errorContainer.innerText = "Renseignez un titre !";
    }
    if (!addThumbnail.get("image")) {
        errorContainer.innerText = "Choisissez une image !";
    }
}

async function sendNewProject(url) {
    const addThumbnail = new FormData(formAddPicture);
    const works = await getWorks();
    const res = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem('token'),
        },
        body: addThumbnail,
    })
        if (res.ok) {
            alert("Votre image a bien été ajoutée");
            closeModal2(openModal1);
            openModal1(closeModal2);
            displayGalleryObjectsByCategoryId(works, "0");
            displayPicture.style ="";
            return res.json();
        }
}







