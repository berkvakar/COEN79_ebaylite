let items = [
{ id:1, name:"Gaming Laptop", bid:800, buyNow:1200, expires:"2h" },
{ id:2, name:"iPhone 14", bid:600, buyNow:900, expires:"1h" }
];

const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");

const item = items.find(i => i.id == itemId);

document.getElementById("itemName").innerText = item.name;
document.getElementById("currentBid").innerText = item.bid;
document.getElementById("buyNow").innerText = item.buyNow;
document.getElementById("expires").innerText = item.expires;

function placeBid(){

let amount = document.getElementById("bidAmount").value;

if(amount > item.bid){

item.bid = amount;
alert("Bid accepted!");

document.getElementById("currentBid").innerText = item.bid;

}else{

alert("Bid must be higher!");

}

}
