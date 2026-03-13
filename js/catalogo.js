import { db } from "./firebase.js";

import {

collection,
getDocs

} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const contenedor = document.getElementById("productos");

async function cargarProductos(){

const snapshot = await getDocs(collection(db,"productos"));

snapshot.forEach(doc=>{

const p = doc.data();

const card = document.createElement("div");

card.className="producto";

card.innerHTML=`

<img src="${p.imagen}">
<h3>${p.nombre}</h3>
<p>${p.categoria}</p>

<button onclick="window.open('https://wa.me/50600000000')">

Consultar

</button>

`;

contenedor.appendChild(card);

});

}

cargarProductos();
