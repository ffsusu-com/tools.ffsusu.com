$(function(){

    // 自動JSON化を有効に
    $.cookie.json = true;

    var isset = function(data){
        if(data === "" || data === null || data === undefined){
            return false;
        }else{
            return true;
        }
    };

    var target = '#orchestrion_list_layout';
    var csvList;
    var insert = '';
    $.ajax({
        url: './csv/orchestrion.csv',
        success: function(data) {

            // csvを配列に格納
            csvList = $.csv()(data);

            // 挿入するHTMLを作成
            for (var i = 1; i < csvList.length; i++) {
                insert += '<tr class="category_' + csvList[i][9] + '">'
                if ( csvList[i][0] < 900 ) {
                    if ( isset(csvList[i][7]) ) {
                        insert += '<td rowspan="3">' + csvList[i][0] + '</td>'
                    }else{
                        insert += '<td>' + csvList[i][0] + '</td>'
                    }
                }else{
                    insert += '<td>-</td>'
                }
                if ( isset(csvList[i][7]) ) {
                    insert += '<td class="checkbox" rowspan="3">' + csvList[i][1] + '</td>'
                }else{
                    insert += '<td class="checkbox">' + csvList[i][1] + '</td>'
                }
                if (csvList[i][2] == 0) {
                    var listColor = '#ffffff';
                }else if(csvList[i][2] == 1) {
                    var listColor = '#ff0000';
                }else if(csvList[i][2] == 2) {
                    var listColor = '#0088ff';
                }else if(csvList[i][2] == 9) {
                    var listColor = '#00ff00';
                }
                insert += '<td style="color:' + listColor + '">' + csvList[i][3] + '</td>'
                insert += '<td>' + csvList[i][4] + '</td>'
                insert += '</tr>'
                if ( isset(csvList[i][7]) ) {
                    insert += '<tr class="category_' + csvList[i][9] + '">'
                    insert += '<td style="color:' + listColor + '">' + csvList[i][5] + '</td>'
                    insert += '<td>' + csvList[i][6] + '</td>'
                    insert += '</tr>'
                    insert += '<tr class="category_' + csvList[i][9] + '">'
                    insert += '<td style="color:' + listColor + '">' + csvList[i][7] + '</td>'
                    insert += '<td>' + csvList[i][8] + '</td>'
                    insert += '</tr>'
                }
            };
            $(target).append(insert);

            //全楽譜のカウント
            var countMusic = $('.orchestrion_list_layout').find('.checkbox').length;
            $('.count_num').text(countMusic);

            //保存クッキーの展開
            if($.cookie("musicData")){
                var musicArray = $.cookie("musicData");
                var countMusicData = musicArray.length;
                for (var i = 0; i < countMusicData; i++) {
                    if ( musicArray[i]=='1') {
                        $('.orchestrion_list_layout').find('.checkbox').eq(i).addClass('check');
                    };
                };
            }

            countAllMusic();
            countCompMusic();

        }
    });

    $(document).on('click', '.orchestrion_list_layout .checkbox',function(){
        if ($(this).hasClass('check')) {
            $(this).removeClass('check');
        }else{
            $(this).addClass('check')
        };
        countCompMusic();
        saveMusicdata();
    });

});

function countAllMusic() {
    var countMusic = $('.orchestrion_list_layout').find('.checkbox').length;
    $('.count_num').text(countMusic);
}

function countCompMusic() {
    var countCompMusic = $('.orchestrion_list_layout').find('.checkbox.check').length;
    $('.count_comp_num').text(countCompMusic);
}

function saveMusicdata(){
    var countMusic = $('.orchestrion_list_layout').find('.checkbox').length;
    var musicArray = [];
    //0or1で配列にぶっこむ
    for ( var i = 0; i < countMusic; i++ ) {
        if ($('.orchestrion_list_layout').find('.checkbox').eq(i).hasClass('check')) {
            musicArray.push(1);
        }else{
            musicArray.push(0);
        };
    };
    //配列をクッキー保存
    $.cookie("musicData",musicArray, { expires: 365 , path: "/orchestrion_list.html" });
}