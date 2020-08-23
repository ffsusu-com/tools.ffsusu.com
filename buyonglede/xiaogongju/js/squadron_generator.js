//描画コンテキストの取得
var stage = document.getElementById('result');
var context = stage.getContext('2d');

// base
var imageBase  = document.getElementById('baseImg');
var imageBase2 = document.getElementById('baseImg2');
var imageBase3 = document.getElementById('baseImg3');

// base-en
var e_imageBase  = document.getElementById('e_baseImg');
var e_imageBase2 = document.getElementById('e_baseImg2');
var e_imageBase3 = document.getElementById('e_baseImg3');

//job icon
var jobIcon001  = document.getElementById('jobIcon001');
var jobIcon002  = document.getElementById('jobIcon002');
var jobIcon003  = document.getElementById('jobIcon003');
var jobIcon004  = document.getElementById('jobIcon004');
var jobIcon005  = document.getElementById('jobIcon005');
var jobIcon006  = document.getElementById('jobIcon006');
var jobIcon007  = document.getElementById('jobIcon007');
var jobIcon008  = document.getElementById('jobIcon008');
var jobIcon009  = document.getElementById('jobIcon009');
var jobIcon010  = document.getElementById('jobIcon010');
var jobIcon011  = document.getElementById('jobIcon011');
var jobIcon012  = document.getElementById('jobIcon012');
var jobIcon013  = document.getElementById('jobIcon013');
var jobIcon014  = document.getElementById('jobIcon014');
var jobIcon015  = document.getElementById('jobIcon015');
var jobIcon016  = document.getElementById('jobIcon016');
var jobIcon017  = document.getElementById('jobIcon017');
var jobIcon018  = document.getElementById('jobIcon018');
var jobIcon019  = document.getElementById('jobIcon019');
var jobIcon020  = document.getElementById('jobIcon020');
var jobIcon021  = document.getElementById('jobIcon021');
var jobIcon022  = document.getElementById('jobIcon022');
var jobIcon023  = document.getElementById('jobIcon023');
var jobIcon024  = document.getElementById('jobIcon024');
var jobIcon025  = document.getElementById('jobIcon025');
var jobIcon026  = document.getElementById('jobIcon026');
var jobIcon027  = document.getElementById('jobIcon027');
var jobIcon028  = document.getElementById('jobIcon028');
var jobIcon029  = document.getElementById('jobIcon029');
var jobIcon030  = document.getElementById('jobIcon030');
var jobIcon031  = document.getElementById('jobIcon031');
var jobIcon032  = document.getElementById('jobIcon032');
var jobIcon033  = document.getElementById('jobIcon033');

//ユーザー指定の画像を取り込む
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

//取り込んだ画像を合成する
function putoutToPhoto() {
    var stage = document.getElementById('result');
    var context = stage.getContext('2d');
    // // card
    var imageCard = document.getElementById('imgView');
    if ( imageCard ) {
        var imageCardWidth = $('#imgView').width();
        var imageCardHeight = $('#imgView').height();

        var imageWidthRate = 120 / imageCardWidth;
        var imageHeightRate = 150 / imageCardHeight;

        if ( imageWidthRate < imageHeightRate ) {
            //横長画像
            var cutLength = imageCardHeight / 5 * 4;
            var cutPosition = (imageCardWidth - cutLength)/2;
            context.drawImage(imageCard, cutPosition, 0, cutLength, imageCardHeight, 31, 74, 120, 150);
        }else{
            //縦長画像
            var cutLength = imageCardWidth / 4 * 5;
            var cutPosition = (imageCardHeight - cutLength)/2;
            context.drawImage(imageCard, 0, cutPosition, imageCardWidth, cutLength, 31, 74, 120, 150);
        }
    }
}

