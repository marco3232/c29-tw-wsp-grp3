
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
             <p> Price $${entry.unit_price} <p>
            </p>
            <a href="product_detail.html" class="btn btn-primary">Check detail</a>
          </div>
        </div>
`;
  }

  document.querySelector(".product-area").innerHTML = allCategory;
};

// html

{
  /* <div class="card" style="width: 25rem">
<img src="./picture/under4.jpg" class="card-img-top" alt="..." />
<div class="card-body">
  <h5 class="card-title">Card title</h5>
  <p class="card-text">
    Some quick example text to build on the card title and make up the
    bulk of the card's content.
  </p>
  <a href="#" class="btn btn-primary">Go to order page</a>
</div>
</div> */
}
