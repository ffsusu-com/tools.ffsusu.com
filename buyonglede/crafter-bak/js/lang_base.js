//言語共通設定ファイル
var ml_at_map = {
	"风" : {"jp": "属性：风", "en": "Aspect: Wind",      "fr": "Pouvoir du vent",      "de": "Element: Wind"},
	"火" : {"jp": "属性：火", "en": "Aspect: Fire",      "fr": "Pouvoir du feu",       "de": "Element: Feuer"},
	"冰" : {"jp": "属性：冰", "en": "Aspect: Ice",       "fr": "Pouvoir de la glace",  "de": "Element: Eis"},
	"土" : {"jp": "属性：土", "en": "Aspect: Earth",     "fr": "Pouvoir de la terre",  "de": "Element: Erde"},
	"雷" : {"jp": "属性：雷", "en": "Aspect: Lightning", "fr": "Pouvoir de la foudre", "de": "Element: Blitz"},
	"水" : {"jp": "属性：水", "en": "Aspect: Water",     "fr": "Pouvoir de l'eau",     "de": "Element: Wasser"},
};
var mealsIndexListJP = ["耐力", "招架发动力", "暴击", "信念", "技能速度", "命中力", "咏唱速度", "信仰", "制作力", "加工精度", "作业精度", "采集力", "获得力", "鉴别力", "中毒耐性", "沉默耐性", "失明耐性", "睡眠耐性", "加重耐性", "减速耐性", "眩晕耐性", "止步耐性", "分解精度", "装备损耗耐性", "精炼度提升量"];

//職名マップ
var jobNameTranslateMap = {
	"刻木匠": {"en": "Carpenter", "fr": "Menuisier", "de": "Zimmerer"},
	"锻铁匠": {"en": "Blacksmith", "fr": "Forgeron", "de": "Grobschmied"},
	"铸甲匠": {"en": "Armorer", "fr": "Armurier", "de": "Plattner"},
	"雕金匠": {"en": "Goldsmith", "fr": "Orfèvre", "de": "Goldschmied"},
	"制革匠": {"en": "Leatherworker", "fr": "Tanneur", "de": "Gerber"},
	"裁衣匠": {"en": "Weaver", "fr": "Couturier", "de": "Weber"},
	"炼金术士": {"en": "Alchemist", "fr": "Alchimiste", "de": "Alchemist"},
	"烹调师": {"en": "Culinarian", "fr": "Cuisinier", "de": "Gourmet"},
};


//言語変更
function changeLanguage(newLang) {
	if (newLang == '') {
		newLang = lang;
	}

	setLangCookie(newLang);
	window.localStorage.removeItem("RSDataVersion");
	window.localStorage.removeItem("RSItemData");
	window.localStorage.removeItem("RSRecipeData");

	var url = location.protocol + "//" + location.hostname + "/crafter/?lang=" + newLang + "&r=" + Math.floor(Math.random() * 1000000);
	location.href = url;
}

//選択中言語のフォーカス
function showSelectedLanguage() {
	$("#lang_" + lang).css("border", "1px solid red");
}

//言語情報適用
function updateLanguageText() {

	//日本語はデフォルトなので何もしないで良い
	if ("jp" == lang) {
		return;
	}

	//ml_** のIDがついているタグを全て変換対象とする
	$("*[id]").each(function(e) {
		var id = $(this).get(0).id;
		if (null != id && "ml_" == id.substring(0, 3)) {
			if (undefined != window[id]) {
				$(this).html(window[id]);
			}
		}
	});


}

//言語変換
function translateMatch(text) {
	var ret = text;

	for (var k in langBaseParam) {
		ret = ret.replace(k, langBaseParam[k]);
	}
	
	return ret;
}

//言語変換
function translate(text) {
	var ret = text;
	if (null != langBaseParam[text] && "" != langBaseParam[text]) {
		ret = langBaseParam[text];
	}
	return ret;
}

//ジョブ名変換
function translateJobName(text) {
	if ("jp" == lang) {
		return text;
	}
	var ret = text;
	if (null != jobNameTranslateMap[text] &&
		null != jobNameTranslateMap[text][lang]) {
		ret = jobNameTranslateMap[text][lang];
	}
	return ret;
}


//言語情報適用
function applyLanguage() {
	showSelectedLanguage();
	updateLanguageText();
}


