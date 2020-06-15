const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

const listenToSocket = function () {
    socket.on("connect", function () {
        console.log("verbonden met socket webserver");
    });

    socket.on("B2F_vochtigheid", function (jsonObject) {
        let html_string = "";
        console.log("Vochtigheid ontvangen.");
        console.log(jsonObject.vochtigheid.Waarde);
        html_string += `${jsonObject.vochtigheid.Waarde}`;
        html_vochtigheid.innerHTML = html_string;
    })

    socket.on("B2F_temperatuur", function (jsonObject) {
        let html_string = "";
        console.log("Temperatuur ontvangen.");
        console.log(jsonObject.temperatuur.Waarde);
        html_string += `${jsonObject.temperatuur.Waarde}`;
        html_temperatuur.innerHTML = html_string;
    })

    socket.on("B2F_waterniveau", function (jsonObject) {
        let html_string = "";
        console.log("Water niveau ontvangen.");
        console.log(jsonObject.waterniveau.Waarde);
        html_string += `${jsonObject.waterniveau.Waarde}`;
        html_waterniveau.innerHTML = html_string;
    })

    socket.on("B2F_status", function (jsonObject) {
        let html_string = ""
        console.info(jsonObject)
        if (jsonObject.status.Status == "OFF") {
            console.info("Status off")
            html_string += `<div class="toggle-btn">
            <div class="inner-circle"></div>
        </div>`
        }
        if (jsonObject.status.Status == "ON") {
            console.info("Status on")
            html_string += `<div class="toggle-btn active-btn">
            <div class="inner-circle"></div>
        </div>`
        }

        html_status.innerHTML = html_string;
        const knop = document.querySelector('.toggle-btn')
        knop.addEventListener("click", function () {
            if (knop.classList.contains('active-btn')) {
                knop.classList.remove('active-btn')
                console.info('Knop clicked - af')
                let status = "OFF"
                socket.emit('F2B_toggle_status', { 'status': status });
            }
            else {
                knop.classList.add('active-btn')
                console.info('Knop clicked - aan')
                let status = "ON"
                socket.emit('F2B_toggle_status', { 'status': status });
            }
        })
    })
};

const listenToMeasure = function () {
    measureknop = document.querySelector('.js-btn-measure')
    measureknop.addEventListener("click", function () {
        socket.emit('F2B_vochtigheid_manual');
        socket.emit('F2B_temperatuur_manual');
        socket.emit('F2B_waterniveau_manual');
        setTimeout(function () {
            location.reload()
        }, 300);
    })
}


document.addEventListener("DOMContentLoaded", function () {
    console.info("DOM geladen");
    html_vochtigheid = document.querySelector('.js-moisture')
    html_temperatuur = document.querySelector('.js-temperature')
    html_waterniveau = document.querySelector('.js-waterlevel')
    html_status = document.querySelector('.js-togglebtn')
    listenToSocket();
    listenToMeasure();
});