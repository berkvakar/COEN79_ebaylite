const loginBlock = document.getElementById("loginBlock");
const createBlock = document.getElementById("createBlock");
const authMessage = document.getElementById("authMessage");
const existingUser = localStorage.getItem("currentUser");
const signOutButtons = document.querySelectorAll(".signout-btn");
const deleteAccountButtons = document.querySelectorAll(".delete-account-btn");
const profileActionMessage = document.getElementById("profileActionMessage");

function signOut() {
  localStorage.removeItem("currentUser");
  window.location.href = "/";
}

signOutButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    signOut();
  });
});

deleteAccountButtons.forEach(function (button) {
  button.addEventListener("click", async function (event) {
    event.preventDefault();
    const username = localStorage.getItem("currentUser");

    if (!username) {
      if (profileActionMessage) {
        profileActionMessage.textContent = "No logged in user.";
        profileActionMessage.style.color = "#b00020";
      }
      return;
    }

    try {
      const response = await fetch("http://localhost:18080/deleteUser", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username })
      });

      if (response.ok) {
        localStorage.removeItem("currentUser");
        window.location.href = "/";
        return;
      }

      const message = await response.text();
      if (profileActionMessage) {
        profileActionMessage.textContent = message || "Delete account failed";
        profileActionMessage.style.color = "#b00020";
      }
    } catch (error) {
      if (profileActionMessage) {
        profileActionMessage.textContent = "Unable to reach server";
        profileActionMessage.style.color = "#b00020";
      }
    }
  });
});

if (loginBlock && createBlock && authMessage) {
  if (existingUser) {
    window.location.replace("/marketplace.html");
  }

  function showMessage(text, isError) {
    authMessage.textContent = text;
    authMessage.style.color = isError ? "#b00020" : "#0a7d32";
  }

  document.getElementById("showLoginBtn").addEventListener("click", function () {
    loginBlock.classList.remove("hidden");
    createBlock.classList.add("hidden");
    showMessage("", false);
  });

  document.getElementById("showCreateBtn").addEventListener("click", function () {
    createBlock.classList.remove("hidden");
    loginBlock.classList.add("hidden");
    showMessage("", false);
  });

  document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await fetch("http://localhost:18080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        localStorage.setItem("currentUser", username);
        window.location.href = "/marketplace.html";
        return;
      }

      const message = await response.text();
      showMessage(message || "Login failed", true);
    } catch (error) {
      showMessage("Unable to reach server", true);
    }
  });

  document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("createUsername").value.trim();
    const password = document.getElementById("createPassword").value;

    try {
      const response = await fetch("http://localhost:18080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        localStorage.setItem("currentUser", username);
        window.location.href = "/marketplace.html";
        return;
      }

      const message = await response.text();
      showMessage(message || "Signup failed", true);
    } catch (error) {
      showMessage("Unable to reach server", true);
    }
  });
}
