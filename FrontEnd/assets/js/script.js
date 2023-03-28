import {getCategories, getWorks} from "./utils/data.js"
import {displayGalleryObjectsByCategoryId, addListenersToCategoryButtons, displayGalleryMenu} from "./utils/functions.js"

// Récupération des éléments du DOM 
const edit = document.querySelector (".edit");
const admin = document.querySelector (".admin");
const log = document.getElementById("log");
const token = window.sessionStorage.getItem("token");
const categoryButtonsContainer = document.querySelector(".btns-category");


// Affichage de la galerie et filtre par catégories sur les boutons
const works = await getWorks();
const categories = await getCategories();

displayGalleryMenu(categories);
displayGalleryObjectsByCategoryId(works, "0");
addListenersToCategoryButtons(works);


/* -- affichage du texte modifier lorsque l'utilisateur est connecté 
   -- déconnexion 
   -- affichage de la topBar admin
*/
if (token != null) {
    document.querySelector("body").style.paddingTop = "55px";
    edit.style.visibility = "visible";
    admin.style.visibility = "visible";
    categoryButtonsContainer.style.display = "none";
    log.innerHTML = "Logout";
    log.addEventListener("click", () => {
        sessionStorage.removeItem("token");
        window.location.href = "index.html";
        log.href ="index.html";
    });
}










