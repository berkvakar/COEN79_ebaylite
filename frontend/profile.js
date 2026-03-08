// Example user information
const user = {
    id: 1,
    name: "Demo User"
};


// Example watchlist items
let watchlist = [
    { id: 1, name: "Gaming Laptop", currentBid: 800 },
    { id: 2, name: "iPhone 14", currentBid: 600 }
];


// Example auction history
let history = [
    { item: "Electric Guitar", result: "Won", price: 250 },
    { item: "MacBook Pro", result: "Lost", price: 900 }
];


// Display user info
function loadUserProfile(){

    const userName = document.getElementById("userName");

    if(userName){
        userName.innerText = user.name;
    }

}


// Display watchlist
function loadWatchlist(){

    const list = document.getElementById("watchlist");

    if(!list) return;

    list.innerHTML = "";

    watchlist.forEach(item => {

        const row = `
        <li>
            ${item.name} — Current Bid: $${item.currentBid}
        </li>
        `;

        list.innerHTML += row;

    });

}


// Display auction history
function loadHistory(){

    const list = document.getElementById("history");

    if(!list) return;

    list.innerHTML = "";

    history.forEach(entry => {

        const row = `
        <li>
            ${entry.result} ${entry.item} — $${entry.price}
        </li>
        `;

        list.innerHTML += row;

    });

}


// Run when page loads
loadUserProfile();
loadWatchlist();
loadHistory();
