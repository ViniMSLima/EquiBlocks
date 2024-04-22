const star = 100;
const triangle = 500;
const square = 200;
const circle = 700;
const pentagon = 1000; 


function NumSubtract()
{
    let numCounter = parseInt(this.dataset.numero)

    if(!isNaN(numCounter)){
        numCounter--;

        this.dataset.numCounter = numCounter;
    }
}

const components = document.querySelectorAll('????');

components.forEach(componente => {
    componente.addEventListener('click', diminuirNumero);
});