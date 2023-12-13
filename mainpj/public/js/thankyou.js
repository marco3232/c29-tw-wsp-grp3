// console.log("this is thankyou js")
// addToReceipt()
// async function addToReceipt(){
// let target = document.querySelector("#receipt-Form");
// console.log("***",target)
// target.addEventListener("submit",async(e)=>{
// e.preventDefault();
// })
// }




//     let resp = await fetch("/thankyou",{
//         method :"POST",
//         headers: {
//             "Content-Type":"application/json",
//         },
//         body: JSON.stringify({
//             total:
//         })
//     }
// }

inShoppingCart();



async function inShoppingCart() {
    
  let shoppingCartRes = await fetch("/thankyou");
  let resp = await shoppingCartRes.json();
  console.log(resp);
  let finalHTML = "";

  for (let entry of resp) {
    const x = `${entry.quantity}`;
    const y = `${entry.unit_price}`;
    const totalPrice = x * y;

    finalHTML += `
    <div class="row main align-items-center">
    
    <div class="col">
      <div class="row text-muted">${entry.name}</div>
     
    </div>
    <div class="col">
      <!-- <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a> -->
      Quantity:${entry.quantity}
    </div>
    <div class="ttlpce">Price : $${totalPrice}</div>
    

    
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


let oLiReceiptHTML = "";
oLiReceiptHTML += `<div class="col"><h4><b>Order List Receipt #$(entry.receipt.id)</b></h4></div>
`;

document.querySelector(".oLiRece").innerHTML = oLiReceiptHTML;


let userInPutHTML = "";
userInPutHTML += `<div class="col-2">$(entry.user_name)</div>
`;

document.querySelector(".userInPut").innerHTML = userInPutHTML;
}

// document.querySelector('button.payment').addEventListener('click', makePayment)

// async function makePayment(e){
//     e.preventDefault()
//     const httpResp = await fetch('/thankyou')
//     const resp = await httpResp.json()
//     if (resp.message == 'ok'){

//     }

// }