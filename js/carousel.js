import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
limit
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const track = document.getElementById("carouselTrack");

let position = 0;

async function cargarProductos(){

const q = query(collection(db,"productos"),limit(10));

const snapshot = await getDocs(q);

snapshot.forEach(doc =>{

const p = doc.data();

track.innerHTML += `

<div class="carousel-card">

<img src="${p.imagen}">

<h4>${p.nombre}</h4>

<p>${p.marca}</p>

</div>

`;

});

}

document.querySelector(".next").onclick = () =>{

position -= 250;

track.style.transform=`translateX(${position}px)`;

};

document.querySelector(".prev").onclick = () =>{

position += 250;

if(position>0) position=0;

track.style.transform=`translateX(${position}px)`;

};

cargarProductos();
