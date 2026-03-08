const items = [
{ id:1, name:"Gaming Laptop", bid:800, buyNow:1200, expires:"2h" },
{ id:2, name:"iPhone 14", bid:600, buyNow:900, expires:"1h" },
{ id:3, name:"Electric Guitar", bid:200, buyNow:350, expires:"45m" }
];

const params = new URLSearchParams(window.location.search);
const itemId = params.get("id");

const item = items.find(i => i.id == itemId);

if(item){

document.getElementById("itemName").innerText = item.name;
document.getElementById("currentBid").innerText = item.bid;
document.getElementById("buyNow").innerText = item.buyNow;
document.getElementById("expires").innerText = item.expires;

}

function placeBid(){

const bidInput = document.getElementById("bidAmount");
const amount = Number(bidInput.value);

if(!item){
alert("Item not found");
return;
}

if(amount > item.bid){

item.bid = amount;

document.getElementById("currentBid").innerText = item.bid;

alert("Bid accepted!");

}else{

alert("Bid must be higher than current bid!");

}

}
