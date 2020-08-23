//                  コスト 探索  収集 巡航  航続   運
var sentai_1_arr = [  3,   0,   0,   0,  80, -10];
var sentai_2_arr = [  6,   0,   0,   0,  94, -14];
var sentai_3_arr = [ 11,   0,   0,   0, 108, -18];
var sentai_4_arr = [ 16,   0,   0,   0, 122, -22];
var sentai_5_arr = [ 21,   0,   0,   0, 136, -26];
var sentai_6_arr = [ 26,   0,   0,   0, 150, -30];
var sentai_7_arr = [ 31,   0,   0,   0, 164, -34];
var gisou_1_arr  = [  3,   0, -10,  80, -10,   0];
var gisou_2_arr  = [  6,   0, -14,  94, -14,   0];
var gisou_3_arr  = [ 11,   0, -18, 108, -18,   0];
var gisou_4_arr  = [ 16,   0, -22, 122, -22,   0];
var gisou_5_arr  = [ 21,   0, -26, 136, -26,   0];
var gisou_6_arr  = [ 26,   0, -30, 150, -30,   0];
var gisou_7_arr  = [ 31,   0, -34, 164, -34,   0];
var senshu_1_arr = [  3,  80,   0,   0,   0,  80];
var senshu_2_arr = [  6,  94,   0,   0,   0,  94];
var senshu_3_arr = [ 11, 108,   0,   0,   0, 108];
var senshu_4_arr = [ 16, 122,   0,   0,   0, 122];
var senshu_5_arr = [ 21, 136,   0,   0,   0, 136];
var senshu_6_arr = [ 26, 150,   0,   0,   0, 150];
var senshu_7_arr = [ 31, 164,   0,   0,   0, 164];
var senbi_1_arr  = [  3, -10,  80, -10,   0,   0];
var senbi_2_arr  = [  6, -14,  94, -14,   0,   0];
var senbi_3_arr  = [ 11, -18, 108, -18,   0,   0];
var senbi_4_arr  = [ 16, -22, 122, -22,   0,   0];
var senbi_5_arr  = [ 21, -26, 136, -26,   0,   0];
var senbi_6_arr  = [ 26, -30, 150, -30,   0,   0];
var senbi_7_arr  = [ 31, -34, 164, -34,   0,   0];

function sentaiStatus(){
    var sentaiID = $('input[name=sentai]:checked').attr('id');
    $('.sentai_status').find('.sentai_0_text').text(eval(sentaiID + '_arr')[0]);
    $('.sentai_status').find('.sentai_1_text').text(eval(sentaiID + '_arr')[1]);
    $('.sentai_status').find('.sentai_2_text').text(eval(sentaiID + '_arr')[2]);
    $('.sentai_status').find('.sentai_3_text').text(eval(sentaiID + '_arr')[3]);
    $('.sentai_status').find('.sentai_4_text').text(eval(sentaiID + '_arr')[4]);
    $('.sentai_status').find('.sentai_5_text').text(eval(sentaiID + '_arr')[5]);
}

function gisouStatus(){
    var gisouID  = $('input[name=gisou]:checked').attr('id');
    $('.gisou_status').find('.gisou_0_text').text(eval(gisouID + '_arr')[0]);
    $('.gisou_status').find('.gisou_1_text').text(eval(gisouID + '_arr')[1]);
    $('.gisou_status').find('.gisou_2_text').text(eval(gisouID + '_arr')[2]);
    $('.gisou_status').find('.gisou_3_text').text(eval(gisouID + '_arr')[3]);
    $('.gisou_status').find('.gisou_4_text').text(eval(gisouID + '_arr')[4]);
    $('.gisou_status').find('.gisou_5_text').text(eval(gisouID + '_arr')[5]);
}

function senshuStatus(){
    var senshuID = $('input[name=senshu]:checked').attr('id');
    $('.senshu_status').find('.senshu_0_text').text(eval(senshuID + '_arr')[0]);
    $('.senshu_status').find('.senshu_1_text').text(eval(senshuID + '_arr')[1]);
    $('.senshu_status').find('.senshu_2_text').text(eval(senshuID + '_arr')[2]);
    $('.senshu_status').find('.senshu_3_text').text(eval(senshuID + '_arr')[3]);
    $('.senshu_status').find('.senshu_4_text').text(eval(senshuID + '_arr')[4]);
    $('.senshu_status').find('.senshu_5_text').text(eval(senshuID + '_arr')[5]);
}

function senbiStatus(){
    var senbiID  = $('input[name=senbi]:checked').attr('id');
    $('.senbi_status').find('.senbi_0_text').text(eval(senbiID + '_arr')[0]);
    $('.senbi_status').find('.senbi_1_text').text(eval(senbiID + '_arr')[1]);
    $('.senbi_status').find('.senbi_2_text').text(eval(senbiID + '_arr')[2]);
    $('.senbi_status').find('.senbi_3_text').text(eval(senbiID + '_arr')[3]);
    $('.senbi_status').find('.senbi_4_text').text(eval(senbiID + '_arr')[4]);
    $('.senbi_status').find('.senbi_5_text').text(eval(senbiID + '_arr')[5]);
}

