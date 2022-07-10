(function(){
//Change style Title 
let titleLeft = document.getElementById('title-left') ;
function myStyle(){
    titleLeft.style.fontSize = '20px' ; 
    titleLeft.style.textTransform = 'capitalize' ;
    titleLeft.style.marginBottom  = '25px';
    titleLeft.style.textAlign     = 'center';
}
myStyle();
})();

let productNameInput = document.getElementById('productName') ;
let productPriceInput = document.getElementById('productPrice');
let productCateInput = document.getElementById('productCate') ;
let productDescInput = document.getElementById('productDesc') ;
let productContainer ;
let submitInput = document.getElementById('submit');
let mood = 'Create';
let tmp ;

if(localStorage.getItem('products') == null )
{
    productContainer  = [];
} else 
{
    productContainer = JSON.parse(localStorage.getItem('products')) ;
    displayProduct(productContainer);
}
function creatProducts(){

    let product = {
        name:productNameInput.value,
        price:productPriceInput.value,
        categ:productCateInput.value ,
        desc:productDescInput.value,
    }
   if(mood === 'Create')
   {
    productContainer.push(product);
   }
    else {
        productContainer [tmp ] = product ;
        submitInput.innerHTML = 'Create' ;
        mood = 'Create' ;
    }
    displayProduct(productContainer);
    localStorage.setItem('products' , JSON.stringify(productContainer));
   };

function displayProduct(productList)
{
    let newProduct = `` ;
    for(let i = 0 ; i < productList.length ; i++)
    {
        newProduct+=`  <tr>
        <td>${i}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price}</td>
        <td>${productList[i].categ}</td>
        <td>${productList[i].desc}</td>
        <td><button class="btn btn-success" onclick="deleteProduct(${i})">Delete</button></td>
        <td><button class="btn btn-warning" onclick="updateProduct(${i})">Update</button></td>
    </tr> `;
    }
    document.getElementById('tableRow').innerHTML = newProduct ;
}

function deleteProduct(index){
  productContainer.splice(index,1);
  localStorage.setItem('products' , JSON.stringify(productContainer));
  displayProduct(productContainer);
}

function updateProduct(i){
    productNameInput.value = productContainer[i].name;
    productPriceInput.value = productContainer[i].price;
    productCateInput.value  = productContainer[i].categ;
    productDescInput.value  = productContainer[i].desc ;
    submitInput.innerHTML = 'Update' ;
    mood = 'Update' ;
    tmp = i;
}

function searchProduct(term){

    let searchProduct = [];
    for(let i  = 0 ; i < productContainer.length ; i++)
    {
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true || 
           productContainer[i].categ.toLowerCase().includes(term.toLowerCase()) == true )
        {
            searchProduct.push(productContainer[i]);
        }
    }
    displayProduct(searchProduct) ;
}


