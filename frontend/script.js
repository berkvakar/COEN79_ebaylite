let items = [
    {id:1, name:"Gaming Laptop", bid:800, buyNow:1200, expires:"2h"},
    {id:2, name:"iPhone 14", bid:600, buyNow:900, expires:"3h"},
]

function renderItems(){

    let table = document.querySelector("#itemsTable tbody")
    table.innerHTML = ""

    items.forEach(item => {

        let row = `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>$${item.bid}</td>
            <td>$${item.buyNow}</td>
            <td>${item.expires}</td>
            <td>
                <button onclick="placeBid(${item.id})">Bid</button>
            </td>
        </tr>
        `

        table.innerHTML += row
    })
}

function placeBid(id){

    let amount = prompt("Enter bid amount")

    let item = items.find(i => i.id === id)

    if(amount > item.bid){
        item.bid = amount
        alert("Bid placed!")
    }
    else{
        alert("Bid must be higher!")
    }

    renderItems()
}

function createItem(){

    let name = document.getElementById("itemName").value
    let price = document.getElementById("startingPrice").value
    let buyNow = document.getElementById("buyNow").value

    let newItem = {
        id: items.length + 1,
        name: name,
        bid: price,
        buyNow: buyNow,
        expires: "5h"
    }

    items.push(newItem)

    renderItems()
}

renderItems()
