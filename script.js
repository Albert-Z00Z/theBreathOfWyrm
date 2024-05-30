document.addEventListener("DOMContentLoaded", function() {
  var intro1 = document.getElementById('intro1');
  var intro2 = document.getElementById('intro2');
  var intro3 = document.getElementById('intro3');
  var mainContent = document.getElementById('main-content');

  // Mostrar la primera introducción
  intro1.style.display = 'block';

  // Desvanecer la primera introducción y mostrar la segunda después de 5 segundos
  setTimeout(function() {
    intro1.style.display = 'none';
    intro2.style.display = 'block';

    // Desvanecer la segunda introducción y mostrar la tercera después de 5 segundos
    setTimeout(function() {
      intro2.style.display = 'none';
      intro3.style.display = 'block';

      // Desvanecer la tercera introducción y mostrar el contenido principal después de 5 segundos adicionales
      setTimeout(function() {
        intro3.style.display = 'none';
        mainContent.style.display = 'block';
      }, 5000); // 5000 milisegundos = 5 segundos para la tercera intro
    }, 5000); // 5000 milisegundos = 5 segundos para la segunda intro
  }, 5000); // 5000 milisegundos = 5 segundos para la primera intro
});


let xp = 0;
let salud = 100;
let oro = 50;
let armaActual = 0;
let luchando;
let saludMonstruo;
let inventario = ["palo"];

const boton1 = document.querySelector('#boton1');
const boton2 = document.querySelector("#boton2");
const boton3 = document.querySelector("#boton3");
const texto = document.querySelector("#texto");
const xpTexto = document.querySelector("#xpTexto");
const saludTexto = document.querySelector("#saludTexto");
const oroTexto = document.querySelector("#oroTexto");
const estadísticasMonstruo = document.querySelector("#estadísticasMonstruo");
const nombreMonstruo = document.querySelector("#nombreMonstruo");
const saludMonstruoTexto = document.querySelector("#saludMonstruo");
const imagen = document.querySelector("#imagen"); // Agregamos la referencia al elemento de imagen

const armas = [
  { name: 'palo', power: 5 },
  { name: 'daga', power: 30 },
  { name: 'martillo de garra', power: 50 },
  { name: 'espada', power: 100 }
];
const monstruos = [
  {
    name: "araña",
    level: 2,
    health: 15,
    img: "img/araña.png" // Agrega la imagen 
  },
  {
    name: "bestia colmilluda",
    level: 8,
    health: 60,
    img: "img/bestia.png" // Agrega la imagen 
  },
  {
    name: "dragón",
    level: 20,
    health: 300,
    img: "img/dragon.jpg" // Agrega la imagen 
  }
];
const ubicaciones = [
  {
    name: "plaza del pueblo",
    "button text": ["Ir a la tienda", "Ir a la cueva", "Luchar contra el dragón"],
    "button functions": [irTienda, irCueva, lucharDragon],
    text: "Estás en la plaza del pueblo. Ves un cartel que dice \"Tienda\".",
    img: "img/plaza1..jpg"// Agrega la imagen 
  },
  {
    name: "tienda",
    "button text": ["Comprar 10 salud (10 oro)", "Comprar arma (30 oro)", "Ir a la plaza del pueblo"],
    "button functions": [comprarSalud, comprarArma, irPlaza],
    text: "Entras en la tienda.",
    img: "img/tienda.jpg"// Agrega la imagen 
  },
  {
    name: "cueva",
    "button text": ["Luchar contra baba", "Luchar contra bestia colmilluda", "Ir a la plaza del pueblo"],
    "button functions": [lucharBaba, lucharBestia, irPlaza],
    text: "Entras en la cueva. Ves algunos monstruos.",
    img: "img/cueva..jpg"// Agrega la imagen 
  },
  {
    name: "lucha",
    "button text": ["Atacar", "Esquivar", "Correr"],
    "button functions": [atacar, esquivar, irPlaza],
    text: "Estás luchando contra un monstruo.",
    img: ""// Agrega la imagen 
  },
 {
    name: "matar monstruo",
    "button text": ["Ir a la plaza del pueblo", "Ir a la plaza del pueblo", "Ir a la plaza del pueblo"],
    "button functions": [irPlaza, irPlaza, huevoPascua],
    text: 'El monstruo grita "¡Arg!" mientras muere. Ganas puntos de experiencia y encuentras oro.',
    img: "img/cueva..jpg"// Agrega la imagen 
  },
{
    name: "perder",
    "button text": ["¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?"],
    "button functions": [reiniciar, reiniciar, reiniciar],
    text: "Mueres. &#x2620;",
    img: "img/gameover.png"// Agrega la imagen 
  },
  { 
    name: "ganar", 
    "button text": ["¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?", "¿JUGAR DE NUEVO?"], 
    "button functions": [reiniciar, reiniciar, reiniciar], 
    text: "¡Derrotas al dragón! ¡GANASTE EL JUEGO! &#x1F389;" ,
    img: "img/victoria.jpg"// Agrega la imagen 
  },
  {
    name: "huevo de pascua",
    "button text": ["2", "8", "¿Ir a la plaza del pueblo?"],
    "button functions": [elegirDos, elegirOcho, irPlaza],
    text: "Encuentras un juego secreto. Elige un número de arriba. Se elegirán diez números al azar entre 0 y 10. ¡Si el número que eliges coincide con uno de los números aleatorios, ganas!",
    img: ""// Agrega la imagen 
  }
];

// inicializar botones
boton1.onclick = irTienda;
boton2.onclick = irCueva;
boton3.onclick = lucharDragon;

