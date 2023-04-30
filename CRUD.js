let title = document.getElementById("title")
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
let mood = "create";
let index;
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
    createPro = (JSON.parse(localStorage.product))
} else {
    createPro = [];
}
create.onclick = function() {
    let obj = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        totalSalary: totalSalary.innerHTML,
        category: category.value,
        count: count.value
    }
    if (title.value != '' && price.value != '' && category.value != '' && count.value <= 100) {
        if (mood == "create") {
            if (obj.count > 1) {
                for(let i = 0; i < obj.count; i++) {
                    createPro.push(obj);
                }
            } else {
                createPro.push(obj);
            }
        } else {
            createPro[index] = obj;
            mood = 'create';
            create.innerHTML = "Create";
            count.style.display = 'block';
        }
    }
    localStorage.setItem('product',     JSON.stringify(createPro)     )
    clearInputs()
    addTable()
}
function clearInputs() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    totalSalary.innerHTML = "";
    totalSalary.style.backgroundColor = "rgb(82, 4, 103)"
    count.value = "";
    category.value = "";
}
addTable()
function addTable() {
    let table = document.getElementById("tbody");
    let tr = ''
    if (createPro.length == 0) {
        table.innerHTML = "";
    }
    for(let i = 0; i < createPro.length; i++) {
        tr += 
        `
        <tr>
            <td>${i}</td>
            <td>${createPro[i].title}</td>
            <td>${createPro[i].price}</td>
            <td>${createPro[i].taxes}</td>
            <td>${createPro[i].ads}</td>
            <td>${createPro[i].discount}</td>
            <td>${createPro[i].totalSalary}</td>
            <td>${createPro[i].category}</td>
            <td><button class="btn" onclick="update(${i})" id="update">update</button></td>
            <td><button class="btn" onclick="deleteItem(${i})" id="delete">delete</button></td>
        </tr>
        `;
        table.innerHTML = tr;
    }
    let allItems = document.getElementById("deleteAll")
        if (createPro.length > 0) {
            allItems.innerHTML = `<button onclick="deleteAll()">Delete All</button>`
        } else {
            allItems.innerHTML = '';
        }
}
function deleteItem(i) {
    createPro.splice(i,1);
    localStorage.product = JSON.stringify(createPro)
    addTable()
}
function deleteAll() {
    createPro.splice(0)
    localStorage.clear()
    addTable()
}
function update(i) {
    title.value = createPro[i].title;
    price.value = createPro[i].price;
    taxes.value = createPro[i].taxes;
    ads.value = createPro[i].ads;
    discount.value = createPro[i].discount;
    total()
    category.value = createPro[i].category;
    create.innerHTML = "Update";
    count.style.display = "none"
    mood = "update";
    index = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}
let moodSearch = 'title';
function getSearchTitle(id) {
    if(id ==='search-title') {
        moodSearch = 'title';
    } else if (id === 'search-category') {
        moodSearch = 'category';
    }
    search.placeholder = 'Search By ' + moodSearch;
    search.focus()
    search.value = ''
    addTable()
}
function searchItem(value) {
    let tr = ''
    for(let i = 0; i < createPro.length; i++) {
        if (moodSearch == 'title') {
            if (createPro[i].title.toLowerCase().includes(value.toLowerCase())) {
                tr += 
                `
                <tr>
                    <td>${i}</td>
                    <td>${createPro[i].title}</td>
                    <td>${createPro[i].price}</td>
                    <td>${createPro[i].taxes}</td>
                    <td>${createPro[i].ads}</td>
                    <td>${createPro[i].discount}</td>
                    <td>${createPro[i].totalSalary}</td>
                    <td>${createPro[i].category}</td>
                    <td><button class="btn" onclick="update(${i})" id="update">update</button></td>
                    <td><button class="btn" onclick="deleteItem(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
            document.getElementById("tbody").innerHTML = tr;
        } else {
            if (createPro[i].category.toLowerCase().includes(value.toLowerCase())) {
                tr += 
                `
                <tr>
                    <td>${i}</td>
                    <td>${createPro[i].tittle}</td>
                    <td>${createPro[i].price}</td>
                    <td>${createPro[i].taxes}</td>
                    <td>${createPro[i].ads}</td>
                    <td>${createPro[i].discount}</td>
                    <td>${createPro[i].totalSalary}</td>
                    <td>${createPro[i].category}</td>
                    <td><button class="btn" onclick="update(${i})" id="update">update</button></td>
                    <td><button class="btn" onclick="deleteItem(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
            document.getElementById("tbody").innerHTML = tr;
        }
    }
    console.log(value)
}