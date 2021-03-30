const personasCount = document.getElementById("personas")
const moonsCount = document.getElementById("moons")
const planetsCount = document.getElementById("planets")
const shipsCount = document.getElementById("ships")

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
  const response = await getData('vehicles/')
  const vehiclesArray = response.data.results

  const dataArray = []
  dataArray.push(['Veículos', 'Passageiros'])
  vehiclesArray.forEach(vehicle => {
    dataArray.push([vehicle.name, Number(vehicle.passengers)])
  })

  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    title: 'Maiores veículos',
    legend: 'none'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}

handleCount()
handleTable()

function handleCount() {
  Promise.all([
    getData("people/"),
    getData("vehicles/"),
    getData("planets/"),
    getData("starships/")
  ]).then((response) => {
    personasCount.innerHTML = response[0].data.count;
    moonsCount.innerHTML = response[1].data.count;
    planetsCount.innerHTML = response[2].data.count;
    shipsCount.innerHTML = response[3].data.count;
  })
}

async function handleTable() {
  const response = await getData('films/')
  const filmsData = response.data.results
  filmsData.forEach(film => {
    $('#filmsTable').append(`
      <tr>
        <td>${film.title}</td>
        <td>${moment(film.release_date).format("DD/MM/YYYY") }</td>
        <td>${film.director}</td>
        <td>${film.episode_id}</td>
      </tr>`)
  })
}

function getData(data) {
  return axios.get(`https://swapi.dev/api/${data}`)
}

