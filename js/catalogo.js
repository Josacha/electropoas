import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  const contenedor = document.getElementById("productosContainer");
  const buscador = document.getElementById("busqueda");
  const categoria = document.getElementById("categoria");
  const marca = document.getElementById("marca");

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

    if (lista.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron productos</p>";
      return;
    }

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

  // filtro principal
  window.filtrarProductos = function () {

    const texto = buscador.value.toLowerCase();
    const cat = categoria.value.toLowerCase();
    const mar = marca.value.toLowerCase();

    const filtrados = productos.filter(p => {

      const coincideNombre = p.nombre.toLowerCase().includes(texto);
      const coincideCategoria = cat === "" || (p.categoria && p.categoria.toLowerCase() === cat);
      const coincideMarca = mar === "" || (p.marca && p.marca.toLowerCase() === mar);

      return coincideNombre && coincideCategoria && coincideMarca;

    });

    mostrarProductos(filtrados);

  }

  cargarProductos();

});
