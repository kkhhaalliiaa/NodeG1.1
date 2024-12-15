console.log('Client side javascript is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const unitSelect = document.getElementById('unit-select')

messageOne.textContent = ''
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const unit = unitSelect.value;
    console.log(unit)

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}&unit=${unit}`).then((response)=> {
        response.json().then((data) => {
            console.log(data)
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = location
            messageTwo.textContent = `${location} is ${data.forecast}`
        }
        })
    })
})
