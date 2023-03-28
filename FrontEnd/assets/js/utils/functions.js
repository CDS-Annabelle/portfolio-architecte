
// affichage des projets de la galerie par catégorie
export function displayGalleryObjectsByCategoryId(data, categoryId){
    const container = document.getElementById('gallery');
    container.innerHTML='';
    data.forEach(element => {
        if (element.category.id === parseInt(categoryId) || categoryId === "0") {
        container.innerHTML +=`
            <figure>
            <img src="${element.imageUrl}" alt="${element.title}">
            <figcaption>${element.title}</figcaption>
            </figure>
        `;
        };
    });
};

// Ajout d'un écouteur d'évènements sur le clic, à chaque bouton de catégorie.
export function addListenersToCategoryButtons(works, categoryId){
    const categoriesBtns = Array.from(document.querySelectorAll(".btn-name-category"));
    categoriesBtns.forEach(elt => {
        elt.addEventListener("click", (e)=>{
            const categoryId = e.target.dataset.categoryId;
            displayGalleryObjectsByCategoryId(works, categoryId);
        });
    });
};

// Affichage du menu avec les boutons par catégorie
export function displayGalleryMenu(categories){
    const categoryButtonsContainer = document.querySelector(".btns-category");
    categories.forEach(elt =>{
        categoryButtonsContainer.innerHTML += `<button id="btn${elt.name}" data-category-id="${elt.id}" class="btn-name-category">${elt.name}</button>`
    });
};