function totalStatus(){
    var sentaiID = $('input[name=sentai]:checked').attr('id');
    var gisouID  = $('input[name=gisou]:checked').attr('id');
    var senshuID = $('input[name=senshu]:checked').attr('id');
    var senbiID  = $('input[name=senbi]:checked').attr('id');
    var total_0 = eval(sentaiID + '_arr')[0] + eval(gisouID + '_arr')[0] + eval(senshuID + '_arr')[0] + eval(senbiID + '_arr')[0];
    var total_1 = eval(sentaiID + '_arr')[1] + eval(gisouID + '_arr')[1] + eval(senshuID + '_arr')[1] + eval(senbiID + '_arr')[1];
    var total_2 = eval(sentaiID + '_arr')[2] + eval(gisouID + '_arr')[2] + eval(senshuID + '_arr')[2] + eval(senbiID + '_arr')[2];
    var total_3 = eval(sentaiID + '_arr')[3] + eval(gisouID + '_arr')[3] + eval(senshuID + '_arr')[3] + eval(senbiID + '_arr')[3];
    var total_4 = eval(sentaiID + '_arr')[4] + eval(gisouID + '_arr')[4] + eval(senshuID + '_arr')[4] + eval(senbiID + '_arr')[4];
    var total_5 = eval(sentaiID + '_arr')[5] + eval(gisouID + '_arr')[5] + eval(senshuID + '_arr')[5] + eval(senbiID + '_arr')[5];
    var total_6 = eval(sentaiID + '_arr')[6] + eval(gisouID + '_arr')[6] + eval(senshuID + '_arr')[6] + eval(senbiID + '_arr')[6];
    $('.total_status').find('.total_0_text').text(total_0);
    $('.total_status').find('.total_1_text').text(total_1);
    $('.total_status').find('.total_2_text').text(total_2);
    $('.total_status').find('.total_3_text').text(total_3);
    $('.total_status').find('.total_4_text').text(total_4);
    $('.total_status').find('.total_5_text').text(total_5);
    if(total_0 > 61){
        $('.total_0_text').addClass('red');
    }else{
        $('.total_0_text').removeClass('red');
    }
    if(total_1 < 90){
        $('.total_1_text').addClass('red');
    }else{
        $('.total_1_text').removeClass('red');
    }
}

