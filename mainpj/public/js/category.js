console.log("this is category.js");

window.onload = async () => {

  let urlParams = new URLSearchParams(window.location.search);
  let targetId = urlParams.get("id");
  console.log("category id:", targetId);
  const filterProducts = await getCategoryId(targetId);
  console.log("this is filter", filterProducts);





  getAllProducts();

};

async function getProducts() {
  let res = await fetch("/category");
  let result = await res.json();
  console.log(result);

  return result;

}

async function getCategoryId(id) {
  const httpRes = await fetch(`/category?id=${id}`);
  const resp = await httpRes.json();
  // console.log("this is get categoryid",resp[0].category_id)
  return resp;
}

async function getAllProducts() {
  let data = await getProducts();

  let allCategory = "";
  // console.log(data);
  for (let entry of data) {
    allCategory += `
    <div class="card" style="width: 20rem">
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
