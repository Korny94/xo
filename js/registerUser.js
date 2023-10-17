const registerUsername = document.querySelector("#registerUsername");
const registerEmail = document.querySelector("#registerEmail");
const registerPassword = document.querySelector("#registerPassword");
const registerBtn = document.querySelector("#registerBtn");

registerBtn.addEventListener("click", () => {
  registerUser();
});

async function registerUser() {
  const name = registerUsername.value;
  const email = registerEmail.value;
  const password = registerPassword.value;
  console.log(name, email, password);

  try {
    const token = `959bf8d97133dad1d4f7b3f453880920edef724200a06968159e811221822be992c6ea63d88010186b44d9fb0ff93a8340937171089ab3f013e7730bb2e1186649fe35cf1cef93838f60b776c57245fc383fab6b7940e337c3ca9c1a5360865abb8922cb946fd3e107d2df336a4c02fc9cda44fd7dadf64a74f74c7c3cc77438`;
    const registerResponse = {
      method: "POST",
      body: JSON.stringify({
        username: name,
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      "http://localhost:1337/api/auth/local/register",
      registerResponse
    );
    console.log(response);
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      const registerModal = document.querySelector("#registerModal");
      const loginModal = document.querySelector("#loginModal");
      registerModal.style.display = "none";
      loginModal.style.display = "flex";
      const loginTitle = document.querySelector("#loginTitle");
      loginTitle.innerText = "Registration successful. Please login.";
      loginTitle.classList.add("success");
    } else if (response.status === 500) {
      const createAccountTitle = document.querySelector("#createActTitle");
      createAccountTitle.innerText = json.message;
      createAccountTitle.style.color = "red";
    } else {
      const createAccountTitle = document.querySelector("#createActTitle");
      createAccountTitle.innerText = "Invalid username, email or password.";
      createAccountTitle.style.color = "red";
    }
  } catch (error) {
    console.error(error);
  }
}
