const valorObjetivo = document.getElementById('objetivo')
const valorTipo = document.getElementById('tipo')
const valorDireccion = document.getElementById('direccion')
const valorHabitaciones = document.getElementById('habitaciones')
const valorBaños = document.getElementById('baños')
const valorPrecio = document.getElementById('precio')
const moneda = document.getElementsByName('moneda')
const valorExtras = document.getElementById('extras')
const crearBtn = document.getElementById('crear')

const propiedadesCantidad = document.getElementById('propiedadesCantidad')
const ventaCantidad = document.getElementById('ventaCantidad')
const alquilerCantidad = document.getElementById('alquilerCantidad')
const ventaMinimo = document.getElementById('ventaMinimo')
const ventaMaximo = document.getElementById('ventaMaximo')
const alquilerMinimo = document.getElementById('alquilerMinimo')
const alquilerMaximo = document.getElementById('alquilerMaximo')

const listaAlquileres = document.getElementById('alquileres__listado')
const alquileresExpandir = document.getElementById('alquileres__btn')
const alquileresMinimizar = document.getElementById('alquileres__btn2')
const listaVentas = document.getElementById('ventas__listado')
const ventasExpandir = document.getElementById('ventas__btn')
const ventasMinimizar = document.getElementById('ventas__btn2')

const alquileresMinimo = document.getElementById('alquileres__minimo')
const alquileresMaximo = document.getElementById('alquileres__maximo')
const alquileresOrden = document.getElementById('alquileres__orden')
const alquileresFiltro = document.getElementById('alquileres__filtro')
const ventasMinimo = document.getElementById('ventas__minimo')
const ventasMaximo = document.getElementById('ventas__maximo')
const ventasOrden = document.getElementById('ventas__orden')
const ventasFiltro = document.getElementById('ventas__filtro')

const buttonList = document.getElementById('propiedades')
const wishIcon = document.getElementById('wishIcon')
const modal = document.getElementById('modal')
const carritoVista = document.getElementById('carrito__vista')
const carritoClose = document.getElementById('carrito__close')
const carritoLimpiar = document.getElementById('carrito__limpiar')

let propiedades = []
let alquileres = []
let ventas = []
let principalesAlquileres = []
let principalesVentas = []
let carrito = JSON.parse(localStorage.getItem('carrito')) || []

// Funcion utilizada para crear las propiedades, toma los valores por parametro y luego en base al tipo de propiedad utiliza al constructor de la clase Propiedad y la añade a su respectiva lista, luego la lista general de propiedades es el resultado de la concatenación de las listas de ventas y alquileres

const crearPropiedad = (
  estado,
  tipo,
  direccion,
  habitaciones,
  baños,
  precio,
  moneda,
  extras,
) => {
  if (estado === 'alquiler') {
    alquileres.push(
      new Propiedad(
        estado,
        tipo,
        direccion,
        habitaciones,
        baños,
        precio,
        moneda,
        extras,
      ),
    )
  } else if (estado === 'venta') {
    ventas.push(
      new Propiedad(
        estado,
        tipo,
        direccion,
        habitaciones,
        baños,
        precio,
        moneda,
        extras,
      ),
    )
  }
  propiedades = [...alquileres, ...ventas]
}

// Renderizamos los datos del resumen de las propiedades, utilizando distintos metodos de los array para obtener los valores que necesitamos

const renderizarResumen = () => {
  propiedadesCantidad.innerText = propiedades.length

  ventaCantidad.innerText = ventas.length

  ventaMinimo.innerText = ventas
    .map((val) => val.precio)
    .reduce((acc, val) => (acc < val ? acc : val))

  ventaMaximo.innerText = ventas
    .map((val) => val.precio)
    .reduce((acc, val) => (acc > val ? acc : val))

  alquilerCantidad.innerText = alquileres.length

  alquilerMinimo.innerText = alquileres
    .map((val) => val.precio)
    .reduce((acc, val) => (acc < val ? acc : val))

  alquilerMaximo.innerText = alquileres
    .map((val) => val.precio)
    .reduce((acc, val) => (acc > val ? acc : val))
}

// Esta plantilla se encarga de devolver una estructura HTML con los detalles de una propiedad que se le envía por parametro

