// Definición de las cartas con su valor y la URL de la imagen.
const cartas = [  
    {valor: 1, url:"https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg"},
    {valor: 2, url:"https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg"},
    {valor: 3, url:"https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg"},
    {valor: 4, url:"https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg"},
    {valor: 5, url:"https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg"},
    {valor: 6, url:"https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg"},
    {valor: 7, url:"https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg"},
    {valor: 0.5, url:"https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg"},
    {valor: 0.5, url:"https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg"},
    {valor: 0.5, url:"https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg"},
  ];
  
  // Variables de estado y elementos del DOM
  let puntuacion: number = 0;  // Almacena la puntuación del jugador.
  let juegoTerminado: boolean = false;  // Indica si el juego ha terminado.
  
  const contenedorPuntuacion = document.getElementById("puntaje") as HTMLElement;  // Elemento donde se muestra la puntuación.
  const contenedorCarta = document.getElementById("carta-actual") as HTMLImageElement;  // Elemento donde se muestra la carta actual.
  const contenedorMensaje= document.getElementById("mensaje") as HTMLElement;  // Elemento donde se muestra el mensaje de finalización.
  const botonPidoCarta = document.getElementById("pido-carta") as HTMLButtonElement;  // Botón para pedir una carta.
  const botonPidoPlantarme= document.getElementById("pido-plantarme") as HTMLButtonElement;  // Botón para plantarse.
  const botonNuevaPartida= document.getElementById("nueva-partida") as HTMLButtonElement;  // Botón para iniciar una nueva partida.
  
  
  // Función para mostrar la puntuación actual
  function muestraPuntuacion(): void {  
    if (contenedorPuntuacion instanceof HTMLElement) {
      contenedorPuntuacion.textContent = puntuacion.toString();  // Actualiza el texto de la puntuación 
    }
  }
  
  // Función para obtener una carta aleatoria
  function dameCarta(): { valor: number; url: string } {   
    const indice = Math.floor(Math.random() * cartas.length);  // Genera un índice aleatorio basado en el tamaño del array de cartas.
    return cartas[indice];  // Devuelve la carta en esa posición.
  }
  
  // Función para mostrar la carta actual en la interfaz
  function mostrarCarta(carta: { valor: number; url: string }): void {  
    if (contenedorCarta instanceof HTMLImageElement) {
      contenedorCarta.src = carta.url;  // Cambia la imagen de la carta mostrada.
    }
  }
  
  // Función para finalizar el juego y mostrar el mensaje correspondiente
  function finalizarJuego(mensaje: string): void {  
    juegoTerminado = true;  // Marca el estado del juego como terminado.
    if (contenedorMensaje instanceof HTMLElement) {
      contenedorMensaje.textContent = mensaje;  // Muestra el mensaje de finalización
    }
    if (botonPidoCarta instanceof HTMLButtonElement) {
      botonPidoCarta.setAttribute("disabled", "true");  // Deshabilita el botón de "Pedir Carta".
    }
    if (botonPidoPlantarme instanceof HTMLButtonElement) {
      botonPidoPlantarme.setAttribute("disabled", "true");  // Deshabilita el botón de "Me Planto".
    }
    if (botonNuevaPartida instanceof HTMLButtonElement) {
      botonNuevaPartida.style.display = "block";  // Muestra el botón para iniciar una nueva partida.
    }
    
  }
  
  // Evento al hacer clic en "Pedir Carta"
  if (botonPidoCarta instanceof HTMLButtonElement)
    botonPidoCarta.addEventListener("click", () => {
      if (juegoTerminado) return;  // Si el juego ya terminó, no hacer nada.
      
    const carta = dameCarta();  // Obtiene una carta aleatoria.
    mostrarCarta(carta);  // Muestra la carta
    puntuacion += carta.valor;  // Suma el valor de la carta a la puntuación.
    muestraPuntuacion();  // Actualiza la puntuación mostrada en la interfaz.
       
    if (puntuacion > 7.5) {  // Si la puntuación supera 7.5, el jugador pierde.
       finalizarJuego("Game Over: Te has pasado de 7.5");  
    }
  });
  
  // Evento al hacer clic en "Me Planto"
  if (botonPidoPlantarme instanceof HTMLButtonElement) {
    botonPidoPlantarme.addEventListener("click", () => {
      if (juegoTerminado) return;  // Si el juego ya terminó, no hacer nada.
    
      // Condiciones de fin de juego según la puntuación.
    if (puntuacion <= 4.5) {     
      finalizarJuego("Has sido muy conservador");  // Si la puntuación es menor o igual a 4.5 (a pesar de que la tarea marcaba 4 je), el mensaje será de haber sido conservador.
    } else if (puntuacion === 5) {     
      finalizarJuego("Te ha entrado el canguelo eh?");  // Si la puntuación es 5, este será el mensaje.
    } else if (puntuacion > 5 && puntuacion < 7.5) {     
      finalizarJuego("Casi casi...");  // Si la puntuación es mayor a 5 y está cerca de 7.5, el mensaje será de casi lograrlo.
    } else if (puntuacion === 7.5) {     
      finalizarJuego("¡Lo has clavado! ¡Enhorabuena!");  // Si la puntuación es exactamente 7.5, el mensaje será de victoria.
    }
  })};
  
  // Evento al hacer clic en "Nueva Partida"
    botonNuevaPartida.addEventListener("click", () => {  
    puntuacion = 0;  // Reinicia la puntuación.
    juegoTerminado = false;  // Reinicia el estado de juego.
    muestraPuntuacion();  // Actualiza la puntuación mostrada en la interfaz.
    
    if (contenedorMensaje) {
      contenedorMensaje.textContent = "";  // Borra el mensaje de finalización.
    }
    
    if (contenedorCarta) {
      contenedorCarta.src = "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";  // Muestra la carta de respaldo.
    }
    
    botonPidoCarta.removeAttribute("disabled");  // Habilita el botón "Pedir Carta".
    botonPidoPlantarme.removeAttribute("disabled");  // Habilita el botón "Me Planto".
    botonNuevaPartida.style.display = "none";  // Oculta el botón de "Nueva Partida" hasta que el juego termine.
  });
  
  // Inicializa la puntuación cuando se carga el documento
    document.addEventListener("DOMContentLoaded", muestraPuntuacion);//Asegura que la puntuación se muestra correctamente cuando se carga la página