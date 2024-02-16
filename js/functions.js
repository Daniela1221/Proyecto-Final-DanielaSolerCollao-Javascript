async function rutaJSON() {
    const response = await fetch('./js/minimarket.json').then(res => {return res.json()});
    localStorage.setItem("minimarket", JSON.stringify(response));
};

async function renderProductos() {
    await rutaJSON();

    const minimarket = JSON.parse(localStorage.getItem("minimarket"));
    const productos = document.querySelector("#productos");
    const productosHTML = (item) => {
        return `
        <div class="conteiner gap-2 ml-2" style="width: 10rem;">
            <img src="${item.img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title text-2xl text-center"><strong>${item.nombre[0].toLocaleUpperCase() + item.nombre.slice(1)}</strong></h3>
                <p class="card-text text-center">Categoría: ${item.categoria[0].toLocaleUpperCase() + item.categoria.slice(1)}</p>
                <p class="card-text text-center">Precio: $ ${item.precio}</p>
            </div>
        </div>
        `;
    };

    const mostrarProductos = minimarket.map(productosHTML);
    productos.innerHTML = mostrarProductos.join("");
};


function busqueda(evt) {
    evt.preventDefault();
    let minimarket = JSON.parse(localStorage.getItem("minimarket"));
    let valorUsuario = document.getElementById('busqueda').value.toLowerCase();
    // console.log(valorUsuario);
    if (valorUsuario) {
        let filtrar = minimarket.filter( (item) => {
            return item.categoria == valorUsuario;
        });
        let resultado = (valor) => {
            return`
            <li>${valor.nombre}: $ ${valor.precio}</li>
        `};

        let titulo = `
            <h2><u>Categoría: ${valorUsuario[0].toLocaleUpperCase() + valorUsuario.slice(1)}</u></h2>
        `

        let mostrarFiltrado = filtrar.map(resultado);
        let respuesta = document.querySelector('#respuesta');
        respuesta.innerHTML = titulo + mostrarFiltrado.join("");

    };
    Toastify({
        text: "¡Filtrado de Categoría exitoso!",
        duration: 3000,
        style: {
            background: "linear-gradient(90deg,#ee00ff 0%, #ffa000 80%)",
            color: colourRandomizer(),
        }
    }).showToast();
};


function busquedaProductos(evt) {
    evt.preventDefault();
    let minimarket = JSON.parse(localStorage.getItem("minimarket"));
    let valorUsuario = document.getElementById('busquedaProducto').value.toLowerCase();
    // console.log(valorUsuario);
    if (valorUsuario) {
        let filtro = minimarket.filter( (item) => {
            return item.nombre.toLowerCase() == valorUsuario;
        });
        let resultado = (valor) => {
            return`
            <h2><u>Categoría: ${valor.categoria[0].toLocaleUpperCase() + valor.categoria.slice(1)}</u></h2>
            <li>${valor.nombre[0].toLocaleUpperCase() + valor.nombre.slice(1)}: $ ${valor.precio}, cantidad en local: ${valor.cantidad}</li>
        `};

        let titulo = `

        `

        let mostrarFiltrado = filtro.map(resultado);
        let respuesta = document.querySelector('#respuestaProductos');
        respuesta.innerHTML = titulo + mostrarFiltrado.join("");

    };
    Toastify({
        text: `¡Filtrado del producto '${valorUsuario}' exitoso!`,
        duration: 3000,
        style: {
            background: "linear-gradient(90deg,#ee00ff 0%, #ffa000 80%)",
            color: colourRandomizer(),
        }
    }).showToast();
};

function colourRandomizer() {
    let value = Math.floor(Math.random() * 9);
    if (value > 6) {
      return "black";
    } else if (value >= 3 && value <= 6) {
      return "blue";
    } else if (value < 3) {
      return "green";
    }
  }
  