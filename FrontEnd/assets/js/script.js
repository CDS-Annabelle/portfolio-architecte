// Affichage de la galerie par catégories
import {getCategories, getWorks} from "./utils/data.js"
import {displayGalleryObjectsByCategoryId, addListenersToCategoryButtons, displayGalleryMenu} from "./utils/functions.js"

const works = await getWorks();
const categories = await getCategories();

/* affichage du texte modifier lorsque l'utilisateur est connecté & déconnexion*/
const edit = document.querySelector (".edit");
const admin = document.querySelector (".admin");
const token =window.sessionStorage.getItem("token");
if (token != null)
{
    edit.style.visibility = "visible";
    admin.style.visibility = "visible";
    log.innerHTML = "Logout";
    log.addEventListener("click", () => {
        sessionStorage.removeItem("token");
        window.location.href = "index.html";
        log.href ="index.html";
    });
}


displayGalleryMenu(categories);
displayGalleryObjectsByCategoryId(works, "0");
addListenersToCategoryButtons(works, categories);













