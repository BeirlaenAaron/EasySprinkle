const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

const listenToSocket = function () {
  socket.on("connect", function () {
    console.log("verbonden met socket webserver");
  });

  socket.on("B2F_temperatuur_grafiek", function (jsonObject) {
    console.log("Temperaturen voor grafiek ontvangen.");
    console.log(jsonObject)
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Date', 'Temperature (°C)'],
        [jsonObject.temp_grafiek[4].Date, jsonObject.temp_grafiek[4].Waarde],
        [jsonObject.temp_grafiek[3].Date, jsonObject.temp_grafiek[3].Waarde],
        [jsonObject.temp_grafiek[2].Date, jsonObject.temp_grafiek[2].Waarde],
        [jsonObject.temp_grafiek[1].Date, jsonObject.temp_grafiek[1].Waarde],
        [jsonObject.temp_grafiek[0].Date, jsonObject.temp_grafiek[0].Waarde]
      ]);

      var options = {
        curveType: 'function',
        legend: { position: 'bottom' },
        backgroundColor: { fill: 'transparent' },
        colors: ['#D60000']
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_temp'));

      chart.draw(data, options);
    }
  })

  socket.on("B2F_water_grafiek", function (jsonObject) {
    console.log("Waterniveau's voor grafiek ontvangen.");
    console.log(jsonObject)
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Date', 'Water Level (mm)'],
        [jsonObject.water_grafiek[4].Date, jsonObject.water_grafiek[4].Waarde],
        [jsonObject.water_grafiek[3].Date, jsonObject.water_grafiek[3].Waarde],
        [jsonObject.water_grafiek[2].Date, jsonObject.water_grafiek[2].Waarde],
        [jsonObject.water_grafiek[1].Date, jsonObject.water_grafiek[1].Waarde],
        [jsonObject.water_grafiek[0].Date, jsonObject.water_grafiek[0].Waarde]
      ]);

      var options = {
        curveType: 'function',
        legend: { position: 'bottom' },
        backgroundColor: { fill: 'transparent' },
        colors: ['#7D87E2']
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_water'));

      chart.draw(data, options);
    }
  })

  socket.on("B2F_vochtigheid_grafiek", function (jsonObject) {
    console.log("Vochtigheidsgraden voor grafiek ontvangen.");
    console.log(jsonObject)
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ['Date', 'Moisture (%)'],
        [jsonObject.vochtigheid_grafiek[4].Date, jsonObject.vochtigheid_grafiek[4].Waarde],
        [jsonObject.vochtigheid_grafiek[3].Date, jsonObject.vochtigheid_grafiek[3].Waarde],
        [jsonObject.vochtigheid_grafiek[2].Date, jsonObject.vochtigheid_grafiek[2].Waarde],
        [jsonObject.vochtigheid_grafiek[1].Date, jsonObject.vochtigheid_grafiek[1].Waarde],
        [jsonObject.vochtigheid_grafiek[0].Date, jsonObject.vochtigheid_grafiek[0].Waarde]
      ]);

      var options = {
        curveType: 'function',
        legend: { position: 'bottom' },
        backgroundColor: { fill: 'transparent' },
        colors: ['#86371E']
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_moist'));

      chart.draw(data, options);
    }
  })
};


// const clearClassList = function (el) {
//   el.classList.remove("c-room--wait");
//   el.classList.remove("c-room--on");
// };

// const listenToUI = function () {
//   const knoppen = document.querySelectorAll(".js-power-btn");
//   for (const knop of knoppen) {
//     knop.addEventListener("click", function () {
//       const id = this.dataset.idlamp;
//       let nieuweStatus;
//       if (this.dataset.statuslamp == 0) {
//         nieuweStatus = 1;
//       } else {
//         nieuweStatus = 0;
//       }
//       //const statusOmgekeerd = !status;
//       clearClassList(document.querySelector(`.js-room[data-idlamp="${id}"]`));
//       document.querySelector(`.js-room[data-idlamp="${id}"]`).classList.add("c-room--wait");
//       socket.emit("F2B_switch_light", { lamp_id: id, new_status: nieuweStatus });
//     });
//   }
// };

// const listenToSocket = function () {
//   socket.on("connected", function () {
//     console.log("verbonden met socket webserver");
//   });

//   //in stap 2
//   socket.on("B2F_alles_uit", function (json) {
//     console.log("alle lampen zijn automatisch uitgezet");
//   });

//   socket.on("B2F_status_lampen", function (jsonObject) {
//     console.log("Dit is de status van de lampen");
//     console.log(jsonObject);
//     for (const lamp of jsonObject.lampen) {
//       const room = document.querySelector(`.js-room[data-idlamp="${lamp.id}"]`);
//       if (room) {
//         const knop = room.querySelector(".js-power-btn");
//         knop.dataset.statuslamp = lamp.status;
//         clearClassList(room);
//         if (lamp.status == 1) {
//           room.classList.add("c-room--on");
//         }
//       }
//     }
//   });

//   socket.on("B2F_verandering_lamp", function (jsonObject) {
//     console.log("Er is een status van een lamp veranderd");
//     console.log(jsonObject.lamp.id);
//     console.log(jsonObject.lamp.status);

//     const room = document.querySelector(`.js-room[data-idlamp="${jsonObject.lamp.id}"]`);
//     if (room) {
//       const knop = room.querySelector(".js-power-btn"); //spreek de room, als start. Zodat je enkel knop krijgt die in de room staat
//       knop.dataset.statuslamp = jsonObject.lamp.status;

//       clearClassList(room);
//       if (jsonObject.lamp.status == 1) {
//         room.classList.add("c-room--on");
//       }
//     }
//   });
// };

document.addEventListener("DOMContentLoaded", function () {
  console.info("DOM geladen");
  listenToSocket();
});