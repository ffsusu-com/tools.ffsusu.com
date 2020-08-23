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

    var target1 = '#npc_list_count';
    var csvList_npc;
    var insert1 = '';
    $.ajax({
        url: './csv/triple_tryad_npc.csv',
        success: function(data) {

            // csvを配列に格納
            csvList_npc = $.csv()(data);

            // 挿入するHTMLを作成
            for (var i = 1; i < csvList_npc.length; i++) {
                insert1 += '<tr><td id="npc_' + csvList_npc[i][0] + '">' + csvList_npc[i][1] + '</td></tr>';
            };
            $(target1).append(insert1);

            //全NPC数のカウント
            $('#count_comp1_max').text(csvList_npc.length-1);

            //保存クッキーの展開
            if($.cookie("dataNpc")){
                var npcArray = $.cookie("dataNpc");
                var countNpcData = npcArray.length;
                for (var i = 0; i < countNpcData; i++) {
                    if ( npcArray[i]=='1') {
                        $('#npc_list_count td').eq(i).addClass('check');
                    };
                };
            }

            //進捗チェック
            compCountNpc();

        }
    });

    var target_card1 = '#card_list_count1';
    var target_card2 = '#card_list_count2';
    var target_card3 = '#card_list_count3';
    var target_card4 = '#card_list_count4';
    var target_card5 = '#card_list_count5';
    var csvList_card;
    var insert_card1 = '';
    var insert_card2 = '';
    var insert_card3 = '';
    var insert_card4 = '';
    var insert_card5 = '';
    $.ajax({
        url: './csv/triple_tryad_card.csv',
        success: function(data) {

            // csvを配列に格納
            csvList_card = $.csv()(data);

            // 挿入するHTMLを作成
            for (var i = 1; i < csvList_card.length; i++) {
                if (csvList_card[i][2]==1) {
                    insert_card1 += '<tr><td id="card_' + csvList_card[i][0] + '">' + csvList_card[i][1] + '</td></tr>';
                };
                if (csvList_card[i][2]==2) {
                    insert_card2 += '<tr><td id="card_' + csvList_card[i][0] + '">' + csvList_card[i][1] + '</td></tr>';
                };
                if (csvList_card[i][2]==3) {
                    insert_card3 += '<tr><td id="card_' + csvList_card[i][0] + '">' + csvList_card[i][1] + '</td></tr>';
                };
                if (csvList_card[i][2]==4) {
                    insert_card4 += '<tr><td id="card_' + csvList_card[i][0] + '">' + csvList_card[i][1] + '</td></tr>';
                };
                if (csvList_card[i][2]==5) {
                    insert_card5 += '<tr><td id="card_' + csvList_card[i][0] + '">' + csvList_card[i][1] + '</td></tr>';
                };
            };
            $(target_card1).append(insert_card1);
            $(target_card2).append(insert_card2);
            $(target_card3).append(insert_card3);
            $(target_card4).append(insert_card4);
            $(target_card5).append(insert_card5);

            //全カード数のカウント
            $('#count_comp2_max').text(csvList_card.length-1);

            //保存クッキーの展開
            if($.cookie("dataCard1")){
                var card1Array = $.cookie("dataCard1");
                var countCard1Data = card1Array.length;
                for (var i = 0; i < countCard1Data; i++) {
                    if ( card1Array[i]=='1') {
                        $('#card_list_count1').find('td').eq(i).addClass('check');
                    };
                };
            }
            if($.cookie("dataCard2")){
                var card2Array = $.cookie("dataCard2");
                var countCard2Data = card2Array.length;
                for (var i = 0; i < countCard2Data; i++) {
                    if ( card2Array[i]=='1') {
                        $('#card_list_count2').find('td').eq(i).addClass('check');
                    };
                };
            }
            if($.cookie("dataCard3")){
                var card3Array = $.cookie("dataCard3");
                var countCard3Data = card3Array.length;
                for (var i = 0; i < countCard3Data; i++) {
                    if ( card3Array[i]=='1') {
                        $('#card_list_count3').find('td').eq(i).addClass('check');
                    };
                };
            }
            if($.cookie("dataCard4")){
                var card4Array = $.cookie("dataCard4");
                var countCard4Data = card4Array.length;
                for (var i = 0; i < countCard4Data; i++) {
                    if ( card4Array[i]=='1') {
                        $('#card_list_count4').find('td').eq(i).addClass('check');
                    };
                };
            }
            if($.cookie("dataCard5")){
                var card5Array = $.cookie("dataCard5");
                var countCard5Data = card5Array.length;
                for (var i = 0; i < countCard5Data; i++) {
                    if ( card5Array[i]=='1') {
                        $('#card_list_count5').find('td').eq(i).addClass('check');
                    };
                };
            }

            //進捗チェック
            compCountCard();

        }
    });

    var target2 = '#npc_all_list';
    var csvList2;
    var insert2 = '';
    $.ajax({
        url: './csv/triple_tryad_npc.csv',
        success: function(data) {

            // csvを配列に格納
            csvList2 = $.csv()(data);

            // 挿入するHTMLを作成
            for (var i = 1; i < csvList2.length; i++) {
                var card1_id = '';
                var card2_id = '';
                var card3_id = '';
                var card4_id = '';

                insert2 += '<tr>';
                insert2 += '<td class="npc_' + csvList2[i][0] + '">' + csvList2[i][1] + '</td>';
                insert2 += '<td>';
                insert2 += csvList2[i][2];
                if(isset(csvList2[i][3])){
                    insert2 += '<br><span class="color_orange" style="font-size:11px">ET ' + csvList2[i][3] + '</span>';
                }
                insert2 += '</td>';
                insert2 += '<td>';
                insert2 += csvList2[i][4];
                if(isset(csvList2[i][5])){
                    insert2 += '<br>' + csvList2[i][5];
                }
                if(isset(csvList2[i][6])){
                    insert2 += '<br>' + csvList2[i][6];
                }
                if(isset(csvList2[i][7])){
                    insert2 += '<br>' + csvList2[i][7];
                }
                insert2 += '</td>';
                insert2 += '<td>';

                var card1_id = csvList2[i][8];
                if(isset(csvList2[i][9])){
                    var card2_id = csvList2[i][9];
                }
                if(isset(csvList2[i][10])){
                    var card3_id = csvList2[i][10];
                }
                if(isset(csvList2[i][11])){
                    var card4_id = csvList2[i][11];
                }

                for (var j = 1; j < csvList_card.length; j++) {
                    if (csvList_card[j][0]==card1_id) {
                        insert2 += '<p class="card_' + csvList_card[j][0] + '">★' + csvList_card[j][2] +' '+ csvList_card[j][1] + '</p>';
                    };
                }
                if(isset(card2_id)){
                    for (var j = 1; j < csvList_card.length; j++) {
                        if (csvList_card[j][0]==card2_id) {
                            insert2 += '<br><p class="card_' + csvList_card[j][0] + '">★' + csvList_card[j][2] +' '+ csvList_card[j][1] + '</p>';
                        };
                    }
                }
                if(isset(card3_id)){
                    for (var j = 1; j < csvList_card.length; j++) {
                        if (csvList_card[j][0]==card3_id) {
                            insert2 += '<br><p class="card_' + csvList_card[j][0] + '">★' + csvList_card[j][2] +' '+ csvList_card[j][1] + '</p>';
                        };
                    }
                }
                if(isset(card4_id)){
                    for (var j = 1; j < csvList_card.length; j++) {
                        if (csvList_card[j][0]==card4_id) {
                            insert2 += '<br><p class="card_' + csvList_card[j][0] + '">★' + csvList_card[j][2] +' '+ csvList_card[j][1] + '</p>';
                        };
                    }
                }
                insert2 += '</td>';
                insert2 += '</tr>';
            };
            $(target2).append(insert2);

            checkCompNpc();
            checkCompCard();

        }
    });

    var target3 = '#card_all_list';
    var csvList3;
    var insert3 = '';
    $.ajax({
        url: './csv/triple_tryad_card.csv',
        success: function(data) {

            // csvを配列に格納
            csvList3 = $.csv()(data);

            // 挿入するHTMLを作成
            for (var i = 1; i < csvList3.length; i++) {
                var getfor_1 = '';
                var getfor_2 = '';
                var getfor_3 = '';
                var getfor_4 = '';
                var getfor_5 = '';
                var getfor_6 = '';
                var getfor_7 = '';
                var getfor_8 = '';

                insert3 += '<tr>';
                insert3 += '<td class="card_' + csvList3[i][0] + '">★' + + csvList3[i][2] + ' ' +csvList3[i][1] + '</td>';

                insert3 += '<td>';
                if(isset(csvList3[i][3])){
                    var getfor_1 = csvList3[i][3];
                }
                if(isset(csvList3[i][4])){
                    var getfor_2 = csvList3[i][4];
                }
                if(isset(csvList3[i][5])){
                    var getfor_3 = csvList3[i][5];
                }
                if(isset(getfor_1)){
                    for (var j = 1; j < csvList_npc.length; j++) {
                        if (csvList_npc[j][0]==getfor_1) {
                            if ( csvList_npc[j][3] != '' ) {
                                insert3 += '<p class="npc_' + csvList_npc[j][0] + '">'+ csvList_npc[j][1] + '</p>　<p class="color_orange">ET' + csvList_npc[j][3] + '</p>';
                            } else {
                                insert3 += '<p class="npc_' + csvList_npc[j][0] + '">'+ csvList_npc[j][1] + '</p>';
                            }
                            insert3 += '<br>　└' + csvList_npc[j][2];
                        };
                    }
                }
                if(isset(getfor_2)){
                    for (var j = 1; j < csvList_npc.length; j++) {
                        if (csvList_npc[j][0]==getfor_2) {
                            if ( csvList_npc[j][3] != '' ) {
                                insert3 += '<br><p class="npc_' + csvList_npc[j][0] + '">'+ csvList_npc[j][1] + '</p>　<p class="color_orange">ET' + csvList_npc[j][3] + '</p>';
                            } else {
                                insert3 += '<br><p class="npc_' + csvList_npc[j][0] + '">'+ csvList_npc[j][1] + '</p>';
                            }
                            insert3 += '<br>　└' + csvList_npc[j][2];
                        };
                    }
                }
                if(isset(getfor_3)){
                    for (var j = 1; j < csvList_npc.length; j++) {
                        if (csvList_npc[j][0]==getfor_3) {
                            if ( csvList_npc[j][3] != '' ) {
                                insert3 += '<br><p class="npc_' + csvList_npc[j][0] + '">'+ csvList_npc[j][1] + '</p>　<p class="color_orange">ET' + csvList_npc[j][3] + '</p>';
                            } else {
                                insert3 += '<br><p class="npc_' + csvList_npc[j][0] + '">'+ csvList_npc[j][1] + '</p>';
                            }
                            insert3 += '<br>　└' + csvList_npc[j][2];
                        };
                    }
                }
                insert3 += '</td>';

                insert3 += '<td>';
                if(isset(csvList3[i][6])){
                    var getfor_4 = csvList3[i][6];
                }
                if(isset(csvList3[i][7])){
                    var getfor_5 = csvList3[i][7];
                }
                if(isset(getfor_4)){
                    insert3 += '<p>「'+ getfor_4 + '」</p>';
                }
                if(isset(getfor_5)){
                    insert3 += '<br><p>「'+ getfor_5 + '」</p>';
                }
                insert3 += '</td>';

                insert3 += '<td>';
                if(isset(csvList3[i][8])){
                    var getfor_6 = csvList3[i][8];
                }
                if(isset(csvList3[i][9])){
                    var getfor_7 = csvList3[i][9];
                }
                if(isset(csvList3[i][10])){
                    var getfor_8 = csvList3[i][10];
                }
                if(isset(getfor_6)){
                    insert3 += '<p>「'+ getfor_6 + '」封入</p><br>';
                }
                if(isset(getfor_7)){
                    insert3 += '<p>「'+ getfor_7 + '」封入</p><br>';
                }
                if(isset(getfor_8)){
                    insert3 += '<p>'+ getfor_8 + '</p>';
                }
                insert3 += '</td>';

                insert3 += '</tr>';
            };
            $(target3).append(insert3);

            checkCompNpc();
            checkCompCard();

        }
    });

    //tab切り替え
    $('.show_tab0').click(function(){
        $('.show_tab0').removeClass('current');
        $('.show_tab1').removeClass('current');
        $('.show_tab2').removeClass('current');
        $('.show_tab0').addClass('current');
        $('.tab0').hide();
        $('.tab1').hide();
        $('.tab2').hide();
        $('.tab0').show();
    })
    $('.show_tab1').click(function(){
        $('.show_tab0').removeClass('current');
        $('.show_tab1').removeClass('current');
        $('.show_tab2').removeClass('current');
        $('.show_tab1').addClass('current');
        $('.tab0').hide();
        $('.tab1').hide();
        $('.tab2').hide();
        $('.tab1').show();
    })
    $('.show_tab2').click(function(){
        $('.show_tab0').removeClass('current');
        $('.show_tab1').removeClass('current');
        $('.show_tab2').removeClass('current');
        $('.show_tab2').addClass('current');
        $('.tab0').hide();
        $('.tab1').hide();
        $('.tab2').hide();
        $('.tab2').show();
    })

    $(document).on('click', '#npc_list_count td',function(){
        if ($(this).hasClass('check')) {
            $(this).removeClass('check');
        }else{
            $(this).addClass('check')
        };
        compCountNpc();
        checkCompNpc();
        saveNpcdata();
    });

    $(document).on('click', '#card_list_count1 td',function(){
        if ($(this).hasClass('check')) {
            $(this).removeClass('check');
        }else{
            $(this).addClass('check')
        };
        compCountCard();
        checkCompCard();
        saveCard1data();
    });

    $(document).on('click', '#card_list_count2 td',function(){
        if ($(this).hasClass('check')) {
            $(this).removeClass('check');
        }else{
            $(this).addClass('check')
        };
        compCountCard();
        checkCompCard();
        saveCard2data();
    });

    $(document).on('click', '#card_list_count3 td',function(){
        if ($(this).hasClass('check')) {
            $(this).removeClass('check');
        }else{
            $(this).addClass('check')
        };
        compCountCard();
        checkCompCard();
        saveCard3data();
    });

    $(document).on('click', '#card_list_count4 td',function(){
        if ($(this).hasClass('check')) {
            $(this).removeClass('check');
        }else{
            $(this).addClass('check')
        };
        compCountCard();
        checkCompCard();
        saveCard4data();
    });

    $(document).on('click', '#card_list_count5 td',function(){
        if ($(this).hasClass('check')) {
            $(this).removeClass('check');
        }else{
            $(this).addClass('check')
        };
        compCountCard();
        checkCompCard();
        saveCard5data();
    });

    $('.everget_extraction').click(function(){
        if ($(this).hasClass('current')) {
            $(this).removeClass('current');
            $('#card_all_list tr').show();
        }else{
            $(this).addClass('current');
            var countCard = $('#card_all_list tr').length;
            for (var i = 0; i < countCard; i++) {
                if ($('#card_all_list tr > td:first-child').eq(i).hasClass('check')) {
                    $('#card_all_list tr > td:first-child').eq(i).parent('tr').hide();
                }
            }
        }
    })

})

