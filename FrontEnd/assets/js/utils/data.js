// URL de base de l'API - Récupération des données JSON de l'API pour les projets et catégories.

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