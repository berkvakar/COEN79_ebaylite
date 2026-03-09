function renderItems(listElement, items, isBidsSection) {
  listElement.innerHTML = "";

  if (!items || items.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No items yet.";
    listElement.appendChild(empty);
    return;
  }

  items.forEach(function (item) {
    const li = document.createElement("li");
    const viewLink = `<a href="/item.html?id=${item.id}">View</a>`;
    if (isBidsSection && item.amount !== undefined) {
      li.innerHTML = `${item.name} - $${item.amount} (${viewLink})`;
    } else {
      li.innerHTML = `${item.name} (${viewLink})`;
    }
    listElement.appendChild(li);
  });
}

async function loadProfile() {
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    window.location.href = "/";
    return;
  }

  const usernameLabel = document.getElementById("userName");
  const watch = document.getElementById("watchlist");
  const hist = document.getElementById("history");
  const sold = document.getElementById("sold");
  const bids = document.getElementById("bids");

  usernameLabel.textContent = "@" + currentUser;

  try {
    const response = await fetch("http://localhost:18080/profile/" + encodeURIComponent(currentUser));
    if (!response.ok) {
      throw new Error("Profile fetch failed");
    }

    const profile = await response.json();
    renderItems(watch, profile.watchlist || [], false);
    renderItems(hist, profile.history || [], false);
    renderItems(sold, profile.sold || [], false);
    renderItems(bids, profile.bids || [], true);
  } catch (error) {
    watch.innerHTML = "<li>Unable to load profile data.</li>";
    hist.innerHTML = "<li>Unable to load profile data.</li>";
    sold.innerHTML = "<li>Unable to load profile data.</li>";
    bids.innerHTML = "<li>Unable to load profile data.</li>";
  }
}

window.onload = loadProfile;
