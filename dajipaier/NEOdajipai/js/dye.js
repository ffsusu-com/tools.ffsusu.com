function dye() {
    var infolist = [];
    //��ȡ
    $(function () {
        $('#left').remove();
        $('#right').remove();
        $('#main').append(
        '<div id="page" style="opacity: 0;"></div>'
    );
        if (document.documentElement.clientWidth - 1009 > 0) {
            $("#page").css("left", (document.documentElement.clientWidth - 1009) / 2);
        }
        else { $("#page").css("left", 0); }
        $("#page").empty();
        $('#page').append(
        '<ul id="page_itemtop"></ul>'
        , '<ul id="page_check"><div id="typenum" class="dye"></div></ul>'
        , '<ul id="page_item"><li id="dye" align="center"></li></ul>'
        );
        $('#page_itemtop').append(
        '<li class="back"><a onclick="back()"><img src="image/����.png"></a></li>'
        , '<li><a><img src="image/Ⱦ��һ��.png"><div></div></a><p>Ⱦ��</p></li>'
    );
        var insert = '';
        insert += '<a style="float:left;background-position-x: 0px;" class="off">1</div></a>';
        insert += '<a style="float:left;background-position-x: -50px;" class="off">2</a>';
        insert += '<a style="float:left;background-position-x: -100px;" class="off">3</a>';
        insert += '<a style="float:left;background-position-x: -150px;" class="off">4</a>';
        insert += '<a style="float:left;background-position-x: -200px;" class="off">5</a>';
        insert += '<a style="float:left;background-position-x: -250px;" class="off">6</a>';
        insert += '<a style="float:left;background-position-x: -300px;" class="off">7</a>';
        insert += '<a style="float:left;background-position-x: -350px;" class="off">8</a>';
        $("#typenum").append(insert);
        page();
        open("page");
    });    
}
function page() {
    var divx = document.getElementById('typenum');
    var a = divx.children;
    var len = a.length;
    for (var i = 0; i < len; i++) {
        a[i].onclick = function () {
            for (var i = 0; i < len; i++) { a[i].className = "off"; }
            this.className = "on";
            var pg = this.innerHTML;
            var insert = '';            
            $("#dye").empty();
            insert += '<img src="image/dye-' + pg + '.png" style="width:100%;">';
            $("#dye").append(insert);            
        };
    } 
}