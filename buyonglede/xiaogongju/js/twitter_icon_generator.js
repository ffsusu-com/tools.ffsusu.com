function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            $('#imageCard').remove();
            return function(e) {
                // Render thumbnail.
                var span = document.createElement('span');
                span.innerHTML = ['<img class="thumb_img1" id="imageCard" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
                document.getElementById('list').insertBefore(span, null);
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// sample
var imageSample = document.getElementById('imageSample');
// frame
var imageFrame1 = document.getElementById('imageFrame1');
var imageFrame2 = document.getElementById('imageFrame2');
var imageFrame3 = document.getElementById('imageFrame3');
var imageFrame4 = document.getElementById('imageFrame4');
var imageFrame5 = document.getElementById('imageFrame5');
var imageFrame6 = document.getElementById('imageFrame6');
// star
var imageStar1 = document.getElementById('imageStar1');
var imageStar2 = document.getElementById('imageStar2');
var imageStar3 = document.getElementById('imageStar3');
var imageStar4 = document.getElementById('imageStar4');
var imageStar5 = document.getElementById('imageStar5');
// number_top
var imageNumT1 = document.getElementById('imageNumT1');
var imageNumT2 = document.getElementById('imageNumT2');
var imageNumT3 = document.getElementById('imageNumT3');
var imageNumT4 = document.getElementById('imageNumT4');
var imageNumT5 = document.getElementById('imageNumT5');
var imageNumT6 = document.getElementById('imageNumT6');
var imageNumT7 = document.getElementById('imageNumT7');
var imageNumT8 = document.getElementById('imageNumT8');
var imageNumT9 = document.getElementById('imageNumT9');
var imageNumTa = document.getElementById('imageNumTa');
// number_left
var imageNumL1 = document.getElementById('imageNumL1');
var imageNumL2 = document.getElementById('imageNumL2');
var imageNumL3 = document.getElementById('imageNumL3');
var imageNumL4 = document.getElementById('imageNumL4');
var imageNumL5 = document.getElementById('imageNumL5');
var imageNumL6 = document.getElementById('imageNumL6');
var imageNumL7 = document.getElementById('imageNumL7');
var imageNumL8 = document.getElementById('imageNumL8');
var imageNumL9 = document.getElementById('imageNumL9');
var imageNumLa = document.getElementById('imageNumLa');
// number_right
var imageNumR1 = document.getElementById('imageNumR1');
var imageNumR2 = document.getElementById('imageNumR2');
var imageNumR3 = document.getElementById('imageNumR3');
var imageNumR4 = document.getElementById('imageNumR4');
var imageNumR5 = document.getElementById('imageNumR5');
var imageNumR6 = document.getElementById('imageNumR6');
var imageNumR7 = document.getElementById('imageNumR7');
var imageNumR8 = document.getElementById('imageNumR8');
var imageNumR9 = document.getElementById('imageNumR9');
var imageNumRa = document.getElementById('imageNumRa');
// number_bottom
var imageNumB1 = document.getElementById('imageNumB1');
var imageNumB2 = document.getElementById('imageNumB2');
var imageNumB3 = document.getElementById('imageNumB3');
var imageNumB4 = document.getElementById('imageNumB4');
var imageNumB5 = document.getElementById('imageNumB5');
var imageNumB6 = document.getElementById('imageNumB6');
var imageNumB7 = document.getElementById('imageNumB7');
var imageNumB8 = document.getElementById('imageNumB8');
var imageNumB9 = document.getElementById('imageNumB9');
var imageNumBa = document.getElementById('imageNumBa');

// context.drawImage(imageSample, 0, 0);
// context.drawImage(imageFrame1, 0, 0);
// context.drawImage(imageStar1, 25, 0, 60, 60);
// context.drawImage(imageNumT1, 110, 175, 30, 30);
// context.drawImage(imageNumL1, 80, 188, 30, 30);
// context.drawImage(imageNumR1, 140, 188, 30, 30);
// context.drawImage(imageNumB1, 110, 200, 30, 30);

function putoutToCanvas() {
    // reset
    context.clearRect(0,0,250,250);
    // card
    var imageCard = document.getElementById('imageCard');
    var imageCardWidth = $('#imageCard').width();
    var imageCardHeight = $('#imageCard').height();
    if(imageCardWidth>imageCardHeight){
        //横長だったら
        var newIimageCardWidth = 250/imageCardHeight*imageCardWidth;
        context.drawImage(imageCard, 0, 0, newIimageCardWidth, 250);
    }else{
        //縦長だったら
        var newIimageCardHeight = 250/imageCardWidth*imageCardHeight;
        context.drawImage(imageCard, 0, 0, 250, newIimageCardHeight);
    }

    // frame
    if($('#frame_1').attr('checked')){
        context.drawImage(imageFrame1, 0, 0);
    }
    if($('#frame_2').attr('checked')){
        context.drawImage(imageFrame2, 0, 0);
    }
    if($('#frame_3').attr('checked')){
        context.drawImage(imageFrame3, 0, 0, 250, 250);
    }
    if($('#frame_4').attr('checked')){
        context.drawImage(imageFrame4, 0, 0, 250, 250);
    }
    if($('#frame_5').attr('checked')){
        context.drawImage(imageFrame5, 0, 0, 250, 250);
    }
    if($('#frame_6').attr('checked')){
        context.drawImage(imageFrame6, 0, 0, 250, 250);
    }
    // star
    if($('#star_1').attr('checked')){
        context.drawImage(imageStar1, 25, 0, 60, 60);
    }
    if($('#star_2').attr('checked')){
        context.drawImage(imageStar2, 25, 0, 60, 60);
    }
    if($('#star_3').attr('checked')){
        context.drawImage(imageStar3, 25, 0, 60, 60);
    }
    if($('#star_4').attr('checked')){
        context.drawImage(imageStar4, 25, 0, 60, 60);
    }
    if($('#star_5').attr('checked')){
        context.drawImage(imageStar5, 25, 0, 60, 60);
    }
    // number_top
    if($('#numT_1').attr('checked')){
        context.drawImage(imageNumT1, 110, 175, 30, 30);
    }
    if($('#numT_2').attr('checked')){
        context.drawImage(imageNumT2, 110, 175, 30, 30);
    }
    if($('#numT_3').attr('checked')){
        context.drawImage(imageNumT3, 110, 175, 30, 30);
    }
    if($('#numT_4').attr('checked')){
        context.drawImage(imageNumT4, 110, 175, 30, 30);
    }
    if($('#numT_5').attr('checked')){
        context.drawImage(imageNumT5, 110, 175, 30, 30);
    }
    if($('#numT_6').attr('checked')){
        context.drawImage(imageNumT6, 110, 175, 30, 30);
    }
    if($('#numT_7').attr('checked')){
        context.drawImage(imageNumT7, 110, 175, 30, 30);
    }
    if($('#numT_8').attr('checked')){
        context.drawImage(imageNumT8, 110, 175, 30, 30);
    }
    if($('#numT_9').attr('checked')){
        context.drawImage(imageNumT9, 110, 175, 30, 30);
    }
    if($('#numT_a').attr('checked')){
        context.drawImage(imageNumTa, 110, 175, 30, 30);
    }
    // number_left
    if($('#numL_1').attr('checked')){
        context.drawImage(imageNumL1, 80, 188, 30, 30);
    }
    if($('#numL_2').attr('checked')){
        context.drawImage(imageNumL2, 80, 188, 30, 30);
    }
    if($('#numL_3').attr('checked')){
        context.drawImage(imageNumL3, 80, 188, 30, 30);
    }
    if($('#numL_4').attr('checked')){
        context.drawImage(imageNumL4, 80, 188, 30, 30);
    }
    if($('#numL_5').attr('checked')){
        context.drawImage(imageNumL5, 80, 188, 30, 30);
    }
    if($('#numL_6').attr('checked')){
        context.drawImage(imageNumL6, 80, 188, 30, 30);
    }
    if($('#numL_7').attr('checked')){
        context.drawImage(imageNumL7, 80, 188, 30, 30);
    }
    if($('#numL_8').attr('checked')){
        context.drawImage(imageNumL8, 80, 188, 30, 30);
    }
    if($('#numL_9').attr('checked')){
        context.drawImage(imageNumL9, 80, 188, 30, 30);
    }
    if($('#numL_a').attr('checked')){
        context.drawImage(imageNumLa, 80, 188, 30, 30);
    }
    // number_right
    if($('#numR_1').attr('checked')){
        context.drawImage(imageNumR1, 140, 188, 30, 30);
    }
    if($('#numR_2').attr('checked')){
        context.drawImage(imageNumR2, 140, 188, 30, 30);
    }
    if($('#numR_3').attr('checked')){
        context.drawImage(imageNumR3, 140, 188, 30, 30);
    }
    if($('#numR_4').attr('checked')){
        context.drawImage(imageNumR4, 140, 188, 30, 30);
    }
    if($('#numR_5').attr('checked')){
        context.drawImage(imageNumR5, 140, 188, 30, 30);
    }
    if($('#numR_6').attr('checked')){
        context.drawImage(imageNumR6, 140, 188, 30, 30);
    }
    if($('#numR_7').attr('checked')){
        context.drawImage(imageNumR7, 140, 188, 30, 30);
    }
    if($('#numR_8').attr('checked')){
        context.drawImage(imageNumR8, 140, 188, 30, 30);
    }
    if($('#numR_9').attr('checked')){
        context.drawImage(imageNumR9, 140, 188, 30, 30);
    }
    if($('#numR_a').attr('checked')){
        context.drawImage(imageNumRa, 140, 188, 30, 30);
    }
    // number_bottom
    if($('#numB_1').attr('checked')){
        context.drawImage(imageNumB1, 110, 200, 30, 30);
    }
    if($('#numB_2').attr('checked')){
        context.drawImage(imageNumB2, 110, 200, 30, 30);
    }
    if($('#numB_3').attr('checked')){
        context.drawImage(imageNumB3, 110, 200, 30, 30);
    }
    if($('#numB_4').attr('checked')){
        context.drawImage(imageNumB4, 110, 200, 30, 30);
    }
    if($('#numB_5').attr('checked')){
        context.drawImage(imageNumB5, 110, 200, 30, 30);
    }
    if($('#numB_6').attr('checked')){
        context.drawImage(imageNumB6, 110, 200, 30, 30);
    }
    if($('#numB_7').attr('checked')){
        context.drawImage(imageNumB7, 110, 200, 30, 30);
    }
    if($('#numB_8').attr('checked')){
        context.drawImage(imageNumB8, 110, 200, 30, 30);
    }
    if($('#numB_9').attr('checked')){
        context.drawImage(imageNumB9, 110, 200, 30, 30);
    }
    if($('#numB_a').attr('checked')){
        context.drawImage(imageNumBa, 110, 200, 30, 30);
    }

    var imgdata = canvas.toDataURL('image/png');
    document.getElementById('download_img').src = imgdata;
    document.getElementById('download_url').href = imgdata;
}

$(function(){
    $('.star_1').click(function(){
        $('.star_1').removeClass('checked');
        $('.star_2').removeClass('checked');
        $('.star_3').removeClass('checked');
        $('.star_4').removeClass('checked');
        $('.star_5').removeClass('checked');
        $('.star_0').removeClass('checked');
        $('.star_1').addClass('checked');
        if($('#star_1').not('checked')){
            $('#star_1').attr('checked','checked');
        };
    })
    $('.star_2').click(function(){
        $('.star_1').removeClass('checked');
        $('.star_2').removeClass('checked');
        $('.star_3').removeClass('checked');
        $('.star_4').removeClass('checked');
        $('.star_5').removeClass('checked');
        $('.star_0').removeClass('checked');
        $('.star_2').addClass('checked');
        if($('#star_2').not('checked')){
            $('#star_2').attr('checked','checked');
        };
    })
    $('.star_3').click(function(){
        $('.star_1').removeClass('checked');
        $('.star_2').removeClass('checked');
        $('.star_3').removeClass('checked');
        $('.star_4').removeClass('checked');
        $('.star_5').removeClass('checked');
        $('.star_0').removeClass('checked');
        $('.star_3').addClass('checked');
        if($('#star_3').not('checked')){
            $('#star_3').attr('checked','checked');
        };
    })
    $('.star_4').click(function(){
        $('.star_1').removeClass('checked');
        $('.star_2').removeClass('checked');
        $('.star_3').removeClass('checked');
        $('.star_4').removeClass('checked');
        $('.star_5').removeClass('checked');
        $('.star_0').removeClass('checked');
        $('.star_4').addClass('checked');
        if($('#star_4').not('checked')){
            $('#star_4').attr('checked','checked');
        };
    })
    $('.star_5').click(function(){
        $('.star_1').removeClass('checked');
        $('.star_2').removeClass('checked');
        $('.star_3').removeClass('checked');
        $('.star_4').removeClass('checked');
        $('.star_5').removeClass('checked');
        $('.star_0').removeClass('checked');
        $('.star_5').addClass('checked');
        if($('#star_5').not('checked')){
            $('#star_5').attr('checked','checked');
        };
    })
    $('.star_0').click(function(){
        $('.star_1').removeClass('checked');
        $('.star_2').removeClass('checked');
        $('.star_3').removeClass('checked');
        $('.star_4').removeClass('checked');
        $('.star_5').removeClass('checked');
        $('.star_0').removeClass('checked');
        $('.star_0').addClass('checked');
        if($('#star_0').not('checked')){
            $('#star_0').attr('checked','checked');
        };
    })

    $('.numT_1').click(function(){
        $('.numT_1').removeClass('checked');
        $('.numT_2').removeClass('checked');
        $('.numT_3').removeClass('checked');
        $('.numT_4').removeClass('checked');
        $('.numT_5').removeClass('checked');
        $('.numT_6').removeClass('checked');
        $('.numT_7').removeClass('checked');
        $('.numT_8').removeClass('checked');
        $('.numT_9').removeClass('checked');
        $('.numT_a').removeClass('checked');
        $('.numT_0').removeClass('checked');
        $('.numT_1').addClass('checked');
        if($('#numT_1').not('checked')){
            $('#numT_1').attr('checked','checked');
        };
    })
    $('.numT_2').click(function(){
        $('.numT_1').removeClass('checked');
        $('.numT_2').removeClass('checked');
        $('.numT_3').removeClass('checked');
        $('.numT_4').removeClass('checked');
        $('.numT_5').removeClass('checked');
        $('.numT_6').removeClass('checked');
        $('.numT_7').removeClass('checked');
        $('.numT_8').removeClass('checked');
        $('.numT_9').removeClass('checked');
        $('.numT_a').removeClass('checked');
        $('.numT_0').removeClass('checked');
        $('.numT_2').addClass('checked');
        if($('#numT_2').not('checked')){
            $('#numT_2').attr('checked','checked');
        };
    })
    $('.numT_3').click(function(){
        $('.numT_1').removeClass('checked');
        $('.numT_2').removeClass('checked');
        $('.numT_3').removeClass('checked');
        $('.numT_4').removeClass('checked');
        $('.numT_5').removeClass('checked');
        $('.numT_6').removeClass('checked');
        $('.numT_7').removeClass('checked');
        $('.numT_8').removeClass('checked');
        $('.numT_9').removeClass('checked');
        $('.numT_a').removeClass('checked');
        $('.numT_0').removeClass('checked');
        $('.numT_3').addClass('checked');
        if($('#numT_3').not('checked')){
            $('#numT_3').attr('checked','checked');
        };
    })
    $('.numT_4').click(function(){
        $('.numT_1').removeClass('checked');
        $('.numT_2').removeClass('checked');
        $('.numT_3').removeClass('checked');
        $('.numT_4').removeClass('checked');
        $('.numT_5').removeClass('checked');
        $('.numT_6').removeClass('checked');
        $('.numT_7').removeClass('checked');
        $('.numT_8').removeClass('checked');
        $('.numT_9').removeClass('checked');
        $('.numT_a').removeClass('checked');
        $('.numT_0').removeClass('checked');
        $('.numT_4').addClass('checked');
        if($('#numT_4').not('checked')){
            $('#numT_4').attr('checked','checked');
        };
    })
    $('.numT_5').click(function(){
        $('.numT_1').removeClass('checked');
        $('.numT_2').removeClass('checked');
        $('.numT_3').removeClass('checked');
        $('.numT_4').removeClass('checked');
        $('.numT_5').removeClass('checked');
        $('.numT_6').removeClass('checked');
        $('.numT_7').removeClass('checked');
        $('.numT_8').removeClass('checked');
        $('.numT_9').removeClass('checked');
        $('.numT_a').removeClass('checked');
        $('.numT_0').removeClass('checked');
        $('.numT_5').addClass('checked');
        if($('#numT_5').not('checked')){
            $('#numT_5').attr('checked','checked');
        };
    })
    $('.numT_6').click(function(){
        $('.numT_1').removeClass('checked');
        $('.numT_2').removeClass('checked');
        $('.numT_3').removeClass('checked');
        $('.numT_4').removeClass('checked');
        $('.numT_5').removeClass('checked');
        $('.numT_6').removeClass('checked');
        $('.numT_7').removeClass('checked');
        $('.numT_8').removeClass('checked');
        $('.numT_9').removeClass('checked');
        $('.numT_a').removeClass('checked');
        $('.numT_0').removeClass('checked');
        $('.numT_6').addClass('checked');
        if($('#numT_6').not('checked')){
            $('#numT_6').attr('checked','checked');
        };
    })
    $('.numT_7').click(function(){
        $('.numT_1').removeClass('checked');
        $('.numT_2').removeClass('checked');
        $('.numT_3').removeClass('checked');
        $('.numT_4').removeClass('checked');
        $('.numT_5').removeClass('checked');
        $('.numT_6').removeClass('checked');
        $('.numT_7').removeClass('checked');
        $('.numT_8').removeClass('checked');
        $('.numT_9').removeClass('checked');
        $('.numT_a').removeClass('checked');
        $('.numT_0').removeClass('checked');
        $('.numT_7').addClass('checked');
        if($('#numT_7').not('checked')){
            $('#numT_7').attr('checked','checked');
        };
    })
    $('.numT_8').click(function(){
        $('.numT_1').removeClass('checked');
        $('.numT_2').removeClass('checked');
        $('.numT_3').removeClass('checked');
        $('.numT_4').removeClass('checked');
        $('.numT_5').removeClass('checked');
        $('.numT_6').removeClass('checked');
        $('.numT_7').removeClass('checked');
        $('.numT_8').removeClass('checked');
        $('.numT_9').removeClass('checked');
        $('.numT_a').removeClass('checked');
        $('.numT_0').removeClass('checked');
        $('.numT_8').addClass('checked');
        if($('#numT_8').not('checked')){
            $('#numT_8').attr('checked','checked');
        };
    })
    $('.numT_9').click(function(){
        $('.numT_1').removeClass('checked');
        $('.numT_2').removeClass('checked');
        $('.numT_3').removeClass('checked');
        $('.numT_4').removeClass('checked');
        $('.numT_5').removeClass('checked');
        $('.numT_6').removeClass('checked');
        $('.numT_7').removeClass('checked');
        $('.numT_8').removeClass('checked');
        $('.numT_9').removeClass('checked');
        $('.numT_a').removeClass('checked');
        $('.numT_0').removeClass('checked');
        $('.numT_9').addClass('checked');
        if($('#numT_9').not('checked')){
            $('#numT_9').attr('checked','checked');
        };
    })
    $('.numT_a').click(function(){
        $('.numT_1').removeClass('checked');
        $('.numT_2').removeClass('checked');
        $('.numT_3').removeClass('checked');
        $('.numT_4').removeClass('checked');
        $('.numT_5').removeClass('checked');
        $('.numT_6').removeClass('checked');
        $('.numT_7').removeClass('checked');
        $('.numT_8').removeClass('checked');
        $('.numT_9').removeClass('checked');
        $('.numT_a').removeClass('checked');
        $('.numT_0').removeClass('checked');
        $('.numT_a').addClass('checked');
        if($('#numT_a').not('checked')){
            $('#numT_a').attr('checked','checked');
        };
    })
    $('.numT_0').click(function(){
        $('.numT_1').removeClass('checked');
        $('.numT_2').removeClass('checked');
        $('.numT_3').removeClass('checked');
        $('.numT_4').removeClass('checked');
        $('.numT_5').removeClass('checked');
        $('.numT_6').removeClass('checked');
        $('.numT_7').removeClass('checked');
        $('.numT_8').removeClass('checked');
        $('.numT_9').removeClass('checked');
        $('.numT_a').removeClass('checked');
        $('.numT_0').removeClass('checked');
        $('.numT_0').addClass('checked');
        if($('#numT_0').not('checked')){
            $('#numT_0').attr('checked','checked');
        };
    })

    $('.numL_1').click(function(){
        $('.numL_1').removeClass('checked');
        $('.numL_2').removeClass('checked');
        $('.numL_3').removeClass('checked');
        $('.numL_4').removeClass('checked');
        $('.numL_5').removeClass('checked');
        $('.numL_6').removeClass('checked');
        $('.numL_7').removeClass('checked');
        $('.numL_8').removeClass('checked');
        $('.numL_9').removeClass('checked');
        $('.numL_a').removeClass('checked');
        $('.numL_0').removeClass('checked');
        $('.numL_1').addClass('checked');
        if($('#numL_1').not('checked')){
            $('#numL_1').attr('checked','checked');
        };
    })
    $('.numL_2').click(function(){
        $('.numL_1').removeClass('checked');
        $('.numL_2').removeClass('checked');
        $('.numL_3').removeClass('checked');
        $('.numL_4').removeClass('checked');
        $('.numL_5').removeClass('checked');
        $('.numL_6').removeClass('checked');
        $('.numL_7').removeClass('checked');
        $('.numL_8').removeClass('checked');
        $('.numL_9').removeClass('checked');
        $('.numL_a').removeClass('checked');
        $('.numL_0').removeClass('checked');
        $('.numL_2').addClass('checked');
        if($('#numL_2').not('checked')){
            $('#numL_2').attr('checked','checked');
        };
    })
    $('.numL_3').click(function(){
        $('.numL_1').removeClass('checked');
        $('.numL_2').removeClass('checked');
        $('.numL_3').removeClass('checked');
        $('.numL_4').removeClass('checked');
        $('.numL_5').removeClass('checked');
        $('.numL_6').removeClass('checked');
        $('.numL_7').removeClass('checked');
        $('.numL_8').removeClass('checked');
        $('.numL_9').removeClass('checked');
        $('.numL_a').removeClass('checked');
        $('.numL_0').removeClass('checked');
        $('.numL_3').addClass('checked');
        if($('#numL_3').not('checked')){
            $('#numL_3').attr('checked','checked');
        };
    })
    $('.numL_4').click(function(){
        $('.numL_1').removeClass('checked');
        $('.numL_2').removeClass('checked');
        $('.numL_3').removeClass('checked');
        $('.numL_4').removeClass('checked');
        $('.numL_5').removeClass('checked');
        $('.numL_6').removeClass('checked');
        $('.numL_7').removeClass('checked');
        $('.numL_8').removeClass('checked');
        $('.numL_9').removeClass('checked');
        $('.numL_a').removeClass('checked');
        $('.numL_0').removeClass('checked');
        $('.numL_4').addClass('checked');
        if($('#numL_4').not('checked')){
            $('#numL_4').attr('checked','checked');
        };
    })
    $('.numL_5').click(function(){
        $('.numL_1').removeClass('checked');
        $('.numL_2').removeClass('checked');
        $('.numL_3').removeClass('checked');
        $('.numL_4').removeClass('checked');
        $('.numL_5').removeClass('checked');
        $('.numL_6').removeClass('checked');
        $('.numL_7').removeClass('checked');
        $('.numL_8').removeClass('checked');
        $('.numL_9').removeClass('checked');
        $('.numL_a').removeClass('checked');
        $('.numL_0').removeClass('checked');
        $('.numL_5').addClass('checked');
        if($('#numL_5').not('checked')){
            $('#numL_5').attr('checked','checked');
        };
    })
    $('.numL_6').click(function(){
        $('.numL_1').removeClass('checked');
        $('.numL_2').removeClass('checked');
        $('.numL_3').removeClass('checked');
        $('.numL_4').removeClass('checked');
        $('.numL_5').removeClass('checked');
        $('.numL_6').removeClass('checked');
        $('.numL_7').removeClass('checked');
        $('.numL_8').removeClass('checked');
        $('.numL_9').removeClass('checked');
        $('.numL_a').removeClass('checked');
        $('.numL_0').removeClass('checked');
        $('.numL_6').addClass('checked');
        if($('#numL_6').not('checked')){
            $('#numL_6').attr('checked','checked');
        };
    })
    $('.numL_7').click(function(){
        $('.numL_1').removeClass('checked');
        $('.numL_2').removeClass('checked');
        $('.numL_3').removeClass('checked');
        $('.numL_4').removeClass('checked');
        $('.numL_5').removeClass('checked');
        $('.numL_6').removeClass('checked');
        $('.numL_7').removeClass('checked');
        $('.numL_8').removeClass('checked');
        $('.numL_9').removeClass('checked');
        $('.numL_a').removeClass('checked');
        $('.numL_0').removeClass('checked');
        $('.numL_7').addClass('checked');
        if($('#numL_7').not('checked')){
            $('#numL_7').attr('checked','checked');
        };
    })
    $('.numL_8').click(function(){
        $('.numL_1').removeClass('checked');
        $('.numL_2').removeClass('checked');
        $('.numL_3').removeClass('checked');
        $('.numL_4').removeClass('checked');
        $('.numL_5').removeClass('checked');
        $('.numL_6').removeClass('checked');
        $('.numL_7').removeClass('checked');
        $('.numL_8').removeClass('checked');
        $('.numL_9').removeClass('checked');
        $('.numL_a').removeClass('checked');
        $('.numL_0').removeClass('checked');
        $('.numL_8').addClass('checked');
        if($('#numL_8').not('checked')){
            $('#numL_8').attr('checked','checked');
        };
    })
    $('.numL_9').click(function(){
        $('.numL_1').removeClass('checked');
        $('.numL_2').removeClass('checked');
        $('.numL_3').removeClass('checked');
        $('.numL_4').removeClass('checked');
        $('.numL_5').removeClass('checked');
        $('.numL_6').removeClass('checked');
        $('.numL_7').removeClass('checked');
        $('.numL_8').removeClass('checked');
        $('.numL_9').removeClass('checked');
        $('.numL_a').removeClass('checked');
        $('.numL_0').removeClass('checked');
        $('.numL_9').addClass('checked');
        if($('#numL_9').not('checked')){
            $('#numL_9').attr('checked','checked');
        };
    })
    $('.numL_a').click(function(){
        $('.numL_1').removeClass('checked');
        $('.numL_2').removeClass('checked');
        $('.numL_3').removeClass('checked');
        $('.numL_4').removeClass('checked');
        $('.numL_5').removeClass('checked');
        $('.numL_6').removeClass('checked');
        $('.numL_7').removeClass('checked');
        $('.numL_8').removeClass('checked');
        $('.numL_9').removeClass('checked');
        $('.numL_a').removeClass('checked');
        $('.numL_0').removeClass('checked');
        $('.numL_a').addClass('checked');
        if($('#numL_a').not('checked')){
            $('#numL_a').attr('checked','checked');
        };
    })
    $('.numL_0').click(function(){
        $('.numL_1').removeClass('checked');
        $('.numL_2').removeClass('checked');
        $('.numL_3').removeClass('checked');
        $('.numL_4').removeClass('checked');
        $('.numL_5').removeClass('checked');
        $('.numL_6').removeClass('checked');
        $('.numL_7').removeClass('checked');
        $('.numL_8').removeClass('checked');
        $('.numL_9').removeClass('checked');
        $('.numL_a').removeClass('checked');
        $('.numL_0').removeClass('checked');
        $('.numL_0').addClass('checked');
        if($('#numL_0').not('checked')){
            $('#numL_0').attr('checked','checked');
        };
    })

    $('.numR_1').click(function(){
        $('.numR_1').removeClass('checked');
        $('.numR_2').removeClass('checked');
        $('.numR_3').removeClass('checked');
        $('.numR_4').removeClass('checked');
        $('.numR_5').removeClass('checked');
        $('.numR_6').removeClass('checked');
        $('.numR_7').removeClass('checked');
        $('.numR_8').removeClass('checked');
        $('.numR_9').removeClass('checked');
        $('.numR_a').removeClass('checked');
        $('.numR_0').removeClass('checked');
        $('.numR_1').addClass('checked');
        if($('#numR_1').not('checked')){
            $('#numR_1').attr('checked','checked');
        };
    })
    $('.numR_2').click(function(){
        $('.numR_1').removeClass('checked');
        $('.numR_2').removeClass('checked');
        $('.numR_3').removeClass('checked');
        $('.numR_4').removeClass('checked');
        $('.numR_5').removeClass('checked');
        $('.numR_6').removeClass('checked');
        $('.numR_7').removeClass('checked');
        $('.numR_8').removeClass('checked');
        $('.numR_9').removeClass('checked');
        $('.numR_a').removeClass('checked');
        $('.numR_0').removeClass('checked');
        $('.numR_2').addClass('checked');
        if($('#numR_2').not('checked')){
            $('#numR_2').attr('checked','checked');
        };
    })
    $('.numR_3').click(function(){
        $('.numR_1').removeClass('checked');
        $('.numR_2').removeClass('checked');
        $('.numR_3').removeClass('checked');
        $('.numR_4').removeClass('checked');
        $('.numR_5').removeClass('checked');
        $('.numR_6').removeClass('checked');
        $('.numR_7').removeClass('checked');
        $('.numR_8').removeClass('checked');
        $('.numR_9').removeClass('checked');
        $('.numR_a').removeClass('checked');
        $('.numR_0').removeClass('checked');
        $('.numR_3').addClass('checked');
        if($('#numR_3').not('checked')){
            $('#numR_3').attr('checked','checked');
        };
    })
    $('.numR_4').click(function(){
        $('.numR_1').removeClass('checked');
        $('.numR_2').removeClass('checked');
        $('.numR_3').removeClass('checked');
        $('.numR_4').removeClass('checked');
        $('.numR_5').removeClass('checked');
        $('.numR_6').removeClass('checked');
        $('.numR_7').removeClass('checked');
        $('.numR_8').removeClass('checked');
        $('.numR_9').removeClass('checked');
        $('.numR_a').removeClass('checked');
        $('.numR_0').removeClass('checked');
        $('.numR_4').addClass('checked');
        if($('#numR_4').not('checked')){
            $('#numR_4').attr('checked','checked');
        };
    })
    $('.numR_5').click(function(){
        $('.numR_1').removeClass('checked');
        $('.numR_2').removeClass('checked');
        $('.numR_3').removeClass('checked');
        $('.numR_4').removeClass('checked');
        $('.numR_5').removeClass('checked');
        $('.numR_6').removeClass('checked');
        $('.numR_7').removeClass('checked');
        $('.numR_8').removeClass('checked');
        $('.numR_9').removeClass('checked');
        $('.numR_a').removeClass('checked');
        $('.numR_0').removeClass('checked');
        $('.numR_5').addClass('checked');
        if($('#numR_5').not('checked')){
            $('#numR_5').attr('checked','checked');
        };
    })
    $('.numR_6').click(function(){
        $('.numR_1').removeClass('checked');
        $('.numR_2').removeClass('checked');
        $('.numR_3').removeClass('checked');
        $('.numR_4').removeClass('checked');
        $('.numR_5').removeClass('checked');
        $('.numR_6').removeClass('checked');
        $('.numR_7').removeClass('checked');
        $('.numR_8').removeClass('checked');
        $('.numR_9').removeClass('checked');
        $('.numR_a').removeClass('checked');
        $('.numR_0').removeClass('checked');
        $('.numR_6').addClass('checked');
        if($('#numR_6').not('checked')){
            $('#numR_6').attr('checked','checked');
        };
    })
    $('.numR_7').click(function(){
        $('.numR_1').removeClass('checked');
        $('.numR_2').removeClass('checked');
        $('.numR_3').removeClass('checked');
        $('.numR_4').removeClass('checked');
        $('.numR_5').removeClass('checked');
        $('.numR_6').removeClass('checked');
        $('.numR_7').removeClass('checked');
        $('.numR_8').removeClass('checked');
        $('.numR_9').removeClass('checked');
        $('.numR_a').removeClass('checked');
        $('.numR_0').removeClass('checked');
        $('.numR_7').addClass('checked');
        if($('#numR_7').not('checked')){
            $('#numR_7').attr('checked','checked');
        };
    })
    $('.numR_8').click(function(){
        $('.numR_1').removeClass('checked');
        $('.numR_2').removeClass('checked');
        $('.numR_3').removeClass('checked');
        $('.numR_4').removeClass('checked');
        $('.numR_5').removeClass('checked');
        $('.numR_6').removeClass('checked');
        $('.numR_7').removeClass('checked');
        $('.numR_8').removeClass('checked');
        $('.numR_9').removeClass('checked');
        $('.numR_a').removeClass('checked');
        $('.numR_0').removeClass('checked');
        $('.numR_8').addClass('checked');
        if($('#numR_8').not('checked')){
            $('#numR_8').attr('checked','checked');
        };
    })
    $('.numR_9').click(function(){
        $('.numR_1').removeClass('checked');
        $('.numR_2').removeClass('checked');
        $('.numR_3').removeClass('checked');
        $('.numR_4').removeClass('checked');
        $('.numR_5').removeClass('checked');
        $('.numR_6').removeClass('checked');
        $('.numR_7').removeClass('checked');
        $('.numR_8').removeClass('checked');
        $('.numR_9').removeClass('checked');
        $('.numR_a').removeClass('checked');
        $('.numR_0').removeClass('checked');
        $('.numR_9').addClass('checked');
        if($('#numR_9').not('checked')){
            $('#numR_9').attr('checked','checked');
        };
    })
    $('.numR_a').click(function(){
        $('.numR_1').removeClass('checked');
        $('.numR_2').removeClass('checked');
        $('.numR_3').removeClass('checked');
        $('.numR_4').removeClass('checked');
        $('.numR_5').removeClass('checked');
        $('.numR_6').removeClass('checked');
        $('.numR_7').removeClass('checked');
        $('.numR_8').removeClass('checked');
        $('.numR_9').removeClass('checked');
        $('.numR_a').removeClass('checked');
        $('.numR_0').removeClass('checked');
        $('.numR_a').addClass('checked');
        if($('#numR_a').not('checked')){
            $('#numR_a').attr('checked','checked');
        };
    })
    $('.numR_0').click(function(){
        $('.numR_1').removeClass('checked');
        $('.numR_2').removeClass('checked');
        $('.numR_3').removeClass('checked');
        $('.numR_4').removeClass('checked');
        $('.numR_5').removeClass('checked');
        $('.numR_6').removeClass('checked');
        $('.numR_7').removeClass('checked');
        $('.numR_8').removeClass('checked');
        $('.numR_9').removeClass('checked');
        $('.numR_a').removeClass('checked');
        $('.numR_0').removeClass('checked');
        $('.numR_0').addClass('checked');
        if($('#numR_0').not('checked')){
            $('#numR_0').attr('checked','checked');
        };
    })

    $('.numB_1').click(function(){
        $('.numB_1').removeClass('checked');
        $('.numB_2').removeClass('checked');
        $('.numB_3').removeClass('checked');
        $('.numB_4').removeClass('checked');
        $('.numB_5').removeClass('checked');
        $('.numB_6').removeClass('checked');
        $('.numB_7').removeClass('checked');
        $('.numB_8').removeClass('checked');
        $('.numB_9').removeClass('checked');
        $('.numB_a').removeClass('checked');
        $('.numB_0').removeClass('checked');
        $('.numB_1').addClass('checked');
        if($('#numB_1').not('checked')){
            $('#numB_1').attr('checked','checked');
        };
    })
    $('.numB_2').click(function(){
        $('.numB_1').removeClass('checked');
        $('.numB_2').removeClass('checked');
        $('.numB_3').removeClass('checked');
        $('.numB_4').removeClass('checked');
        $('.numB_5').removeClass('checked');
        $('.numB_6').removeClass('checked');
        $('.numB_7').removeClass('checked');
        $('.numB_8').removeClass('checked');
        $('.numB_9').removeClass('checked');
        $('.numB_a').removeClass('checked');
        $('.numB_0').removeClass('checked');
        $('.numB_2').addClass('checked');
        if($('#numB_2').not('checked')){
            $('#numB_2').attr('checked','checked');
        };
    })
    $('.numB_3').click(function(){
        $('.numB_1').removeClass('checked');
        $('.numB_2').removeClass('checked');
        $('.numB_3').removeClass('checked');
        $('.numB_4').removeClass('checked');
        $('.numB_5').removeClass('checked');
        $('.numB_6').removeClass('checked');
        $('.numB_7').removeClass('checked');
        $('.numB_8').removeClass('checked');
        $('.numB_9').removeClass('checked');
        $('.numB_a').removeClass('checked');
        $('.numB_0').removeClass('checked');
        $('.numB_3').addClass('checked');
        if($('#numB_3').not('checked')){
            $('#numB_3').attr('checked','checked');
        };
    })
    $('.numB_4').click(function(){
        $('.numB_1').removeClass('checked');
        $('.numB_2').removeClass('checked');
        $('.numB_3').removeClass('checked');
        $('.numB_4').removeClass('checked');
        $('.numB_5').removeClass('checked');
        $('.numB_6').removeClass('checked');
        $('.numB_7').removeClass('checked');
        $('.numB_8').removeClass('checked');
        $('.numB_9').removeClass('checked');
        $('.numB_a').removeClass('checked');
        $('.numB_0').removeClass('checked');
        $('.numB_4').addClass('checked');
        if($('#numB_4').not('checked')){
            $('#numB_4').attr('checked','checked');
        };
    })
    $('.numB_5').click(function(){
        $('.numB_1').removeClass('checked');
        $('.numB_2').removeClass('checked');
        $('.numB_3').removeClass('checked');
        $('.numB_4').removeClass('checked');
        $('.numB_5').removeClass('checked');
        $('.numB_6').removeClass('checked');
        $('.numB_7').removeClass('checked');
        $('.numB_8').removeClass('checked');
        $('.numB_9').removeClass('checked');
        $('.numB_a').removeClass('checked');
        $('.numB_0').removeClass('checked');
        $('.numB_5').addClass('checked');
        if($('#numB_5').not('checked')){
            $('#numB_5').attr('checked','checked');
        };
    })
    $('.numB_6').click(function(){
        $('.numB_1').removeClass('checked');
        $('.numB_2').removeClass('checked');
        $('.numB_3').removeClass('checked');
        $('.numB_4').removeClass('checked');
        $('.numB_5').removeClass('checked');
        $('.numB_6').removeClass('checked');
        $('.numB_7').removeClass('checked');
        $('.numB_8').removeClass('checked');
        $('.numB_9').removeClass('checked');
        $('.numB_a').removeClass('checked');
        $('.numB_0').removeClass('checked');
        $('.numB_6').addClass('checked');
        if($('#numB_6').not('checked')){
            $('#numB_6').attr('checked','checked');
        };
    })
    $('.numB_7').click(function(){
        $('.numB_1').removeClass('checked');
        $('.numB_2').removeClass('checked');
        $('.numB_3').removeClass('checked');
        $('.numB_4').removeClass('checked');
        $('.numB_5').removeClass('checked');
        $('.numB_6').removeClass('checked');
        $('.numB_7').removeClass('checked');
        $('.numB_8').removeClass('checked');
        $('.numB_9').removeClass('checked');
        $('.numB_a').removeClass('checked');
        $('.numB_0').removeClass('checked');
        $('.numB_7').addClass('checked');
        if($('#numB_7').not('checked')){
            $('#numB_7').attr('checked','checked');
        };
    })
    $('.numB_8').click(function(){
        $('.numB_1').removeClass('checked');
        $('.numB_2').removeClass('checked');
        $('.numB_3').removeClass('checked');
        $('.numB_4').removeClass('checked');
        $('.numB_5').removeClass('checked');
        $('.numB_6').removeClass('checked');
        $('.numB_7').removeClass('checked');
        $('.numB_8').removeClass('checked');
        $('.numB_9').removeClass('checked');
        $('.numB_a').removeClass('checked');
        $('.numB_0').removeClass('checked');
        $('.numB_8').addClass('checked');
        if($('#numB_8').not('checked')){
            $('#numB_8').attr('checked','checked');
        };
    })
    $('.numB_9').click(function(){
        $('.numB_1').removeClass('checked');
        $('.numB_2').removeClass('checked');
        $('.numB_3').removeClass('checked');
        $('.numB_4').removeClass('checked');
        $('.numB_5').removeClass('checked');
        $('.numB_6').removeClass('checked');
        $('.numB_7').removeClass('checked');
        $('.numB_8').removeClass('checked');
        $('.numB_9').removeClass('checked');
        $('.numB_a').removeClass('checked');
        $('.numB_0').removeClass('checked');
        $('.numB_9').addClass('checked');
        if($('#numB_9').not('checked')){
            $('#numB_9').attr('checked','checked');
        };
    })
    $('.numB_a').click(function(){
        $('.numB_1').removeClass('checked');
        $('.numB_2').removeClass('checked');
        $('.numB_3').removeClass('checked');
        $('.numB_4').removeClass('checked');
        $('.numB_5').removeClass('checked');
        $('.numB_6').removeClass('checked');
        $('.numB_7').removeClass('checked');
        $('.numB_8').removeClass('checked');
        $('.numB_9').removeClass('checked');
        $('.numB_a').removeClass('checked');
        $('.numB_0').removeClass('checked');
        $('.numB_a').addClass('checked');
        if($('#numB_a').not('checked')){
            $('#numB_a').attr('checked','checked');
        };
    })
    $('.numB_0').click(function(){
        $('.numB_1').removeClass('checked');
        $('.numB_2').removeClass('checked');
        $('.numB_3').removeClass('checked');
        $('.numB_4').removeClass('checked');
        $('.numB_5').removeClass('checked');
        $('.numB_6').removeClass('checked');
        $('.numB_7').removeClass('checked');
        $('.numB_8').removeClass('checked');
        $('.numB_9').removeClass('checked');
        $('.numB_a').removeClass('checked');
        $('.numB_0').removeClass('checked');
        $('.numB_0').addClass('checked');
        if($('#numB_0').not('checked')){
            $('#numB_0').attr('checked','checked');
        };
    })
})

