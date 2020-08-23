//描画コンテキストの取得
var stage = document.getElementById('result');
var context = stage.getContext('2d');

// frame
var imageFrameWhite = document.getElementById('frame_white');
var imageFrameBlack = document.getElementById('frame_black');

// filter
var imageFilterVignette    = document.getElementById('filter_vignette');
var imageFilterColorBlue   = document.getElementById('filter_color_blue');
var imageFilterColorYellow = document.getElementById('filter_color_yellow');

// ユーザー指定の画像を取り込む
function loadUserFiles() {
    var setFileInput = $('.imgInput');

    setFileInput.each(function(){
        var selfFile = $(this),
        selfInput = $(this).find('input[type=file]');

        selfInput.change(function(){
            var file    = $(this).prop('files')[0];
            var fileRdr = new FileReader();
            var selfImg  = selfFile.find('.imgView');
            var selfImg2 = selfFile.find('.sampleView');

            if(!this.files.length){
                if(0 < selfImg.size()){
                    selfImg.remove();
                    return;
                }
            } else {
                if(file.type.match('image.*')){
                    if(!(0 < selfImg.size())){
                        selfFile.append('<img alt="" class="imgView" id="imgView">');
                        selfFile.append('<img alt="" class="sampleView" id="sampleView">');
                    }
                    var prevElm = selfFile.find('.imgView');
                    var prevElm2 = selfFile.find('.sampleView');
                    fileRdr.onload = function() {
                        prevElm.attr('src', fileRdr.result);
                        prevElm2.attr('src', fileRdr.result);
                    }
                    fileRdr.readAsDataURL(file);
                } else {
                    if(0 < selfImg.size()){
                        selfImg.remove();
                        return;
                    }
                }
            }
        })
    })
}
// ユーザー指定の画像を取り込む
function loadUserFiles2() {
    var setFileInput = $('.imgInput2');

    setFileInput.each(function(){
        var selfFile = $(this),
        selfInput = $(this).find('input[type=file]');

        selfInput.change(function(){
            var file    = $(this).prop('files')[0];
            var fileRdr = new FileReader();
            var selfImg  = selfFile.find('.imgView');
            var selfImg2 = selfFile.find('.sampleView');

            if(!this.files.length){
                if(0 < selfImg.size()){
                    selfImg.remove();
                    return;
                }
            } else {
                if(file.type.match('image.*')){
                    if(!(0 < selfImg.size())){
                        selfFile.append('<img alt="" class="imgView" id="imgView2">');
                        selfFile.append('<img alt="" class="sampleView" id="sampleView2">');
                    }
                    var prevElm = selfFile.find('.imgView');
                    var prevElm2 = selfFile.find('.sampleView');
                    fileRdr.onload = function() {
                        prevElm.attr('src', fileRdr.result);
                        prevElm2.attr('src', fileRdr.result);
                    }
                    fileRdr.readAsDataURL(file);
                } else {
                    if(0 < selfImg.size()){
                        selfImg.remove();
                        return;
                    }
                }
            }
        })
    })
}

//取り込んだ画像を合成する
function putoutToPhoto_manual() {
    var stage = document.getElementById('result');
    var context = stage.getContext('2d');

    // user_icon
    var imageCard = document.getElementById('trim_icon_img');
    if ( imageCard ) {
        context.drawImage(imageCard, 15, 132, 100, 100);
    }

    // screenshot
    var imageCard2 = document.getElementById('trim_screenshot_img');
    if ( imageCard2 ) {
        context.drawImage(imageCard2, 0, 239, 768, 768);
    }
}

//取り込んだ画像を合成する
function putoutToPhoto_auto() {
    var stage = document.getElementById('result');
    var context = stage.getContext('2d');

    // user_icon
    var imageCard_ic = document.getElementById('imgView');
    if ( imageCard_ic ) {
        var imageCardWidth = $('#imgView').width();
        var imageCardHeight = $('#imgView').height();

        var imageWidthRate = 100 / imageCardWidth;
        var imageHeightRate = 100 / imageCardHeight;

        if ( imageWidthRate < imageHeightRate ) {
            //横長画像
            var cutLength = imageCardHeight;
            var cutPosition = (imageCardWidth - cutLength)/2;
            context.drawImage(imageCard_ic, cutPosition, 0, cutLength, imageCardHeight, 15, 132, 100, 100);
        }else{
            //縦長画像
            var cutLength = imageCardWidth;
            var cutPosition = (imageCardHeight - cutLength)/2;
            context.drawImage(imageCard_ic, 0, cutPosition, imageCardWidth, cutLength, 15, 132, 100, 100);
        }
    }

    // screenshot
    var imageCard_ss = document.getElementById('imgView2');
    if ( imageCard_ss ) {
        var imageCardWidth = $('#imgView2').width();
        var imageCardHeight = $('#imgView2').height();

        var imageWidthRate = 100 / imageCardWidth;
        var imageHeightRate = 100 / imageCardHeight;

        if ( imageWidthRate < imageHeightRate ) {
            //横長画像
            var cutLength = imageCardHeight;
            var cutPosition = (imageCardWidth - cutLength)/2;
            context.drawImage(imageCard_ss, cutPosition, 0, cutLength, imageCardHeight, 0, 239, 768, 768);
        }else{
            //縦長画像
            var cutLength = imageCardWidth;
            var cutPosition = (imageCardHeight - cutLength)/2;
            context.drawImage(imageCard_ss, 0, cutPosition, imageCardWidth, cutLength, 0, 239, 768, 768);
        }
    }
}

