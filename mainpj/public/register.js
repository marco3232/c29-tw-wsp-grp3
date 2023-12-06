function overrideRegisterDefaultAction() {
  let target = document.querySelector("#regis-form");
  console.log("resgis.js 5");

  // target.addEventListener("submit", async (e) => {
  target.addEventListener("submit", async (e) => {
    console.log("register submit triggered");
    e.preventDefault();
    const form = e.target;
    console.log("re.js 10");
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email.value,
        passwordInput1: form.passwordInput1.value,
        passwordInput2: form.passwordInput2.value,
      }),
    });
    console.log("re.js 18");
    if (res.status == 200) {
      const result = await res.json();
      console.log(result);

      window.location.href = "./login.html";
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Register Failed",
    //   });
    }
  });
}
overrideRegisterDefaultAction();
