const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error + '. Try another search.'
            } else {
                messageOne.textContent = data.forecast.weather_descriptions[0] + '. ' + data.location
                messageTwo.textContent =  'Current temperature: ' + data.forecast.temperature + '°F.'
                messageThree.textContent = 'Feels like: ' + data.forecast.feelslike + '°F.'
                messageFour.textContent = 'Percipitation: ' + data.forecast.precip + '%.'
            }
            
        })
    })


})

console.log('hey')

