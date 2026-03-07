let items = [
{
id:1,
name:"Gaming Laptop",
bid:800,
buyNow:1200,
expires:"2h"
},
{
id:2,
name:"iPhone 14",
bid:600,
buyNow:900,
expires:"1h"
}
];


function renderItems(){

const table = document.querySelector("#itemsTable tbody");
table.innerHTML = "";

items.forEach(item => {

const row = `
<tr>
<td>${item.id}</td>
<td>${item.name}</td>
<td>$${item.bid}</td>
<td>$${item.buyNow}</td>
<td>${item.expires}</td>
<td><button onclick="placeBid(${item.id})">Bid</button></td>
</tr>
`;

table.innerHTML += row;

});

}


function createItem(){

let name = document.getElementById("itemName").value;
let startPrice = document.getElementById("startingPrice").value;
let buyNow = document.getElementById("buyNow").value;

if(name === "" || startPrice === "" || buyNow === ""){
alert("Please fill all fields");
return;
}

const newItem = {
id: items.length + 1,
name: name,
bid: Number(startPrice),
buyNow: Number(buyNow),
expires: "3h"
};

items.push(newItem);

renderItems();

document.getElementById("itemName").value = "";
document.getElementById("startingPrice").value = "";
document.getElementById("buyNow").value = "";

}


function placeBid(id){

let amount = prompt("Enter your bid");

let item = items.find(i => i.id === id);

if(Number(amount) > item.bid){

item.bid = Number(amount);
alert("Bid accepted!");

}else{

alert("Bid must be higher than current bid!");

}

renderItems();

}


renderItems();
