const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

//messageSuccess.textContent = "From Javascript"

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    messageOne.textContent = "Loading";
    messageTwo.textContent = '';
    const locationURL = 'http://localhost:3000/weather?address=' + location;
    fetch(locationURL).then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error);
            messageOne.textContent = data.error;
            messageTwo.textContent = '';
        } else{
            messageOne.textContent = data.forecast;
            messageTwo.textContent = data.location;
        }
        });
    });
})