function compCountNpc(){
    var compCountNpc = $('#npc_list_count').find('td.check').length;
    $('#count_comp1').text(compCountNpc);
}

function checkCompNpc(){
    var countNpc = $('#npc_list_count td').length;
    for (var i = 0; i < countNpc; i++) {
        if ( $('#npc_list_count td').eq(i).hasClass('check') ) {
            var checkId = $('#npc_list_count td').eq(i).attr('id');
            $('.tab1').find('.'+checkId).addClass('check');
            $('.tab2').find('.'+checkId).addClass('check');
        }else{
            var checkId = $('#npc_list_count td').eq(i).attr('id');
            $('.tab1').find('.'+checkId).removeClass('check');
            $('.tab2').find('.'+checkId).removeClass('check');
        };
    };
}

function compCountCard(){
    var compCountCard_1 = $('#card_list_count1').find('td.check').length;
    var compCountCard_2 = $('#card_list_count2').find('td.check').length;
    var compCountCard_3 = $('#card_list_count3').find('td.check').length;
    var compCountCard_4 = $('#card_list_count4').find('td.check').length;
    var compCountCard_5 = $('#card_list_count5').find('td.check').length;
    var compCountCard = compCountCard_1+compCountCard_2+compCountCard_3+compCountCard_4+compCountCard_5;
    $('#count_comp2').text(compCountCard);
}

