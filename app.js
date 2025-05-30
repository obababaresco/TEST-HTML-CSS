// app.js

// --- 1. Variables Globales para el Estado de la Aplicación ---
const estadoApp = {
  nombreHeroe: "",
  apellidoHeroe: "",
  dificultadSeleccionada: null,
  preguntasQuiz: [],
  indicePreguntaActual: 0,
  respuestasUsuario: [],
  puntuacionTotal: 0,
  tiempoInicioPregunta: 0,
  tiempoInicioQuiz: 0,
  intervaloTemporizador: null,
};

// --- 2. Referencias a Elementos del DOM ---
const seccionIdentificacion = document.getElementById("identificacion-heroe");
const formIdentificacion = document.getElementById("form-identificacion");
const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");

const seccionDificultad = document.getElementById("seleccion-dificultad");
const botonesDificultad = document.querySelectorAll(
  "#seleccion-dificultad .botones-dificultad button"
);
const btnComenzarPrueba = document.getElementById("btn-comenzar-prueba");

const seccionQuiz = document.getElementById("quiz-arena");
const preguntaContainer = document.getElementById("pregunta-container");
const btnSiguientePregunta = document.getElementById("btn-siguiente-pregunta");
const indicadorProgreso = document.getElementById("indicador-progreso");
const temporizadorDisplay = document.getElementById("temporizador-display");

const seccionSalonFama = document.getElementById("salon-fama");

// Nuevas referencias para la fase de revisión
const seccionRevisionRespuestas = document.getElementById(
  "revision-respuestas"
);
const tituloRevisionRespuestas = document.getElementById(
  "titulo-revision-respuestas"
);
const listaRespuestas = document.getElementById("lista-respuestas");
const btnVolverSalonFama = document.getElementById("btn-volver-salon-fama");

