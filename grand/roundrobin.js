const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQnjWhZcYXDwTGz5Z5PF-yHgDQgjkXbSx2yLJDXJj-TYyOweSkWIdglnIuEzgC3lDLl8So5reF-BJom/pub?gid=1375866868&single=true&output=csv";

fetch(sheetURL)
.then(res => res.text())
.then(csv => {
    const rows = csv.trim().split("\n").map(r => r.split(","));
    rows.shift(); // remove header

    let teams = rows.map(r => ({
        team: r[0],
        win: parseInt(r[1]) || 0,
        loss: parseInt(r[2]) || 0,
        points: parseInt(r[3]) || 0
    }));

    // 🔥 SORT BY POINTS → WIN → LOSS
    teams.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.win !== a.win) return b.win - a.win;
        return a.loss - b.loss;
    });

    renderTable(teams);
});

function renderTable(data) {
    let html = `
    <div class="points-table">
        <h2>🏆 Standings</h2>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Team</th>
                    <th>W</th>
                    <th>L</th>
                    <th>Pts</th>
                </tr>
            </thead>
            <tbody>
    `;

    data.forEach((t, i) => {
        let cls = "";

        if (i === 0) cls = "first";
        else if (i === 1) cls = "second";
        else if (i === data.length - 1) cls = "last";

        html += `
        <tr class="${cls}">
            <td>${i + 1}</td>
            <td>${t.team}</td>
            <td>${t.win}</td>
            <td>${t.loss}</td>
            <td>${t.points}</td>
        </tr>`;
    });

    html += `</tbody></table></div>`;

    document.getElementById("scheduleContainer").innerHTML = html;
}