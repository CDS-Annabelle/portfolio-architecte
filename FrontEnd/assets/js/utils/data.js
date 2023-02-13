const BASE_API = "http://localhost:5678/api"

export async function retrieveDataFromUrl(url){
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export async function getWorks(){
    return await retrieveDataFromUrl(`${BASE_API}/works`);
}

export async function getCategories(){
    return await retrieveDataFromUrl(`${BASE_API}/categories`);
}