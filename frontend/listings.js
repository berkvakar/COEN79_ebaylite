const items = [
{ id:1, name:"Gaming Laptop", bid:800, buyNow:1200, expires:"2h" },
{ id:2, name:"iPhone 14", bid:600, buyNow:900, expires:"1h" },
{ id:3, name:"Electric Guitar", bid:200, buyNow:350, expires:"45m" }
];

function renderListings(){

const table = document.querySelector("#itemsTable tbody");

if(!table){
console.error("Table not found");
return;
}

items.forEach(item => {

const row = document.createElement("tr");

row.innerHTML = `
<td>${item.id}</td>
<td>${item.name}</td>
<td>$${item.bid}</td>
<td>$${item.buyNow}</td>
<td>${item.expires}</td>
<td><a href="item.html?id=${item.id}">View</a></td>
`;

table.appendChild(row);

});

}

window.onload = renderListings;
