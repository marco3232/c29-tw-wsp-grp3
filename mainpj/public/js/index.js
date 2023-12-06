window.onload = () => {
  getUsername();
};

async function getUsername() {
  let res = await fetch("/email");

  if (res.status == 200) {
    let result = await res.json();
    document.querySelector(
      "#email-display"
    ).innerHTML = `<h1>${result.data}</h1>`;

    document.querySelector(".bi-person-fill").href = "/personal_page.html";
  }
}
