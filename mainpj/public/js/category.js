console.log("this is category.js");

window.onload = async () => {
  let urlParams = new URLSearchParams(window.location.search);
  let targetId = urlParams.get("id");
  console.log("category id:", targetId);

  renderProducts(targetId);
  getUsername();
};

async function getProducts(id) {
  if (id) {
    const httpRes = await fetch(`/category?id=${id}`);
    const resp = await httpRes.json();
    // console.log("this is get categoryid",resp)
    return resp;
  } else {
    const httpRes = await fetch(`/category`);
    const resp = await httpRes.json();
    // console.log("this is get categoryid",resp)
    return resp;
  }
}

async function renderProducts(id) {
  let result = await getProducts(id);

  let all = result.data;

  let finalHTML = "";
  for (let entry of all) {
    finalHTML += `
    <div class="card" style="width: 25rem">
          <img src="/picture/${entry.image}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${entry.name}</h5>
            <p class="card-text">
             <p> ${entry.description}<p>
   
             <p> Price : $${entry.unit_price} <p>
            </p>
            <a href="product_detail.html?id=${entry.id}" class="btn btn-primary">Check details</a>
          </div>
        </div>
        
`;
  }

  document.querySelector(".product-area").innerHTML = finalHTML;
}

async function getUsername() {
  let res = await fetch("/email");

  if (res.status == 200) {
    let result = await res.json();
    document.querySelector(
      "#email-display"
    ).innerHTML = `<h1 class="email-font">Welcome!</h1> <h1 class="email-font">${result.data}</h1>`;

    document.querySelector(".bi-person-fill").href = "/personal_page.html";
  }
}
