// Affichage de la galerie par catégories
import {getCategories, getWorks} from "./utils/data.js"
import {displayGalleryObjectsByCategoryId, addListenersToCategoryButtons, displayGalleryMenu} from "./utils/functions.js"

const works = await getWorks();
const categories = await getCategories();

/* affichage du texte modifier lorsque l'utilisateur est connecté */
const edit = document.querySelector (".edit")
const token =window.sessionStorage.getItem("token");
if (token != null)
{
    edit.style.visibility = "visible";
}
/* ---*/

displayGalleryMenu(categories);
displayGalleryObjectsByCategoryId(works, "0");
addListenersToCategoryButtons(works, categories);













