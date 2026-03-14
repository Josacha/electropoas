import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const tabla = document.getElementById("tablaProductos");
const listaCategorias = document.getElementById("listaCategorias");

let editandoId = null;


async function cargarProductos(){

tabla.innerHTML="";
listaCategorias.innerHTML="";

const categorias = new Set();

const querySnapshot = await getDocs(collection(db,"productos"));

querySnapshot.forEach((docu)=>{

const p = docu.data();
const id = docu.id;

categorias.add(p.categoria);

tabla.innerHTML += `

<tr>

<td>
<img src="${p.imagen}" width="60">
</td>

<td>${p.nombre}</td>

<td>${p.marca}</td>

<td>${p.categoria}</td>

<td>

<button onclick="editarProducto('${id}','${p.nombre}','${p.marca}','${p.categoria}','${p.voltaje}','${p.amperaje}','${p.imagen}','${p.descripcion}')">
Editar
</button>

<button onclick="eliminarProducto('${id}')">
Eliminar
</button>

</td>

</tr>

`;

});


categorias.forEach(cat=>{

listaCategorias.innerHTML += `<option value="${cat}">`;

});

}


window.eliminarProducto = async(id)=>{

if(confirm("Eliminar producto?")){

await deleteDoc(doc(db,"productos",id));

cargarProductos();

}

}


window.editarProducto = (id,nombre,marca,categoria,voltaje,amperaje,imagen,descripcion)=>{

editandoId = id;

document.getElementById("nombre").value = nombre;
document.getElementById("marca").value = marca;
document.getElementById("categoria").value = categoria;
document.getElementById("voltaje").value = voltaje;
document.getElementById("amperaje").value = amperaje;
document.getElementById("imagen").value = imagen;
document.getElementById("descripcion").value = descripcion;

}


document.getElementById("guardar").onclick = async()=>{

const producto = {

nombre: document.getElementById("nombre").value,
marca: document.getElementById("marca").value,
categoria: document.getElementById("categoria").value,
voltaje: document.getElementById("voltaje").value,
amperaje: document.getElementById("amperaje").value,
imagen: document.getElementById("imagen").value,
descripcion: document.getElementById("descripcion").value

};

if(editandoId){

await updateDoc(doc(db,"productos",editandoId),producto);

editandoId=null;

alert("Producto actualizado");

}else{

await addDoc(collection(db,"productos"),producto);

alert("Producto agregado");

}

document.getElementById("nombre").value="";
document.getElementById("marca").value="";
document.getElementById("categoria").value="";
document.getElementById("voltaje").value="";
document.getElementById("amperaje").value="";
document.getElementById("imagen").value="";
document.getElementById("descripcion").value="";

cargarProductos();

}


document.getElementById("logout").onclick = async()=>{

await signOut(auth);

window.location.href="index.html";

};


cargarProductos();
