// URL de base de l'API - Récupération des données JSON de l'API pour les projets et catégories.

const BASE_API = "http://localhost:5678/api"

export const retrieveDataFromUrl = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

export const getWorks = async () => {
    return await retrieveDataFromUrl(`${BASE_API}/works`);
}

export const getCategories = async () => {
    return await retrieveDataFromUrl(`${BASE_API}/categories`);
}