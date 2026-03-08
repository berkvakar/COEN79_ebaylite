const items = [
{ id:1, name:"Gaming Laptop", bid:800, buyNow:1200, expires:"2h" },
{ id:2, name:"iPhone 14", bid:600, buyNow:900, expires:"1h" },
{ id:3, name:"Electric Guitar", bid:200, buyNow:350, expires:"45m" }
];

function loadItem(){

const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");

const item = items.find(i => i.id == itemId);

if(!item){
console.log("No item selected");
return;
}

document.getElementById("itemName").innerText = item.name;
document.getElementById("currentBid").innerText = item.bid;
document.getElementById("buyNow").innerText = item.buyNow;
document.getElementById("expires").innerText = item.expires;

window.currentItem = item;

}

function placeBid(){

const amount = Number(document.getElementById("bidAmount").value);

if(amount > window.currentItem.bid){

window.currentItem.bid = amount;

document.getElementById("currentBid").innerText = amount;

alert("Bid accepted!");

}else{

alert("Bid must be higher than current bid");

}

}

window.onload = loadItem;
