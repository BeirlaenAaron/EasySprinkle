const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

const listenToSocket = function () {
  socket.on("connect", function () {
    console.log("verbonden met socket webserver");
  });

  socket.on("B2F_logs", function (jsonObject) {
    let html_string = `<tr>
    <th>Date</th>
    <th>Time</th>
    <th>Action</th>
  </tr>`;
    console.log("Logs ontvangen");
    console.log(jsonObject);
    for (let actie of jsonObject.logs) {
      html_string += `<tr>
      <td>${actie.Date}</td>
      <td>${actie.Time}</td>
      <td>Sprinklers turned ${actie.Status}</td>
      </tr>`;
    }
    html_logs.innerHTML = html_string;
  })

  socket.on("B2F_status", function (jsonObject) {
    let html_string = ""
    console.info(jsonObject)
    if (jsonObject.status.Status == "OFF") {
      console.info("Status off")
      html_string += `<p class="status-off">OFF</p>`
    }
    if (jsonObject.status.Status == "ON") {
      console.info("Status on")
      html_string += `<p class="status-on">ON</p>`
    }
    html_status.innerHTML = html_string;
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
  html_vochtigheid = document.querySelector('.js-moisture')
  html_temperatuur = document.querySelector('.js-temperature')
  html_waterniveau = document.querySelector('.js-waterlevel')
  html_logs = document.querySelector('.js-logs')
  html_status = document.querySelector('.js-status')
  listenToSocket();
});