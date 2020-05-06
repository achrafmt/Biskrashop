if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready())
} else {
    ready()
}
function ready () {
    if (localStorage.getItem('CartItem')) {
        getProductFromLS()}
        if (document.getElementById('ContactForm1_contact-form-submit')){
    document.getElementById('ContactForm1_contact-form-submit').addEventListener('click', emptyRow)
    document.getElementById('ContactForm1_contact-form-name').addEventListener('input', btcSentClicked)
    document.getElementById('ContactForm1_contact-form-adresse').addEventListener('input', btcSentClicked)
    document.getElementById('ContactForm1_contact-form-tel').addEventListener('input', btcSentClicked)
        }
    var CloseItemButton = document.getElementsByClassName('simpleCart_remove')
    for (var i = 0; i < CloseItemButton.length; i++) {
        var button = CloseItemButton[i]
        button.addEventListener('click', removeCartItem)
    }

    var PlusButton = document.getElementsByClassName('item-increment')
    for (var i = 0; i < PlusButton.length; i++) {
        var PlusButtonRow = PlusButton[i]
        PlusButtonRow.addEventListener('click', PlusButtonClicked)
    }
    var lessButton = document.getElementsByClassName('item-decrement')
    for (var i = 0; i < lessButton.length; i++) {
        var lessButtonRow = lessButton[i]
        lessButtonRow.addEventListener('click', lessButtonClicked)
    }
    var addToCartButton = document.getElementsByClassName('item_add')
    for (var i = 0; i < addToCartButton.length; i++) {
        var button = addToCartButton[i]
        button.addEventListener('click', addToCartClicked)
    }
    var addToCartButton2 = document.getElementsByClassName('item_add2')
    for (var i = 0; i < addToCartButton2.length; i++) {
        var button = addToCartButton2[i]
        button.addEventListener('click', addToCartClicked2)
    }
    var cartButton = document.getElementsByClassName('cart-btn')
    for (var i = 0; i < cartButton.length; i++) {
        var button = cartButton[i]
        button.addEventListener('click', cartButtonClicked)
    }
 
}

function removeCartItem (event) {
    var buttonClicked = event.target
    var itemRemoved = buttonClicked.parentElement.parentElement
    var shopItemId = itemRemoved.getElementsByClassName('item-name')[0].id
    if (localStorage.getItem('CartItem')) {
        itemCart = JSON.parse(localStorage.getItem('CartItem'))
        for (var i = 0; i < itemCart.length; i++){
            if (itemCart[i].productID === shopItemId){
                itemCart = itemCart.slice(i+1)  
            }
        }
    }
    itemRemoved.remove()
    syncLS(itemCart)
    updateCartTotal() 
}

function PlusButtonClicked(event) {
    var PlusButtonClicked = event.target
    var quantityItemRow = PlusButtonClicked.parentElement.parentElement
    var img = PlusButtonClicked.parentElement
    var quantityItemRowValue = parseFloat (quantityItemRow.getElementsByClassName('item-quantity')[0].innerText)
    quantityItemRowValue = quantityItemRowValue + 1
    quantityItemRow.getElementsByClassName('item-quantity')[0].innerText = quantityItemRowValue
    updateCartTotal()
}

function lessButtonClicked(event) {
    var lessButtonClicked = event.target
    var quantityItemRow = lessButtonClicked.parentElement.parentElement
    var quantityItemRowValue = parseFloat (quantityItemRow.getElementsByClassName('item-quantity')[0].innerText)
    if (quantityItemRowValue > 1) {
    quantityItemRowValue = quantityItemRowValue - 1
    }
    quantityItemRow.getElementsByClassName('item-quantity')[0].innerText = quantityItemRowValue
    updateCartTotal()

}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var shopItemId = shopItem.parentElement.getElementsByClassName('post-body')[0].id
    var title = shopItem.getElementsByClassName('post-title')[0].innerText
    var price = shopItem.getElementsByClassName('item_price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('item_thumb')[0].src
    var quantity = shopItem.getElementsByClassName('item_Quantity')[0].value
    addItemToCart(title, price, imageSrc, quantity, shopItemId)
    
 
}

function addToCartClicked2(event) {
    var button = event.target
    var postBody = document.getElementsByClassName('post-body')[0]
    var shopItemId = document.getElementsByClassName('post-body')[0].id
    var title = postBody.getElementsByClassName('post-title')[0].innerText
    var priceElement = postBody.getElementsByClassName('item_price')[0].innerText
    var reg = /\d+/g
    var price = priceElement.match(reg)[0]
    var imageSrc = postBody.getElementsByClassName('item_thumb')[0].src
    var quantity = postBody.getElementsByClassName('item_Quantity')[0].value
    addItemToCart(title, price, imageSrc, quantity, shopItemId)
    

}

function cartButtonClicked(event) {
var button = event.target
if (document.getElementById('030321').classList.contains('active')) {
    document.getElementById('030321').setAttribute("style", "display:none") 
    document.getElementById('030321').classList.remove('active')
    return
}
document.getElementById('030321').setAttribute("style", "display:block")
document.getElementById('030321').classList.add('active')
}

