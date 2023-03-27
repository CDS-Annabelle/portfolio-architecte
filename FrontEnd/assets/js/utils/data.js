// Appel à l'API - Tous les travaux et par catégorie

const BASE_API = "http://localhost:5678/api"

export async function retrieveDataFromUrl(url){
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

export async function getWorks(){
    return await retrieveDataFromUrl(`${BASE_API}/works`);
}

export async function getCategories(){
    return await retrieveDataFromUrl(`${BASE_API}/categories`);
}