//生成ボタン押下
function putoutToCanvas() {

    //base
    var gcNumber = $('#select03 option:selected').attr('class');
    if ( gcNumber == 1 ) {
        context.drawImage(imageBase, 0, 0);
    }else if ( gcNumber == 2 ) {
        context.drawImage(imageBase2, 0, 0);
    }else if ( gcNumber == 3 ) {
        context.drawImage(imageBase3, 0, 0);
    }else if ( gcNumber == 4 ) {
        context.drawImage(e_imageBase, 0, 0);
    }else if ( gcNumber == 5 ) {
        context.drawImage(e_imageBase2, 0, 0);
    }else if ( gcNumber == 6 ) {
        context.drawImage(e_imageBase3, 0, 0);
    }

    //job
    var jobNumber  = $('#select02 option:selected').attr('class');
    var jobNumber  = jobNumber.slice(-3);
    var jobIconImg = eval('jobIcon'+jobNumber);
    context.drawImage(jobIconImg, 156, 184);

    //ニックネーム
    var txt = $('#txt01').val();
    context.fillStyle = "#745642";
    context.textAlign = "left";
    context.font = 'bold 15px "メイリオ"';
    context.fillText(txt, 156, 93);

    //種族・性別
    var txt = $('#select01').val();
    context.fillStyle = "#745642";
    context.font = 'bold 15px "メイリオ"';
    context.fillText(txt, 156, 118);

    //出身地
    var txt = $('#txt02').val();
    context.fillStyle = "#745642";
    context.font = 'bold 15px "メイリオ"';
    context.fillText(txt, 156, 145);

    //クラス・ジョブ
    var txt = $('#select02').val();
    context.fillStyle = "#745642";
    context.font = 'bold 15px "メイリオ"';
    context.fillText(txt, 195, 194);

    //レベル
    var txt = $('#number01').val();
    context.fillStyle = "#745642";
    context.font = 'bold 15px "メイリオ"';
    context.fillText(txt, 195, 214);

    //身体パラ
    var txt = $('#number02').val();
    context.fillStyle = "#745642";
    context.font = 'bold 15px "メイリオ"';
    context.fillText(txt, 68, 247);

    //精神パラ
    var txt = $('#number03').val();
    context.fillStyle = "#745642";
    context.font = 'bold 15px "メイリオ"';
    context.fillText(txt, 186, 247);

    //戦術パラ
    var txt = $('#number04').val();
    context.fillStyle = "#745642";
    context.font = 'bold 15px "メイリオ"';
    context.fillText(txt, 303, 247);

    //ジンクス
    var txt = $('#txt03').val();
    context.fillStyle = "#745642";
    context.font = 'bold 15px "メイリオ"';
    context.fillText(txt, 77, 304);

    //ランダムジンクス
    var txt = $('#txt04').val();
    context.fillStyle = "#745642";
    context.font = 'bold 15px "メイリオ"';
    context.fillText(txt, 77, 356);

    //志願理由
    var txt = $('#txt05').val();
    context.fillStyle = "#745642";
    context.font = 'bold 13px "メイリオ"';
    context.fillText(txt, 44, 415);
    var txt = $('#txt05_2').val();
    context.fillStyle = "#745642";
    context.font = 'bold 13px "メイリオ"';
    context.fillText(txt, 44, 428);
    var txt = $('#txt05_3').val();
    context.fillStyle = "#745642";
    context.font = 'bold 13px "メイリオ"';
    context.fillText(txt, 44, 441);
    var txt = $('#txt05_4').val();
    context.fillStyle = "#745642";
    context.font = 'bold 13px "メイリオ"';
    context.fillText(txt, 44, 454);
    var txt = $('#txt05_5').val();
    context.fillStyle = "#745642";
    context.font = 'bold 13px "メイリオ"';
    context.fillText(txt, 44, 467);

    //copyright
    var txt = $('#txt99').val();
    context.fillStyle = "#745642";
    context.textAlign = "right";
    context.font = 'bold 10px "メイリオ"';
    context.fillText(txt, 412, 539);
}

//canvasからimgを生成する
function createDownloadImage() {
    //ローカル環境だとエラーになるので注意
    var imgdata = stage.toDataURL('image/png');
    document.getElementById('download_item').src = imgdata;
}

$(function(){

    //ユーザーの画像をとりこみ、ページへの表示
    loadUserFiles();

    //テスト用
    // $(window).on('load',function(){
    //     putoutToCanvas();
    // });

    //画像生成ボタンが押されたときにcanvas生成
    $('#update').on('click',function(){
        putoutToCanvas();
        putoutToPhoto();
        createDownloadImage();
        $('.dl_img').removeClass('display_none');
    });

    $('.tweet_button').socialbutton('twitter', {
        button: 'horizontal',
        text: 'FF14 志願書ジェネレーター #FF14 #今日から私も志願兵\n',
        url: 'http://ff14moo.moo.jp/squadron_generator.html'
    });

    $('.tweet_button_en').socialbutton('twitter', {
        button: 'horizontal',
        text: 'FF14 FF14 Enlistment papers Generator #FF14 #FFXIV\n',
        url: 'http://ff14moo.moo.jp/squadron_generator_en.html'
    });

});