import {getCategories} from "./utils/data.js"
import {displayGalleryObjectsByCategoryId, addListenersToCategoryButtons} from "./utils/functions.js"

const url = "http://localhost:5678/api/works";
const categories = await getCategories();


// modal 1 et 2 - Récupération des éléments
const modalDeleteWorks = document.getElementById("modal-1");
const modalAddForm = document.getElementById("modal-2");
const openModalBtn1 = document.getElementById("open-modal-1");
const OpenModalBtn2 = document.getElementById("open-modal-2");
const closeModalBtn1 = document.querySelector(".close1");
const closeModalBtn2 = document.querySelector(".close2");
const thumbnailModal = document.getElementById("modal-2");
const imageFile = document.querySelector("#add-picture");
const displayPicture = document.querySelector(".display-picture");
const submitButton = document.querySelector("#modal_form_validation");
const formAddPicture = document.querySelector("#form-add");
const errorContainer = document.querySelector(".error-container");


// modal 1 et 2 - Ajout d'évènements
openModalBtn1.addEventListener("click", () => openModal(modalDeleteWorks));
OpenModalBtn2.addEventListener("click", () => {
  closeModal(modalDeleteWorks);
  openModal(modalAddForm);
});
closeModalBtn1.addEventListener("click", () => closeModal(modalDeleteWorks));
closeModalBtn2.addEventListener("click", () => closeModal(modalAddForm));
window.addEventListener("click", (event) => {
  if (event.target === modalDeleteWorks) {
    closeModal(modalDeleteWorks);
  } else if (event.target === modalAddForm) {
    closeModal(modalAddForm);
  }
});

const previousModal1 = document.querySelector(".prev-modal1");
previousModal1.addEventListener("click", () => {
    closeModal(modalAddForm);
    openModal(modalDeleteWorks);
});

const openModal = (modal) => {
    modal.style.display = "block";
}

const closeModal = (modal) => {
    resetAddForm();
    modal.style.display = "none";
}
  

// affichage des projets dans la modale
const getWorks = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  
const getThumbnail = async (url) => {
  try {
    const data = await getWorks(url);
    let display = "";
    for (let work of data) {
      display += `
        <figure class="thumbnail">
          <img class="img-thumbnail" id="${work.id}" src="${work.imageUrl}" alt="${work.title}" crossorigin="anonymous">
          <a href="#" id="delete-link"><i class="fa-solid fa-trash-can" data-delete="${work.id}"></i></a>
          <div class = "text-edit">éditer</div>
        </figure>
        `;
    }
    document.getElementById("thumbnail-modal").innerHTML = display;
  } catch (error) {
    console.log("Erreur lors de la récupération des données : ", error);
  }
}


// Suppression des travaux
const deleteProject = async (id) => {
  try {
    const res = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    if (!res.ok) {
      console.log("Erreur lors de la suppression");
    } else {
      return false;
    }
  } catch (error) {
    console.log("Erreur lors de la suppression : ", error);
  }
}


// Message confirmation de demande de suppression et succès
async function messageSuccess(id) {
  const pictureDelete = "Voulez-vous vraiment supprimer cette image ?";
  if (confirm(pictureDelete)) {
    await deleteProject(id);
    await getThumbnail(url);
    const works = await getWorks(url);
    displayGalleryObjectsByCategoryId(works, "0");
    addListenersToCategoryButtons(works, categories);
  }
}

window.addEventListener("click", (e) => {
  if (e.target.dataset.delete) {
    e.preventDefault();
    messageSuccess(e.target.dataset.delete);
  }
});

getThumbnail(url);


// 2ème modale - Ajout photo
const displayImage = (imageFile, content) => {
  imageFile.addEventListener("change", function () {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
          const uploadPicture = reader.result;
          content.style.backgroundImage = `url(${uploadPicture})`;
      });
      reader.readAsDataURL(imageFile.files[0]);
      content.style.display = "block";
  });
};
displayImage(imageFile, displayPicture);
        
formAddPicture.addEventListener("input", () => buttonEffect(submitButton));
formAddPicture.addEventListener("submit", async e => {
  e.preventDefault();
  const addThumbnail = new FormData(formAddPicture);
  if (!addThumbnail.get("image").name || !addThumbnail.get("title") || !addThumbnail.get("category")) {
      generateFormError(addThumbnail);
  } else {
      await sendNewProject(url, addThumbnail);
      const works = await getWorks(url);
      displayGalleryObjectsByCategoryId(works, "0");
      addListenersToCategoryButtons(works, categories);
      getThumbnail(url);
      closeModal(thumbnailModal);
  }
});

// Activation du bouton une fois les champs remplis
const buttonEffect = (button) => {
  const imageInput = document.querySelector("#add-picture");
  const titleInput = document.querySelector("#title_input");
  const categoryInput = document.querySelector("#category_input");
  if (imageInput.value && titleInput.value && categoryInput.value) {
    button.classList.remove("button-off");
  } else {
    button.classList.add("button-off");
  }
};


// Gestion des erreurs si champ vide
const generateFormError = (addThumbnail) => {
  errorContainer.innerText = "";
  if (!addThumbnail.get("category")) {
      errorContainer.innerText += "Choisissez une catégorie !\n";
  }
  if (!addThumbnail.get("title")) {
      errorContainer.innerText += "Renseignez un titre !\n";
  }
  if (!addThumbnail.get("image").name) {
      errorContainer.innerText += "Choisissez une image !";
  }
}


// Réinitialisation du formulaire
const resetAddForm = async() => {
  displayPicture.style ="";
  errorContainer.innerText = "";
  formAddPicture.reset(); 
}


// Envoi du projet
const sendNewProject = async (url, addThumbnail) => {
  const res = await fetch(url, {
      method: "POST",
      headers: {
          Authorization: "Bearer " + sessionStorage.getItem('token'),
      },
      body: addThumbnail,
  });

  if (res.ok) {
      alert("Votre image a bien été ajoutée");
      await resetAddForm()
      return res.json();
  } else {
      throw new Error('Erreur lors de l\'ajout de l\'image');
  }
}
