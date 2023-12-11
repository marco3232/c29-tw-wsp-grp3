window.onload = async () => {
  // overrideFormDefaultSubmitAction()

  let urlParams = new URLSearchParams(window.location.search);
  let targetId = urlParams.get("id");
  console.log("prduct id: ", targetId);
  const productDetails = await getProductDetail(targetId);
  showProductDetails(productDetails);
};

async function getProductDetail(id) {
  const httpRes = await fetch(`/product?id=${id}`);
  const resp = await httpRes.json();
  console.log(resp.basic_data);
  console.log(resp.stock_data);
  return resp;
}

async function showProductDetails(productData) {
  let basicData = productData.basic_data;
  let stockData = productData.stock_data;
  let optionIdData = productData.option_id_data;
  //   let stockOnlyData = productData.stockOnly_data;
  let allProductDetail = "";
  allProductDetail += ` <div class="card" style="width: 20rem">
    <img src="./picture/${basicData.image}" class="card-img-top" alt="..." />
    <div class="product-description">${basicData.description}
    <h3 class="product-name">${basicData.name}</h3>
    <p class="product-price">$${basicData.unit_price}</p>
    <div class="add-to-cart" >
    <div class="size-button-area"></div>
    <input type="text" name="quantity" id="box-tag" class="qty-box" value="1" />
  
    <p><input  type="submit" value="Add to cart" class="btn" /></p>
    </div>
    </div>
    `;
  document.querySelector(".product-detail-area").innerHTML = allProductDetail;

  let sizeDetail = `<div>`;

  for (let i = 0; i < 3; i++) {
    sizeDetail += ` <button   ${
      stockData[i].stock <= 0
        ? "disabled"
        : `onclick='addToCart(${optionIdData[i].id})'`
    }>${stockData[i].size}</button>`;
  }
  sizeDetail += `</div>`;

  document.querySelector(".size-button-area").innerHTML = sizeDetail;
}

function checkLength() {
  const box = document.getElementById("box-tag");

  box.value.length > stockOnlyData == "disable";
}

function addToCart(test) {
  console.log("check test", test);
  //   const cartItems = sessionStorage.getItem("cartItems");

  //   const items = cartItems ? JSON.parse(cartItems) : [];
  //   console.log(cartItems, "??????????");

  //   items.push(item);

  //   sessionStorage.setItem("cartItems", JSON.stringify(items));
  //   updateCartCount();
  //   console.log(item);
}

function updateCartCount() {
  const cartItems = sessionStorage.getItem("cartItems");

  const items = cartItems ? JSON.parse(cartItems) : [];

  const cartCountElement = document.querySelector(".size-button-area");
  cartCountElement.textContent = items.length.toString();
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
