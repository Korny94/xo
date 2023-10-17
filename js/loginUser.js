const loginPassword = document.querySelector("#loginPassword");
const loginUsername = document.querySelector("#loginUsername");
const loginBtn = document.querySelector("#loginBtn");
const loginTitle = document.querySelector("#loginTitle");

loginBtn.addEventListener("click", () => {
  loginTitle.style.color = "black";
  loginTitle.innerText = "Logging in...";
  fetchToken();
});

async function fetchToken() {
  try {
    const password = loginPassword.value;
    const username = loginUsername.value;
    const loginResponse = {
      method: "POST",
      body: JSON.stringify({
        identifier: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `http://localhost:1337/api/auth/local`,
      loginResponse
    );
    const json = await response.json();
    if (response.ok) {
      loginTitle.innerHTML = "Login successful! Redirecting...";
      loginTitle.style.color = "green";
      window.location.href = "../html/feed.html";
    } else {
      loginTitle.innerText = json.error.message;
      loginTitle.style.color = "red";
    }
    console.log(json);
    localStorage.setItem("token", json.jwt);
    localStorage.setItem("username", json.user.username);
    localStorage.setItem("email", json.user.email);
  } catch (error) {
    console.error(error);
  }
}
