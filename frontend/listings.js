let items = [
{ id:1, name:"Gaming Laptop", bid:800, buyNow:1200, expires:"2h" },
{ id:2, name:"iPhone 14", bid:600, buyNow:900, expires:"1h" }
];

function renderListings(){

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
<td>
<a href="item.html?id=${item.id}">
<button>View</button>
</a>
</td>
</tr>
`;

table.innerHTML += row;

});

}

renderListings();