//生成ボタン押下
function putoutToCanvas() {

    //filter_color_blue
    if ( $('input[name="color_blue_filter"]:checked').attr('id') == 'chk05' ) {
        context.drawImage(imageFilterColorBlue, 0, 236);
    }

    //filter_color_yellow
    if ( $('input[name="color_yellow_filter"]:checked').attr('id') == 'chk07' ) {
        context.drawImage(imageFilterColorYellow, 0, 236);
    }

    //filter_vignette
    if ( $('input[name="vinetta_filter"]:checked').attr('id') == 'chk03' ) {
        context.drawImage(imageFilterVignette, 0, 236);
    }

    //frame
    if ( $('input[name="copyright_color"]:checked').attr('id') == 'chk01' ) {
        context.drawImage(imageFrameWhite, 0, 0);
    }else if ( $('input[name="copyright_color"]:checked').attr('id') == 'chk02' ) {
        context.drawImage(imageFrameBlack, 0, 0);
    }

    var fontFamily = $('#font_family option:selected').val();

    //ニックネーム
    var txt01 = $('#txt01').val();
    context.fillStyle = "#000000";
    context.font = '40px "'+fontFamily+'"';
    context.fillText(txt01, 130, 198);

    //撮影場所
    var txt02 = $('#txt02').val();
    context.fillStyle = "#bfb5ab";
    context.font = '30px "'+fontFamily+'"';
    context.fillText(txt02, 70, 1060);

    //本文
    var txt03 = $('#txt03').val();
    context.fillStyle = "#000";
    context.font = '30px "'+fontFamily+'"';
    context.fillText(txt03, 27, 1130);

    var txt03_2 = $('#txt03_2').val();
    context.fillStyle = "#000";
    context.font = '30px "'+fontFamily+'"';
    context.fillText(txt03_2, 27, 1180);

    var txt03_3 = $('#txt03_3').val();
    context.fillStyle = "#000";
    context.font = '30px "'+fontFamily+'"';
    context.fillText(txt03_3, 27, 1230);

    //ハッシュタグ
    var txt04 = $('#txt04').val();
    context.fillStyle = "#4975a7";
    context.font = '30px "'+fontFamily+'"';
    context.fillText(txt04, 27, 1282);

    var txt04_2 = $('#txt04_2').val();
    context.fillStyle = "#4975a7";
    context.font = '30px "'+fontFamily+'"';
    context.fillText(txt04_2, 27, 1332);
};

//canvasからimgを生成する
function createDownloadImage() {
    //ローカル環境だとエラーになるので注意
    var imgdata = stage.toDataURL('image/png');
    document.getElementById('download_item').src = imgdata;
}

$(function(){

    var trim_a =　new Lb_Trim({
        upload_id:"btn_icon"
        ,trim_id:"trim_icon_img"
        ,upload_area_message:"クリックしてファイルを選択 or ここに画像をドラッグ&ドロップ"
        ,onCutFinished:function(){
            var imgSrc = $('#trim_icon_img').attr('src');
            $('#trim_icon_img_sample').attr('src', imgSrc);
            $('#trim_icon_img_sample').removeClass('display_none');
        }
    });

    var trim_b =　new Lb_Trim({
        upload_id:"btn_screenshot"
        ,trim_id:"trim_screenshot_img"
        ,upload_area_message:"クリックしてファイルを選択 or ここに画像をドラッグ&ドロップ"
        ,onCutFinished:function(){
            var imgSrc = $('#trim_screenshot_img').attr('src');
            $('#trim_screenshot_img_sample').attr('src', imgSrc);
            $('#trim_screenshot_img_sample').removeClass('display_none');
        }
    });

    //ユーザーの画像をとりこみ、ページへの表示
    loadUserFiles();
    loadUserFiles2();

    //テスト用
    // $(window).on('load',function(){
    //     putoutToCanvas();
    // });

    $('.toggleview_1_btn').click(function(){
        $('.toggleview_1').slideToggle();
        $('.toggleview_1_btn').find('span').toggle();
    })
    $('#trim_icon_img_sample').click(function() {
        trim_a.openTrimWindow();
    });

    $('.toggleview_2_btn').click(function(){
        $('.toggleview_2').slideToggle();
        $('.toggleview_2_btn').find('span').toggle();
    })
    $('#trim_screenshot_img_sample').click(function() {
        trim_b.openTrimWindow();
    });

    $('.triming_switch_tab').find('li:first-child').click(function(){
        $('.triming_switch_tab').find('li').removeClass('current');
        $(this).addClass('current');
        $('.auto_triming').addClass('display_none');
        $('.manual_triming').removeClass('display_none');
    })

    $('.triming_switch_tab').find('li:last-child').click(function(){
        $('.triming_switch_tab').find('li').removeClass('current');
        $(this).addClass('current');
        $('.auto_triming').removeClass('display_none');
        $('.manual_triming').addClass('display_none');
    })

    //画像生成ボタンが押されたときにcanvas生成
    $('#update').on('click',function(){
        context.clearRect(0, 0, 430, 764)
        if ( $('.triming_switch_tab').find('li:first-child').hasClass('current') )  {
            putoutToPhoto_manual();
        }else{
            putoutToPhoto_auto();
        }
        putoutToCanvas();
        createDownloadImage();
        $('.dl_img').removeClass('display_none');
    });

    //エオスタグラムとは？開閉
    $('.whats_eostagram').click(function() {
        $('.whats_eostagram_wrapper').slideToggle();
    });

    //ツイートボタン
    $('.tweet_button').socialbutton('twitter', {
        button: 'horizontal',
        text: 'FF14 エオスタグラム イメージジェネレター #FF14 #エオスタグラム\n',
        url: 'http://ff14moo.moo.jp/eostagram_generator.html'
    });

});