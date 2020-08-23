$(function () {
    $("#overlay").click(function () {
        $("#overlay").fadeOut();
    });
    var D = new Date();
    var h = D.getHours(); //获取当前时间多少时
    if (h >= 6 && h <= 18) {
        $("#fat").css("background-image", "url(./tupian/gong.png)");
        $("body").css("background-image", "url(./tupian/ffxiv_20170925_174458.jpg)");
        $(".slink-ex").css("top", "200px");
        $(".slink-ex").css("left", "50px");
//        $(".slink-ex").hover(function () { $(this).css("left", "10px"); }, function () { $(this).css("left", "-110px"); });
        fat2();
    }
    else {
        $("#fat").css("background-image", "url(./tupian/mu.png)");
        $("body").css("background-image", "url(./tupian/ffxiv_20170925_175553.jpg)");
        $(".slink-ex").css("left", "35px");
//        $(".slink-ex").hover(function () { $(this).css("left", "-10px"); }, function () { $(this).css("left", "110px"); });
        fat();
     }

    //当浏览器页面发生改变时，DIV随着页面的改变居中。    
});
function bigger(obj) {
    $("#bigger").css("background-image", "url(" + obj.src + ")");
    $("#overlay").fadeIn();
    var img = new Image();
    img.src = obj.src;
    var t = window.innerWidth
          , e = window.innerHeight
          , s = img.width
          , n = img.height
          , o = t > s ? (t - s) / 2 : 0
          , i = e > n ? (e - n) / 2 : 0;
    $("#bigger").css({
        left: o + "px"
    }),
    $("#bigger").css({
        top: i + "px"
    });
    $("#bigger").css("background-size", "auto");
    if (t < s || e < n) {
        $("#bigger").css("background-size", "contain");
    }
}
$(window).resize(function () {
    var img = new Image();
    //img.src = $("#bigger").css("background-image").split("\"")[1];
    var t = window.innerWidth
          , e = window.innerHeight
          , s = img.width
          , n = img.height
          , o = t > s ? (t - s) / 2 : 0
          , i = e > n ? (e - n) / 2 : 0;
    $("#bigger").css({
        left: o + "px"
    }),
    $("#bigger").css({
        top: i + "px"
    });
    $("#bigger").css("background-size", "auto");
    if (t < s || e < n) {
        $("#bigger").css("background-size", "contain");
    }    
    var D = new Date();
    var h = D.getHours(); //获取当前时间多少时
    if (h >= 6 && h <= 18) { fat2(); }
    else { fat(); }
});
function fat() {   
    var oBox = document.getElementById('fat');
    var L1 = oBox.offsetWidth;
    var H1 = oBox.offsetHeight;
    var oBox2 = document.getElementById('main');
    var L2 = oBox2.offsetWidth;
    var H2 = oBox2.offsetHeight;
    //获取实际页面的left值。（页面宽度减去元素自身宽度/2）
    var Left = (document.documentElement.clientWidth - L2) / 2-L1+57;
    //获取实际页面的top值。（页面宽度减去元素自身高度/2）
    var top = (document.documentElement.clientHeight - H2) / 2-37;
    oBox.style.left = Left + 'px';
    oBox.style.top = top + 'px';
}
function fat2() {
    var oBox = document.getElementById('fat');
    var L1 = oBox.offsetWidth;
    var H1 = oBox.offsetHeight;
    var oBox2 = document.getElementById('main');
    var L2 = oBox2.offsetWidth;
    var H2 = oBox2.offsetHeight;
    //获取实际页面的left值。（页面宽度减去元素自身宽度/2）
    var Left = (document.documentElement.clientWidth + L2) / 2 - 68;
    //获取实际页面的top值。（页面宽度减去元素自身高度/2）
    var top = (document.documentElement.clientHeight - H2) / 2 - 32;
    oBox.style.left = Left + 'px';
    oBox.style.top = top + 'px';
}