$(function(){

    var tableTarget = '#airship_boyager_item_list';
    var csvList_item;
    var insert = '';
    $.ajax({
        url: './csv/airship_boyager_item.csv',
        success: function(data) {

            // csvを配列に格納
            csvList_item = $.csv()(data);

            // 挿入するHTMLを作成
            for (var i = 1; i < csvList_item.length; i++) {
                insert += '<tr class="area' + csvList_item[i][0] + '">';
                insert += '<td rowspan="3">雲海<br><p>' + csvList_item[i][0] + '</p></td>';
                insert += '<td rowspan="3">優：探査性能<span class="pala_1_1">' + csvList_item[i][1] + '</span>以上<hr>';
                insert += '<span class="item_list close">' + csvList_item[i][4] + '</span><a class="click_mark">[+ click open]</a></td>';
                insert += '<td rowspan="3">良：探査性能<span class="pala_1_2">' + csvList_item[i][2] + '</span>以上<hr>';
                insert += '<span class="item_list close">' + csvList_item[i][5] + '</span><a class="click_mark">[+ click open]</a></td>';
                insert += '<td rowspan="3">可：探査性能<span class="pala_1_3">' + csvList_item[i][3] + '</span>以上<hr>';
                insert += '<span class="item_list close">' + csvList_item[i][6] + '</span><a class="click_mark">[+ click open]</a></td>';
                insert += '<td rowspan="3">グループ不明<hr>';
                insert += '<span class="item_list close">' + csvList_item[i][7] + '</span><a class="click_mark">[+ click open]</a></td>';
                insert += '<td rowspan="3">探査性能<br><span class="pala_2_1">' + csvList_item[i][8] + '</span>以上</td>';
                insert += '<td>大：収集性能<span class="pala_3_1">' + csvList_item[i][9] + '</span>以上</td>';
                insert += '<td rowspan="3">運<br><span class="pala_4_1">' + csvList_item[i][12] + '</span>以上</td>';
                insert += '</tr>';
                insert += '<tr class="area' + csvList_item[i][0] + '"><td>中：収集性能<span class="pala_3_2">' + csvList_item[i][10] + '</span>以上</td></tr>';
                insert += '<tr class="area' + csvList_item[i][0] + '"><td>小：収集性能<span class="pala_3_3">' + csvList_item[i][11] + '</span>以上</td></tr>';
            };
            $(tableTarget).append(insert);

        }
    });

    if( $('.item_list').hasClass('close') ) {
        $(this).append('[+]');
    }

    $(document).on('click', '#airship_boyager_item_list td',function(){
        if( $(this).parent('tr').find('td .item_list').hasClass('close') ){
            $(this).parent('tr').find('td .item_list').removeClass('close').addClass('open');
            $(this).parent('tr').find('td .click_mark').hide();
        }else{
            $(this).parent('tr').find('td .item_list').removeClass('open').addClass('close');
            $(this).parent('tr').find('td .click_mark').show();
        }
    });
    $(document).on('click', '.all_open',function(){
            $('.all_open').hide();
            $('.all_close').show();
            $('td .item_list').removeClass('close').addClass('open');
            $('td .click_mark').hide();
    });
    $(document).on('click', '.all_close',function(){
            $('.all_open').show();
            $('.all_close').hide();
            $('td .item_list').removeClass('open').addClass('close');
            $('td .click_mark').show();
    });

    sentaiStatus();
    gisouStatus();
    senshuStatus();
    senbiStatus();
    totalStatus();

    $('input').change(function(){
        sentaiStatus();
        gisouStatus();
        senshuStatus();
        senbiStatus();
        totalStatus();

        var para_tansa  = $('.total_1_text').text();
        var para_shushu = $('.total_2_text').text();
        var para_lucky  = $('.total_5_text').text();

        $('#airship_boyager_item_list span').removeClass('green');
        $('#airship_boyager_item_list span').removeClass('red');
        $('#airship_boyager_item_list td').removeClass('current');

        var area_count = $('#airship_boyager_item_list tr').length;
        for (var i = 1; i < area_count/3; i++) {
            if(i < 10){
                var area_no = '0'+i;
            }else{
                var area_no = i;
            };
            var pala_1_1 = $('.area'+ area_no ).find('.pala_1_1').text();
            var pala_1_2 = $('.area'+ area_no ).find('.pala_1_2').text();
            var pala_1_3 = $('.area'+ area_no ).find('.pala_1_3').text();
            var pala_2_1 = $('.area'+ area_no ).find('.pala_2_1').text();
            var pala_3_1 = $('.area'+ area_no ).find('.pala_3_1').text();
            var pala_3_2 = $('.area'+ area_no ).find('.pala_3_2').text();
            var pala_3_3 = $('.area'+ area_no ).find('.pala_3_3').text();
            var pala_4_1 = $('.area'+ area_no ).find('.pala_4_1').text();

console.log(para_shushu)
console.log(pala_3_1)

            if( para_tansa > pala_1_1 -1){
                $('.area'+ area_no ).find('.pala_1_1').addClass('green');
                $('.area'+ area_no ).find('.pala_1_1').parent('td').addClass('current');
            }else{
                $('.area'+ area_no ).find('.pala_1_1').addClass('red');
            }
            if( para_tansa > pala_1_2 -1){
                $('.area'+ area_no ).find('.pala_1_2').addClass('green');
                $('.area'+ area_no ).find('.pala_1_2').parent('td').addClass('current');
            }else{
                $('.area'+ area_no ).find('.pala_1_2').addClass('red');
            }
            if( para_tansa > pala_1_3 -1){
                $('.area'+ area_no ).find('.pala_1_3').addClass('green');
                $('.area'+ area_no ).find('.pala_1_3').parent('td').addClass('current');
            }else{
                $('.area'+ area_no ).find('.pala_1_3').addClass('red');
            }
            if( para_tansa > pala_2_1 -1){
                $('.area'+ area_no ).find('.pala_2_1').addClass('green');
                $('.area'+ area_no ).find('.pala_2_1').parent('td').addClass('current');
            }else{
                $('.area'+ area_no ).find('.pala_2_1').addClass('red');
            }
            if( para_shushu > pala_3_1 -1){
                $('.area'+ area_no ).find('.pala_3_1').addClass('green');
                $('.area'+ area_no ).find('.pala_3_1').parent('td').addClass('current');
            }else{
                $('.area'+ area_no ).find('.pala_3_1').addClass('red');
            }
            if( para_shushu > pala_3_2 -1){
                $('.area'+ area_no ).find('.pala_3_2').addClass('green');
                $('.area'+ area_no ).find('.pala_3_2').parent('td').addClass('current');
            }else{
                $('.area'+ area_no ).find('.pala_3_2').addClass('red');
            }
            if( para_shushu > pala_3_3 -1){
                $('.area'+ area_no ).find('.pala_3_3').addClass('green');
                $('.area'+ area_no ).find('.pala_3_3').parent('td').addClass('current');
            }else{
                $('.area'+ area_no ).find('.pala_3_3').addClass('red');
            }
            if( para_lucky > pala_4_1 -1){
                $('.area'+ area_no ).find('.pala_4_1').addClass('green');
                $('.area'+ area_no ).find('.pala_4_1').parent('td').addClass('current');
            }else{
                $('.area'+ area_no ).find('.pala_4_1').addClass('red');
            }

        }
    })

})