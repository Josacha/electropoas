import { db, auth } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
signInWithEmailAndPassword,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const loginBtn=document.getElementById("loginBtn");

loginBtn.onclick=async()=>{

const email=document.getElementById("email").value;
const pass=document.getElementById("password").value;

await signInWithEmailAndPassword(auth,email,pass);

};


onAuthStateChanged(auth,user=>{

if(user){

document.getElementById("login").style.display="none";
document.getElementById("panel").style.display="block";

cargar();

}

});


async function cargar(){

const lista=document.getElementById("lista");

lista.innerHTML="";

const snapshot=await getDocs(collection(db,"productos"));

snapshot.forEach(d=>{

const p=d.data();

const div=document.createElement("div");

div.innerHTML=`

${p.nombre}

<button onclick="eliminar('${d.id}')">
Eliminar
</button>

`;

lista.appendChild(div);

});

}


window.eliminar=async(id)=>{

await deleteDoc(doc(db,"productos",id));

cargar();

};


document.getElementById("guardar").onclick=async()=>{

const nombre=document.getElementById("nombre").value;
const categoria=document.getElementById("categoria").value;
const imagen=document.getElementById("imagen").value;

await addDoc(collection(db,"productos"),{

nombre,
categoria,
imagen

});

cargar();

};
