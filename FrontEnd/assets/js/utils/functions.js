
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
        }
    })
}

export function addListenersToCategoryButtons(works, categoryId){
    const categoriesBtns = Array.from(document.querySelectorAll(".btn-name-category"))
    categoriesBtns.forEach(elt => {
        elt.addEventListener("click", (e)=>{
            // on parse en entier le dataset
            const categoryId = e.target.dataset.categoryId;
            displayGalleryObjectsByCategoryId(works, categoryId);
        })
    })
}

export function displayGalleryMenu(categories){
    const categoryButtonsContainer = document.querySelector(".btns-category");
    categories.forEach(elt =>{
        categoryButtonsContainer.innerHTML += `<button id="btn${elt.name}" data-category-id="${elt.id}" class="btn-name-category">${elt.name}</button>`
    });
}


export function toggleModal() {
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.classList.toggle('active')
}


