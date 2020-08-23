function pets() {
    var infolist = [];
    //读取
    $(function () {

        var csvList;
        var insert = '';                
        $(".link").empty();
        $(".link").append('<div id="pagenum" class="pagenum"></div><ul id="pets"></ul>');
        $(".explain").empty();
        $.ajax({
            url: './csv/pets.csv',
            success: function (data) {

                csvList = $.csv()(data);
                var n = (csvList.length - 1) / 40 > parseInt((csvList.length - 1) / 40) ? parseInt((csvList.length - 1) / 40) + 1 : ((csvList.length - 1) / 40);
                for (var i = 1; i < n; i++) {
                    infolist[i] = "";
                }
                for (var i = 1; i < csvList.length; i++) {
                    if (i % 40 == 1) { insert = '<li><a class="btn" onclick="petexplain(' + i + ')" target="_blank"><img src="tupian/chongwuzuoqi-ui/' + csvList[i][1] + '.png" onerror=this.src="tupian/chongwuzuoqi/004500.tex.png"><div class="bd"></div></a></li>'; }
                    else { insert += '<li><a class="btn" onclick="petexplain(' + i + ')" target="_blank"><img src="tupian/chongwuzuoqi-ui/' + csvList[i][1] + '.png" onerror=this.src="tupian/chongwuzuoqi/004500.tex.png"><div class="bd"></div></a></li>'; }
                    if (i % 40 == 0)
                    { infolist[i / 40] = insert; }
                    else if (i == csvList.length - 1)
                    { infolist[Math.ceil(i / 40)] = insert; }
                }                
                Page.arr = csvList.length - 1;
                Page.setTotalPageNums();
                Page.setClickPageNum();
                Page.allContent("null");
            }
        });
    });    
    //分页
    var Page = {
        //每页内容数目
        defaultPerPageNum: 40,
        arr: 0,
        setTotalPageNums: function () {
            var pp = Page.defaultPerPageNum;
            var pnums = Page.arr / pp > parseInt(Page.arr / pp) ? parseInt(Page.arr / pp) + 1 : Page.arr / pp;
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
        allContent: function (divb) {
            var target = '.link ul';
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[0];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3            
            $('a.btn').find('.bd').removeClass('Selected');
            $(target).empty();
            $(target).append(infolist[pg]);
            $('a.btn:first').click();
            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}
function petexplain(i) {
    var csvList;
    var insert = '';
    var target = '.explain';
    $('a.btn').click(function () {
        $('a.btn').find('.bd').removeClass('Selected');
        $(this).find('.bd').addClass('Selected');
    });
    $(".explain").empty();
    $.ajax({
        url: './csv/pets.csv',
        success: function (data) {

            csvList = $.csv()(data);
            insert += '<img style="float:left;width:192px;height:192px;" src=tupian/chongwuzuoqi/' + csvList[i][0] + '.png onerror=this.src="tupian/chongwuzuoqi/068500.tex.png">';
            insert += '<p style="font-size: 19px;float:left;">' + csvList[i][3] + '</p>';
            insert += '<p style="margin: 4px 0px 0px 0px;">Patch' + csvList[i][2] + '</p><br>';
            csvList[i][4] == "" ? insert += '<p>目前不明</p><br>' : insert += '<p>' + csvList[i][4] + '</p><br>';
            csvList[i][6] == "" ? insert += '<p>目前不明</p>' : insert += '<p style="color:#696969;font-size: 15px;">' + csvList[i][6] + '</p>';
            $(target).append(insert);
        }

    });
}