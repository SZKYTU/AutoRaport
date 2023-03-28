var protocols = [];

function loadProtocols() {
    var lastName = document.getElementById("last-name-input").value;
    var filteredProtocols = protocols;
    if (lastName) {
        filteredProtocols = protocols.filter(function (protocol) {
            return protocol.last_name.toLowerCase().indexOf(lastName.toLowerCase()) !== -1;
        });
    }
    var sortedProtocols = filteredProtocols.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });
    var first10Protocols = sortedProtocols.slice(0, 10);
    var html = "";
    for (var i = 0; i < first10Protocols.length; i++) {
        html += "<tr><td>" + first10Protocols[i].id + "</td><td>" + first10Protocols[i].last_name + "</td><td>" + first10Protocols[i].date + "</td><td>" + first10Protocols[i].comment + "</td></tr>";
    }
    document.getElementById("protocols-table").getElementsByTagName("tbody")[0].innerHTML = html;
}

function init() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            protocols = JSON.parse(this.responseText);
            loadProtocols();
        }
    };
    xhttp.open("GET", "/protocols/show", true);
    xhttp.send();
}

document.addEventListener("DOMContentLoaded", init);

document.getElementById("last-name-input").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        loadProtocols();
    }
});
