Array.prototype.shuffle = function() {
    var i = this.length;
    while (i) {
        var j = Math.floor(Math.random() * i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

function tabViewSwithch () {
    $('.tab_switch').find('a').click(function() {
        $('.tab_switch').find('a').removeClass('current');
        $(this).addClass('current');

        $('#view_1').hide();
        $('#view_2').hide();
        $('#view_3').hide();

        var id = $(this).attr('id').slice(0,-5);
        $('#'+id).show();
    });
}

//                      村 狼 占 霊  狂 狩 共 狐
var jinrou_4A_array  = [2, 1, 1, 0, 0, 0, 0, 0],
    jinrou_5A_array  = [3, 1, 1, 0, 0, 0, 0, 0],
    jinrou_6A_array  = [4, 1, 1, 0, 0, 0, 0, 0],
    jinrou_7A_array  = [5, 1, 1, 0, 0, 0, 0, 0],
    jinrou_8A_array  = [5, 2, 1, 0, 0, 0, 0, 0],
    jinrou_9A_array  = [5, 2, 1, 1, 0, 0, 0, 0],
    jinrou_10A_array = [5, 2, 1, 1, 1, 0, 0, 0],
    jinrou_11A_array = [5, 2, 1, 1, 1, 1, 0, 0],
    jinrou_12A_array = [6, 2, 1, 1, 1, 1, 0, 0],
    jinrou_13A_array = [5, 2, 1, 1, 1, 1, 2, 0],
    jinrou_14A_array = [5, 2, 1, 1, 1, 1, 2, 1],
    jinrou_15A_array = [6, 2, 1, 1, 1, 1, 2, 1],
    jinrou_16A_array = [6, 3, 1, 1, 1, 1, 2, 1],
    jinrou_17A_array = [7, 3, 1, 1, 1, 1, 2, 1],
    jinrou_18A_array = [8, 3, 1, 1, 1, 1, 2, 1],
    jinrou_19A_array = [9, 3, 1, 1, 1, 1, 2, 1],
    jinrou_20A_array = [9, 4, 1, 1, 1, 1, 2, 1];

//                      村 狼 占 霊  狂 狩 共 狐
var jinrou_4B_array  = [2, 1, 1, 0, 0, 0, 0, 0],
    jinrou_5B_array  = [2, 1, 1, 0, 0, 0, 0, 1],
    jinrou_6B_array  = [3, 1, 1, 0, 0, 0, 0, 1],
    jinrou_7B_array  = [4, 1, 1, 0, 0, 0, 0, 1],
    jinrou_8B_array  = [5, 2, 1, 0, 0, 0, 0, 1],
    jinrou_9B_array  = [3, 2, 1, 1, 0, 1, 0, 1],
    jinrou_10B_array = [4, 2, 1, 1, 0, 1, 0, 1],
    jinrou_11B_array = [4, 2, 1, 1, 1, 1, 0, 1],
    jinrou_12B_array = [5, 2, 1, 1, 1, 1, 0, 1],
    jinrou_13B_array = [4, 2, 1, 1, 1, 1, 2, 1],
    jinrou_14B_array = [5, 2, 1, 1, 1, 1, 2, 1],
    jinrou_15B_array = [6, 2, 1, 1, 1, 1, 2, 1],
    jinrou_16B_array = [5, 3, 1, 1, 1, 1, 2, 2],
    jinrou_17B_array = [6, 3, 1, 1, 1, 1, 2, 2],
    jinrou_18B_array = [7, 3, 1, 1, 1, 1, 2, 2],
    jinrou_19B_array = [8, 3, 1, 1, 1, 1, 2, 2],
    jinrou_20B_array = [8, 4, 1, 1, 1, 1, 2, 2];

//                      村 狼 占 霊  狂 狩 共 狐
var jinrou_4C_array  = [1, 1, 1, 1, 0, 0, 0, 0],
    jinrou_5C_array  = [1, 1, 1, 0, 1, 1, 0, 0],
    jinrou_6C_array  = [0, 1, 1, 0, 3, 1, 0, 0],
    jinrou_7C_array  = [2, 1, 1, 1, 1, 1, 0, 0],
    jinrou_8C_array  = [1, 2, 1, 1, 1, 0, 2, 0],
    jinrou_9C_array  = [3, 1, 1, 1, 1, 1, 0, 1],
    jinrou_10C_array = [2, 2, 2, 1, 1, 1, 0, 1],
    jinrou_11C_array = [3, 2, 2, 1, 1, 1, 0, 1],
    jinrou_12C_array = [3, 2, 1, 1, 1, 1, 2, 1],
    jinrou_13C_array = [3, 2, 2, 1, 1, 1, 2, 1],
    jinrou_14C_array = [3, 2, 2, 1, 2, 1, 2, 1],
    jinrou_15C_array = [3, 3, 2, 1, 2, 1, 2, 1],
    jinrou_16C_array = [4, 3, 2, 1, 1, 1, 2, 2],
    jinrou_17C_array = [3, 3, 2, 2, 2, 1, 2, 2],
    jinrou_18C_array = [4, 3, 2, 2, 2, 1, 2, 2],
    jinrou_19C_array = [5, 3, 2, 2, 2, 1, 2, 2],
    jinrou_20C_array = [5, 4, 2, 2, 2, 1, 2, 2];

function roleExanpleCreate () {
    var insert_A = '';
    var insert_B = '';
    var insert_C = '';

    insert_A += '<tr><th>人数</th><th>村人</th><th>人狼</th><th>占師</th><th>霊能</th><th>狂人</th><th>狩人</th><th>共有</th><th>妖狐</th></tr>'
    insert_B += '<tr><th>人数</th><th>村人</th><th>人狼</th><th>占師</th><th>霊能</th><th>狂人</th><th>狩人</th><th>共有</th><th>妖狐</th></tr>'
    insert_C += '<tr><th>人数</th><th>村人</th><th>人狼</th><th>占師</th><th>霊能</th><th>狂人</th><th>狩人</th><th>共有</th><th>妖狐</th></tr>'

    for (var i = 4; i < 21; i++) {
        insert_A += '<tr>';
        insert_A += '<td>' + i + '人</td>';
        insert_A += '<td>' + eval('jinrou_'+i+'A_array[0]') + '</td>';
        insert_A += '<td>' + eval('jinrou_'+i+'A_array[1]') + '</td>';
        insert_A += '<td>' + eval('jinrou_'+i+'A_array[2]') + '</td>';
        insert_A += '<td>' + eval('jinrou_'+i+'A_array[3]') + '</td>';
        insert_A += '<td>' + eval('jinrou_'+i+'A_array[4]') + '</td>';
        insert_A += '<td>' + eval('jinrou_'+i+'A_array[5]') + '</td>';
        insert_A += '<td>' + eval('jinrou_'+i+'A_array[6]') + '</td>';
        insert_A += '<td>' + eval('jinrou_'+i+'A_array[7]') + '</td>';
        insert_A += '</tr>';
    }
    for (var i = 4; i < 21; i++) {
        insert_B += '<tr>';
        insert_B += '<td>' + i + '人</td>';
        insert_B += '<td>' + eval('jinrou_'+i+'B_array[0]') + '</td>';
        insert_B += '<td>' + eval('jinrou_'+i+'B_array[1]') + '</td>';
        insert_B += '<td>' + eval('jinrou_'+i+'B_array[2]') + '</td>';
        insert_B += '<td>' + eval('jinrou_'+i+'B_array[3]') + '</td>';
        insert_B += '<td>' + eval('jinrou_'+i+'B_array[4]') + '</td>';
        insert_B += '<td>' + eval('jinrou_'+i+'B_array[5]') + '</td>';
        insert_B += '<td>' + eval('jinrou_'+i+'B_array[6]') + '</td>';
        insert_B += '<td>' + eval('jinrou_'+i+'B_array[7]') + '</td>';
        insert_B += '</tr>';
    }
    for (var i = 4; i < 21; i++) {
        insert_C += '<tr>';
        insert_C += '<td>' + i + '人</td>';
        insert_C += '<td>' + eval('jinrou_'+i+'C_array[0]') + '</td>';
        insert_C += '<td>' + eval('jinrou_'+i+'C_array[1]') + '</td>';
        insert_C += '<td>' + eval('jinrou_'+i+'C_array[2]') + '</td>';
        insert_C += '<td>' + eval('jinrou_'+i+'C_array[3]') + '</td>';
        insert_C += '<td>' + eval('jinrou_'+i+'C_array[4]') + '</td>';
        insert_C += '<td>' + eval('jinrou_'+i+'C_array[5]') + '</td>';
        insert_C += '<td>' + eval('jinrou_'+i+'C_array[6]') + '</td>';
        insert_C += '<td>' + eval('jinrou_'+i+'C_array[7]') + '</td>';
        insert_C += '</tr>';
    }

    $('.jinrou_A_table').append(insert_A);
    $('.jinrou_B_table').append(insert_B);
    $('.jinrou_C_table').append(insert_C);

    var countCell = $('.jinrou_role_table').find('td').length;

    for (var i = 0; i < countCell; i++) {
        if ( $('.jinrou_role_table').find('td').eq(i).text() == '0' ) {
            $('.jinrou_role_table').find('td').eq(i).text('─')
        }
    }
}

function roleInput () {
    var countMember = $('select[name="join_member"]').val();
    var roleType    = $('select[name="role_type"]').val();
    var roleArray   = eval('jinrou_'+countMember+roleType+'_array');

    $('select[name="jinrou"]').val(roleArray[1]);
    $('select[name="uranai"]').val(roleArray[2]);
    $('select[name="reinou"]').val(roleArray[3]);
    $('select[name="kyoujin"]').val(roleArray[4]);
    $('select[name="kariudo"]').val(roleArray[5]);
    $('select[name="kyouyuu"]').val(roleArray[6]);
    $('select[name="youko"]').val(roleArray[7]);
    $('select[name="free_1"]').val(0);
    $('select[name="free_2"]').val(0);
    $('select[name="free_3"]').val(0);
}

function roleCount () {

    $('.role_text_error').hide();

    var countMember = $('select[name="join_member"]').val();

    var jinrou   = $('select[name="jinrou"]').val();
    var uranai   = $('select[name="uranai"]').val();
    var reinou   = $('select[name="reinou"]').val();
    var kyoujin  = $('select[name="kyoujin"]').val();
    var kariudo  = $('select[name="kariudo"]').val();
    var kyouyuu  = $('select[name="kyouyuu"]').val();
    var youko    = $('select[name="youko"]').val();
    var free_1   = $('select[name="free_1"]').val();
    var free_2   = $('select[name="free_2"]').val();
    var free_3   = $('select[name="free_3"]').val();
    var murabito = countMember - jinrou - uranai - reinou - kyoujin - kariudo - kyouyuu - youko - free_1 - free_2 - free_3;

    var free_1_name = $('.free_1_name').val();
    var free_2_name = $('.free_2_name').val();
    var free_3_name = $('.free_3_name').val();

    var insert_text = '';

    insert_text += '/y ';

    insert_text += '狼'+jinrou;
    if ( kyoujin > 0 ) {
        insert_text += '/';
        insert_text += '狂'+kyoujin;
    }
    if ( youko > 0 ) {
        insert_text += '/';
        insert_text += '狐'+youko;
    }
    if ( uranai > 0 ) {
        insert_text += '/';
        insert_text += '占'+uranai;
    }
    if ( reinou > 0 ) {
        insert_text += '/';
        insert_text += '霊'+reinou;
    }
    if ( kariudo > 0 ) {
        insert_text += '/';
        insert_text += '狩'+kariudo;
    }
    if ( kyouyuu > 0 ) {
        insert_text += '/';
        insert_text += '共'+kyouyuu;
    }
    if ( free_1 > 0 ) {
        insert_text += '/';
        insert_text += free_1_name.slice(0,1)+free_1;
    }
    if ( free_2 > 0 ) {
        insert_text += '/';
        insert_text += free_2_name.slice(0,1)+free_2;
    }
    if ( free_3 > 0 ) {
        insert_text += '/';
        insert_text += free_3_name.slice(0,1)+free_3;
    }
    if ( murabito > 0 ) {
        insert_text += '/';
        insert_text += '村'+murabito;
    }
    if ( murabito < 0 ) {
        insert_text += '/';
        insert_text += '村'+murabito;
        // insert_text += '/';
        // insert_text += '<p class="color_red"> 役職人数が参加人数を超えています</p>';
        $('.role_text_error').show();
    }

    $('.role_text_output').val(insert_text);

    var insert_image = '';

    for (var i = 0; i < jinrou; i++) {
        insert_image += '<img src="./img/jinrou_gm_tool/icon_jinrou.png">';
    }
    for (var i = 0; i < kyoujin; i++) {
        insert_image += '<img src="./img/jinrou_gm_tool/icon_kyoujin.png">';
    }
    for (var i = 0; i < youko; i++) {
        insert_image += '<img src="./img/jinrou_gm_tool/icon_youko.png">';
    }
    for (var i = 0; i < uranai; i++) {
        insert_image += '<img src="./img/jinrou_gm_tool/icon_uranai.png">';
    }
    for (var i = 0; i < reinou; i++) {
        insert_image += '<img src="./img/jinrou_gm_tool/icon_reinou.png">';
    }
    for (var i = 0; i < kariudo; i++) {
        insert_image += '<img src="./img/jinrou_gm_tool/icon_kariudo.png">';
    }
    if ( kyouyuu == 2 ) {
        insert_image += '<img src="./img/jinrou_gm_tool/icon_kyouyuu_1.png">';
        insert_image += '<img src="./img/jinrou_gm_tool/icon_kyouyuu_2.png">';
    }
    if ( kyouyuu == 3 ) {
        insert_image += '<img src="./img/jinrou_gm_tool/icon_kyouyuu_1.png">';
        insert_image += '<img src="./img/jinrou_gm_tool/icon_kyouyuu_2.png">';
        insert_image += '<img src="./img/jinrou_gm_tool/icon_kyouyuu_1.png">';
    }
    if ( kyouyuu == 4 ) {
        insert_image += '<img src="./img/jinrou_gm_tool/icon_kyouyuu_1.png">';
        insert_image += '<img src="./img/jinrou_gm_tool/icon_kyouyuu_2.png">';
        insert_image += '<img src="./img/jinrou_gm_tool/icon_kyouyuu_1.png">';
        insert_image += '<img src="./img/jinrou_gm_tool/icon_kyouyuu_2.png">';
    }
    for (var i = 0; i < free_1; i++) {
        insert_image += '<img src="./img/jinrou_gm_tool/icon_free_1.png">';
    }
    for (var i = 0; i < free_2; i++) {
        insert_image += '<img src="./img/jinrou_gm_tool/icon_free_2.png">';
    }
    for (var i = 0; i < free_3; i++) {
        insert_image += '<img src="./img/jinrou_gm_tool/icon_free_3.png">';
    }
    for (var i = 0; i < murabito; i++) {
        insert_image += '<img src="./img/jinrou_gm_tool/icon_murabito.png">';
    }

    $('.role_image_output').html(insert_image);
}

function inputNameForm () {
    var countMember = $('select[name="join_member"]').val();

    //ユーザー名を配列で回収
    var memberName_array = [];
    for (i=0; i<countMember; i++) {
        var name = $('.member_and_role_list').find('.name').eq(i).val();
        memberName_array.push(name);
    };

    var insert_cell = '';

    insert_cell += '<tr><th></th><th>参加者名</th><th>配役</th></tr>';

    for (var i = 0; i < countMember; i++) {
        insert_cell += '<tr>';
        if ( i == 0 ) {
            insert_cell += '<td>GM</td>';
        }else{
            insert_cell += '<td>'+i+'</td>';
        }
        insert_cell += '<td><input class="name" type="text"></td>';
        insert_cell += '<td><p class="role">-</p></td></tr>';
        insert_cell += '</tr>';
    }

    $('.member_and_role_list').html(insert_cell);

    //配列で回収したユーザー名を出力
    for (i=0; i<countMember; i++) {
        if ( memberName_array[i] == '' || memberName_array[i] === undefined) {
            if ( i == 0 ) {
                $('.member_and_role_list').find('.name').eq(i).val('GMユーザー名');
            }else{
                $('.member_and_role_list').find('.name').eq(i).val('ユーザー名'+i);
            }
        }else{
            $('.member_and_role_list').find('.name').eq(i).val(memberName_array[i]);
        }
    }
}

function assignRole () {
    $('.role_assign_error').hide();

    var role_array = [];

    var countMember = $('select[name="join_member"]').val();

    var jinrou   = $('select[name="jinrou"]').val();
    var uranai   = $('select[name="uranai"]').val();
    var reinou   = $('select[name="reinou"]').val();
    var kyoujin  = $('select[name="kyoujin"]').val();
    var kariudo  = $('select[name="kariudo"]').val();
    var kyouyuu  = $('select[name="kyouyuu"]').val();
    var youko    = $('select[name="youko"]').val();
    var free_1   = $('select[name="free_1"]').val();
    var free_2   = $('select[name="free_2"]').val();
    var free_3   = $('select[name="free_3"]').val();
    var murabito = countMember - jinrou - uranai - reinou - kyoujin - kariudo - kyouyuu - youko - free_1 - free_2 - free_3;

    var free_1_name = $('.free_1_name').val();
    var free_2_name = $('.free_2_name').val();
    var free_3_name = $('.free_3_name').val();

    for (var i = 0; i < jinrou; i++) {
        role_array.push('人狼');
    }
    for (var i = 0; i < kyoujin; i++) {
        role_array.push('狂人');
    }
    for (var i = 0; i < youko; i++) {
        role_array.push('妖狐');
    }
    for (var i = 0; i < uranai; i++) {
        role_array.push('占師');
    }
    for (var i = 0; i < reinou; i++) {
        role_array.push('霊能');
    }
    for (var i = 0; i < kariudo; i++) {
        role_array.push('狩人');
    }
    for (var i = 0; i < kyouyuu; i++) {
        role_array.push('共有');
    }
    for (var i = 0; i < free_1; i++) {
        role_array.push(free_1_name);
    }
    for (var i = 0; i < free_2; i++) {
        role_array.push(free_2_name);
    }
    for (var i = 0; i < free_3; i++) {
        role_array.push(free_3_name);
    }
    for (var i = 0; i < murabito; i++) {
        role_array.push('村人');
    }

    //役職配列を一次シャッフル
    role_array.shuffle();

    //役欠けなし/あり判定後の二次シャッフル
    if ( $('input[name="role_lost"].ng').prop('checked') ) {
        if ( murabito == 0 ) {
            $('.role_assign_error').show();
        }
        shuffleRoleLost_no();
    }
    if ( $('input[name="role_lost"].ok').prop('checked') ) {
        shuffleRoleLost_ok();
    }

    //役欠けなし
    function shuffleRoleLost_no () {
        if ( role_array[0] != '村人' ) {
            role_array.shuffle();
            shuffleRoleLost_no();
        }
    }

    //役欠けあり
    function shuffleRoleLost_ok () {
        if ( role_array[0] == '人狼' || role_array[0] == '妖狐' ) {
            role_array.shuffle();
            shuffleRoleLost_ok();
        }
    }

    var jinrou_array   = [];
    var kyoujin_array  = [];
    var youko_array    = [];
    var uranai_array   = [];
    var reinou_array   = [];
    var kariudo_array  = [];
    var kyouyuu_array  = [];
    var free_1_array   = [];
    var free_2_array   = [];
    var free_3_array   = [];
    var murabito_array = [];

    for (var i = 0; i < countMember; i++) {
        $('.role').eq(i).html(role_array[i]);
        var name = $('.name').eq(i).val();

        switch ( $('.role').eq(i).text() ) {
            case '人狼':
                $('.role').eq(i).css('background', '#f44');
                jinrou_array.push(name);
                break;
            case '狂人':
                $('.role').eq(i).css('background', '#f44');
                kyoujin_array.push(name);
                break;
            case '妖狐':
                $('.role').eq(i).css('background', '#ff4');
                youko_array.push(name);
                break;
            case '占師':
                $('.role').eq(i).css('background', '#0ff');
                uranai_array.push(name);
                break;
            case '霊能':
                $('.role').eq(i).css('background', '#0ff');
                reinou_array.push(name);
                break;
            case '狩人':
                $('.role').eq(i).css('background', '#0ff');
                kariudo_array.push(name);
                break;
            case '共有':
                $('.role').eq(i).css('background', '#08f');
                kyouyuu_array.push(name);
                break;
            case free_1_name:
                $('.role').eq(i).css('background', '#0f3');
                free_1_array.push(name);
                break;
            case free_2_name:
                $('.role').eq(i).css('background', '#0f3');
                free_2_array.push(name);
                break;
            case free_3_name:
                $('.role').eq(i).css('background', '#0f3');
                free_3_array.push(name);
                break;
            case '村人':
                $('.role').eq(i).css('background', '#ccc');
                murabito_array.push(name);
                break;
        }
    }

    insert_1 = '';
    insert_2 = '';

    insert_1 += '/y ';
    insert_2 += '/y ';

    if ( jinrou_array.length > 0 ) {
        insert_1 += '人狼：';
        for (var i = 0; i < jinrou_array.length; i++) {
            insert_1 += jinrou_array[i];
            if ( i != (jinrou_array.length-1) ) {
                insert_1 += '、';
            }else{
                insert_1 += '　　';
            }
        }
    }
    if ( kyoujin_array.length > 0 ) {
        insert_1 += '狂人：';
        for (var i = 0; i < kyoujin_array.length; i++) {
            insert_1 += kyoujin_array[i];
            if ( i != (kyoujin_array.length-1) ) {
                insert_1 += '、';
            }else{
                insert_1 += '　　';
            }
        }
    }
    if ( youko_array.length > 0 ) {
        insert_1 += '妖狐：';
        for (var i = 0; i < youko_array.length; i++) {
            insert_1 += youko_array[i];
            if ( i != (youko_array.length-1) ) {
                insert_1 += '、';
            }else{
                insert_1 += '　　';
            }
        }
    }
    if ( free_1_array.length > 0 ) {
        insert_1 += free_1_name+'：';
        for (var i = 0; i < free_1_array.length; i++) {
            insert_1 += free_1_array[i];
            if ( i != (free_1_array.length-1) ) {
                insert_1 += '、';
            }else{
                insert_1 += '　　';
            }
        }
    }
    if ( free_2_array.length > 0 ) {
        insert_1 += free_2_name+'：';
        for (var i = 0; i < free_2_array.length; i++) {
            insert_1 += free_2_array[i];
            if ( i != (free_2_array.length-1) ) {
                insert_1 += '、';
            }else{
                insert_1 += '　　';
            }
        }
    }
    if ( free_3_array.length > 0 ) {
        insert_1 += free_3_name+'：';
        for (var i = 0; i < free_3_array.length; i++) {
            insert_1 += free_3_array[i];
            if ( i != (free_3_array.length-1) ) {
                insert_1 += '、';
            }else{
                insert_1 += '　　';
            }
        }
    }

    if ( uranai_array.length > 0 ) {
        insert_2 += '占師：';
        for (var i = 0; i < uranai_array.length; i++) {
            insert_2 += uranai_array[i];
            if ( i != (uranai_array.length-1) ) {
                insert_2 += '、';
            }else{
                insert_2 += '　　';
            }
        }
    }
    if ( reinou_array.length > 0 ) {
        insert_2 += '霊能：';
        for (var i = 0; i < reinou_array.length; i++) {
            insert_2 += reinou_array[i];
            if ( i != (reinou_array.length-1) ) {
                insert_2 += '、';
            }else{
                insert_2 += '　　';
            }
        }
    }
    if ( kariudo_array.length > 0 ) {
        insert_2 += '狩人：';
        for (var i = 0; i < kariudo_array.length; i++) {
            insert_2 += kariudo_array[i];
            if ( i != (kariudo_array.length-1) ) {
                insert_2 += '、';
            }else{
                insert_2 += '　　';
            }
        }
    }
    if ( kyouyuu_array.length > 0 ) {
        insert_2 += '共有：';
        for (var i = 0; i < kyouyuu_array.length; i++) {
            insert_2 += kyouyuu_array[i];
            if ( i != (kyouyuu_array.length-1) ) {
                insert_2 += '、';
            }else{
                insert_2 += '　　';
            }
        }
    }

    $('.role_detail_1').val(insert_1);
    $('.role_detail_2').val(insert_2);

    playerCheckListMake( jinrou_array, kyoujin_array, youko_array, uranai_array, reinou_array, kariudo_array, kyouyuu_array, free_1_array, free_2_array, free_3_array, murabito_array );
}

function voteAggregate () {

    var voteText = $('#vote_text').val();
    $('#vote_box1').text(voteText);

    $('#vote_box1').each(function(){
        //タイムスタンプ削除
        var txt = $(this).text();
        $(this).text(
            txt.replace(/\[[0-9]{2}:[0-9]{2}\] /g,"")
        );
        //無関係なログを除外
        var txt = $(this).text();
        $(this).text(
            txt.replace(/(^|\n)(?!.*を指さした).*/g,"$1")
        );
        //空行を削除
        var txt = $(this).text();
        $(this).text(
            txt.replace(/(^|\n)\n*/g,"$1")
        );
        //を指差した。削除
        var txt = $(this).text();
        $(this).text(
            txt.replace(/を指さした。/g,"")
        );
    });

    var calText = $('#vote_box1').val();

    //編集結果を一行ずつ処理
    var text  = document.getElementById('vote_box1').value.replace(/\r\n|\r/g, "\n");
    var lines = text.split( '\n' );
    var voteCount = lines.length;
    var voteArray = [];
    var voteUniqueArray = [];

    for ( var i = 0; i < voteCount; i++ ) {
        value = lines[i];

        //投票数分、配列にぶっこむ
        voteArray.push( value );

        //重複チェックし、重複が無ければ配列にぶっこむ
        if ( -1 == $.inArray( value, voteUniqueArray ) ) {
            voteUniqueArray.push( value );
        }
    }

    voteUniqueArray.sort();
    $('#vote_box1').text('');

    $.each(voteUniqueArray, function(i) {
        if( i != voteUniqueArray.length - 1 ){
            $('#vote_box1').append( voteUniqueArray[i] + '\n');
        }else{
            $('#vote_box1').append( voteUniqueArray[i]);
        }
    });

    var voteText2 = $('#vote_box1').val();
    $('#vote_box2').text(voteText2);

    $('#vote_box1').each(function(){
        //投票先の削除
        var txt = $(this).text();
        $(this).text(
            txt.replace(/は[A-Za-z']+ [A-Za-z']+/g,"")
        );
    });

    //編集結果を一行ずつ処理
    var text  = document.getElementById('vote_box1').value.replace(/\r\n|\r/g, "\n");
    var lines = text.split( '\n' );
    var voteCount = lines.length;
    var userArray = [];

    for ( var i = 0; i < voteCount; i++ ) {
        value = lines[i];

        //投票数分、配列にぶっこむ
        userArray.push( value );
    }

    $('#vote_box2').each(function(){
        //投票先の削除
        var txt = $(this).text();
        $(this).text(
            txt.replace(/[A-Za-z']+ [A-Za-z']+は/g,"")
        );
    });

    //編集結果を一行ずつ処理
    var text  = document.getElementById('vote_box2').value.replace(/\r\n|\r/g, "\n");
    var lines = text.split( '\n' );
    var voteCount = lines.length;
    var voteArray = [];

    for ( var i = 0; i < voteCount; i++ ) {
        value = lines[i];

        //投票数分、配列にぶっこむ
        voteArray.push( value );
    }

    // ユニーク数分eachして、投票数を数える
    var voteLastArray = new Array();

    $.each(userArray, function(i, val) {
        var obj = {};
        var count = 0;

        for ( var i = 0; i < userArray.length; i++ ) {
            if ( val == voteArray[i] ){
                count ++;
            }
        }

        // 名前と投票数を連想配列にぶっこむ
        obj.name=val;
        obj.vote=count;
        voteLastArray.push( obj );
    });

    // 投票数を降順でソート
    voteLastArray.sort(
        function(a,b){
            var aName = a["vote"];
            var bName = b["vote"];
                if( aName < bName ) return 1;
                if( aName > bName ) return -1;
            return 0;
        }
    );

    //結果への出力
    var insert_result = '';
    insert_result += '/y ≪有効投票数'+voteCount+'票≫ <wait.2>\n'

    $.each(userArray, function(i) {
        insert_result += '/y ';
        insert_result += voteLastArray[i].name;
        insert_result += ' (' + voteLastArray[i].vote + '票) ⇒ ';
        for (var j = 0; j < userArray.length; j++) {
            if ( voteLastArray[i].name == userArray[j] ) {
                insert_result += voteArray[j] + ' ';
            }
        }
        insert_result += '<wait.2>';
        insert_result += '\n';
    });

    $('#vote_result').val(insert_result);
}

function stopWatch() {
    var sec = 0;
    var min = 0;
    var hour = 0;

    var timer;

    // スタート
    $('#start').click(function() {
        // 00:00:00から開始
        sec = 0;
        min = 0;
        hour = 0;
        $('#clock').html('00:00:00');
        timer = setInterval(countup, 1000);

        $(this).attr('disabled', 'disabled');
        $('#stop,#reset').removeAttr('disabled');
    });

    // ストップ
    $('#stop').click(function() {
        // 一時停止
        clearInterval(timer);

        $(this).attr('disabled', 'disabled');
        $('#restart').removeAttr('disabled');
    });

    // リスタート
    $('#restart').click(function() {
        // 一時停止から再開
        timer = setInterval(countup, 1000);

        $(this).attr('disabled', 'disabled');
        $('#stop').removeAttr('disabled');
    });

    // リセット
    $('#reset').click(function() {
        // 初期状態
        sec = 0;
        min = 0;
        hour = 0;
        $('#clock').html('00:00:00');
        clearInterval(timer);

        $('#stop,#restart,#reset').attr('disabled', 'disabled');
        $('#start').removeAttr('disabled');
    });

    // カウントアップ
    function countup(){
        sec += 1;

        if (sec > 59) {
          sec = 0;
          min += 1;
        }

        if (min > 59) {
          min = 0;
          hour += 1;
        }

        // 0埋め
        sec_number = ('0' + sec).slice(-2);
        min_number = ('0' + min).slice(-2);
        hour_number = ('0' + hour).slice(-2);

        $('#clock').html(hour_number + ':' +  min_number + ':' + sec_number);
    }
}

function playerCheckListMake (jinrou_array, kyoujin_array, youko_array, uranai_array, reinou_array, kariudo_array, kyouyuu_array, free_1_array, free_2_array, free_3_array, murabito_array) {

    var　free_1_name   = $('.free_1_name').val();
    var　free_2_name   = $('.free_2_name').val();
    var　free_3_name   = $('.free_3_name').val();
    var insert_list   = '';
    var insert_parts1 = '<td><span class="alive_status alive">生存</span></td>';
    var insert_parts2 = '<td><a class="btn_S action_tsuri">吊</a><a class="btn_S action_kami">噛</a><span class="text_tsuri link">吊</span><span class="text_kami link">噛</span></td>';
    var insert_parts3 = '<td><a class="btn_S action_tsuri">吊</a><a class="btn_S action_noroi">呪</a><span class="text_tsuri link">吊</span><span class="text_noroi link">呪</span></td>';

    insert_list += '<tr>';
    insert_list += '<th>ユーザー名</th>';
    insert_list += '<th>状態</th>';
    insert_list += '<th>役職</th>';
    insert_list += '<th>一日目</th>';
    insert_list += '<th>二日目</th>';
    insert_list += '<th>三日目</th>';
    insert_list += '<th>四日目</th>';
    insert_list += '<th>五日目</th>';
    insert_list += '<th>六日目</th>';
    insert_list += '<th>七日目</th>';
    insert_list += '<th>八日目</th>';
    insert_list += '<th>九日目</th>';
    insert_list += '<th>十日目</th>';
    insert_list += '</tr>';

    if ( jinrou_array.length > 0 ) {
        for (var i = 0; i < jinrou_array.length; i++) {
            insert_list += '<tr class="jinrou">';
            insert_list += '<td>';
            insert_list += '<img src="./img/jinrou_gm_tool/icon_jinrou.png" width="20"> ';
            insert_list += jinrou_array[i];
            insert_list += '</td>';
            insert_list += '<td class="role">人狼</td>';
            insert_list += insert_parts1;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += '</tr>';
        }
    }
    if ( kyoujin_array.length > 0 ) {
        for (var i = 0; i < kyoujin_array.length; i++) {
            insert_list += '<tr class="kyoujin">';
            insert_list += '<td>';
            insert_list += '<img src="./img/jinrou_gm_tool/icon_kyoujin.png" width="20"> ';
            insert_list += kyoujin_array[i];
            insert_list += '</td>';
            insert_list += '<td class="role">狂人</td>';
            insert_list += insert_parts1;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += '</tr>';
        }
    }
    if ( youko_array.length > 0 ) {
        for (var i = 0; i < youko_array.length; i++) {
            insert_list += '<tr class="youko">';
            insert_list += '<td>';
            insert_list += '<img src="./img/jinrou_gm_tool/icon_youko.png" width="20"> ';
            insert_list += youko_array[i];
            insert_list += '</td>';
            insert_list += '<td class="role">妖狐</td>';
            insert_list += insert_parts1;
            insert_list += insert_parts3 + insert_parts3 + insert_parts3 + insert_parts3 + insert_parts3;
            insert_list += insert_parts3 + insert_parts3 + insert_parts3 + insert_parts3 + insert_parts3;
            insert_list += '</tr>';
        }
    }
    if ( uranai_array.length > 0 ) {
        for (var i = 0; i < uranai_array.length; i++) {
            insert_list += '<tr class="uranai">';
            insert_list += '<td>';
            insert_list += '<img src="./img/jinrou_gm_tool/icon_uranai.png" width="20"> ';
            insert_list += uranai_array[i];
            insert_list += '</td>';
            insert_list += '<td class="role">占師</td>';
            insert_list += insert_parts1;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += '</tr>';
        }
    }
    if ( reinou_array.length > 0 ) {
        for (var i = 0; i < reinou_array.length; i++) {
            insert_list += '<tr class="reinou">';
            insert_list += '<td>';
            insert_list += '<img src="./img/jinrou_gm_tool/icon_reinou.png" width="20"> ';
            insert_list += reinou_array[i];
            insert_list += '</td>';
            insert_list += '<td class="role">霊能</td>';
            insert_list += insert_parts1;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += '</tr>';
        }
    }
    if ( kariudo_array.length > 0 ) {
        for (var i = 0; i < kariudo_array.length; i++) {
            insert_list += '<tr class="kariudo">';
            insert_list += '<td>';
            insert_list += '<img src="./img/jinrou_gm_tool/icon_kariudo.png" width="20"> ';
            insert_list += kariudo_array[i];
            insert_list += '</td>';
            insert_list += '<td class="role">狩人</td>';
            insert_list += insert_parts1;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += '</tr>';
        }
    }
    if ( kyouyuu_array.length > 0 ) {
        for (var i = 0; i < kyouyuu_array.length; i++) {
            insert_list += '<tr class="kyouyuu">';
            insert_list += '<td>';
            if ( i == 1 || i == 3 ) {
                insert_list += '<img src="./img/jinrou_gm_tool/icon_kyouyuu_1.png" width="20"> ';
            }else{
                insert_list += '<img src="./img/jinrou_gm_tool/icon_kyouyuu_2.png" width="20"> ';
            }
            insert_list += kyouyuu_array[i];
            insert_list += '</td>';
            insert_list += '<td class="role">共有</td>';
            insert_list += insert_parts1;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += '</tr>';
        }
    }
    if ( free_1_array.length > 0 ) {
        for (var i = 0; i < free_1_array.length; i++) {
            insert_list += '<tr class="free_1">';
            insert_list += '<td>';
            insert_list += '<img src="./img/jinrou_gm_tool/icon_free_1.png" width="20"> ';
            insert_list += free_1_array[i];
            insert_list += '</td>';
            insert_list += '<td class="role">'+free_1_name+'</td>';
            insert_list += insert_parts1;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += '</tr>';
        }
    }
    if ( free_2_array.length > 0 ) {
        for (var i = 0; i < free_2_array.length; i++) {
            insert_list += '<tr class="free_2">';
            insert_list += '<td>';
            insert_list += '<img src="./img/jinrou_gm_tool/icon_free_2.png" width="20"> ';
            insert_list += free_2_array[i];
            insert_list += '</td>';
            insert_list += '<td class="role">'+free_2_name+'</td>';
            insert_list += insert_parts1;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += '</tr>';
        }
    }
    if ( free_3_array.length > 0 ) {
        for (var i = 0; i < free_3_array.length; i++) {
            insert_list += '<tr class="free_3">';
            insert_list += '<td>';
            insert_list += '<img src="./img/jinrou_gm_tool/icon_free_3.png" width="20"> ';
            insert_list += free_3_array[i];
            insert_list += '</td>';
            insert_list += '<td class="role">'+free_3_name+'</td>';
            insert_list += insert_parts1;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += '</tr>';
        }
    }
    if ( murabito_array.length > 0 ) {
        for (var i = 0; i < murabito_array.length; i++) {
            insert_list += '<tr class="murabito">';
            insert_list += '<td>';
            insert_list += '<img src="./img/jinrou_gm_tool/icon_murabito.png" width="20"> ';
            insert_list += murabito_array[i];
            insert_list += '</td>';
            insert_list += '<td class="role">村人</td>';
            insert_list += insert_parts1;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2 + insert_parts2;
            insert_list += '</tr>';
        }
    }

    $('#player_check_list').find('tr').remove();
    $('#player_check_list').append(insert_list);

    playerCheckListAliveCount();
}

function playerCheckListDetail () {
    playerCheckListAliveCount();

    $(document).on('click', '#player_check_list .btn_S',function(){
        if ( $(this).hasClass('action_tsuri') ) {
            var self = $(this);
            actionTsuri(self);
            playerCheckListAliveCount();
        }else if ( $(this).hasClass('action_kami') ) {
            var self = $(this);
            actionKami(self);
            playerCheckListAliveCount();
        }else if ( $(this).hasClass('action_noroi') ) {
            var self = $(this);
            actionNoroi(self);
            playerCheckListAliveCount();
        }
    });

    function actionTsuri (self) {
        self.parents('tr').find('.alive_status').removeClass('alive').addClass('deaded').text('死亡').css('color', 'red');
        self.parents('tr').find('.action_tsuri').hide();
        self.parents('tr').find('.action_kami').hide();
        self.parents('tr').find('.action_noroi').hide();
        self.parents('td').find('.text_tsuri').show();
    }

    function actionKami (self) {
        self.parents('tr').find('.alive_status').removeClass('alive').addClass('deaded').text('死亡').css('color', 'red');
        self.parents('tr').find('.action_tsuri').hide();
        self.parents('tr').find('.action_kami').hide();
        self.parents('td').find('.text_kami').show();
    }

    function actionNoroi (self) {
        self.parents('tr').find('.alive_status').removeClass('alive').addClass('deaded').text('死亡').css('color', 'red');
        self.parents('tr').find('.action_tsuri').hide();
        self.parents('tr').find('.action_noroi').hide();
        self.parents('td').find('.text_noroi').show();
    }

    $(document).on('click', '#player_check_list .text_tsuri, #player_check_list .text_kami, #player_check_list .text_noroi',function(){
        $(this).parents('tr').find('.alive_status').removeClass('deaded').addClass('alive').text('生存').css('color', '');
        $(this).parents('tr').find('.action_tsuri').show();
        $(this).parents('tr').find('.action_kami').show();
        $(this).parents('tr').find('.action_noroi').show();
        $(this).parents('tr').find('.text_tsuri').hide();
        $(this).parents('tr').find('.text_kami').hide();
        $(this).parents('tr').find('.text_noroi').hide();
        playerCheckListAliveCount();
    });
}

function playerCheckListReset () {
    $('#player_check_list').find('tr').find('.alive_status').removeClass('deaded').addClass('alive').text('生存').css('color', '');
    $('#player_check_list').find('tr').find('.action_tsuri').show();
    $('#player_check_list').find('tr').find('.action_kami').show();
    $('#player_check_list').find('tr').find('.action_noroi').show();
    $('#player_check_list').find('.text_tsuri').hide();
    $('#player_check_list').find('.text_kami').hide();
    $('#player_check_list').find('.text_noroi').hide();
    $('.win_text').text('');
    playerCheckListAliveCount();
}

function playerCheckListAliveCount () {
    $('.win_text').text('');

    var alive = $('#player_check_list').find('.alive').length;
    var user  = $('#player_check_list').find('tr').length-1;
    $('.alive_count').text(alive);
    $('.user_count').text(user);

    var jinrouAlive  = $('#player_check_list').find('.jinrou').find('.alive').length;
    var kyoujinAlive = $('#player_check_list').find('.kyoujin').find('.alive').length;
    var jinrouUser   = $('#player_check_list').find('.jinrou').length;
    var kyoujinUser  = $('#player_check_list').find('.kyoujin').length;
    var jinrouCount  = jinrouAlive+kyoujinAlive;
    $('.jinrou_alive_count').text(jinrouCount);
    $('.jinrou_user_count').text(jinrouUser+kyoujinUser);

    var uranaiAlive   = $('#player_check_list').find('.uranai').find('.alive').length;
    var reinouAlive   = $('#player_check_list').find('.reinou').find('.alive').length;
    var kariudoAlive  = $('#player_check_list').find('.kariudo').find('.alive').length;
    var kyouyuuAlive  = $('#player_check_list').find('.kyouyuu').find('.alive').length;
    var murabitoAlive = $('#player_check_list').find('.murabito').find('.alive').length;
    var uranaiUser    = $('#player_check_list').find('.uranai').length;
    var reinouUser    = $('#player_check_list').find('.reinou').length;
    var kariudoUser   = $('#player_check_list').find('.kariudo').length;
    var kyouyuuUser   = $('#player_check_list').find('.kyouyuu').length;
    var murabitoUser  = $('#player_check_list').find('.murabito').length;
    var murabitoCount = uranaiAlive+reinouAlive+kariudoAlive+kyouyuuAlive+murabitoAlive;
    $('.murabito_alive_count').text(murabitoCount);
    $('.murabito_user_count').text(uranaiUser+reinouUser+kariudoUser+kyouyuuUser+murabitoUser);

    var youkoAlive   = $('#player_check_list').find('.youko').find('.alive').length;
    var youkoUser    = $('#player_check_list').find('.youko').length;
    var youkoCount   = youkoAlive;
    $('.youko_alive_count').text(youkoAlive);
    $('.youko_user_count').text(youkoUser);

    var free_1Alive = $('#player_check_list').find('.free_1').find('.alive').length;
    var free_2Alive = $('#player_check_list').find('.free_2').find('.alive').length;
    var free_3Alive = $('#player_check_list').find('.free_3').find('.alive').length;
    var free_1User  = $('#player_check_list').find('.free_1').length;
    var free_2User  = $('#player_check_list').find('.free_2').length;
    var free_3User  = $('#player_check_list').find('.free_3').length;
    var otherCount  = free_1Alive+free_2Alive+free_3Alive;
    $('.other_alive_count').text(otherCount);
    $('.other_user_count').text(free_1User+free_2User+free_3User);

    if ( jinrouAlive == 0 ) {
        if ( youkoCount > 0 ) {
            $('.win_text').text('妖狐陣営の勝利です!!');
        }else{
            $('.win_text').text('村人陣営の勝利です!!');
        }
    }else if ( murabitoCount <= jinrouAlive ) {
        if ( youkoCount > 0 ) {
            $('.win_text').text('妖狐陣営の勝利です!!');
        }else{
            $('.win_text').text('人狼陣営の勝利です!!');
        }
    }

}

$(function(){

    tabViewSwithch();

    roleInput();
    roleCount();
    inputNameForm();
    roleExanpleCreate();

    $('.role_exanple_wrapper_show').click(function(){
        $('.role_exanple_wrapper').slideToggle(300);
    })

    $('select[name="join_member"]').change(function(){
        inputNameForm();
        roleInput();
    })
    $('select[name="role_type"]').change(function(){
        roleInput();
    })

    $('select').change(function(){
        roleCount();
    })

    $('.free_1_name').change(function(){
        roleCount();
    })
    $('.free_2_name').change(function(){
        roleCount();
    })
    $('.free_3_name').change(function(){
        roleCount();
    })

    $('#assign_role').click(function(){
        assignRole();
    })

    stopWatch();
    playerCheckListDetail();

    $('#player_check_list_reset').click(function() {
        playerCheckListReset();
    });

    $('#vote_aggregate').click(function(){
        voteAggregate();
    })
    $('#vote_reset').click(function(){
        $('#vote_text').val('');
        $('#vote_result').val('');
    });
})