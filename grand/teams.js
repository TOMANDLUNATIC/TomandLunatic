const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQnjWhZcYXDwTGz5Z5PF-yHgDQgjkXbSx2yLJDXJj-TYyOweSkWIdglnIuEzgC3lDLl8So5reF-BJom/pub?gid=1165841271&single=true&output=csv";

fetch(sheetURL)
.then(res => res.text())
.then(csv => {

    const rows = csv.trim().split("\n").slice(1);
    const container = document.getElementById("teamsContainer");
    const sortedRows = rows.sort((a, b) => {
    const getPriority = (row) => {
        const pos = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)[18]?.trim().toLowerCase();

        if (pos === "upper") return 1;
        if (pos === "lower") return 2;
        if (pos === "out") return 3;
        return 4;
    };

    return getPriority(a) - getPriority(b);
});

    sortedRows.forEach(row => {

        const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

        const logo = cols[1]?.trim();
        const shortForm = cols[2]?.trim();
        const teamName = cols[3]?.trim();
        const position = cols[18]?.trim();

        if (!teamName) return;

        const card = document.createElement("div");
        card.className = "team-card";

        card.innerHTML = `
    <div class="position ${position?.toLowerCase()}">
        ${position || ""}
    </div>

    <img src="${logo}" class="team-logo">
    <h3>${teamName}</h3>
    <span class="tag">${shortForm}</span>
`;

        // 🔥 CLICK → OPEN MODAL
        card.addEventListener("click", () => openModal(cols));

        container.appendChild(card);
    });
});


// 🔥 OPEN MODAL
function openModal(data) {

    const modal = document.getElementById("teamModal");
    const content = document.getElementById("modalContent");

    const logo = data[1];
    const teamName = data[3];

    let playersHTML = "";

    // 🧑 PLAYERS
    for (let i = 4; i <= 13; i += 2) {
        if (data[i]) {
            playersHTML += `<div class="player">${data[i]}</div>`;
        }
    }

    // 🔄 SUBS
    for (let i = 14; i <= 17; i += 2) {
        if (data[i]) {
            playersHTML += `<div class="player sub">SUB: ${data[i]}</div>`;
        }
    }

    content.innerHTML = `
        <img src="${logo}" class="modal-logo">
        <h2>${teamName}</h2>
        <div class="players">${playersHTML}</div>
    `;

    modal.style.display = "flex";
}


// ❌ CLOSE BUTTON
function closeModal() {
    document.getElementById("teamModal").style.display = "none";
}


// ❌ OUTSIDE CLICK CLOSE
window.addEventListener("click", function(e) {
    const modal = document.getElementById("teamModal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});