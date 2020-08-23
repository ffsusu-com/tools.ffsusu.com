
//meals_info.jp.js から値をコピー
var mealsIndexListJP = ["耐力", "招架发动力", "暴击", "信念", "技能速度", "命中力", "咏唱速度", "信仰", "制作力", "加工精度", "作业精度", "采集力", "获得力", "鉴别力", "中毒耐性", "沉默耐性", "失明耐性", "睡眠耐性", "加重耐性", "减速耐性", "眩晕耐性", "止步耐性", "分解精度", "装备损耗耐性"];

//基本パラメタ変換場所の定義
var langTextWithBaseParam = [
	"#lp_hp", "#lp_mp", "#lp_cp", "#lp_gp", "#lp_str", "#lp_dex", "#lp_vit", "#lp_int", "#lp_mnd", "#lp_pie", 
	"#lp_bonus", "#lp_trait", "#lp_fire", "#lp_ice", "#lp_wind", "#lp_earth", "#lp_thunder", "#lp_water", 
	"#lp_crit", "#lp_will", "#lp_phy_def", "#lp_dodge", "#lp_mag_def", "#lp_phy_atk", "#lp_skill_speed", 
	"#lp_tolerant_cut", "#lp_tolerant_pierce", "#lp_tolerant_beat", 
	"#lp_mag_atk", "#lp_mag_heal", "#lp_spell_speed", "#lp_moral",
	"#lp_gain", "#lp_quality", "#lp_work", "#lp_process",
	"#accuracy",
	"#ln_pie", "#ln_acr", "#ln_will", "#ln_crit", "#ln_sks", "#ln_sps", "#ln_dge", 
	"#ln_max0", "#ln_max1", "#ln_max2", "#ln_max3", "#ln_max4", "#ln_max5", "#ln_max6", "#ln_max7",
	"#ln_goto_top0", "#ln_goto_top1", "#ln_goto_top2", "#ln_goto_top3", "#ln_goto_top4", "#ln_goto_top5",
	"#coef_name", "#ln_cancel0", "#ln_cancel1", "#ln_cancel2", "#ln_cancel3", "#ln_cancel4", "#ln_cancel5", "#ln_cancel6",
	"#ln_more_read", "#ln_more_read_loading", "#pu_name",
	"#mps_title",  "#mps_set_apply_0", "#mps_set_apply_1", "#mps_set_apply_2", "#mps_set_regist_0", "#mps_set_regist_1", "#mps_set_regist_2",
	"#ln_adjust0", "#ln_adjust1", "#ln_adjust2", "#ln_adjust3", "#ln_adjust4",
	"#lp_note0", "#lp_note1", "#lp_note2", "#acr_name", "#np_title2"

];

//ジョブクラス／守護神／種族の変換用
//NOTE: 各言語ファイルと重複あり