// --- 3. Banco de Preguntas (EXTENDIDO y CON PUNTUACIÓN) ---
const bancoDePreguntas = [
  // Preguntas BÁSICAS (HTML y CSS) - 10 Puntos cada una
  {
    id: "b1",
    texto: "¿Qué etiqueta HTML se utiliza para crear un hipervínculo?",
    tipo: "seleccionUnica",
    opciones: ["<link>", "<href>", "<a>", "<nav>"],
    respuestaCorrecta: "<a>",
    dificultad: "basico",
    categoria: "HTML",
    puntos: 10,
  },
  {
    id: "b2",
    texto: "¿Qué propiedad CSS se usa para cambiar el color del texto?",
    tipo: "seleccionUnica",
    opciones: ["background-color", "font-color", "text-color", "color"],
    respuestaCorrecta: "color",
    dificultad: "basico",
    categoria: "CSS",
    puntos: 10,
  },
  {
    id: "b3",
    texto:
      "Completa el código CSS para que el siguiente div tenga un borde rojo de 2px sólido:\n\n```css\n.caja-especial {\n  border: _______; /* ¡Escribe aquí tu respuesta! */\n}\n```",
    tipo: "completarCodigo",
    respuestaCorrecta: "2px solid red;",
    dificultad: "basico",
    categoria: "CSS",
    puntos: 10,
  },
  {
    id: "b4",
    texto: "¿Cuál es la etiqueta HTML correcta para un salto de línea?",
    tipo: "seleccionUnica",
    opciones: ["<lb>", "<break>", "<br>", "<newline>"],
    respuestaCorrecta: "<br>",
    dificultad: "basico",
    categoria: "HTML",
    puntos: 10,
  },
  {
    id: "b5",
    texto:
      'Completa el código para incluir un archivo JavaScript externo llamado "script.js" en el HTML:\n\n```html\n<script src="_______"></script>\n```',
    tipo: "completarCodigo",
    respuestaCorrecta: "script.js",
    dificultad: "basico",
    categoria: "HTML",
    puntos: 10,
  },
  {
    id: "b6",
    texto: "¿Qué significa CSS?",
    tipo: "seleccionUnica",
    opciones: [
      "Cascading Style Sheets",
      "Creative Style Solutions",
      "Computer Style Syntax",
      "Colorful Styling System",
    ],
    respuestaCorrecta: "Cascading Style Sheets",
    dificultad: "basico",
    categoria: "CSS",
    puntos: 10,
  },
  {
    id: "b7",
    texto: "¿Cuál es la etiqueta HTML para un encabezado de nivel 1?",
    tipo: "seleccionUnica",
    opciones: ["<h1>", "<head>", "<header>", "<h1/>"],
    respuestaCorrecta: "<h1>",
    dificultad: "basico",
    categoria: "HTML",
    puntos: 10,
  },
  {
    id: "b8",
    texto:
      "¿Qué propiedad CSS se utiliza para controlar el espacio entre el contenido y el borde de un elemento?",
    tipo: "seleccionUnica",
    opciones: ["margin", "border-spacing", "padding", "space"],
    respuestaCorrecta: "padding",
    dificultad: "basico",
    categoria: "CSS",
    puntos: 10,
  },
  {
    id: "b9",
    texto:
      'Completa el código para ocultar un elemento con la clase "secreto" en CSS:\n\n```css\n.secreto {\n  display: _______;\n}\n```',
    tipo: "completarCodigo",
    respuestaCorrecta: "none;",
    dificultad: "basico",
    categoria: "CSS",
    puntos: 10,
  },
  {
    id: "b10",
    texto:
      "¿Qué atributo HTML se usa para especificar una URL de destino para un hipervínculo?",
    tipo: "seleccionUnica",
    opciones: ["src", "link", "href", "url"],
    respuestaCorrecta: "href",
    dificultad: "basico",
    categoria: "HTML",
    puntos: 10,
  },

  // Preguntas MEDIAS (HTML, CSS avanzado, Flexbox/Grid) - 20 Puntos cada una
  {
    id: "m1",
    texto:
      "¿Qué propiedad de CSS se utiliza para alinear elementos horizontalmente en un contenedor flexbox?",
    tipo: "seleccionUnica",
    opciones: [
      "align-items",
      "justify-content",
      "flex-direction",
      "align-content",
    ],
    respuestaCorrecta: "justify-content",
    dificultad: "medio",
    categoria: "CSS",
    puntos: 20,
  },
  {
    id: "m2",
    texto:
      "¿Cuál es el valor por defecto de la propiedad `display` de un `div`?",
    tipo: "seleccionUnica",
    opciones: ["inline", "inline-block", "block", "none"],
    respuestaCorrecta: "block",
    dificultad: "medio",
    categoria: "HTML/CSS",
    puntos: 20,
  },
  {
    id: "m3",
    texto:
      "En un contenedor CSS Grid, ¿qué propiedad define el tamaño de las columnas?",
    tipo: "seleccionUnica",
    opciones: [
      "grid-template-rows",
      "grid-gap",
      "grid-template-columns",
      "grid-auto-flow",
    ],
    respuestaCorrecta: "grid-template-columns",
    dificultad: "medio",
    categoria: "CSS",
    puntos: 20,
  },
  {
    id: "m4",
    texto:
      "Escribe el selector CSS para seleccionar todos los elementos `p` que son hijos directos de un `div` con la clase `articulo`.\n\n```css\n.articulo _______ {\n  /* estilos */\n}\n```",
    tipo: "completarCodigo",
    respuestaCorrecta: "> p",
    dificultad: "medio",
    categoria: "CSS",
    puntos: 20,
  },
  {
    id: "m5",
    texto:
      "¿Qué pseudo-clase CSS se usa para seleccionar un elemento cuando el mouse está sobre él?",
    tipo: "seleccionUnica",
    opciones: [":active", ":focus", ":hover", ":visited"],
    respuestaCorrecta: ":hover",
    dificultad: "medio",
    categoria: "CSS",
    puntos: 20,
  },
  {
    id: "m6",
    texto:
      "¿Cómo se hace que un elemento `div` ocupe todo el ancho disponible utilizando Flexbox, si es un ítem de un contenedor flex?",
    tipo: "completarCodigo",
    respuestaCorrecta: "flex-grow: 1;",
    dificultad: "medio",
    categoria: "CSS",
    puntos: 20,
  },
  {
    id: "m7",
    texto:
      "¿Qué propiedad CSS se utiliza para hacer que un elemento tenga un desplazamiento suave cuando se desplaza el mouse sobre él (transición de color de fondo)?",
    tipo: "completarCodigo",
    respuestaCorrecta: "transition: background-color 0.3s ease;",
    dificultad: "medio",
    categoria: "CSS",
    puntos: 20,
  },
  {
    id: "m8",
    texto:
      "¿Qué atributo HTML se usa para agrupar opciones relacionadas en un menú desplegable `<select>`?",
    tipo: "seleccionUnica",
    opciones: ["<optiongroup>", "<labelgroup>", "<optgroup>", "<group>"],
    respuestaCorrecta: "<optgroup>",
    dificultad: "medio",
    categoria: "HTML",
    puntos: 20,
  },
  {
    id: "m9",
    texto:
      "Completa la regla CSS para centrar horizontal y verticalmente un elemento con `display: flex`:\n\n```css\n.contenedor-flex {\n  display: flex;\n  justify-content: _______;\n  align-items: _______;\n}\n```",
    tipo: "completarCodigo",
    respuestaCorrecta: "center; center;",
    dificultad: "medio",
    categoria: "CSS",
    puntos: 20,
  },
  {
    id: "m10",
    texto: '¿Qué es un "media query" en CSS y para qué se usa?',
    tipo: "completarCodigo",
    respuestaCorrecta:
      "Un media query es una técnica CSS que permite aplicar estilos diferentes a un documento basado en las características del dispositivo (ej. ancho de pantalla, tipo de medio). Se usa para crear diseños responsivos que se adaptan a distintas pantallas.",
    dificultad: "medio",
    categoria: "CSS",
    puntos: 20,
  },

  // Preguntas SENIOR (Patrones complejos, optimización, accesibilidad, JS web APIs) - 30 Puntos cada una
  {
    id: "s1",
    texto:
      "Explica brevemente la diferencia entre `localStorage` y `sessionStorage`.",
    tipo: "completarCodigo",
    respuestaCorrecta:
      "localStorage persiste los datos indefinidamente en el navegador, incluso después de cerrar la ventana o el navegador. sessionStorage solo mantiene los datos mientras la pestaña o ventana del navegador está abierta (datos borrados al cerrarse).",
    dificultad: "senior",
    categoria: "JavaScript/Web APIs",
    puntos: 30,
  },
  {
    id: "s2",
    texto: '¿Qué es la "especificidad" en CSS y cómo se calcula?',
    tipo: "completarCodigo",
    respuestaCorrecta:
      "La especificidad es el algoritmo que determina qué declaraciones de estilo CSS son las más relevantes y se aplican a un elemento. Se calcula asignando un valor numérico a los selectores: estilo inline (1,0,0,0) > ID (0,1,0,0) > clases, atributos y pseudo-clases (0,0,1,0) > elementos y pseudo-elementos (0,0,0,1). Las propiedades con mayor especificidad tienen prioridad.",
    dificultad: "senior",
    categoria: "CSS",
    puntos: 30,
  },
  {
    id: "s3",
    texto:
      "¿Cómo se implementa la carga diferida (lazy loading) de imágenes en HTML de forma nativa?",
    tipo: "completarCodigo",
    respuestaCorrecta:
      '<img src="imagen.jpg" loading="lazy" alt="Descripción">',
    dificultad: "senior",
    categoria: "HTML/Performance",
    puntos: 30,
  },
  {
    id: "s4",
    texto:
      'Explica el concepto de "reflow" y "repaint" en el navegador y cómo evitarlos.',
    tipo: "completarCodigo",
    respuestaCorrecta:
      "Reflow (o layout) es el proceso de recalcular las posiciones y dimensiones de los elementos en el documento después de cambios en el DOM o CSS que afectan el layout. Repaint es el proceso de redibujar los pixeles en la pantalla. Evitar reflows frecuentes (ej. no cambiar propiedades que afecten el layout en bucles) y usar transformaciones CSS (que activan solo repaint o composite) en lugar de cambios de posición/dimensión.",
    dificultad: "senior",
    categoria: "Browser Internals/Performance",
    puntos: 30,
  },
  {
    id: "s5",
    texto:
      "¿Cuál es el propósito del atributo `aria-label` en la accesibilidad web?",
    tipo: "seleccionUnica",
    opciones: [
      "Proporcionar un título visual para un elemento.",
      "Etiquetar un grupo de elementos para navegación.",
      "Ofrecer una etiqueta de texto accesible para lectores de pantalla cuando no hay un texto visible.",
      "Definir una abreviación para un término técnico.",
    ],
    respuestaCorrecta:
      "Ofrecer una etiqueta de texto accesible para lectores de pantalla cuando no hay un texto visible.",
    dificultad: "senior",
    categoria: "Accesibilidad",
    puntos: 30,
  },
  {
    id: "s6",
    texto:
      "¿Cuál es la diferencia entre `position: relative;` y `position: absolute;`?",
    tipo: "completarCodigo",
    respuestaCorrecta:
      "`position: relative;` posiciona un elemento relativo a su posición normal en el flujo del documento, manteniendo su espacio original. `position: absolute;` posiciona un elemento relativo al ancestro posicionado más cercano (si no hay, al body), eliminándolo del flujo normal del documento.",
    dificultad: "senior",
    categoria: "CSS",
    puntos: 30,
  },
  {
    id: "s7",
    texto: 'Explica qué es el "box model" en CSS y sus componentes.',
    tipo: "completarCodigo",
    respuestaCorrecta:
      "El box model CSS es una caja que envuelve cada elemento HTML. Consiste en: Contenido (content), Relleno (padding), Borde (border) y Margen (margin). Define cómo se distribuyen los elementos y cómo interactúan entre sí.",
    dificultad: "senior",
    categoria: "CSS",
    puntos: 30,
  },
  {
    id: "s8",
    texto:
      '¿Qué es la "decoupling" en el desarrollo de software y cómo se aplica en el frontend?',
    tipo: "completarCodigo",
    respuestaCorrecta:
      "Decoupling (desacoplamiento) es el diseño de componentes para que sean lo más independientes posible. En frontend, significa crear módulos con responsabilidades claras y mínimas dependencias entre sí (ej. componentes UI reusables sin lógica de negocio, o separación de la lógica de renderizado y la lógica de datos).",
    dificultad: "senior",
    categoria: "Arquitectura/Frontend",
    puntos: 30,
  },
  {
    id: "s9",
    texto:
      "¿Cuál es el propósito de un Service Worker en las Progressive Web Apps (PWAs)?",
    tipo: "completarCodigo",
    respuestaCorrecta:
      "Un Service Worker es un script que el navegador ejecuta en segundo plano, separado de la página web. Permite funcionalidades offline, precaching de recursos, notificaciones push y la intercepción y gestión de peticiones de red, lo que es clave para las PWAs.",
    dificultad: "senior",
    categoria: "PWA/JavaScript",
    puntos: 30,
  },
  {
    id: "s10",
    texto:
      "¿Cómo se manejan las animaciones complejas y la alta performance en la web sin JavaScript?",
    tipo: "seleccionUnica",
    opciones: [
      "Usando WebGL directamente.",
      "Mediante CSS Animations y Transitions, y la propiedad `will-change`.",
      "Solo con SVGs.",
      "Con WebAssembly para animaciones. ",
    ],
    respuestaCorrecta:
      "Mediante CSS Animations y Transitions, y la propiedad `will-change`.",
    dificultad: "senior",
    categoria: "Performance/CSS",
    puntos: 30,
  },
];

