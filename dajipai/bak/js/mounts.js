//读取
$(function () {

    var csvList;
    var insert = '';
    var target = '.link ul';
    $.ajax({
        url: './csv/mounts.csv',
        success: function (data) {

            csvList = $.csv()(data);
            for (var i = 1; i < csvList.length; i++) {
                insert += '<li><a class="btn" onclick="explain(' + i + ')" target="_blank"><img src="tupian/chongwuzuoqi-ui/' + csvList[i][1] + '.png" onerror=this.src="tupian/chongwuzuoqi-ui/004400.tex.png"><div class="bd"></div></a></li>';                
            }
            $(target).append(insert);
            Page.arr = Page.pushArr();
            Page.setTotalPageNums();
            Page.setClickPageNum();
            Page.allContent("null");
        }
    });
});
function explain(i) {
    var csvList;
    var insert = '';
    var target = '.explain';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $(".explain").empty();
    $.ajax({
        url: './csv/mounts.csv',
        success: function (data) {

            csvList = $.csv()(data);
            insert += '<img style="float:left;width:192px;height:192px;" src=tupian/chongwuzuoqi/' + csvList[i][0] + '.png onerror=this.src="tupian/chongwuzuoqi/068400.tex.png">';
            insert += '<p style="font-size: 19px;float:left;">' + csvList[i][4] + '</p>';
            csvList[i][3] == "1" ? insert += '<img style="float:left;width:24px;height:25px;" src=tupian/fly.png>' : insert += "";
            insert += '<p style="margin: 4px 0px 0px 0px;">Patch' + csvList[i][2] + '</p><br>';
            csvList[i][5] == "" ? insert += '<p>目前不明</p><br>' : insert += '<p>' + csvList[i][5] + '</p><br>';
            csvList[i][7] == "" ? insert += '<p>目前不明</p>' : insert += '<p style="color:#696969;">' + csvList[i][7] + '</p>';
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
        var pnums = Page.arr.length / pp > parseInt(Page.arr.length / pp) ? parseInt(Page.arr.length / pp) + 1 : Page.arr.length / pp;
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
        var ul = document.getElementById('mounts');
        var len = ul.children.length;
        for (var i = 0; i < len; i++) {
            arr.push(ul.children[i]);
        }
        return arr;
    },
    allContent: function (divb) {
        var ul = document.getElementById('mounts');
        ul.innerHTML = "";
        var pp = parseFloat(Page.defaultPerPageNum);
        if ("null" == divb) {
            divb = document.getElementById('pagenum').children[0];
            divb.className = "on";
        }
        var pg = this.getClickPageNum(divb); // 1 2 3
        var ppj = pp * (pg - 1); // 0 4 8
        var end = ppj + pp; // 4 8 12
        var arr = this.arr;
        var pnums = arr.length / pp > parseInt(arr.length / pp) ? parseInt(arr.length / pp) + 1 : arr.length / pp;
        for (var i = ppj; i < end; i++) {
            var a = arr[i];
            if (null != a) {
                ul.appendChild(a);
            }
        }
        $('a.btn').find('.bd').removeClass('Selected');
        $('a.btn:first').click();
        $('a.btn:first').find('.bd').addClass('Selected');
    }
};