function checkCompCard(){
    var countCard1 = $('#card_list_count1').find('td').length;
    for (var i = 0; i < countCard1; i++) {
        if ( $('#card_list_count1').find('td').eq(i).hasClass('check') ) {
            var checkId = $('#card_list_count1').find('td').eq(i).attr('id');
            $('.tab1').find('.'+checkId).addClass('check');
            $('.tab2').find('.'+checkId).addClass('check');
        }else{
            var checkId = $('#card_list_count1').find('td').eq(i).attr('id');
            $('.tab1').find('.'+checkId).removeClass('check');
            $('.tab2').find('.'+checkId).removeClass('check');
        };
    };
    var countCard2 = $('#card_list_count2').find('td').length;
    for (var i = 0; i < countCard2; i++) {
        if ( $('#card_list_count2').find('td').eq(i).hasClass('check') ) {
            var checkId = $('#card_list_count2').find('td').eq(i).attr('id');
            $('.tab1').find('.'+checkId).addClass('check');
            $('.tab2').find('.'+checkId).addClass('check');
        }else{
            var checkId = $('#card_list_count2').find('td').eq(i).attr('id');
            $('.tab1').find('.'+checkId).removeClass('check');
            $('.tab2').find('.'+checkId).removeClass('check');
        };
    };
    var countCard3 = $('#card_list_count3').find('td').length;
    for (var i = 0; i < countCard3; i++) {
        if ( $('#card_list_count3').find('td').eq(i).hasClass('check') ) {
            var checkId = $('#card_list_count3').find('td').eq(i).attr('id');
            $('.tab1').find('.'+checkId).addClass('check');
            $('.tab2').find('.'+checkId).addClass('check');
        }else{
            var checkId = $('#card_list_count3').find('td').eq(i).attr('id');
            $('.tab1').find('.'+checkId).removeClass('check');
            $('.tab2').find('.'+checkId).removeClass('check');
        };
    };
    var countCard4 = $('#card_list_count4').find('td').length;
    for (var i = 0; i < countCard4; i++) {
        if ( $('#card_list_count4').find('td').eq(i).hasClass('check') ) {
            var checkId = $('#card_list_count4').find('td').eq(i).attr('id');
            $('.tab1').find('.'+checkId).addClass('check');
            $('.tab2').find('.'+checkId).addClass('check');
        }else{
            var checkId = $('#card_list_count4').find('td').eq(i).attr('id');
            $('.tab1').find('.'+checkId).removeClass('check');
            $('.tab2').find('.'+checkId).removeClass('check');
        };
    };
    var countCard5 = $('#card_list_count5').find('td').length;
    for (var i = 0; i < countCard5; i++) {
        if ( $('#card_list_count5').find('td').eq(i).hasClass('check') ) {
            var checkId = $('#card_list_count5').find('td').eq(i).attr('id');
            $('.tab1').find('.'+checkId).addClass('check');
            $('.tab2').find('.'+checkId).addClass('check');
        }else{
            var checkId = $('#card_list_count5').find('td').eq(i).attr('id');
            $('.tab1').find('.'+checkId).removeClass('check');
            $('.tab2').find('.'+checkId).removeClass('check');
        };
    };
}