var crossTranslateList = [
{"jp": "圣骑士", "en": "PLD", "fr": "PLD", "de": "PLD"},
{"jp": "战士", "en": "WAR", "fr": "GUE", "de": "KRG"},
{"jp": "龙骑士", "en": "DRG", "fr": "DRG", "de": "DRG"},
{"jp": "武僧", "en": "MNK", "fr": "MOI", "de": "MÖN"},
{"jp": "吟游诗人", "en": "BRD", "fr": "BRD", "de": "BRD"},
{"jp": "忍者", "en": "NIN", "fr": "NIN", "de": "NIN"},
{"jp": "黑魔法师", "en": "BLM", "fr": "MNO", "de": "SMA"},
{"jp": "学者", "en": "SCH", "fr": "ÉRU", "de": "GLT"},
{"jp": "白魔法师", "en": "WHM", "fr": "MBL", "de": "WMA"},
{"jp": "剑术师", "en": "GLA", "fr": "GLA", "de": "GLA"},
{"jp": "斧术师", "en": "MRD", "fr": "MRD", "de": "MAR"},
{"jp": "枪术师", "en": "LNC", "fr": "HAS", "de": "PIK"},
{"jp": "格斗家", "en": "PGL", "fr": "PGL", "de": "FST"},
{"jp": "弓箭手", "en": "ARC", "fr": "ARC", "de": "WDL"},
{"jp": "双剑士", "en": "ROG", "fr": "SUR", "de": "SCH"},
{"jp": "咒术师", "en": "THM", "fr": "OCC", "de": "THM"},
{"jp": "秘术师", "en": "CAN", "fr": "CAN", "de": "HRT"},
{"jp": "召唤师", "en": "SMN", "fr": "INV", "de": "BSW"},
{"jp": "幻术师", "en": "CNJ", "fr": "ÉLM", "de": "DRU"},
{"jp": "园艺工", "en": "BTN", "fr": "BOT", "de": "GÄR"},
{"jp": "采矿工", "en": "MIN", "fr": "MIN", "de": "MIN"},
{"jp": "捕鱼人", "en": "FSH", "fr": "PEC", "de": "FIS"},
{"jp": "锻铁匠", "en": "BSM", "fr": "FRG", "de": "GRS"},
{"jp": "炼金术士", "en": "ALC", "fr": "ALC", "de": "ALC"},
{"jp": "制革匠", "en": "LTW", "fr": "LTW", "de": "GER"},
{"jp": "烹调师", "en": "CUL", "fr": "CUI", "de": "GRM"},
{"jp": "裁衣匠", "en": "WVR", "fr": "COU", "de": "WEB"},
{"jp": "雕金匠", "en": "GSM", "fr": "ORF", "de": "GLD"},
{"jp": "刻木匠", "en": "CRP", "fr": "MEN", "de": "ZMR"},
{"jp": "铸甲匠", "en": "ARM", "fr": "ARM", "de": "PLA"},
{"jp": "暗黑骑士", "en": "DRK", "fr": "ARM", "de": "PLA"},
{"jp": "机工士"  , "en": "MCH", "fr": "ARM", "de": "PLA"},
{"jp": "占星术士", "en": "AST", "fr": "ARM", "de": "PLA"},

{"jp": "人族：中原之民", "en": "Hyur / Midlander", "fr": "Hyur / Hyurois", "de": "Hyuran / Wiesländer"},
{"jp": "人族：高地之民", "en": "Hyur / Highlander", "fr": "Hyur / Hyurgoth", "de": "Hyuran / Hochländer"},
{"jp": "精灵族：森林之民", "en": "Elezen / Wildwood", "fr": "Élézenne / Sylvestre", "de": "Elezen / Erlschatten"},
{"jp": "精灵族：黑影之民", "en": "Elezen / Duskwight", "fr": "Élézenne / Crépusculaire", "de": "Elezen / Dunkelalb"},
{"jp": "拉拉菲尔族：平原之民", "en": "Lalafell / Plainsfolk", "fr": "Lalafell / Peuple des Plaines", "de": "Lalafell / Halmling"},
{"jp": "拉拉菲尔族：沙漠之民", "en": "Lalafell / Dunesfolk", "fr": "Lalafell / Peuple des Dunes", "de": "Lalafell / Sandling"},
{"jp": "猫魅族：逐日之民", "en": "Miqo'te / Seeker of the Sun", "fr": "Miqo'te / Tribu du Soleil", "de": "Miqo'te / Goldtatze"},
{"jp": "猫魅族：护月之民", "en": "Miqo'te / Keeper of the Moon", "fr": "Miqo'te / Tribu de la Lune", "de": "Miqo'te / Mondstreuner"},
{"jp": "鲁加族：北洋之民", "en": "Roegadyn / Sea Wolf", "fr": "Roegadyne / Clan de la Mer", "de": "Roegadyn / Seewolf"},
{"jp": "鲁加族：红焰之民", "en": "Roegadyn / Hellsguard", "fr": "Roegadyn / Clan du Feu", "de": "Roegadyn / Lohengarde"},
{"jp": "敖龙族：晨曦之民", "en": "Roegadyn / Hellsguard", "fr": "Roegadyn / Clan du Feu", "de": "Roegadyn / Lohengarde"},
{"jp": "敖龙族：暮晖之民", "en": "Roegadyn / Hellsguard", "fr": "Roegadyn / Clan du Feu", "de": "Roegadyn / Lohengarde"},
{"jp": "哈罗妮", "en": "Halone", "fr": "Halone", "de": "Halone"},
{"jp": "梅茵菲娜", "en": "Menphina", "fr": "Menphina", "de": "Menphina"},
{"jp": "沙利亚克", "en": "Thaliak", "fr": "Thaliak", "de": "Thaliak"},
{"jp": "妮美雅", "en": "Nymeia", "fr": "Nymeia", "de": "Nymeia"},
{"jp": "利姆莱因", "en": "Llymlaen", "fr": "Llymlaen", "de": "Llymlaen"},
{"jp": "奥修昂", "en": "Oschon", "fr": "Oschon", "de": "Oschon"},
{"jp": "比尔格", "en": "Byregot", "fr": "Byregot", "de": "Byregot"},
{"jp": "拉尔戈", "en": "Rhalgr", "fr": "Rhalgr", "de": "Rhalgr"},
{"jp": "阿泽玛", "en": "Azeyma", "fr": "Azeyma", "de": "Azeyma"},
{"jp": "纳尔札尔", "en": "Nald'thal", "fr": "Nald'thal", "de": "Nald'thal"},
{"jp": "诺菲卡", "en": "Nophica", "fr": "Nophica", "de": "Nophica"},
{"jp": "阿尔基克", "en": "Althyk", "fr": "Althyk", "de": "Althyk"},
{"jp": "战斗精英", "en": "Disciple of War", "fr": "Combattants", "de": "Krieger"},
{"jp": "魔法导师", "en": "Disciple of Magic", "fr": "Mages", "de": "Magier"},
{"jp": "大地使者", "en": "Gatherer", "fr": "Cueilleur", "de": "Sammler"},
{"jp": "能工巧匠", "en": "Crafter", "fr": "Crafter", "de": "Crafter"},
{"jp": "全职业", "en": "All Classes", "fr": "Toutes les classes", "de": "Alle Klassen"},
{"jp": "力量", "en": "Strength", "fr": "Force", "de": "Stärke"},
{"jp": "灵巧", "en": "Dexterity", "fr": "Dextérité", "de": "Geschick"},
{"jp": "耐力", "en": "Vitality", "fr": "Vitalité", "de": "Konstitution"},
{"jp": "智力", "en": "Intelligence", "fr": "Intelligence", "de": "Intelligenz"},
{"jp": "精神", "en": "Mind", "fr": "Esprit", "de": "Willenskraft"},
{"jp": "信仰", "en": "Piety", "fr": "Piété", "de": "Frömmigkeit"},
{"jp": "单手剑", "en": "Gladiator's Arm", "fr": "Arme de gladiateur", "de": "Hauptwaffe der Gladiatoren"},
{"jp": "格斗武器", "en": "Pugilist's Arm", "fr": "Arme de pugiliste", "de": "Hauptwaffe der Faustkämpfer"},
{"jp": "大斧", "en": "Marauder's Arm", "fr": "Arme de maraudeur", "de": "Hauptwaffe der Marodeure"},
{"jp": "长枪", "en": "Lancer's Arm", "fr": "Arme d'hast", "de": "Hauptwaffe der Pikeniere"},
{"jp": "弓", "en": "Archer's Arm", "fr": "Arme d'archer", "de": "Hauptwaffe der Waldläufer"},
{"jp": "单手幻仗", "en": "One-handed Conjurer's Arm", "fr": "Arme d'élémentaliste", "de": "Druiden-Waffe"},
{"jp": "双手幻杖", "en": "Two-handed Conjurer's Arm", "fr": "Arme à deux mains d'élémentaliste", "de": "Druiden-Zweihandwaffe"},
{"jp": "单手咒杖", "en": "One-handed Thaumaturge's Arm", "fr": "Arme d'occultiste", "de": "Thaumaturgen-Waffe"},
{"jp": "双手咒杖", "en": "Two-handed Thaumaturge's Arm", "fr": "Arme à deux mains d'occultiste", "de": "Thaumaturgen-Zweihandwaffe"},
{"jp": "魔导书", "en": "Arcanist's Grimoire", "fr": "Arme d'arcaniste", "de": "Grimoire"},

{"jp": "主手", "en": "Arms", "fr": "Armes", "de": "Waffen"},
{"jp": "副手", "en": "Secondary", "fr": "Secondary", "de": "Secondary"},
{"jp": "头部", "en": "Head", "fr": "Tête", "de": "Kopf"},
{"jp": "上衣", "en": "Body", "fr": "Torse", "de": "Rumpf"},
{"jp": "手部", "en": "Hands", "fr": "Mains", "de": "Hände"},
{"jp": "腰部", "en": "Waist", "fr": "Ceinture", "de": "Taille"},
{"jp": "腿部", "en": "Legs", "fr": "Jambes", "de": "Beine"},
{"jp": "鞋子", "en": "Feet", "fr": "Pieds", "de": "Füße"},
{"jp": "项链", "en": "Necklace", "fr": "Collier", "de": "Halskette"},
{"jp": "耳环", "en": "Earrings", "fr": "Boucle d'oreille", "de": "Ohrring"},
{"jp": "手镯", "en": "Bracelets", "fr": "Bracelet", "de": "Armreif"},
{"jp": "戒指1", "en": "Ring1", "fr": "Bague1", "de": "Ring1"},
{"jp": "戒指2", "en": "Ring2", "fr": "Bague2", "de": "Ring2"},

];

