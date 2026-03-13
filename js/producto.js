import { db } from "./firebase.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const contenedor = document.getElementById("productoDetalle");

async function cargarProducto() {

const ref = doc(db, "productos", id);

const snap = await getDoc(ref);

const p = snap.data();

contenedor.innerHTML = `

<h1>${p.nombre}</h1>

<img src="${p.imagen}" width="300">

<p>Marca: ${p.marca}</p>

<p>Voltaje: ${p.voltaje}</p>

<p>Amperaje: ${p.amperaje}</p>

<p>${p.descripcion}</p>

`;

}

cargarProducto();
