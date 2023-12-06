window.onload = () => {
  getUsername();
  addLogoutEventListener();
};

async function getUsername() {
  let res = await fetch("/email");

  if (res.status == 200) {
    let result = await res.json();
    document.querySelector(
      "#email-display"
    ).innerHTML = `<h1>${result.data}</h1>`;
  }
}

function addLogoutEventListener() {
  document.querySelector("#logout").addEventListener("click", async () => {
    await fetch("/logout");
    console.log("hihihihi");
    window.location.href = "./index.html";
  });
}
