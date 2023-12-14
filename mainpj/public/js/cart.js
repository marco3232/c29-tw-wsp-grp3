inShoppingCart();

async function inShoppingCart() {
  let shoppingCartRes = await fetch("/cart");
  let resp = await shoppingCartRes.json();
  console.log(resp);
  let finalHTML = "";

  for (let entry of resp) {
    const x = `${entry.quantity}`;
    const y = `${entry.unit_price}`;
    const totalPrice = x * y;

    finalHTML += `
    <div class="row main align-items-center">
    <div class="col-2"><img class="img-fluid" src="/picture/${entry.image}"></div>
    <div class="col">
      <div class="row text-muted">${entry.name}</div>
      <div class="row description">${entry.description}</div>
    </div>
    <div class="col">
      <!-- <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a> -->
      Quantity:${entry.quantity}
    </div>
    <div class="col">
      Size: ${entry.size}
    </div>
    <div class="col">Price : $${totalPrice}</div>
    

    
  </div>`;
  }
  document.querySelector(".product-area").innerHTML = finalHTML;

  const totalPrice = resp.reduce((acc, entry) => {
    return (acc += entry.unit_price * entry.quantity);
  }, 0);
  // console.log(totalPrice);
  let summaryHTML = "";
  summaryHTML += `<div class="col totalPrice">Total Price :$${totalPrice}</div>
  `;

  document.querySelector(".totalPrice").innerHTML = summaryHTML;

  const totalQuantity = resp.reduce((acc, entry) => {
    return (acc += entry.quantity);
  }, 0);
  console.log(totalQuantity);
  let totalQuantityItem = "";
  totalQuantityItem += `<div>Total ${totalQuantity} Items<div>`;
  document.querySelector(".totalItem").innerHTML = totalQuantityItem;
}

//<button><span class="close">remove</span></button>

// this is add to receipt function
// async function addToReceipt(){
//   let target = document.querySelector("#receipt-Form");
//   console.log("***",target)
//   target.addEventListener("submit",async(e)=>{
//   e.preventDefault();
//   })
//   }
  

