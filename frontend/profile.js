const watchlist = [
"Gaming Laptop",
"iPhone 14"
];

const history = [
"Won Electric Guitar - $250",
"Lost MacBook Pro - $920"
];

function loadWatchlist(){

const list = document.getElementById("watchlist");

watchlist.forEach(item => {

const row = document.createElement("li");
row.textContent = item;

list.appendChild(row);

});

}

function loadHistory(){

const list = document.getElementById("history");

history.forEach(entry => {

const row = document.createElement("li");
row.textContent = entry;

list.appendChild(row);

});

}

loadWatchlist();
loadHistory();
