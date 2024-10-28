
const API_URL = "http://localhost:3000/api"; // URL real

// Funciones de visualización del formulario

function showCreateFlightForm() {
    document.getElementById("create-flight-form").style.display = "block";
}
function hideCreateFlightForm() {
    document.getElementById("create-flight-form").style.display = "none";
}

// Cargar usuarios desde la base de datos
async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();

        const userTable = document.getElementById("userTable").getElementsByTagName('tbody')[0];
        userTable.innerHTML = '';

        users.forEach(user => {
            const row = userTable.insertRow();
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.role}</td>
                <td>
                    <button onclick="deleteUser(${user.id})">Eliminar</button>
                </td>
            `;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Programar un nuevo vuelo
async function createFlight() {
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const duration = document.getElementById("duration").value;
    const cost = document.getElementById("cost").value;

    const flight = { origin, destination, date, time, duration, cost };

    try {
        const response = await fetch(`${API_URL}/flights`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(flight)
        });

        if (response.ok) {
            alert('Vuelo programado exitosamente');
            loadFlights();
            hideCreateFlightForm();
        } else {
            alert('Error al programar el vuelo');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Cargar vuelos desde la base de datos
async function loadFlights() {
    try {
        const response = await fetch(`${API_URL}/flights`);
        const flights = await response.json();

        const flightTable = document.getElementById("flightTable").getElementsByTagName('tbody')[0];
        flightTable.innerHTML = '';

        flights.forEach(flight => {
            const row = flightTable.insertRow();
            row.innerHTML = `
                <td>${flight.code}</td>
                <td>${flight.origin}</td>
                <td>${flight.destination}</td>
                <td>${flight.date}</td>
                <td>${flight.time}</td>
                <td>${flight.duration}</td>
                <td>${flight.cost}</td>
                <td>
                    <button onclick="editFlight(${flight.code})">Editar</button>
                    <button onclick="deleteFlight(${flight.code})">Cancelar</button>
                </td>
            `;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Eliminar un vuelo
async function deleteFlight(flightCode) {
    if (confirm("¿Está seguro de que desea cancelar este vuelo?")) {
        try {
            const response = await fetch(`${API_URL}/flights/${flightCode}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Vuelo cancelado exitosamente');
                loadFlights();
            } else {
                alert('Error al cancelar el vuelo');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

// Cargar datos al iniciar
window.onload = function () {
    loadUsers();
    loadFlights();
};

