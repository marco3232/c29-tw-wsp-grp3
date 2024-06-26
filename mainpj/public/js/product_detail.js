let selectedProductOptionId;

window.onload = async () => {
  // overrideFormDefaultSubmitAction()

  getUsername();
  let urlParams = new URLSearchParams(window.location.search);
  let targetId = urlParams.get("id");
  // console.log("prduct id: ", targetId);
  const productDetails = await getProductDetail(targetId);
  console.log("get data", productDetails);
  showProductDetails(productDetails);
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
  let optionIdData = productData.option_id_data;
  //   let stockOnlyData = productData.stockOnly_data;
  let allProductDetail = "";
  allProductDetail += ` <div class="card" style="width: 25rem">
    <img src="./picture/${basicData.image}" class="card-img-top" alt="..." />
    <div class="product-description">${basicData.description}
    <h3 class="product-name">${basicData.name}</h3>
    <p class="product-price">$${basicData.unit_price}</p>
    <div class="add-to-cart" >
    <div class="size-button-area"></div>
    <input type="text" name="quantity" id="quantity" class="qty-box" value="1" />
  
    <div>
    <button class="btn" id="addToCart-area" onclick="addToCart()" > Add to cart</button>
    </div>
    </div>
    </div>
    `;
  document.querySelector(".product-detail-area").innerHTML = allProductDetail;

  let sizeDetail = `<div>`;

  for (let i = 0; i < 3; i++) {
    sizeDetail += ` <button class="size-button" id='button-${
      optionIdData[i].id
    }'  ${
      stockData[i].stock <= 0
        ? "disabled"
        : `onclick='selectSize("${optionIdData[i].id}")'`
    }>${stockData[i].size}</button>`;
  }
  sizeDetail += `</div>`;

  document.querySelector(".size-button-area").innerHTML = sizeDetail;
}

function checkLength() {
  console.log(optionIdData[i].id,"DATDATDATDATDAT")
  const box = document.getElementById("quantity");

  box.value.length > optionIdData[i].id == false;
}

function selectSize(targetProductOptionId) {
  for (let entry of document.querySelectorAll(`.size-button`)) {
    entry.classList.remove("selected");
  }

  document
    .querySelector(`#button-${targetProductOptionId}`)
    .classList.toggle("selected");

  selectedProductOptionId = targetProductOptionId;
  console.log("check", selectedProductOptionId);
}

async function addToCart() {
  let quantity = document.querySelector("#quantity").value;
  console.log("product option id is:", selectedProductOptionId, quantity);

  let resp = await fetch("/addCart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_option_id: selectedProductOptionId,
      quantity: quantity,
    }),
  });
  if (resp.status == 200) {
    const result = await resp.json();
    console.log("*****", result);
    window.location.href = "cart.html";
  } else {
    window.location.href = "login.html";
  }


const cartItems = sessionStorage.getItem("cartItems");

const items = cartItems ? JSON.parse(cartItems) : [];
console.log(cartItems, "??????????");

items.push(stockId);

sessionStorage.setItem("cartItems", JSON.stringify(items));
updateCartCount();
console.log(stockId);

}

function updateCartCount() {
  const cartItems = sessionStorage.getItem("cartItems");

  const items = cartItems ? JSON.parse(cartItems) : [];

  const cartCountElement = document.querySelector(".size-button-area");
  cartCountElement.textContent = items.length.toString();
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
//////////////////////########################################
