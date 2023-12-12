inShoppingCart()

async function inShoppingCart() {
  let shoppingCartRes = await fetch("/cart");
  let resp = await shoppingCartRes.json();
  let finalHTML = "";
  for (let entry of resp) {
    finalHTML += `
  <div class="card" style="width: 25rem">
        <img src="/picture/${entry.image}" class="card-img-top" alt="..." style="width: 10rem"/>
        <div class="card-body">
          <h5 class="card-title">${entry.name}</h5>
          <p class="card-text">
           <p> ${entry.description}<p>
           <p> ${entry.category_id} <p>
           <p> Price : $${entry.unit_price} <p>
           <p> Quantity ${entry.quantity}<p>
          </p>
          </div>
          <a href="product_detail.html?id=${entry.id}" class="btn btn-primary">Check details</a>
      </div>`;
  }
  document.querySelector(".product-area").innerHTML = finalHTML;
}
//////////////////// line 20 need to fix//////////////////