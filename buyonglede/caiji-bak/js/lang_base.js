//言語共通設定ファイル

var crossTranslateList = [
];

function changeLanguage(newLang) {
	setLangCookie(newLang);
	var url = location.protocol + "//" + location.hostname + "/?lang=" + newLang + "&r=" + Math.floor(Math.random() * 1000000);
	location.href = url;
}
function showSelectedLanguage() {
	$("#lang_" + lang).css("border", "1px solid red");
}
function updateLanguageText() {

	//日本語はデフォルトなので何もしないで良い
	if ("jp" == lang) {
		return;
	}

	//IDでの一括変換
	$("*[id]").each(function() {
		var id = $(this).get(0).id;
		if ("mlt_" == id.substring(0, 4) && undefined != window[id]) {
			$(this).html(window[id]);
		}
	});

	//個別指定
	$("#mltc_min").val(mltc_min);
	$("#mltc_btn").val(mltc_btn);
	$("#filter_text").prop("placeholder", mltc_placeholder);
	$("#filter_reset").val(mlt_reset);
	$("#mltc_clear").val(mltc_clear);
	$("#notify_timing option").each(function() {
		$(this).text(window["mlt_timing_" + $(this).val()]);
	});
	$("#mltc_testplay").val(mltc_testplay);

	$("#favorite_show").val(mlt_favorite_show);
	$("#favorite_delete").val(mlt_favorite_delete);
	$("#favorite_add").val(mlt_favorite_add);

	$("#myschedule_delete").val(mlt_myschedule_delete);
	$("#myschedule_add").val(mlt_myschedule_add);
	$("#myschedule_start").html(mlt_myschedule_start);
	$("#myschedule_span").html(mlt_myschedule_span);
	$("#myschedule_name").html(mlt_myschedule_name);


	///for smp only
	$("#alarmconfig_onoff").val(mltc_alarm_on);
	$("#mltc_how2use").val(mltc_how2use);
	$("#ln_ok0").val(mltc_close);
	$("#ln_ok1").val(mltc_close);

}
function translateMatch(text) {
	var ret = text;

	for (var k in langBaseParam) {
		ret = ret.replace(k, langBaseParam[k]);
	}
	
	return ret;
}
function translate(text) {
	var ret = text;
	if (null != langBaseParam[text] && "" != langBaseParam[text]) {
		ret = langBaseParam[text];
	}
	return ret;
}
function translateByType(type, text) {
	return translateByType2(type, text, lang);
}
function translateByType2(type, text, targetLang) {
	var ret = text;
	//type = job, item, area
	if (null != translateData[type] && null != translateData[type][text] && null != translateData[type][text][targetLang]) {
		ret = translateData[type][text][targetLang];
	}
	return ret;
}
function applyLanguage() {
	showSelectedLanguage();
	updateLanguageText();
}


