function hunt() {
    var infolist = [];
    //读取
    $(function () {
        $(".link").empty();
        $(".link").append('<div id="pagenum" class="pagenum"></div><ul id="aether"></ul>');
        $(".explain").empty();
        var insert2 = '';             
        $.ajax({
            url: './csv/aether.csv',
            success: function (data) {
                infolist[1] = "";
                infolist[2] = "";
                infolist[1] += '<li><a class="btn" onclick="huntexplain(this,1)" target="_blank"><img src="tupian/aether/1.png"><div style="background-image: url("");" class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="huntexplain(this,2)" target="_blank"><img src="tupian/aether/2.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="huntexplain(this,3)" target="_blank"><img src="tupian/aether/3.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="huntexplain(this,4)" target="_blank"><img src="tupian/aether/4.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="huntexplain(this,5)" target="_blank"><img src="tupian/aether/5.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[1] += '<li><a class="btn" onclick="huntexplain(this,6)" target="_blank"><img src="tupian/aether/6.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="huntexplain(this,7)" target="_blank"><img src="tupian/aether/7.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="huntexplain(this,8)" target="_blank"><img src="tupian/aether/8.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="huntexplain(this,9)" target="_blank"><img src="tupian/aether/9.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="huntexplain(this,10)" target="_blank"><img src="tupian/aether/10.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="huntexplain(this,11)" target="_blank"><img src="tupian/aether/11.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                infolist[2] += '<li><a class="btn" onclick="huntexplain(this,12)" target="_blank"><img src="tupian/aether/12.png"><div style="background-image: url(""); class="bd"></div></a></li>';
                Page.setTotalPageNums();
                Page.setClickPageNum();
                Page.allContent("null");
                $(".explain").append(insert2);
            }
        });
    });    
    //分页
    var Page = {
        //每页内容数目    
        setTotalPageNums: function () {
            var insert = '';
            insert += '<a style="float:left;width:50px;" class="off" href="#">3.0</a>';
            insert += '<a style="float:left;width:50px;" class="off" href="#">4.0</a>';
            $("#pagenum").append(insert);
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
        allContent: function (divb) {
            var target = '.link ul';
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[1];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3
            if (pg == "3.0") { pg = "1"; }
            else if (pg == "4.0") { pg = "2"; }
            $(".explain").empty();
            $(target).empty();
            $(target).append(infolist[pg]);
            $('a.btn:first').click();
            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}

function huntexplain(obj, i) {
    var csvList;
    var insert = '';
    var target = '.explain';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $(".explain").empty();
    $.ajax({
        url: './csv/aether.csv',
        success: function (data) {
            insert += '<img onclick="bigger(this)" style="width:190px;"src="tupian/hunt/' + i + '.jpg">';
            $(target).append(insert);
        }
    });
}