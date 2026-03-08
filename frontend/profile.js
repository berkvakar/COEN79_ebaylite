const watchlist = [
"Gaming Laptop",
"iPhone 14"
];

const history = [
"Won Electric Guitar - $250",
"Lost MacBook Pro - $920"
];

function loadProfile(){

const watch = document.getElementById("watchlist");
const hist = document.getElementById("history");

watchlist.forEach(item => {

const li = document.createElement("li");
li.textContent = item;
watch.appendChild(li);

});

history.forEach(entry => {

const li = document.createElement("li");
li.textContent = entry;
hist.appendChild(li);

});

}

window.onload = loadProfile;
