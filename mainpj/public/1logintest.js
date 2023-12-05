overrideLoginDefaultAction();

function overrideLoginDefaultAction() {
  let target = document.querySelector("#GOGOGO");

  // target.addEventListener("submit", async (e) => {
  target.addEventListener("click", async (e) => {
    console.log("login submit triggered");
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      const result = await res.json();
      console.log(result);

      window.location.href = "./p/admin.html";
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login Failed",
      });
    }
  })
};

function addHomeEventListener() {

  document.querySelector("#HomeButton").addEventListener("click", async () => {
    await fetch("/home")
  })
}