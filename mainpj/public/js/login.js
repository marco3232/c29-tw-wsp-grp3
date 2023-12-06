console.log("HI");

function overrideLoginDefaultAction() {
  let target = document.querySelector("#login-form");

  target.addEventListener("submit", async (e) => {
    console.log("login submit triggered");
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: target.email.value,
        password: target.password.value,
      }),
    });

    if (res.status == 200) {
      const result = await res.json();
      console.log(result);

      window.location.href = "index.html";
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login Failed",
      });
    }
  });
}

overrideLoginDefaultAction();