// --- 4. Funciones de Navegación entre Fases ---
function cambiarFase(seccionAMostrar) {
  document.querySelectorAll(".fase").forEach((fase) => {
    fase.classList.add("oculto");
  });
  seccionAMostrar.classList.remove("oculto");
}

// --- 5. Lógica de la Fase 1: Identificación del Héroe ---
formIdentificacion.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nombre = inputNombre.value.trim();
  const apellido = inputApellido.value.trim();

  if (nombre === "" || apellido === "") {
    alert(
      "¡Héroe! Necesitas ingresar tu nombre y apellido para comenzar tu leyenda."
    );
    return;
  }

  estadoApp.nombreHeroe = nombre;
  estadoApp.apellidoHeroe = apellido;

  console.log(
    `Héroe Registrado: ${estadoApp.nombreHeroe} ${estadoApp.apellidoHeroe}`
  );

  cambiarFase(seccionDificultad);
});

// --- 6. Lógica de la Fase 2: Selección de Dificultad ---
botonesDificultad.forEach((boton) => {
  boton.addEventListener("click", function () {
    botonesDificultad.forEach((btn) => btn.classList.remove("seleccionado"));
    this.classList.add("seleccionado");

    estadoApp.dificultadSeleccionada = this.getAttribute("data-dificultad");
    console.log("Dificultad Seleccionada:", estadoApp.dificultadSeleccionada);

    btnComenzarPrueba.classList.remove("oculto");
  });
});

