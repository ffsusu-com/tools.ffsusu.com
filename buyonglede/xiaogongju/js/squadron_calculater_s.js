$(function(){
    $('#mini_training_calculation').click(function(){
        mini_trainingCalculatuion();
    })
    $('.mini_cal_show').click(function(){
        $('.mini_training_calculator_wrapper').removeClass('display_none');
        $('#glay_layer').removeClass('display_none');
    })
    $('#glay_layer').click(function(){
        $('.mini_training_calculator_wrapper').addClass('display_none');
        $('#glay_layer').addClass('display_none');
    })
})

//訓練集計処理
function mini_trainingCalculatuion() {

    //reset
    $('.mini_calculation_result').find('td').remove();
    $('.mini_calculation_result').removeClass('training8_done');
    $('.mini_calculation_result').removeClass('training7_done');
    $('.mini_calculation_result').removeClass('training6_done');
    $('.mini_calculation_result').removeClass('training5_done');
    $('.mini_calculation_result').removeClass('training4_done');
    $('.mini_calculation_result').removeClass('training3_done');
    $('.mini_calculation_result').removeClass('training2_done');
    $('.mini_calculation_result').removeClass('training1_done');
    $('.mini_calculation_result').removeClass('training_false');

    var pattern_count = 1;

    var squadronRank = $('#mini_training_calculator').find('.select_rank option:selected').val();

    if ( squadronRank == 'rank_1' ) {
        var training_max = 200;
    }else if ( squadronRank == 'rank_2' ) {
        var training_max = 280;
    }else if ( squadronRank == 'rank_3' ) {
        var training_max = 400;
    };

    //training_list
    var t001_arr = [+40,-20,-20,'身体'];
    var t002_arr = [-20,+40,-20,'精神'];
    var t003_arr = [-20,-20,+40,'戦術'];
    var t004_arr = [+20,+20,-40,'身体+精神'];
    var t005_arr = [+20,-40,+20,'身体+戦術'];
    var t006_arr = [-40,+20,+20,'精神+戦術'];

    for (var i = 1; i < 7; i++) {

        var squadron_body    = parseInt($('#mini_training_calculator').find('.b_body').val()),
            squadron_spirit  = parseInt($('#mini_training_calculator').find('.b_spirit').val()),
            squadron_tactics = parseInt($('#mini_training_calculator').find('.b_tactics').val());

        var after_body     = parseInt($('#mini_training_calculator').find('.a_body').val()),
            after_spirit   = parseInt($('#mini_training_calculator').find('.a_spirit').val()),
            after_tactics  = parseInt($('#mini_training_calculator').find('.a_tactics').val());

        var squadron_sum = squadron_body + squadron_spirit + squadron_tactics;

        if ( training_max - squadron_sum >= 40 ) {
            //上限値に達していない場合
            if ( i == 1 ){
                //身体訓練
                var training_body_result_1    = squadron_body + 40;
                var training_spirit_result_1  = squadron_spirit;
                var training_tactics_result_1 = squadron_tactics;
            }else if ( i == 2 ){
                //精神訓練
                var training_body_result_1    = squadron_body;
                var training_spirit_result_1  = squadron_spirit + 40;
                var training_tactics_result_1 = squadron_tactics;
            }else if ( i == 3 ){
                //戦術訓練
                var training_body_result_1    = squadron_body;
                var training_spirit_result_1  = squadron_spirit;
                var training_tactics_result_1 = squadron_tactics + 40;
            }else if ( i == 4 ){
                //身体+精神訓練
                var training_body_result_1    = squadron_body + 20;
                var training_spirit_result_1  = squadron_spirit + 20;
                var training_tactics_result_1 = squadron_tactics;
            }else if ( i == 5 ){
                //身体+戦術訓練
                var training_body_result_1    = squadron_body + 20;
                var training_spirit_result_1  = squadron_spirit;
                var training_tactics_result_1 = squadron_tactics + 20;
            }else if ( i == 6 ){
                //精神+戦術訓練
                var training_body_result_1    = squadron_body;
                var training_spirit_result_1  = squadron_spirit + 20;
                var training_tactics_result_1 = squadron_tactics + 20;
            };//end if (上限値に達してない場合)
        }else{
            //上限値に達してる場合
            if ( i == 1 ) {
                //単体訓練
                if ( squadron_spirit + squadron_tactics < 40 ) {
                    var training_body_result_1    = squadron_body;
                    var training_spirit_result_1  = squadron_spirit;
                    var training_tactics_result_1 = squadron_tactics;
                }else{
                    var training_body_result_1    = squadron_body + 40;
                    if ( squadron_spirit <= 0 ) {
                        var training_spirit_result_1  = squadron_spirit;
                        var training_tactics_result_1 = squadron_tactics - 40;
                    }else if ( squadron_tactics <= 0 ) {
                        var training_spirit_result_1  = squadron_spirit - 40;
                        var training_tactics_result_1 = squadron_tactics;
                    }else{
                        var training_spirit_result_1  = squadron_spirit - 20;
                        var training_tactics_result_1 = squadron_tactics -20;
                    }
                }
            }else if ( i == 2 ) {
                //単体訓練
                if ( squadron_body + squadron_tactics < 40 ) {
                    var training_body_result_1    = squadron_body;
                    var training_spirit_result_1  = squadron_spirit;
                    var training_tactics_result_1 = squadron_tactics;
                }else{
                    var training_spirit_result_1  = squadron_spirit + 40;
                    if ( squadron_body <= 0 ) {
                        var training_body_result_1  = squadron_body;
                        var training_tactics_result_1 = squadron_tactics - 40;
                    }else if ( squadron_tactics <= 0 ) {
                        var training_body_result_1  = squadron_body - 40;
                        var training_tactics_result_1 = squadron_tactics;
                    }else{
                        var training_body_result_1  = squadron_body - 20;
                        var training_tactics_result_1 = squadron_tactics -20;
                    }
                }
            }else if ( i == 3 ) {
                //単体訓練
                if ( squadron_body + squadron_spirit < 40 ) {
                    var training_body_result_1    = squadron_body;
                    var training_spirit_result_1  = squadron_spirit;
                    var training_tactics_result_1 = squadron_tactics;
                }else{
                    var training_tactics_result_1 = squadron_tactics + 40;
                    if ( squadron_body <= 0 ) {
                        var training_body_result_1  = squadron_body;
                        var training_spirit_result_1 = squadron_spirit - 40;
                    }else if ( squadron_spirit <= 0 ) {
                        var training_body_result_1  = squadron_body - 40;
                        var training_spirit_result_1 = squadron_spirit;
                    }else{
                        var training_body_result_1  = squadron_body - 20;
                        var training_spirit_result_1 = squadron_spirit -20;
                    }
                }
            }else{
                //複合訓練
                var training_body_result_1    = squadron_body    + eval('t00'+i+'_arr')[0];
                var training_spirit_result_1  = squadron_spirit  + eval('t00'+i+'_arr')[1];
                var training_tactics_result_1 = squadron_tactics + eval('t00'+i+'_arr')[2];
                if ( training_body_result_1 < 0 || training_spirit_result_1 < 0 || training_tactics_result_1 < 0 ) {
                    var training_body_result_1    = squadron_body;
                    var training_spirit_result_1  = squadron_spirit;
                    var training_tactics_result_1 = squadron_tactics;
                };
            };//end if

        }//end if (上限値に達してない場合)
        if ( after_body == training_body_result_1 && after_spirit == training_spirit_result_1 && after_tactics == training_tactics_result_1 ) {
            $('.mini_calculation_result').addClass('training1_done');
            $('.mini_calculation_result').append('<td class="t1"><p>'+training_body_result_1+'</p>/<p>'+training_spirit_result_1+'</p>/<p>'+training_tactics_result_1+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+i+'.png"><br></td>');
        }else{

            for (var j = 1; j < 7; j++) {

                //1回目の訓練結果を基礎値とする
                var squadron_body    = training_body_result_1;
                var squadron_spirit  = training_spirit_result_1;
                var squadron_tactics = training_tactics_result_1;

                if ( training_max - squadron_sum >= 40 ) {
                    //上限値に達していない場合
                    if ( j == 1 ){
                        //身体訓練
                        var training_body_result_2    = squadron_body + 40;
                        var training_spirit_result_2  = squadron_spirit;
                        var training_tactics_result_2 = squadron_tactics;
                    }else if ( j == 2 ){
                        //精神訓練
                        var training_body_result_2    = squadron_body;
                        var training_spirit_result_2  = squadron_spirit + 40;
                        var training_tactics_result_2 = squadron_tactics;
                    }else if ( j == 3 ){
                        //戦術訓練
                        var training_body_result_2    = squadron_body;
                        var training_spirit_result_2  = squadron_spirit;
                        var training_tactics_result_2 = squadron_tactics + 40;
                    }else if ( j == 4 ){
                        //身体+精神訓練
                        var training_body_result_2    = squadron_body + 20;
                        var training_spirit_result_2  = squadron_spirit + 20;
                        var training_tactics_result_2 = squadron_tactics;
                    }else if ( j == 5 ){
                        //身体+戦術訓練
                        var training_body_result_2    = squadron_body + 20;
                        var training_spirit_result_2  = squadron_spirit;
                        var training_tactics_result_2 = squadron_tactics + 20;
                    }else if ( j == 6 ){
                        //精神+戦術訓練
                        var training_body_result_2    = squadron_body;
                        var training_spirit_result_2  = squadron_spirit + 20;
                        var training_tactics_result_2 = squadron_tactics + 20;
                    };//end if (上限値に達してない場合)
                }else{
                    //上限値に達してる場合
                    if ( j == 1 ) {
                        //単体訓練
                        if ( squadron_spirit + squadron_tactics < 40 ) {
                            var training_body_result_2    = squadron_body;
                            var training_spirit_result_2  = squadron_spirit;
                            var training_tactics_result_2 = squadron_tactics;
                        }else{
                            var training_body_result_2    = squadron_body + 40;
                            if ( squadron_spirit <= 0 ) {
                                var training_spirit_result_2  = squadron_spirit;
                                var training_tactics_result_2 = squadron_tactics - 40;
                            }else if ( squadron_tactics <= 0 ) {
                                var training_spirit_result_2  = squadron_spirit - 40;
                                var training_tactics_result_2 = squadron_tactics;
                            }else{
                                var training_spirit_result_2  = squadron_spirit - 20;
                                var training_tactics_result_2 = squadron_tactics -20;
                            }
                        }
                    }else if ( j == 2 ) {
                        //単体訓練
                        if ( squadron_body + squadron_tactics < 40 ) {
                            var training_body_result_2    = squadron_body;
                            var training_spirit_result_2  = squadron_spirit;
                            var training_tactics_result_2 = squadron_tactics;
                        }else{
                            var training_spirit_result_2  = squadron_spirit + 40;
                            if ( squadron_body <= 0 ) {
                                var training_body_result_2  = squadron_body;
                                var training_tactics_result_2 = squadron_tactics - 40;
                            }else if ( squadron_tactics <= 0 ) {
                                var training_body_result_2  = squadron_body - 40;
                                var training_tactics_result_2 = squadron_tactics;
                            }else{
                                var training_body_result_2  = squadron_body - 20;
                                var training_tactics_result_2 = squadron_tactics -20;
                            }
                        }
                    }else if ( j == 3 ) {
                        //単体訓練
                        if ( squadron_body + squadron_spirit < 40 ) {
                            var training_body_result_2    = squadron_body;
                            var training_spirit_result_2  = squadron_spirit;
                            var training_tactics_result_2 = squadron_tactics;
                        }else{
                            var training_tactics_result_2 = squadron_tactics + 40;
                            if ( squadron_body <= 0 ) {
                                var training_body_result_2  = squadron_body;
                                var training_spirit_result_2 = squadron_spirit - 40;
                            }else if ( squadron_spirit <= 0 ) {
                                var training_body_result_2  = squadron_body - 40;
                                var training_spirit_result_2 = squadron_spirit;
                            }else{
                                var training_body_result_2  = squadron_body - 20;
                                var training_spirit_result_2 = squadron_spirit -20;
                            }
                        }
                    }else{
                        //複合訓練
                        var training_body_result_2    = squadron_body    + eval('t00'+j+'_arr')[0];
                        var training_spirit_result_2  = squadron_spirit  + eval('t00'+j+'_arr')[1];
                        var training_tactics_result_2 = squadron_tactics + eval('t00'+j+'_arr')[2];
                        if ( training_body_result_2 < 0 || training_spirit_result_2 < 0 || training_tactics_result_2 < 0 ) {
                            var training_body_result_2    = squadron_body;
                            var training_spirit_result_2  = squadron_spirit;
                            var training_tactics_result_2 = squadron_tactics;
                        };
                    };//end if

                }//end if (上限値に達してない場合)

                if ( after_body == training_body_result_2 && after_spirit == training_spirit_result_2 && after_tactics == training_tactics_result_2 ) {
                    $('.mini_calculation_result').addClass('training2_done');
                    $('.mini_calculation_result').append('<td class="t2"><p>'+training_body_result_1+'</p>/<p>'+training_spirit_result_1+'</p>/<p>'+training_tactics_result_1+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+i+'.png"><br><p>'+training_body_result_2+'</p>/<p>'+training_spirit_result_2+'</p>/<p>'+training_tactics_result_2+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+j+'.png"><br></td>');
                }else{

                    for (var k = 1; k < 7; k++) {

                        //1回目の訓練結果を基礎値とする
                        var squadron_body    = training_body_result_2;
                        var squadron_spirit  = training_spirit_result_2;
                        var squadron_tactics = training_tactics_result_2;

                        if ( training_max - squadron_sum >= 40 ) {
                            //上限値に達していない場合
                            if ( k == 1 ){
                                //身体訓練
                                var training_body_result_3    = squadron_body + 40;
                                var training_spirit_result_3  = squadron_spirit;
                                var training_tactics_result_3 = squadron_tactics;
                            }else if ( k == 2 ){
                                //精神訓練
                                var training_body_result_3    = squadron_body;
                                var training_spirit_result_3  = squadron_spirit + 40;
                                var training_tactics_result_3 = squadron_tactics;
                            }else if ( k == 3 ){
                                //戦術訓練
                                var training_body_result_3    = squadron_body;
                                var training_spirit_result_3  = squadron_spirit;
                                var training_tactics_result_3 = squadron_tactics + 40;
                            }else if ( k == 4 ){
                                //身体+精神訓練
                                var training_body_result_3    = squadron_body + 20;
                                var training_spirit_result_3  = squadron_spirit + 20;
                                var training_tactics_result_3 = squadron_tactics;
                            }else if ( k == 5 ){
                                //身体+戦術訓練
                                var training_body_result_3    = squadron_body + 20;
                                var training_spirit_result_3  = squadron_spirit;
                                var training_tactics_result_3 = squadron_tactics + 20;
                            }else if ( k == 6 ){
                                //精神+戦術訓練
                                var training_body_result_3    = squadron_body;
                                var training_spirit_result_3  = squadron_spirit + 20;
                                var training_tactics_result_3 = squadron_tactics + 20;
                            };//end if (上限値に達してない場合)
                        }else{
                            //上限値に達してる場合
                            if ( k == 1 ) {
                                //単体訓練
                                if ( squadron_spirit + squadron_tactics < 40 ) {
                                    var training_body_result_3    = squadron_body;
                                    var training_spirit_result_3  = squadron_spirit;
                                    var training_tactics_result_3 = squadron_tactics;
                                }else{
                                    var training_body_result_3    = squadron_body + 40;
                                    if ( squadron_spirit <= 0 ) {
                                        var training_spirit_result_3  = squadron_spirit;
                                        var training_tactics_result_3 = squadron_tactics - 40;
                                    }else if ( squadron_tactics <= 0 ) {
                                        var training_spirit_result_3  = squadron_spirit - 40;
                                        var training_tactics_result_3 = squadron_tactics;
                                    }else{
                                        var training_spirit_result_3  = squadron_spirit - 20;
                                        var training_tactics_result_3 = squadron_tactics -20;
                                    }
                                }
                            }else if ( k == 2 ) {
                                //単体訓練
                                if ( squadron_body + squadron_tactics < 40 ) {
                                    var training_body_result_3    = squadron_body;
                                    var training_spirit_result_3  = squadron_spirit;
                                    var training_tactics_result_3 = squadron_tactics;
                                }else{
                                    var training_spirit_result_3  = squadron_spirit + 40;
                                    if ( squadron_body <= 0 ) {
                                        var training_body_result_3  = squadron_body;
                                        var training_tactics_result_3 = squadron_tactics - 40;
                                    }else if ( squadron_tactics <= 0 ) {
                                        var training_body_result_3  = squadron_body - 40;
                                        var training_tactics_result_3 = squadron_tactics;
                                    }else{
                                        var training_body_result_3  = squadron_body - 20;
                                        var training_tactics_result_3 = squadron_tactics -20;
                                    }
                                }
                            }else if ( k == 3 ) {
                                //単体訓練
                                if ( squadron_body + squadron_spirit < 40 ) {
                                    var training_body_result_3    = squadron_body;
                                    var training_spirit_result_3  = squadron_spirit;
                                    var training_tactics_result_3 = squadron_tactics;
                                }else{
                                    var training_tactics_result_3 = squadron_tactics + 40;
                                    if ( squadron_body <= 0 ) {
                                        var training_body_result_3  = squadron_body;
                                        var training_spirit_result_3 = squadron_spirit - 40;
                                    }else if ( squadron_spirit <= 0 ) {
                                        var training_body_result_3  = squadron_body - 40;
                                        var training_spirit_result_3 = squadron_spirit;
                                    }else{
                                        var training_body_result_3  = squadron_body - 20;
                                        var training_spirit_result_3 = squadron_spirit -20;
                                    }
                                }
                            }else{
                                //複合訓練
                                var training_body_result_3    = squadron_body    + eval('t00'+k+'_arr')[0];
                                var training_spirit_result_3  = squadron_spirit  + eval('t00'+k+'_arr')[1];
                                var training_tactics_result_3 = squadron_tactics + eval('t00'+k+'_arr')[2];
                                if ( training_body_result_3 < 0 || training_spirit_result_3 < 0 || training_tactics_result_3 < 0 ) {
                                    var training_body_result_3    = squadron_body;
                                    var training_spirit_result_3  = squadron_spirit;
                                    var training_tactics_result_3 = squadron_tactics;
                                };
                            };//end if

                        }//end if (上限値に達してない場合)

                        if ( after_body == training_body_result_3 && after_spirit == training_spirit_result_3 && after_tactics == training_tactics_result_3 ) {
                            $('.mini_calculation_result').addClass('training3_done');
                            $('.mini_calculation_result').append('<td class="t3"><p>'+training_body_result_1+'</p>/<p>'+training_spirit_result_1+'</p>/<p>'+training_tactics_result_1+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+i+'.png"><br><p>'+training_body_result_2+'</p>/<p>'+training_spirit_result_2+'</p>/<p>'+training_tactics_result_2+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+j+'.png"><br><p>'+training_body_result_3+'</p>/<p>'+training_spirit_result_3+'</p>/<p>'+training_tactics_result_3+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+k+'.png"><br></td>');
                        }else{

                            for (var l = 1; l < 7; l++) {

                                //1回目の訓練結果を基礎値とする
                                var squadron_body    = training_body_result_3;
                                var squadron_spirit  = training_spirit_result_3;
                                var squadron_tactics = training_tactics_result_3;

                                if ( training_max - squadron_sum >= 40 ) {
                                    //上限値に達していない場合
                                    if ( l == 1 ){
                                        //身体訓練
                                        var training_body_result_4    = squadron_body + 40;
                                        var training_spirit_result_4  = squadron_spirit;
                                        var training_tactics_result_4 = squadron_tactics;
                                    }else if ( l == 2 ){
                                        //精神訓練
                                        var training_body_result_4    = squadron_body;
                                        var training_spirit_result_4  = squadron_spirit + 40;
                                        var training_tactics_result_4 = squadron_tactics;
                                    }else if ( l == 3 ){
                                        //戦術訓練
                                        var training_body_result_4    = squadron_body;
                                        var training_spirit_result_4  = squadron_spirit;
                                        var training_tactics_result_4 = squadron_tactics + 40;
                                    }else if ( l == 4 ){
                                        //身体+精神訓練
                                        var training_body_result_4    = squadron_body + 20;
                                        var training_spirit_result_4  = squadron_spirit + 20;
                                        var training_tactics_result_4 = squadron_tactics;
                                    }else if ( l == 5 ){
                                        //身体+戦術訓練
                                        var training_body_result_4    = squadron_body + 20;
                                        var training_spirit_result_4  = squadron_spirit;
                                        var training_tactics_result_4 = squadron_tactics + 20;
                                    }else if ( l == 6 ){
                                        //精神+戦術訓練
                                        var training_body_result_4    = squadron_body;
                                        var training_spirit_result_4  = squadron_spirit + 20;
                                        var training_tactics_result_4 = squadron_tactics + 20;
                                    };//end if (上限値に達してない場合)
                                }else{
                                    //上限値に達してる場合
                                    if ( l == 1 ) {
                                        //単体訓練
                                        if ( squadron_spirit + squadron_tactics < 40 ) {
                                            var training_body_result_4    = squadron_body;
                                            var training_spirit_result_4  = squadron_spirit;
                                            var training_tactics_result_4 = squadron_tactics;
                                        }else{
                                            var training_body_result_4    = squadron_body + 40;
                                            if ( squadron_spirit <= 0 ) {
                                                var training_spirit_result_4  = squadron_spirit;
                                                var training_tactics_result_4 = squadron_tactics - 40;
                                            }else if ( squadron_tactics <= 0 ) {
                                                var training_spirit_result_4  = squadron_spirit - 40;
                                                var training_tactics_result_4 = squadron_tactics;
                                            }else{
                                                var training_spirit_result_4  = squadron_spirit - 20;
                                                var training_tactics_result_4 = squadron_tactics -20;
                                            }
                                        }
                                    }else if ( l == 2 ) {
                                        //単体訓練
                                        if ( squadron_body + squadron_tactics < 40 ) {
                                            var training_body_result_4    = squadron_body;
                                            var training_spirit_result_4  = squadron_spirit;
                                            var training_tactics_result_4 = squadron_tactics;
                                        }else{
                                            var training_spirit_result_4  = squadron_spirit + 40;
                                            if ( squadron_body <= 0 ) {
                                                var training_body_result_4  = squadron_body;
                                                var training_tactics_result_4 = squadron_tactics - 40;
                                            }else if ( squadron_tactics <= 0 ) {
                                                var training_body_result_4  = squadron_body - 40;
                                                var training_tactics_result_4 = squadron_tactics;
                                            }else{
                                                var training_body_result_4  = squadron_body - 20;
                                                var training_tactics_result_4 = squadron_tactics -20;
                                            }
                                        }
                                    }else if ( l == 3 ) {
                                        //単体訓練
                                        if ( squadron_body + squadron_spirit < 40 ) {
                                            var training_body_result_4    = squadron_body;
                                            var training_spirit_result_4  = squadron_spirit;
                                            var training_tactics_result_4 = squadron_tactics;
                                        }else{
                                            var training_tactics_result_4 = squadron_tactics + 40;
                                            if ( squadron_body <= 0 ) {
                                                var training_body_result_4  = squadron_body;
                                                var training_spirit_result_4 = squadron_spirit - 40;
                                            }else if ( squadron_spirit <= 0 ) {
                                                var training_body_result_4  = squadron_body - 40;
                                                var training_spirit_result_4 = squadron_spirit;
                                            }else{
                                                var training_body_result_4  = squadron_body - 20;
                                                var training_spirit_result_4 = squadron_spirit -20;
                                            }
                                        }
                                    }else{
                                        //複合訓練
                                        var training_body_result_4    = squadron_body    + eval('t00'+l+'_arr')[0];
                                        var training_spirit_result_4  = squadron_spirit  + eval('t00'+l+'_arr')[1];
                                        var training_tactics_result_4 = squadron_tactics + eval('t00'+l+'_arr')[2];
                                        if ( training_body_result_4 < 0 || training_spirit_result_4 < 0 || training_tactics_result_4 < 0 ) {
                                            var training_body_result_4    = squadron_body;
                                            var training_spirit_result_4  = squadron_spirit;
                                            var training_tactics_result_4 = squadron_tactics;
                                        };
                                    };//end if

                                }//end if (上限値に達してない場合)

                                if ( after_body == training_body_result_4 && after_spirit == training_spirit_result_4 && after_tactics == training_tactics_result_4 ) {
                                    $('.mini_calculation_result').addClass('training4_done');
                                    $('.mini_calculation_result').append('<td class="t4"><p>'+training_body_result_1+'</p>/<p>'+training_spirit_result_1+'</p>/<p>'+training_tactics_result_1+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+i+'.png"><br><p>'+training_body_result_2+'</p>/<p>'+training_spirit_result_2+'</p>/<p>'+training_tactics_result_2+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+j+'.png"><br><p>'+training_body_result_3+'</p>/<p>'+training_spirit_result_3+'</p>/<p>'+training_tactics_result_3+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+k+'.png"><br><p>'+training_body_result_4+'</p>/<p>'+training_spirit_result_4+'</p>/<p>'+training_tactics_result_4+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+l+'.png"><br></td>');
                                }else{

                                    for (var m = 1; m < 7; m++) {

                                        //1回目の訓練結果を基礎値とする
                                        var squadron_body    = training_body_result_4;
                                        var squadron_spirit  = training_spirit_result_4;
                                        var squadron_tactics = training_tactics_result_4;

                                        if ( training_max - squadron_sum >= 40 ) {
                                            //上限値に達していない場合
                                            if ( m == 1 ){
                                                //身体訓練
                                                var training_body_result_5    = squadron_body + 40;
                                                var training_spirit_result_5  = squadron_spirit;
                                                var training_tactics_result_5 = squadron_tactics;
                                            }else if ( m == 2 ){
                                                //精神訓練
                                                var training_body_result_5    = squadron_body;
                                                var training_spirit_result_5  = squadron_spirit + 40;
                                                var training_tactics_result_5 = squadron_tactics;
                                            }else if ( m == 3 ){
                                                //戦術訓練
                                                var training_body_result_5    = squadron_body;
                                                var training_spirit_result_5  = squadron_spirit;
                                                var training_tactics_result_5 = squadron_tactics + 40;
                                            }else if ( m == 4 ){
                                                //身体+精神訓練
                                                var training_body_result_5    = squadron_body + 20;
                                                var training_spirit_result_5  = squadron_spirit + 20;
                                                var training_tactics_result_5 = squadron_tactics;
                                            }else if ( m == 5 ){
                                                //身体+戦術訓練
                                                var training_body_result_5    = squadron_body + 20;
                                                var training_spirit_result_5  = squadron_spirit;
                                                var training_tactics_result_5 = squadron_tactics + 20;
                                            }else if ( m == 6 ){
                                                //精神+戦術訓練
                                                var training_body_result_5    = squadron_body;
                                                var training_spirit_result_5  = squadron_spirit + 20;
                                                var training_tactics_result_5 = squadron_tactics + 20;
                                            };//end if (上限値に達してない場合)
                                        }else{
                                            //上限値に達してる場合
                                            if ( m == 1 ) {
                                                //単体訓練
                                                if ( squadron_spirit + squadron_tactics < 40 ) {
                                                    var training_body_result_5    = squadron_body;
                                                    var training_spirit_result_5  = squadron_spirit;
                                                    var training_tactics_result_5 = squadron_tactics;
                                                }else{
                                                    var training_body_result_5    = squadron_body + 40;
                                                    if ( squadron_spirit <= 0 ) {
                                                        var training_spirit_result_5  = squadron_spirit;
                                                        var training_tactics_result_5 = squadron_tactics - 40;
                                                    }else if ( squadron_tactics <= 0 ) {
                                                        var training_spirit_result_5  = squadron_spirit - 40;
                                                        var training_tactics_result_5 = squadron_tactics;
                                                    }else{
                                                        var training_spirit_result_5  = squadron_spirit - 20;
                                                        var training_tactics_result_5 = squadron_tactics -20;
                                                    }
                                                }
                                            }else if ( m == 2 ) {
                                                //単体訓練
                                                if ( squadron_body + squadron_tactics < 40 ) {
                                                    var training_body_result_5    = squadron_body;
                                                    var training_spirit_result_5  = squadron_spirit;
                                                    var training_tactics_result_5 = squadron_tactics;
                                                }else{
                                                    var training_spirit_result_5  = squadron_spirit + 40;
                                                    if ( squadron_body <= 0 ) {
                                                        var training_body_result_5  = squadron_body;
                                                        var training_tactics_result_5 = squadron_tactics - 40;
                                                    }else if ( squadron_tactics <= 0 ) {
                                                        var training_body_result_5  = squadron_body - 40;
                                                        var training_tactics_result_5 = squadron_tactics;
                                                    }else{
                                                        var training_body_result_5  = squadron_body - 20;
                                                        var training_tactics_result_5 = squadron_tactics -20;
                                                    }
                                                }
                                            }else if ( m == 3 ) {
                                                //単体訓練
                                                if ( squadron_body + squadron_spirit < 40 ) {
                                                    var training_body_result_5    = squadron_body;
                                                    var training_spirit_result_5  = squadron_spirit;
                                                    var training_tactics_result_5 = squadron_tactics;
                                                }else{
                                                    var training_tactics_result_5 = squadron_tactics + 40;
                                                    if ( squadron_body <= 0 ) {
                                                        var training_body_result_5  = squadron_body;
                                                        var training_spirit_result_5 = squadron_spirit - 40;
                                                    }else if ( squadron_spirit <= 0 ) {
                                                        var training_body_result_5  = squadron_body - 40;
                                                        var training_spirit_result_5 = squadron_spirit;
                                                    }else{
                                                        var training_body_result_5  = squadron_body - 20;
                                                        var training_spirit_result_5 = squadron_spirit -20;
                                                    }
                                                }
                                            }else{
                                                //複合訓練
                                                var training_body_result_5    = squadron_body    + eval('t00'+m+'_arr')[0];
                                                var training_spirit_result_5  = squadron_spirit  + eval('t00'+m+'_arr')[1];
                                                var training_tactics_result_5 = squadron_tactics + eval('t00'+m+'_arr')[2];
                                                if ( training_body_result_5 < 0 || training_spirit_result_5 < 0 || training_tactics_result_5 < 0 ) {
                                                    var training_body_result_5    = squadron_body;
                                                    var training_spirit_result_5  = squadron_spirit;
                                                    var training_tactics_result_5 = squadron_tactics;
                                                };
                                            };//end if

                                        }//end if (上限値に達してない場合)

                                        if ( after_body == training_body_result_5 && after_spirit == training_spirit_result_5 && after_tactics == training_tactics_result_5 ) {
                                            $('.mini_calculation_result').addClass('training5_done');
                                            $('.mini_calculation_result').append('<td class="t5"><p>'+training_body_result_1+'</p>/<p>'+training_spirit_result_1+'</p>/<p>'+training_tactics_result_1+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+i+'.png"><br><p>'+training_body_result_2+'</p>/<p>'+training_spirit_result_2+'</p>/<p>'+training_tactics_result_2+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+j+'.png"><br><p>'+training_body_result_3+'</p>/<p>'+training_spirit_result_3+'</p>/<p>'+training_tactics_result_3+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+k+'.png"><br><p>'+training_body_result_4+'</p>/<p>'+training_spirit_result_4+'</p>/<p>'+training_tactics_result_4+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+l+'.png"><br><p>'+training_body_result_5+'</p>/<p>'+training_spirit_result_5+'</p>/<p>'+training_tactics_result_5+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+m+'.png"><br></td>');
                                        }else{

                                            for (var n = 1; n < 7; n++) {

                                                //1回目の訓練結果を基礎値とする
                                                var squadron_body    = training_body_result_5;
                                                var squadron_spirit  = training_spirit_result_5;
                                                var squadron_tactics = training_tactics_result_5;

                                                if ( training_max - squadron_sum >= 40 ) {
                                                    //上限値に達していない場合
                                                    if ( n == 1 ){
                                                        //身体訓練
                                                        var training_body_result_6    = squadron_body + 40;
                                                        var training_spirit_result_6  = squadron_spirit;
                                                        var training_tactics_result_6 = squadron_tactics;
                                                    }else if ( n == 2 ){
                                                        //精神訓練
                                                        var training_body_result_6    = squadron_body;
                                                        var training_spirit_result_6  = squadron_spirit + 40;
                                                        var training_tactics_result_6 = squadron_tactics;
                                                    }else if ( n == 3 ){
                                                        //戦術訓練
                                                        var training_body_result_6    = squadron_body;
                                                        var training_spirit_result_6  = squadron_spirit;
                                                        var training_tactics_result_6 = squadron_tactics + 40;
                                                    }else if ( n == 4 ){
                                                        //身体+精神訓練
                                                        var training_body_result_6    = squadron_body + 20;
                                                        var training_spirit_result_6  = squadron_spirit + 20;
                                                        var training_tactics_result_6 = squadron_tactics;
                                                    }else if ( n == 5 ){
                                                        //身体+戦術訓練
                                                        var training_body_result_6    = squadron_body + 20;
                                                        var training_spirit_result_6  = squadron_spirit;
                                                        var training_tactics_result_6 = squadron_tactics + 20;
                                                    }else if ( n == 6 ){
                                                        //精神+戦術訓練
                                                        var training_body_result_6    = squadron_body;
                                                        var training_spirit_result_6  = squadron_spirit + 20;
                                                        var training_tactics_result_6 = squadron_tactics + 20;
                                                    };//end if (上限値に達してない場合)
                                                }else{
                                                    //上限値に達してる場合
                                                    if ( n == 1 ) {
                                                        //単体訓練
                                                        if ( squadron_spirit + squadron_tactics < 40 ) {
                                                            var training_body_result_6    = squadron_body;
                                                            var training_spirit_result_6  = squadron_spirit;
                                                            var training_tactics_result_6 = squadron_tactics;
                                                        }else{
                                                            var training_body_result_6    = squadron_body + 40;
                                                            if ( squadron_spirit <= 0 ) {
                                                                var training_spirit_result_6  = squadron_spirit;
                                                                var training_tactics_result_6 = squadron_tactics - 40;
                                                            }else if ( squadron_tactics <= 0 ) {
                                                                var training_spirit_result_6  = squadron_spirit - 40;
                                                                var training_tactics_result_6 = squadron_tactics;
                                                            }else{
                                                                var training_spirit_result_6  = squadron_spirit - 20;
                                                                var training_tactics_result_6 = squadron_tactics -20;
                                                            }
                                                        }
                                                    }else if ( n == 2 ) {
                                                        //単体訓練
                                                        if ( squadron_body + squadron_tactics < 40 ) {
                                                            var training_body_result_6    = squadron_body;
                                                            var training_spirit_result_6  = squadron_spirit;
                                                            var training_tactics_result_6 = squadron_tactics;
                                                        }else{
                                                            var training_spirit_result_6  = squadron_spirit + 40;
                                                            if ( squadron_body <= 0 ) {
                                                                var training_body_result_6  = squadron_body;
                                                                var training_tactics_result_6 = squadron_tactics - 40;
                                                            }else if ( squadron_tactics <= 0 ) {
                                                                var training_body_result_6  = squadron_body - 40;
                                                                var training_tactics_result_6 = squadron_tactics;
                                                            }else{
                                                                var training_body_result_6  = squadron_body - 20;
                                                                var training_tactics_result_6 = squadron_tactics -20;
                                                            }
                                                        }
                                                    }else if ( n == 3 ) {
                                                        //単体訓練
                                                        if ( squadron_body + squadron_spirit < 40 ) {
                                                            var training_body_result_6    = squadron_body;
                                                            var training_spirit_result_6  = squadron_spirit;
                                                            var training_tactics_result_6 = squadron_tactics;
                                                        }else{
                                                            var training_tactics_result_6 = squadron_tactics + 40;
                                                            if ( squadron_body <= 0 ) {
                                                                var training_body_result_6  = squadron_body;
                                                                var training_spirit_result_6 = squadron_spirit - 40;
                                                            }else if ( squadron_spirit <= 0 ) {
                                                                var training_body_result_6  = squadron_body - 40;
                                                                var training_spirit_result_6 = squadron_spirit;
                                                            }else{
                                                                var training_body_result_6  = squadron_body - 20;
                                                                var training_spirit_result_6 = squadron_spirit -20;
                                                            }
                                                        }
                                                    }else{
                                                        //複合訓練
                                                        var training_body_result_6    = squadron_body    + eval('t00'+n+'_arr')[0];
                                                        var training_spirit_result_6  = squadron_spirit  + eval('t00'+n+'_arr')[1];
                                                        var training_tactics_result_6 = squadron_tactics + eval('t00'+n+'_arr')[2];
                                                        if ( training_body_result_6 < 0 || training_spirit_result_6 < 0 || training_tactics_result_6 < 0 ) {
                                                            var training_body_result_6    = squadron_body;
                                                            var training_spirit_result_6  = squadron_spirit;
                                                            var training_tactics_result_6 = squadron_tactics;
                                                        };
                                                    };//end if

                                                }//end if (上限値に達してない場合)

                                                if ( after_body == training_body_result_6 && after_spirit == training_spirit_result_6 && after_tactics == training_tactics_result_6 ) {
                                                    $('.mini_calculation_result').addClass('training6_done');
                                                    $('.mini_calculation_result').append('<td class="t6"><p>'+training_body_result_1+'</p>/<p>'+training_spirit_result_1+'</p>/<p>'+training_tactics_result_1+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+i+'.png"><br><p>'+training_body_result_2+'</p>/<p>'+training_spirit_result_2+'</p>/<p>'+training_tactics_result_2+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+j+'.png"><br><p>'+training_body_result_3+'</p>/<p>'+training_spirit_result_3+'</p>/<p>'+training_tactics_result_3+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+k+'.png"><br><p>'+training_body_result_4+'</p>/<p>'+training_spirit_result_4+'</p>/<p>'+training_tactics_result_4+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+l+'.png"><br><p>'+training_body_result_5+'</p>/<p>'+training_spirit_result_5+'</p>/<p>'+training_tactics_result_5+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+m+'.png"><br><p>'+training_body_result_6+'</p>/<p>'+training_spirit_result_6+'</p>/<p>'+training_tactics_result_6+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+n+'.png"><br></td>');
                                                }else{
                                                    $('.mini_calculation_result').addClass('training_false');

                                                    // for (var o = 1; o < 7; o++) {

                                                    //     //1回目の訓練結果を基礎値とする
                                                    //     var squadron_body    = training_body_result_6;
                                                    //     var squadron_spirit  = training_spirit_result_6;
                                                    //     var squadron_tactics = training_tactics_result_6;

                                                    //     if ( training_max - squadron_sum >= 40 ) {
                                                    //         //上限値に達していない場合
                                                    //         if ( o == 1 ){
                                                    //             //身体訓練
                                                    //             var training_body_result_7    = squadron_body + 40;
                                                    //             var training_spirit_result_7  = squadron_spirit;
                                                    //             var training_tactics_result_7 = squadron_tactics;
                                                    //         }else if ( o == 2 ){
                                                    //             //精神訓練
                                                    //             var training_body_result_7    = squadron_body;
                                                    //             var training_spirit_result_7  = squadron_spirit + 40;
                                                    //             var training_tactics_result_7 = squadron_tactics;
                                                    //         }else if ( o == 3 ){
                                                    //             //戦術訓練
                                                    //             var training_body_result_7    = squadron_body;
                                                    //             var training_spirit_result_7  = squadron_spirit;
                                                    //             var training_tactics_result_7 = squadron_tactics + 40;
                                                    //         }else if ( o == 4 ){
                                                    //             //身体+精神訓練
                                                    //             var training_body_result_7    = squadron_body + 20;
                                                    //             var training_spirit_result_7  = squadron_spirit + 20;
                                                    //             var training_tactics_result_7 = squadron_tactics;
                                                    //         }else if ( o == 5 ){
                                                    //             //身体+戦術訓練
                                                    //             var training_body_result_7    = squadron_body + 20;
                                                    //             var training_spirit_result_7  = squadron_spirit;
                                                    //             var training_tactics_result_7 = squadron_tactics + 20;
                                                    //         }else if ( o == 6 ){
                                                    //             //精神+戦術訓練
                                                    //             var training_body_result_7    = squadron_body;
                                                    //             var training_spirit_result_7  = squadron_spirit + 20;
                                                    //             var training_tactics_result_7 = squadron_tactics + 20;
                                                    //         };//end if (上限値に達してない場合)
                                                    //     }else{
                                                    //         //上限値に達してる場合
                                                    //         if ( o == 1 ) {
                                                    //             //単体訓練
                                                    //             if ( squadron_spirit + squadron_tactics < 40 ) {
                                                    //                 var training_body_result_7    = squadron_body;
                                                    //                 var training_spirit_result_7  = squadron_spirit;
                                                    //                 var training_tactics_result_7 = squadron_tactics;
                                                    //             }else{
                                                    //                 var training_body_result_7    = squadron_body + 40;
                                                    //                 if ( squadron_spirit <= 0 ) {
                                                    //                     var training_spirit_result_7  = squadron_spirit;
                                                    //                     var training_tactics_result_7 = squadron_tactics - 40;
                                                    //                 }else if ( squadron_tactics <= 0 ) {
                                                    //                     var training_spirit_result_7  = squadron_spirit - 40;
                                                    //                     var training_tactics_result_7 = squadron_tactics;
                                                    //                 }else{
                                                    //                     var training_spirit_result_7  = squadron_spirit - 20;
                                                    //                     var training_tactics_result_7 = squadron_tactics -20;
                                                    //                 }
                                                    //             }
                                                    //         }else if ( o == 2 ) {
                                                    //             //単体訓練
                                                    //             if ( squadron_body + squadron_tactics < 40 ) {
                                                    //                 var training_body_result_7    = squadron_body;
                                                    //                 var training_spirit_result_7  = squadron_spirit;
                                                    //                 var training_tactics_result_7 = squadron_tactics;
                                                    //             }else{
                                                    //                 var training_spirit_result_7  = squadron_spirit + 40;
                                                    //                 if ( squadron_body <= 0 ) {
                                                    //                     var training_body_result_7  = squadron_body;
                                                    //                     var training_tactics_result_7 = squadron_tactics - 40;
                                                    //                 }else if ( squadron_tactics <= 0 ) {
                                                    //                     var training_body_result_7  = squadron_body - 40;
                                                    //                     var training_tactics_result_7 = squadron_tactics;
                                                    //                 }else{
                                                    //                     var training_body_result_7  = squadron_body - 20;
                                                    //                     var training_tactics_result_7 = squadron_tactics -20;
                                                    //                 }
                                                    //             }
                                                    //         }else if ( o == 3 ) {
                                                    //             //単体訓練
                                                    //             if ( squadron_body + squadron_spirit < 40 ) {
                                                    //                 var training_body_result_7    = squadron_body;
                                                    //                 var training_spirit_result_7  = squadron_spirit;
                                                    //                 var training_tactics_result_7 = squadron_tactics;
                                                    //             }else{
                                                    //                 var training_tactics_result_7 = squadron_tactics + 40;
                                                    //                 if ( squadron_body <= 0 ) {
                                                    //                     var training_body_result_7  = squadron_body;
                                                    //                     var training_spirit_result_7 = squadron_spirit - 40;
                                                    //                 }else if ( squadron_spirit <= 0 ) {
                                                    //                     var training_body_result_7  = squadron_body - 40;
                                                    //                     var training_spirit_result_7 = squadron_spirit;
                                                    //                 }else{
                                                    //                     var training_body_result_7  = squadron_body - 20;
                                                    //                     var training_spirit_result_7 = squadron_spirit -20;
                                                    //                 }
                                                    //             }
                                                    //         }else{
                                                    //             //複合訓練
                                                    //             var training_body_result_7    = squadron_body    + eval('t00'+o+'_arr')[0];
                                                    //             var training_spirit_result_7  = squadron_spirit  + eval('t00'+o+'_arr')[1];
                                                    //             var training_tactics_result_7 = squadron_tactics + eval('t00'+o+'_arr')[2];
                                                    //             if ( training_body_result_7 < 0 || training_spirit_result_7 < 0 || training_tactics_result_7 < 0 ) {
                                                    //                 var training_body_result_7    = squadron_body;
                                                    //                 var training_spirit_result_7  = squadron_spirit;
                                                    //                 var training_tactics_result_7 = squadron_tactics;
                                                    //             };
                                                    //         };//end if

                                                    //     }//end if (上限値に達してない場合)

                                                    //     if ( after_body == training_body_result_7 && after_spirit == training_spirit_result_7 && after_tactics == training_tactics_result_7 ) {
                                                    //         $('.mini_calculation_result').addClass('training7_done');
                                                    //         $('.mini_calculation_result').append('<td class="t7"><p>'+training_body_result_1+'</p>/<p>'+training_spirit_result_1+'</p>/<p>'+training_tactics_result_1+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+i+'.png"><br><p>'+training_body_result_2+'</p>/<p>'+training_spirit_result_2+'</p>/<p>'+training_tactics_result_2+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+j+'.png"><br><p>'+training_body_result_3+'</p>/<p>'+training_spirit_result_3+'</p>/<p>'+training_tactics_result_3+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+k+'.png"><br><p>'+training_body_result_7+'</p>/<p>'+training_spirit_result_7+'</p>/<p>'+training_tactics_result_7+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+o+'.png"><br></td>');
                                                    //     }else{

                                                    //         for (var p = 1; p < 7; p++) {

                                                    //             //1回目の訓練結果を基礎値とする
                                                    //             var squadron_body    = training_body_result_7;
                                                    //             var squadron_spirit  = training_spirit_result_7;
                                                    //             var squadron_tactics = training_tactics_result_7;

                                                    //             if ( training_max - squadron_sum >= 40 ) {
                                                    //                 //上限値に達していない場合
                                                    //                 if ( p == 1 ){
                                                    //                     //身体訓練
                                                    //                     var training_body_result_8    = squadron_body + 40;
                                                    //                     var training_spirit_result_8  = squadron_spirit;
                                                    //                     var training_tactics_result_8 = squadron_tactics;
                                                    //                 }else if ( p == 2 ){
                                                    //                     //精神訓練
                                                    //                     var training_body_result_8    = squadron_body;
                                                    //                     var training_spirit_result_8  = squadron_spirit + 40;
                                                    //                     var training_tactics_result_8 = squadron_tactics;
                                                    //                 }else if ( p == 3 ){
                                                    //                     //戦術訓練
                                                    //                     var training_body_result_8    = squadron_body;
                                                    //                     var training_spirit_result_8  = squadron_spirit;
                                                    //                     var training_tactics_result_8 = squadron_tactics + 40;
                                                    //                 }else if ( p == 4 ){
                                                    //                     //身体+精神訓練
                                                    //                     var training_body_result_8    = squadron_body + 20;
                                                    //                     var training_spirit_result_8  = squadron_spirit + 20;
                                                    //                     var training_tactics_result_8 = squadron_tactics;
                                                    //                 }else if ( p == 5 ){
                                                    //                     //身体+戦術訓練
                                                    //                     var training_body_result_8    = squadron_body + 20;
                                                    //                     var training_spirit_result_8  = squadron_spirit;
                                                    //                     var training_tactics_result_8 = squadron_tactics + 20;
                                                    //                 }else if ( p == 6 ){
                                                    //                     //精神+戦術訓練
                                                    //                     var training_body_result_8    = squadron_body;
                                                    //                     var training_spirit_result_8  = squadron_spirit + 20;
                                                    //                     var training_tactics_result_8 = squadron_tactics + 20;
                                                    //                 };//end if (上限値に達してない場合)
                                                    //             }else{
                                                    //                 //上限値に達してる場合
                                                    //                 if ( p == 1 ) {
                                                    //                     //単体訓練
                                                    //                     if ( squadron_spirit + squadron_tactics < 40 ) {
                                                    //                         var training_body_result_8    = squadron_body;
                                                    //                         var training_spirit_result_8  = squadron_spirit;
                                                    //                         var training_tactics_result_8 = squadron_tactics;
                                                    //                     }else{
                                                    //                         var training_body_result_8    = squadron_body + 40;
                                                    //                         if ( squadron_spirit <= 0 ) {
                                                    //                             var training_spirit_result_8  = squadron_spirit;
                                                    //                             var training_tactics_result_8 = squadron_tactics - 40;
                                                    //                         }else if ( squadron_tactics <= 0 ) {
                                                    //                             var training_spirit_result_8  = squadron_spirit - 40;
                                                    //                             var training_tactics_result_8 = squadron_tactics;
                                                    //                         }else{
                                                    //                             var training_spirit_result_8  = squadron_spirit - 20;
                                                    //                             var training_tactics_result_8 = squadron_tactics -20;
                                                    //                         }
                                                    //                     }
                                                    //                 }else if ( p == 2 ) {
                                                    //                     //単体訓練
                                                    //                     if ( squadron_body + squadron_tactics < 40 ) {
                                                    //                         var training_body_result_8    = squadron_body;
                                                    //                         var training_spirit_result_8  = squadron_spirit;
                                                    //                         var training_tactics_result_8 = squadron_tactics;
                                                    //                     }else{
                                                    //                         var training_spirit_result_8  = squadron_spirit + 40;
                                                    //                         if ( squadron_body <= 0 ) {
                                                    //                             var training_body_result_8  = squadron_body;
                                                    //                             var training_tactics_result_8 = squadron_tactics - 40;
                                                    //                         }else if ( squadron_tactics <= 0 ) {
                                                    //                             var training_body_result_8  = squadron_body - 40;
                                                    //                             var training_tactics_result_8 = squadron_tactics;
                                                    //                         }else{
                                                    //                             var training_body_result_8  = squadron_body - 20;
                                                    //                             var training_tactics_result_8 = squadron_tactics -20;
                                                    //                         }
                                                    //                     }
                                                    //                 }else if ( p == 3 ) {
                                                    //                     //単体訓練
                                                    //                     if ( squadron_body + squadron_spirit < 40 ) {
                                                    //                         var training_body_result_8    = squadron_body;
                                                    //                         var training_spirit_result_8  = squadron_spirit;
                                                    //                         var training_tactics_result_8 = squadron_tactics;
                                                    //                     }else{
                                                    //                         var training_tactics_result_8 = squadron_tactics + 40;
                                                    //                         if ( squadron_body <= 0 ) {
                                                    //                             var training_body_result_8  = squadron_body;
                                                    //                             var training_spirit_result_8 = squadron_spirit - 40;
                                                    //                         }else if ( squadron_spirit <= 0 ) {
                                                    //                             var training_body_result_8  = squadron_body - 40;
                                                    //                             var training_spirit_result_8 = squadron_spirit;
                                                    //                         }else{
                                                    //                             var training_body_result_8  = squadron_body - 20;
                                                    //                             var training_spirit_result_8 = squadron_spirit -20;
                                                    //                         }
                                                    //                     }
                                                    //                 }else{
                                                    //                     //複合訓練
                                                    //                     var training_body_result_8    = squadron_body    + eval('t00'+p+'_arr')[0];
                                                    //                     var training_spirit_result_8  = squadron_spirit  + eval('t00'+p+'_arr')[1];
                                                    //                     var training_tactics_result_8 = squadron_tactics + eval('t00'+p+'_arr')[2];
                                                    //                     if ( training_body_result_8 < 0 || training_spirit_result_8 < 0 || training_tactics_result_8 < 0 ) {
                                                    //                         var training_body_result_8    = squadron_body;
                                                    //                         var training_spirit_result_8  = squadron_spirit;
                                                    //                         var training_tactics_result_8 = squadron_tactics;
                                                    //                     };
                                                    //                 };//end if

                                                    //             }//end if (上限値に達してない場合)

                                                    //             if ( after_body == training_body_result_8 && after_spirit == training_spirit_result_8 && after_tactics == training_tactics_result_8 ) {
                                                    //                 $('.mini_calculation_result').addClass('training8_done');
                                                    //                 $('.mini_calculation_result').append('<td class="t8"><p>'+training_body_result_1+'</p>/<p>'+training_spirit_result_1+'</p>/<p>'+training_tactics_result_1+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+i+'.png"><br><p>'+training_body_result_2+'</p>/<p>'+training_spirit_result_2+'</p>/<p>'+training_tactics_result_2+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+j+'.png"><br><p>'+training_body_result_3+'</p>/<p>'+training_spirit_result_3+'</p>/<p>'+training_tactics_result_3+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+k+'.png"><br><p>'+training_body_result_8+'</p>/<p>'+training_spirit_result_8+'</p>/<p>'+training_tactics_result_8+'</p><img class="icon_training" src="./img/squadron_calculater/icon_t00'+p+'.png"><br></td>');
                                                    //             }else{
                                                    //                 $('.mini_calculation_result').addClass('training_false');
                                                    //             }//end if
                                                    //         }//end for(p)

                                                    //     }//end if
                                                    // }//end for(o)

                                                }//end if
                                            }//end for(n)

                                        }//end if
                                    }//end for(m)

                                }//end if
                            }//end for(l)

                        }//end if
                    }//end for(k)

                }//end if
            }//end for(j)

        }//end if
    }//end for(i)



    if ( $('.mini_calculation_result').hasClass('training1_done') ) {
        $('.mini_calculation_result').find('.t8').remove();
        $('.mini_calculation_result').find('.t7').remove();
        $('.mini_calculation_result').find('.t6').remove();
        $('.mini_calculation_result').find('.t5').remove();
        $('.mini_calculation_result').find('.t4').remove();
        $('.mini_calculation_result').find('.t3').remove();
        $('.mini_calculation_result').find('.t2').remove();
        $('.mini_calculation_result').find('.t1:not(:first-child)').remove();
        $('.mini_calculation_result').find('.t1').before('<td></td>');
        $('.mini_calculation_result').removeClass('training8_done');
        $('.mini_calculation_result').removeClass('training7_done');
        $('.mini_calculation_result').removeClass('training6_done');
        $('.mini_calculation_result').removeClass('training5_done');
        $('.mini_calculation_result').removeClass('training4_done');
        $('.mini_calculation_result').removeClass('training3_done');
        $('.mini_calculation_result').removeClass('training2_done');
        $('.mini_calculation_result').removeClass('training_false');
    };

    if ( $('.mini_calculation_result').hasClass('training2_done') ) {
        $('.mini_calculation_result').find('.t8').remove();
        $('.mini_calculation_result').find('.t7').remove();
        $('.mini_calculation_result').find('.t6').remove();
        $('.mini_calculation_result').find('.t5').remove();
        $('.mini_calculation_result').find('.t4').remove();
        $('.mini_calculation_result').find('.t3').remove();
        $('.mini_calculation_result').find('.t2:not(:first-child)').remove();
        $('.mini_calculation_result').find('.t2').before('<td></td>');
        $('.mini_calculation_result').removeClass('training8_done');
        $('.mini_calculation_result').removeClass('training7_done');
        $('.mini_calculation_result').removeClass('training6_done');
        $('.mini_calculation_result').removeClass('training5_done');
        $('.mini_calculation_result').removeClass('training4_done');
        $('.mini_calculation_result').removeClass('training3_done');
        $('.mini_calculation_result').removeClass('training_false');
    };

    if ( $('.mini_calculation_result').hasClass('training3_done') ) {
        $('.mini_calculation_result').find('.t8').remove();
        $('.mini_calculation_result').find('.t7').remove();
        $('.mini_calculation_result').find('.t6').remove();
        $('.mini_calculation_result').find('.t5').remove();
        $('.mini_calculation_result').find('.t4').remove();
        $('.mini_calculation_result').find('.t3:not(:first-child)').remove();
        $('.mini_calculation_result').find('.t3').before('<td></td>');
        $('.mini_calculation_result').removeClass('training8_done');
        $('.mini_calculation_result').removeClass('training7_done');
        $('.mini_calculation_result').removeClass('training6_done');
        $('.mini_calculation_result').removeClass('training5_done');
        $('.mini_calculation_result').removeClass('training4_done');
        $('.mini_calculation_result').removeClass('training_false');
    };

    if ( $('.mini_calculation_result').hasClass('training4_done') ) {
        $('.mini_calculation_result').find('.t8').remove();
        $('.mini_calculation_result').find('.t7').remove();
        $('.mini_calculation_result').find('.t6').remove();
        $('.mini_calculation_result').find('.t5').remove();
        $('.mini_calculation_result').find('.t4:not(:first-child)').remove();
        $('.mini_calculation_result').find('.t4').before('<td></td>');
        $('.mini_calculation_result').removeClass('training8_done');
        $('.mini_calculation_result').removeClass('training7_done');
        $('.mini_calculation_result').removeClass('training6_done');
        $('.mini_calculation_result').removeClass('training5_done');
        $('.mini_calculation_result').removeClass('training_false');
    };

    if ( $('.mini_calculation_result').hasClass('training5_done') ) {
        $('.mini_calculation_result').find('.t8').remove();
        $('.mini_calculation_result').find('.t7').remove();
        $('.mini_calculation_result').find('.t6').remove();
        $('.mini_calculation_result').find('.t5:not(:first-child)').remove();
        $('.mini_calculation_result').find('.t5').before('<td></td>');
        $('.mini_calculation_result').removeClass('training8_done');
        $('.mini_calculation_result').removeClass('training7_done');
        $('.mini_calculation_result').removeClass('training6_done');
        $('.mini_calculation_result').removeClass('training_false');
    };

    if ( $('.mini_calculation_result').hasClass('training6_done') ) {
        $('.mini_calculation_result').find('.t8').remove();
        $('.mini_calculation_result').find('.t7').remove();
        $('.mini_calculation_result').find('.t6:not(:first-child)').remove();
        $('.mini_calculation_result').find('.t6').before('<td></td>');
        $('.mini_calculation_result').removeClass('training8_done');
        $('.mini_calculation_result').removeClass('training7_done');
        $('.mini_calculation_result').removeClass('training_false');
    };

    if ( $('.mini_calculation_result').hasClass('training7_done') ) {
        $('.mini_calculation_result').find('.t7').remove();
        $('.mini_calculation_result').find('.t7:not(:first-child)').remove();
        $('.mini_calculation_result').find('.t7').before('<td></td>');
        $('.mini_calculation_result').removeClass('training8_done');
        $('.mini_calculation_result').removeClass('training_false');
    };

    if ( $('.mini_calculation_result').hasClass('training8_done') ) {
        $('.mini_calculation_result').find('.t8:not(:first-child)').remove();
        $('.mini_calculation_result').find('.t8').before('<td></td>');
        $('.mini_calculation_result').removeClass('training_false');
    };

    if ( $('.mini_calculation_result').hasClass('training_false') ) {
        $('.mini_calculation_result').find('.training_false').before('<td></td>');
        $('.training_false').append('<td colspan="2" class="color_red">訓練6回以内で既定値を満たせません</td>')
    };

};
