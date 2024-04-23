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

var clones = 0;

var dragMe = document.getElementById("drag_me"),
  dragOfX = 0,
  dragOfY = 0,
  clone = null;

function dragStart(e) {
    if (clones >= 5) return; 

    dragOfX = e.pageX - dragMe.offsetLeft;
    dragOfY = e.pageY - dragMe.offsetTop;

    clone = dragMe.cloneNode(true);
    clone.classList.add("dragged");
    document.body.appendChild(clone);

    dragMe.classList.add("dragging");

    addEventListener("mousemove", dragMove);
    addEventListener("mouseup", dragEnd);


  clones++;
}

function dragMove(e) {
  clone.style.left = e.pageX - dragOfX + "px";
  clone.style.top = e.pageY - dragOfY + "px";
}

function dragEnd() {
  removeEventListener("mousemove", dragMove);
  removeEventListener("mouseup", dragEnd);

  dragMe.classList.remove("dragging");
  if (clones > 5) {
    clone.parentNode.removeChild(clone);
    clone = null;
  }
}

dragMe.addEventListener("mousedown", dragStart);

//posição do mouse em relação da imagem

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