btnComenzarPrueba.addEventListener("click", function () {
  if (!estadoApp.dificultadSeleccionada) {
    alert("Por favor, selecciona un nivel de conquista antes de comenzar.");
    return;
  }

  estadoApp.preguntasQuiz = bancoDePreguntas.filter(
    (pregunta) => pregunta.dificultad === estadoApp.dificultadSeleccionada
  );

  estadoApp.preguntasQuiz.sort(() => Math.random() - 0.5);

  estadoApp.indicePreguntaActual = 0;
  estadoApp.respuestasUsuario = [];
  estadoApp.puntuacionTotal = 0;
  estadoApp.tiempoInicioPregunta = 0;

  cambiarFase(seccionQuiz);
  iniciarTemporizadorGeneral();
  cargarPreguntaActual();
});

// --- 7. Lógica de la Fase 3: El Quiz ---
function iniciarTemporizadorGeneral() {
  estadoApp.tiempoInicioQuiz = Date.now();
  estadoApp.intervaloTemporizador = setInterval(actualizarTemporizador, 1000);
  temporizadorDisplay.classList.remove("oculto");
}

function actualizarTemporizador() {
  const tiempoTranscurrido = Date.now() - estadoApp.tiempoInicioQuiz;
  const segundosTotales = Math.floor(tiempoTranscurrido / 1000);
  const minutos = Math.floor(segundosTotales / 60);
  const segundos = segundosTotales % 60;

  const minutosStr = String(minutos).padStart(2, "0");
  const segundosStr = String(segundos).padStart(2, "0");

  temporizadorDisplay.textContent = `Tiempo transcurrido: ${minutosStr}:${segundosStr}`;
}

