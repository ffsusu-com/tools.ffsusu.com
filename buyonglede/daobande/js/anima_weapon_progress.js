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

    if(isset($.cookie("flag_s1_1_1"))){
        $('#step1_bar_1_1').next('input').val($.cookie("flag_s1_1_1"));
    }
    if(isset($.cookie("flag_s1_1_2"))){
        $('#step1_bar_1_2').next('input').val($.cookie("flag_s1_1_2"));
    }
    if(isset($.cookie("flag_s1_1_3"))){
        $('#step1_bar_1_3').next('input').val($.cookie("flag_s1_1_3"));
    }
    if(isset($.cookie("flag_s1_1"))){
        $('#step1_bar_1').next('input').val($.cookie("flag_s1_1"));
    }
    if(isset($.cookie("flag_s1_2_1"))){
        $('#step1_bar_2_1').next('input').val($.cookie("flag_s1_2_1"));
    }
    if(isset($.cookie("flag_s1_2_2"))){
        $('#step1_bar_2_2').next('input').val($.cookie("flag_s1_2_2"));
    }
    if(isset($.cookie("flag_s1_2_3"))){
        $('#step1_bar_2_3').next('input').val($.cookie("flag_s1_2_3"));
    }
    if(isset($.cookie("flag_s1_2"))){
        $('#step1_bar_2').next('input').val($.cookie("flag_s1_2"));
    }

    if($.cookie("flag_s2_1")){$('#step2_1').addClass('complete')};
    if($.cookie("flag_s2_2")){$('#step2_2').addClass('complete')};
    if($.cookie("flag_s2_3")){$('#step2_3').addClass('complete')};
    if($.cookie("flag_s2_4")){$('#step2_4').addClass('complete')};
    if($.cookie("flag_s2_5")){$('#step2_5').addClass('complete')};
    if($.cookie("flag_s2_6")){$('#step2_6').addClass('complete')};
    if($.cookie("flag_s2_7")){$('#step2_7').addClass('complete')};
    if($.cookie("flag_s2_8")){$('#step2_8').addClass('complete')};
    if($.cookie("flag_s2_9")){$('#step2_9').addClass('complete')};
    if($.cookie("flag_s2_10")){$('#step2_10').addClass('complete')};

    if(isset($.cookie("flag_1_1_1"))){
        $('#bar_1_1_1').next('input').val($.cookie("flag_1_1_1"));
    }
    if(isset($.cookie("flag_1_1_2"))){
        $('#bar_1_1_2').next('input').val($.cookie("flag_1_1_2"));
    }
    if(isset($.cookie("flag_1_1_3"))){
        $('#bar_1_1_3').next('input').val($.cookie("flag_1_1_3"));
    }
    if(isset($.cookie("flag_1_1"))){
        $('#bar_1_1').next('input').val($.cookie("flag_1_1"));
    }
    if(isset($.cookie("flag_1_2"))){
        $('#bar_1_2').next('input').val($.cookie("flag_1_2"));
    }
    if(isset($.cookie("flag_1"))){
        $('#bar_1').next('input').val($.cookie("flag_1"));
    }
    if(isset($.cookie("flag_2_1_1"))){
        $('#bar_2_1_1').next('input').val($.cookie("flag_2_1_1"));
    }
    if(isset($.cookie("flag_2_1_2"))){
        $('#bar_2_1_2').next('input').val($.cookie("flag_2_1_2"));
    }
    if(isset($.cookie("flag_2_1_3"))){
        $('#bar_2_1_3').next('input').val($.cookie("flag_2_1_3"));
    }
    if(isset($.cookie("flag_2_1"))){
        $('#bar_2_1').next('input').val($.cookie("flag_2_1"));
    }
    if(isset($.cookie("flag_2_2"))){
        $('#bar_2_2').next('input').val($.cookie("flag_2_2"));
    }
    if(isset($.cookie("flag_2"))){
        $('#bar_2').next('input').val($.cookie("flag_2"));
    }
    if(isset($.cookie("flag_3_1_1"))){
        $('#bar_3_1_1').next('input').val($.cookie("flag_3_1_1"));
    }
    if(isset($.cookie("flag_3_1_2"))){
        $('#bar_3_1_2').next('input').val($.cookie("flag_3_1_2"));
    }
    if(isset($.cookie("flag_3_1_3"))){
        $('#bar_3_1_3').next('input').val($.cookie("flag_3_1_3"));
    }
    if(isset($.cookie("flag_3_1"))){
        $('#bar_3_1').next('input').val($.cookie("flag_3_1"));
    }
    if(isset($.cookie("flag_3_2"))){
        $('#bar_3_2').next('input').val($.cookie("flag_3_2"));
    }
    if(isset($.cookie("flag_3"))){
        $('#bar_3').next('input').val($.cookie("flag_3"));
    }
    if(isset($.cookie("flag_4_1_1"))){
        $('#bar_4_1_1').next('input').val($.cookie("flag_4_1_1"));
    }
    if(isset($.cookie("flag_4_1_2"))){
        $('#bar_4_1_2').next('input').val($.cookie("flag_4_1_2"));
    }
    if(isset($.cookie("flag_4_1_3"))){
        $('#bar_4_1_3').next('input').val($.cookie("flag_4_1_3"));
    }
    if(isset($.cookie("flag_4_1"))){
        $('#bar_4_1').next('input').val($.cookie("flag_4_1"));
    }
    if(isset($.cookie("flag_4_2"))){
        $('#bar_4_2').next('input').val($.cookie("flag_4_2"));
    }
    if(isset($.cookie("flag_4"))){
        $('#bar_4').next('input').val($.cookie("flag_4"));
    }
    if(isset($.cookie("flag_5_1"))){
        $('#item_5_1').val($.cookie("flag_5_1"));
    }
    if(isset($.cookie("flag_5_2"))){
        $('#item_5_2').val($.cookie("flag_5_2"));
    }
    if(isset($.cookie("flag_5_3"))){
        $('#item_5_3').val($.cookie("flag_5_3"));
    }

    if(isset($.cookie("flag_s4_1"))){
        $('#step4_bar_1').next('input').val($.cookie("flag_s4_1"));
    }

    if(isset($.cookie("flag_s5_1_1"))){
        $('#step5_bar_1_1').next('input').val($.cookie("flag_s5_1_1"));
    }
    if(isset($.cookie("flag_s5_1_2"))){
        $('#step5_bar_1_2').next('input').val($.cookie("flag_s5_1_2"));
    }

    if(isset($.cookie("flag_s6_1"))){
        $('#step6_bar_1').next('input').val($.cookie("flag_s6_1"));
    }

    if($.cookie("flag_s7_1_1")){$('#step7_1').addClass('complete')};
    if($.cookie("flag_s7_1_2")){$('#step7_2').addClass('complete')};
    if($.cookie("flag_s7_1_3")){$('#step7_3').addClass('complete')};
    if(isset($.cookie("flag_s7_2_1"))){
        $('#step7_bar_1_1').next('input').val($.cookie("flag_s7_2_1"));
    }
    if(isset($.cookie("flag_s7_2"))){
        $('#step7_bar_1').next('input').val($.cookie("flag_s7_2"));
    }
    if($.cookie("flag_s7_3_1")){$('#kagayaki_001').addClass('on')};
    if($.cookie("flag_s7_3_2")){$('#kagayaki_002').addClass('on')};
    if($.cookie("flag_s7_3_3")){$('#kagayaki_003').addClass('on')};
    if($.cookie("flag_s7_3_4")){$('#kagayaki_004').addClass('on')};
    if($.cookie("flag_s7_3_5")){$('#kagayaki_005').addClass('on')};
    if($.cookie("flag_s7_3_6")){$('#kagayaki_006').addClass('on')};
    if($.cookie("flag_s7_3_7")){$('#kagayaki_007').addClass('on')};
    if($.cookie("flag_s7_3_8")){$('#kagayaki_008').addClass('on')};
    if($.cookie("flag_s7_3_9")){$('#kagayaki_009').addClass('on')};
    if($.cookie("flag_s7_3_10")){$('#kagayaki_010').addClass('on')};

    if($.cookie("flag_s8_1")){$('#step8_1').addClass('complete')};
    if($.cookie("flag_s8_2")){$('#step8_2').addClass('complete')};
    if($.cookie("flag_s8_3")){$('#step8_3').addClass('complete')};
    if($.cookie("flag_s8_4")){$('#step8_4').addClass('complete')};
    if($.cookie("flag_s8_5")){$('#step8_5').addClass('complete')};
    if($.cookie("flag_s8_6")){$('#step8_6').addClass('complete')};
    if($.cookie("flag_s8_7")){$('#step8_7').addClass('complete')};
    if($.cookie("flag_s8_8")){$('#step8_8').addClass('complete')};
    if($.cookie("flag_s8_9")){$('#step8_9').addClass('complete')};
    if($.cookie("flag_s8_10")){$('#step8_10').addClass('complete')};
    if($.cookie("flag_s8_11")){$('#step8_11').addClass('complete')};
    if($.cookie("flag_s8_12")){$('#step8_12').addClass('complete')};
    if(isset($.cookie("flag_s8_1"))){
        $('#step8_bar_1').next('input').val($.cookie("flag_s8_1"));
    }

    if( $.cookie("flag_tab_show") ){
        var flag_tab_show = $.cookie("flag_tab_show");
        if (flag_tab_show!='progress_tab3'){
            $('.tab_menu').children('a').removeClass('current');
            $('.tab_menu').children('.show_'+flag_tab_show).addClass('current');
        }
    }

    anima170_progress();
    anima200_progress();
    anima210_progress();
    anima230_progress();
    anima240_progress();
    anima260_progress();
    anima270_progress();
    anima275_progress();
    showCurrentTab();
    kgyk_memo();

    $('.commonBox4').click(function(){
        if (!$(this).hasClass('complete')) {
            $(this).addClass('complete');
        }else{
            $(this).removeClass('complete');
        };
        $.cookie("flag_s2_1",$('#step2_1').hasClass('complete'), { expires: 365 });
        $.cookie("flag_s2_2",$('#step2_2').hasClass('complete'), { expires: 365 });
        $.cookie("flag_s2_3",$('#step2_3').hasClass('complete'), { expires: 365 });
        $.cookie("flag_s2_4",$('#step2_4').hasClass('complete'), { expires: 365 });
        $.cookie("flag_s2_5",$('#step2_5').hasClass('complete'), { expires: 365 });
        $.cookie("flag_s2_6",$('#step2_6').hasClass('complete'), { expires: 365 });
        $.cookie("flag_s2_7",$('#step2_7').hasClass('complete'), { expires: 365 });
        $.cookie("flag_s2_8",$('#step2_8').hasClass('complete'), { expires: 365 });
        $.cookie("flag_s2_9",$('#step2_9').hasClass('complete'), { expires: 365 });
        $.cookie("flag_s2_10",$('#step2_10').hasClass('complete'), { expires: 365 });
        anima200_progress();
        $.cookie("flag_s7_1_1",$('#step7_1').hasClass('complete'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s7_1_2",$('#step7_2').hasClass('complete'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s7_1_3",$('#step7_3').hasClass('complete'), { expires: 365 , path: "/anima_weapon_progress.html" });
        anima270_progress();
        $.cookie("flag_s8_1",$('#step8_1').hasClass('complete'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s8_2",$('#step8_2').hasClass('complete'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s8_3",$('#step8_3').hasClass('complete'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s8_4",$('#step8_4').hasClass('complete'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s8_5",$('#step8_5').hasClass('complete'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s8_6",$('#step8_6').hasClass('complete'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s8_7",$('#step8_7').hasClass('complete'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s8_8",$('#step8_8').hasClass('complete'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s8_9",$('#step8_9').hasClass('complete'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s8_10",$('#step8_10').hasClass('complete'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s8_11",$('#step8_11').hasClass('complete'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s8_12",$('#step8_12').hasClass('complete'), { expires: 365 , path: "/anima_weapon_progress.html" });
        anima275_progress();
    })

    $('input').change(function(){
        hq_item_no_count();
    })

    $('input').change(function(){
        $.cookie("flag_s1_1_1",$('#step1_bar_1_1').next('input').val(), { expires: 365 });
        $.cookie("flag_s1_1_2",$('#step1_bar_1_2').next('input').val(), { expires: 365 });
        $.cookie("flag_s1_1_3",$('#step1_bar_1_3').next('input').val(), { expires: 365 });
        $.cookie("flag_s1_1",$('#step1_bar_1').next('input').val(), { expires: 365 });
        $.cookie("flag_s1_2_1",$('#step1_bar_2_1').next('input').val(), { expires: 365 });
        $.cookie("flag_s1_2_2",$('#step1_bar_2_2').next('input').val(), { expires: 365 });
        $.cookie("flag_s1_2_3",$('#step1_bar_2_3').next('input').val(), { expires: 365 });
        $.cookie("flag_s1_2",$('#step1_bar_2').next('input').val(), { expires: 365 });

        $.cookie("flag_1_1_1",$('#bar_1_1_1').next('input').val(), { expires: 365 });
        $.cookie("flag_1_1_2",$('#bar_1_1_2').next('input').val(), { expires: 365 });
        $.cookie("flag_1_1_3",$('#bar_1_1_3').next('input').val(), { expires: 365 });
        $.cookie("flag_1_1",$('#bar_1_1').next('input').val(), { expires: 365 });
        $.cookie("flag_1_2",$('#bar_1_2').next('input').val(), { expires: 365 });
        $.cookie("flag_1",$('#bar_1').next('input').val(), { expires: 365 });
        $.cookie("flag_2_1_1",$('#bar_2_1_1').next('input').val(), { expires: 365 });
        $.cookie("flag_2_1_2",$('#bar_2_1_2').next('input').val(), { expires: 365 });
        $.cookie("flag_2_1_3",$('#bar_2_1_3').next('input').val(), { expires: 365 });
        $.cookie("flag_2_1",$('#bar_2_1').next('input').val(), { expires: 365 });
        $.cookie("flag_2_2",$('#bar_2_2').next('input').val(), { expires: 365 });
        $.cookie("flag_2",$('#bar_2').next('input').val(), { expires: 365 });
        $.cookie("flag_3_1_1",$('#bar_3_1_1').next('input').val(), { expires: 365 });
        $.cookie("flag_3_1_2",$('#bar_3_1_2').next('input').val(), { expires: 365 });
        $.cookie("flag_3_1_3",$('#bar_3_1_3').next('input').val(), { expires: 365 });
        $.cookie("flag_3_1",$('#bar_3_1').next('input').val(), { expires: 365 });
        $.cookie("flag_3_2",$('#bar_3_2').next('input').val(), { expires: 365 });
        $.cookie("flag_3",$('#bar_3').next('input').val(), { expires: 365 });
        $.cookie("flag_4_1_1",$('#bar_4_1_1').next('input').val(), { expires: 365 });
        $.cookie("flag_4_1_2",$('#bar_4_1_2').next('input').val(), { expires: 365 });
        $.cookie("flag_4_1_3",$('#bar_4_1_3').next('input').val(), { expires: 365 });
        $.cookie("flag_4_1",$('#bar_4_1').next('input').val(), { expires: 365 });
        $.cookie("flag_4_2",$('#bar_4_2').next('input').val(), { expires: 365 });
        $.cookie("flag_4",$('#bar_4').next('input').val(), { expires: 365 });
        $.cookie("flag_5_1",$('#item_5_1').val(), { expires: 365 });
        $.cookie("flag_5_2",$('#item_5_2').val(), { expires: 365 });
        $.cookie("flag_5_3",$('#item_5_3').val(), { expires: 365 });

        $.cookie("flag_s4_1",$('#step4_bar_1').next('input').val(), { expires: 365 });

        $.cookie("flag_s5_1_1",$('#step5_bar_1_1').next('input').val(), { expires: 365 });
        $.cookie("flag_s5_1_2",$('#step5_bar_1_2').next('input').val(), { expires: 365 });

        $.cookie("flag_s6_1",$('#step6_bar_1').next('input').val(), { expires: 365 });

        $.cookie("flag_s7_2_1",$('#step7_bar_1_1').next('input').val(), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s7_2",$('#step7_bar_1').next('input').val(), { expires: 365 , path: "/anima_weapon_progress.html" });

        $.cookie("flag_s8_1",$('#step8_bar_1').next('input').val(), { expires: 365 , path: "/anima_weapon_progress.html" });

        anima170_progress();
        anima210_progress();
        anima230_progress();
        anima240_progress();
        anima260_progress();
        anima270_progress();
        anima275_progress();
    })

    $('.commonBox2').find('.kagayaki_thum').click(function(){
        var id = $(this).attr('id').slice(-3);
        if ( !$(this).hasClass('on') ) {
            for (var i = 0; i < id; i++) {
                $('.commonBox2').find('.kagayaki_thum').eq(i).addClass('on');
            }
        } else {
            $('.commonBox2').find('.kagayaki_thum').removeClass('on');
        }
        $.cookie("flag_s7_3_1",$('#kagayaki_001').hasClass('on'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s7_3_2",$('#kagayaki_002').hasClass('on'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s7_3_3",$('#kagayaki_003').hasClass('on'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s7_3_4",$('#kagayaki_004').hasClass('on'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s7_3_5",$('#kagayaki_005').hasClass('on'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s7_3_6",$('#kagayaki_006').hasClass('on'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s7_3_7",$('#kagayaki_007').hasClass('on'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s7_3_8",$('#kagayaki_008').hasClass('on'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s7_3_9",$('#kagayaki_009').hasClass('on'), { expires: 365 , path: "/anima_weapon_progress.html" });
        $.cookie("flag_s7_3_10",$('#kagayaki_010').hasClass('on'), { expires: 365 , path: "/anima_weapon_progress.html" });

        anima270_progress();
    })

    $('.tab_menu').children('a').click(function(){
        $('.tab_menu').children('a').removeClass('current');
        $(this).addClass('current');

        showCurrentTab()
    })

})

function showCurrentTab() {

    $('.progress_tab1').hide();
    $('.progress_tab2').hide();
    $('.progress_tab3').hide();
    $('.progress_tab4').hide();
    $('.progress_tab5').hide();
    $('.progress_tab6').hide();
    $('.progress_tab7').hide();
    $('.progress_tab8').hide();

    if( $('.show_progress_tab1').hasClass('current') ){
        $('.progress_tab1').show();
        $.cookie("flag_tab_show","progress_tab1", { expires: 365 });
    }
    if( $('.show_progress_tab2').hasClass('current') ){
        $('.progress_tab2').show();
        $.cookie("flag_tab_show","progress_tab2", { expires: 365 });
    }
    if( $('.show_progress_tab3').hasClass('current') ){
        $('.progress_tab3').show();
        $.cookie("flag_tab_show","progress_tab3", { expires: 365 });
    }
    if( $('.show_progress_tab4').hasClass('current') ){
        $('.progress_tab4').show();
        $.cookie("flag_tab_show","progress_tab4", { expires: 365 });
    }
    if( $('.show_progress_tab5').hasClass('current') ){
        $('.progress_tab5').show();
        $.cookie("flag_tab_show","progress_tab5", { expires: 365 });
    }
    if( $('.show_progress_tab6').hasClass('current') ){
        $('.progress_tab6').show();
        $.cookie("flag_tab_show","progress_tab6", { expires: 365 });
    }
    if( $('.show_progress_tab7').hasClass('current') ){
        $('.progress_tab7').show();
        $.cookie("flag_tab_show","progress_tab7", { expires: 365 });
    }
    if( $('.show_progress_tab8').hasClass('current') ){
        $('.progress_tab8').show();
        $.cookie("flag_tab_show","progress_tab8", { expires: 365 });
    }
}

function anima170_progress(){
    var step1_bar_1_1 = Math.floor($('#step1_bar_1_1').next('input').val()*100);
    var step1_bar_1_2 = Math.floor($('#step1_bar_1_2').next('input').val()*100);
    var step1_bar_1_3 = Math.floor($('#step1_bar_1_3').next('input').val()*100);
    $('#step1_bar_1_1').find('.progress_bar').css('width',step1_bar_1_1+'%');
    $('#step1_bar_1_1').find('.progress_txt').text(step1_bar_1_1+'%');
    $('#step1_bar_1_2').find('.progress_bar').css('width',step1_bar_1_2+'%');
    $('#step1_bar_1_2').find('.progress_txt').text(step1_bar_1_2+'%');
    $('#step1_bar_1_3').find('.progress_bar').css('width',step1_bar_1_3+'%');
    $('#step1_bar_1_3').find('.progress_txt').text(step1_bar_1_3+'%');
    var step1_bar_1_a = Math.floor((step1_bar_1_1 + step1_bar_1_2 + step1_bar_1_3)/3);
    var step1_bar_1_b = Math.floor($('#step1_bar_1').next('input').val()*100);
    var step1_bar_1 = step1_bar_1_a + step1_bar_1_b;
    if(step1_bar_1 > 100){var step1_bar_1 = 100;}
    $('#step1_bar_1').find('.progress_bar').css('width',step1_bar_1+'%');
    $('#step1_bar_1').find('.progress_txt').text(step1_bar_1+'%');

    var step1_bar_2_1 = Math.floor($('#step1_bar_2_1').next('input').val()*100);
    var step1_bar_2_2 = Math.floor($('#step1_bar_2_2').next('input').val()*100);
    var step1_bar_2_3 = Math.floor($('#step1_bar_2_3').next('input').val()*100);
    $('#step1_bar_2_1').find('.progress_bar').css('width',step1_bar_2_1+'%');
    $('#step1_bar_2_1').find('.progress_txt').text(step1_bar_2_1+'%');
    $('#step1_bar_2_2').find('.progress_bar').css('width',step1_bar_2_2+'%');
    $('#step1_bar_2_2').find('.progress_txt').text(step1_bar_2_2+'%');
    $('#step1_bar_2_3').find('.progress_bar').css('width',step1_bar_2_3+'%');
    $('#step1_bar_2_3').find('.progress_txt').text(step1_bar_2_3+'%');
    var step1_bar_2_a = Math.floor((step1_bar_2_1 + step1_bar_2_2 + step1_bar_2_3)/3);
    var step1_bar_2_b = Math.floor($('#step1_bar_2').next('input').val()*100);
    var step1_bar_2 = step1_bar_2_a + step1_bar_2_b;
    if(step1_bar_2 > 100){var step1_bar_2 = 100;}
    $('#step1_bar_2').find('.progress_bar').css('width',step1_bar_2+'%');
    $('#step1_bar_2').find('.progress_txt').text(step1_bar_2+'%');

    var step1_all_bar = Math.floor((step1_bar_1 + step1_bar_2)/2);
    $('#step1_all_bar').find('.progress_bar').css('width',step1_all_bar+'%');
    $('#step1_all_bar').find('.progress_txt').text(step1_all_bar+'%');

    $('.tweet_button1').socialbutton('twitter', {
        button: 'horizontal',
        text: 'アニマウェポン・第1段階-制作進捗【'+step1_all_bar+'%】\nむーむーのネタ帳 #FF14 #FFXIV\n',
        url: 'http://ff14moo.moo.jp/anima_weapon_progress.html'
    });
}

function anima200_progress(){
    var step2_id_progress = Math.floor($('.progress_tab2').find('.complete').length);
    $('#step2_all_bar').find('.progress_bar').css('width',step2_id_progress*10+'%');
    $('#step2_all_bar').find('.progress_txt').text(step2_id_progress*10+'%');

    $('.tweet_button2').socialbutton('twitter', {
        button: 'horizontal',
        text: 'アニマウェポン・第2段階-制作進捗【'+step2_id_progress*10+'%】\nむーむーのネタ帳 #FF14 #FFXIV\n',
        url: 'http://ff14moo.moo.jp/anima_weapon_progress.html'
    });
}

function hq_item_no_count(){
    if( !$('#hq_item_no_count:checked').val() ) {
        $('.hq_item').removeClass('disable');
    }else{
        $('.hq_item').addClass('disable');
    }
}

function anima210_progress(){
    var bar_1_1_1 = Math.floor($('#bar_1_1_1').next('input').val()/30*100);
    var bar_1_1_2 = Math.floor($('#bar_1_1_2').next('input').val()/30*100);
    if(bar_1_1_1 > 100){var bar_1_1_1 = 100;}
    if(bar_1_1_2 > 100){var bar_1_1_2 = 100;}
    $('#bar_1_1_1').find('.progress_bar').css('width',bar_1_1_1+'%');
    $('#bar_1_1_1').find('.progress_txt').text(bar_1_1_1+'%');
    $('#bar_1_1_2').find('.progress_bar').css('width',bar_1_1_2+'%');
    $('#bar_1_1_2').find('.progress_txt').text(bar_1_1_2+'%');
    var bar_1_1_a = Math.floor((bar_1_1_1 + bar_1_1_2));
    var bar_1_1_b = Math.floor($('#bar_1_1').next('input').val()*10);
    var bar_1_1 = bar_1_1_a + bar_1_1_b;
    var bar_1_2 = Math.floor($('#bar_1_2').next('input').val()*25);
    if(bar_1_1 > 100){var bar_1_1 = 100;}
    if(bar_1_2 > 100){var bar_1_2 = 100;}
    $('#bar_1_1').find('.progress_bar').css('width',bar_1_1+'%');
    $('#bar_1_1').find('.progress_txt').text(bar_1_1+'%');
    $('#bar_1_2').find('.progress_bar').css('width',bar_1_2+'%');
    $('#bar_1_2').find('.progress_txt').text(bar_1_2+'%');
    if( !$('#hq_item_no_count:checked').val() ) {
        var bar_1_a = Math.floor((bar_1_1 + bar_1_2)/2);
    }else{
        var bar_1_a = Math.floor(bar_1_1);
    }
    var bar_1_b = Math.floor($('#bar_1').next('input').val()*100);
    var bar_1 = bar_1_a + bar_1_b;
    if(bar_1 > 100){var bar_1 = 100;}
    $('#bar_1').find('.progress_bar').css('width',bar_1+'%');
    $('#bar_1').find('.progress_txt').text(bar_1+'%');

    var bar_2_1_1 = Math.floor($('#bar_2_1_1').next('input').val()/30*100);
    var bar_2_1_2 = Math.floor($('#bar_2_1_2').next('input').val()/30*100);
    if(bar_2_1_1 > 100){var bar_1_1_1 = 100;}
    if(bar_2_1_2 > 100){var bar_1_1_2 = 100;}
    $('#bar_2_1_1').find('.progress_bar').css('width',bar_2_1_1+'%');
    $('#bar_2_1_1').find('.progress_txt').text(bar_2_1_1+'%');
    $('#bar_2_1_2').find('.progress_bar').css('width',bar_2_1_2+'%');
    $('#bar_2_1_2').find('.progress_txt').text(bar_2_1_2+'%');
    var bar_2_1_a = Math.floor((bar_2_1_1 + bar_2_1_2));
    var bar_2_1_b = Math.floor($('#bar_2_1').next('input').val()*10);
    var bar_2_1 = bar_2_1_a + bar_2_1_b;
    var bar_2_2 = Math.floor($('#bar_2_2').next('input').val()*25);
    if(bar_2_1 > 100){var bar_2_1 = 100;}
    if(bar_2_2 > 100){var bar_2_2 = 100;}
    $('#bar_2_1').find('.progress_bar').css('width',bar_2_1+'%');
    $('#bar_2_1').find('.progress_txt').text(bar_2_1+'%');
    $('#bar_2_2').find('.progress_bar').css('width',bar_2_2+'%');
    $('#bar_2_2').find('.progress_txt').text(bar_2_2+'%');
    if( !$('#hq_item_no_count:checked').val() ) {
        var bar_2_a = Math.floor((bar_2_1 + bar_2_2)/2);
    }else{
        var bar_2_a = Math.floor(bar_2_1);
    }
    var bar_2_b = Math.floor($('#bar_2').next('input').val()*100);
    var bar_2 = bar_2_a + bar_2_b;
    if(bar_2 > 100){var bar_2 = 100;}
    $('#bar_2').find('.progress_bar').css('width',bar_2+'%');
    $('#bar_2').find('.progress_txt').text(bar_2+'%');

    var bar_3_1_1 = Math.floor($('#bar_3_1_1').next('input').val()/30*100);
    var bar_3_1_2 = Math.floor($('#bar_3_1_2').next('input').val()/30*100);
    if(bar_3_1_1 > 100){var bar_1_1_1 = 100;}
    if(bar_3_1_2 > 100){var bar_1_1_2 = 100;}
    $('#bar_3_1_1').find('.progress_bar').css('width',bar_3_1_1+'%');
    $('#bar_3_1_1').find('.progress_txt').text(bar_3_1_1+'%');
    $('#bar_3_1_2').find('.progress_bar').css('width',bar_3_1_2+'%');
    $('#bar_3_1_2').find('.progress_txt').text(bar_3_1_2+'%');
    var bar_3_1_a = Math.floor((bar_3_1_1 + bar_3_1_2));
    var bar_3_1_b = Math.floor($('#bar_3_1').next('input').val()*10);
    var bar_3_1 = bar_3_1_a + bar_3_1_b;
    var bar_3_2 = Math.floor($('#bar_3_2').next('input').val()*25);
    if(bar_3_1 > 100){var bar_3_1 = 100;}
    if(bar_3_2 > 100){var bar_3_2 = 100;}
    $('#bar_3_1').find('.progress_bar').css('width',bar_3_1+'%');
    $('#bar_3_1').find('.progress_txt').text(bar_3_1+'%');
    $('#bar_3_2').find('.progress_bar').css('width',bar_3_2+'%');
    $('#bar_3_2').find('.progress_txt').text(bar_3_2+'%');
    if( !$('#hq_item_no_count:checked').val() ) {
        var bar_3_a = Math.floor((bar_3_1 + bar_3_2)/2);
    }else{
        var bar_3_a = Math.floor(bar_3_1);
    }
    var bar_3_b = Math.floor($('#bar_3').next('input').val()*100);
    var bar_3 = bar_3_a + bar_3_b;
    if(bar_3 > 100){var bar_3 = 100;}
    $('#bar_3').find('.progress_bar').css('width',bar_3+'%');
    $('#bar_3').find('.progress_txt').text(bar_3+'%');

    var bar_4_1_1 = Math.floor($('#bar_4_1_1').next('input').val()/30*100);
    var bar_4_1_2 = Math.floor($('#bar_4_1_2').next('input').val()/30*100);
    if(bar_4_1_1 > 100){var bar_1_1_1 = 100;}
    if(bar_4_1_2 > 100){var bar_1_1_2 = 100;}
    $('#bar_4_1_1').find('.progress_bar').css('width',bar_4_1_1+'%');
    $('#bar_4_1_1').find('.progress_txt').text(bar_4_1_1+'%');
    $('#bar_4_1_2').find('.progress_bar').css('width',bar_4_1_2+'%');
    $('#bar_4_1_2').find('.progress_txt').text(bar_4_1_2+'%');
    var bar_4_1_a = Math.floor((bar_4_1_1 + bar_4_1_2));
    var bar_4_1_b = Math.floor($('#bar_4_1').next('input').val()*10);
    var bar_4_1 = bar_4_1_a + bar_4_1_b;
    var bar_4_2 = Math.floor($('#bar_4_2').next('input').val()*25);
    if(bar_4_1 > 100){var bar_4_1 = 100;}
    if(bar_4_2 > 100){var bar_4_2 = 100;}
    $('#bar_4_1').find('.progress_bar').css('width',bar_4_1+'%');
    $('#bar_4_1').find('.progress_txt').text(bar_4_1+'%');
    $('#bar_4_2').find('.progress_bar').css('width',bar_4_2+'%');
    $('#bar_4_2').find('.progress_txt').text(bar_4_2+'%');
    if( !$('#hq_item_no_count:checked').val() ) {
        var bar_4_a = Math.floor((bar_4_1 + bar_4_2)/2);
    }else{
        var bar_4_a = Math.floor(bar_4_1);
    }
    var bar_4_b = Math.floor($('#bar_4').next('input').val()*100);
    var bar_4 = bar_4_a + bar_4_b;
    if(bar_4 > 100){var bar_4 = 100;}
    $('#bar_4').find('.progress_bar').css('width',bar_4+'%');
    $('#bar_4').find('.progress_txt').text(bar_4+'%');

    var item_5_1 = Math.floor($('#item_5_1').val()/60*100);
    var item_5_2 = Math.floor($('#item_5_2').val()/60*100);
    var item_5_3 = Math.floor($('#item_5_3').val()/360*100);
    if(item_5_1 > 100){var item_5_1 = 100;}
    if(item_5_2 > 100){var item_5_2 = 100;}
    if(item_5_3 > 100){var item_5_3 = 100;}
    var item_5 = item_5_1 + item_5_2 + item_5_3;
    if( !$('#hq_item_no_count:checked').val() ) {
        var item_5 = Math.floor(item_5/2);
    }else{
        var item_5 = Math.floor(item_5);
    }

    var all_bar = Math.floor((bar_1 + bar_2 + bar_3 + bar_4 + item_5 )/4);
    $('#all_bar').find('.progress_bar').css('width',all_bar+'%');
    $('#all_bar').find('.progress_txt').text(all_bar+'%');

    if( !$('#hq_item_no_count:checked').val() ) {
        var hq_item_text = "※HQ素材含む";
    }else{
        var hq_item_text = "※HQ素材除く";
    }

    $('.tweet_button3').socialbutton('twitter', {
        button: 'horizontal',
        text: 'アニマウェポン・第3段階-制作進捗【'+all_bar+'%】'+hq_item_text+'\nむーむーのネタ帳 #FF14 #FFXIV\n',
        url: 'http://ff14moo.moo.jp/anima_weapon_progress.html'
    });

}

function anima230_progress(){
    var step4_bar_1 = Math.floor($('#step4_bar_1').next('input').val()*20);
    if(step4_bar_1 > 100){var step4_bar_1 = 100;}
    $('#step4_bar_1').find('.progress_bar').css('width',step4_bar_1+'%');
    $('#step4_bar_1').find('.progress_txt').text(step4_bar_1+'%');

   var step4_all_bar = Math.floor(step4_bar_1);
    if(step4_all_bar > 100){var step4_all_bar = 100;}
    $('#step4_all_bar').find('.progress_bar').css('width',step4_all_bar+'%');
    $('#step4_all_bar').find('.progress_txt').text(step4_all_bar+'%');

    $('.tweet_button4').socialbutton('twitter', {
        button: 'horizontal',
        text: 'アニマウェポン・第4段階-制作進捗【'+step4_all_bar+'%】\nむーむーのネタ帳 #FF14 #FFXIV\n',
        url: 'http://ff14moo.moo.jp/anima_weapon_progress.html'
    });
}

function anima240_progress(){
    var step5_bar_1_1 = Math.floor($('#step5_bar_1_1').next('input').val()*100/240);
    if(step5_bar_1_1 > 100){var step5_bar_1_1 = 100;}
    $('#step5_bar_1_1').find('.progress_bar').css('width',step5_bar_1_1+'%');
    $('#step5_bar_1_1').find('.progress_txt').text(step5_bar_1_1+'%');

    var step5_bar_1_2 = Math.floor($('#step5_bar_1_2').next('input').val()*100/240*3);
    if(step5_bar_1_2 > 100){var step5_bar_1_2 = 100;}
    $('#step5_bar_1_2').find('.progress_bar').css('width',step5_bar_1_2+'%');
    $('#step5_bar_1_2').find('.progress_txt').text(step5_bar_1_2+'%');

    var step5_bar_1 = step5_bar_1_1 + step5_bar_1_2;
    if(step5_bar_1 > 100){var step5_bar_1 = 100;}
    $('#step5_bar_1').find('.progress_bar').css('width',step5_bar_1+'%');
    $('#step5_bar_1').find('.progress_txt').text(step5_bar_1+'%');

    var step5_all_bar = step5_bar_1;
    if(step5_all_bar > 100){var step5_all_bar = 100;}
    $('#step5_all_bar').find('.progress_bar').css('width',step5_all_bar+'%');
    $('#step5_all_bar').find('.progress_txt').text(step5_all_bar+'%');

    $('.tweet_button5').socialbutton('twitter', {
        button: 'horizontal',
        text: 'アニマウェポン・第5段階-制作進捗【'+step5_all_bar+'%】\nむーむーのネタ帳 #FF14 #FFXIV\n',
        url: 'http://ff14moo.moo.jp/anima_weapon_progress.html'
    });
}

function anima260_progress(){
    var step6_bar_1 = Math.floor($('#step6_bar_1').next('input').val()*2);
    if(step6_bar_1 > 100){var step6_bar_1 = 100;}
    $('#step6_bar_1').find('.progress_bar').css('width',step6_bar_1+'%');
    $('#step6_bar_1').find('.progress_txt').text(step6_bar_1+'%');

   var step6_all_bar = Math.floor(step6_bar_1);
    if(step6_all_bar > 100){var step6_all_bar = 100;}
    $('#step6_all_bar').find('.progress_bar').css('width',step6_all_bar+'%');
    $('#step6_all_bar').find('.progress_txt').text(step6_all_bar+'%');

    $('.tweet_button6').socialbutton('twitter', {
        button: 'horizontal',
        text: 'アニマウェポン・第6段階-制作進捗【'+step6_all_bar+'%】\nむーむーのネタ帳 #FF14 #FFXIV\n',
        url: 'http://ff14moo.moo.jp/anima_weapon_progress.html'
    });
}

function anima270_progress(){
    var step7_id_progress = Math.floor($('.progress_tab7').find('.complete').length);
    var step7_id_per = step7_id_progress*5;

    var step7_bar_1_1 = Math.floor($('#step7_bar_1_1').next('input').val()/15*100);
    $('#step7_bar_1_1').find('.progress_bar').css('width',step7_bar_1_1+'%');
    $('#step7_bar_1_1').find('.progress_txt').text(step7_bar_1_1+'%');
    var step7_bar_1_a = step7_bar_1_1;
    var step7_bar_1_b = Math.floor($('#step7_bar_1').next('input').val()*100);
    var step7_bar_1 = step7_bar_1_a + step7_bar_1_b;
    if(step7_bar_1 > 100){var step7_bar_1 = 100;}
    $('#step7_bar_1').find('.progress_bar').css('width',step7_bar_1+'%');
    $('#step7_bar_1').find('.progress_txt').text(step7_bar_1+'%');
    var step_7_bar_1_per = step7_bar_1/100*15;

    var step7_kagayaki_progress = Math.floor($('.progress_tab7').find('.commonBox2').find('.on').length);
    var step7_bar_2 = Math.floor(step7_kagayaki_progress*10);
    $('#step7_bar_2').find('.progress_bar').css('width',step7_bar_2+'%');
    $('#step7_bar_2').find('.progress_txt').text(step7_bar_2+'%');
    var step7_kagayaki_per = step7_bar_2*7/10;

    var step7_all_bar = Math.floor(step7_id_per + step_7_bar_1_per + step7_kagayaki_per);
    $('#step7_all_bar').find('.progress_bar').css('width',step7_all_bar+'%');
    $('#step7_all_bar').find('.progress_txt').text(step7_all_bar+'%');

    $('.tweet_button7').socialbutton('twitter', {
        button: 'horizontal',
        text: 'アニマウェポン・第7段階-制作進捗【'+step7_all_bar+'%】\nむーむーのネタ帳 #FF14 #FFXIV\n',
        url: 'http://ff14moo.moo.jp/anima_weapon_progress.html'
    });
}

function kgyk_memo () {
    function kgyk_num_change () {
        var kgyk_num = Math.floor($('.kagayaki_memo').find('input').val()/100);
        $('.kagayaki_memo').find('.kagayaki_thum').removeClass('on');
        if ( kgyk_num >= 1 ) {
            for (var i = 0; i < kgyk_num; i++) {
                $('.kagayaki_memo').find('.kagayaki_thum').eq(i).addClass('on');
            }
        }
    }
    // 自動JSON化を有効に
    $.cookie.json = true;
    var isset = function(data){
        if(data === "" || data === null || data === undefined){
            return false;
        }else{
            return true;
        }
    };
    function kgyk_num_lode () {
        if(isset($.cookie("kgyk_memo"))){
            $('.kagayaki_memo').find('input').val($.cookie("kgyk_memo"));
        }
   }
    function kgyk_num_save () {
        $.cookie("kgyk_memo",$('.kagayaki_memo').find('input').val(), { expires: 365 , path: "/anima_weapon_progress.html" });
    }
    kgyk_num_lode();
    kgyk_num_change();

    $('.kagayaki_memo').find('input').change(function(){
        kgyk_num_change();
        kgyk_num_save();
    })
    $('.kagayaki_memo').find('.btn_S').click(function(){
        var kgyk_get_point = $(this).attr('id');
        var kgyk_now_point = $('.kagayaki_memo').find('input').val();
        var kgyk_point = Math.floor(kgyk_get_point) + Math.floor(kgyk_now_point);
        if ( kgyk_point > 1000 ) { var kgyk_point = 1000 };
        $('.kagayaki_memo').find('input').val(kgyk_point);
        kgyk_num_change();
        kgyk_num_save();
    })
}

function anima275_progress(){
    var step8_id_progress = Math.floor($('.progress_tab8').find('.complete').length);
    var step8_id_per = step8_id_progress*90/12;

    var step8_bar_1 = Math.floor($('#step8_bar_1').next('input').val()*100);
    $('#step8_bar_1').find('.progress_bar').css('width',step8_bar_1+'%');
    $('#step8_bar_1').find('.progress_txt').text(step8_bar_1+'%');
    var step8_bar_1_per = step8_bar_1/10;
console.log(step8_bar_1);
    var step8_all_bar = Math.floor(step8_id_per + step8_bar_1_per);
    $('#step8_all_bar').find('.progress_bar').css('width',step8_all_bar+'%');
    $('#step8_all_bar').find('.progress_txt').text(step8_all_bar+'%');

    $('.tweet_button8').socialbutton('twitter', {
        button: 'horizontal',
        text: 'アニマウェポン・最終段階-制作進捗【'+step8_all_bar+'%】\nむーむーのネタ帳 #FF14 #FFXIV\n',
        url: 'http://ff14moo.moo.jp/anima_weapon_progress.html'
    });
}