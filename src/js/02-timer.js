import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const button = document.querySelector('button')
button.disabled = true
const nav = document.querySelectorAll('.value')

const selectedTime = []

let timerId = null

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedTime.push(selectedDates[0])
        const parse = selectedDates[0]
        const date = new Date()
        if (date >= parse) {
            Notify.failure("Please choose a date in the future 😢");
        } else {
            button.disabled = false
        }
    },
};



flatpickr("#datetime-picker", options);



const startTimer = () => {
    
    timerId = setInterval(start, 1000) 
    button.disabled = true
}


const start = () => {
        const newDate = Date.parse(new Date())
        const minus = Date.parse(selectedTime[0]) - newDate
        const timer = convertMs(minus)
        const { days, hours, minutes, seconds } = timer
        nav[0].textContent = days
        nav[1].textContent = hours
        nav[2].textContent = minutes
        nav[3].textContent = seconds
    for (const i of nav) {
            
            if (i.textContent.length < 2) {
                i.insertAdjacentHTML('afterbegin', 0)
            }
    }  

    if (minus <= 0n) {
        clearInterval(timerId)
        Notify.success('Finish 👌');
    }   
}
button.addEventListener('click', startTimer)

