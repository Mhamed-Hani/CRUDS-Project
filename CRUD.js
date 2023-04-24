let tittle = document.getElementById("tittle")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let totalSalary = document.getElementById("totalSalary")
let count = document.getElementById("count")
let category = document.getElementById("category")
let create = document.getElementById("create")
let search = document.getElementById("search")
let searchTittle = document.getElementById("search-tittle")
let searchCategory = document.getElementById("search-category")

let total = function () {
    if (price.value != '' & taxes.value != "" & ads.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        totalSalary.innerHTML = result;
        totalSalary.style.backgroundColor = "green";
    } else {
        totalSalary.innerHTML = "";
        totalSalary.style.backgroundColor = "rgb(82, 4, 103)";
    }
}

let createPro;
if (localStorage.product != null) {
    createPro = JSON.parse(localStorage.product)
} else {
    createPro = [];
}

create.onclick = function () {
    let obj = {
        tittle: tittle.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        totalSalary: totalSalary.innerHTML,
        category: category.value
    }
    createPro.push(obj);
    localStorage.setItem("Product", JSON.stringify(createPro))
    console.log(createPro)
}