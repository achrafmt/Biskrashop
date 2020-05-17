if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', imgLink())
} else {
    imgLink()
}
function imgLink(){
    if (document.getElementsByClassName('item-bottom')) {
var it = document.getElementsByClassName('item-bottom')
for (var i = 0; i < it.length; i++){
var link = it[i].getElementsByTagName('a')[0].href
var im = it[i].parentElement.getElementsByTagName('img')[0]
var a = document.createElement('a')
a.setAttribute('href', link)
a.innerHTML = `<img class="item_thumb" src="${im.src}"></img>`
im.parentNode.replaceChild(a, im)
}
}
if (document.getElementsByClassName('item-thumbnail')) {
    var c = document.getElementsByClassName('item-thumbnail')
    for(var i=0;i < c.length; i++){
        if(c[i].getElementsByTagName('a')){
        var a = c[i].getElementsByTagName('a')[0]
        a.removeAttribute('target')
    }}
    }
    if (document.getElementsByClassName('item_image')){
    var d = document.getElementsByClassName('item_image')
    for (var i =0; i < d.length; i++){
        d[i].addEventListener('mouseover',diplayButton)
        function diplayButton(){
            di[i].document.getElementsByClassName('item_add')[0].setAttribute('style', 'display:block')
            }
        }
    }
}