//共有お気に入り用データ
var worldFavoriteLangMap = {
	"jobclass": {
		"title": { "jp": "职业", "en": "Job", "fr": "Job", "de": "Job"},
		"list": [
			{"sid": 100, "type": "战斗系", "jp": "圣骑士",   "en": "PLD", "fr": "PLD", "de": "PLD"},
			{"sid": 101, "type": "战斗系", "jp": "战士",     "en": "WAR", "fr": "GUE", "de": "KRG"},
			{"sid": 102, "type": "战斗系", "jp": "暗黑骑士", "en": "DRK", "fr": "CHN", "de": "DKR"},
			{"sid": 103, "type": "战斗系", "jp": "龙骑士",   "en": "DRG", "fr": "DRG", "de": "DRG"},
			{"sid": 104, "type": "战斗系", "jp": "武僧",   "en": "MNK", "fr": "MOI", "de": "MÖN"},
			{"sid": 105, "type": "战斗系", "jp": "吟游诗人", "en": "BRD", "fr": "BRD", "de": "BRD"},
			{"sid": 106, "type": "战斗系", "jp": "机工士",   "en": "MCH", "fr": "MCH", "de": "MCH"},
			{"sid": 107, "type": "战斗系", "jp": "忍者",     "en": "NIN", "fr": "NIN", "de": "NIN"},
			{"sid": 108, "type": "战斗系", "jp": "黑魔法师", "en": "BLM", "fr": "MNO", "de": "SMA"},
			{"sid": 109, "type": "战斗系", "jp": "召唤师",   "en": "SMN", "fr": "INV", "de": "BSW"},
			{"sid": 110, "type": "战斗系", "jp": "学者",     "en": "SCH", "fr": "ÉRU", "de": "GLT"},
			{"sid": 111, "type": "战斗系", "jp": "白魔法师", "en": "WHM", "fr": "MBL", "de": "WMA"},
			{"sid": 112, "type": "战斗系", "jp": "占星术士", "en": "AST", "fr": "AST", "de": "AST"},

			{"sid": 113, "type": "大地使者", "jp": "园艺工", "en": "BTN", "fr": "BOT", "de": "GÄR"},
			{"sid": 114, "type": "大地使者", "jp": "采矿工", "en": "MIN", "fr": "MIN", "de": "MIN"},
			{"sid": 115, "type": "大地使者", "jp": "捕鱼人", "en": "FSH", "fr": "PEC", "de": "FIS"},
			{"sid": 116, "type": "能工巧匠", "jp": "锻铁匠", "en": "BSM", "fr": "FRG", "de": "GRS"},
			{"sid": 117, "type": "能工巧匠", "jp": "炼金术士", "en": "ALC", "fr": "ALC", "de": "ALC"},
			{"sid": 118, "type": "能工巧匠", "jp": "制革匠", "en": "LTW", "fr": "LTW", "de": "GER"},
			{"sid": 119, "type": "能工巧匠", "jp": "烹调师", "en": "CUL", "fr": "CUI", "de": "GRM"},
			{"sid": 120, "type": "能工巧匠", "jp": "裁衣匠", "en": "WVR", "fr": "COU", "de": "WEB"},
			{"sid": 121, "type": "能工巧匠", "jp": "雕金匠", "en": "GSM", "fr": "ORF", "de": "GLD"},
			{"sid": 122, "type": "能工巧匠", "jp": "刻木匠", "en": "CRP", "fr": "MEN", "de": "ZMR"},
			{"sid": 123, "type": "能工巧匠", "jp": "铸甲匠", "en": "ARM", "fr": "ARM", "de": "PLA"},
		]
	},
	"ilv": {
		"title": { "jp": "品级"},
		"list": {
			"战斗系": [
				{"sid": 200, "jp": "ILV270-"},
				{"sid": 201, "jp": "ILV250-259"},
				{"sid": 202, "jp": "ILV240-249"},
				{"sid": 203, "jp": "ILV210-239"},
			],
			"大地使者": [
				{"sid": 210, "jp": "ILV180-"},
				{"sid": 211, "jp": "ILV150-179"},
				{"sid": 212, "jp": "ILV100-149"},
				{"sid": 213, "jp": "ILV65-99"},
			],
			"能工巧匠": [
				{"sid": 210, "jp": "ILV180-"},
				{"sid": 211, "jp": "ILV150-179"},
				{"sid": 212, "jp": "ILV100-149"},
				{"sid": 213, "jp": "ILV65-99"},
			],
		}
	},
	"trend": {
		"title": { "jp": "倾向", "en": "trend", "fr": "tendance", "de": "trend"},
		"list": [
			{"sid": 300, "key": "bonus_will", "jp": "信念", "en": "Det.", "fr": "Dét.", "de": "Ent."},
			{"sid": 301, "key": "bonus_crit", "jp": "暴击", "en": "Cri.", "fr": "Crit.", "de": "Krit."},
			{"sid": 302, "key": "bonus_skill_speed", "jp": "技能速度", "en": "Skill-Spd", "fr": "Vivacité", "de": "Schnelligkeit"},
			{"sid": 303, "key": "bonus_spell_speed", "jp": "咏唱速度", "en": "Spell-Spd", "fr": "Célérité", "de": "Zaubertempo"},
			{"sid": 304, "key": "bonus_dodge", "jp": "招架", "en": "Parry", "fr": "Parade", "de": "Parade"},
		]
	},
	"crafter": {
		"title": { "jp": "新式", "en": "Craft", "fr": "main", "de": "H.W."},
		"list": [
			{"sid": 400, "jp": "没有", "en": "none", "fr": "aucun", "de": "keiner"},
			{"sid": 401, "jp": "有", "en": "exist", "fr": "exister", "de": "exist"},
		]
	}
};