function saveNpcdata(){
    var countNpc = $('#npc_list_count').find('td').length;
    var npcArray = [];
    //0or1で配列にぶっこむ
    for ( var i = 0; i < countNpc; i++ ) {
        if ($('#npc_list_count').find('td').eq(i).hasClass('check')) {
            npcArray.push(1);
        }else{
            npcArray.push(0);
        };
    };
    //配列をクッキー保存
    $.cookie("dataNpc",npcArray, { expires: 365 , path: "/" });
}

function saveCard1data(){
    var countCard1 = $('#card_list_count1').find('td').length;
    var card1Array = [];
    //0or1で配列にぶっこむ
    for ( var i = 0; i < countCard1; i++ ) {
        if ($('#card_list_count1').find('td').eq(i).hasClass('check')) {
            card1Array.push(1);
        }else{
            card1Array.push(0);
        };
    };
    //配列をクッキー保存
    $.cookie("dataCard1",card1Array, { expires: 365 , path: "/" });
}

function saveCard2data(){
    var countCard2 = $('#card_list_count2').find('td').length;
    var card2Array = [];
    //0or1で配列にぶっこむ
    for ( var i = 0; i < countCard2; i++ ) {
        if ($('#card_list_count2').find('td').eq(i).hasClass('check')) {
            card2Array.push(1);
        }else{
            card2Array.push(0);
        };
    };
    //配列をクッキー保存
    $.cookie("dataCard2",card2Array, { expires: 365 , path: "/" });
}

