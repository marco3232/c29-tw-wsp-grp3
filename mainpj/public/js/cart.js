inShoppingCart()

async function inShoppingCart() {
  let shoppingCartRes = await fetch("/cart");
  let resp = await shoppingCartRes.json();
  let finalHTML = "";
  for (let entry of resp) {
    finalHTML += `
    <div class="row main align-items-center">
    <div class="col-2"><img class="img-fluid" src="/picture/${entry.image}"></div>
    <div class="col">
      <div class="row text-muted">${entry.name}</div>
      <div class="row description">${entry.description}</div>
    </div>
    <div class="col">
      <!-- <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a> -->
      Qantity:${entry.quantity}
    </div>
    <div class="col">$${entry.unit_price}<span class="close">&#10005;</span></div>
  </div>`
  }
  document.querySelector(".product-area").innerHTML = finalHTML;
}