const plantillaPropiedad = (prop) => {
  let elemento = document.createElement('div')
  elemento.className = 'propiedad card col-sm-12 col-md-4 col-lg-3'
  elemento.innerHTML = `<img
                      src="images/casa-ejemplo.jpg"
                      class="propiedad__imagen card-img-top"
                      alt="..."
                    />
                    <div class="propiedad__contenido card-body">
                      <h5 class="propiedad__resumen card-title">${
                        prop.tipo
                      } en ${prop.estado}</h5>
                      <p class="propiedad__ubicacion card-text fs-2">
                        ${prop.direccion}
                      </p>
                    </div>
                    <ul class="propiedad__lista list-group list-group-flush fs-5">
                      <li class="propiedad__item list-group-item">${
                        prop.habitaciones
                      } habitaciones</li>
                      <li class="propiedad__item list-group-item">${
                        prop.baños
                      } baños</li>
                      <li class="propiedad__item propiedad__item-precio list-group-item">
                        ${prop.estado == 'alquiler' ? 'UYU ' : 'USD '} 
                      ${prop.precio}
                      </li>
                      <li class="propiedad__item list-group-item">
                        ${prop.extras}
                      </li>
                    </ul>
                    <a href="#" data-id="${
                      prop.id
                    }" class="propiedad__link fs-5 btn btn-primary">
                      Agregar a favoritos
                    </a>`
  return elemento
}

const plantillaCarrito = ({ tipo, estado, direccion, precio, id }) => {
  let elemento = document.createElement('div')
  elemento.className = 'propiedad card col-sm-12 col-md-3 col-lg-2'
  elemento.innerHTML = `<img
                      src="images/casa-ejemplo.jpg"
                      class="propiedad__imagen card-img-top"
                      alt="..."
                    />
                    <div class="propiedad__contenido card-body">
                      <h5 class="propiedad__resumen card-title">${tipo} en ${estado}</h5>
                      <p class="propiedad__ubicacion card-text fs-2">
                        ${direccion}
                      </p>
                    </div>
                    <ul class="propiedad__lista list-group list-group-flush fs-5">
                      <li class="propiedad__item propiedad__item-precio list-group-item">
                      ${estado == 'alquiler' ? 'UYU ' : 'USD '} 
                      ${precio}
                      </li>
                    </ul>
                    <a href="#" data-id="${id}" class="carrito__link fs-5 btn btn-primary">
                      Eliminar
                    </a>`
  return elemento
}

// Limpia el contenido de los elementos seleccionados

const clean = () => {
  listaAlquileres.innerHTML = ''
  listaVentas.innerHTML = ''
}

// Se le asigna un evento para cuando se haga click en el botón seleccionado, el cual ejecuta una función que lee los valores de los campos del formulario y los utiliza para pasarlos como parametro de la función utilizada para crear las propiedades, limpia lo anteriormente renderizado y vuelve a mostrar los datos actualizados

crearBtn.addEventListener('click', () => {
  let monedaPrecio
  for (let i = 0; i < moneda.length; i++) {
    if (moneda[i].checked) {
      monedaPrecio = moneda[i].value
    }
  }
  crearPropiedad(
    valorObjetivo.value.toLowerCase(),
    valorTipo.value.toLowerCase(),
    valorDireccion.value.toLowerCase(),
    valorHabitaciones.value,
    valorBaños.value,
    valorPrecio.value,
    monedaPrecio,
    valorExtras.value.toLowerCase(),
  )
  clean()

  if (listaAlquileres.classList.contains('principal')) {
    for (const alquiler of alquileres) {
      listaAlquileres.appendChild(plantillaPropiedad(alquiler))
    }
  } else {
    for (const alquiler of principalesAlquileres) {
      listaAlquileres.appendChild(plantillaPropiedad(alquiler))
    }
  }

  if (listaVentas.classList.contains('principal')) {
    for (const venta of ventas) {
      listaVentas.appendChild(plantillaPropiedad(venta))
    }
  } else {
    for (const venta of principalesVentas) {
      listaVentas.appendChild(plantillaPropiedad(venta))
    }
  }
  renderizarResumen()
})

// Se crean los eventos y se asignan a los botones de los listados para expandirlas

alquileresExpandir.addEventListener('click', (event) => {
  event.preventDefault()
  listaAlquileres.innerHTML = ''
  listaAlquileres.classList.add('principal')
  for (const alquiler of alquileres) {
    listaAlquileres.appendChild(plantillaPropiedad(alquiler))
  }
})

alquileresMinimizar.addEventListener('click', () => {
  listaAlquileres.innerHTML = ''
  listaAlquileres.classList.remove('principal')
  for (const alquiler of principalesAlquileres) {
    listaAlquileres.appendChild(plantillaPropiedad(alquiler))
  }
})

ventasExpandir.addEventListener('click', (event) => {
  event.preventDefault()
  listaVentas.innerHTML = ''
  listaVentas.classList.add('principal')
  for (const venta of ventas) {
    listaVentas.appendChild(plantillaPropiedad(venta))
  }
})

ventasMinimizar.addEventListener('click', () => {
  listaVentas.innerHTML = ''
  listaVentas.classList.remove('principal')
  for (const venta of principalesVentas) {
    listaVentas.appendChild(plantillaPropiedad(venta))
  }
})

