import {getCategories, getWorks} from "./utils/data.js"
import {displayGalleryObjectsByCategoryId, addListenersToCategoryButtons, displayGalleryMenu} from "./utils/functions.js"

// Récupération des éléments du DOM - edit pour modifier & admin pour la topBar & token pour la connexion
const edit = document.querySelector (".edit");
const admin = document.querySelector (".admin");
const token = window.sessionStorage.getItem("token");

// Affichage de la galerie et filtre par catégories sur les boutons
const works = await getWorks();
const uniqueWorks = [...new Set(works)];
const categories = await getCategories();


displayGalleryMenu(categories);
//displayGalleryObjectsByCategoryId(works, "0");
displayGalleryObjectsByCategoryId(uniqueWorks, "0");
addListenersToCategoryButtons(works, categories);


/* -- affichage du texte modifier lorsque l'utilisateur est connecté 
   -- déconnexion 
   -- affichage de la topBar admin
*/
if (token != null)
{
    document.querySelector("body").style.paddingTop = "55px";
    edit.style.visibility = "visible";
    admin.style.visibility = "visible";
    log.innerHTML = "Logout";
    log.addEventListener("click", () => {
        sessionStorage.removeItem("token");
        window.location.href = "index.html";
        log.href ="index.html";
    });
}