function actualizar(ubicacion) {
  estadísticasMonstruo.style.display = "none";
  boton1.innerText = ubicacion["button text"][0];
  boton2.innerText = ubicacion["button text"][1];
  boton3.innerText = ubicacion["button text"][2];
  boton1.onclick = ubicacion["button functions"][0];
  boton2.onclick = ubicacion["button functions"][1];
  boton3.onclick = ubicacion["button functions"][2];
  texto.innerHTML = ubicacion.text;

  // Establece la imagen de fondo según la ubicación o el monstruo actual
  if (ubicacion.img) {
    imagen.style.backgroundImage = `url(${ubicacion.img})`;
  } else if (luchando !== undefined) {
    imagen.style.backgroundImage = `url(${monstruos[luchando].img})`;
  }
}

function irPlaza() {
  actualizar(ubicaciones[0]);
}

function irTienda() {
  actualizar(ubicaciones[1]);
}

function irCueva() {
  actualizar(ubicaciones[2]);
}

function comprarSalud() {
  if (oro >= 10) {
    oro -= 10;
    salud += 10;
    oroTexto.innerText = oro;
    saludTexto.innerText = salud;
  } else {
    texto.innerText = "No tienes suficiente oro para comprar salud.";
  }
}

function comprarArma() {
  if (armaActual < armas.length - 1) {
    if (oro >= 30) {
      oro -= 30;
      armaActual++;
      oroTexto.innerText = oro;
      let nuevaArma = armas[armaActual].name;
      texto.innerText = "Ahora tienes un(a) " + nuevaArma + ".";
      inventario.push(nuevaArma);
      texto.innerText += " En tu inventario tienes: " + inventario;
    } else {
      texto.innerText = "No tienes suficiente oro para comprar un arma.";
    }
  } else {
    texto.innerText = "¡Ya tienes el arma más poderosa!";
    boton2.innerText = "Vender arma por 15 oro";
    boton2.onclick = venderArma;
  }
}

function venderArma() {
  if (inventario.length > 1) {
    oro += 15;
    oroTexto.innerText = oro;
    let armaActual = inventario.shift();
    texto.innerText = "Vendiste un(a) " + armaActual + ".";
    texto.innerText += " En tu inventario tienes: " + inventario;
  } else {
    texto.innerText = "¡No vendas tu única arma!";
  }
}

function lucharBaba() {
  luchando = 0;
  irLuchar();
}

function lucharBestia() {
  luchando = 1;
  irLuchar();
}

function lucharDragon() {
  luchando = 2;
  irLuchar();
}

function irLuchar() {
  actualizar(ubicaciones[3]);
  saludMonstruo = monstruos[luchando].health;
  estadísticasMonstruo.style.display = "block";
  nombreMonstruo.innerText = monstruos[luchando].name;
  saludMonstruoTexto.innerText = saludMonstruo;
}

function atacar() {
  texto.innerText = "El " + monstruos[luchando].name + " ataca.";
  texto.innerText += " Lo atacas con tu " + armas[armaActual].name + ".";
  salud -= obtenerValorAtaqueMonstruo(monstruos[luchando].level);
  if (esGolpeAlMonstruo()) {
    saludMonstruo -= armas[armaActual].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    texto.innerText += " Fallas.";
  }
  saludTexto.innerText = salud;
  saludMonstruoTexto.innerText = saludMonstruo;
  if (salud <= 0) {
    perder();
  } else if (saludMonstruo <= 0) {
    if (luchando === 2) {
      ganarJuego();
    } else {
      derrotarMonstruo();
    }
  }
  if (Math.random() <= .1 && inventario.length !== 1) {
    texto.innerText += " Tu " + inventario.pop() + " se rompe.";
    armaActual--;
  }
}

function obtenerValorAtaqueMonstruo(nivel) {
  const golpe = (nivel * 5) - (Math.floor(Math.random() * xp));
  console.log(golpe);
  return golpe > 0 ? golpe : 0;
}

function esGolpeAlMonstruo() {
  return Math.random() > .2 || salud < 20;
}

function esquivar() {
  texto.innerText = "Esquivas el ataque del " + monstruos[luchando].name;
}

function derrotarMonstruo() {
  oro += Math.floor(monstruos[luchando].level * 6.7);
  xp += monstruos[luchando].level;
  oroTexto.innerText = oro;
  xpTexto.innerText = xp;
  actualizar(ubicaciones[4]);
}

function perder() {
  actualizar(ubicaciones[5]);
}

function ganarJuego() {
  actualizar(ubicaciones[6]);
}

function reiniciar() {
  xp = 0;
  salud = 100;
  oro = 50;
  armaActual = 0;
  inventario = ["palo"];
  oroTexto.innerText = oro;
  saludTexto.innerText = salud;
  xpTexto.innerText = xp;
  irPlaza();
}

function huevoPascua() {
  actualizar(ubicaciones[7]);
}

function elegirDos() {
  elegir(2);
}

function elegirOcho() {
  elegir(8);
}

function elegir(estimación) {
  const números = [];
  while (números.length < 10) {
    números.push(Math.floor(Math.random() * 11));
  }
  texto.innerText = "Elegiste " + estimación + ". Aquí están los números aleatorios:\n";
  for (let i = 0; i < 10; i++) {
    texto.innerText += números[i] + "\n";
  }
  if (números.includes(estimación)) {
    texto.innerText += "¡Correcto! ¡Ganas 20 oro!";
    oro += 20;
    oroTexto.innerText = oro;
  } else {
    texto.innerText += "¡Incorrecto! ¡Pierdes 10 salud!";
    salud -= 10;
    saludTexto.innerText = salud;
    if (salud <= 0) {
      perder();
    }
  }
}