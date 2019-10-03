const weatherForm = document.querySelector('form');
const searchInput = document.getElementById('searchField');
const loc = document.getElementById('location');
const forecast = document.getElementById('forecast');

weatherForm.addEventListener('submit', (e) => {
  const location = searchInput.value
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.Error) {
        loc.textContent = data.Error
      } else {
        loc.textContent = data.location
        forecast.textContent = data.forecast
      }
    })
  })
  e.preventDefault();
})