inShoppingCart()

async function inShoppingCart() {
  let shoppingCartRes = await fetch("/cart");
  let resp = await shoppingCartRes.json();
  let finalHTML = "";
  for (let entry of resp) {
    finalHTML += `
  <div class="card" style="width: 25rem">
        <img src="/picture/${entry.image}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${entry.name}</h5>
          <p class="card-text">
           <p> ${entry.description}<p>
           <p> ${entry.category_id} <p>
           <p> Price : $${entry.unit_price} <p>
           <p> Quantity ${entry.quantity}<p>
          </p>
          <a href="product_detail.html?id=${entry.id}" class="btn btn-primary">Check details</a>
        </div>
      </div>`;
  }
  document.querySelector(".product-area").innerHTML = finalHTML;
}