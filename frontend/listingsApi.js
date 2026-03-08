function loadListings() {

	fetch("http://localhost:18080/items")
	.then(function(response) {
	return response.json();
	});

	.then(function(items) {

	var tbody = document.querySelector("#itemsTable tbody");
	tbody.innerHTML = "";

	for (var i = 0; i < items.length; i++) {

		var row =
			"<tr>" +
			"<td>" + i + "</td>" +
			"<td>" + items[i].name + "</td>" +
			"<td>$" + items[i].price + "</td>" +
			"<td>$" + items[i].price + "</td>" +
			"<td>Active</td>" +
			"<td><a href='item.html?id=" + i + "'>View</a></td>" +
			"</tr>";
	
			tbody.innerHTML += row;
		}
	});
	
}

window.onload = loadListings;
