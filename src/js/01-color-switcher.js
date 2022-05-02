
const  bodyEm = document.querySelector('body')
const btn = document.querySelectorAll('button')

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
    

const startGenerationRandomColor = () => {
    timerId = setInterval(() => {
    bodyEm.style.background = getRandomHexColor()
  }, 1000);

    btn[0].disabled = true
}



const stopGenerationRandomColor = () => {
    clearInterval(timerId)
    btn[0].disabled = false
  }
 

btn[0].addEventListener('click', startGenerationRandomColor)   
btn[1].addEventListener('click', stopGenerationRandomColor)