function detenerTemporizadorGeneral() {
  clearInterval(estadoApp.intervaloTemporizador);
  estadoApp.intervaloTemporizador = null;
  temporizadorDisplay.classList.add("oculto");
}

function cargarPreguntaActual() {
  if (estadoApp.indicePreguntaActual < estadoApp.preguntasQuiz.length) {
    const pregunta = estadoApp.preguntasQuiz[estadoApp.indicePreguntaActual];
    preguntaContainer.innerHTML = "";

    indicadorProgreso.textContent = `Pregunta ${
      estadoApp.indicePreguntaActual + 1
    } de ${estadoApp.preguntasQuiz.length}`;

    const preguntaHTML = document.createElement("div");
    preguntaHTML.classList.add("pregunta-item");

    const tituloPregunta = document.createElement("p");
    tituloPregunta.classList.add("pregunta-texto");
    tituloPregunta.innerHTML = pregunta.texto.replace(/\n/g, "<br>");
    preguntaHTML.appendChild(tituloPregunta);

    if (pregunta.tipo === "seleccionUnica") {
      const opcionesDiv = document.createElement("div");
      opcionesDiv.classList.add("opciones-seleccion-unica");
      pregunta.opciones.forEach((opcion) => {
        const label = document.createElement("label");
        label.classList.add("opcion-label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "opcion-pregunta";
        input.value = opcion;
        label.appendChild(input);
        label.appendChild(document.createTextNode(` ${opcion}`));

        opcionesDiv.appendChild(label);
      });
      preguntaHTML.appendChild(opcionesDiv);
    } else if (pregunta.tipo === "completarCodigo") {
      const codigoWrapper = document.createElement("div");
      codigoWrapper.classList.add("codigo-wrapper");

      const partesTexto = pregunta.texto.split("_______");

      if (partesTexto[0] !== undefined && partesTexto[0].trim() !== "") {
        const preCodigo = document.createElement("pre");
        preCodigo.classList.add("codigo-pre");
        preCodigo.textContent = partesTexto[0].trim();
        codigoWrapper.appendChild(preCodigo);
      }

      const inputCodigo = document.createElement("textarea");
      inputCodigo.classList.add("input-codigo");
      inputCodigo.placeholder = "¡Escribe aquí tu respuesta!";
      inputCodigo.rows = 4;
      codigoWrapper.appendChild(inputCodigo);

      if (partesTexto[1] !== undefined && partesTexto[1].trim() !== "") {
        const postCodigo = document.createElement("pre");
        postCodigo.classList.add("codigo-pre");
        postCodigo.textContent = partesTexto[1].trim();
        codigoWrapper.appendChild(postCodigo);
      }

      preguntaHTML.appendChild(codigoWrapper);
    }

    preguntaContainer.appendChild(preguntaHTML);

    if (estadoApp.indicePreguntaActual === estadoApp.preguntasQuiz.length - 1) {
      btnSiguientePregunta.textContent = "¡Finalizar y Ver mi Hazaña!";
    } else {
      btnSiguientePregunta.textContent = "Siguiente Pregunta";
    }

    estadoApp.tiempoInicioPregunta = Date.now();
  } else {
    finalizarQuiz();
  }
}

btnSiguientePregunta.addEventListener("click", function () {
  const preguntaActual =
    estadoApp.preguntasQuiz[estadoApp.indicePreguntaActual];
  let respuestaDada = null; // Inicializar a null

  if (preguntaActual.tipo === "seleccionUnica") {
    const opcionSeleccionada = document.querySelector(
      'input[name="opcion-pregunta"]:checked'
    );
    // Si no se selecciona ninguna opción, respuestaDada se mantiene como null.
    respuestaDada = opcionSeleccionada ? opcionSeleccionada.value : null;
  } else if (preguntaActual.tipo === "completarCodigo") {
    const inputCodigo = document.querySelector(".input-codigo");
    // Si el textarea está vacío, respuestaDada será una cadena vacía.
    respuestaDada = inputCodigo ? inputCodigo.value.trim() : "";
  }

  // Normalización de respuestas para comparación
  const respuestaCorrectaNormalizada = String(preguntaActual.respuestaCorrecta)
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
  const respuestaDadaNormalizada = String(respuestaDada || "") // Usa String(respuestaDada || "") para manejar null
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

  const esCorrecta = respuestaDadaNormalizada === respuestaCorrectaNormalizada;

  const tiempoRespuesta = Date.now() - estadoApp.tiempoInicioPregunta;

  estadoApp.respuestasUsuario.push({
    pregunta: preguntaActual,
    respuesta: respuestaDada, // Guardar la respuesta tal cual fue dada (puede ser null o "")
    correcta: esCorrecta,
    tiempo: tiempoRespuesta,
  });

  if (esCorrecta) {
    estadoApp.puntuacionTotal += preguntaActual.puntos;
  }

  estadoApp.indicePreguntaActual++;
  cargarPreguntaActual();
});

// --- 8. Lógica de la Fase 4: El Salón de la Fama ---
function finalizarQuiz() {
  detenerTemporizadorGeneral();
  cambiarFase(seccionSalonFama);
  const maxPuntuacionPosible = estadoApp.preguntasQuiz.reduce(
    (sum, q) => sum + q.puntos,
    0
  );

  const tiempoFinalTranscurrido = Date.now() - estadoApp.tiempoInicioQuiz;
  const segundosTotalesFinal = Math.floor(tiempoFinalTranscurrido / 1000);
  const minutosFinal = Math.floor(segundosTotalesFinal / 60);
  const segundosFinal = segundosTotalesFinal % 60;

  const tiempoFormateado = `${String(minutosFinal).padStart(2, "0")}:${String(
    segundosFinal
  ).padStart(2, "0")}`;

  seccionSalonFama.innerHTML = `
        <h2>¡${estadoApp.nombreHeroe} ${
    estadoApp.apellidoHeroe
  }, esta es tu Proeza!</h2>
        <p class="mensaje-felicitacion">
            ${
              estadoApp.puntuacionTotal === maxPuntuacionPosible
                ? "¡IMPRESIONANTE! Has logrado la máxima puntuación. ¡Eres un/a verdadero/a Maestro/a del DOM!"
                : estadoApp.puntuacionTotal > maxPuntuacionPosible * 0.75
                ? "¡Victoria Épica! Has demostrado un gran dominio de tus habilidades."
                : estadoApp.puntuacionTotal > maxPuntuacionPosible * 0.5
                ? "¡Buen intento! Tu leyenda sigue creciendo. ¡Sigue practicando!"
                : "¡No te rindas, Valiente! La maestría en el código requiere práctica. ¡Puedes lograrlo!"
            }
        </p>
        <p class="puntuacion">Puntuación: ${
          estadoApp.puntuacionTotal
        } / ${maxPuntuacionPosible}</p>
        <p class="tiempo-total-quiz">Tiempo total de tu aventura: <strong>${tiempoFormateado}</strong></p>
        <div class="opciones-final">
            <button class="boton-principal" id="btn-revisar-respuestas">📜 Ver el Pergamino de Respuestas</button>
            <button class="boton-principal" id="btn-probar-otro-nivel">🛡️ ¡Probar Otro Nivel!</button>
            <button class="boton-principal" id="btn-volver-inicio">👋 Salir de la Arena</button>
        </div>
    `;

  document
    .getElementById("btn-revisar-respuestas")
    .addEventListener("click", mostrarRevisionRespuestas);

  document
    .getElementById("btn-probar-otro-nivel")
    .addEventListener("click", () => {
      estadoApp.dificultadSeleccionada = null;
      botonesDificultad.forEach((btn) => btn.classList.remove("seleccionado"));
      btnComenzarPrueba.classList.add("oculto");
      cambiarFase(seccionDificultad);
    });

  document.getElementById("btn-volver-inicio").addEventListener("click", () => {
    estadoApp.nombreHeroe = "";
    estadoApp.apellidoHeroe = "";
    estadoApp.dificultadSeleccionada = null;
    estadoApp.preguntasQuiz = [];
    estadoApp.indicePreguntaActual = 0;
    estadoApp.respuestasUsuario = [];
    estadoApp.puntuacionTotal = 0;
    inputNombre.value = "";
    inputApellido.value = "";
    botonesDificultad.forEach((btn) => btn.classList.remove("seleccionado"));
    btnComenzarPrueba.classList.add("oculto");
    cambiarFase(seccionIdentificacion);
  });
}

// --- 9. Lógica de la Fase 5: Revisión del Pergamino ---
function mostrarRevisionRespuestas() {
  cambiarFase(seccionRevisionRespuestas);
  tituloRevisionRespuestas.textContent = `El Detalle de tu Aventura, ${estadoApp.nombreHeroe} ${estadoApp.apellidoHeroe}`;
  listaRespuestas.innerHTML = "";

  estadoApp.respuestasUsuario.forEach((itemRespuesta, index) => {
    const preguntaOriginal = itemRespuesta.pregunta;
    const respuestaDada = itemRespuesta.respuesta; // Esto puede ser null o una cadena vacía
    const esCorrecta = itemRespuesta.correcta;
    const tiempoRespuesta = itemRespuesta.tiempo;

    const revisionItem = document.createElement("div");
    revisionItem.classList.add("revision-item");
    revisionItem.classList.add(esCorrecta ? "acierto" : "desacierto");

    const icono = esCorrecta ? "✔️" : "❌";

    const numPregunta = document.createElement("h3");
    numPregunta.textContent = `Pregunta ${index + 1}: ${icono}`;
    revisionItem.appendChild(numPregunta);

    const enunciado = document.createElement("p");
    enunciado.classList.add("revision-pregunta-texto");
    // Reemplaza los saltos de línea solo para mostrar en HTML
    // enunciado.innerHTML = preguntaOriginal.texto.replace(/\n/g, "<br>");
    preguntaOriginal.texto.split("\n").forEach((linea) => {
      enunciado.appendChild(document.createTextNode(linea));
      enunciado.appendChild(document.createElement("br"));
    });

    revisionItem.appendChild(enunciado);

    const tuRespuesta = document.createElement("p");
    tuRespuesta.classList.add("revision-tu-respuesta");

    let textoRespuestaUsuario;
    // Si la respuestaDada es null o una cadena vacía, muestra "No respondida"
    if (respuestaDada === null || respuestaDada === "") {
      textoRespuestaUsuario = "No respondida";
    } else {
      textoRespuestaUsuario = respuestaDada;
    }

    // Asegúrate de que la clase de color se aplique siempre según 'esCorrecta'
    const claseColor = esCorrecta ? "texto-acierto" : "texto-desacierto";
    // tuRespuesta.innerHTML = `<strong>Tu Respuesta:</strong> <span class="${claseColor}">${textoRespuestaUsuario}</span>`;
    tuRespuesta.innerHTML = `<strong>Tu Respuesta:</strong> `;
    const span = document.createElement("span");
    span.className = claseColor;
    span.textContent = textoRespuestaUsuario;
    tuRespuesta.appendChild(span);

    revisionItem.appendChild(tuRespuesta);

    // Muestra la respuesta correcta SIEMPRE que la respuesta del usuario NO sea correcta
    // if (!esCorrecta) {
    //   const respuestaCorrecta = document.createElement("p");
    //   respuestaCorrecta.classList.add("revision-respuesta-correcta");
    //   const textoCorrecto = document.createElement("span");
    //   textoCorrecto.textContent =
    //     preguntaOriginal.respuestaCorrecta || "(no disponible)";
    //   respuestaCorrecta.innerHTML = "<strong>Respuesta Correcta:</strong> ";
    //   respuestaCorrecta.appendChild(textoCorrecto);
    // }

    const tiempoInfo = document.createElement("p");
    tiempoInfo.classList.add("revision-tiempo-respuesta");
    tiempoInfo.innerHTML = `Tiempo de respuesta: <em>${(
      tiempoRespuesta / 1000
    ).toFixed(2)} segundos</em>`;
    revisionItem.appendChild(tiempoInfo);

    listaRespuestas.appendChild(revisionItem);
  });
}

btnVolverSalonFama.addEventListener("click", () => {
  cambiarFase(seccionSalonFama);
});