alquileresFiltro.addEventListener('click', (event) => {
  event.preventDefault()
  const alquileresFiltrado = alquileres
    .filter(
      (el) =>
        el.precio >= alquileresMinimo.value &&
        el.precio <= alquileresMaximo.value,
    )
    .sort((a, b) =>
      alquileresOrden.value.toLowerCase() == 'menor a mayor precio'
        ? a.precio - b.precio
        : b.precio - a.precio,
    )
  listaAlquileres.innerHTML = ''
  for (const alquiler of alquileresFiltrado) {
    listaAlquileres.appendChild(plantillaPropiedad(alquiler))
  }
})

ventasFiltro.addEventListener('click', (event) => {
  event.preventDefault()
  const ventasFiltrado = ventas
    .filter(
      (el) =>
        el.precio >= ventasMinimo.value && el.precio <= ventasMaximo.value,
    )
    .sort((a, b) =>
      ventasOrden.value.toLowerCase() == 'menor a mayor precio'
        ? a.precio - b.precio
        : b.precio - a.precio,
    )
  listaVentas.innerHTML = ''
  for (const venta of ventasFiltrado) {
    listaVentas.appendChild(plantillaPropiedad(venta))
  }
})

buttonList.addEventListener('click', (event) => {
  event.preventDefault()
  if (
    event.target &&
    event.target.tagName === 'A' &&
    event.target.classList.contains('propiedad__link')
  ) {
    const element = event.target.getAttribute('data-id')

    if (carrito.find((el) => el.id == element)) {
      Toastify({
        text: 'La propiedad ya se encuentra en tus favoritos',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'bottom', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: 'linear-gradient(to right, #00b09b, #96c93d)',
          fontSize: '1.5rem',
        },
        onClick: function () {}, // Callback after click
      }).showToast()
    } else {
      carrito.push(propiedades.find((el) => el.id == element))
      localStorage.setItem('carrito', JSON.stringify(carrito))
      carritoVista.innerHTML = ''
      for (const prop of carrito) {
        carritoVista.appendChild(plantillaCarrito(prop))
      }
      Toastify({
        text: 'Añadiste una propiedad al carrito',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'bottom', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: 'linear-gradient(to right, #00b09b, #96c93d)',
          fontSize: '1.5rem',
        },
        onClick: function () {}, // Callback after click
      }).showToast()
    }
  }
})

wishIcon.addEventListener('click', () => {
  modal.classList.toggle('hidden')
})

carritoVista.addEventListener('click', (event) => {
  event.preventDefault()
  if (
    event.target &&
    event.target.tagName === 'A' &&
    event.target.classList.contains('carrito__link')
  ) {
    const element = event.target.getAttribute('data-id')
    carrito = carrito.filter((e) => e.id != element)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    Toastify({
      text: 'Eliminaste la propiedad',
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'bottom', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: 'linear-gradient(to right, #00b09b, #96c93d)',
        fontSize: '1.5rem',
      },
      onClick: function () {}, // Callback after click
    }).showToast()
    carritoVista.innerHTML = ''
    for (const prop of carrito) {
      carritoVista.appendChild(plantillaCarrito(prop))
    }
  }
})

carritoLimpiar.addEventListener('click', () => {
  Toastify({
    text: 'Limpiaste el carrito',
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: 'bottom', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)',
      fontSize: '1.5rem',
    },
    onClick: function () {}, // Callback after click
  }).showToast()
  carrito = []
  localStorage.setItem('carrito', JSON.stringify(carrito))
  carritoVista.innerHTML = ''
})

carritoClose.addEventListener('click', () => modal.classList.toggle('hidden'))

// Clase propiedad con su constructor y un metodo el cual se utilizará para dar el detalle del precio en función de si la propiedad es para venta o para alquiler

class Propiedad {
  constructor(
    estado,
    tipo,
    direccion,
    habitaciones,
    baños,
    precio,
    moneda,
    extras,
  ) {
    this.id = propiedades.length
    this.estado = estado
    this.tipo = tipo
    this.direccion = direccion
    this.habitaciones = habitaciones
    this.baños = baños
    this.precio = precio
    this.moneda = moneda
    this.extras = extras
  }
}

// Traemos los datos de las propiedades desde data.json

const traerPropiedades = async () => {
  const response = await fetch(
    'https://gabydevx.github.io/Inmobiliaria_Ramirez/data/data.json',
  )
  const data = await response.json()
  propiedades = data
  alquileres = propiedades.filter((e) => e.estado === 'alquiler')
  ventas = propiedades.filter((e) => e.estado === 'venta')

  principalesAlquileres = alquileres.slice(0, 6)
  for (const alquiler of principalesAlquileres) {
    listaAlquileres.appendChild(plantillaPropiedad(alquiler))
  }

  principalesVentas = ventas.slice(0, 6)
  for (const venta of principalesVentas) {
    listaVentas.appendChild(plantillaPropiedad(venta))
  }

  // Se llama a la función para que se ejecute al abrir la página

  renderizarResumen()

  for (const prop of carrito) {
    carritoVista.appendChild(plantillaCarrito(prop))
  }
}

traerPropiedades()
