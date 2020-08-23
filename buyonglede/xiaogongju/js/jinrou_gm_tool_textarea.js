$(function(){

    //投票集計ツール・左
    var insert_text = '';
    insert_text += '以下のような「指差しエモート」のログを貼り付けてください。\n';
    insert_text += '\n';
    insert_text += 'XXX XXXXはYYY YYYYを指さした。\n';
    insert_text += 'YYY YYYYはZZ ZZZZを指さした。\n';
    insert_text += '\n';
    insert_text += '[21:30] XXX XXXXはYYY YYYYを指さした。\n';
    insert_text += '[21:31] YYY YYYYはZZ ZZZZを指さした。\n';
    insert_text += '\n';
    insert_text += '※指さしエモ以外は集計できません。\n';
    insert_text += '※タイムスタンプが入ってるログでも大丈夫です。\n';
    insert_text += '※関係ないログは集計されないので、一緒にコピペしても大丈夫です。\n';
    $('#vote_text').attr('placeholder', insert_text);

    //投票集計ツール・右
    var insert_text = '';
    insert_text += '/y ≪有効投票数5票≫ <wait.2>\n';
    insert_text += '/y XXX XXXX (3票) ⇒ ZZ ZZZZ <wait.2>\n';
    insert_text += '/y XXX XXXX (2票) ⇒ ZZ ZZZZ <wait.2>\n';
    insert_text += '/y XXX XXXX (1票) ⇒ ZZ ZZZZ <wait.2>\n';
    insert_text += '/y XXX XXXX (1票) ⇒ ZZ ZZZZ <wait.2>\n';
    insert_text += '/y XXX XXXX (0票) ⇒ ZZ ZZZZ <wait.2>\n';
    insert_text += '/y XXX XXXX (0票) ⇒ ZZ ZZZZ <wait.2>\n';
    $('#vote_result').attr('placeholder', insert_text);

    //投票集計ツール・サンプル
    var insert_text = '';
    insert_text += '[21:35] Jinrou One : 俺は村人だよ！信じてよ！\n';
    insert_text += '[21:35] Jinrou Oneは首を横に振った。\n';
    insert_text += '[21:35] [1]<Uranaishi San> この人はウソをついています！私にはわかるんです！\n';
    insert_text += '[21:35] Uranaishi Sanは指さした。\n';
    insert_text += '[21:35] Jinrou OneはUranaishi Sanを指さした。\n';
    insert_text += '[21:35] Murabito OneはJinrou Oneを指さした。\n';
    insert_text += '[21:35] Murabito TwoはUranaishi Sanを指さした。\n';
    insert_text += '[21:35] Uranaishi SanはMurabito Twoを指さした。\n';
    insert_text += '[21:36] Murabito ThreeはUranaishi Sanを指さした。\n';
    insert_text += '[21:36] Kariudo SanはUranaishi Sanを指さした。\n';
    insert_text += '[21:37] Jinrou TwoはMurabito Oneを指さした。\n';
    insert_text += 'Jinrou One ： まだ死にたくないよー！\n';
    insert_text += 'Jinrou Oneは泣き顔になった。\n';
    insert_text += 'Uranaishi Sanはニヤりとしている。\n';
    insert_text += 'Jinrou OneはUranaishi Sanを指さした。\n';
    insert_text += 'Murabito OneはJinrou Oneを指さした。\n';
    insert_text += 'Murabito TwoはUranaishi Sanを指さした。\n';
    insert_text += 'Murabito ThreeはUranaishi Sanを指さした。\n';
    insert_text += 'Murabito ThreeはMurabito Oneを指さした。\n';
    insert_text += 'Kariudo SanはUranaishi Sanを指さした。\n';
    insert_text += 'Jinrou TwoはMurabito Oneを指さした。';
    $('#vote_sample').val(insert_text);

    //初心者用語マクロ・サンプル
    var insert_text = '';
    insert_text += '/y ≪よく使われる用語≫<wait.2>\n';
    insert_text += '/y 「吊るす」…投票によって村人を処刑すること。<wait.2>\n';
    insert_text += '/y 「噛む/喰う」…夜、人狼が村人を襲撃すること。<wait.2>\n';
    insert_text += '/y 「グレラン」…グレーランダムの略。白黒つかないグレーの中から怪しいと思う人に投票する行為。<wait.2>\n';
    insert_text += '/y 「寡黙/ステルス」…発言の少ない人。吊るす対象になりやすい。<wait.2>\n';
    insert_text += '/y 「CO」…カミングアウトの略。「私は占い師です」と名乗り出ることを占COという。<wait.2>\n';
    insert_text += '/y 「GJ」…グッジョブの略。人狼からの襲撃を狩人が防いだときに言いましょう。<wait.2>\n';
    insert_text += '/y 「騙り/騙る」…自分の役職を偽って、偽の能力者として名乗り出ること。またはその名乗り出た者。<wait.2>\n';
    insert_text += '/y 「黒」…主に占いや霊能の判定結果において、人狼判定のこと。【対義語：白】<wait.2>\n';
    insert_text += '/y 「黒い」…発言内容や占い・処刑希望などから、その人物が人狼側だろうと考える事。【対義語：白い】<wait.2>\n';
    insert_text += '/y 「PP」…パワープレイの略。人狼側陣営が村人より多くなった時に、数の力で勝利に持っていくこと。<wait.2>';
    $('#rule_macro_sample1').val(insert_text);

    //ルールマクロ・サンプル
    var insert_text = '';
    insert_text += '/y ≪ルール≫<wait.2>\n';
    insert_text += '/y 連ガあり…狩人が同じ人を連続して守れます<wait.2>\n';
    insert_text += '/y 初日ベグりなし…初日夜、真偽不明のまま狼が占師を噛む行為<wait.2>\n';
    insert_text += '/y スライドなし…COした後、別の役職をCOする行為<wait.2>\n';
    insert_text += '/y メタ禁止…XXXさんは上級者っぽいから…などのメタ発言は禁止です<wait.2>\n';
    insert_text += '/y ≪注意事項≫<wait.2>\n';
    insert_text += '/y GMからの発言は主に「yell」を使用しますので、フィルター解除お願します<wait.2>\n';
    insert_text += '/y 昼議論時間以外のチャットはおやめください。役職推察できてしまいます<wait.2>\n';
    insert_text += '/y リップシンクを無効にしてください。tell使用時に役職推察できてしまいます<wait.2>\n';
    insert_text += '/y ※キャラコン＞チャットログ設定＞全般タブ＞チャットログ設定＞チャット発言時のリップシンクを有効にする<wait.2>\n';
    insert_text += '/y 可能であればミニオンは出さないでください。ターゲットしづらいので…<wait.2>';
    $('#rule_macro_sample2').val(insert_text);

    //進行マクロ・0日目夜
    var insert_text = '';
    insert_text += '/y ≪0日目夜≫ (※Say会話禁止) <wait.2>\n';
    insert_text += '/y どこからか狼の遠吠えが聞こえる───。 <wait.2>\n';
    insert_text += '/y もしかしたら人ならざるものが村に紛れ込んだのかもしれません───。 <wait.2>\n';
    insert_text += '/y 【占い師】は、占う対象をGMにtellしてください。 <wait.2>';
    $('#macro_sample1').val(insert_text);

    //進行マクロ・1日目朝
    var insert_text = '';
    insert_text += '/y ≪1日目朝≫ (※Say会話禁止) <wait.2>\n';
    insert_text += '/y 村外れで、無残な<me>の遺体が発見されました…。 <wait.2>\n';
    insert_text += '/y やはり、この村に人ならざる者…人狼が紛れ込んだようです。 <wait.2>\n';
    insert_text += '/y 一刻も早く人狼を見つけ出さなければ、村人は食い尽くされてしまいます！ <wait.2>';
    $('#macro_sample2').val(insert_text);

    //進行マクロ・昼
    var insert_text = '';
    insert_text += '/y ≪昼≫ <wait.2>\n';
    insert_text += '/y 村人のみなさんで話し合って、本日追放する人を決めてください。 <wait.2>\n';
    insert_text += '/y 制限時間は7分です。 <wait.2>\n';
    insert_text += '/y ▼▼▼ 議論スタート ▼▼▼ (※Say会話開始) <wait.60>\n';
    insert_text += '/y 残り6分 <wait.60>\n';
    insert_text += '/y 残り5分 <wait.60>\n';
    insert_text += '/y 残り4分 <wait.60>\n';
    insert_text += '/y 残り3分 <wait.60>\n';
    insert_text += '/y 残り2分 <wait.60>\n';
    insert_text += '/y 残り1分 <wait.30>\n';
    insert_text += '/y 残り30秒 <wait.20>\n';
    insert_text += '/y 残り10秒 <wait.10>\n';
    insert_text += '/y ▲▲▲ 議論ストップ ▲▲▲ <wait.2>\n';
    insert_text += '/echo 昼が終わりました。夕マクロへ。<se.2>';
    $('#macro_sample3').val(insert_text);

    //進行マクロ・夕
    var insert_text = '';
    insert_text += '/y ≪夕≫ (※Say会話中止) <wait.2>\n';
    insert_text += '/y 投票の時間です。1分間は考える時間とします。 <wait.2>\n';
    insert_text += '/y いまから1分後、投票となります。 <wait.30>\n';
    insert_text += '/y 残り30秒 <wait.20>\n';
    insert_text += '/y 残り10秒 <wait.10>\n';
    insert_text += '/y ▼▼▼ 投票スタート ▼▼▼ <wait.2>\n';
    insert_text += '/echo 夕が終わりました。集計して吊りへ。<se.2>';
    $('#macro_sample4').val(insert_text);

    //進行マクロ・吊り
    var insert_text = '';
    insert_text += '/y 本日の追放者は、<t>さんになりました。 <wait.2>\n';
    insert_text += '/y 以降は霊界チャットにてお楽しみください！ <wait.2>';
    $('#macro_sample5').val(insert_text);

    //進行マクロ・夜
    var insert_text = '';
    insert_text += '/y どこからか狼の遠吠えが聞こえる───。 <wait.2>\n';
    insert_text += '/y ≪夜≫ (※Say会話中止) <wait.2>\n';
    insert_text += '/y 【占師】は、「占師です。●●さんを占います」とGMにtellしてください。 <wait.2>\n';
    insert_text += '/y 【狩人】は、「狩人です。●●さんを護衛します」とGMにtellしてください。 <wait.2>\n';
    insert_text += '/y 【霊能】は、「霊能です」とGMにtellしてください。 <wait.2>\n';
    insert_text += '/y 【人狼】の人たちは、誰を襲うか話し合って決めてください。制限時間2分。(カウント開始) <wait.60>\n';
    insert_text += '/y 残り1分 <wait.30>\n';
    insert_text += '/y 残り30秒 <wait.20>\n';
    insert_text += '/y 残り10秒 <wait.10>\n';
    insert_text += '/y 【人狼】の人たちは、誰を襲うかGMにtellしてください。 <wait.2>\n';
    insert_text += '/echo 夜が終わりました。対応して朝へ。<se.2>';
    $('#macro_sample6').val(insert_text);

    //進行マクロ・朝A
    var insert_text = '';
    insert_text += '/y ≪朝≫ (※Say会話禁止) <wait.2>\n';
    insert_text += '/y 見るも無残な<t>の遺体が発見されました───。 <wait.2>\n';
    insert_text += '/y これ以上の犠牲を出さないためにも、一刻も早く人狼を見つけ出さなければ───。 <wait.2>';
    $('#macro_sample7').val(insert_text);

    //進行マクロ・朝A
    var insert_text = '';
    insert_text += '/y ≪朝≫ (※Say会話禁止) <wait.2>\n';
    insert_text += '/y 清々しい、平和な朝が訪れました。人狼の襲撃はなかったようです。 <wait.2>\n';
    insert_text += '/y しかし、さらなる犠牲を出さないためにも、一刻も早く人狼を見つけ出さなければ───。 <wait.2>';
    $('#macro_sample8').val(insert_text);

    //決着マクロ・村人勝利
    var insert_text = '';
    insert_text += '/y もう狼の遠吠えは聞こえません───。 <wait.2>\n';
    insert_text += '/y 人狼の脅威が去り、村人は勝利のお祭りをあげることにしました！ <wait.2>\n';
    insert_text += '/y ●●● 「村人陣営」の勝利です！ ●●● <wait.2>';
    $('#macro_sample9').val(insert_text);

    //決着マクロ・人狼勝利
    var insert_text = '';
    insert_text += '/y 人狼たちは本性を露わにし、残りの村人たちに襲い掛かりました！ <wait.2>\n';
    insert_text += '/y 最後の村人も人狼の餌食となってしまいました───。 <wait.2>\n';
    insert_text += '/y ●●● 「人狼陣営」の勝利です！ ●●● <wait.2>';
    $('#macro_sample10').val(insert_text);

    //決着マクロ・妖狐勝利A
    var insert_text = '';
    insert_text += '/y もう狼の遠吠えは聞こえません───。 <wait.2>\n';
    insert_text += '/y 人狼の脅威が去り、村人は勝利のお祭りをあげることにしました！ <wait.5>\n';
    insert_text += '/y しかし、村は既に妖狐による支配が始まろうとしていました───。 <wait.2>\n';
    insert_text += '/y 村人はいつしか生気を失い、妖狐の餌としてただ飼われる生活を送ることとなります───。 <wait.2>\n';
    insert_text += '/y ●●● 「妖狐陣営」の勝利です！ ●●● <wait.2>';
    $('#macro_sample11').val(insert_text);

    //決着マクロ・妖狐勝利B
    var insert_text = '';
    insert_text += '/y 人狼たちは本性を露わにし、残りの村人たちに襲い掛かりました！ <wait.2>\n';
    insert_text += '/y 最後の村人も人狼の餌食となってしまいました───。 <wait.5>\n';
    insert_text += '/y しかし、それは全て妖狐による巧妙な罠だったのです！ <wait.2>\n';
    insert_text += '/y 勝利に酔いしれる人狼の首筋に、妖狐の牙が突き立てられました───。 <wait.2>\n';
    insert_text += '/y ●●● 「妖狐陣営」の勝利です！ ●●● <wait.2>';
    $('#macro_sample12').val(insert_text);

})