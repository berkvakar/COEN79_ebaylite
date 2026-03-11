function getSafeNumberInputValue(inputId, fallbackValue) {
    const element = document.getElementById(inputId);
    const parsed = Number(element ? element.value : fallbackValue);
    if (!Number.isFinite(parsed) || parsed < 1) {
        return fallbackValue;
    }
    return Math.floor(parsed);
}

function renderStressStats(stats) {
    const statsContainer = document.getElementById("stressTestStats");
    if (!statsContainer) return;

    const averageOperationMs = Number(stats.averageOperationMs) || 0;
    statsContainer.classList.remove("hidden");
    statsContainer.innerHTML = `
        <div><strong>Items Created:</strong> ${stats.itemCount}</div>
        <div><strong>Users Created:</strong> ${stats.userCount}</div>
        <div><strong>Bids Per Item:</strong> ${stats.bidsPerItem}</div>
        <div><strong>Duration:</strong> ${stats.durationMs} ms</div>
        <div><strong>Average Time Per Operation:</strong> ${averageOperationMs.toFixed(4)} ms</div>
    `;
}

async function runStressTest() {
    const runButton = document.getElementById("runStressTestBtn");
    const message = document.getElementById("stressTestMessage");
    if (!runButton || !message) return;

    const payload = {
        itemCount: getSafeNumberInputValue("stressItemCount", 1000),
        userCount: getSafeNumberInputValue("stressUserCount", 10),
        bidsPerItem: getSafeNumberInputValue("stressBidsPerItem", 3)
    };

    runButton.disabled = true;
    message.textContent = "Running stress test...";
    message.style.color = "#333";

    try {
        const response = await fetch("http://localhost:18080/stressTest", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            message.textContent = `Stress test failed: ${errorText || "unknown error"}`;
            message.style.color = "#b00020";
            return;
        }

        const stats = await response.json();
        renderStressStats(stats);
        message.textContent = "Stress test completed.";
        message.style.color = "#0a7d32";
    } catch (error) {
        message.textContent = "Unable to reach server.";
        message.style.color = "#b00020";
    } finally {
        runButton.disabled = false;
    }
}

window.onload = function () {
    const runButton = document.getElementById("runStressTestBtn");
    if (runButton) {
        runButton.addEventListener("click", runStressTest);
    }
};