//マテリア共有データ
//言語に依存しないデータをマージする
function mergeMateriaBaseData(data) {

	var mergeData = {
		"mat_hit":         {icon: "image/sys/materia_t0.png", effect: "bonus_hit",         values:  [2, 4, 6, 9, 12] },
		"mat_crit":        {icon: "image/sys/materia_t0.png", effect: "bonus_crit",        values:  [2, 4, 6, 9, 12] },
		"mat_will":        {icon: "image/sys/materia_t0.png", effect: "bonus_will",        values:  [1, 3, 4, 6, 12] },
		"mat_dodge":       {icon: "image/sys/materia_t1.png", effect: "bonus_dodge",       values:  [2, 4, 6, 9, 12] },
		"mat_skill_speed": {icon: "image/sys/materia_t2.png", effect: "bonus_skill_speed", values:  [2, 4, 6, 9, 12] },
		"mat_spell_speed": {icon: "image/sys/materia_t2.png", effect: "bonus_spell_speed", values:  [2, 4, 6, 9, 12] },

		"mat_str":         {icon: "image/sys/materia_t5.png", effect: "bonus_str",         values:  [1, 2, 4, 7, 15] },
		"mat_vit":         {icon: "image/sys/materia_t5.png", effect: "bonus_vit",         values:  [1, 2, 4, 8, 15] },
		"mat_dex":         {icon: "image/sys/materia_t5.png", effect: "bonus_dex",         values:  [1, 2, 4, 7, 15] },
		"mat_int":         {icon: "image/sys/materia_t5.png", effect: "bonus_int",         values:  [1, 2, 4, 7, 15] },
		"mat_mnd":         {icon: "image/sys/materia_t5.png", effect: "bonus_mnd",         values:  [1, 2, 4, 7, 15] },
		"mat_pie":         {icon: "image/sys/materia_t5.png", effect: "bonus_pie",         values:  [1, 2, 3, 6, 11] },

		"mat_gain":        {icon: "image/sys/materia_t3.png", effect: "bonus_gain",        values:  [3, 4, 5, 6, 10] },
		"mat_quality":     {icon: "image/sys/materia_t3.png", effect: "bonus_quality",     values:  [3, 4, 5, 6, 10] },
		"mat_gp":          {icon: "image/sys/materia_t3.png", effect: "bonus_gp",          values:  [1, 2, 3, 4, 6] },
		"mat_work":        {icon: "image/sys/materia_t4.png", effect: "bonus_work",        values:  [3, 4, 5, 6, 11] },
		"mat_cp":          {icon: "image/sys/materia_t4.png", effect: "bonus_cp",          values:  [1, 2, 3, 4, 6] },
		"mat_edit":        {icon: "image/sys/materia_t4.png", effect: "bonus_edit",        values:  [1, 2, 3, 4, 7] },

		"mat_fire":        {icon: "image/sys/materia_t6.png", effect: "bonus_fire",        values:  [1, 2, 4, 6, 9] },
		"mat_ice":         {icon: "image/sys/materia_t6.png", effect: "bonus_ice",         values:  [1, 2, 4, 6, 9] },
		"mat_wind":        {icon: "image/sys/materia_t6.png", effect: "bonus_wind",        values:  [1, 2, 4, 6, 9] },
		"mat_earth":       {icon: "image/sys/materia_t6.png", effect: "bonus_earth",       values:  [1, 2, 4, 6, 9] },
		"mat_lightning":   {icon: "image/sys/materia_t6.png", effect: "bonus_lightning",   values:  [1, 2, 4, 6, 9] },
		"mat_water":       {icon: "image/sys/materia_t6.png", effect: "bonus_water",       values:  [1, 2, 4, 6, 9] }
	};

	for (var key in mergeData) {
		data[key]["icon"] = mergeData[key]["icon"];
		data[key]["effect"] = mergeData[key]["effect"];
		data[key]["values"] = mergeData[key]["values"];
	}

	return data;
}


