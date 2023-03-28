import {getCategories, getWorks} from "./utils/data.js"
import {displayGalleryObjectsByCategoryId, addListenersToCategoryButtons, displayGalleryMenu} from "./utils/functions.js"

// Récupération des éléments du DOM - edit pour modifier & admin pour la topBar & token pour la connexion
const edit = document.querySelector (".edit");
const admin = document.querySelector (".admin");
const log = document.getElementById("log");
const categoryButtonsContainer = document.querySelector(".btns-category");
const token = window.sessionStorage.getItem("token");

// Affichage de la galerie et filtre par catégories sur les boutons
const works = await getWorks();
const categories = await getCategories();

displayGalleryMenu(categories);
displayGalleryObjectsByCategoryId(works, "0");
addListenersToCategoryButtons(works, categories);

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

// --- changement d'état des boutons de filtre ---
const btns = document.querySelectorAll('.btn-name-category');

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Récupère l'ID de la catégorie
    const categoryId = btn.getAttribute('data-category-id');

    // Réinitialise tous les boutons
    btns.forEach(btn => {
      btn.classList.remove('active');
      btn.style.backgroundColor = '';
      btn.style.color = '';
    });

    // Applique la classe 'active' au bouton actif
    btn.classList.add('active');

    // Modifie la couleur de fond et de texte du bouton actif
    if (categoryId == 0) {
      btn.style.backgroundColor = '#1D6154';
      btn.style.color = 'white';
    } else {
      btn.style.backgroundColor = '#1D6154';
      btn.style.color = '#fff';
    }
  });
});








