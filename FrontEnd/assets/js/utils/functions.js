export async function retrieveDataFromUrl(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


export function displayGalleryObjets(data, container, objectType){
    container.innerHTML='';
    data.forEach(element => {
        if (element.category.name === objectType || objectType === "all") {
        container.innerHTML +=`
            <figure>
            <img src="${element.imageUrl}" alt="${element.title}">
            <figcaption>${element.title}</figcaption>
            </figure>
        `;
        }
    })
}
