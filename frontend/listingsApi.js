function formatTime(secondsLeft) {
    if (secondsLeft <= 0) return "Expired";
    const h = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
    const m = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, "0");
    const s = String(secondsLeft % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
}

function startCountdown(cell, secondsLeft) {
    const end = Date.now() + (Number(secondsLeft) || 0) * 1000;

    function tick() {
        const remaining = Math.max(0, Math.floor((end - Date.now()) / 1000));
        cell.textContent = formatTime(remaining);
        if (remaining === 0) return;
        setTimeout(tick, 1000 - (Date.now() % 1000));
    }

    tick();
}

window.onload = function () {
    fetch("http://localhost:18080/listingsAPI")
        .then((response) => response.json())
        .then((items) => {
            const table = document.querySelector("#itemsTable tbody");
            table.innerHTML = "";

            items.forEach((item, i) => {
                const row = document.createElement("tr");
                row.innerHTML = `
<td>${item.name}</td>
<td>$${item.price}</td>
<td>$${item.price}</td>
<td class="expires">--:--:--</td>
<td><a href="/item.html?id=${i}">View</a></td>
`;
                table.appendChild(row);
                startCountdown(row.querySelector(".expires"), item.timeLeftSeconds);
            });
        })
        .catch((err) => console.log(err));
};