//翻訳
function translateMultiLanguage(text, fromLang, toLang) {
	var ret = text;
	for (var i in crossTranslateList) {
		if (text == crossTranslateList[i][fromLang]) {
			ret = crossTranslateList[i][toLang];
			break;
		}
	}
	return ret;
}

//言語変更
function changeLanguage(newLang) {
	if (newLang == '') {
		newLang = lang;
	}

	setLangCookie(newLang);
	window.localStorage.removeItem("dataVersion");
	window.localStorage.removeItem("itemData");

	var url = location.protocol + "//" + location.hostname + "/peizhuang" + "/?lang=" + newLang + "&r=" + Math.floor(Math.random() * 1000000);
	location.href = url;
}
function showSelectedLanguage() {
	$("#lang_" + lang).css("border", "1px solid red");
}

//全体翻訳
function updateLanguageText() {
	//日本語はデフォルトなので何もしないで良い
	if ("jp" == lang) {
		return;
	}

	//汎用単語の変換を行う
	for (var k in langTextWithBaseParam) {
		var id = langTextWithBaseParam[k];
		var v = "";
		var tagName = "";
		if (null != $(id) && null != $(id).get(0)) {
			tagName = $(id).get(0).tagName.toLowerCase();
		}
		if ("input" == tagName) {
			v = $(id).val();
			if ("" != langBaseParam[v]) {
				$(id).val(langBaseParam[v]);
			}
		} else {
			v = $(id).text();
			if ("" != langBaseParam[v]) {
				$(id).text(langBaseParam[v]);
			}
		}
	}

	//指定文言の変換を行う
	for (var k in langTextMap) {
		if ("input" == langTextMap[k]["label_type"]) {
			$(k).val(langTextMap[k]["text"]);
		} else {
			$(k).html(langTextMap[k]["text"]);
		}
	}

	//特殊処理
	//係数設定フォームの汎用変換
	$("#cform_table td").each(function(){
		var rawText = $(this).text();
		if (null != langBaseParam[rawText]) {
			$(this).text(langBaseParam[rawText]);
		}
	});

	//メニュー部分置換（スマホ用）
	$("#menu_view .menu_text").each(function() {
		var rawText = $(this).text();
		if (null != langBaseParam[rawText]) {
			$(this).text(langBaseParam[rawText]);
		}
	});


}
function updateLanguageTextForJS() {
	//日本語はデフォルトなので何もしないで良い
	if ("jp" == lang) {
		return;
	}

	//mealSortIndexList
	//値は mealsIndexListJP とマッピングして変換する
	mealParamMap = {};
	for (var i = 0;i < mealsIndexListJP.length;i++) {
		mealParamMap[mealsIndexListJP[i]] = mealsIndexList[i];
	}

/*
	newMap = {};
	for (var k in mealSortIndexList) {
		var nk = translate(k);
		newMap[nk] = mealSortIndexList[k];
		for (var ik in newMap[nk]) {
			var iv = newMap[nk][ik];
			var nik = translateMatch(ik);
			var niv = translateMatch(iv, mealParamMap);

			newMap[nk][nik] = niv;
			if (nik != ik) {
				delete newMap[nk][ik];
			}
		}
	}
	mealSortIndexList = newMap;
*/

	newMap = {};
	for (var k in mealSortIndexList) {
		var nk = translate(k);
		//console.log(mealSortIndexList[k]);
		var innerNewMap = {};
		for (var baseMSKey in mealSortIndexList[k]) {
			var baseMSValue = mealSortIndexList[k][baseMSKey];
			var newKey = translateMatch(baseMSKey);
			var newValue = translateMatch(baseMSValue, mealParamMap);
			innerNewMap[newKey] = newValue;
		}
		newMap[nk] = innerNewMap;
	}
	mealSortIndexList = newMap;
//console.log(mealSortIndexList);

	//sortMap
	newMap = {};
	for (var k in sortMap) {
		var nk = translate(k);
		newMap[nk] = sortMap[k];
		for (var i in newMap[nk]) {
			newMap[nk][i]["name"] = translate(newMap[nk][i]["name"]);
			newMap[nk][i]["abbr"] = newMap[nk][i]["name"];
		}
	}
	sortMap = newMap;

	//showBonusList
	for (var k in showBonusList) {
		var v = showBonusList[k];
		var nv = translate(v);
		showBonusList[k] = nv;
	}

	//baseClassMap
	baseClassMap = translateList(baseClassMap);

	//classMap
	newMap = {};
	for (var k in classMap) {
		var nk = translate(k);
		newMap[nk] = classMap[k];
		newMap[nk]["classes"] = translateList(newMap[nk]["classes"]);
	}
	classMap = newMap;

	//classAdjustMap
	newMap = {};
	for (var k in classAdjustMap) {
		var nk = translate(k);
		newMap[nk] = classAdjustMap[k];
	}
	classAdjustMap = newMap;

	//traitsMap
	newMap = {};
	for (var k in traitsMap) {
		var nk = translate(k);
		newMap[nk] = traitsMap[k];
	}
	traitsMap = newMap;

	//tribeAdjustMap
	newMap = {};
	for (var k in tribeAdjustMap) {
		var nk = translate(k);
		newMap[nk] = tribeAdjustMap[k];
	}
	tribeAdjustMap = newMap;

	//godAdjustMap
	newMap = {};
	for (var k in godAdjustMap) {
		var nk = translate(k);
		newMap[nk] = godAdjustMap[k];
	}
	godAdjustMap = newMap;

	//imageClassMap
	for (var k in imageClassMap) {
		var v = imageClassMap[k];
		var nv = translate(v);
		imageClassMap[k] = nv;
	}

	//ilvMap
	for (var k in ilvMap) {
		var v = ilvMap[k];
		var nv = translate(v);
		ilvMap[k] = nv;
	}

	//invalidEquipSubArmList
	newList = [];
	for (var k in invalidEquipSubArmList) {
		var v = invalidEquipSubArmList[k];
		var nv = translate(v);
		newList[k] = nv;
	}
	invalidEquipSubArmList = newList;

	//classEquipViewColumn
	//function translate(text) {
	newMap = {};
	for (var k in classEquipViewColumn) {
		var nk = translate(k);
		newList = [];
		for (var i in classEquipViewColumn[k]) {
			newList.push(translate(classEquipViewColumn[k][i]));
		}
		newMap[nk] = newList;
	}
	classEquipViewColumn = newMap;

	//classTypeMap
	newMap = {};
	for (var k in classTypeMap) {
		var nk = translate(k);
		newList = [];
		for (var i in classTypeMap[k]) {
			newList.push(translate(classTypeMap[k][i]));
		}
		newMap[nk] = newList;
	}
	classTypeMap = newMap;

	//classTypeDetailMap
	//NOTE ここのキー値は数字なので、translate しても変わらない
	newMap = {};
	for (var k in classTypeDetailMap) {
		var nk = translate(k);
		newList = [];
		for (var i in classTypeDetailMap[k]) {
			newList.push(translate(classTypeDetailMap[k][i]));
		}
		newMap[nk] = newList;
	}
	classTypeDetailMap = newMap;

}

function translate(text) {
	var ret = text;
	if (null != langBaseParam[text] && "" != langBaseParam[text]) {
		ret = langBaseParam[text];
	}
	return ret;
}
function translateList(list) {
	var ret = [];
	for (var i in list) {
		var text = translate(list[i]);
		ret.push(text);
	}
	return ret;
}

function translateMatch(text, map) {
	var ret = text;
	var targetMap = map;
	if (null == targetMap) {
		targetMap = langBaseParam;
	}

	for (var k in targetMap) {
		ret = ret.replace(k, targetMap[k]);
	}
	
	return ret;
}
function applyLanguage() {
	showSelectedLanguage();
	updateLanguageText();
	updateLanguageTextForJS();
}

