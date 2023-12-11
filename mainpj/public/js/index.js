window.onload = async () => {
  let urlParams = new URLSearchParams(window.location.search);

  // const indexProductDetails = await getProductDetail(targetId);
  showIndexProductDetails();
  getUsername();
};

async function getProducts() {
  const httpRes = await fetch(`/hot-picks`);
  const resp = await httpRes.json();
  // console.log("this is basic data:",resp.basic_data);
  // console.log("this is stock data:",resp.stock_data);
  return resp;
}

async function showIndexProductDetails(productData) {
  let result = await getProducts();

  console.log("check result", result);
  let all = result.data;

  let indexProductDetail = "";

  for (let basicData of all) {
    indexProductDetail += ` <div class="card" style="width: 25rem">
    <img src="./picture/${basicData.image}" class="card-img-top" alt="..." />
    <div class="card-body">
    <h5 class="card-title">${basicData.name}</h5>
    <p class="card-text">
    ${basicData.description}
    </p>
    <p class="product-price">$${basicData.unit_price}</p>
    <a href="product_detail.html?id=${basicData.id}" class="btn btn-primary">Check details</a>
    </div>
    </div> `;
  }

  document.querySelector(".index-product-detail-area").innerHTML =
    indexProductDetail;
}

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
