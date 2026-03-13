import { db } from "./firebase.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById("guardar").onclick = async () => {

const producto = {

nombre: document.getElementById("nombre").value,

marca: document.getElementById("marca").value,

categoria: document.getElementById("categoria").value,

voltaje: document.getElementById("voltaje").value,

amperaje: document.getElementById("amperaje").value,

imagen: document.getElementById("imagen").value,

descripcion: document.getElementById("descripcion").value

};

await addDoc(collection(db, "productos"), producto);

alert("Producto agregado");

};
