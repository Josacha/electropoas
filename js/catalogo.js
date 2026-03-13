import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  const contenedor = document.getElementById("productos");
  const buscador = document.getElementById("buscador");

  let productos = [];

  async function cargarProductos() {

    const querySnapshot = await getDocs(collection(db, "productos"));

    productos = [];

    querySnapshot.forEach((doc) => {
      productos.push({ id: doc.id, ...doc.data() });
    });

    mostrarProductos(productos);
  }

  function mostrarProductos(lista) {

    contenedor.innerHTML = "";

    lista.forEach(p => {

      contenedor.innerHTML += `
        <div class="card">
          <img src="${p.imagen}" alt="${p.nombre}">
          <h3>${p.nombre}</h3>
          <p>${p.marca}</p>
          <a href="producto.html?id=${p.id}">Ver producto</a>
        </div>
      `;

    });

  }

  if (buscador) {
    buscador.addEventListener("input", () => {

      const texto = buscador.value.toLowerCase();

      const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
      );

      mostrarProductos(filtrados);

    });
  }

  cargarProductos();

});
