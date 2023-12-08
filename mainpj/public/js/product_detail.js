window.onload = () => {

    // overrideFormDefaultSubmitAction()

  let urlParams = new URLSearchParams(window.location.search);
  let targetId = urlParams.get("id");

  getProductDetail(targetId);
};

async function getProductDetail(id) {
  let res = await fetch(`/product?id=${id}`);

  console.log(res);
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
// window.onload = async () => {

// let data = await getProductDetail();

//   let allProductDetail = "";

//   for (let entry of data) {

//     allProductDetail += 
//     ` <div class="card" style="width: 25rem">
//     <img src="./picture/${entry.image}" class="card-img-top" alt="..." />
// //     <div class="card-body">
// //       <h5 class="card-title">${entry.name}</h5>
// //       <p class="card-text">
// //        ${entry.description}
// //        ${entry.unit_price}
// //       </p>
// //       <a href="product_detail.html?id=1" class="btn btn-primary">Go to order page</a>
// //     </div>
// //   </div>`

//   }
//   document.querySelector(".product-detail-area").innerHTML = allProductDetail;
// }

