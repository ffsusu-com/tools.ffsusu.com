function explore() {
    var infolist = [];
    //读取
    $(function () {

        var csvList;
        var insert = '';
        var target = '.link ul';
        $(".link").empty();
        $(".link").append('<div id="pagenum" class="pagenum"></div><ul id="explore"></ul>');
        $(".explain").empty();
        var insert2 = '';
        insert2 += '<p class="explain-title">使用说明</p><ul style="height:130px;overflow:auto;">';
        insert2 += '<p class="explain-main">探索笔记内容会涉及透剧，如会造成困扰请勿使用</p>';
        insert2 += '<p class="explain-main">感谢C2整理的2.0笔记的实地图</p>';
        insert2 += '<p class="explain-main">感谢神意之地的aemera整理的4.1笔记的实地图</p>';
        insert2 += '<p class="explain-main">如果发现图片错位，请首先F5/刷新</p>';
        insert2 += '<p class="explain-main">部分风景图转载于<span style="color: rgb(77, 138, 179);"><a href="http://weibo.com/ttarticle/p/show?id=2309404154742690447645" target="_blank">NGE</a></span>和<span style="color: rgb(255, 0, 0);"><a href="https://ff14.tabibun.net/" target="_blank">エオルゼア冒険譚</a></span></p>';
        insert2 += '<p class="explain-main">另外请注意2.0系列的探索笔记是不会像3.0和4.0在点上有光圈显示</p>';
        insert2 += '<p class="explain-main">所以一定请注意，「到达了探索笔记的目的地！」有这个提示的才是真的2.0探索笔记的点噢！<br /><hr /></p>';
        insert2 += '<p class="explain-main">噢首先得完成前置任务<span style="color: rgb(255, 0, 0);"><span style="font-weight: 700;">「被遗忘的探索笔记」</span></span><span style="font-weight: 700;">，</span>Lv20在 格里达尼亚新街&nbsp;冒险者行会（X：11.8 Y：13.4）NPC：娜奥 加姆多拉，接取</div></p>';
        insert2 += '<p class="explain-main">需完成该任务才能开通探索笔记，<span style="color: rgb(255, 0, 0);">当然并不需要完成</span>2.0的探索笔记的内容</div></p>';
        insert2 += '<p class="explain-main">开通3.0探索笔记内容</p>';
        insert2 += '<p class="explain-main">需要到龙堡参天高地，完成Lv52主线后，就在以太之光的前面桥上，找到NPC「凯斯特 艾恩哈特」，看到NPC头上有任务标记<img alt="" src="http://wx4.sinaimg.cn/large/a7a9f7f3gy1fjtvwmnvgwj200k00k0sh.jpg" style="width: 20px; height: 20px;" />，对话完毕就可以了，不需要做任务</p>';
        insert2 += '<p class="explain-main">开通4.0探索笔记内容</p>';
        insert2 += '<p class="explain-main">需要到神拳痕， 完成Lv60主线「康拉德的决定」后，找到NPC「乌尔格&middot;艾恩哈特」( X：10.5&nbsp;Y：13.1 )，看到NPC头上有任务标记<img alt="" src="http://wx4.sinaimg.cn/large/a7a9f7f3gy1fjtvwmnvgwj200k00k0sh.jpg" style="width: 20px; height: 20px;" />​，对话完毕就可以了，不需要做任务<br /></p></ul>';        
        $.ajax({
            url: './csv/explore.csv',
            success: function (data) {

                csvList = $.csv()(data);
                for (var i = 1; i < csvList.length; i++) {
                    if (i == 41 || i == 81 || i == 121 || i == 143 || i == 183) 
                    { insert = '<li><a class="btn" onclick="exploreexplain(this,' + i + ')" target="_blank"><img src="tupian/explore/' + csvList[i][0] + '.png"><div class="bd"></div></a></li>'; }
                    else { insert += '<li><a class="btn" onclick="exploreexplain(this,' + i + ')" target="_blank"><img src="tupian/explore/' + csvList[i][0] + '.png"><div class="bd"></div></a></li>'; }
                    if (i == 40)
                    { infolist[1] = insert; }
                    else if (i == 80)
                    { infolist[2] = insert; }
                    else if (i == 120)
                    { infolist[3] = insert; }
                    else if (i == 142)
                    { infolist[4] = insert; }
                    else if (i == 182)
                    { infolist[5] = insert; }
                    else if (i == 204)
                    { infolist[6] = insert; }
                }                
                Page.arr = csvList.length - 1;
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
        allContent: function (divb) {
            var target = '.link ul';            
            if ("null" == divb) {
                divb = document.getElementById('pagenum').children[0];
                divb.className = "on";
            }
            var pg = this.getClickPageNum(divb); // 1 2 3        
            $(".explain").empty();
            $(target).empty();
            $(target).append(infolist[pg]);
            //            $('a.btn:first').click();
            //            $('a.btn:first').find('.bd').addClass('Selected');
        }
    };
}
function exploreexplain(obj, i) {
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
            csvList[i][10] == "" ? insert += '<p style="font-size: 13px;">特殊要求：无</p>' : insert += '<p style="font-size: 13px;">' + csvList[i][10] + '<img style="width:32px;height:32px;margin: 0px 0px -10px 0;" src=tupian/weather/' + csvList[i][9] + '.png><font color="#ff912f">' + csvList[i][8] + '</font></p>';
            insert += '<img onclick="bigger(this)" style="float:right;width:112px;height:63px;" src=tupian/explore/' + csvList[i][16] + '.jpg>';
            insert += '<img onclick="bigger(this)" style="position: relative;float:right;width:112px;height:63px;right:10px;" src=tupian/explore/' + csvList[i][15] + '.jpg></p>';
            insert += '<img style="float:left;width:40px;height:40px;" src=tupian/action/' + csvList[i][13] + '.png>' + '<p style="font-size: 13px;">' + csvList[i][11] + '</p>' + '<p style="font-size: 13px;"><font color="#ff912f">' + csvList[i][12] + '</font></p>';
            $(target).append(insert);
        }

    });
}