function saveCard3data(){
    var countCard3 = $('#card_list_count3').find('td').length;
    var card3Array = [];
    //0or1で配列にぶっこむ
    for ( var i = 0; i < countCard3; i++ ) {
        if ($('#card_list_count3').find('td').eq(i).hasClass('check')) {
            card3Array.push(1);
        }else{
            card3Array.push(0);
        };
    };
    //配列をクッキー保存
    $.cookie("dataCard3",card3Array, { expires: 365 , path: "/" });
}

function saveCard4data(){
    var countCard4 = $('#card_list_count4').find('td').length;
    var card4Array = [];
    //0or1で配列にぶっこむ
    for ( var i = 0; i < countCard4; i++ ) {
        if ($('#card_list_count4').find('td').eq(i).hasClass('check')) {
            card4Array.push(1);
        }else{
            card4Array.push(0);
        };
    };
    //配列をクッキー保存
    $.cookie("dataCard4",card4Array, { expires: 365 , path: "/" });
}

function saveCard5data(){
    var countCard5 = $('#card_list_count5').find('td').length;
    var card5Array = [];
    //0or1で配列にぶっこむ
    for ( var i = 0; i < countCard5; i++ ) {
        if ($('#card_list_count5').find('td').eq(i).hasClass('check')) {
            card5Array.push(1);
        }else{
            card5Array.push(0);
        };
    };
    //配列をクッキー保存
    $.cookie("dataCard5",card5Array, { expires: 365 , path: "/" });
}