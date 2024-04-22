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
  setTimeout(() => {
    setTimeout(() => {
      alert("Passaram-se 30 minutos!");
    }, 30 * 60 * 1000);
  }, 30 * 60 * 1000);
}

Timer();

//arrastar elementos para a balança

var dragMe = document.getElementById("drag_me"),
  dragOfX = 0,
  dragOfY = 0,
  clone = null;

function dragStart(e) {
  dragOfX = e.pageX - dragMe.offsetLeft;
  dragOfY = e.pageY - dragMe.offsetTop;

 
  clone = dragMe.cloneNode(true);
  clone.classList.add("dragged");
  document.body.appendChild(clone);

  dragMe.classList.add("dragging");

  addEventListener("mousemove", dragMove);
  addEventListener("mouseup", dragEnd);
}

function dragMove(e) {
  clone.style.left = e.pageX - dragOfX + "px";
  clone.style.top = e.pageY - dragOfY + "px";
}

function dragEnd() {
  removeEventListener("mousemove", dragMove);
  removeEventListener("mouseup", dragEnd);

  dragMe.classList.remove("dragging");

  if (clone) {
    clone.parentNode.removeChild(clone);
    clone = null;
  }
}

dragMe.addEventListener("mousedown", dragStart);
