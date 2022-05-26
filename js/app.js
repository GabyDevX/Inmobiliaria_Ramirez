const valorObjetivo = document.getElementById('objetivo')
const valorTipo = document.getElementById('tipo')
const valorDireccion = document.getElementById('direccion')
const valorHabitaciones = document.getElementById('habitaciones')
const valorBaños = document.getElementById('baños')
const valorPrecio = document.getElementById('precio')
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
const listaVentas = document.getElementById('ventas__listado')

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
  crearPropiedad(
    valorObjetivo.value.toLowerCase(),
    valorTipo.value.toLowerCase(),
    valorDireccion.value.toLowerCase(),
    valorHabitaciones.value,
    valorBaños.value,
    valorPrecio.value,
    valorExtras.value.toLowerCase(),
  )

  clean()

  for (const alquiler of alquileres) {
    listaAlquileres.appendChild(plantillaPropiedad(alquiler))
  }
  for (const venta of ventas) {
    listaVentas.appendChild(plantillaPropiedad(venta))
  }
  renderizarResumen()
})

// Clase propiedad con su constructor y un metodo el cual se utilizará para dar el detalle del precio en función de si la propiedad es para venta o para alquiler

class Propiedad {
  constructor(estado, tipo, direccion, habitaciones, baños, precio, extras) {
    this.estado = estado
    this.tipo = tipo
    this.direccion = direccion
    this.habitaciones = habitaciones
    this.baños = baños
    this.precio = precio
    this.extras = extras
  }

  darPrecio() {
    let str
    if (this.estado == 'venta') {
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
  'apto',
  'canales 1268',
  2,
  1,
  17000,
  'terraza, garage',
)
crearPropiedad(
  'venta',
  'casa',
  'andalucia 4597',
  5,
  2,
  270000,
  'patio, terraza, garage, sotano',
)
crearPropiedad(
  'alquiler',
  'casa',
  'tulipanes 7896',
  4,
  2,
  30000,
  'patio, garage',
)
crearPropiedad(
  'venta',
  'apartamento',
  'magallanes 7589',
  3,
  1,
  120000,
  'garage, parrillero, balcón, piscina compartida',
)
crearPropiedad(
  'venta',
  'casa',
  'linqui 4287',
  4,
  2,
  140000,
  'patio, terraza, garage',
)
crearPropiedad('alquiler', 'apartamento', 'soles 2347', 2, 1, 19000, 'balcon')
crearPropiedad(
  'venta',
  'apartamento',
  'linares 1209',
  1,
  1,
  90000,
  'terraza, garage',
)
crearPropiedad(
  'alquiler',
  'casa',
  'pinos 4574',
  4,
  2,
  29500,
  'patio, terraza, garage, parrillero',
)
crearPropiedad(
  'venta',
  'casa',
  'olivares 9734',
  6,
  3,
  190000,
  'patio, terraza, garage, parrillero, piscina',
)
crearPropiedad(
  'alquiler',
  'casa',
  'colorado 1423',
  4,
  2,
  35000,
  'patio, garage',
)
crearPropiedad('venta', 'casa', 'orbes 1523', 5, 2, 102000, 'patio')
crearPropiedad('alquiler', 'apartamento', 'pintado 1263', 3, 1, 25000, 'garage')

// Por cada propiedad dentro de la lista, se añadirá una estructura HTML creada con la función en base a la propiedad que se esté iterando en ese momento.

for (const alquiler of alquileres) {
  listaAlquileres.appendChild(plantillaPropiedad(alquiler))
}

for (const venta of ventas) {
  listaVentas.appendChild(plantillaPropiedad(venta))
}

// Se llama a la función para que se ejecute al abrir la página

renderizarResumen()
