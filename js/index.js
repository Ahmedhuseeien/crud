var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDescription = document.getElementById('productDescription');
var productImage = document.getElementById('productImage');
var btnAdd = document.getElementById('btnAdd');
var btnUpdate = document.getElementById('btnUpdate');
var products = []
var lastIndex;
if (localStorage.getItem('allProducts')) {
    products = JSON.parse(localStorage.getItem('allProducts'))
    displayProduct(products)
}

function addproduct() {
    if (inputValidate(productName) & inputValidate(productPrice) & inputValidate(productCategory) & inputValidate(productDescription) & inputValidate(productImage)) {
        var product = {
            pName: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            Description: productDescription.value,
            imgName: productImage.files[0]?.name,

        }
        products.push(product);
        localStorage.setItem('allProducts', JSON.stringify(products));
        cleraInputs();
        displayProduct(products);
    }

}
// hamada
function cleraInputs() {
    productName.value = null;
    productPrice.value = null;
    productCategory.value = null;
    productDescription.value = null;
    productImage.value = null;
}
function displayProduct(arr) {
    var cartona = ``
    for (var i = 0; i < arr.length; i++) {
        cartona += `
                      <div class="col-12 col-sm-12 col-md-4 col-lg-4 p-3">
                    <div class="product bg-light p-3 rounded ">
                        <div class="product-image">
                            <img src="./images/${arr[i].imgName}" class="w-25 d-block mx-auto"  alt="">
                        </div>
                        <div class="product-body">
                            <h2 class="h3">Name: <span>${arr[i].pName}</span></h2>
                            <h3 class="h4">Category: <span>${arr[i].category}</span></h3>
                            <h3 class="h4">Price: <span>${arr[i].price}</span></h3> 
                            <p class="lead"><span>Description:</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, nobis!</p>
                            <div class="product-btns">
                                <button onclick="setFromToUpdate(${i})"class="btn btn-outline-warning my-2">Update Product 🪶</button>
                                <button onclick="deleteProduct(${i})" class="btn btn-outline-danger my-2">Delete Product 🗑️</button>
                            </div>
                        </div>
                    </div>
                </div>
        `

    }

    document.getElementById('rowElements').innerHTML = cartona;
}
function searchForProduct(serchKey) {
    var cartona = ``
    var result = []
    for (var i = 0; i < products.length; i++) {
        if (products[i].pName.toLowerCase().includes(serchKey.trim().toLowerCase())) {
            result.push(products[i])
        }
    }
    displayProduct(result)
}
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('allProducts', JSON.stringify(products));
    displayProduct(products)

}
function setFromToUpdate(index) {
    lastIndex = index
    productName.value = products[index].pName;
    productPrice.value = products[index].price;
    productCategory.value = products[index].category;
    productDescription.value = products[index].Description;
    btnAdd.classList.add('d-none');
    btnUpdate.classList.remove('d-none');

}
function updateProduct() {
    products[lastIndex].pName = productName.value;
    products[lastIndex].price = productPrice.value;
    products[lastIndex].category = productCategory.value;
    products[lastIndex].Description = productDescription.value;
    products[lastIndex].imgName = productImage.files[0]?.name;
    localStorage.setItem('allProducts', JSON.stringify(products));
    displayProduct(products);
    btnUpdate.classList.add('d-none');
    btnAdd.classList.remove('d-none');
}

function pNameValidate(inputValue) {
    var nameRegex = /^[A-Z][a-z]{2,6}.{2,8}$/;
    if (nameRegex.test(inputValue)) {
        productName.classList.remove('is-invalid')
        productName.classList.add('is-valid')
    } else {
        productName.classList.add('is-invalid')

    }
}
function priceValidate(inputValue) {
    var priceRegex = /^[1-9]\d{2,5}$/;
    if (priceRegex.test(inputValue)) {
        productPrice.classList.remove('is-invalid')
        productPrice.classList.add('is-valid')
    } else {
        productPrice.classList.add('is-invalid')
    }
}
function categoryValidate(inputValue) {
    var categoryRegex = /^(TV|Mobile|Screens|Electronic)$/i;
    if (categoryRegex.test(inputValue)) {
        productCategory.classList.remove('is-invalid')
        productCategory.classList.add('is-valid')
    } else {
        productCategory.classList.add('is-invalid')
    }
}
function inputValidate(element) {
    var inputsRegex = {
        productName: /^[A-Z][a-z]{2,6}.{2,8}$/,
        productPrice: /^[1-9]\d{2,5}$/,
        productCategory: /^(TV|Mobile|Screens|Electronic)$/i,
        productDescription: /^.{3,100}$/,
        productImage: /^.{1,100}\.(png|jpg|jpeg|svg|avif)$/
    }
    if (inputsRegex[element.id].test(element.value)) {
        element.classList.remove('is-invalid')
        element.classList.add('is-valid')
        element.nextElementSibling.classList.add('d-none')
        return true;
    } else {
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        element.nextElementSibling.classList.remove('d-none')
        return false;
    }
}







