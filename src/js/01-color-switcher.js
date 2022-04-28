
const  bodyEm = document.querySelector('body')
const btn = document.querySelectorAll('button')


const startGenerationRandomColor = () => {
    function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

     timerId = setInterval(() => {
    bodyEm.style.background = getRandomHexColor()
  }, 1000);

    btn[0].disabled = true
}
btn[0].addEventListener('click', startGenerationRandomColor)


const stopGenerationRandomColor = () => {
    clearInterval(timerId)
    btn[0].disabled = false
   }
 
btn[1].addEventListener('click', stopGenerationRandomColor)
