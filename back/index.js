const star = 100;
const triangle = 500;
const square = 200;
const circle = 700;
const pentagon = 1000;

function NumSubtract() {
  let numCounter = parseInt(this.dataset.numero);

  if (!isNaN(numCounter)) {
    numCounter--;

    this.dataset.numCounter = numCounter;
  }
}

const components = document.querySelectorAll("????");

components.forEach((componente) => {
  componente.addEventListener("click", diminuirNumero);
});

function Timer() {
  let remainingTime = 30 * 60; // Tempo em segundos
  const timerElement = document.getElementById('timer'); 

  const updateTimerDisplay = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    timerElement.textContent = `${minutes}min ${seconds}s`;
  };

  const countdown = () => {
    updateTimerDisplay();
    if (remainingTime > 0) {
      remainingTime--;
      setTimeout(countdown, 1000); 
    } else {
      alert("Passaram-se 30 minutos!");
    }
  };
  
  console.log(countdown)
  countdown(); 
}

//arrastar elementos para a balança

var Draggable = function (elemento) {
  var that = this;
  this.elemento = elemento;
  this.posX = 0;
  this.posY = 0;
  this.top = 0;
  this.left = 0;
  this.usosRestantes = 5; 
  this.clone = null;

  this.refMouseUp = function (event) {
    that.onMouseUp(event);
  }

  this.refMouseMove = function (event) {
    that.onMouseMove(event);
  }

  this.elemento.addEventListener("mousedown", function (event) {
    that.onMouseDown(event);
  });
}

Draggable.prototype.onMouseDown = function (event) {
  if (this.usosRestantes > 0) {
    this.posX = event.x;
    this.posY = event.y;

    this.elemento.classList.add("dragging");

    this.clone = this.elemento.cloneNode(true);
    this.clone.style.position = "absolute";
    this.clone.style.pointerEvents = "none";
    document.body.appendChild(this.clone);

    window.addEventListener("mousemove", this.refMouseMove);
    window.addEventListener("mouseup", this.refMouseUp);
  }
}

Draggable.prototype.onMouseMove = function (event) {
  if (this.usosRestantes > 0) {
    var diffX = event.x - this.posX;
    var diffY = event.y - this.posY;

    this.clone.style.top = (event.clientY - this.elemento.offsetHeight / 2) + "px";
    this.clone.style.left = (event.clientX - this.elemento.offsetWidth / 2) + "px";
  }
}

Draggable.prototype.onMouseUp = function (event) {
  if (this.usosRestantes > 0) {
    this.usosRestantes--; 

    this.top = parseInt(this.elemento.style.top.replace(/\D/g, '')) || 0;
    this.left = parseInt(this.elemento.style.left.replace(/\D/g, '')) || 0;
    this.elemento.classList.remove("dragging");
  
    window.removeEventListener("mousemove", this.refMouseMove);
    window.removeEventListener("mouseup", this.refMouseUp);
  }
}

var draggables = document.querySelectorAll(".draggable");
[].forEach.call(draggables, function (draggable, indice) {
  new Draggable(draggable);
});

//posição do desenho em relação da imagem 

function detectarPosicao(event) {
var imagem = document.getElementById("imagem");
var retangulo = imagem.getBoundingClientRect();
var posicaoX = event.clientX - retangulo.left;
var larguraImagem = retangulo.right - retangulo.left;

if (posicaoX < larguraImagem / 2) {
  console.log("Mouse está mais para a esquerda.");
} else {
  console.log("Mouse está mais para a direita.");
}
}
