console.log("this is category.js");

window.onload = async () => {
  let urlParams = new URLSearchParams(window.location.search);
  let targetId = urlParams.get("id");
  console.log("category id:", targetId);

  const filterProducts = await getCategoryId(targetId);
  console.log("all", filterProducts);

  // showProductDetails(filterProducts);
  getAllProducts();
  getUsername();
};

async function getProducts() {
  let res = await fetch("/category");
  let result = await res.json();
  // console.log(result);

  return result;
}

async function getCategoryId(id) {
  const httpRes = await fetch(`/category?id=${id}`);
  const resp = await httpRes.json();
  // console.log("this is get categoryid",resp)
  return resp;
}

// async function showProductDetails(productData) {
//   let entry = productData.filterProduct;
//   let filter = "";

//   filter += `
//   <div class="card" style="width: 20rem">
//         <img src="/picture/${entry.image}" class="card-img-top" alt="..." />
//         <div class="card-body">
//           <h5 class="card-title">${entry.name}</h5>
//           <p class="card-text">
//            <p> ${entry.description}<p>
//            <p> ${entry.category_id} <p>
//            <p> Price : $${entry.unit_price} <p>
//           </p>
//           <a href="product_detail.html?id=${entry.id}" class="btn btn-primary">Check details</a>
//         </div>
//       </div>

// `;

//   document.querySelector(".product-area").innerHTML = filter;
// }

async function getAllProducts() {
  let data = await getProducts();
  // let data2 = await getCategoryId(id)
  let all = data.allProduct;
  // let fil = data2.filterProduct
  let allCategory = "";
  for (let entry of all) {
    allCategory += `
    <div class="card" style="width: 25rem">
          <img src="/picture/${entry.image}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${entry.name}</h5>
            <p class="card-text">
             <p> ${entry.description}<p>
             <p> ${entry.category_id} <p>
             <p> Price : $${entry.unit_price} <p>
            </p>
            <a href="product_detail.html?id=${entry.id}" class="btn btn-primary">Check details</a>
          </div>
        </div>
        
`;
  }

  document.querySelector(".product-area").innerHTML = allCategory;
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
