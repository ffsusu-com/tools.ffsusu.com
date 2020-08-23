//读取
$(function () {

    var csvList;
    var insert = '';
    var target = '.link ul';
    $("#overlay").fadeOut()
    var a = $('div#explain').find('img');
    var len = a.length;
    for (var i = 0; i < len; i++) {
        a[i].onclick = function () {
            $("#bigger").css("background-image", "url(" + a[i].src + ")");
            $("#overlay").fadeIn();
            s();
        };
    }    
    $.ajax({
        url: './csv/explore.csv',
        success: function (data) {

            csvList = $.csv()(data);
            for (var i = 1; i < csvList.length; i++) {
                insert += '<li><a class="btn" onclick="explain(this,' + i + ')" target="_blank"><img src="tupian/explore/' + csvList[i][0] + '.png"><div class="bd"></div></a></li>';
            }
            $(target).append(insert);
            Page.arr = Page.pushArr();
            Page.setTotalPageNums();
            Page.setClickPageNum();
            Page.allContent("null");
        }
    });
});
function explain(obj,i) {
    var csvList;
    var insert = '';
    var target = '.explain';
    $(".explain").empty();
    $('div.bd.Selected').removeClass('Selected');
    $(obj).find('.bd').addClass('Selected');    
    $.ajax({
        url: './csv/explore.csv',
        success: function (data) {

            csvList = $.csv()(data);
            insert += '<img style="float:left;width:300px;height:160px;padding: 20px 0px 0px 0px;" src=tupian/explore/' + csvList[i][1] + '.png>';
            insert += '<p style="font-size: 19px;">' + csvList[i][4] + ('000' + csvList[i][2]).slice(-3) + csvList[i][3] + '</p>';            
            insert += '<p style="font-size: 11px;">' + csvList[i][14] + '</p>';
            insert += '<p style="font-size: 13px;padding:8px 0 0 0;">' + csvList[i][5] + '(X<font color="#ff912f">' + csvList[i][6] + '</font>,Y<font color="#ff912f">' + csvList[i][7] + '</font>)</p>';
            csvList[i][10] == "" ? insert += '<p style="font-size: 13px;">特殊要求：无' : insert += '<p style="font-size: 13px;">' + csvList[i][10] + '<img style="width:32px;height:32px;margin: 0px 0px -10px 0;" src=tupian/weather/' + csvList[i][9] + '.png><font color="#ff912f">' + csvList[i][8] + '</font>';
            insert += '<img onclick="bigger(this)" style="float:right;width:112px;height:63px;" src=tupian/explore/' + csvList[i][16] + '.jpg>';
            insert += '<img onclick="bigger(this)" style="float:right;width:112px;height:63px;" src=tupian/explore/' + csvList[i][15] + '.jpg></p>';
            insert += '<img style="float:left;width:40px;height:40px;" src=tupian/action/' + csvList[i][13] + '.png>' + '<p style="font-size: 13px;">' + csvList[i][11] + '</p>' + '<p style="font-size: 13px;"><font color="#ff912f">' + csvList[i][12] + '</font></p>';            
            $(target).append(insert);
        }

    });
}
//分页
var Page = {
    //每页内容数目
    defaultPerPageNum: 40,
    arr: null,
    setTotalPageNums: function () {
        var pp = Page.defaultPerPageNum;
        var pnums = 6;
        var div = document.getElementById('pagenum');
        div.innerHTML = "";
        for (var i = 0; i < pnums; i++) {
            var a = document.createElement('a');
            a.href = "#";
            a.innerHTML = i + 1;
            a.setAttribute('class', 'off');
            div.appendChild(a);
        }
        Page.setClickPageNum();
    },
    getClickPageNum: function (diva) {
        return parseFloat(diva.innerHTML);
    },
    setClickPageNum: function () {
        var divx = document.getElementById('pagenum');
        var a = divx.children;
        var len = a.length;
        for (var i = 0; i < len; i++) {
            a[i].onclick = function () {
                for (var i = 0; i < len; i++) { a[i].className = "off"; }
                this.className = "on";
                Page.allContent(this);
            };
        }
    },
    pushArr: function () {
        var arr = new Array();
        var ul = document.getElementById('explore');
        var len = ul.children.length;
        for (var i = 0; i < len; i++) {
            arr.push(ul.children[i]);
        }
        return arr;
    },
    allContent: function (divb) {
        var ul = document.getElementById('explore');
        ul.innerHTML = "";
        var pp = parseFloat(Page.defaultPerPageNum);
        if ("null" == divb) {
            divb = document.getElementById('pagenum').children[0];
            divb.className = "on";
        }
        var pg = this.getClickPageNum(divb); // 1 2 3
        var ppj = pp * (pg - 1); // 0 4 8
        var end = ppj + pp; // 4 8 12
        if (pg == 4) { end = ppj + 22; }
        else if (pg == 5) { ppj = 142; end = 182; }
        else if (pg == 6) { ppj = 182; end = 187; }
        var arr = this.arr;
        var pnums = 6;
        for (var i = ppj; i < end; i++) {
            var a = arr[i];
            if (null != a) {
                ul.appendChild(a);
            }
        }
        $(".explain").empty();
        $('a.btn').find('.bd').removeClass('Selected');
//        $('a.btn:first').click();
//        $('a.btn:first').find('.bd').addClass('Selected');
    }
};

