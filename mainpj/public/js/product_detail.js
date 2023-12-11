window.onload = async () => {
  // overrideFormDefaultSubmitAction()
  getUsername()
  let urlParams = new URLSearchParams(window.location.search);
  let targetId = urlParams.get("id");
  // console.log("prduct id: ", targetId);
  const productDetails = await getProductDetail(targetId);
  console.log("get data",productDetails)
  showProductDetails(productDetails);

  //   getProductDetail(targetId);
};

async function getProductDetail(id) {
  const httpRes = await fetch(`/product?id=${id}`);
  const resp = await httpRes.json();
  // console.log("this is basic data:",resp.basic_data);
  // console.log("this is stock data:",resp.stock_data);
  return resp;
}

async function showProductDetails(productData) {
  let basicData = productData.basic_data;
  let stockData = productData.stock_data;
  let allProductDetail = "";

  allProductDetail += ` <div class="card" style="width: 25rem">
        <img src="./picture/${basicData.image}" class="card-img-top" alt="..." />
        <div class="card-body">
        <h5 class="card-title">${basicData.name}</h5>
        <p class="card-text">
        
        ${basicData.description}
        ${basicData.unit_price}
        </p>
        <a href="cart.html" class="btn btn-primary">Cart</a>
        </div>
        </div>`;
  document.querySelector(".product-detail-area").innerHTML = allProductDetail;

  let sizeDetail = `<div>`;
  for (let i = 0; i < 3; i++) {
    sizeDetail += ` <button ${stockData[i].stock <= 0 ? "disabled" : ""}>${
      stockData[i].size
    }</button>`;
  }
  sizeDetail += `</div>`;

  document.querySelector(".size-button-area").innerHTML = sizeDetail;
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

////####################################################
// function overrideFormDefaultSubmitAction() {

//     document.querySelector("#post-button").addEventListener("click", async (e) => {
//       e.preventDefault()

//       console.log("i have been clicked")

//       let target = document.querySelector("#post-memo-form")
//       console.log(target.description.value)
//       console.log(target.image.value)

//       const form = new FormData()

//       form.append("description", target.description.value)
//       form.append("image", target.image.files[0])

//       // multipart form upload
//       const res = await fetch("/memo", {
//         method: "POST",
//         body: form
//       })

//       if (res.status == 200) {
//         const result = await res.json()
//         console.log(result.message)
//         window.location.reload()
//       }
//     })
//   }
//////////////////////##########################################
