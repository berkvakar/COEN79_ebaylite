const loginBlock = document.getElementById("loginBlock");
const createBlock = document.getElementById("createBlock");
const authMessage = document.getElementById("authMessage");

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
      window.location.href = "/marketplace.html";
      return;
    }

    const message = await response.text();
    showMessage(message || "Signup failed", true);
  } catch (error) {
    showMessage("Unable to reach server", true);
  }
});
