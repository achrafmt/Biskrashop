if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready () {
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
}


function removeCartItem (event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function PlusButtonClicked(event) {
    var PlusButtonClicked = event.target
    var quantityItemRow = PlusButtonClicked.parentElement.parentElement
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
    var title = shopItem.getElementsByClassName('post-title')[0].innerText
    var price = shopItem.getElementsByClassName('item_price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('item_thumb')[0].src
    var quantity = shopItem.getElementsByClassName('item_Quantity')[0].value
    addItemToCart(title, price, imageSrc, quantity)
}

function addItemToCart(title, price, imageSrc, quantity) {
    var cartRow = document.createElement('tbody')
    var cartItems = document.getElementsByClassName('cart-item-container')[0]
    var cartRowContents = `
         <tr class="itemRow">
            <td class="item-thumb"><img src="${imageSrc}"></td>
            <td class="item-name">${title}</td>
            <td class="item-price">${price}</td>
            <td class="item-decrement"><a href="javascript:;" class="simpleCart_decrement">-</a></td>
            <td class="item-quantity">${quantity}</td>
            <td class="item-increment"><a href="javascript:;" class="simpleCart_increment">+</a></td>
            <td class="item-total">0</td>
            <td class="item-remove"><a href="javascript:;" class="simpleCart_remove">Remove</a></td>
        </tr>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    updateCartTotal()

}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('simpleCart_items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('itemRow')
    document.getElementsByClassName('simpleCart_quantity')[0].innerText = cartRows.length 
    var total = 0
    for (i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('item-price')[0]
        var quantityElement = cartRow.getElementsByClassName('item-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
           //<-- BACK TO THIS AND CHANGE IT TO DA -->
        var quantity = parseFloat(quantityElement.innerText)
        cartRow.getElementsByClassName('item-total')[0].innerText = (price * quantity) + 'دج'
        total = total + ( price * quantity )
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('simpleCart_total')[0].innerText = total + 'دج'
}

