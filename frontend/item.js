// Convert seconds to HH:MM:SS format
function formatTime(secondsLeft)
{
    if(secondsLeft <= 0) return "Expired";

    const h = String(Math.floor(secondsLeft / 3600)).padStart(2,"0");
    const m = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2,"0");
    const s = String(secondsLeft % 60).padStart(2,"0");

    return `${h}:${m}:${s}`;
}

// Start a live countdown timer
function startCountdown(element, secondsLeft)
{
    // calculate when the auction should end
    const end = Date.now() + secondsLeft * 1000;

    function tick()
    {
        // remaining seconds
        const remaining = Math.max(0, Math.floor((end - Date.now()) / 1000));

        // update the timer display
        element.innerText = formatTime(remaining);

        // keep counting down every second
        if(remaining > 0)
        {
            setTimeout(tick, 1000);
        }
        else
        {
            element.innerText = "Expired";
        }
    }

    tick();
}

// Load item information from the backend
function loadItem()
{
    const normalizeName = (value) => String(value || "").trim().toLowerCase();
    // get item id from the URL
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get("id");
    const itemName = params.get("name");

    // fetch item list from server
    fetch("http://localhost:18080/listingsAPI")
    .then(res => res.json())
    .then(data => {

        const items = Array.isArray(data) ? data : Object.values(data);
        let item = null;
        let resolvedItemId = null;
        if (itemId !== null) {
            item = items[itemId];
            resolvedItemId = Number(itemId);
        } else if (itemName) {
            const targetName = normalizeName(itemName);
            resolvedItemId = items.findIndex((entry) => normalizeName(entry && entry.name) === targetName);
            if (resolvedItemId >= 0) {
                item = items[resolvedItemId];
            }
        }

        if(!item)
        {
            console.log("No item selected");
            return;
        }

        // fill in item details on the page
        document.getElementById("itemName").innerText = item.name;
        document.getElementById("currentBid").innerText = item.highestBid;
        document.getElementById("buyNow").innerText = item.price;
	if(item.description){
   		 document.getElementById("description").innerText = item.description;
	}
        // start countdown timer
        startCountdown(
            document.getElementById("expires"),
            Number(item.timeLeftSeconds)
        );

        // save item for bidding
        window.currentItem = item;
        window.currentItemId = resolvedItemId;

        // add Buy Now button if not already present
        if (!document.getElementById("buyNowBtn")) {
            const buyNowBtn = document.createElement("button");
            buyNowBtn.id = "buyNowBtn";
            buyNowBtn.textContent = "Buy Now";
            buyNowBtn.onclick = buyNow;
            document.querySelector(".container").appendChild(buyNowBtn);
        }
    });
}

async function refreshCurrentItemFromBackend()
{
    const id = Number(window.currentItemId);
    if(!Number.isInteger(id) || id < 0)
    {
        return false;
    }

    const response = await fetch("http://localhost:18080/listingsAPI");
    if(!response.ok)
    {
        return false;
    }

    const data = await response.json();
    const items = Array.isArray(data) ? data : Object.values(data);
    const updatedItem = items[id];
    if(!updatedItem)
    {
        return false;
    }

    window.currentItem = updatedItem;
    document.getElementById("itemName").innerText = updatedItem.name;
    document.getElementById("currentBid").innerText = updatedItem.highestBid;
    document.getElementById("buyNow").innerText = updatedItem.price;
    if(updatedItem.description){
        document.getElementById("description").innerText = updatedItem.description;
    }
    return true;
}

async function markCurrentItemAsSold()
{
    const id = Number(window.currentItemId);
    const username = localStorage.getItem("currentUser");

    if(!Number.isInteger(id) || id < 0)
    {
        alert("Unable to determine item id.");
        return false;
    }
    if(!username)
    {
        alert("Please sign in first.");
        return false;
    }

    const response = await fetch("http://localhost:18080/markAsSold", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            id: id,
            username: username
        })
    });

    if(!response.ok)
    {
        alert("Could not complete purchase right now.");
        return false;
    }

    return true;
}

async function buyNow()
{
    const ok = await markCurrentItemAsSold();
    if(ok)
    {
        alert("Item purchased.");
    }
}

// Handle placing a bid
async function placeBid()
{
	const itemId = Number(window.currentItemId);
	const bidder = localStorage.getItem("currentUser");
	const amount = Number(document.getElementById("bidAmount").value);

	if(!Number.isInteger(itemId) || itemId < 0)
	{
		alert("Unable to determine item id.");
		return;
	}
	if(!bidder)
	{
		alert("Please sign in first.");
		return;
	}
	if(!Number.isFinite(amount) || amount <= 0)
	{
		alert("Please enter a valid bid.");
		return;
	}

	if(amount <= window.currentItem.highestBid)
	{
		alert("Bid must be higher than current bid");
		return;
	}

	// Refresh first to avoid stale UI bids causing preventable 400 responses.
	const refreshed = await refreshCurrentItemFromBackend();
	if(!refreshed)
	{
		alert("Could not refresh item state.");
		return;
	}

	if(amount <= Number(window.currentItem.highestBid))
	{
		alert("Bid must be higher than the latest current bid.");
		return;
	}

	// send bid to backen
	const bidResponse = await fetch("http://localhost:18080/bid", {
		method: "POST",
		headers: {"Content-Type":"application/json"},
		body: JSON.stringify({
			id: itemId,
			bid: amount,
			bidder: bidder
		})
	});
	if(!bidResponse.ok)
	{
		const errText = await bidResponse.text();
		alert(`Bid failed: ${errText || "Unknown error"}`);
		return;
	}

	// refresh from backend so item bid state stays authoritative
	await refreshCurrentItemFromBackend();

	if(amount >= Number(window.currentItem.price))
	{
		const sold = await markCurrentItemAsSold();
		if(sold)
		{
			alert("Bid accepted and item purchased.");
			return;
		}
	}

	alert("Bid accepted!");
}
function addToWatchlist()
{
	const itemId = Number(window.currentItemId);
	if(!Number.isInteger(itemId) || itemId < 0)
	{
		alert("Unable to determine item id.");
		return;
	}

	fetch("http://localhost:18080/watch", {
		method: "POST",
		headers: {"Content-Type":"application/json"},
		body: JSON.stringify({
			id: itemId,
			username: localStorage.getItem("currentUser")
		})
	});
	alert("Added to watchlist!");
}
// run loadItem when page loads
window.onload = loadItem;
