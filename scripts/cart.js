

var $ = function (select) {
    return document.querySelector(select);
};
var $a = function (select) {
    return document.querySelectorAll(select);
};
var cart_info = [];
var n_cart = function () {
    if (sessionStorage.getItem("cart")) {
        cart_info = JSON.parse(sessionStorage.getItem("cart"));
        $(".nCart").innerHTML = cart_info.length;
        console.log(cart_info);
    }
};
var no_item = function(){
  if(cart_info.length==0){
    $(".noitem").style.display = "block";
    $(".c_cout").style.display = "none";
  }
  else{
    $(".noitem").style.display = "none";
    $(".c_cout").style.display = "inline-block";
  }
};
var onload_func = function(){
  n_cart();
  no_item();
}
window.onload = onload_func();
var checkOut = function () {
    let s = 0;
    let q = 0;
    if (cart_info.length > 0) {
        for (var i = 0; i < cart_info.length; i++) {
            let p = parseInt(cart_info[i].item.price);
            s += p * cart_info[i].qty;
            q += cart_info[i].qty;
        }
    }
    $(".co_lab span").innerHTML = q;
    $(".st").innerHTML = "$" + s;
    s = s + 5;
    $(".bt").innerHTML = "$" + s;
    let t = s * 13 / 100;
    $(".tx").innerHTML = "$" + t.toFixed(2);
    s = s + t;
    $(".otot").innerHTML = "$" + s.toFixed(2);
};
checkOut();
var c_item = $(".c_item");
var x = c_item.childNodes;
console.log(x);
var p = x[3].childNodes;
console.log(p);
var q = p[1].childNodes;
console.log(q);
// console.log(cart_info.length);
var ibef = null;
if (cart_info.length > 0) {
    for (var i = 0; i < cart_info.length > 0; i++) {
        let i_temp = c_item.cloneNode(true);
        i_temp.style.display = "block";
        let ic_temp = i_temp.childNodes;
        ic_temp[1].src = "images/" + cart_info[i].item.image;
        let ic3_temp = ic_temp[3].childNodes;
        let ic31_temp = ic3_temp[1].childNodes;
        ic31_temp[1].innerHTML = cart_info[i].item.name;
        ic31_temp[3].innerHTML = "in " + cart_info[i].item.type;
        ic3_temp[3].innerHTML = "$" + cart_info[i].item.price;
        let ic35_temp = ic3_temp[5].childNodes;
        ic35_temp[3].value = cart_info[i].qty;
        ibef = c_item.parentNode.insertBefore(i_temp, ibef);
        let ibe_ch = ibef.childNodes;
        let ibe_ch3 = ibe_ch[3].childNodes;
        let ibe_ch35 = ibe_ch3[5].childNodes;
        let d = ibe_ch35[3];
        let dat = i;
        d.addEventListener("change", function () {
            let new_q = parseFloat(d.value);
            cart_info[dat].qty = new_q;
            sessionStorage.setItem("cart",JSON.stringify(cart_info));
            checkOut();
        });
        console.log(ibe_ch35);
        ibef.lastElementChild.addEventListener("click",function(){
          cart_info.splice(dat,1)
          console.log(cart_info);
          this.parentNode.parentNode.removeChild(this.parentNode);
          sessionStorage.setItem("cart",JSON.stringify(cart_info));
          checkOut();
          onload_func();
        });
    }
}
