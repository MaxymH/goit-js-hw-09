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
            Notify.failure("Please choose a date in the future ");
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
        addEm(timer)
    if (minus <= 0) {
        clearInterval(timerId)
        Notify.success('Finish');
    }   
}

function addEm(timer = { days: 0, hours: 0, minutes: 0, seconds: 0 }) {
    const { days, hours, minutes, seconds } = timer
    nav[0].textContent = `${timer.days}`.padStart(2, 0);
    nav[1].textContent = `${timer.hours}`.padStart(2, 0);
    nav[2].textContent = `${timer.minutes}`.padStart(2, 0);
    nav[3].textContent = `${timer.seconds}`.padStart(2, 0);
}



button.addEventListener('click', startTimer)

