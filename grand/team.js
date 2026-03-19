const data = JSON.parse(localStorage.getItem("teamData"));

document.getElementById("teamName").innerText = data[2];

const playersDiv = document.getElementById("players");

// Players
for (let i = 3; i <= 12; i += 2) {
    if (data[i]) {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            ${data[i]} <br>
            <small>ID: ${data[i+1]}</small>
        `;

        playersDiv.appendChild(div);
    }
}

// Subs
for (let i = 13; i <= 16; i += 2) {
    if (data[i]) {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            SUB: ${data[i]} <br>
            <small>ID: ${data[i+1]}</small>
        `;

        playersDiv.appendChild(div);
    }
}