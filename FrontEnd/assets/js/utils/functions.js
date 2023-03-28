
// affichage des projets de la galerie par catégorie
export const displayGalleryObjectsByCategoryId = (data, categoryId) => {
    const container = document.getElementById('gallery');
    container.innerHTML = '';

    data.forEach(element => {
        if (element.category.id === parseInt(categoryId) || categoryId === "0") {
            const figure = document.createElement('figure');
            const image = document.createElement('img');
            const figcaption = document.createElement('figcaption');

            image.src = element.imageUrl;
            image.alt = element.title;
            figcaption.textContent = element.title;

            figure.appendChild(image);
            figure.appendChild(figcaption);
            container.appendChild(figure);
        }
    });
};


// Ajout d'un écouteur d'évènements sur le clic, à chaque bouton de catégorie.
export const addListenersToCategoryButtons = (works, categoryId) =>{
    const categoriesBtns = Array.from(document.querySelectorAll(".btn-name-category"));
    categoriesBtns.forEach(elt => {
        elt.addEventListener("click", (e)=>{
            const categoryId = e.target.dataset.categoryId;
            displayGalleryObjectsByCategoryId(works, categoryId);
        });
    });
};


// Affichage du menu avec les boutons par catégorie
export const displayGalleryMenu = (categories) =>{
    const categoryButtonsContainer = document.querySelector(".btns-category");
    categories.forEach(elt =>{
        categoryButtonsContainer.innerHTML += `<button id="btn${elt.name}" data-category-id="${elt.id}" class="btn-name-category">${elt.name}</button>`
    });

    const btns = document.querySelectorAll('.btn-name-category');
    const btnAll = document.querySelector('#btnAll');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const categoryId = btn.getAttribute('data-category-id');
        btns.forEach(btn => {
          btn.classList.remove('active');
          btn.style.backgroundColor = '';
          btn.style.color = '';
        });
        btn.classList.add('active');
        if (categoryId == 0) {
          btn.style.backgroundColor = '#1D6154';
          btn.style.color = 'white';
        } else {
          btn.style.backgroundColor = '#1D6154';
          btn.style.color = '#fff';
        }
      });
    });

    btnAll.click(); 
};