function addItemToCart(title, price, imageSrc, quantity, shopItemId) {
    var cartRow = document.createElement('tr')
    cartRow.classList.add('itemRow')
    cartRow.setAttribute('id', shopItemId)
    var cartItems = document.getElementsByClassName('cart-item-container')
    for (var i = 0 ; i < cartItems.length; i++){
        var cartItemss = document.getElementsByClassName('cart-item-container')[i]
    
    var cartItemNames = cartItemss.getElementsByClassName('item-name')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            return
        }
    }
    var cartRowContents = `
         <tr class="itemRow">
            <td class="item-thumb"><img class="item-img" src="${imageSrc}"></td>
            <td class="item-name" id="${shopItemId}">${title}</td>
            <td class="item-price">${price}</td>
            <td class="item-decrement"><a href="javascript:;" class="simpleCart_decrement">-</a></td>
            <td class="item-quantity">${quantity}</td>
            <td class="item-increment"><a href="javascript:;" class="simpleCart_increment">+</a></td>
            <td class="item-total">0</td>
            <td class="item-remove"><a href="javascript:;" class="simpleCart_remove">Remove</a></td>
        </tr>`
    cartRow.innerHTML = cartRowContents
    cartItemss.append(cartRow)
    updateCartTotal()
    cartRow.getElementsByClassName('simpleCart_remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('item-increment')[0].addEventListener('click', PlusButtonClicked)
    cartRow.getElementsByClassName('item-decrement')[0].addEventListener('click', lessButtonClicked)
    }
    
    
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('simpleCart_items')
    for (var i = 0 ; i < cartItemContainer.length; i++){
        var cartItemContainers = document.getElementsByClassName('simpleCart_items')[i]
    var cartRows = cartItemContainers.getElementsByClassName('itemRow') 
} 
    document.getElementsByClassName('simpleCart_quantity')[0].innerText = cartRows.length
    var total = 0
    for (i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('item-price')[0]
        var quantityElement = cartRow.getElementsByClassName('item-quantity')[0]
        var price = parseFloat(priceElement.innerText)
        var quantity = parseFloat(quantityElement.innerText)
        cartRow.getElementsByClassName('item-total')[0].innerText = (price * quantity) + 'دج'
        total = total + ( price * quantity )
        var title = cartRow.getElementsByClassName('item-name')[0].innerText
        var imageSrc = cartRow.getElementsByClassName('item-img')[0].src
        var shopItemId = cartRow.getElementsByClassName('item-name')[0].id
    addItemToLocalStorage(shopItemId, title, price, imageSrc, quantity)
    }
    total = Math.round(total * 100) / 100
    var cartTotal = document.getElementsByClassName('simpleCart_total')
    for (var i = 0 ; i < cartTotal.length; i++){
        document.getElementsByClassName('simpleCart_total')[i].innerText = total + 'دج'
    }
  
}

function addItemToLocalStorage(shopItemId, title, price, imageSrc, quantity) {

    var itemCart = [{
                    productID: shopItemId,
                    Title: title,
                    Price: price,
                    Qty: quantity,
                    Img: imageSrc
                }];

                 if (localStorage.getItem('CartItem')) {
                    itemCart = JSON.parse(localStorage.getItem('CartItem'))
                    let match = itemCart.filter(item=>{
                        if(item.Title == title)
                        return true
                    });
                    if (match[0]) {
                        itemCart = itemCart.map(item=>{
                            if(item.Title == title)
                                item.Qty = quantity;
                            return item;
                        });
                        syncLS(itemCart)
                        return
                    }
                   
                }
  
            itemCart.push({
                productID: shopItemId,
                Title: title,
                Price: price,
                Qty: quantity,
                Img: imageSrc
            })
            syncLS(itemCart)
}

function syncLS(itemCart){
    localStorage.setItem('CartItem' , JSON.stringify(itemCart))
}

function getProductFromLS(){
    if (localStorage.getItem('CartItem')) {
        itemCart = JSON.parse(localStorage.getItem('CartItem'))
        for (var i = 0; i < itemCart.length; i++){
            var shopItemId = itemCart[i].productID
            var title = itemCart[i].Title
            var price = itemCart[i].Price
            var quantity = itemCart[i].Qty
            var imageSrc = itemCart[i].Img
            addItemToCart(title, price, imageSrc, quantity, shopItemId)
        }
    }
} 
function btcSentClicked (event) {
    var name = document.getElementsByClassName('contact-form-name')[0].value
    var adresse = document.getElementsByClassName('contact-form-adresse')[0].value
    var tell = document.getElementsByClassName('contact-form-tel')[0].value
    var messageContent = `الإسم: ${name}
    العنوان: ${adresse}
    الهاتف: ${tell}
    `
    if (localStorage.getItem('CartItem')) {
        var cart = [{}]
        itemCart = JSON.parse(localStorage.getItem('CartItem'))
        for (var i = 0; i < itemCart.length; i++){
            var title = itemCart[i].Title
            var price = itemCart[i].Price
            var quantity = itemCart[i].Qty
            var total = price * quantity
            cart.push({
                الإسم: title,
                الكمية: quantity,
                السعر: price,
                المجموع: total
            })
        }
      
    }
    document.getElementsByClassName('contact-form-email')[0].value = 'test@mail.com'
    document.getElementsByClassName('contact-form-email-message')[0].value =  `${messageContent}
    ${JSON.stringify(cart)}
    `
}

function emptyRow(){
    addClassNameListener("ContactForm1_contact-form-success-message", cleanLocalStorage);
    
}

function cleanLocalStorage(){

    document.getElementsByClassName('contact-form-adresse')[0].value = ''
    document.getElementsByClassName('contact-form-tel')[0].value = ''
    var child = document.getElementById("6666")
    child.parentNode.removeChild(child)
    localStorage.removeItem('CartItem')
    updateCartTotal()
    
}

function addClassNameListener(elemId, callback) {
    var elem = document.getElementById(elemId);
    var lastClassName = elem.className;
    window.setInterval( function() {   
       var className = elem.className;
        if (className !== lastClassName) {
            callback();   
            lastClassName = className;
        }
    },10);
}
