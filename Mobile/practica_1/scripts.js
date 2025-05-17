/* 1) mostrar en la consola 10 veces "Me llamo Marcela"
2) mostrar en el navegador  10 veces  con un parrafo "Cualquir cosa"
3) dado un array con elementos mostrar en el navegador con una lista los elementos del array */
/* 4) dado un array  del ej 3 mostrar en el navegador los elementos del array con querySelector().innerHtml */
const arrayDeElementos = [
  "Elemento 1",
  "Elemento 2",
  "Elemento 3",
  "Elemento 4",
  "Elemento 5",
];
console.dir("Me llamo Marcela");

for (let index = 0; index <= 9; index++) {
  console.dir("Cualquir cosa");
}
let listaDeItems = [];
for (let index = 0; index < arrayDeElementos.length; index++) {
  let item = document.createElement("li");
  item.innerHTML = arrayDeElementos[index];
  listaDeItems.push(item.innerHTML);
}

for (const element of object) {
    
}


let ul = document.createElement("ul");
ul.innerHTML = listaDeItems;
document.body.append(ul);

const header = document.createElement("header");
header.innerHTML = `<h1>Header de ${document.head.innerText}</h1>`;
header.innerHTML += `<nav> <a href="http://127.0.0.1:5500/index.html">test</a>  <a href="http://127.0.0.1:5500/registro.html">test</a> <a href="http://127.0.0.1:5500/sucursales.html">test</a></nav>`;
document.body.append(header);

const main = document.createElement("main");
main.innerHTML = "<p>Contenido principal de la pagina</p>";
document.body.append(main);

const footer = document.createElement("footer");
footer.innerHTML = "<p>Footer de la pagina</p>";
document.body.append(footer);

/* 4) dado un array  del ej 3 mostrar en el navegador los elementos del array con querySelector().innerHtml
5) Mostrar en el header el titulo de la pagina modificando el DOM
6) el el header poner una barra de navegacion modificando el DOM
7) Mostrar en el footer con un pie de la pagina modificando el DOM
8) Crear 2 paginas mas Registro HTML y Sucursales HTML con el mismo header y Pie de pagina */
