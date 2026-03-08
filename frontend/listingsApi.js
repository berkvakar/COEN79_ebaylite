window.onload = function() {

fetch("http://localhost:18080/listingsAPI")
.then(response => response.json())
.then(items => {

const table = document.querySelector("#itemsTable tbody");

items.forEach((item, i) => {

const row = document.createElement("tr");

row.innerHTML = `
<td>${i}</td>
<td>${item.name}</td>
<td>$${item.price}</td>
<td>$${item.price}</td>
<td>2h</td>
<td><a href="/item.html?id=${i}">View</a></td>
`;

table.appendChild(row);

});

})
.catch(err => console.log(err));

};
