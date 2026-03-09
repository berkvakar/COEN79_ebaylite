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
    // get item id from the URL
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get("id");

    // fetch item list from server
    fetch("http://localhost:18080/listingsAPI")
    .then(res => res.json())
    .then(data => {

        const items = Array.isArray(data) ? data : Object.values(data);
        const item = items[itemId];

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
    });
}

// Handle placing a bid
function placeBid()
{
	const params = new URLSearchParams(window.location.search);
	const itemId = params.get("id");
	const amount = Number(document.getElementById("bidAmount").value);

	if(amount <= window.currentItem.highestBid)
	{
		alert("Bid must be higher than current bid");
		return;
	}

	// send bid to backen
	fetch("http://localhost:18080/bid", {
		method: "POST",
		headers: {"Content-Type":"application/json"},
		body: JSON.stringify({
			id: itemId,
			bid: amount,
			bidder: localStorage.getItem("currentUser")
		})
	});

	// update UI
	window.currentItem.highestBid = amount;
	document.getElementById("currentBid").innerText = amount;

	alert("Bid accepted!");
}
function addToWatchlist()
{
	const params = new URLSearchParams(window.location.search);
	const itemId = params.get("id");

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
