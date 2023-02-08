
import {retrieveDataFromUrl, displayGalleryObjets} from "./utils/functions.js"

const works = await retrieveDataFromUrl("http://localhost:5678/api/works") ;
const containerObjets = document.getElementById('gallery');
displayObjects('all');


export function displayObjects(objectType) {
    displayGalleryObjets(works, containerObjets, objectType);
}

const btnAll = document.getElementById('btnAll');
btnAll.addEventListener('click', function(e) {
    displayObjects('all');
});

const btnObjects = document.getElementById('btnObjects');
btnObjects.addEventListener('click', function(e) {
    displayObjects('Objets');
});

const btnApparts = document.getElementById('btnApparts');
btnApparts.addEventListener('click', function(e) {
    displayObjects('Appartements');
});

const btnHotels = document.getElementById('btnHotels');
btnHotels.addEventListener('click', function(e) {
    displayObjects('Hotels & restaurants');
});
