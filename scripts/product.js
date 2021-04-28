var $ = function(select) {
  return document.querySelector(select);
};
var $a = function(select) {
  return document.querySelectorAll(select);
};
var n_cart = function(){
  if(sessionStorage.getItem("cart")){
    $(".nCart").innerHTML = JSON.parse(sessionStorage.getItem("cart")).length;
    console.log(JSON.parse(sessionStorage.getItem("cart")));
  }
}
var prodInfo = JSON.parse(sessionStorage.getItem("prodInfo"));
$(".p_img img").src = "images/"+prodInfo.image;
$(".p_name").innerHTML = prodInfo.name;
$(".p_price").innerHTML = "$"+prodInfo.price;
$(".p_addC").addEventListener("click",function(){
  let qnty = $(".p_num").innerHTML;
  let f = false;
  if(parseInt(qnty)!=0){
    if(sessionStorage.getItem("cart")){
      let x = JSON.parse(sessionStorage.getItem("cart"));
      for(var i=0;i<x.length;i++){
        if(x[i].item.sno == prodInfo.sno){
          x[i].qty+= parseInt(qnty);
          f = true;
          break;
        }
      }
      if(!f){
        x.push({
          item:prodInfo,
          qty:parseInt(qnty)
        });
      }
      sessionStorage.setItem("cart",JSON.stringify(x));
      n_cart();
    }
    else{
      let x=[];
      x.push({
        item:prodInfo,
        qty:parseInt(qnty)
      });
      sessionStorage.setItem("cart",JSON.stringify(x));
      n_cart();
    }
  }
  else{
    alert("You need to add atleast one item in the cart");
  }
});
$(".p_minus").addEventListener("click",function(){
  let x = parseInt($(".p_num").innerHTML);
  if(x>0){
    $(".p_num").innerHTML = x-1;
  }
});
$(".p_plus").addEventListener("click",function(){
  let x = parseInt($(".p_num").innerHTML);
    $(".p_num").innerHTML = x+1;
});
window.onload = n_cart();
