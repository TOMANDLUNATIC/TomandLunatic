const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQnjWhZcYXDwTGz5Z5PF-yHgDQgjkXbSx2yLJDXJj-TYyOweSkWIdglnIuEzgC3lDLl8So5reF-BJom/pub?gid=697859674&single=true&output=csv";

/* 🎙 HOST → YOUTUBE LINKS */
const HOST_LINKS = {
    "Tom and Lunatic": "https://youtube.com/@tomandlunatic",
    "Mobasation Official": "https://youtube.com/@mobastationofficial",  
    "Scarlett Glitch": "https://youtube.com/@Scarlettglitch85",
    "Soul Reaper": "https://youtube.com/@SOUL_REAPER_15"
};

/* 🔥 SAFE CSV PARSER (handles commas inside text) */
function parseCSV(text) {
    const rows = [];
    let row = [];
    let current = "";
    let insideQuotes = false;

    for (let char of text) {
        if (char === '"') {
            insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
            row.push(current);
            current = "";
        } else if (char === '\n' && !insideQuotes) {
            row.push(current);
            rows.push(row);
            row = [];
            current = "";
        } else {
            current += char;
        }
    }

    if (current) {
        row.push(current);
        rows.push(row);
    }

    return rows;
}

/* 🚀 LOAD DATA */
async function loadSchedule() {
    try {
        const res = await fetch(CSV_URL);
        const data = await res.text();

        const rows = parseCSV(data);
        const headers = rows[0].map(h => h.trim());

        const container = document.getElementById("scheduleContainer");
        container.innerHTML = "";

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row.length < headers.length) continue;

            const obj = {};
            headers.forEach((h, j) => obj[h] = (row[j] || "").trim());

            const card = document.createElement("div");
            card.className = "match-card";

            card.innerHTML = `
    <div class="match-id">#M${obj["MATCH"] || "-"}</div>

    <div class="match-time">
        ${formatDate(obj["DATE"], obj["TIME"])}
    </div>

    <div class="teams">
        <div class="team">
            <img src="${obj["B_LOGO"]}" onerror="this.src='fallback.png'" />
            <p>${obj["TEAM BLUE"] || "-"}</p>
        </div>

        <div class="vs">VS</div>

        <div class="team">
            <img src="${obj["R_LOGO"]}" onerror="this.src='fallback.png'" />
            <p>${obj["TEAM RED"] || "-"}</p>
        </div>
    </div>

    <div class="match-type">${obj["MATCHTYPE"] || "-"}</div>

    <div class="host" onclick="openHost('${obj["HOST"]}')">
        🎙️ ${obj["HOST"] || "Unknown Host"}
    </div>

    <div class="bracket ${obj["BRACKET"]?.toLowerCase()}">
        ${obj["BRACKET"] || ""}
    </div>
`;
            container.appendChild(card);
        }

    } catch (err) {
        console.error("Error loading schedule:", err);
    }
}

/* 🕒 DATE FORMAT */
function formatDate(date, time) {
    try {
        const [d, m, y] = date.split("-");
        const dt = new Date(`20${y}-${m}-${d}T${time}`);

        return dt.toLocaleString("en-IN", {
            month: "short",
            day: "numeric",
            weekday: "short",
            hour: "numeric",
            minute: "2-digit"
        });

    } catch {
        return date + " " + time;
    }
}

/* 🎙 OPEN HOST CHANNEL */
function openHost(host) {
    const link = HOST_LINKS[host];
    if (link) {
        window.open(link, "_blank");
    } else {
        alert("Channel link not added for: " + host);
    }
}

/* 🔥 INIT */
loadSchedule();