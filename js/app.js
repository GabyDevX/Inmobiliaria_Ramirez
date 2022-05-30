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

//Seleccionar los valores de los campos dentro de los formularios de las secciones para realizar un filtro

let propiedades = []
const alquileres = []
const ventas = []

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
  propiedades = alquileres.concat(ventas)
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
                        ${prop.darPrecio()}
                      </li>
                      <li class="propiedad__item list-group-item">
                        ${prop.extras}
                      </li>
                    </ul>
                    <a href="#" class="propiedad__link fs-5 btn btn-primary">
                      Agregar a favoritos
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
  console.log(monedaPrecio)
  clean()

  for (const alquiler of alquileres) {
    listaAlquileres.appendChild(plantillaPropiedad(alquiler))
  }
  for (const venta of ventas) {
    listaVentas.appendChild(plantillaPropiedad(venta))
  }
  renderizarResumen()
})

// Se crean los eventos y se asignan a los botones de los listados para expandirlas
// Unir los botones y poner condicional con nombre de clase

alquileresExpandir.addEventListener('click', (event) => {
  event.preventDefault()
  listaAlquileres.innerHTML = ''
  for (const alquiler of alquileres) {
    listaAlquileres.appendChild(plantillaPropiedad(alquiler))
  }
})

alquileresMinimizar.addEventListener('click', (event) => {
  // event.preventDefault()
  listaAlquileres.innerHTML = ''
  for (const alquiler of principalesAlquileres) {
    listaAlquileres.appendChild(plantillaPropiedad(alquiler))
  }
})

ventasExpandir.addEventListener('click', (event) => {
  event.preventDefault()
  listaVentas.innerHTML = ''
  for (const venta of ventas) {
    listaVentas.appendChild(plantillaPropiedad(venta))
  }
})

ventasMinimizar.addEventListener('click', (event) => {
  // event.preventDefault()
  listaVentas.innerHTML = ''
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
    this.estado = estado
    this.tipo = tipo
    this.direccion = direccion
    this.habitaciones = habitaciones
    this.baños = baños
    this.precio = precio
    this.moneda = moneda
    this.extras = extras
  }

  darPrecio() {
    let str
    if (this.moneda == 'usd') {
      str = 'U$S ' + this.precio
      return str
    }
    str = 'UYU ' + this.precio + '/Mes'
    return str
  }
}

// Creación de propiedades para llenar las listas y poder mostrarlas en el navegador

crearPropiedad(
  'alquiler',
  'apartamento',
  'canales 1268',
  2,
  1,
  17000,
  'uyu',
  'terraza, garage',
)
crearPropiedad(
  'venta',
  'casa',
  'andalucia 4597',
  5,
  2,
  270000,
  'usd',
  'patio, terraza, garage, sotano',
)
crearPropiedad(
  'alquiler',
  'casa',
  'tulipanes 7896',
  4,
  2,
  30000,
  'uyu',
  'patio, garage',
)
crearPropiedad(
  'venta',
  'apartamento',
  'magallanes 7589',
  3,
  1,
  120000,
  'usd',
  'garage, parrillero, balcón, piscina compartida',
)
crearPropiedad(
  'venta',
  'casa',
  'linqui 4287',
  4,
  2,
  140000,
  'usd',
  'patio, terraza, garage',
)
crearPropiedad(
  'alquiler',
  'apartamento',
  'soles 2347',
  2,
  1,
  19000,
  'uyu',
  'balcon',
)
crearPropiedad(
  'venta',
  'apartamento',
  'linares 1209',
  1,
  1,
  90000,
  'usd',
  'terraza, garage',
)
crearPropiedad(
  'alquiler',
  'casa',
  'pinos 4574',
  4,
  2,
  29500,
  'uyu',
  'patio, terraza, garage, parrillero',
)
crearPropiedad(
  'venta',
  'casa',
  'olivares 9734',
  6,
  3,
  190000,
  'usd',
  'patio, terraza, garage, parrillero, piscina',
)
crearPropiedad(
  'alquiler',
  'casa',
  'colorado 1423',
  4,
  2,
  35000,
  'uyu',
  'patio, garage',
)
crearPropiedad('venta', 'casa', 'orbes 1523', 5, 2, 102000, 'usd', 'patio')
crearPropiedad(
  'alquiler',
  'apartamento',
  'pintado 1263',
  3,
  1,
  21000,
  'uyu',
  'garage',
)
crearPropiedad(
  'venta',
  'apartamento',
  'luna 7436',
  5,
  2,
  120000,
  'usd',
  'patio',
)
crearPropiedad(
  'alquiler',
  'apartamento',
  'fundas 7081',
  3,
  1,
  22000,
  'uyu',
  'balcon',
)
crearPropiedad(
  'venta',
  'apartamento',
  'antimano 2309',
  5,
  2,
  217000,
  'usd',
  'patio',
)
crearPropiedad(
  'alquiler',
  'apartamento',
  'cigales 1299',
  3,
  1,
  26000,
  'uyu',
  'garage, patio',
)
crearPropiedad('venta', 'casa', 'alaces 5278', 5, 2, 100000, 'usd', 'patio')
crearPropiedad('alquiler', 'casa', 'linares 2312', 3, 1, 22000, 'uyu', 'garage')
crearPropiedad('venta', 'casa', 'colinas 2308', 5, 2, 92000, 'usd', 'patio')
crearPropiedad(
  'alquiler',
  'casa',
  'propios 983',
  3,
  1,
  29000,
  'uyu',
  'garage, patio',
)
crearPropiedad('venta', 'casa', 'gines 9725', 5, 2, 80000, 'usd', 'patio')
crearPropiedad(
  'alquiler',
  'apartamento',
  'viñas 4912',
  3,
  1,
  18000,
  'uyu',
  'garage, patio',
)
crearPropiedad(
  'venta',
  'apartamento',
  'cantes 2281',
  5,
  2,
  78000,
  'usd',
  'balcon',
)
crearPropiedad(
  'alquiler',
  'apartamento',
  'agraciada 4030',
  3,
  1,
  30000,
  'uyu',
  'garage',
)

// Por cada propiedad dentro de la lista filtrada, se añadirá una estructura HTML creada con la función en base a la propiedad que se esté iterando en ese momento.

const principalesAlquileres = alquileres.slice(0, 6)
for (const alquiler of principalesAlquileres) {
  listaAlquileres.appendChild(plantillaPropiedad(alquiler))
}

const principalesVentas = ventas.slice(0, 6)
for (const venta of principalesVentas) {
  listaVentas.appendChild(plantillaPropiedad(venta))
}

// Se llama a la función para que se ejecute al abrir la página

renderizarResumen()
