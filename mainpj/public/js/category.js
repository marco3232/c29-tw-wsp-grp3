
console.log("category.js");

async function getProducts() {
  let res = await fetch("/category");
  let result = await res.json();
  console.log(result);

  return result;
}

window.onload = async () => {
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
            <a href="product_detail.html" class="btn btn-primary">Check detail</a>
          </div>
        </div>
`;
  }

  document.querySelector(".product-area").innerHTML = allCategory;
};

