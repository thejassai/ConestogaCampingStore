var $ = function(select) {
  return document.querySelector(select);
};
var $a = function(select) {
  return document.querySelectorAll(select);
};
var n_cart = function(){
  if(sessionStorage.getItem("cart")){
    $(".nCart").innerHTML = JSON.parse(sessionStorage.getItem("cart")).length;
  }
}
var s_item = $(".item");
// var p = s_item.childNodes;
// console.log(p);
function loadJSON(callback) {
  var rDat = new XMLHttpRequest();
  rDat.overrideMimeType("application/json");
  rDat.open('GET', 'shop.json', true);
  rDat.onreadystatechange = function() {
    if (rDat.readyState == 4 && rDat.status == "200") {
      callback(JSON.parse(rDat.responseText));
    }
  };
  rDat.send(null);
}
var i_data = [];
loadJSON(function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    let x = s_item.cloneNode(true);
    let xChild = x.childNodes;
    xChild[0].src = "images/" + data[i].image;
    xChild[1].innerHTML = data[i].name;
    xChild[3].innerHTML = "$" + data[i].price;
    // console.log(xChild);
    let k = s_item.parentNode.insertBefore(x, s_item);
    let p = data[i];
    k.addEventListener("click",function(){
      sessionStorage.setItem("prodInfo",JSON.stringify(p));
      window.location.href = "product.html";
    });
    i_data.push({
      item: k,
      data: data[i]
    });
  }
  console.log(i_data);
  s_item.style.display = "none";
});
$("#jackets").addEventListener("click", function() {
  for (var i in i_data) {
    if (i_data[i].data.type == "Jackets") {
      i_data[i].item.style.display = "inline-block";
    } else {
      i_data[i].item.style.display = "none";
    }
  }
});
$("#sleepingBags").addEventListener("click", function() {
  for (var i in i_data) {
    if (i_data[i].data.type == "Sleeping Bags") {
      i_data[i].item.style.display = "inline-block";
    } else {
      i_data[i].item.style.display = "none";
    }
  }
});
$("#tents").addEventListener("click", function() {
  for (var i in i_data) {
    if (i_data[i].data.type == "Tents") {
      i_data[i].item.style.display = "inline-block";
    } else {
      i_data[i].item.style.display = "none";
    }
  }
});
$("#bestSellers").addEventListener("click", function() {
  for (var i in i_data) {
    if (i_data[i].data.bestSeller == "true") {
      i_data[i].item.style.display = "inline-block";
    } else {
      i_data[i].item.style.display = "none";
    }
  }
});
$("#all").addEventListener("click", function() {
  for (var i in i_data) {
    i_data[i].item.style.display = "inline-block";
  }
});
var s_dropdown = $("#s_select");
s_dropdown.addEventListener("change", function() {
  switch (s_dropdown.value) {
    case "1":
      i_data.sort(function(a, b) {
        if (parseFloat(a.data.sno) <= parseFloat(b.data.sno)) {
          return -1;
        } else {
          return 0;
        }
      });
      break;
    case "2":
      i_data.sort(function(a, b) {
        if (parseFloat(a.data.price) <= parseFloat(b.data.price)) {
          return -1;
        } else {
          return 0;
        }
      });
      break;
    case "3":
      i_data.sort(function(a, b) {
        if (parseFloat(a.data.price) >= parseFloat(b.data.price)) {
          return -1;
        } else {
          return 0;
        }
      });
      break;
    case "4":
      i_data.sort(function(a, b) {
        if (a.data.name <= b.data.name) {
          return -1;
        } else {
          return 0;
        }
      });
      // console.log(i_data);
      break;
    case "5":
      i_data.sort(function(a, b) {
        if (a.data.name >= b.data.name) {
          return -1;
        } else {
          return 0;
        }
      });
      break;
  }
  for (var i in i_data) {
    let x = i_data[i].item.cloneNode(true);
    let y = i_data[i].item.parentNode.insertBefore(x, null);
    let p = i_data[i].data;
    y.addEventListener("click",function(){
      sessionStorage.setItem("prodInfo",JSON.stringify(p));
      window.location.href = "product.html";
    });
    i_data[i].item.parentNode.removeChild(i_data[i].item);
    i_data[i].item = y;
    // console.log(i_data[i].item);
  }
});
window.onload = n_cart();
