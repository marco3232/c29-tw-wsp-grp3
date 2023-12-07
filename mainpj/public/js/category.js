console.log("category.js")

async function getproducts(){
let res = await fetch("/category")
let result = await res.json()
console.log(result)

return result
}