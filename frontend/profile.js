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

async function createListing() {
  const form = document.getElementById("createListingForm");
  if (form) {
    form.classList.remove("hidden");
  }
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
  const createListingBtn = document.getElementById("createListingBtn");
  const createListingForm = document.getElementById("createListingForm");
  const cancelCreateListingBtn = document.getElementById("cancelCreateListingBtn");
  const listingExpireDateInput = document.getElementById("listingExpireDate");
  const printLogsBtn = document.getElementById("printLogsBtn");

  usernameLabel.textContent = "@" + currentUser;
  if (createListingBtn) {
    createListingBtn.onclick = createListing;
  }
  if (listingExpireDateInput) {
    const today = new Date();
    listingExpireDateInput.min = today.toISOString().slice(0, 10);
    listingExpireDateInput.value = today.toISOString().slice(0, 10);
  }
  if (cancelCreateListingBtn && createListingForm) {
    cancelCreateListingBtn.onclick = function () {
      createListingForm.classList.add("hidden");
      createListingForm.reset();
    };
  }
  if (printLogsBtn) {
    printLogsBtn.onclick = async function () {
      await fetch("http://localhost:18080/logs");
    };
  }
  if (createListingForm) {
    createListingForm.onsubmit = async function (event) {
      event.preventDefault();

      const name = document.getElementById("listingName").value.trim();
      const description = document.getElementById("listingDescription").value.trim();
      const price = Number(document.getElementById("listingPrice").value);
      const expireDateValue = document.getElementById("listingExpireDate").value;
      const addHours = Number(document.getElementById("listingAddHours").value);

      const dateParts = expireDateValue.split("-");
      const year = Number(dateParts[0]);
      const month = Number(dateParts[1]) - 1;
      const day = Number(dateParts[2]);
      const baseDate = new Date(year, month, day, 0, 0, 0, 0);
      const expiresAtMs = baseDate.getTime() + addHours * 60 * 60 * 1000;

      if (!name || !description || !Number.isFinite(price) || price <= 0) {
        alert("Please enter valid listing details.");
        return;
      }

      if (Number.isNaN(expiresAtMs) || !Number.isFinite(addHours) || addHours <= 0 || expiresAtMs <= Date.now()) {
        alert("Please choose a future expiration date.");
        return;
      }

      try {
        const response = await fetch("http://localhost:18080/addItem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            description: description,
            price: price,
            endTimeInSeconds: Math.floor(expiresAtMs / 1000)
          })
        });

        if (!response.ok) {
          throw new Error("Create listing failed");
        }

        alert("Listing created.");
        createListingForm.classList.add("hidden");
        createListingForm.reset();
      } catch (error) {
        alert("Unable to create listing right now.");
      }
    };
  }

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
