/*
パラメタ省略表示

ナ戦
	STR等,命中,クリ,意思,スキスピ,スペスピ

ギャザラー
	STR等,獲得,識質

クラフタ	
	STR等,作業,加工
*/

//URL
var ldstLang = ("en" == lang ? "na" : lang);
var imageRootURL = "http://img.finalfantasyxiv.com/lds/pc/global/images/itemicon/";
var blankEquipImageUrl = "image/sys/clear.png";
var publicDetailPageURL = "http://" + ldstLang + ".finalfantasyxiv.com/lodestone/playguide/db/item/{0}/";
var rsURL = "http://ffxiv.rs.exdreams.net/?q={0}";
var fwURL = "http://ffxiv.es.exdreams.net/world_favorite.php";
var stURL = "http://ffxiv.es.exdreams.net/create_url.php";


//ユーザ設定
var config = {};

//アイテムレベル
var ilvMap = {
	"0": "无指定",
	"90": "90",
	"130": "130",
	"180": "180",
	"190": "190",
	"200": "200",
	"210": "210",
	"220": "220",
	"230": "230",
	"240": "240",
	"250": "250",
	"260": "260",
	"265": "265",
	"270": "270",
	"275": "275",
	"280": "280",

};

//飯ソート条件
var mealSortIndexList = {
	"按职业分类": {
		"坦克(耐力/招架)": "耐力:100,招架发动力:50",
		"龙僧忍(信念/暴击)": "信念:100,暴击:50,命中力:10",
		"诗人(暴击/信念)": "暴击:100,信念:50,命中力:10",
		"黒魔召唤(咏唱/信念)": "咏唱:100,信念:66,暴击:33,命中力:10",
		"治疗(信仰/咏唱)": "信仰:1,咏唱速度:1",
		"大地使者": "获得力:1,鉴别力:1,采集力:1",
		"能工巧匠": "作业精度:1,加工精度:1,制作力:1"
	},
	"按属性分类": {
		"耐力": "耐力:1",
		"招架发动力": "招架发动力:1",
		"暴击": "暴击:1",
		"信念": "信念:1",
		"技能速度": "技能速度:1",
		"命中力": "命中力:1",
		"咏唱速度": "咏唱速度:1",
		"信仰": "信仰:1",
		"制作力": "制作力:1",
		"加工精度": "加工精度:1",
		"作业精度": "作业精度:1",
		"采集力": "采集力:1",
		"获得力": "获得力:1",
		"鉴别力": "鉴别力:1",
		"中毒耐性": "中毒耐性:1",
		"静寂耐性": "静寂耐性:1",
		"失明耐性": "失明耐性:1",
		"睡眠耐性": "睡眠耐性:1",
		"加重耐性": "加重耐性:1",
		"减速耐性": "减速耐性:1",
		"眩晕耐性": "眩晕耐性:1",
		"止步耐性": "止步耐性:1",
		"分解精度": "分解精度:1",
		"装备损耗耐性": "装备损耗耐性:1",
	}
};

//選択飯
var selectedMeal = null;

//装備ソート条件
var sortMap = {
	"基础属性" : [
		{"name": "装备等级", "key": "base_glv", "order": "desc", "abbr": "LV"},
		{"name": "装备品级", "key": "base_ilv", "order": "desc", "abbr": "ILV"},
		{"name": "制作力", "key": "bonus_cp", "order": "desc", "abbr": "制作力"},
		{"name": "采集力", "key": "bonus_gp", "order": "desc", "abbr": "采集力"},
	],
	"基本属性": [
		{"name": "物理基本性能", "key": "main_phy_base", "order": "desc", "abbr": "物理"},
		{"name": "物理自动攻击", "key": "main_phy_aa", "order": "desc", "abbr": "物AA"},
		{"name": "攻击间隔", "key": "main_atk_interval", "order": "asc", "abbr": "间隔"},
		{"name": "魔法基本性能", "key": "main_mag_base", "order": "desc", "abbr": "魔法"},
		{"name": "格挡性能", "key": "main_block_perf", "order": "desc", "abbr": "格性"},
		{"name": "格挡发动力", "key": "main_block_chance", "order": "desc", "abbr": "格发"},
		{"name": "物理防御力", "key": "main_phy_def", "order": "desc", "abbr": "物防"},
		{"name": "魔法防御力", "key": "main_mag_def", "order": "desc", "abbr": "魔防"},
	],
	"加成属性": [
		{"name": "力量", "key": "bonus_str", "order": "desc", "abbr": "力量"},
		{"name": "灵巧", "key": "bonus_dex", "order": "desc", "abbr": "灵巧"},
		{"name": "耐力", "key": "bonus_vit", "order": "desc", "abbr": "耐力"},
		{"name": "智力", "key": "bonus_int", "order": "desc", "abbr": "智力"},
		{"name": "精神", "key": "bonus_mnd", "order": "desc", "abbr": "精神"},
		{"name": "信仰", "key": "bonus_pie", "order": "desc", "abbr": "信仰"},
		{"name": "命中力", "key": "bonus_hit", "order": "desc", "abbr": "命中"},
		{"name": "信念", "key": "bonus_will", "order": "desc", "abbr": "信念"},
		{"name": "暴击", "key": "bonus_crit", "order": "desc", "abbr": "暴击"},
		{"name": "招架发动力", "key": "bonus_dodge", "order": "desc", "abbr": "招架"},
		{"name": "技能速度", "key": "bonus_skill_speed", "order": "desc", "abbr": "技速"},
		{"name": "咏唱速度", "key": "bonus_spell_speed", "order": "desc", "abbr": "咏唱"},
		{"name": "获得力", "key": "bonus_gain", "order": "desc", "abbr": "获得"},
		{"name": "鉴别力", "key": "bonus_quality", "order": "desc", "abbr": "鉴别"},
		{"name": "作业精度", "key": "bonus_work", "order": "desc", "abbr": "作业"},
		{"name": "加工精度", "key": "bonus_edit", "order": "desc", "abbr": "加工"},
	],
	"其他": [
		{"name": "自动攻击DPS", "key": "_sp0", "order": "desc", "abbr": "AADPS" },
		{"name": "职业特化",      "key": "_sp1", "order": "desc", "abbr": "基准值" },

	],
};


//ボーナス和名
var showBonusList = {
	"bonus_str": "力量",
	"bonus_dex": "灵巧",
	"bonus_vit": "耐力",
	"bonus_int": "智力",
	"bonus_mnd": "精神",
	"bonus_pie": "信仰",
	"bonus_will": "信念",
	"bonus_hit": "命中力",
	"bonus_skill_speed": "技能速度",
	"bonus_spell_speed": "咏唱速度",
	"bonus_dodge": "招架发动力",
	"bonus_crit": "暴击",
	"bonus_earth": "土",
	"bonus_wind": "风",
	"bonus_ice": "冰",
	"bonus_fire": "火",
	"bonus_lightning": "雷",
	"bonus_water": "水",
	"bonus_work": "作业精度",
	"bonus_edit": "加工精度",
	"bonus_gain": "获得力",
	"bonus_quality": "鉴别力",
	"bonus_cp": "制作力",
	"bonus_gp": "采集力",
	"bonus_tolerant_cut": "斩击耐性",
	"bonus_tolerant_pierce": "突刺耐性",
	"bonus_tolerant_beat": "打击耐性",
	"bonus_tolerant_stan": "麻痹耐性",
	"bonus_tolerant_silent": "静寂耐性",
	"bonus_tolerant_dark": "失明耐性",
	"bonus_tolerant_poison": "中毒耐性",
	"bonus_tolerant_sleep": "睡眠耐性",
	"bonus_tolerant_stone": "石化耐性",
	"bonus_heavy": "加重耐性",
	"bonus_worn_down": "装备损耗耐性",
	"bonus_train": "精炼度提升量",
	"bonus_moral": "斗志",
};

//集約クラス名
var baseClassMap = ["战斗精英", "魔法导师", "大地使者", "能工巧匠"];

//ユーザ定義係数
var userCoefData = {};
var tmpUserCoefData = {};
var tmpCoefJobClass = "";

//クラス定義：集約クラス・基準値計算係数
//白／学／占／黒／機は未更新
var classMap = {
	"圣骑士" :   {"classes": ["圣骑士", "战斗精英", "全职业"],   "spList" : [ {"main_phy_base": 26.523}, {"bonus_vit": 1.000}, {"bonus_str": 1.000}, {"bonus_will": 0.396}, {"bonus_crit": 0.541}, {"bonus_skill_speed": 0.330} ]},
	"战士" :     {"classes": ["战士", "战斗精英", "全职业"],     "spList" : [ {"main_phy_base": 27.095}, {"bonus_vit": 1.000}, {"bonus_str": 1.000}, {"bonus_will": 0.387}, {"bonus_crit": 0.546}, {"bonus_skill_speed": 0.350} ]},
	"龙骑士" :   {"classes": ["龙骑士", "战斗精英", "全职业"],   "spList" : [ {"main_phy_base": 14.956}, {"bonus_str": 1.000}, {"bonus_will": 0.207}, {"bonus_crit": 0.279}, {"bonus_skill_speed": 0.170} ]},
	"武僧" :   {"classes": ["武僧", "战斗精英", "全职业"],   "spList" : [ {"main_phy_base": 15.459}, {"bonus_str": 1.000}, {"bonus_will": 0.212}, {"bonus_crit": 0.297}, {"bonus_skill_speed": 0.173} ]},
	"吟游诗人" : {"classes": ["吟游诗人", "战斗精英", "全职业"], "spList" : [ {"main_phy_base": 16.824}, {"bonus_dex": 1.000}, {"bonus_will": 0.215}, {"bonus_crit": 0.366}, {"bonus_skill_speed": 0.233} ]},
	"忍者"   :   {"classes": ["忍者", "战斗精英", "全职业"],     "spList" : [ {"main_phy_base": 15.195}, {"bonus_dex": 1.000}, {"bonus_will": 0.210}, {"bonus_crit": 0.282}, {"bonus_skill_speed": 0.141} ]},
	"黑魔法师" : {"classes": ["黑魔法师", "魔法导师", "全职业"], "spList" : [ {"main_mag_base": 11.884}, {"bonus_int": 1.000}, {"bonus_will": 0.206}, {"bonus_crit": 0.256}, {"bonus_spell_speed": 0.283} ]},
	"召唤师" :   {"classes": ["召唤师", "魔法导师", "全职业"],   "spList" : [ {"main_mag_base": 11.835}, {"bonus_int": 1.000}, {"bonus_will": 0.192}, {"bonus_crit": 0.287}, {"bonus_spell_speed": 0.195} ]},
	"白魔法师" : {"classes": ["白魔法师", "魔法导师", "全职业"], "spList" : [ {"main_mag_base":  9.128}, {"bonus_mnd": 1.000}, {"bonus_pie": 1.000}, {"bonus_will": 0.159}, {"bonus_crit": 0.182}, {"bonus_spell_speed": 0.135} ]},
	"学者" :     {"classes": ["学者", "魔法导师", "全职业"],     "spList" : [ {"main_mag_base":  9.128}, {"bonus_mnd": 1.000}, {"bonus_pie": 1.000}, {"bonus_will": 0.190}, {"bonus_crit": 0.266}, {"bonus_spell_speed": 0.316} ]},

	"剑术师" :   {"classes": ["剑术师", "战斗精英", "全职业"],   "spList" : [ {"main_phy_base": 26.523}, {"bonus_vit": 1.000}, {"bonus_str": 1.000}, {"bonus_will": 0.396}, {"bonus_crit": 0.541}, {"bonus_skill_speed": 0.330}  ]},	"斧術士" :   {"classes": ["斧術士", "战斗精英", "全职业"],   "spList" : [ {"main_phy_base": 27.095}, {"bonus_vit": 1.000}, {"bonus_str": 1.000}, {"bonus_will": 0.387}, {"bonus_crit": 0.546}, {"bonus_skill_speed": 0.350} ]},
	"枪术师" :   {"classes": ["枪术师", "战斗精英", "全职业"],   "spList" : [ {"main_phy_base": 14.956}, {"bonus_str": 1.000}, {"bonus_will": 0.207}, {"bonus_crit": 0.279}, {"bonus_skill_speed": 0.170} ]},
	"格斗家" :   {"classes": ["格斗家", "战斗精英", "全职业"],   "spList" : [ {"main_phy_base": 15.459}, {"bonus_str": 1.000}, {"bonus_will": 0.212}, {"bonus_crit": 0.297}, {"bonus_skill_speed": 0.173} ]},
	"弓箭手" :   {"classes": ["弓箭手", "战斗精英", "全职业"],   "spList" : [ {"main_phy_base": 16.824}, {"bonus_dex": 1.000}, {"bonus_will": 0.215}, {"bonus_crit": 0.366}, {"bonus_skill_speed": 0.233} ]},
	"双剑士" :   {"classes": ["双剑士", "战斗精英", "全职业"],   "spList" : [ {"main_phy_base": 15.459}, {"bonus_str": 1.000}, {"bonus_will": 0.212}, {"bonus_crit": 0.297}, {"bonus_skill_speed": 0.173} ]},
	"咒术师" :   {"classes": ["咒术师", "魔法导师", "全职业"],   "spList" : [ {"main_mag_base": 11.884}, {"bonus_int": 1.000}, {"bonus_will": 0.206}, {"bonus_crit": 0.256}, {"bonus_spell_speed": 0.283} ]},
	"秘术师" :   {"classes": ["秘术师", "魔法导师", "全职业"],   "spList" : [ {"main_mag_base": 11.835}, {"bonus_int": 1.000}, {"bonus_will": 0.192}, {"bonus_crit": 0.287}, {"bonus_spell_speed": 0.195} ]},
	"幻术师" :   {"classes": ["幻术师", "魔法导师", "全职业"],   "spList" : [ {"main_mag_base":  9.128}, {"bonus_mnd": 1.000}, {"bonus_pie": 1.000}, {"bonus_will": 0.159}, {"bonus_crit": 0.182}, {"bonus_spell_speed": 0.135} ]},

	"暗黑骑士":  {"classes": ["暗黑骑士", "战斗精英", "全职业"], "spList" : [ {"main_phy_base": 26.547}, {"bonus_vit": 1.000}, {"bonus_str": 1.000}, {"bonus_will": 0.380}, {"bonus_crit": 0.530}, {"bonus_skill_speed": 0.315} ]},
	"机工士" :   {"classes": ["机工士", "战斗精英", "全职业"],   "spList" : [ {"main_phy_base": 13.000}, {"bonus_dex": 1.000}, {"bonus_will": 0.174}, {"bonus_crit": 0.210}, {"bonus_skill_speed": 0.106} ]},
	"占星术士" : {"classes": ["占星术士", "魔法导师", "全职业"], "spList" : [ {"main_mag_base": 6.625}, {"bonus_mnd": 1.000}, {"bonus_pie": 1.000}, {"bonus_will": 0.283}, {"bonus_crit": 0.215}, {"bonus_spell_speed": 0.240} ]},

	"园艺工" :   {"classes": ["园艺工", "大地使者", "全职业"],   "spList" : [{"bonus_gain": 1}, {"bonus_quality": 1}, {"bonus_gp": 2}] },
	"采矿工" :   {"classes": ["采矿工", "大地使者", "全职业"],   "spList" : [{"bonus_gain": 1}, {"bonus_quality": 1}, {"bonus_gp": 2}] },
	"捕鱼人" :     {"classes": ["捕鱼人", "大地使者", "全职业"],     "spList" : [{"bonus_gain": 1}, {"bonus_quality": 1}, {"bonus_gp": 2}] },
	"锻铁匠" :   {"classes": ["锻铁匠", "能工巧匠", "全职业"],   "spList" : [{"bonus_edit": 1}, {"bonus_work": 1}, {"bonus_cp": 2}] },
	"炼金术士" : {"classes": ["炼金术士", "能工巧匠", "全职业"], "spList" : [{"bonus_edit": 1}, {"bonus_work": 1}, {"bonus_cp": 2}] },
	"制革匠" : {"classes": ["制革匠", "能工巧匠", "全职业"], "spList" : [{"bonus_edit": 1}, {"bonus_work": 1}, {"bonus_cp": 2}] },
	"烹调师" :   {"classes": ["烹调师", "能工巧匠", "全职业"],   "spList" : [{"bonus_edit": 1}, {"bonus_work": 1}, {"bonus_cp": 2}] },
	"裁衣匠" :   {"classes": ["裁衣匠", "能工巧匠", "全职业"],   "spList" : [{"bonus_edit": 1}, {"bonus_work": 1}, {"bonus_cp": 2}] },
	"雕金匠" :   {"classes": ["雕金匠", "能工巧匠", "全职业"],   "spList" : [{"bonus_edit": 1}, {"bonus_work": 1}, {"bonus_cp": 2}] },
	"刻木匠" :   {"classes": ["刻木匠", "能工巧匠", "全职业"],   "spList" : [{"bonus_edit": 1}, {"bonus_work": 1}, {"bonus_cp": 2}] },
	"铸甲匠" :   {"classes": ["铸甲匠", "能工巧匠", "全职业"],   "spList" : [{"bonus_edit": 1}, {"bonus_work": 1}, {"bonus_cp": 2}] }
};

var classEquipViewColumn = {
	"圣骑士":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "耐力", "力量", "命中力", "信念", "暴击", "招架发动力", "技能速度"], 
	"战士":     ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "耐力", "力量", "命中力", "信念", "暴击", "招架发动力", "技能速度"], 
	"龙骑士":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "力量", "耐力", "命中力", "信念", "暴击", "技能速度"], 
	"武僧":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "力量", "耐力", "命中力", "信念", "暴击", "技能速度"], 
	"吟游诗人": ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "灵巧", "耐力", "命中力", "信念", "暴击", "技能速度"], 
	"忍者":     ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "灵巧", "耐力", "命中力", "信念", "暴击", "技能速度"], 
	"黑魔法师": ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "智力", "耐力", "命中力", "信念", "暴击", "咏唱速度"], 
	"召唤师":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "智力", "耐力", "命中力", "信念", "暴击", "咏唱速度"], 
	"学者":     ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "精神", "信仰", "耐力", "命中力", "信念", "暴击", "咏唱速度"], 
	"白魔法师": ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "精神", "信仰", "耐力", "命中力", "信念", "暴击", "咏唱速度"], 
	"剑术师":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "耐力", "力量", "命中力", "信念", "暴击", "招架发动力", "技能速度"], 
	"斧術士":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "耐力", "力量", "命中力", "信念", "暴击", "招架发动力", "技能速度"], 
	"枪术师":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "力量", "耐力", "命中力", "信念", "暴击", "技能速度"], 
	"格斗家":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "力量", "耐力", "命中力", "信念", "暴击", "技能速度"], 
	"弓箭手":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "灵巧", "耐力", "命中力", "信念", "暴击", "技能速度"], 
	"双剑士":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "灵巧", "耐力", "命中力", "信念", "暴击", "技能速度"], 
	"咒术师":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "智力", "耐力", "命中力", "信念", "暴击", "咏唱速度"], 
	"秘术师":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "智力", "精神", "耐力", "命中力", "信念", "暴击", "咏唱速度"], 
	"幻术师":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "精神", "信仰", "耐力", "命中力", "信念", "暴击", "咏唱速度"], 

	"机工士":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "灵巧", "耐力", "命中力", "信念", "暴击", "技能速度"], 
	"暗黑骑士": ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "耐力", "力量", "命中力", "信念", "暴击", "招架发动力", "技能速度"], 
	"占星术士": ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "精神", "信仰", "耐力", "命中力", "信念", "暴击", "咏唱速度"], 

	"园艺工":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "获得力", "鉴别力", "采集力"], 
	"采矿工":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "获得力", "鉴别力", "采集力"], 
	"捕鱼人":     ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "获得力", "鉴别力", "采集力"], 
	"锻铁匠":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "作業精度", "加工精度", "制作力"], 
	"炼金术士": ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "作業精度", "加工精度", "制作力"], 
	"制革匠": ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "作業精度", "加工精度", "制作力"], 
	"烹调师":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "作業精度", "加工精度", "制作力"], 
	"裁衣匠":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "作業精度", "加工精度", "制作力"], 
	"雕金匠":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "作業精度", "加工精度", "制作力"], 
	"刻木匠":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "作業精度", "加工精度", "制作力"], 
	"铸甲匠":   ["物理基本性能", "魔法基本性能", "物理自动攻击", "攻击间隔", "格挡性能", "格挡发动力", "物理防御力", "魔法防御力", "作業精度", "加工精度", "制作力"], 
};

//クラス別パラメタ補正
var classAdjustMap = {
	"剑术师"  : {"str": 0.95, "dex": 0.90, "vit": 1.00, "int": 0.50, "mnd": 0.95, "pie": 0.80, "base_hp": 2600, "hp": 1.10, "mp_pie": 3.205, "base_mp": 5304},
	"圣骑士"  : {"str": 1.00, "dex": 0.95, "vit": 1.10, "int": 0.60, "mnd": 1.00, "pie": 0.85, "base_hp": 2600, "hp": 1.20, "mp_pie": 3.205, "base_mp": 5304},
	"格斗家"  : {"str": 1.00, "dex": 1.00, "vit": 0.95, "int": 0.45, "mnd": 0.85, "pie": 0.60, "base_hp": 2600, "hp": 1.05, "mp_pie": 2.413, "base_mp": 3978},
	"武僧"  : {"str": 1.10, "dex": 1.05, "vit": 1.00, "int": 0.50, "mnd": 0.90, "pie": 0.65, "base_hp": 2600, "hp": 1.10, "mp_pie": 2.413, "base_mp": 3978},
	"斧術士"  : {"str": 1.00, "dex": 0.90, "vit": 1.00, "int": 0.30, "mnd": 0.50, "pie": 0.40, "base_hp": 2600, "hp": 1.15, "mp_pie": 2.15, "base_mp": 3536},
	"战士"    : {"str": 1.05, "dex": 0.95, "vit": 1.10, "int": 0.40, "mnd": 0.55, "pie": 0.45, "base_hp": 2600, "hp": 1.25, "mp_pie": 2.15, "base_mp": 3536},
	"枪术师"  : {"str": 1.05, "dex": 0.95, "vit": 1.00, "int": 0.40, "mnd": 0.60, "pie": 0.70, "base_hp": 2600, "hp": 1.10, "mp_pie": 2.675, "base_mp": 4420},
	"龙骑士"  : {"str": 1.15, "dex": 1.00, "vit": 1.05, "int": 0.45, "mnd": 0.65, "pie": 0.75, "base_hp": 2600, "hp": 1.15, "mp_pie": 2.675, "base_mp": 4420},
	"弓箭手"  : {"str": 0.85, "dex": 1.05, "vit": 0.95, "int": 0.80, "mnd": 0.75, "pie": 0.80, "base_hp": 2600, "hp": 1.00, "mp_pie": 4.28, "base_mp": 7072},
	"吟游诗人": {"str": 0.90, "dex": 1.15, "vit": 1.00, "int": 0.85, "mnd": 0.80, "pie": 0.85, "base_hp": 2600, "hp": 1.05, "mp_pie": 4.28, "base_mp": 7072},
	"双剑士"  : {"str": 0.80, "dex": 1.00, "vit": 0.95, "int": 0.60, "mnd": 0.70, "pie": 0.60, "base_hp": 2600, "hp": 1.03, "mp_pie": 2.682, "base_mp": 4420},
	"忍者"    : {"str": 0.85, "dex": 1.10, "vit": 1.00, "int": 0.65, "mnd": 0.75, "pie": 0.65, "base_hp": 2600, "hp": 1.08, "mp_pie": 2.682, "base_mp": 4420},
	"幻术师"  : {"str": 0.50, "dex": 1.00, "vit": 0.95, "int": 1.00, "mnd": 1.05, "pie": 1.10, "base_hp": 2600, "hp": 1.00, "mp_pie": 6.4683, "base_mp": 10608},
	"白魔法师": {"str": 0.55, "dex": 1.05, "vit": 1.00, "int": 1.05, "mnd": 1.15, "pie": 1.20, "base_hp": 2600, "hp": 1.05, "mp_pie": 6.4683, "base_mp": 10608},
	"咒术师"  : {"str": 0.40, "dex": 0.95, "vit": 0.95, "int": 1.05, "mnd": 0.70, "pie": 1.15, "base_hp": 2600, "hp": 1.00, "mp_pie": 6.735, "base_mp": 11050},
	"黑魔法师": {"str": 0.45, "dex": 1.00, "vit": 1.00, "int": 1.15, "mnd": 0.75, "pie": 1.20, "base_hp": 2600, "hp": 1.05, "mp_pie": 6.735, "base_mp": 11050},
	"秘术师"  : {"str": 0.85, "dex": 0.95, "vit": 0.95, "int": 1.05, "mnd": 0.75, "pie": 1.00, "base_hp": 2600, "hp": 1.00, "mp_pie": 5.93, "base_mp": 9724},
	"召唤师"  : {"str": 0.90, "dex": 1.00, "vit": 1.00, "int": 1.15, "mnd": 0.80, "pie": 1.05, "base_hp": 2600, "hp": 1.05, "mp_pie": 5.93, "base_mp": 9724},
	"学者"    : {"str": 0.90, "dex": 1.00, "vit": 1.00, "int": 1.05, "mnd": 1.15, "pie": 1.20, "base_hp": 2600, "hp": 1.05, "mp_pie": 6.1987, "base_mp": 10166},

	"机工士":   {"str": 0.85, "dex": 1.15, "vit": 1.00, "int": 0.80, "mnd": 0.85, "pie": 0.85, "base_hp": 2600, "hp": 1.05, "mp_pie": 4.28, "base_mp": 7072},
	"暗黑骑士": {"str": 1.05, "dex": 0.95, "vit": 1.10, "int": 0.60, "mnd": 0.40, "pie": 0.40, "base_hp": 2600, "hp": 1.20, "mp_pie": 4.275, "base_mp": 7072},
	"占星术士": {"str": 0.50, "dex": 1.00, "vit": 1.00, "int": 1.05, "mnd": 1.15, "pie": 1.20, "base_hp": 2600, "hp": 1.05, "mp_pie": 6.4683, "base_mp": 10608},

	"刻木匠"  : {"str": 0.90, "dex": 1.00, "vit": 1.05, "int": 0.90, "mnd": 0.90, "pie": 0.90, "base_hp": 2600, "hp": 1.00, "mp_pie": 0, "base_mp": 0},
	"锻铁匠"  : {"str": 1.05, "dex": 0.90, "vit": 0.90, "int": 0.90, "mnd": 1.00, "pie": 0.90, "base_hp": 2600, "hp": 1.00, "mp_pie": 0, "base_mp": 0},
	"铸甲匠"  : {"str": 1.00, "dex": 0.90, "vit": 1.05, "int": 0.90, "mnd": 0.90, "pie": 0.90, "base_hp": 2600, "hp": 1.00, "mp_pie": 0, "base_mp": 0},
	"雕金匠"  : {"str": 0.90, "dex": 1.05, "vit": 0.90, "int": 1.00, "mnd": 0.90, "pie": 0.90, "base_hp": 2600, "hp": 1.00, "mp_pie": 0, "base_mp": 0},
	"制革匠": {"str": 0.90, "dex": 0.90, "vit": 1.05, "int": 1.00, "mnd": 0.90, "pie": 0.90, "base_hp": 2600, "hp": 1.00, "mp_pie": 0, "base_mp": 0},
	"裁衣匠"  : {"str": 0.90, "dex": 1.05, "vit": 0.90, "int": 0.90, "mnd": 1.00, "pie": 0.90, "base_hp": 2600, "hp": 1.00, "mp_pie": 0, "base_mp": 0},
	"炼金术士": {"str": 0.90, "dex": 0.90, "vit": 0.90, "int": 1.05, "mnd": 0.90, "pie": 1.00, "base_hp": 2600, "hp": 1.00, "mp_pie": 0, "base_mp": 0},
	"烹调师"  : {"str": 0.90, "dex": 0.90, "vit": 0.90, "int": 0.90, "mnd": 1.05, "pie": 1.00, "base_hp": 2600, "hp": 1.00, "mp_pie": 0, "base_mp": 0},
	"采矿工"  : {"str": 1.00, "dex": 0.90, "vit": 0.90, "int": 0.90, "mnd": 1.00, "pie": 0.90, "base_hp": 2600, "hp": 1.00, "mp_pie": 0, "base_mp": 0},
	"园艺工"  : {"str": 0.90, "dex": 1.00, "vit": 0.90, "int": 1.00, "mnd": 0.90, "pie": 0.90, "base_hp": 2600, "hp": 1.00, "mp_pie": 0, "base_mp": 0},
	"捕鱼人"    : {"str": 1.00, "dex": 1.00, "vit": 1.00, "int": 1.00, "mnd": 1.00, "pie": 1.00, "base_hp": 2600, "hp": 1.00, "mp_pie": 0, "base_mp": 0},
};

//クラス別特性
var traitsMap = {
	"剑术师"  :[{"level":8,  "attr": "vit", "value": 2},{"level":16, "attr": "vit", "value": 4},{"level":24, "attr": "vit", "value": 6}],
	"圣骑士"  :[{"level":8,  "attr": "vit", "value": 2},{"level":16, "attr": "vit", "value": 4},{"level":24, "attr": "vit", "value": 6}],
	"格斗家"  :[{"level":8,  "attr": "str", "value": 2},{"level":16, "attr": "str", "value": 4},{"level":24, "attr": "str", "value": 6}],
	"武僧"  :[{"level":8,  "attr": "str", "value": 2},{"level":16, "attr": "str", "value": 4},{"level":24, "attr": "str", "value": 6}],
	"斧術士"  :[{"level":8,  "attr": "vit", "value": 2},{"level":16, "attr": "vit", "value": 4},{"level":24, "attr": "vit", "value": 6}],
	"战士"    :[{"level":8,  "attr": "vit", "value": 2},{"level":16, "attr": "vit", "value": 4},{"level":24, "attr": "vit", "value": 6}],
	"暗黑骑士":[{"level":8,  "attr": "vit", "value": 2},{"level":16, "attr": "vit", "value": 4},{"level":24, "attr": "vit", "value": 6}],
	"枪术师"  :[{"level":8,  "attr": "str", "value": 2},{"level":16, "attr": "str", "value": 4},{"level":24, "attr": "str", "value": 6}],
	"龙骑士"  :[{"level":8,  "attr": "str", "value": 2},{"level":16, "attr": "str", "value": 4},{"level":24, "attr": "str", "value": 6}],
	"弓箭手"  :[{"level":14, "attr": "dex", "value": 2},{"level":16, "attr": "dex", "value": 4},{"level":32, "attr": "dex", "value": 6}],
	"吟游诗人":[{"level":14, "attr": "dex", "value": 2},{"level":16, "attr": "dex", "value": 4},{"level":32, "attr": "dex", "value": 6}],
	"机工士":  [{"level":8,  "attr": "dex", "value": 2},{"level":16, "attr": "dex", "value": 4},{"level":24, "attr": "dex", "value": 6}],
	"双剑士"  :[{"level":14, "attr": "dex", "value": 2},{"level":16, "attr": "dex", "value": 4},{"level":32, "attr": "dex", "value": 6}],
	"忍者"    :[{"level":14, "attr": "dex", "value": 2},{"level":16, "attr": "dex", "value": 4},{"level":32, "attr": "dex", "value": 6}],
	"幻术师"  :[{"level":8,  "attr": "mnd", "value": 2},{"level":16, "attr": "mnd", "value": 4},{"level":24, "attr": "mnd", "value": 6}],
	"白魔法师":[{"level":8,  "attr": "mnd", "value": 2},{"level":16, "attr": "mnd", "value": 4},{"level":24, "attr": "mnd", "value": 6}],
	"占星术士":[{"level":8,  "attr": "mnd", "value": 2},{"level":14, "attr": "mnd", "value": 4},{"level":24, "attr": "mnd", "value": 6}],
	"呪術師"  :[{"level":8,  "attr": "int", "value": 2},{"level":16, "attr": "int", "value": 4},{"level":24, "attr": "int", "value": 6}],
	"黑魔法师":[{"level":8,  "attr": "int", "value": 2},{"level":16, "attr": "int", "value": 4},{"level":24, "attr": "int", "value": 6}],
	"秘术师"  :[{"level":14, "attr": "int", "value": 2},{"level":16, "attr": "int", "value": 4},{"level":32, "attr": "int", "value": 6}],
	"召唤师"  :[{"level":14, "attr": "int", "value": 2},{"level":16, "attr": "int", "value": 4},{"level":32, "attr": "int", "value": 6}],
	"学者"    :[{"level":14, "attr": "int", "value": 2},{"level":16, "attr": "int", "value": 4},{"level":32, "attr": "int", "value": 6}],
};

//タイプ分類
//空文字列は表示上の改行位置
var classTypeMap = {
	"坦克": ["圣骑士", "战士", "剑术师", "斧術士", "暗黑骑士"],
	"DPS": ["龙骑士", "武僧", "忍者", "吟游诗人", "机工士", "黑魔法师", "召唤师", "", "枪术师", "格斗家", "双剑士", "弓箭手", "咒术师", "秘术师"],
	"治疗": ["白魔法师", "学者", "占星术士", "幻术师"],
	"能工巧匠": ["刻木匠", "锻铁匠", "铸甲匠", "雕金匠", "制革匠", "裁衣匠", "炼金术士", "烹调师"],
	"大地使者": ["园艺工", "采矿工", "捕鱼人"],
};

//詳細タイプ分類
var CLASS_TYPE_NONE = 0;
var CLASS_TYPE_GATHERER = 1;
var CLASS_TYPE_CRAFTER = 2;
var CLASS_TYPE_TANK = 3;
var CLASS_TYPE_MELEE_STR = 4;
var CLASS_TYPE_MELEE_DEX = 5;
var CLASS_TYPE_RANGED = 6;
var CLASS_TYPE_CASTER = 7;
var CLASS_TYPE_HEALER = 8;

var classTypeDetailMap = {
	CLASS_TYPE_GATHERER:	["园艺工", "采矿工", "捕鱼人"],
	CLASS_TYPE_CRAFTER:		["刻木匠", "锻铁匠", "铸甲匠", "雕金匠", "制革匠", "裁衣匠", "炼金术士", "烹调师"],
	CLASS_TYPE_TANK:		["圣骑士", "战士", "剑术师", "斧術士", "暗黑骑士"],
	CLASS_TYPE_MELEE_STR:	["龙骑士", "武僧", "枪术师", "格斗家"],
	CLASS_TYPE_MELEE_DEX:	["忍者", "双剑士"],
	CLASS_TYPE_RANGED:		["吟游诗人", "机工士", "弓箭手"],
	CLASS_TYPE_CASTER:		["黑魔法师", "召唤师", "咒术师", "秘术师"],
	CLASS_TYPE_HEALER:		["白魔法师", "学者", "占星术士", "幻术师"],
};



//種族別補正
var tribeAdjustMap = {
	"人族：中原之民":   {"str": 1, "dex": -1, "vit": 0, "int": 1, "mnd": -2, "pie": 1},
	"人族：高地之民":     {"str": 3, "dex": 0, "vit": 2, "int": -2, "mnd": 0, "pie": -3},
	"精灵族：森林之民":       {"str": -1, "dex": 3, "vit": -2, "int": 2, "mnd": -3, "pie": 1},
	"精灵族：黑影之民":         {"str": 0, "dex": 0, "vit": -1, "int": 3, "mnd": 0, "pie": -2},
	"拉拉菲尔族：平原之民": {"str": -2, "dex": 2, "vit": -2, "int": 1, "mnd": 0, "pie": 1},
	"拉拉菲尔族：沙漠之民": {"str": -3, "dex": 0, "vit": -3, "int": 1, "mnd": 2, "pie": 3},
	"猫魅族：逐日之民":       {"str": 1, "dex": 2, "vit": 0, "int": -2, "mnd": -1, "pie": 0},
	"猫魅族：护月之民":     {"str": -2, "dex": 1, "vit": -3, "int": -1, "mnd": 3, "pie": 2},
	"鲁加族：北洋之民":     {"str": 2, "dex": -2, "vit": 3, "int": -3, "mnd": 1, "pie": -1},
	"鲁加族：红焰之民":   {"str": 0, "dex": -3, "vit": 1, "int": 0, "mnd": 2, "pie": 0},
	"敖龙族：晨曦之民":         {"str": -3, "dex":  1, "vit": -2, "int": 0, "mnd":  2, "pie":  2},
	"敖龙族：暮晖之民":         {"str":  3, "dex":  0, "vit":  1, "int": 0, "mnd": -3, "pie": -1},
};

//守護神別補正
var godAdjustMap = {
	"哈罗妮": {"fire": 0, "ice": 4, "wind": 3, "earth": 2, "lightning": 2, "water": 2},
	"梅茵菲娜": {"fire": 0, "ice": 4, "wind": 3, "earth": 2, "lightning": 2, "water": 2},
	"沙利亚克": {"fire": 2, "ice": 2, "wind": 2, "earth": 3, "lightning": 0, "water": 4},
	"妮美雅": {"fire": 2, "ice": 2, "wind": 2, "earth": 3, "lightning": 0, "water": 4},
	"利姆莱茵": {"fire": 3, "ice": 0, "wind": 4, "earth": 2, "lightning": 2, "water": 2},
	"奥修昂": {"fire": 3, "ice": 0, "wind": 4, "earth": 2, "lightning": 2, "water": 2},
	"比尔格": {"fire": 2, "ice": 2, "wind": 2, "earth": 0, "lightning": 4, "water": 3},
	"拉尔戈": {"fire": 2, "ice": 2, "wind": 2, "earth": 0, "lightning": 4, "water": 3},
	"阿泽玛": {"fire": 4, "ice": 3, "wind": 0, "earth": 2, "lightning": 2, "water": 2},
	"纳尔札尔": {"fire": 4, "ice": 3, "wind": 0, "earth": 2, "lightning": 2, "water": 2},
	"诺菲卡": {"fire": 2, "ice": 2, "wind": 2, "earth": 4, "lightning": 3, "water": 0},
	"阿尔基克": {"fire": 2, "ice": 2, "wind": 2, "earth": 4, "lightning": 3, "water": 0},
};

//ロドスト解析用：画像ファイル名とクラス名マップ
//3.0対応済
var imageClassMap = {
	"ec5d264e53ea7749d916d7d8bc235ec9c8bb7b51": "剑术师",
	"626a1a0927f7d2510a92558e8032831264110f26": "圣骑士",
	"9fe08b7e2827a51fc216e6407646ffba716a44b8": "格斗家",
	"8873ffdf5f7c80770bc40f5b82ae1be6fa1f8305": "武僧",
	"5ca476c2166b399e3ec92e8008544fdbea75b6a2": "斧術士",
	"2de279517a8de132f2faad4986a507ed728a067f": "战士",
	"a2a6213832a266f8c5145f7cbb8b8e8c9d8c6e25": "暗黑骑士",
	"924ded09293b2a04c4cd662afbf7cda7b0576888": "枪术师",
	"36ce9c4cc01581d4f900102cd51e09c60c3876a6": "龙骑士",
	"d39804e8810aa3d8e467b7a476d01965510c5d18": "弓箭手",
	"7a72ef2dc1918f56e573dd28cffcec7e33a595df": "吟游诗人",
	"2f21a984aab9ff20acc2cc9bcf0ffe544a33f3a1": "机工士",
	"2d0ac2fdb4fd432d6b91acd7afbc335e87e877fb": "双剑士",
	"1d4a1cf6021705ee62c5b5dfc100781f0f272623": "忍者",
	"6157497a98f55a73af4c277f383d0a23551e9e98": "幻术师",
	"c460e288d5db83ebc90d0654bee6d0d0a0a9582d": "白魔法师",
	"970e5301281cba4ce374530f5949b74d7df083af": "占星术士",
	"e2a98c81ca279607fc1706e5e1b11bc08cac2578": "呪術師",
	"98d95dec1f321f111439032b64bc42b98c063f1b": "黑魔法师",
	"59fde9fca303490477962039f6cd0d0101caeabe": "秘术师",
	"2c38a1b928c88fd20bcc74fe0b4d9ba0a8f56f67": "召唤师",
	"ee5788ae748ff28a503fecbec2a523dbc6875298": "学者",
	"d41cb306af74bb5407bc74fa865e9207a5ce4899": "刻木匠",
	"6e0223f41a926eab7e6bc42af7dd29b915999db1": "锻铁匠",
	"aab4391a4a5633684e1b93174713c1c52f791930": "铸甲匠",
	"605aa74019178eef7d8ba790b3db10ac8e9cd4ca": "雕金匠",
	"f358b50ff0a1b1dcb67490ba8f4c480e01e4edd7": "制革匠",
	"131b914b2be4563ec76b870d1fa44aa8da0f1ee6": "裁衣匠",
	"343bce834add76f5d714f33154d0c70e99d495a3": "炼金术士",
	"86f1875ebc31f88eb917283665be128689a9669b": "烹调师",
	"8e82259fcd979378632cde0c9767c15dba3790af": "采矿工",
	"937d3313d9d7ef491319c38a4d4cde4035eb1ab3": "园艺工",
	"289dbc0b50956ce10a2195a75a22b500a648284e": "捕鱼人",
};


//3.0対応済（ロドストからサンプリングして算出）
var statusAMap = [
	0,20,21,22,24,26,27,29,31,33,35,36,38,41,45,46,49,52,54,57,60,64,67,71,74,78,81,85,91,92,97,102,106,110,115,119,124,128,134,139,144,150,155,161,166,171,177,183,189,196,202,
	204,205,207,209,210,212,214,215,217,218
];

//ステータス計算係数：B
//3.0対応済（属性値より）
var statusBMap = [
	0,50,52,54,56,58,60,62,64,66,68,71,73,76,79,82,84,87,91,93,96,100,103,107,111,115,119,123,127,131,135,141,146,151,157,163,168,174,179,184,190,198,205,213,221,229,236,244,252,259,267,
	268, 269, 271, 272, 273, 274, 276, 277, 278, 280
];

//ステータス計算係数：C
//3.0対応済（詩人スペスピより）
var statusCMap = [
    0,56,57,60,62,65,68,70,73,76,78,82,85,89,93,96,100,104,109,113,117,122,127,133,138,144,150,155,162,168,173,181,188,194,202,209,215,223,229,236,244,253,263,272,283,292,302,311,322,331,341,
	342,344,345,346,347,349,350,351,352,354,
];

//レベル別フィジカルボーナス最大値
//最後の行は誤動作防止用に少し多めに定義しているだけ
var pbMaxList = [
	 0, 
	 0,  0,  0,  0,  0,  0,  0,  0,  0,  3,
	 3,  4,  4,  5,  5,  6,  6,  7,  7,  8,
	 8,  9,  9, 10, 10, 11, 11, 12, 12, 13,
	13, 14, 14, 15, 15, 16, 17, 18, 19, 20,
	21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
	31, 31, 32, 32, 33, 33, 34, 34, 35, 35,
	35, 35, 35, 35, 35, 35, 35, 35, 35, 35
];


//副武器が装備できない主武器
var invalidEquipSubArmList = [
	"格斗武器",
	"大斧",
	"长枪",
	"弓",
	"双手幻杖",
	"双手咒杖",
	"魔导书",
	"双剑",
	"双手大剑",
	"魔导火枪",
	"天球仪"
];

//装備箇所とセレクトボックスのマッピング
var partsAbbrMap = {
	"头部" : "equip_selector_20",
	"身体" : "equip_selector_30",
	"手部" : "equip_selector_40",
	"腰部" : "equip_selector_50",
	"腿部" : "equip_selector_60",
	"脚部" : "equip_selector_70",
	"副手" : "equip_selector_80"
}

//装備セレクトボックス名リスト
var equipSelectorList = [
	"equip_selector_10",
	"equip_selector_20",
	"equip_selector_30",
	"equip_selector_40",
	"equip_selector_50",
	"equip_selector_60",
	"equip_selector_70",
	"equip_selector_80",
	"equip_selector_90",
	"equip_selector_100",
	"equip_selector_110",
	"equip_selector_120",
	"equip_selector2_120",
];

//マテリアセレクトボックス名リスト
var materiaSelectorList = [
	"materia_selector_10",
	"materia_selector_20",
	"materia_selector_30",
	"materia_selector_40",
	"materia_selector_50",
	"materia_selector_60",
	"materia_selector_70",
	"materia_selector_80",
	"materia_selector_90",
	"materia_selector_100",
	"materia_selector_110",
	"materia_selector_120",
	"materia_selector2_120",
];

//装備箇所名称 equipSelectorListの順と連携
var equipPointNameList = [
	"主武器",
	"头部",
	"上衣",
	"手部",
	"腰带",
	"下衣",
	"鞋子",
	"副武器",
	"项链",
	"耳环",
	"手镯",
	"戒指1",
	"戒指2",
];

//セレクトボックスリスト
var jqsEquipList = {};
var jqsMateriaList = {};
var targetJqs = null;

//フィルタ
var filterJobClass = "";
var filterLevel = "";
var filterSortBy = "";
var filterAfterFunc = null;

//フィジカルボーナス
var maxPB = 0;
var sumPB = 0;
var pbList = {
	"str": 0,
	"dex": 0,
	"vit": 0,
	"int" : 0,
	"mnd" : 0,
	"pie" : 0
};

//適用済特性リスト
var traitsList = {};

//お気に入りリスト
var favoriteList = [];

//装備中装備リスト
var analyzedData = null;

//処理用フラグ
var isFirstFilter = true;
var isForce = false;

//ロドスト：画面表示用ID
var importId = 0;

//ノウスユーザデータ
var userNovusData = {};

//ノウス武器IDリスト
//	limit 武器におけるパラメタ上限
var novusList = {
	"1811df917b3": {"type": "novus", "limit": 53},
	"a35eda383b1": {"type": "novus", "limit": 75},
	"a4d710d1be8": {"type": "novus", "limit": 75},
	"004486c30d8": {"type": "novus", "limit": 75},
	"8994ccf991b": {"type": "novus", "limit": 75},
	"349654df6a1": {"type": "novus", "limit": 75},
	"32f9d344b01": {"type": "novus", "limit": 75},
	"1c68c2d979d": {"type": "novus", "limit": 75},
	"b11a6e3bafc": {"type": "novus", "limit": 75},
	"0e5c3ddccd0": {"type": "novus", "limit": 22},
	"f7faeae697e": {"type": "novus", "limit": 75},

	// 以下ネクサス
	"fe0462845fb": {"type": "nexus", "limit": 56},
	"ca128448bbb": {"type": "nexus", "limit": 78},
	"dc4d8c3723a": {"type": "nexus", "limit": 78},
	"6bf0defbb81": {"type": "nexus", "limit": 78},
	"1d4d46a95b8": {"type": "nexus", "limit": 78},
	"a4571e3505d": {"type": "nexus", "limit": 78},
	"1bd1e53d5a7": {"type": "nexus", "limit": 78},
	"02b3bc6234b": {"type": "nexus", "limit": 78},
	"774bba3ca6a": {"type": "nexus", "limit": 78},
	"a59a3cf58bb": {"type": "nexus", "limit": 22},
	"2d7b83cb80e": {"type": "nexus", "limit": 78},

	//以下RZW
	"8c886018268" : {"type": "rzw", "limit": 59},	//エクスカリバー
	"27d363b4142" : {"type": "rzw", "limit": 84},	//カイザーナックル
	"ac59358568c" : {"type": "rzw", "limit": 84},	//ラグナロク
	"d45e7b93f88" : {"type": "rzw", "limit": 84},	//ロンギヌス
	"2d37d63fc1e" : {"type": "rzw", "limit": 84},	//与一の弓
	"d9f5fa009cb" : {"type": "rzw", "limit": 84},	//佐助の刀
	"8ba81058ead" : {"type": "rzw", "limit": 84},	//ニルヴァーナ
	"abe94728a94" : {"type": "rzw", "limit": 84},	//リリスロッド
	"d4ebb19c75f" : {"type": "rzw", "limit": 84},	//アポカリプス
	"986ad489ff5" : {"type": "rzw", "limit": 84},	//ラストリゾート
	"1ea47510218" : {"type": "rzw", "limit": 25},	//イージスの盾

	//以下zwz
	"598abb7dd01" : {"type": "zwz", "limit": 65},	//エクスカリバー
	"099a61e4271" : {"type": "zwz", "limit": 91},	//カイザーナックル
	"74dbad6b694" : {"type": "zwz", "limit": 91},	//ラグナロク
	"37fb2c76401" : {"type": "zwz", "limit": 91},	//ロンギヌス
	"32b9fecf683" : {"type": "zwz", "limit": 91},	//与一の弓
	"ab5dc14def0" : {"type": "zwz", "limit": 91},	//佐助の刀
	"5a44646f9bd" : {"type": "zwz", "limit": 91},	//ニルヴァーナ
	"54544cbc40f" : {"type": "zwz", "limit": 91},	//リリスロッド
	"2b216db16bc" : {"type": "zwz", "limit": 91},	//アポカリプス
	"67e19fd475b" : {"type": "zwz", "limit": 91},	//ラストリゾート
	"9139260df17" : {"type": "zwz", "limit": 26},	//イージスの盾

	//以下AW（コンダクトの次）
	"80ed1ac7d77" : {"type": "aw", "limit": 172},	// セインズソード
	"a6119e0b3af" : {"type": "aw", "limit":  68},	// セインズシールド
	"1d74b70d57b" : {"type": "aw", "limit": 240},	// ブラッドエンペラーアクス
	"a6d90f52567" : {"type": "aw", "limit": 240},	// タイラントディバイダー
	"43444b7f464" : {"type": "aw", "limit": 240},	// オーバーロードトライデント
	"1117cd44909" : {"type": "aw", "limit": 240},	// スルタンズフィスト
	"e110f87c706" : {"type": "aw", "limit": 240},	// オクターウボウ
	"aeed2910c0d" : {"type": "aw", "limit": 240},	// ダイナストファイア
	"fc910b88f7c" : {"type": "aw", "limit": 240},	// ソーンプリンスブレード
	"00feac5b14d" : {"type": "aw", "limit": 240},	// ブラックハーンロッド
	"0e20416b813" : {"type": "aw", "limit": 240},	// ブック・オブ・マッドクィーン
	"97c6e1d84d2" : {"type": "aw", "limit": 240},	// ホワイトザールケーン
	"8432a81fa47" : {"type": "aw", "limit": 240},	// ワード・オブ・マグネート
	"db49ff78d11" : {"type": "aw", "limit": 240},	// ラストエアープラニスフィア

	//AWシャープ
	//上限は仮
	"0a3daa282fd": {"type": "aws", "limit": 195},
	"58e3d796fe0": {"type": "aws", "limit":  80},
	"e3b68249ee7": {"type": "aws", "limit": 270},
	"fcdc715f7c7": {"type": "aws", "limit": 270},
	"580bf49fb86": {"type": "aws", "limit": 270},
	"f7607d58e95": {"type": "aws", "limit": 270},
	"c047f4fe2c7": {"type": "aws", "limit": 270},
	"a2e8660bd5d": {"type": "aws", "limit": 270},
	"6bd599a6025": {"type": "aws", "limit": 270},
	"55ff1fe8018": {"type": "aws", "limit": 270},
	"59c6fb24715": {"type": "aws", "limit": 270},
	"1b7e7f27036": {"type": "aws", "limit": 270},
	"1405f6bf8f4": {"type": "aws", "limit": 270},
	"315e38bb6d9": {"type": "aws", "limit": 270},


	//AW270
	//上限は仮
	"ffffffff061": {"type": "awc", "limit": 200},
	"ffffffff062": {"type": "awc", "limit":  85},
	"ffffffff063": {"type": "awc", "limit": 285},
	"ffffffff064": {"type": "awc", "limit": 285},
	"ffffffff065": {"type": "awc", "limit": 285},
	"ffffffff066": {"type": "awc", "limit": 285},
	"ffffffff067": {"type": "awc", "limit": 285},
	"ffffffff068": {"type": "awc", "limit": 285},
	"ffffffff069": {"type": "awc", "limit": 285},
	"ffffffff070": {"type": "awc", "limit": 285},
	"ffffffff071": {"type": "awc", "limit": 285},
	"ffffffff072": {"type": "awc", "limit": 285},
	"ffffffff073": {"type": "awc", "limit": 285},
	"ffffffff074": {"type": "awc", "limit": 285},

	//AW275
	//上限は仮
	"ffffffff081": {"type": "awl", "limit": 205},
	"ffffffff082": {"type": "awl", "limit":  85},
	"ffffffff083": {"type": "awl", "limit": 290},
	"ffffffff084": {"type": "awl", "limit": 290},
	"ffffffff085": {"type": "awl", "limit": 290},
	"ffffffff086": {"type": "awl", "limit": 290},
	"ffffffff087": {"type": "awl", "limit": 290},
	"ffffffff088": {"type": "awl", "limit": 290},
	"ffffffff089": {"type": "awl", "limit": 290},
	"ffffffff090": {"type": "awl", "limit": 290},
	"ffffffff091": {"type": "awl", "limit": 290},
	"ffffffff092": {"type": "awl", "limit": 290},
	"ffffffff093": {"type": "awl", "limit": 290},
	"ffffffff094": {"type": "awl", "limit": 290},


};


//ノウスパラメタキー一覧
var novusParamKeys = [
	"pie",
	"hit",
	"will",
	"crit",
	"skill_speed",
	"spell_speed",
	"dodge"
];

//ノウスパラメタ上限（ただし武器別上限の方が優先）
//IL 110 => 合計75
//IL 115 => 78
//IL 120 => 80
//IL 125 => 83-4？
//IL 130 => 87
//IL 135 => 90
var novusParamLimit = {
	"novus": {
		"pie": 33,
		"hit": 44,
		"will": 31,
		"crit": 44,
		"skill_speed": 44,
		"spell_speed": 44,
		"dodge": 44,
	},
	"nexus": {
		"pie": 35,
		"hit": 46,
		"will": 32,
		"crit": 46,
		"skill_speed": 46,
		"spell_speed": 46,
		"dodge": 46,
	},
	"rzw": {
		"pie": 37,
		"hit": 49,
		"will": 35,
		"crit": 49,
		"skill_speed": 49,
		"spell_speed": 49,
		"dodge": 49,
	},
	"zwz": { /* バハ武器からの想定値 */
		"pie": 41, 
		"hit": 53,
		"will": 38,
		"crit": 53,
		"skill_speed": 53,
		"spell_speed": 53,
		"dodge": 53,
	},

	"aw": {
		"pie": 130, 
		"hit": 130,
		"will": 130,
		"crit": 130,
		"skill_speed": 130,
		"spell_speed": 130,
		"dodge": 130,
	},

	"aws": {
		"pie": 150, 
		"hit": 150,
		"will": 150,
		"crit": 150,
		"skill_speed": 150,
		"spell_speed": 150,
		"dodge": 150,
	},

	"awc": {
		"pie": 150, 
		"hit": 150,
		"will": 150,
		"crit": 150,
		"skill_speed": 150,
		"spell_speed": 150,
		"dodge": 150,
	},

	"awl": {
		"pie": 160, 
		"hit": 160,
		"will": 160,
		"crit": 160,
		"skill_speed": 160,
		"spell_speed": 160,
		"dodge": 160,
	},


};

//aw装備別上限
var awParamLimit = {
	"aw" : {
		"ffffffff021": {"dodge": 86, "hit": 86, "cri": 86, "will": 82, "skill_speed": 86},	//ナイト剣
		"ffffffff022": {"dodge": 34, "hit": 34, "cri": 34, "will": 33, "skill_speed": 34},	//ナイト盾
		
		"ffffffff033": {"pie": 126, "hit": 120, "crit": 120, "will": 115, "spell_speed": 120},	//学者
		"default": novusParamLimit["aw"]
	}
};

//ノウスウィンドウID
var novusWindowId = "";

//処理中ノウスID
var novusId = "";

//食事上限チェック
var mealLimitMap = {};

//マウスカーソル位置
var mx = 0;
var my = 0;

//命中ポップアップ用
var acHideTimerId = -1;
var acFadeTimerId = -1;
var acOpacity = 1;

//命中維持装備調整用グローバル
var acrCandidateList = {};
var acrWorkList = {};
var acrResultList = {};
var acrTarget = 0;
var acrBase = 341;
var acrCalcCount = 0;
var acrInvalidEquipSelector = [];

//var calcEquipAccrBase = 341;//LV50での無装備時命中 NOTE 要3.0対応
var calcEquipAccrBase = 354;//LV60での無装備時命中

//装備選択用
var scrollTop = 0;//スクロール位置

//ランダムパラメタ装備用
var rpIdList = [
	//IL280
	"fffffffe001", "fffffffe002", "fffffffe003", "fffffffe004", "fffffffe005", "fffffffe006", "fffffffe007", "fffffffe008", "fffffffe009", "fffffffe010", "fffffffe011", "fffffffe012", "fffffffe013", "fffffffe014",

	//IL265
	"6d3833083a2", "6b73a5d0828", "9eb5024d320", "c3b39e10620", "1398d63b333", "c8d98df7e81", "074497d8883", "df1684948ba", "bd8149534ab", "5e6894c02fb", "2a84ff4bba6", "77117f684c3", "839319be359", "5c7275ecf3e", "bd1ce590526", "454f7d7d25b", "68177cf9680", "39a6b9647e4", "50a5844c3ee", "d6ce9a81b8e", "1ade2159154", "2779609d141", "c6766eec97e", "f5161a2f82a", "9b43c9f180f", "fdb525e98a0", "7f284656569", "06843a6ff4c", "6bcf8e30579", "6045fb741c7", "75f38181386", "9dcae403bd7", "d01dbd08a99", "ae2c193e659", "2c44cd57805", "de82eacb21c", "9da94dc21ab", "e8eec8fa202", "7390d0e195e", "afaf601ddec", "c1142bfeb31", "f601fa771fe", "8ad666883e4", "5649cd8b054", "b6622982150", "950d5878302", "b2f31bb8a3c", "fc8a1472c9c", "cc0647453df", "7ae154d6636", "5b9ab84142d", "399ded27de8", "6205e3dadf6", "09a12a75d24", "da09ff1ecdc", "44fda4f4201", "571554d8dfe", "b06786f999f", "32c2b08578c", "9c405b6d4df", "b3b9e283265", "59d5baa1fd4", 

	//IL235
	"34a206d0c4f", "22eb62ddf2b", "bdbf495ac9a", "25a40643bc7", "217e53be42a", "336b313a870", "06c344e6e69", "1d8be948ae3", "5f54e40ec18", "a844d7fbb7f", "b942fa8b01e", "827eb088286", "02c181789bf", "11cb5980c01", "04d22d912eb", "bb6d654550c", "3e820d56c47", "fc194be340f", "edf49fe97df", "a7927793ca5", "6fa2f65be99", "b782a2df429", "adc6989adfd", "c35fa785bae", "aa123bfb1ec", "31e7f511812", "900f51a0ec1", "eeb5835fbab", "ea6b7015e58", "64a9d033b54", "fa0e8ec15cd", "6cdb38f0619", "63a64422cc7", "8af7ec430d9", "04ee4546930", "925e103feab", "d78e339d63a", "5fdef618330", "a04525faf0e", "53613c71148", "dcd194a8295", "b4958026049", "60171f2b427", "64a3c2006af", "c455115b475", "885010aafa1", "d9f0e3e935f", "73c1871e2a4", "a2938eeae70", "337229e58b2", "73bbe17ccc4", "4ea5b27c972", "4d4896e94a9", "cfa40202dfe", "afd999d5717", "c62c8112904", "925bbc7fc79", "adb91fadc08", "3188b1e9ca8", "a85d9b6e88f", "24478f2e75c", "0ff404fdabe", 

	//IL180以下
	"fa153ef3a88", "351fd8ad794", "d186e15fb4e", "3b7bca5c32a", "813c3abbe97", "131e74bb183", "ad4ff9ead5e", "a3f29c5429a", "888f214604a", "d20b3707423", "03855be4d84", "53e00b3d1e7", "6b3393a8b14", "ecb43df7de0", "f8099a95bfd", "8b19d389cac", "f165d3ef254", "bfaeccf32c7", "be54eedac8a", "5c7d5870be3", "e41015c338e", "3feaae90ba9", "854439a1e84", "4d1c532e2a4", "1c2ffd8a904", "97d67b8140b", "c5cac83f514", "132e9930aba", "12914b810fb", "bdc1ecb2694", "9a3ee5a9e78", "06d1b682be7", "7e7b18561d8", "d1ddd0f4d47", "105d0d49296", "7c3c0963a7e", "1b1cf51d99e", "e323b5ece7d", "4cca2e6e8e1", "45c1b2b99ab", "5186d180fab", "de76341e898", "cbae4d84fbf", "47576eb1ccc", "b7e1085ce7e", "b91039a233c", "b2232000555", "12709fcd90b", "588b120f37e", "6e9a4d3bbd8", "b1ba20d75c1", "f0e0b3d605a", "88407bd2b89", "9c1bd77e8bd", "7863d18ae8f", "fab7ccb29c7", "5144fe5cd78", "9be8fb6a37e", "de4b78edcef", "89fa1b92f5c", "dda3fdd3fcb", "da31b276dea", "72b4ea0855f", "f68c730fcf0", "22fe1fd9007", "fe2abcf4fd8", "f7beb7642fa", "fa0c9b8a76f", "f1458ed21ee", "6819055b062", "17f2877ad0b", "3141d7a8489", "b7e95e1ffe3", "f765b88c56a", "b639170a2df", "349ad62083b", "5f91427e1dd", "9a852c9e362", "d5bc4ed505a", "7595e64b1e7", "c9addf29d36", "f0f903f548b", "d4441010874", "6d4208487ad", "43af3b2d28e", "8c37c3de789", "8d9f0f9ed3d", "888a6104154", "3341d2038e7", "50247122089", "c696b536200", "ea9b7a108d1", "84d9cc145ad", "713781daf4c", "92d9f1a92af", "2a846842c91", "48cfe9a01bf", "0d8b0af414d", "32091f51b87", "f8cc8461755", "b5a47cbd19a", "232b7d01299", "d1bf83fdab7", "9f4dda6304d", "40cdba6774b", "0e0a64eaec0", "09d9dbf45a9", "fe6843ad0f4", "2abf6d20c83", "e4acb142004", "e5e0e152a6a", "168795aead5", "41f941c7a5d", "a9a744e5052", "d97af579845", "fb8ff151cf8", "7fcfd5e50c6", "f8df7486ff7", "a3e058b3ae0", "ad070206291", "a8fafe0bd31", "5364b106f5f", "d85d1efc32a", "1e79d3ce1c4", "99b6eed3905", "b5cac8f8ee1", "36518393bda", "6745420dbbe", "52351eaccff", "c1176e55b83", "a1479a47d57", "1a11412e980", "f413776c103", "1263aa1d320", "650f642d36e", "e875af3798a", "efee1217336", "c329630dcc7", "92882b14cf3", "05039aed792", "277314e0a45", "06cbb44ca96", "db3d5353d89", "cc4942c48e6", "87ccfe7f676", "f09d31da434", "3de5fb2f4c3", "f9752465e65", "125b81aa14e", "e3ade70502a", "eefc0638eda", "c862fe2feb5", "4da8b041fa2", "4ab5cd60ec2", "358c3bf6be3", "4a2f7413b4b", "b284979ff4a", "31f7f062115", "615edc29935", "6c568a3a755", "5b2ee9d71c0", "224ce67c5f8", "5356ae2a8f7", "ff11b1453fc", "90ff7a4bdb6", "b933cac4bf1", "4ca8b0c5842", "cbef5cbc95f", "68fa2ea5c5a", "38ea25dd03c", "59d8b0871e0", "e9f56e45882", "e5721475b3f", "0f6f2718043", "5566ac66261", "bc0db0f342a", "63c885d3771", "97fe44721d4", "9fb9a585398", "86b7104b341", "9ebbc1a7e4c", "9ab39ebea52", "b1c832656b7", "307c4ea5c0f", "0ff61dd2b64", "4aa7099c946"];

//旧ID変換マップ
var idMap = {
//アニマコンダクト独自ID変換
"ffffffff001": "06c0b471506",
"ffffffff002": "a339954f590",
"ffffffff003": "88fc4968d5f",
"ffffffff004": "4e20be26050",
"ffffffff005": "c9bddd593c7",
"ffffffff006": "89c3dd92c16",
"ffffffff007": "bec358e8127",
"ffffffff008": "5b05fa40d7b",
"ffffffff009": "385b30ff4f1",
"ffffffff010": "21f3e652c0a",
"ffffffff011": "0cabb9e95d8",
"ffffffff012": "21ff587cc28",
"ffffffff013": "ffb8d1496aa",
"ffffffff014": "149c26b4cc1",

//アニマシャープ：独自ID変換
"ffffffff041": "0a3daa282fd",
"ffffffff042": "58e3d796fe0",
"ffffffff043": "e3b68249ee7",
"ffffffff044": "fcdc715f7c7",
"ffffffff045": "580bf49fb86",
"ffffffff046": "f7607d58e95",
"ffffffff047": "c047f4fe2c7",
"ffffffff048": "a2e8660bd5d",
"ffffffff049": "6bd599a6025",
"ffffffff050": "55ff1fe8018",
"ffffffff051": "59c6fb24715",
"ffffffff052": "1b7e7f27036",
"ffffffff053": "1405f6bf8f4",
"ffffffff054": "315e38bb6d9",


};

//*************************************
//** ノウス対応
//*************************************
//ロード
function loadUserNovusData() {
	userNovusData = {};

	// userNovusData = {
	//	"id": { "bonus_pie":0, "bons_hit": 0 }...

	var unStr = window.localStorage.getItem("userNovusData");
	if (null == unStr || "" == unStr) {
		userNovusData = {};
	} else {
		userNovusData = JSON.parse(unStr);
	}
}

//セーブ
function saveUserNovusData() {
	window.localStorage.setItem("userNovusData", JSON.stringify(userNovusData));
}

//ノウス判定
function isNovus(id) {
	var ret = (null != novusList[id]);
	return ret;
}

//ノウスパラメタ設定ウィンドウ表示
function setNovusParam(rollId, id) {
	//ノウス確認
	if (!isNovus(id)) {
		return;
	}

	if (isSMP) {
		smpSetNovusParam(rollId, id);
		return;
	}

	//アイテムデータ確認
	var itemDetail = null;
	//設定確認
	for (var i in itemData.data[rollId]) {
		tmp = itemData.data[rollId][i];
		if (tmp["id"] == id) {
			itemDetail = tmp;
			break;
		}
	}
	if (null == itemDetail) {
		return;
	}

	//表示準備
	novusWindowId = "novus_id_" + Math.floor(Math.random() * 100000 + 1);
	
	var html = $("#novus_param").html();
	html = "<div id='" + novusWindowId + "'>" + html + "</div>";
	$.blockUI({message: html, css: {width: '300px', top: '100px', backgroundColor: 'transparent', border: 'none'}});

	//表示後設定
	var nid = "#" + novusWindowId + " ";
	//名前
	$(nid + "#np_name").text(itemDetail["name"]);
	//最大値
	var sumLimit = novusList[id]["limit"];
	$(nid + "#np_max_sum").text(sumLimit);
	for (var i in novusParamKeys) {
		var npKey = novusParamKeys[i];
		$(nid + "#np_max_" + npKey).text(getNovusParamLimit(id, npKey, sumLimit));
	}

	//現在設定値
	isForce = true;
	var sum = 0;
	for (var i in novusParamKeys) {
		var npKey = novusParamKeys[i];
		var npValue = getNovusParamConfig(id, npKey);
		sum += npValue;
		$(nid + "#np_" + npKey + "_value").val(npValue);
	}
	$(nid + "#np_sum").text(sum);
	isForce = false;

	//ハンドル追加
	for (var i in novusParamKeys) {
		for (var j = 0;j < 2;j++) {
			var npKey = novusParamKeys[i];
			var type = (0 == j ? "plus" : "minus");

			//ボタン
			$(nid + "#np_" + npKey + "_" + type).bind("mouseover", {"key": npKey, "calc": type}, onNPMouseOver);
			$(nid + "#np_" + npKey + "_" + type).bind("mouseout" , {"key": npKey, "calc": type}, onNPMouseOut);
			$(nid + "#np_" + npKey + "_" + type).bind("mousedown", {"key": npKey, "calc": type}, onNPMouseDown);
			$(nid + "#np_" + npKey + "_" + type).bind("mouseup", {"key": npKey, "calc": type}, onNPMouseUp);
		}
		//値変更
		$(nid + "#np_" + npKey + "_value").bind("click blur keydown keyup keypress change", {"key": npKey}, onNPValueChange);
	}

	this.novusId = id;

}
//ユーザパラメタ取得
function getNovusParamConfig(id, key) {
	var ret = 0;

	if (null != userNovusData[id] && null != userNovusData[id][key]) {
		ret = userNovusData[id][key];
	}
	return ret;
}
//ユーザパラメタ設定
function setNovusParamConfig(id, key, value) {

	if (null == userNovusData) {
		userNovusData = {};
	}
	if (null == userNovusData[id]) {
		userNovusData[id] = {};
	}
	userNovusData[id][key] = value;
	saveUserNovusData();
}

//上限設定
function getNovusParamLimit(id, limitKey, sumLimit) {
	var relicType = novusList[id]["type"];
	var limit = novusParamLimit[relicType][limitKey];
	if (limit > sumLimit) {
		limit = sumLimit;
	}
	return limit;
}

//ノウスパラメタ操作
function onNPMouseOver(e) {
	//e.data.key などに変数あり
	$(this).addClass("pb_button_over");
	$(this).removeClass("pb_button_press");
}
function onNPMouseOut(e) {
	//e.data.key などに変数あり
	$(this).removeClass("pb_button_over");
	$(this).removeClass("pb_button_press");
}
function onNPMouseDown(e) {
	//e.data.key などに変数あり
	$(this).removeClass("pb_button_over");
	$(this).addClass("pb_button_press");
}
function onNPMouseUp(e) {
	//e.data.key などに変数あり
	$(this).addClass("pb_button_over");
	$(this).removeClass("pb_button_press");

	//計算処理
	var npKey = e.data.key;
	var addValue = ("plus" == e.data.calc ? 1 : -1);

	//現在値
	var currValue = getNovusParamConfig(novusId, npKey);
	//合計リミット
	var sumLimit = novusList[novusId]["limit"];
	//個別リミット
	var paramLimit = getNovusParamLimit(novusId, npKey, sumLimit);

	//バリデート


	//最小値
	if (currValue + addValue < 0) {
		return;
	}
	//最大値
	if (currValue + addValue > paramLimit) {
		return;
	}

	//合計値制限
	var sum = 0;
	for (var i in novusParamKeys) {
		var tmpNpKey = novusParamKeys[i];
		sum += getNovusParamConfig(novusId, tmpNpKey);
	}
	if (sum + addValue > sumLimit) {
		return;
	}

	//値の適用
	var newValue = currValue + addValue;
	setNovusParamConfig(novusId, npKey, newValue);

	//表示更新
	isForce = true;
	var nid = "#" + novusWindowId + " ";
	$(nid + "#np_" + npKey + "_value").val(newValue);
	$(nid + "#np_sum").text(sum + addValue);

	isForce = false;
}
function onNPValueChange(e) {
	if (isForce) {
		return;
	}

	//キー取得
	var npKey = e.data.key;

	//現在値
	var currValue = getNovusParamConfig(novusId, npKey);
	//合計リミット
	var sumLimit = novusList[novusId]["limit"];
	//個別リミット
	var paramLimit = getNovusParamLimit(novusId, npKey, sumLimit);
	//入力文字列
	var inputText = $(this).val();

	//変更なし判定
	if (currValue == inputText) {
		return;
	}

	//入力値自体のバリデート
	var isValue = false;
	var isRewrite = false;
	var inputValue = "";
	var rewriteValue = "";

	//値の正当性を確認
	while (true) {
		//空の場合は、0扱いで計算。
		if ("" == inputText) {
			isRewrite = true;
			rewriteValue = "";
			isValid = true;
			inputValue = 0;
			break;
		}

		//全角数値を半角数値に変換する。
		var halfText = castNumber(inputText);
		if (inputText != halfText) {
			isRewrite = true;
			rewriteValue = halfText;
			inputText = halfText;
		}

		//数値変換できるか？
		if (!jQuery.isNumeric(inputText)) {
			//できない場合、どの程度できないか？
			// "a" => 不明なので無視。
			// "3a0" => "30"にする
			// "30a" => "30"にする
			var tmpText = deleteWithoutNumber(inputText);
			if ("" == tmpText) {
				//数字以外のものを消したら空になった＞数字以外の文字列しかない＞無効値として終了
				break;
			}

			//念のため数値チェック
			if (!jQuery.isNumeric(tmpText)) {
				//無効値として終了
				break;
			}

			//数値化した値を用意し、処理続行
			isRewrite = true;
			rewriteValue = tmpText;
			inputText = tmpText;
		} // 数値変換できる場合は inputText をそのまま利用


		//実際に数値にしてみる
		//小数以下は無視する
		var tmpValue = Math.ceil(Number(inputText));
		if (Number(inputText) != tmpValue || String(tmpValue) != inputText) {
			isRewrite = true;
			rewriteValue = String(tmpValue);
			inputText = String(tmpValue);
		}

		//正当性確認終了
		isValid = true;
		break;
	}
	if (!isValid) {
		return;
	}

	//一度書き換え
	if (isRewrite) {
		isForce = true;
		$(this).val(rewriteValue);
		isForce = false;
	}

	//入力数値をチェック
	var inputValue = Number(inputText);
	var newValue = inputValue;

	//最小値
	if (newValue < 0) {
		newValue = 0;
	}
	//最大値
	if (newValue > paramLimit) {
		newValue = paramLimit;
	}

	//合計値制限
	//編集中の値以外を加算
	var sum = 0;
	for (var i in novusParamKeys) {
		var tmpNpKey = novusParamKeys[i];
		if (tmpNpKey != npKey) {
			sum += getNovusParamConfig(novusId, tmpNpKey);
		}
	}
	if (sum + newValue > sumLimit) {
		newValue = sumLimit - sum;
	}

	//再度書き換え
	if (inputValue != newValue) {
		isForce = true;
		$(this).val(newValue);
		isForce = false;
	}

	//newValueを適用
	setNovusParamConfig(novusId, npKey, newValue);

	//表示更新
	isForce = true;
	var nid = "#" + novusWindowId + " ";
	$(nid + "#np_" + npKey + "_value").val(newValue);
	$(nid + "#np_sum").text(sum + newValue);

	isForce = false;
}

//ステータスリセット
function resetNovusStatus() {

	//データリセット
	if (null == userNovusData) {
		userNovusData = {};
	}
	userNovusData[novusId] = {};
	saveUserNovusData();

	isForce = true;
	var nid = "#" + novusWindowId + " ";
	for (var i in novusParamKeys) {
		var npKey = novusParamKeys[i];
		$(nid + "#np_" + npKey + "_value").val(0);
	}
	$(nid + "#np_sum").text("0");
	isForce = false;
}

//編集終了
function setNovusStatusComplete() {
	calcParameter();
	calcItemLevelAverage();
	calcSortValueSum();
	$.unblockUI();
}

//*************************************
//** 命中リスト処理
//*************************************

function initAccuracy() {
	$("#accuracy").on("mouseover", onMouseOverAccuracy);
	$("#accuracy").on("mouseout", onMouseOutAccuracy);
	$("#accuracy2").on("mouseover", onMouseOverAccuracy);
	$("#accuracy2").on("mouseout", onMouseOutAccuracy);
	$("#aform_accuracy_caption").on("mouseover", onMouseOverAccuracyForForm);
	$("#aform_accuracy_caption").on("mouseout", onMouseOutAccuracyForForm);

	$("#accuracy_detail").on("mouseover", onMouseOverAccuracyDetail);
	$("#accuracy_detail").on("mouseout", onMouseOutAccuracyDetail);
}
function onMouseOverAccuracyDetail(e) {
	//クローズタイマーが起動していたら、クローズをキャンセル。表示位置・方法の変更はなし
	if (-1 != acHideTimerId) {
		clearTimeout(acHideTimerId);
		acHideTimerId = -1;
		$("#accuracy_detail").css("opacity", "1.0");//念のため
		$("#accuracy_detail").css("display", "block");//念のため
		return;
	}
	//フェードタイマーが起動していたら、フェードをキャンセル。透過を戻す。
	if (-1 != acFadeTimerId) {
		clearTimeout(acFadeTimerId);
		acFadeTimerId = -1;
		$("#accuracy_detail").css("opacity", "1.0");
		$("#accuracy_detail").css("display", "block");//念のため
		return;
	}
}
function onMouseOutAccuracyDetail() {
	//既にクローズタイマーが起動しているのであれば何もしない
	if (-1 != acHideTimerId) {
		return;
	}
	//既にフェードタイマーが起動しているのであれば何もしない
	if (-1 != acFadeTimerId) {
		return;
	}

	//一定時間後にクローズ
	acHideTimerId = setTimeout("hideAccuracy()", 2000);
}

function onMouseOverAccuracyForForm(e) {
	onMouseOverAccuracyHelper(e, true);
}
function onMouseOverAccuracy(e) {
	onMouseOverAccuracyHelper(e, false);
}
function onMouseOverAccuracyHelper(e, isForForm) {
	//クローズタイマーが起動していたら、クローズをキャンセル。表示位置・方法の変更はなし
	if (-1 != acHideTimerId) {
		clearTimeout(acHideTimerId);
		acHideTimerId = -1;
		$("#accuracy_detail").css("opacity", "1.0");//念のため
		$("#accuracy_detail").css("display", "block");//念のため
		return;
	}
	//フェードタイマーが起動していたら、フェードをキャンセル。透過を戻す。
	if (-1 != acFadeTimerId) {
		clearTimeout(acFadeTimerId);
		acFadeTimerId = -1;
		$("#accuracy_detail").css("opacity", "1.0");
		$("#accuracy_detail").css("display", "block");//念のため
		return;
	}

	//タイマーが起動しておらず、非表示状態でなければ何もしない（表示中の再度のmouseover）
	if ("none" != $("#accuracy_detail").css("display")) {
		return;
	}

	//タイマーが起動しておらず、非表示状態であれば表示する。

	//加工
	$("#ac_tbl_main tr").each(function() {
		var tdList = $("td", $(this));

		//ヘッダ(tdではなくthで構成)は飛ばす
		if (0 == tdList.length) {
			return;
		}
		for (var i = 1;i < tdList.length;i++) {
			//テキスト部分を取得
			var tdText = $(tdList[i]).text();

			//数値部分のみを取得
			var tdNum = tdText.replace(/[^0-9]/g, "");

			if (isForForm) {
				//フォームであればリンク
				$(tdList[i]).html(sprintf("<a href=\"javascript:void(0)\" onclick=\"setAccuracyFormValue({0})\">{1}</a>", [ tdNum, tdText ]));
			} else {
				//それ以外であればテキスト
				$(tdList[i]).html(tdText);
			}
		}
	});

	//表示
	$("#accuracy_detail").css("left", e.pageX);
	$("#accuracy_detail").css("top", e.pageY);
	$("#accuracy_detail").css("display", "block");
	$("#accuracy_detail").css("opacity", "1.0");
	$("#accuracy_detail").css("zIndex", "2002");

}
function onMouseOutAccuracyForForm(e) {
	onMouseOutAccuracyHelper(e, true);
}
function onMouseOutAccuracy(e) {
	onMouseOutAccuracyHelper(e, false);
}
function onMouseOutAccuracyHelper(e, isForForm) {
	//既にクローズタイマーが起動しているのであれば何もしない
	if (-1 != acHideTimerId) {
		return;
	}
	//既にフェードタイマーが起動しているのであれば何もしない
	if (-1 != acFadeTimerId) {
		return;
	}

	//一定時間後にクローズ
	acHideTimerId = setTimeout("hideAccuracy()", 2000);
}
function hideAccuracy() {
	//クローズタイマーを停止
	clearTimeout(acHideTimerId);
	acHideTimerId = -1;

	//フェードタイマーを起動
	acOpacity = 1;
	acFadeTimerId = setInterval("fadeAccuracy()", 50);
}
function fadeAccuracy() {
	acOpacity -= 0.1;
	if (acOpacity <= 0) {
		//透過度0以下になったらタイマー終了、非表示へ
		clearInterval(acFadeTimerId);
		acFadeTimerId = -1;
		$("#accuracy_detail").css("opacity", 0);
		$("#accuracy_detail").css("display", "none");
		return;
	}

	//透過度変更
	$("#accuracy_detail").css("opacity", acOpacity);
}
function setAccuracyFormValue(val) {
	//強制非表示
	acOpacity = 0;
	fadeAccuracy();

	//値設定
	$("#aform_accuracy_value").val(val);
}

//*************************************
//** ロドストインポート
//*************************************
function inputLodestoneURL() {

	isForce = true;
	importId = "import_id_" + Math.floor(Math.random() * 100000 + 1);
	isForce = false;
	
	var html = $("#import_lodestone").html();
	html = "<div id='" + importId + "'>" + html + "</div>";
	$.blockUI({message: html, css: {width: '500px'}});

	//表示後にハンドル設定
	$("#" + importId + " #url_lodestone").on("click blur keydown keyup keypress change", onURLLodestoneChange);

//debug
//$("#" + importId + " #url_lodestone").val("http://" + ("en" == lang ? "na" : lang) + ".finalfantasyxiv.com/lodestone/character/14926253/");
//$("#" + importId + " #ok_input_lodestone").css("color", "#ffffff");
//$("#" + importId + " #ok_input_lodestone").removeAttr("disabled");
}
function onURLLodestoneChange() {

	if (isForce) {
		return;
	}

	var isValid = false;
	var url = $("#" + importId + " #url_lodestone").val();

	if (url.match(/^http:\/\/[a-z]+\.finalfantasyxiv\.com\/lodestone\/character\/([0-9]+)/)) {
		isValid = true;
	}

	if (isValid) {
		$("#" + importId + " #ok_input_lodestone").css("color", "#ffffff");
		$("#" + importId + " #ok_input_lodestone").removeAttr("disabled");
	} else {
		$("#" + importId + " #ok_input_lodestone").css("color", "#808080");
		$("#" + importId + " #ok_input_lodestone").attr("disabled", "disabled");
	}
}
function onOKInputLodestoneURL() {
	$.unblockUI();
	$.blockUI({message: $("#wait_lodestone"), css: {width: '500px'}});

	setTimeout("loadLodestone()", 100);
}
function loadLodestone() {
	var url = $("#" + importId + " #url_lodestone").val();

//debug
//url="http://localhost/es/test.html";
//url="http://jp.finalfantasyxiv.com/lodestone/character/4881110/";


	url = url + "?" + Math.floor(Math.random() * 100000 + 1);
	console.log("read from: " + url);

	$.ajax({
		url: url,
		type: "GET",
		success: function (data, dataType) {
			analyzeLodestoneHTML(data, dataType);
		},
		error: function(xmlHttpRequest, textStatus, errorThrown) {
			analyzeLodestoneHTML(null, null);
		}
	});
}
function analyzeLodestoneHTML(data, dataType) {
	var msg = "";
	var result = {};

	while (true) {
		//読み込みチェック
		if (null == data) {
			msg = ml_loading_failure;
			break;
		}

		//KIAIパース

		//改行等を取り除く
		var text = "";
		if (null != data.responseText) {
			//console.log("responseText");
			text = data.responseText;
		} else {
			//console.log("text");
			text = data;
		}

		var text = text.replace(/[\r|\n|\t]+/g, "");
		text = text.replace(/<p>/ig, "");
		text = text.replace(/<\/p>/ig, "");
		text = text.replace(/>[ |\t]+/ig, ">");
		text = text.replace(/[ |\t]+</ig, "<");

		//not foundチェック
		if ("" == text || -1 != text.indexOf(ml_ldst_notfound_key)) {
			msg = ml_ldst_notfound;
			break;
		}

		var buf0;
		var tmp0;

		//名前（お気に入り初期値用）
		if (text.match(/<div class=\"area_footer player_name_txt\">.*?<h2>.*?<a.*?>(.*?)</)) {
			buf0 = RegExp.$1;
			buf0 = buf0.replace(/<\/?[^>]*>/gi, "");
			result["name"] = buf0;
		} else {
			msg = ml_ldst_analyze_failure + " (#1)";
			break;
		}

		//種族
		if (text.match(/class=\"chara_profile_title\">(.*?)</)) {
			buf0 = RegExp.$1;
			tmp0 = buf0.split("/");
			if (tmp0.length >= 3) {
				result["tribe"] = tmp0[1].replace(/(^\s+)|(\s+$)/g, "");
			}
		}
		if (null == result["tribe"]) {
			msg = ml_ldst_analyze_failure + " (#2)";
			break;
		}
		//守護神
		//if (text.match(/守護神.*?<\/td><td.*?><strong.*?>(.*?)</)) {
		re = new RegExp("<dd class=\"txt\">" + ml_god + "</dd><dd class=\"txt_name\">(.*?)<");
		if (text.match(re)) {
			result["god"] = RegExp.$1;
			if ("en" == lang || "fr" == lang) {
				tmp0 = result["god"].split(",");
				result["god"] = tmp0[0];
			} else if ("de" == lang) {
				tmp0 = result["god"].split(" ");
				result["god"] = tmp0[0];
			}
		} else {
			msg = ml_ldst_analyze_failure + " (#3)";
			break;
		}


		//ジョブ・クラス
		if (text.match(/<div class=\"ic_class_wh24_box\"><img.*?><img[^>]+src=\"(.*?)\"/)) {
			buf0 = RegExp.$1.replace(/^.*\//, "").replace(/\..*/, "");
			if (null != imageClassMap[buf0]) {
				result["class"] = imageClassMap[buf0];
			}
		}
		if (null == result["class"]) {
			msg = ml_ldst_analyze_failure + " (#4)";
			break;
		}
		//レベル
		// aaa.match(/^image([0-9]+)/)
		// re = new RegExp("^" + vname + "[0-9]+$");aaa.match(re);
		// 	if (text.match(/class=\"level\">LEVEL ([0-9]+)</)) {
		re = new RegExp("class=\"level\">" + ml_ldst_analyze_level + " ([0-9]+)<");
		if (text.match(re)) {
			result["level"] = RegExp.$1;
		} else {
			msg = ml_ldst_analyze_failure + " (#5)";
			break;
		}


		//ATTRIBUTES
		var attrs = ["str", "dex", "vit", "int", "mnd", "pie"];
		for (var i in attrs) {
			var attr = attrs[i];
			var re = new RegExp("<img class=\".*?\" src=\".*?" + attr + ".png\?.*?\".*?><span.*?>([0-9]+)<");

			if (text.match(re)) {
				result[attr] = RegExp.$1;
			} else {
				msg = ml_ldst_analyze_failure + " (#6:" + attr + ")";
				break;
			}
		}


		//装備
		// equip[] - 10(position) 	- name
		//							- materials[] - name
		//										  - additional
		//							- isHQ
		result["equip"] = [];

		var pos = 0;
		var nextPos = 0;
		var roll = "";
		var rollList = ["_10", "_20", "_30", "_40", "_50", "_60", "_70", "_80", "_100", "_90", "_110", "_120", "2_120"];
		var index = 0;
		cnt = 0;
		while (true) {
			cnt++;
			if (cnt > 20) {
				break;
			}

			//アイテムタグオープン位置
			var pos = 0;
			if (0 == nextPos) {
				//はじめの１つ目のdiv開始位置を探す
				pos = text.indexOf("<div class=\"ic_reflection_box\">");
				if (-1 == pos) {
					msg = ml_ldst_analyze_failure + " (#7)";
					break;
				}
			} else {
				pos = nextPos;
			}

			//次のアイテムタグオープン位置
			nextPos = text.indexOf("<div class=\"ic_reflection_box\">", pos + 1);
			if (-1 == nextPos) {
				msg = ml_ldst_analyze_failure + " (#8)";
				break;
			}

			//roll
			roll = rollList[index];

			//解析
			equipText = text.substring(pos, nextPos);
			equip = analyzeEquip(equipText);

			if (null == equip) {
				msg = ml_ldst_analyze_failure + " (#9:" + index + ")";
				break;
			}
			equip["roll"] = roll;
			result["equip"].push(equip);

			//終了判定
			if (12 == index) {
				break;
			}

			//次の処理へ
			index++;

		}
		break;
	}

	if ("" != msg) {
		$.unblockUI();
		alert(msg);
		return;
	}

	if (null != result) {
		setAnalyzedData(result);
	}
	$.unblockUI();
}

function setAnalyzedData(data) {
	//装備リセット
	doReset();

	//お気に入りに名前設定
	$("#new_favorite_name").val(data["name"]).trigger("change");
	//守護神～レベルまでを設定
	$("#general_filter_god").val(data["god"]);
	$("#general_filter_jobclass").val(data["class"]);
	$("#general_filter_level_from").val("1");
	$("#general_filter_level_to").val(data["level"]);
	$("#general_filter_ilv_from").val("0");
	$("#general_filter_ilv_to").val("0");
	//$("#general_filter_craft_ilv").prop("checked", true);//選択には影響しないため、変更なし
	$("#general_filter_ignore_pvp").prop("checked", false);//PvP装備が選択されていたときにPvP無視だと困るので、チェック解除
	$("#general_filter_ignore_iddrop").prop("checked", false);//同上
	//自動マテリア設定も、影響しないため変更なし

	//種族は「ミッドランダー」などのテキストしか入っていないので、補正する
	for (var i in tribeAdjustMap) {
		if (-1 != i.indexOf(data["tribe"])) {
			data["tribe"] = i;
			break;
		}
	}
	$("#general_filter_tribe").val(data["tribe"]);
	//装備リストの初期化
	analyzedData = data;
	doFilter(false, function(){setAnalyzedDataAfterFilter();});
}
function setAnalyzedDataAfterFilter() {

	isForce = true;

	var baseMateriaData = getMateriaDataByLang();

	//アイテム選択
	for (var i in analyzedData["equip"]) {
		var data = analyzedData["equip"][i];
		var equipId = "equip_selector" + data["roll"];
		var jqs = jqsEquipList[equipId];
		if ("" == data["name"]) {
			jqs.forceSelectItemByIndex(0);
		} else {
			jqs.forceSelectItemByName(data["name"], data["isHQ"]);
		}
	}

	//マテリア埋め込み
	for (var i in analyzedData["equip"]) {
		var data = analyzedData["equip"][i];
		if (0 == data["materias"].length) {
			continue;
		}
		var materiaId = "materia_selector" + data["roll"];
		var jqs = jqsMateriaList[materiaId];
		var inputData = [];
		for (var j in data["materias"]) {
			// Object {name: "心力のマテリダ", param: "精神", add: "+4"} 
			// ↓
			// Object {adjust: "0", key: "mat_vit", level: "0"}
			var materiaData = data["materias"][j];
			var result = {};

			if ("en" == lang || "fr" == lang || "de" == lang) {
				//NOTE 検索順に注意。例えば " I" を先にチェックすると" IV"にも" III"にもヒットする
				var levelText = "";
				if (-1 != materiaData["name"].indexOf(" V")) {
					levelText = "V";
				} else if (-1 != materiaData["name"].indexOf(" IV")) {
					levelText = "IV";
				} else if (-1 != materiaData["name"].indexOf(" III")) {
					levelText = "III";
				} else if (-1 != materiaData["name"].indexOf(" II")) {
					levelText = "II";
				} else if (-1 != materiaData["name"].indexOf(" I")) {
					levelText = "I";
				}
		
				for (var k in jqs.materiaData) {
					if (0 == materiaData["name"].indexOf(jqs.materiaData[k]["name"])) {
						//console.log(jqs.materiaData[k]);
						result["key"] = k;
						result["level"] = jqs.materiaLevelNameList.indexOf(levelText);
						if (-1 == result["level"]) {
							result["level"] = 0;
						}
						var baseAdd = Number(jqs.materiaData[k]["values"][result["level"]]);
						var itemAdd = Number(materiaData["add"]);
						result["adjust"] = String(itemAdd - baseAdd);
						break;
					}
				}
			} else {
				var prefix = materiaData["name"].substr(0, 2);//心力
				var suffix = materiaData["name"].substr(3);//マテリダ

				for (var k in jqs.materiaData) {
					if (jqs.materiaData[k]["name"] == prefix) {
						result["key"] = k;
						result["level"] = jqs.materiaLevelNameList.indexOf(suffix);
						if (-1 == result["level"]) {
							result["level"] = 0;
						}
						var baseAdd = Number(jqs.materiaData[k]["values"][result["level"]]);
						var itemAdd = Number(materiaData["add"]);
						result["adjust"] = String(itemAdd - baseAdd);
						break;
					}
				}
			}
			if ("" != result["key"]) {
				inputData.push(result);
			}
		}
		jqs.forceSelectItem(inputData);

	}

	//ランダムパラメタ設定
	for (var i in analyzedData["equip"]) {
		var data = analyzedData["equip"][i];
		var equipId = "equip_selector" + data["roll"];
		var jqs = jqsEquipList[equipId];

		if (null == jqs || 0 == jqs.selectedIndex) {
			continue;
		}

		var itemBaseData = jqs.setting.data[jqs.selectedIndex];
		var itemData = itemBaseData.data;
		if (-1 == rpIdList.indexOf(itemData.id)) {
			continue;
		}

		console.log("random param");

		//元パラメタを解析＞キーに変換
		var paramMap = [];
		var tmp = data.rawParam.split("</li>");
		for (var j in tmp) {
			var buf = tmp[j];
			if ("" == buf) {
				continue;
			}
			buf = buf.replace("<li>", "");
			var tmp2 = buf.split(" +");//tmp2[0] = key, tmp2[1] = value
			if (null != paramKeyMap[tmp2[0]]) {
				paramMap[paramKeyMap[tmp2[0]]] = tmp2[1];
			}
		}

		//元パラメタにあれば無視、なければランダムパラメタとして追加する
		var rndMateria = [];
		for (var j in paramMap) {
			var tmpKey = j + (itemBaseData.isHQ ? "_hq" : "_nq");
			if (null == itemData[tmpKey]) {
				//マテリア情報作成
				/*
					key: "mat_xxx"
					level: 0 (固定)
					adjust: 入力値 - level0の基本値
				*/
				//addParamMap[j] = paramMap[j];
				var matBaseKey = "";
				var matBaseValue = 0;
				//var baseMateriaData = getMateriaDataByLang();
				for (var k in baseMateriaData) {
					if (j == baseMateriaData[k]["effect"]) {
						matBaseKey = k;
						matBaseValue = baseMateriaData[k]["values"][0];
						break;
					}
				}
				if ("" != matBaseKey) {
					rndMateria.push({
						"key": matBaseKey,
						"level": 0,
						"adjust": Number(paramMap[j]) - Number(matBaseValue)
					});
				}
			}
		}
		//ランダムパラメタ設定
		if (0 != rndMateria.length) {
			var materiaId = "materia_selector" + data["roll"];
			var jqsMateria = jqsMateriaList[materiaId];
			jqsMateria.forceSelectItem(rndMateria);
		}

	} // end equips loop


	isForce = false;

	//パラメタ再計算（ボーナス計算用）
	calcParameter();

	//ボーナス計算（装備補正とかのデータがないとパラメタが出ないので、計算後に実施）
	var tmpSumPB = 0;
	var attrs = ["str", "dex", "vit", "int", "mnd", "pie"];
	var newPBList = {};
	for (var i in attrs) {
		var attr = attrs[i];
		var attrValue = Number(analyzedData[attr]);
		var currValue = Number($("#p_" + attr).text());
		newPBList[attr] = 0;
		//console.log(attr + ":" + attrValue + "/" + currValue);
		if (attrValue < currValue) {
			//装備＋特性の値が、ボーナス付きの値より大きければ不正。
			//現時点では無視
			//console.log(attr + ": equip+traits > equip+traits+bonux");
		} else if (attrValue == currValue) {
			//装備＋特性の値が、ボーナス付きの値と同じであれば、チェック中パラメタにはボーナスなし
			//console.log(attr + ": equip+traits = equip+traits+bonux");
		} else {
			//装備＋特性の値が、ボーナス付きの値より小さければ、ボーナスあり
			//console.log(attr + ": equip+traits < equip+traits+bonux");

			//差分
			var diff = attrValue - currValue;
			//この差分を足しても、最大ボーナスを超えないか？
			if (tmpSumPB + diff > maxPB) {
				//超える場合は、超えない範囲でボーナス追加
				diff = maxPB - tmpSumPB;
			}
			//ボーナス設定
			newPBList[attr] = diff;
			tmpSumPB += diff;
		}
	}
	//ボーナス設定
	pbList = newPBList;
	showPBs();

	//食事・PTボーナスの解除
	$("#list_meal").val("");
	updateMeal();
	$("#pt_bonus").prop("checked", false);


	//再計算
	calcParameter();
	calcItemLevelAverage();
	calcSortValueSum();
}
function analyzeEquip(text) {
	var data = {
		"name": "",
		"materias": [],
		"isHQ": false
	};

	var buf0;
	var tmp0;

	//名前・HQ
	//if (text.match(/<h2 class=\"item_name.*?">(.*?)<\/h2>/)) {
	if (text.match(/<h2 class=\"db-tooltip__item__name.*?">(.*?)<\/h2>/)) {
		buf0 = RegExp.$1;
		if (-1 != buf0.indexOf("hq.png")) {
			data["isHQ"] = true;
			buf0 = buf0.replace(/<\/?[^>]*>/gi, "");
		}
		data["name"] = buf0;
	} else {
		return data;
	}

	//マテリア
	var pos0 = text.indexOf("<ul class=\"db-tooltip__materia\">");
	var pos1 = -1;
	if (-1 != pos0) {
		pos1 = text.indexOf("</ul>", pos0 + 1);
	}

	if (-1 != pos1) {
		buf0 = text.substring(pos0 + "<ul class=\"db-tooltip__materia\">".length, pos1);
		tmp0 = buf0.split("</li>");
		for (var i in tmp0) {
			var mText = tmp0[i];

			//<div class="txt">心力のマテリダ<br><span class="txt">MND +4</span><
			if (mText.match(/<div class=\"db-tooltip__materia__txt\">([^>]+)<br.*?><span class=\"db-tooltip__materia__txt.*?\">([^ ]+) ([^>]+)</)) {
				//とりあえず、名前・付与パラメタ・追加値を保持しておく
				data["materias"].push({"name": RegExp.$1, "param": RegExp.$2, "add": RegExp.$3});
			}
		}
	}

	//パラメタ仮保存
	data["rawParam"] = "";
	if (text.match(/<ul class=\"basic_bonus\">(.*?)<\/ul>/)) {
		data["rawParam"] = RegExp.$1;
	}

	return data;
}
function onCancelInputLodestoneURL() {
	$.unblockUI();
}


//*************************************
//** 共有処理
//*************************************
function showDataFromQueryString() {
	var params = getQueryString();
	if (null == params["d"]) {
		return;
	}

	var textDataB64 = params["d"];
	//textDataB64 = "eyJpZCI6InhYSGJSRVNObTlaTGtJYnYiLCJuYW1lIjoic2hhcmUiLCJmaWx0ZXIiOnsiam9iQ2xhc3MiOiLmlqfooZPlo6siLCJnb2QiOiLjg4_jg6vjgqrjg7zjg40iLCJ0cmliZSI6IuODkuODpeODvOODqeODs--8muODn-ODg-ODieODqeODs-ODgOODvCIsImxldmVsRnJvbSI6IjEiLCJsZXZlbFRvIjoiNTAiLCJzb3J0IjoiX3NwMSIsInB2cCI6ImNoZWNrZWQifSwiZXF1aXAiOlsiZmZiNmVkZTg3NDMiLCJiNDllYzNhZmE3NiIsIjEwMGU4MDE2ZDI3IiwiM2NmZDBhMzg4NDMiLCIyMWVlMjQwMmIyNCIsIjNkNjJhN2M5N2I2IiwiYWUwYmFjMTE2NTMiLCIiLCJmMGQ4OWRlNzhmYiIsIjNiM2UwYTkwMzFmIiwiNTkzZDQzOWE1ZDAiLCJmODA0OWY2YzQyNiIsImY4MDQ5ZjZjNDI2Il0sIm1hdGVyaWEiOltbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXSxbXV0sImhxIjpbZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLCJwYiI6eyJzdHIiOjAsImRleCI6MCwidml0IjowLCJpbnQiOjAsIm1uZCI6MCwicGllIjowfX0";
	//ZIPED
	//UEsDBAoAAAAIALoFWkiGxfj3twEAAMMCAAAMAAAAZmF2b3JpdGUuZGF0rVI9j9QwEP0vrlM4jp2PLUFCHB8NQhScTsixx7deJXEuzkaI1RVsCiqEBFxDi9Dp7oQoKO_-TUSx1f2FG2e5ngLJysyb92bszMyGWE0W5PmL4Z3xK7/MoH38+imQiDSyBmT8UnYBGlv10JHFhqxc+bCS3iO5u/68+/l19/7Ln+9XqDl2odY0fprGq2l7OY030/gR431nS5iZi/mcTdtzlNzefJvGD9P4Yxb+nuMXwd/+wqQKBqgeda7GxPgev3SIUorQu65H/41vA2mr4a+UcbrHs5RxgUh10vQHz16RRd+tISLt0N67VuvOITKy8gilXq19/8SVe/40InCytsgfkljERqmSM1pgyZzLtIAUZF4iEolQHJSCODwGeCbSrNBSyMAZqotEJZyFNuaKZtowrbRBxCFPOMQsZQmikCpMzgqVGs4QJcASmhRMm0BDImINlEoTrpSap1BkSAZOZDJWWgColBxFpJY4Kyvx2YdH0T8cTFmeoHrfhf/0xaJtGRbG97g3NCIa3s52sP1sbbO3daNn21pcEoo9b9ywxvXaoFuDrHCO+Itt/8A1IUzCgCvZHKO7asnpHVBLAQIUAAoAAAAIALoFWkiGxfj3twEAAMMCAAAMAAAAAAAAAAAAAAAAAAAAAABmYXZvcml0ZS5kYXRQSwUGAAAAAAEAAQA6AAAA4QEAAAAA

	var data = null;
	var jsonText = "";
	try {
		//デコード
		if ("UEsDBA" == textDataB64.substring(0, 6)) {
			//ZIP化されているデータ
			var workB64 = textDataB64.replace(/_/g, "/").replace(/-/g, "+");
			var zippedData = window.atob(workB64);

			var zip = new JSZip();
			zip.load(zippedData);

			jsonText = zip.file("favorite.dat").asText();

		} else {
			//非ZIP化
			jsonText = Base64.decode(textDataB64);
		}
		data = JSON.parse(jsonText);
		console.log(data);
		showFavoriteData(data);
	} catch (e) {
		console.log(e);
		//alert("データの再生に失敗しました。");
	}

}
function getQueryString() {
	var result = [];
	if (1 >= document.location.search.length) {
		return result;
	}
	var query = document.location.search.substring(1);
	var parameters = query.split('&');

	for (var i = 0; i < parameters.length; i++) {
		var element = parameters[i].split('=');
		var paramName = decodeURIComponent(element[0]);
		var paramValue = decodeURIComponent(element[1]);
		result[paramName] = decodeURIComponent(paramValue);
	}
	return result;
}

var shareURLInfo = "";
function createShareLinks() {
	var textDataB64 = createTextData();
	var url = stURL + "?data=" + textDataB64;

	$("body").css("cursor", "wait");
	$("#share_url").val(ml_generate_url);

	shareURLInfo = "";

	$.getJSON(url, function() {
		console.log("createShareURL:run");
	})
	.success(function(json) {
		console.log("createShareURL:success");
		shareURLInfo = json;
	})
	.error(function(jqXHR, textStatus, errorThrown) {
		console.log("createShareURL:error");
	    console.log("エラー：" + textStatus);
	    console.log("テキスト：" + jqXHR.responseText);
		shareURLInfo = "";
	})
	.complete(function() {
		console.log("createShareURL:complete");
		console.log(shareURLInfo);
		$("body").css("cursor", "auto");

		//debug for localhost
		//shareURLInfo = {result: true, url: "http://goo.gl/D8QI5H"};
		if ("" == shareURLInfo || false == shareURLInfo["result"]) {
			setShareLinksDisabled();
			alert(ml_generate_url_failure);
		} else {
			setShareLinks();
		}
	});

}
function setShareLinks() {
	//URL変更
	$("#share_url").val(shareURLInfo["url"]);
	$("#share_url").css("color", "#000000");
	console.log(shareURLInfo);

	//共有リンク作成
	var html = "";

	//twitter
	html = sprintf("<a href=\"javascript:void(0)\" onclick=\"shareTwitter('{0}')\"><img src=\"{1}\" class=\"share_image\"></a>",
			[ shareURLInfo["url"], "image/sys/share_tw_active.png"] );
	/*
	html = sprintf("<a href=\"https://twitter.com/share\" class=\"twitter-share-button\" data-url=\"{0}\" data-text=\"FF14装備シミュ\" data-lang=\"ja\" data-count=\"none\">ツイート</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script><br><br>", [
		shareURLInfo["url"]
	]);
	*/
	$("#share_tw").html(html);

	//facebook
	html = sprintf("<a href=\"javascript:void(0)\" onclick=\"shareFacebook('{0}')\"><img src=\"{1}\" class=\"share_image\"></a>",
			[ shareURLInfo["url"], "image/sys/share_fb_active.png"] );
	/*
	html = sprintf("<iframe src=\"//www.facebook.com/plugins/like.php?href={0}&amp;width&amp;layout=button&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=35\" scrolling=\"no\" frameborder=\"0\" style=\"border:none; overflow:hidden; height:35px;\" allowTransparency=\"true\"></iframe>", [
		encodeURIComponent(shareURLInfo["url"])
	]);
	*/
	$("#share_fb").html(html);

	//g+
	gapi.plusone.render("share_gp", {
		"href": shareURLInfo["url"],
		"size": "medium",
		"annotation": "none",
		"recomemendations": "false"
	});

	if (isSMP) {
		$("#share_sub_table").show();
	}
}
function shareGooglePlus(shareUrl) {
}
function shareFacebook(shareUrl) {
	var url = sprintf("http://www.facebook.com/share.php?u={0}&t={1}",
		[ encodeURIComponent(shareUrl), encodeURIComponent(ml_title)] );
	window.open(url);
}

function shareTwitter(shareUrl) {
	var url = sprintf("http://twitter.com/share?url={0}&text={1}", 
				[ encodeURIComponent(shareUrl), encodeURIComponent(ml_title)] );
	window.open(url, null, "width=550,height=420,left=" + (Math.round(screen.width/2-550/2)) + ",top=" + (Math.round(screen.height/2-420/2)));
}
function setShareLinksDisabled() {
	//URL変更
	$("#share_url").val(ml_generate_none);
	$("#share_url").css("color", "#808080");
	//ボタン無効化
	$("#share_tw").html('');
	$("#share_fb").html('');
	$("#share_gp").html('');
}


function createTextData() {
	//データ生成
	var data = createFavoriteData();
	data["id"] = createRandomId(16);
	data["name"] = "share";

	//テキスト化
	var jsonText = JSON.stringify(data)

	//旧：Base64／新：ZIP+Base64
	var zip = new JSZip();
	var content = null;

	zip.file("favorite.dat", jsonText);
	content = zip.generate({
		type : "string",
		compression: "DEFLATE",
		compressionOptions : {level:6}
	});


	//var textDataB64 = Base64.encodeURI(content);
	var textDataB64 = window.btoa(content);
	textDataB64 = textDataB64.replace(/\//g, "_").replace(/\+/g, "-");

	console.log("base: result=" + jsonText.length);
	console.log("zipped: result=" + content.length);
	console.log("b64: result=" + textDataB64.length);
	console.log("result=" + textDataB64);


	/*
	var textDataB64 = Base64.encodeURI(content);

	console.log("base: result=" + jsonText.length);
	console.log("zipped: result=" + content.length);
	console.log("b64: result=" + textDataB64.length);

	var t0 = window.btoa(content);
	console.log("t0: result=" + t0.length);
	console.log("t0: result=" + t0);
	//console.log(content);
	//console.log(textDataB64);

	var textDataB64 = Base64.encodeURI(content);
	textDataB64 = textDataB64.replace("/", "_").replace("+", "-");
	*/

	return textDataB64;
}
function createRandomId(idLength) {
	var baseText = 'abcdefghijklmnopqrstuvwxyz'
		+ 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		+ '0123456789';
	var baseTextList = baseText.split('');
	var ret = '';
	for (var i = 0; i < idLength; i++) {
    	ret += baseTextList[Math.floor(Math.random() * baseTextList.length)];
	}
	return ret;
}

//*************************************
//** 共有お気に入り関連
//*************************************
function initFW() {
	var html = "";
	var selected = "";
	var obj;

	//職
	$("#fw_label_jobclass").text(worldFavoriteLangMap["jobclass"]["title"][lang]);
	selected = " selected";
	for (var i in worldFavoriteLangMap["jobclass"]["list"]) {
		obj = worldFavoriteLangMap["jobclass"]["list"][i];
		html += sprintf("<option value='{0}'{1}>{2}</option>", [
			obj["sid"],
			selected,
			obj[lang]
		]);
		selected = "";
	}
	$("#fw_jobclass").html(html);

	//ILV
	$("#fw_label_ilv").text(worldFavoriteLangMap["ilv"]["title"][lang]);
	updateFWILV();

	//傾向
	$("#fw_label_trend").text(worldFavoriteLangMap["trend"]["title"][lang]);
	selected = " selected";
	html = "";
	for (var i in worldFavoriteLangMap["trend"]["list"]) {
		obj = worldFavoriteLangMap["trend"]["list"][i];
		html += sprintf("<option value='{0}'{1}>{2}</option>", [
			obj["sid"],
			selected,
			obj[lang]
		]);
		selected = "";
	}
	$("#fw_trend").html(html);

	//クラフト
	$("#fw_label_craft").text(worldFavoriteLangMap["crafter"]["title"][lang]);
	selected = " selected";
	html = "";
	for (var i in worldFavoriteLangMap["crafter"]["list"]) {
		obj = worldFavoriteLangMap["crafter"]["list"][i];
		html += sprintf("<option value='{0}'{1}>{2}</option>", [
			obj["sid"],
			selected,
			obj[lang]
		]);
		selected = "";
	}
	$("#fw_crafter").html(html);

}
function changeFWJobClass() {
	//現在の選択状況を確認
	var currentSelection = $("#fw_ilv option:selected").text();

	//ILリストを更新
	updateFWILV();

	//更新したリストの中に、前に選択していたものが含まれるか
	$("#fw_ilv option").each(function() {
		if (currentSelection == $(this).text()) {
			$("#fw_ilv").val($(this).val());
			return false;
		}
	});
}
function updateFWILV() {
	var html = "";
	var selected = "";
	var obj;
	var jobSID = $("#fw_jobclass").val();
	var jobObj = null;

	for (var i in worldFavoriteLangMap["jobclass"]["list"]) {
		obj = worldFavoriteLangMap["jobclass"]["list"][i];
		if (obj["sid"] == jobSID) {
			jobObj = obj;
			break;
		}
	}
	var jobType = "战斗系";
	if (null != jobObj) {
		jobType = jobObj["type"];
	}

	selected = " selected";
	for (var i in worldFavoriteLangMap["ilv"]["list"][jobType]) {
		obj = worldFavoriteLangMap["ilv"]["list"][jobType][i];
		html += sprintf("<option value='{0}'{1}>{2}</option>", [
			obj["sid"],
			selected,
			(undefined != obj[lang] ? obj[lang] : obj["jp"])
		]);
		selected = "";
	}
	$("#fw_ilv").html(html);

}
function searchFW() {
	//パラメタ抽出
	var jobSID   = $("#fw_jobclass").val();
	var ilvSID   = $("#fw_ilv").val();
	var trendSID = $("#fw_trend").val();
	var craftSID = $("#fw_crafter").val();

	console.log("job: " + $("#fw_jobclass option:selected").text() + " => " + jobSID);
	console.log("ilv: " + $("#fw_ilv option:selected").text() + " => " + ilvSID);
	console.log("tre: " + $("#fw_trend option:selected").text() + " => " + trendSID);
	console.log("crf: " + $("#fw_crafter option:selected").text() + " => " + craftSID);

	searchFWHelper(jobSID, ilvSID, trendSID, craftSID, 0);
}

var fwResult = "";
function searchFWHelper(jobSID, ilvSID, trendSID, craftSID, page) {

	//URL構築
	var url = sprintf("{0}?job={1}&ilv={2}&trend={3}&craft={4}&lang={5}&page={6}", [
		fwURL,
		jobSID,
		ilvSID,
		trendSID,
		craftSID,
		lang,
		page
	]);

	//選択クリア・ウェイト表示
	waitFW();

//debug
//url = "http://es.localhost/dummy_json.pl";

	fwResult = "";
	$.getJSON(url, function() {
		console.log("searchFW:run");
	})
	.success(function(json) {
		console.log("searchFW:success");
		fwResult = json;
	})
	.error(function(jqXHR, textStatus, errorThrown) {
		console.log("searchFW:error");
	    console.log("エラー：" + textStatus);
	    console.log("テキスト：" + jqXHR.responseText);
		fwResult = "";
	})
	.complete(function() {
		console.log("searchFW:complete");

		//debug for localhost
		//shareURLInfo = {result: true, url: "http://goo.gl/D8QI5H"};
		if ("" == fwResult || false == fwResult["result"]) {
			errorFW(ml_loading_failure);
		} else {
			showFW(fwResult);
		}
	});
}
function waitFW() {
	var offset = $("#fw_list").offset();
	$("#favorite_filter").offset({top: offset.top, left: offset.left});
	$("#favorite_filter").width($("#fw_list").width());
	$("#favorite_filter").height($("#fw_list").height());

	$("#favorite_filter_contents").html('<img src="image/sys/load_black.gif" style="width:32px; height:32px">');
	$("#favorite_filter").css("display", "table");
	$("#fw_list").css("visibility", "hidden");

}
function errorFW(msg) {
	var offset = $("#fw_list").offset();
	$("#favorite_filter").offset({top: offset.top, left: offset.left});
	$("#favorite_filter").width($("#fw_list").width());
	$("#favorite_filter").height($("#fw_list").height());

	$("#favorite_filter_contents").html("<span class='fw_error'>" + msg + "</span>");
	$("#favorite_filter").css("display", "table");
	$("#fw_list").css("visibility", "hidden");

}
function showFW(fwResult) {
	var html = "";

	//先に key-text のマップを作成する
	var bonusKeyNameMap = {};
	for (var i in worldFavoriteLangMap["trend"]["list"]) {
		var data = worldFavoriteLangMap["trend"]["list"][i];
		bonusKeyNameMap[data["key"]] = data[lang];
	}

	//受領データを全ループ
	for (var i in fwResult["data"]) {
		data = fwResult["data"][i];
		paramText = "";
		if (undefined != bonusKeyNameMap[data["trend_key"]]) {
			paramText = bonusKeyNameMap[data["trend_key"]] + "+" + data[data["trend_key"]];
		}
		html += sprintf("<option value='{0}'>ILV{1} {2}", [
			data["data"],
			Math.floor(data["ilv"]),
			paramText
		]);
	}
	$("#fw_list").html(html);

	$("#favorite_filter").css("display", "none");
	$("#fw_list").css("visibility", "visible");

}
function dblclickFW() {

	var textDataB64 = $("#fw_list").val();

	var data = null;
	try {
		//デコード
		var jsonText = Base64.decode(textDataB64);
		data = JSON.parse(jsonText);
		console.log(data);
		showFavoriteData(data);
	} catch (e) {
		console.log(e);
		//alert("データの再生に失敗しました。");
	}

}
//*************************************
//** お気に入り関連
//*************************************
function deleteFavorite() {
	var id = $("#favorite_list").val();
	var index = -1;
	var data = null;

	for (var i = 0;i < favoriteList.length;i++) {
		if (favoriteList[i]["id"] == id) {
			index = i;
			data = favoriteList[i];
			break;
		}
	}
	if (-1 == index) {
		return;
	}
	if (isSMP) {
		if (!smpDeleteFavorite(data)) {
			return;
		}
	}

	favoriteList.splice(index, 1);
	deleteFavoriteList(data);
	saveFavoriteList();
	changeFavorite();
}

function dblclickFavorite() {
	showFavorite();
}
function showFavorite() {
	var id = $("#favorite_list").val();
	var index = -1;
	var data = null;

	for (var i = 0;i < favoriteList.length;i++) {
		if (favoriteList[i]["id"] == id) {
			index = i;
			data = favoriteList[i];
			break;
		}
	}
	showFavoriteData(data);
}
function showFavoriteData(data) {

	if (null == data) {
		return;
	}

	smpReleaseItemHighlight();

	//初期値補正
	if (null == data["filter"]) {
		data["filter"] = {};
	}
	if (null == data["filter"]["jobClass"]) {
		data["filter"]["jobClass"] = "圣骑士";
	}
	if (null == data["filter"]["god"]) {
		data["filter"]["god"] = "哈罗妮";
	}
	if (null == data["filter"]["tribe"]) {
		data["filter"]["tribe"] = "人族：中原之民";
	}
	if (null == data["filter"]["levelFrom"]) {
		data["filter"]["levelFrom"] = "1";
	}
	if (null == data["filter"]["levelTo"]) {
		data["filter"]["levelTo"] = "60";
	}
	if (null == data["filter"]["ilvFrom"]) {
		data["filter"]["ilvFrom"] = "0";
	}
	if (null == data["filter"]["ilvTo"]) {
		data["filter"]["ilvTo"] = "0";
	}
	if (null == data["filter"]["sort"]) {
		data["filter"]["sort"] = "_sp1";
	}
	if (null == data["filter"]["pvp"]) {
		data["filter"]["pvp"] = false;
	}
	if (null == data["filter"]["iddrop"]) {
		data["filter"]["iddrop"] = false;
	}
	//NOTE 言語設定が異なる場合は、フィルタの jobClass, god, tribe を変換する
	var favLang = data["lang"];
	if ("jp" != favLang && "en" != favLang && "fr" != favLang && "de" != favLang) {
		favLang = "jp";
	}
	if (favLang != lang) {
		data["filter"]["jobClass"] = translateMultiLanguage(data["filter"]["jobClass"], favLang, lang);
		data["filter"]["god"] = translateMultiLanguage(data["filter"]["god"], favLang, lang);
		data["filter"]["tribe"] = translateMultiLanguage(data["filter"]["tribe"], favLang, lang);
	}

	//フィルタ更新
	$("#general_filter_jobclass").val(data["filter"]["jobClass"]);
	$("#general_filter_god").val(data["filter"]["god"]);
	$("#general_filter_tribe").val(data["filter"]["tribe"]);
	$("#general_filter_level_from").val(data["filter"]["levelFrom"]);
	$("#general_filter_level_to").val(data["filter"]["levelTo"]);
	$("#general_filter_ilv_from").val(data["filter"]["ilvFrom"]);
	$("#general_filter_ilv_to").val(data["filter"]["ilvTo"]);

	$("#general_filter_sort").val(data["filter"]["sort"]);
	if (null != data["filter"]["pvp"] && ("checked" == data["filter"]["pvp"] || true == data["filter"]["pvp"])) {
		$("#general_filter_ignore_pvp").prop("checked", true);
	} else {
		$("#general_filter_ignore_pvp").prop("checked", false);
	}
	if (null != data["filter"]["iddrop"] && ("checked" == data["filter"]["iddrop"] || true == data["filter"]["iddrop"])) {
		$("#general_filter_ignore_iddrop").prop("checked", true);
	} else {
		$("#general_filter_ignore_iddrop").prop("checked", false);
	}
	if (null != data["filter"]["craftILV"] && ("checked" == data["filter"]["craftILV"] || true == data["filter"]["craftILV"])) {
		$("#general_filter_craft_ilv").prop("checked", true);
	} else {
		$("#general_filter_craft_ilv").prop("checked", false);
	}
	//NOTE 自動マテリア設定はお気に入り記録対象外

	//ノウス
	//NOTE フィルタ前に適用する必要がある
	if (null != data["novus"]) {
		for (var id in data["novus"]) {
			userNovusData[id] = {};
			for (var i in data["novus"][id]) {
				userNovusData[id][i] = data["novus"][id][i];
			}
		}
		saveUserNovusData();
	}

	//フィルタ適用
	doFilter(true, function(){showFavoriteDataAfterFilter(data);});
}
function showFavoriteDataAfterFilter(data) {

	if (null == data) {
		return;
	}

	isForce = true;

	//アイテム選択
	for (var i = 0;i < data["equip"].length;i++) {
		var equipData = data["equip"][i];
		var equipId = equipSelectorList[i];
		var equipJqs = jqsEquipList[equipId];

		//HQ状態
		var isHQ = false;
		if (null != data["hq"] && null != data["hq"][i]) {
			isHQ = data["hq"][i];
		}

		//旧ID変換
		if (null != idMap[equipData]) {
			console.log("id trans : " + equipData + " => " + idMap[equipData]);
			equipData = idMap[equipData];
		}

		equipJqs.forceSelectItemById(equipData, isHQ);
	}

	//マテリア設定
	for (var i = 0;i < data["materia"].length;i++) {
		var materiaData = data["materia"][i];
		var materiaId = materiaSelectorList[i];
		var materiaJqs = jqsMateriaList[materiaId];
		materiaJqs.forceSelectItem(materiaData);
	}

	//ボーナス設定
	if (null != data["pb"]) {
		sumPB = 0;
		for (var key in data["pb"]) {
			pbList[key] = data["pb"][key];
			sumPB += data["pb"][key];
		}
		showPBs();//この呼び出しで isForce = false となる。＞ならなくなったので強制falseにして同じ動きにする。
	}
	isForce = false;

	//食事選択
	//一度リセットする
	$("#list_meal").val("");
	if (null != data["meal"]) {
		//飯の情報を取得
		var meal = null;
		for (var i in mealsList) {
			var tmpMeal = mealsList[i];
			var testId = tmpMeal["id"] + "_" + ("1" == tmpMeal["is_hq"] ? "1" : "0");
			if (testId == data["meal"]) {
				meal = tmpMeal;
				break;
			}
		}
		if (null != meal) {
			//今のリストに出ているか？
			var isExist = false;
			$("#list_meal option").each(function(e) {
				if ($(this).val() == data["meal"]) {
					isExist = true;
				}
			});
			if (isExist) {
				//今のリストにあるならば、そのまま選択
				$("#list_meal").val(data["meal"]);

			} else {
				//今のリストにないのであれば、親を変更する
				//console.log(meal);
				//対象の食事が持っているパラメタの一覧のいずれかを親が持っている形にする
				var sortMealValue = "";
				var tmpValueList = [];
				$("#sort_meal option").each(function(e) {
					tmpValueList.push($(this).val());
				});
				var keyForJob = translate("ジョブ別");
				var keyForParam = translate("パラメタ別");
				for (var i = 0;i < tmpValueList.length;i++) {
					var tmpValue = tmpValueList[i];
					var priorValueText = "";
					if (null != mealSortIndexList[keyForJob][tmpValue]) {
						priorValueText = mealSortIndexList[keyForJob][tmpValue];
					} else if (null != mealSortIndexList[keyForParam][tmpValue]) {
						priorValueText = mealSortIndexList[keyForParam][tmpValue];
					} else {
						continue;
					}
					isExist = false;
					for (var k in meal["params"]) {
						if (-1 != priorValueText.indexOf(k)) {
							isExist = true;
						}
					}
					if (isExist) {
						sortMealValue = tmpValue;
						break;
					}
				}
				if ("" != sortMealValue) {
					//親を選択する
					$("#sort_meal").val(sortMealValue);
					//リストを変更する
					listupMeals();
					//飯を選択する。
					$("#list_meal").val(data["meal"]);
				}

			}
		}
	/*
	} else {
		$("#list_meal").val("");
	*/
	}
	updateMeal();

	//PTボーナス
	var isPTBonus = (null != data["ptBonus"] && "1" == data["ptBonus"]);
	$("#pt_bonus").prop("checked", isPTBonus);

	//マイスター
	if (data["meister"]) {
		$("#is_meister").prop("checked", true);
	}

	// null == data["pb"] のケースも考慮して強制false
	isForce = false;

	//一応再計算
	calcParameter();
	calcItemLevelAverage();
	calcSortValueSum();

}
function addFavorite() {
	var data = createFavoriteData();
	data["id"] = getNextFavoriteId();
	data["name"] = $("#new_favorite_name").val();

	favoriteList.push(data);
	addFavoriteList(data);
	saveFavoriteList();
	$("#new_favorite_name").val("");
	changeAddFavoriteText();

	if (isSMP) {
		smpAddFavorite(data);
	}
}
function createFavoriteData() {
	var data = {
		"id": "",
		"name": "",
		"filter": {
			"jobClass": $("#general_filter_jobclass").val(),
			"god": $("#general_filter_god").val(),
			"tribe": $("#general_filter_tribe").val(),
			"levelFrom": $("#general_filter_level_from").val(),
			"levelTo": $("#general_filter_level_to").val(),
			"sort": $("#general_filter_sort").val(),
			"ilvFrom": $("#general_filter_ilv_from").val(),
			"ilvTo": $("#general_filter_ilv_to").val(),
			"craftILV": $("#general_filter_craft_ilv").prop("checked"),
			"pvp": $("#general_filter_ignore_pvp").prop("checked"),
			"iddrop": $("#general_filter_ignore_iddrop").prop("checked")
		},
		"equip": [
		],
		"materia": [
		],
		"hq": [
		],
		"pb": {
		},
		"novus": {
		},
		"meal": "",
		"ptBonus": "",
		"meister": $("#is_meister").prop("checked"),
		"lang": lang
	};
	for (var i in jqsEquipList) {
		var jqs = jqsEquipList[i];
		var index = jqs.selectedIndex;
		var jqsData = jqs.setting.data[index];
		var id = "";
		if ("" == jqsData["data"]) {
			id = "";
		} else {
			id = jqsData["data"]["id"];
		}
		data["equip"].push(id);
		data["hq"].push(null == jqsData["isHQ"] ? false : jqsData["isHQ"]);

		if (isNovus(id)) {
			var nid = id;
			data["novus"][nid] = {};
			for (var j in novusParamKeys) {
				var npKey = novusParamKeys[j];
				var npValue = getNovusParamConfig(nid, npKey);
				if (0 != npValue) {
					data["novus"][nid][npKey] = npValue;
				}
			}
		}
	}
	for (var i in jqsMateriaList) {
		var jqs = jqsMateriaList[i];
		var jqsData = jqs.selectedMateriaData;
		data["materia"].push(jqsData);
	}
	//console.log(data["materia"]);

	for (var i in pbList) {
		data["pb"][i] = pbList[i];
	}

	data["meal"] = (null == selectedMeal ? "" : selectedMeal["id"] + "_" + (selectedMeal["is_hq"] == 1 ? "1" : "0"));

	data["ptBonus"] = ($("#pt_bonus").prop("checked") ? "1" : "0");

	//console.log(data);

	return data;
}

function getNextFavoriteId() {
	var ret = 0;

	for (var i = 0;i < favoriteList.length;i++) {
		if (favoriteList[i]["id"] >= ret) {
			ret = favoriteList[i]["id"] + 1;
		}
	}

	return ret;
}
function changeFavorite() {
	var id = $("#favorite_list").val();
	var isEnabled = true;
	if (null == id || "" == id) {
		isEnabled = false;
	}
	setFavoriteEnabled("favorite_show", isEnabled);
	setFavoriteEnabled("favorite_delete", isEnabled);

}
function changeAddFavoriteText() {
	var text = $("#new_favorite_name").val();
	var isEnabled = true;
	if (null == text || "" == text) {
		isEnabled = false;
	}
	setFavoriteEnabled("favorite_add", isEnabled);
}
function initFavorite() {

	loadFavoriteList();

	setupFavoriteList();
	setFavoriteEnabled("favorite_show", false);
	setFavoriteEnabled("favorite_delete", false);
	setFavoriteEnabled("favorite_add", false);
	setFavoriteAddTextHandle();

	if (isSMP) {
		if (0 != $("#favorite_list option").length) {
			$("favorite_list") .prop("selectedIndex", 0);
			setFavoriteEnabled("favorite_show", true);
			setFavoriteEnabled("favorite_delete", true);
		}
	}
//	window.localStorage.setItem("itemData", JSON.stringify(itemData));

}

function setFavoriteAddTextHandle() {
	$("#new_favorite_name").on("click blur keydown keyup keypress change", function(){changeAddFavoriteText();});
}
function setFavoriteEnabled(id, isEnabled) {
	if (isEnabled) {
		$("#" + id).removeAttr("disabled");
		$("#" + id).css("color", (isSMP ? "#000000" : "#ffffff"));
	} else {
		$("#" + id).attr("disabled", "disabled");
		$("#" + id).css("color", "#808080");
	}
}
function setupFavoriteList() {
	$("#favorite_list").empty();
	for (var i in favoriteList) {
		addFavoriteList(favoriteList[i]);
	}
}
function deleteFavoriteList(data) {
	$('#favorite_list option[value=' + data["id"] + ']').remove();

}
function addFavoriteList(data) {
	$('#favorite_list').append($('<option>').html(data["name"]).val(data["id"]));
}
function loadFavoriteList() {
	favoriteList = [];

	var favStr = window.localStorage.getItem("favoriteList");
	if (null == favStr || "" == favStr) {
	} else {
		favoriteList = JSON.parse(favStr);
	}
}
function saveFavoriteList() {
	window.localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
}
//*************************************
//** 選択リセット
//*************************************
function doReset() {

	//フィルタ初期化
	//チェック条件は初期化しない
	$("#general_filter_god").prop("selectedIndex", "0");
	$("#general_filter_tribe").prop("selectedIndex", "0");
	$("#general_filter_jobclass").prop("selectedIndex", "0");
	$("#general_filter_ilv_from").prop("selectedIndex", "0");
	$("#general_filter_ilv_to").prop("selectedIndex", "0");
	$("#general_filter_sort").val("_sp1");

	$("#general_filter_level_from").val(60);
	$("#general_filter_level_to").val(60);

	//選択装備リセット
	for (var i = 0;i < equipSelectorList.length;i++) {
		var equipId = equipSelectorList[i];
		var equipJqs = jqsEquipList[equipId];
		equipJqs.forceSelectItem(0);
	}

	//スマホ選択解除
	// $("#l_accuracy").attr("disabled", "disabled");
	smpReleaseItemHighlight();
}

//*************************************
//** 装備一覧
//*************************************
//一覧表示チェック変更
function onClickListEquipSelect() {
	config["isShowEquipList"] = $("#list_equip_select").prop("checked");
	saveConfig();
}

//リスト表示（ドロップダウン▼クリック割込み）
//false返却でドロップダウン表示
function showEquipList(jqs) {
	//smp
	if (isSMP) {
		smpShowEquipList(jqs);
		return true;
	}

	//リスト表示チェック
	if (!$("#list_equip_select").prop("checked")) {
		return false;
	}
	if (jqs.setting.materiaMode) {
		return false;
	}
	
	scrollTop = getScrollTop();
	targetJqs = jqs;


	//マスク表示
	/*
	$("#ev_mask").css({
		"width": $("body").width(),
		"height": $("body").height(),
	});
	$("#ev_mask").show();
	*/
	//リスト生成
	createEquipList(jqs);

	//リスト表示
	var w = $("#main_cell_0").width() + $("#main_cell_1").width() + 2;//12 = padding
	$("#ev_table").css({
		"width": w,
		"height": $(window).height() - 28,
		"position": "absolute",
		"left": $("#filter_table").offset().left - 10,
		"top":  "8px",
		"z-order": 1001,
	});
	$("#ev_scroll").width(w);
	$("#ev_list_main").height($("#ev_table").height() - 40);

	$("#base").hide();
	$("#ev_table").show();

	//装備詳細表示
	showItemDetail(targetJqs, "forEquipList0", targetJqs.setting.data[targetJqs.selectedIndex], null);

	//キャプション表示「現在の装備」
	$("#caption_text_for_equip_list").text(ml_equip_list_current);
	$("#caption_for_equip_list").show();

	//HTML加工
	//ID系をまるまる消してく
	var html = $("#popup_equip_detail").html();
	html = html.replace(/id=\".*?\"/g, "");
	//ev_popup にいれて表示
	$("#ev_popup").html(html);
	$("#ev_popup").css({
		"position": "absolute",
		"left": $("#ev_table").offset().left + $("#ev_table").width() + 8,
		"top":  $("#ev_table").offset().top,
		"zIndex": "1999",
		"visibility": "visible",
		"display": "block",
	});

	return true;

	//アニメーション開始
	/*
	$("#ev_table").animate( {
		"opacity": 1,
		"-moz-opacity": 1,
		"left": $("#filter_table").offset().left,
	}, 150);
	*/
	return true;
}
//リスト生成
function createEquipList(jqs) {

	//タイトル
	var titleId = jqs.dataId.replace("equip_selector", "le");
	$("#ev_equip_part").text($("#" + titleId).text());

	//id = jqs.dataId
	//data = jqs.setting.data

	//リストヘッダを決定
	//名前（固定）基準値（固定）
	//残り9枠は、classEquipViewColumn によって決定。
	//前から順に採用。ただし候補の中で当該値を持つアイテムが0個だった場合はスキップ。

	var jobClass = $("#general_filter_jobclass").val();

	//出現数カウント用マップ作成
	var paramCountMap = {};//key="key" value={"text": "xxxx", "abbr": "xxxx", "count": 0};
	var tmpMap = {};
	for (var i in classEquipViewColumn[jobClass]) {
		tmpMap[classEquipViewColumn[jobClass][i]] = Number(i);
	}
	for (var i in sortMap) {
		for (var j in sortMap[i]) {
			var tmpSortMap = sortMap[i][j];
			if (null != tmpMap[tmpSortMap["name"]]) {
				paramCountMap[tmpSortMap["key"]] = {
					"name": tmpSortMap["name"],
					"abbr": tmpSortMap["abbr"],
					"key": tmpSortMap["key"],
					"index": tmpMap[tmpSortMap["name"]],
					"count": 0
				};
			}
		}
	}

	//装備ループ
	for (var i in jqs.setting.data) {
		var equip = jqs.setting.data[i];
		var suffix = (equip.isHQ ? "_hq" : "_nq");

		//出現数カウント
		for (var j in paramCountMap) {
			if (null != equip["data"][j + suffix]) {
				paramCountMap[j]["count"]++;
			}
		}
	}
	//固定カラムのダミー値設定
	paramCountMap["_name"] = {"name": ml_equip_list_name,       "abbr": ml_equip_list_name, "key": "_name", "index": -2, "count": 1};
	paramCountMap["_sort"] = {"name": ml_equip_list_sort_value, "abbr": ml_equip_list_sort_value, "key": "_sort", "index": -1, "count": 1};

	//採用カラムの決定
	var tmpColumnList = [];
	for (var i in paramCountMap) {
		if (0 != paramCountMap[i]["count"]) {
			tmpColumnList.push(paramCountMap[i]);
		}
	}
	tmpColumnList.sort(function(a, b) {
		return a["index"] - b["index"];
	});
	var columnList = [];
	for (var i in tmpColumnList) {
		columnList.push(tmpColumnList[i]);
		if (columnList.length >= 11) {
			break;
		}
	}

	//ヘッダHTML作成
	var headerHTML = "";
	for (var i in columnList) {
		var column = columnList[i];
		var applyClassName = "unselectable ev_cell_border";
		if (ml_equip_list_name == column["abbr"]) {
			applyClassName += " ev_cell_name ev_cell_name_header";
		} else if (ml_equip_list_sort_value == column["abbr"] || ml_equip_list_aa_abbr == column["abbr"]) {
			applyClassName += " ev_cell_param0";
		} else {
			applyClassName += " ev_cell_param1";
		}
		if (i == columnList.length - 1) {
			applyClassName += " ev_cell_border_right";
		}
		var columnText = column["abbr"];
		if ("jp" != lang) {
			if (columnText.length > 4) {
				columnText = columnText.substr(0, 4) + ".";
			}
		}
		headerHTML += sprintf("<td style=\"background-color: #606060\" class=\"{0}\">{1}</td>", [applyClassName, columnText]);
	}

	//$("#ev_list_header").html(headerHTML);
	headerHTML = "<tr>" + headerHTML + "</tr>";
	//コンテンツHTML作成
	var html = "";
	for (var i in jqs.setting.data) {
		if (i % 15 == 0) {
			html += headerHTML;
		}
		var equip = jqs.setting.data[i];
		var suffix = (equip.isHQ ? "_hq" : "_nq");
		var subHTML = "";
		var lineId = "";
		if (null != equip["data"]["id"]) {
			lineId = "equip_list_" + equip["data"]["id"] + (equip.isHQ ? "_hq" : "_nq");
		} else {
			lineId = "equip_list_none";
		}
		subHTML += sprintf(
			"<tr class=\"unselectable ev_row_base{1}\" id=\"{0}\" " +
			"onMouseOver=\"onMouseOverEquipLine('{0}')\" " +
			"onMouseOut=\"onMouseOutEquipLine('{0}')\" " +
			"onClick=\"onClickEquipLine('{0}')\">", [ 
				lineId,
				(i == Number(jqs.selectedIndex) ? " ev_row_current" : "")
		]);

		for (var j in columnList) {
			var column = columnList[j];
			var valueHTML = "";

			//クラス
			var applyClassName = "ev_cell_border";
			
			if (ml_equip_list_name == column["abbr"]) {
				applyClassName += " ev_cell_name";
			} else if (ml_equip_list_sort_value == column["abbr"] || ml_equip_list_aa_abbr == column["abbr"]) {
				applyClassName += " ev_cell_param0";
			} else {
				applyClassName += " ev_cell_param1";
			}
	
			if (j == columnList.length - 1) {
				applyClassName += " ev_cell_border_right";
			}
			if (i == jqs.setting.data.length - 1) {
				applyClassName += " ev_cell_border_bottom";
			}

			//HTML
			if ("_name" == column["key"]) {
				//名前
				var name = "";
				var checkboxHTML = "";
				if (null == equip["data"]["name"]) {
					name = ml_equip_list_unselect;

				} else {
					name = sprintf("Lv{0}[{1}] {2}{3}", [
						equip["data"]["base_glv"],
						equip["data"]["base_ilv"],
						equip["data"]["name"],
						(equip.isHQ ? "HQ" : ""),
					]);

					//checkedEquipList
					var isCheckedEquip = (config["checkedEquipList"][equip["data"]["id"] + "_" + (equip.isHQ ? "1" : "0")]);
					checkboxHTML = sprintf(
						"<input type=\"checkbox\" id=\"checkedequip_{1}_{2}\" class=\"ev_checkbox\"{0} onclick=\"onClickEquipCheckBox('{1}', '{2}')\">", [
							(isCheckedEquip ? " checked" : ""),
							equip["data"]["id"],
							equip.isHQ ? "1" : "0"
						]
					);
				}


				valueHTML = sprintf(
					'<div style="display: inline">' +
					checkboxHTML + 
					'<img src="{0}" class="ev_itemimage">' +
					'<span class="ev_item_name {1}" style="margin-left:4px">{2}</span>' +
					'</div>', [
						(null != equip["data"]["img" + suffix] ? createImageUrl(equip["data"]["img" + suffix]) : blankEquipImageUrl),
						(null != equip["color"] ? "pu_itemname_small_" + equip["color"] : ""),
						name
				]);

			} else if ("_sort" == column["key"]) {
				//基準
				valueHTML = (null != equip["sort"] ? ("+0" == equip["sort"]  ? "0.00" : equip["sort"]): "&nbsp;");

			} else {
				//パラメタ
				var paramValue = (null != equip["data"][column["key"] + suffix] ? equip["data"][column["key"] + suffix] : 0);
				paramValue = Number(String(paramValue).replace("+", ""));

				//ノウスネクサス対応
				if (isNovus(equip.data["id"])) {
					var npKey = column["key"].replace("bonus_", "");
					var npValue = getNovusParamConfig(equip.data["id"], npKey);
					if (0 != npValue) {
						paramValue += npValue;
					}
				}
				if (0 == paramValue) {
					paramValue = "&nbsp;";
				}
				valueHTML = paramValue;

			}
			subHTML += sprintf("<td class=\"{0}\">{1}</td>", [applyClassName, valueHTML]);
		}
		subHTML += "</tr>\n";
		html += subHTML;
	}
	$("#ev_list_main").html(html);


}

//リスト：MouseOver
function onMouseOverEquipLine(id) {
	$("#" + id).addClass("ev_row_selected");

	var splitId = id.split("_");
	if (splitId.lendth < 4) {
		$("#popup_equip_detail").hide();
	} else {
		//装備詳細表示
		//targetJqs.forceSelectItemById(splitId[2], ("hq" == splitId[3]));
		//targetJqs.setting.data[targetJqs.selectedIndex]
		var targetData = null;
		var isHQ = ("hq" == splitId[3]);
		for (var i = 0; i < targetJqs.setting.data.length;i++) {
			var testData = targetJqs.setting.data[i];
			if (testData["data"]["id"] == splitId[2] && testData["isHQ"] == isHQ) {
				targetData = testData;
				break;
			}
		}
		if (null == targetData) {
			$("#popup_equip_detail").hide();
			
		} else {
			showItemDetail(targetJqs, "forEquipList1", targetData, null);

			//キャプション表示「現在の装備」
			$("#caption_text_for_equip_list").text(ml_equip_list_selected);
			$("#caption_for_equip_list").show();

			//こちらはポップアップを利用して表示
			$("#popup_equip_detail").css({
				"position": "absolute",
				"left": $("#ev_popup").offset().left ,
				"top":  $("#ev_popup").offset().top + $("#ev_popup").height() + 4,
				"zIndex": "2000",
				"visibility": "visible",
				"display": "block",
			});
		}
	}


}
//リスト：MouseOut
function onMouseOutEquipLine(id) {
	$("#" + id).removeClass("ev_row_selected");
}
//リスト：Click
function onClickEquipLine(id) {
	//NOTE tr上チェックボックスのクリックについては、バブリングを停止しているためここまで来ない。

	//jqs に対して選択を行う
	var splitId = id.split("_");
	if (splitId.lendth < 4) {
		targetJqs.forceSelectItemByIndex(0);
	} else {
		targetJqs.forceSelectItemById(splitId[2], ("hq" == splitId[3]));
	}
	$("#ev_table").hide();
	$("#ev_mask").hide();
	$("#ev_popup").hide();
	$("#popup_equip_detail").hide();

	$("#base").show();

	window.scrollTo(0, scrollTop);
}
//装備チェック
function onClickEquipCheckBox(id, isHQ) {
	var checkedId = "checkedequip_" + id + "_" + isHQ;
	var isChecked = $("#" + checkedId).prop("checked");
	if (isChecked) {
		config["checkedEquipList"][id + "_" + isHQ] = 1;
	} else {
		delete config["checkedEquipList"][id + "_" + isHQ];
	}
	saveConfig();

	//バブリング停止
	var e = windowEvent();
	if (null != e) {
		e.cancelBubble = true;
	}
}

//装備選択キャンセル
function onClickCancelEquipList() {
	$("#ev_table").hide();
	$("#ev_mask").hide();
	$("#ev_popup").hide();
	$("#popup_equip_detail").hide();

	$("#base").show();
	window.scrollTo(0, scrollTop);
}


//*************************************
//** アイテム詳細
//*************************************
function showItemDetailOnImage(e) {
	var imageId = e.target.id;
	if ("" == imageId) {
		return;
	}

	var id = imageId.substr(6);
	var jqs = jqsEquipList[id];
	if (null == jqs) {
		return;
	}
	var data = jqs.setting.data[jqs.selectedIndex];
	showItemDetail(jqs, "fromImage", data, imageId);
}

function showItemDetail(jqs, eventName, data, basePosId) {

	if (null == data || "" == data || null == data["data"] || "" == data["data"]) {
		hideItemDetail(jqs, eventName, data);
		return;
	}
	var isCurrentEquip = false;

	popupBasePosId = basePosId;
	if (null == popupBasePosId) {
		popupBasePosId = jqs.elem.attr("id");
	} else {
		isCurrentEquip = true;
	}

	//HQ判定
	var isHQ = false;
	var suffix = "_nq";
	if (null != data["isHQ"] && data["isHQ"]) {
		isHQ = true;
		suffix = "_hq";
	}

	d = data["data"];

	//マテリアデータ用意
	var materiaId = "";
	var materiaJqs = "";
	var materiaData = {};
	var isExistMateria = false;
	if (isCurrentEquip) {
		//image_equip_selector_60 ⇒ materia_selector_60
		materiaId = popupBasePosId.replace("image_equip", "materia");
		materiaJqs = jqsMateriaList[materiaId];
		if (null != materiaJqs && undefined != materiaJqs) {
			var materias = materiaJqs.selectedMateriaData;
			if ("" != materias) {
				for (j in materias) {
					materia = materias[j];
					baseMateriaData = materiaJqs.materiaData[materia["key"]];
					var key = baseMateriaData["effect"];
					var value = Number(baseMateriaData["values"][Number(materia["level"])]);
					value += Number(materia["adjust"]);
					//値の合算
					isExistMateria = true;
					if (null == materiaData[key]) {
						materiaData[key] = 0;
					}
					materiaData[key] += value;
				}
			}
		}
	}

	//データ設定
	//キャプション非表示
	$("#caption_for_equip_list").hide();

	//基礎データ
	$("#pu_data_image").attr("src", createImageUrl(d["img" + suffix]));
	var rareText = getItemDetailValueBase(d, "base_attr", "", false);
	if ("" != rareText) {
		rareText = " | " + rareText;
	}
	$("#pu_data_roll_rare").text(d["roll"] + rareText);
	$("#pu_data_name").text(d["name"] + (isHQ ? "HQ" : ""));
	$("#pu_data_name").attr("class", "pu_itemname_" + d["item_color"]);

	//基本データ
	//出力する値の caption-keyのリストを作成
	//最大で3個までしか出ない前提
	var baseValue = [];
	for (var i in sortMap[ml_base_param]) {
		var key = sortMap[ml_base_param][i]["key"];
		var caption = sortMap[ml_base_param][i]["name"];
		var value = getItemDetailValueNum(d, key, isHQ);
		if (0 != value) {
			baseValue.push({"caption": caption, "key": key});
		}
	}
	//一度消す
	for (var i = 0;i < 3;i++) {
		$("#pu_data_main_name" + i).text("");
		$("#pu_data_main_value" + i).text("");
		$("#pu_data_main_value" + i).attr("class", "");
	}
	//値設定
	for (var i = 0;i < baseValue.length;i++) {
		var baseSet = baseValue[i];
		var pos = 3 - baseValue.length + i;
		$("#pu_data_main_name" + pos).text(baseValue[i]["caption"]);
		$("#pu_data_main_value" + pos).text(d[baseValue[i]["key"] + suffix]);
		$("#pu_data_main_value" + pos).attr("class", "pu_main_param_value");
	}

	//基準値計算
	var sortValue = 0;
	var sortValueWithMateria = 0;


	//装備＋マテリアでの計算
	//NOTE ここの基準値はソート条件に依存しない。クラス別特化のパラメタを用いて行う
	filterJobClass = $("#general_filter_jobclass").val();
	//spList = classMap[filterJobClass]["spList"];
	spList = getSPList(filterJobClass, null);

	for (var spIndex in spList) {
		for (var spKey in spList[spIndex]) {
			sortValue += (getItemDetailValueNum(d, spKey, isHQ) * spList[spIndex][spKey]);

			//マテリア追加分
			sortValueWithMateria += (getItemDetailValueNum(d, spKey, isHQ) * spList[spIndex][spKey]);
			if (undefined != materiaData[spKey]) {
				sortValueWithMateria += (materiaData[spKey] * spList[spIndex][spKey]);
			}
		}
	}
	var invalidText = getItemDetailValueBase(d, "base_invalid_equip", "", false);
	if ("" != invalidText) {
		tmp = invalidText.split(",");
		sortValue = sortValue / (tmp.length + 1);
		sortValueWithMateria = sortValueWithMateria / (tmp.length + 1);
	}
	sortValue = new Number(sortValue).toFixed(2);
	sortValueWithMateria = new Number(sortValueWithMateria).toFixed(2);

	var refValueText = " / " + ml_param_sort_value + " " + sortValue;
	if (isExistMateria) {
		refValueText += " [" + ml_param_sort_value_materia + " " + sortValueWithMateria + "]";
	}
	$("#pu_data_refvalue").text(refValueText);


	//一般データ
	$("#pu_data_itemlevel").text(getItemDetailValueNum(d, "base_ilv", false));
	$("#pu_data_class").text(d["base_class_ok"]);
	$("#pu_data_gearlevel").text(getItemDetailValueNum(d, "base_glv", false));

	var materiaText = getItemDetailValueNum(d, "base_materia", false);
	if ("1" == d["ne_materia"]) {
		materiaText += " (" + ml_ne_materia + ")";
	}
	$("#pu_data_materia").text(materiaText);

	var noteText = "";
	if (null != d["note_nq_hq"] && "" != d["note_nq_hq"]) {
		noteText = indexToText(d["note_nq_hq"]);
	}
	$("#pu_data_note").text(noteText);

	var invalidText = getItemDetailValueBase(d, "base_invalid_equip", "", false);
	if ("" != invalidText) {
		invalidText += " " + ml_equip_disabled;
	}
	$("#pu_data_invalid_equip").text(invalidText);
	

	//ボーナスデータ
	var buf = "";
	var index = 0;
	for (var bonusKey in showBonusList) {
		var value = getItemDetailValueNum(d, bonusKey, isHQ);
		var materiaValue = materiaData[bonusKey];
		if (undefined == value) {
			value = 0;
		}
		if (undefined == materiaValue) {
			materiaValue = 0;
		}
		if (0 != value || 0 != materiaValue) {
			if (index % 2 == 0) {
				if (0 != index) {
					buf += "</tr>";
				}
				buf += "<tr>";
			}
			var isNovusAdd = false;
			if (isNovus(d["id"])) {
				var nid = d["id"];
				if (bonusKey.length >= 6 && bonusKey.substr(0, 6) == "bonus_") {
					var npKey = bonusKey.substr(6);
					var npValue = getNovusParamConfig(nid, npKey);
					if (npValue > 0) {
						isNovusAdd = true;
					}
				}
			}
			
			//マテリアパラメタによって表示分け
			if (0 != value && 0 == materiaValue) {
				//通常○マテリア×
				buf += sprintf("<td width='40%' class='pu_body_padding pu_text {3}'>{0} {1}{2}</td>",
						[showBonusList[bonusKey], (value >= 0 ? "+" : ""), value, isNovusAdd ? "pu_novus" : ""]);
			} else if (0 != value && 0 != materiaValue) {
				//通常○マテリア○
				buf += sprintf("<td width='40%' class='pu_body_padding pu_text {3}'>{0} {1}{2} {4}</td>", [
					showBonusList[bonusKey], 
					(value >= 0 ? "+" : ""), 
					value, 
					isNovusAdd ? "pu_novus" : "",
					"&nbsp;<span class='pu_novus'>" + (materiaValue > 0 ? "+" : "") + materiaValue + "</span>"
				]);
			} else {
				//通常×マテリア○
				buf += sprintf("<td width='40%' class='pu_body_padding pu_text pu_novus'>{0} {1}{2}</td>", [
					showBonusList[bonusKey], (materiaValue >= 0 ? "+" : ""), materiaValue
				]);
			}
			index++;
		}
	}

	if ("" != buf) {
		buf += "</tr>";
	}

	//セットボーナス表示
	var setBonusCond = indexToText(getItemDetailValueBase(d, "set_bonus_condition", "", isHQ));
	var setBonusValue = indexToText(getItemDetailValueBase(d, "set_bonus_detail", "", isHQ));
	if ("" != setBonusCond && "" != setBonusValue) {
		buf += sprintf('<tr><td colspan="2" class="put_setbonus">' + ml_set_bonus + ': {0}</td></tr>', [setBonusCond]);

		var valueList = setBonusValue.split(", ");
		for (var i = 0;i < valueList.length;i++) {
			buf += sprintf('<tr><td colspan="2" class="pu_body_padding pu_text">{0}</td></tr>', [valueList[i]]);
		}
	}

	//サンクション表示
	var sancCond = indexToText(getItemDetailValueBase(d, "sanc_condition", "", isHQ));
	var sancValue = indexToText(getItemDetailValueBase(d, "sanc_detail", "", isHQ));
	if ("" != sancCond && "" != sancValue) {
		buf += sprintf('<tr><td colspan="2" class="put_sanc">' + ml_sanction + ': {0}</td></tr>', [sancCond]);

		var valueList = sancValue.split(", ");
		for (var i = 0;i < valueList.length;i++) {
			buf += sprintf('<tr><td colspan="2" class="pu_body_padding pu_text">{0}</td></tr>', [valueList[i]]);
		}
	}

	$("#pu_data_bonus_area").empty();
	$("#pu_data_bonus_area").append(buf);

	//入手方法
	if (d["gain"] != undefined) {
		var gainText = indexToText(d["gain"]);
		var gainTextList = gainText.split(", ");
		var gainHTML = "";
//console.log("***********");
//console.log(gainText);
//console.log(gainTextList);
		for (var i = 0;i < gainTextList.length;i++) {
			gainHTML += sprintf('<span class="pu_body_padding">{0}</span><br>', [gainTextList[i]]);
		}
		$("#gain_info_text").html(gainHTML);
		$("#gain_info").css("display", "block");
	} else {
		$("#gain_info").css("display", "none");
	}

	//装備リスト表示のときは、位置調整は caller で実施する
	if (eventName.startsWith("forEquipList")) {
		return;
	}
	//スマホのときも、位置調整は caller で実施する
	if (isSMP) {
		return;
	}

	//座標調整
	//popupBasePosId = basePosId;
	var pos = $("#" + popupBasePosId).offset();
	var posLeft = 0;
	var posTop = pos.top;
	if (-1 == popupBasePosId.indexOf("image_")) {
		//ドロップダウン選択時
		var testText = data["text"];
		if (null != jqs.setting.maxLengthText && "" != jqs.setting.maxLengthText) {
			testText = jqs.setting.maxLengthText;
		}
		$("#measure_text").text(testText);
		var textWidth = $("#measure_text").width();
		posLeft = pos.left + textWidth + 32;
	} else {
		//アイコン選択時
		posLeft = pos.left + $("#" + popupBasePosId).width() + 4;
	}
	scrollTop = getScrollTop();
    clientHeight = getClientHeight();
    clientWidth = getClientWidth();
	boxHeight = $("#" + popupBasePosId).height();
	ddHeight = $("#popup_equip_detail").height();
	ddWidth = $("#popup_equip_detail").width();
	isUnder = true;


	//X位置調整
	if (posLeft + ddWidth > clientWidth) {
		posLeft = clientWidth - ddWidth;
	}

	//ビューボックスの画面上のY位置
	posRelTop = posTop - scrollTop;

/*
console.log("-----------------------");
console.log("scrollTop   : " + scrollTop);
console.log("clientHeight: " + clientHeight);
console.log("clientWidth : " + clientWidth);
console.log("boxHeight   : " + boxHeight);
console.log("ddHeight    : " + ddHeight);
console.log("ddWidth     : " + ddWidth);
console.log("posRelTop   : " + posRelTop);
*/

	if (posRelTop + boxHeight + ddHeight <= clientHeight) {
		//下にドロップダウンを開き、入りきるなら下に開く
		isUnder = true;
		posTop = pos.top;
		//console.log("ok: open down: " + (posRelTop + boxHeight + ddHeight) + "<=" + clientHeight);

	} else if (posRelTop - ddHeight >= 0) {
		//上にドロップダウンを開き、入りきるなら上に開く
		isUnder = false;
		posTop = pos.top - ddHeight + boxHeight + 4;
		//console.log("ok: open up: " + (posRelTop - ddHeight) + " >= 0");

	} else {
		//どっちに開いても開ききらない

		//下に開いたときのはみ出す量
		bottomOverSize = (posRelTop + boxHeight + ddHeight) - clientHeight;

		//上に開いたときのはみだす量
		topOverSize = -1 * (posRelTop - ddHeight);


		if (bottomOverSize < topOverSize) {
			//下に開いたときにはみ出す量が、上のそれより少ない
			//＝下を基準にして、はみ出す量だけ上にずらす
			isUnder = true;
			posTop = pos.top - bottomOverSize;
			//console.log("ok: bottom+");
		} else {
			isUnder = false;
			posTop = pos.top - ddHeight + boxHeight + 4 + topOverSize;
			//console.log("ok: up+");
		}

		/*
		//どっちに開いても開ききらないのであれば、余白が広い方向に開く
		//＝はみ出す量が少ない側に開く

		//下に開いたときのはみ出す量
		bottomOverSize = (posRelTop + boxHeight + ddHeight) - clientHeight;

		//上に開いたときのはみだす量
		topOverSize = -1 * (posRelTop - ddHeight);

		if (bottomOverSize < topOverSize) {
			isUnder = true;
			posTop = pos.top;
		} else {
			isUnder = false;
			posTop = pos.top - ddHeight + boxHeight + 4;
		}
		*/
	}

	//表示開始
	$("#popup_equip_detail").css("position", "absolute");
	$("#popup_equip_detail").css("left", posLeft + "px");
	$("#popup_equip_detail").css("top", posTop + "px");
	$("#popup_equip_detail").css("zIndex", "2000");
	$("#popup_equip_detail").css("visibility", "visible");
	$("#popup_equip_detail").css("display", "block");
}

function hideItemDetail(jqs, eventName, data) {
	$("#popup_equip_detail").css("visibility", "hidden");
	$("#popup_equip_detail").css("display", "none");
}

//*************************************
//** フィルタ処理
//*************************************

//フィルタ開始
function doFilterFromButton(isBlocked, func) {
	saveFilterConditions();
	doFilter(isBlocked, func);
}
function doFilter(isBlocked, func) {
	//$("*").css("cursor", "wait");
	filterAfterFunc = func;

	if (isBlocked) {
		$.blockUI({	
			message: null,
			fadeIn: 0,
			fadeOut: 0,
		});
		setTimeout("doFilterMainBlocked()", 100);
	} else {
		setTimeout("doFilterMainUnblocked()", 100);
	}

}

//フィルタメイン処理
function doFilterMainBlocked() {
	doFilterMain(true);
}
function doFilterMainUnblocked() {
	doFilterMain(false);
}

function doFilterMain(isBlocked) {

	smpReleaseItemHighlight();

	if (isFirstFilter) {
		isFirstFilter = false;
		initPBOnFirstFilter();
		initMealOnFirstFilter();
		initPTBonusOnFirstFilter();
	}

	filterJobClass = $("#general_filter_jobclass").val();
	filterLevelFrom = Number($("#general_filter_level_from").val());
	filterLevelTo = Number($("#general_filter_level_to").val());
	filterILVFrom = Number($("#general_filter_ilv_from").val());
	filterILVTo = Number($("#general_filter_ilv_to").val());
	filterSortBy = $("#general_filter_sort").val();
	filterSortByName = "";
	filterOrderBy = "";
	filterPvP = $("#general_filter_ignore_pvp").prop("checked");
	filterIDDrop = $("#general_filter_ignore_iddrop").prop("checked");
	filterAdjustJob = $("#general_filter_adjust_job").prop("checked");
	filterCraftILV = $("#general_filter_craft_ilv").prop("checked");

	//クラス優先パラメタの定義
	//クラス別特性にて伸びるパラメタを優先とする
	var classPrior = "";
	if (null != traitsMap[filterJobClass]) {
		if (null != traitsMap[filterJobClass][0] && traitsMap[filterJobClass][0]["attr"]) {
			classPrior = "bonus_" + traitsMap[filterJobClass][0]["attr"];
			//ただし学者の場合に限り 強制的に mnd
			//学者は巴術のパラメタを引き継いでいるため、そのまま対応するとintになる
			if (filterJobClass == ml_sch) {
				classPrior = "bonus_mnd";
			}
		}
	}
	console.log(classPrior);


	//ilv from-toの入れ替え
	if (filterILVFrom != 0 && filterILVTo != 0 && filterILVFrom > filterILVTo) {
		var tmp = filterILVFrom;
		filterILVFrom = filterILVTo;
		filterILVTo = tmp;
	}

	for (var i in sortMap) {
		for (var j in sortMap[i]) {
			if (sortMap[i][j]["key"] == filterSortBy) {
				filterOrderBy = sortMap[i][j]["order"];
				filterSortByName = sortMap[i][j]["abbr"];
				break;
			}
		}
	}

	var isEditLevel = false;
	if (isNaN(filterLevelFrom) || filterLevelFrom < 1 || filterLevelFrom > 60) {
		isEditLevel = true;
		filterLevelFrom = 1;
	}
	if (isNaN(filterLevelTo) || filterLevelTo < 1 || filterLevelTo > 60) {
		isEditLevel = true;
		filterLevelTo = 60;
	}
	if (filterLevelFrom > filterLevelTo) {
		isEditLevel = true;
		tmp = filterLevelFrom;
		filterLevelFrom = filterLevelTo;
		filterLevelTo = tmp;
	}
	if (isEditLevel) {
		$("#general_filter_level_from").val(filterLevelFrom);
		$("#general_filter_level_to").val(filterLevelTo);
	}

	//有効クラスの確認
	var validClassList = classMap[filterJobClass]["classes"];
	var loopLimit = equipSelectorList.length;

	if ("en" == lang) {
		var isWarOrMage = false;
		for (var i in validClassList) {
			if ("Disciple of War" == validClassList[i]) {
				isWarOrMage = true;
				break;
			} else if ("Disciple of Magic" == validClassList[i]) {
				isWarOrMage = true;
				break;
			}
		}
		if (isWarOrMage) {
			validClassList.push("Disciples of War or Magic");
		}
	}

	//優先ソートの必要性を確認
	var isPriorSort = false;
	var priorBonusKeys = [];
	/*
	if (filterAdjustJob) {
		isPriorSort = true;

		var isSingleKey = false;
		var targetKeys = [];
		if ("bonus_hit" == filterSortBy || "bonus_will" == filterSortBy || "bonus_crit" == filterSortBy || "bonus_dodge" == filterSortBy || "bonus_skill_speed" == filterSortBy || "bonus_spell_speed" == filterSortBy) {
			targetKeys = ["bonus_str", "bonus_dex", "bonus_vit", "bonus_int", "bonus_mnd", "bonus_pie"];
			isSingleKey = true;

		} else if ("base_glv" == filterSortBy || "base_ilv" == filterSortBy) {
			targetKeys = ["bonus_str", "bonus_dex", "bonus_vit", "bonus_int", "bonus_mnd", "bonus_pie", "bonus_gain", "bonus_quality", "bonus_gp", "bonus_edit", "bonus_work", "bonus_cp"];
		}
		if (0 != targetKeys.length) {
			// ここはユーザビリティを高めるための固定ソートなので、ユーザ設定対応は要らない
			var tmpSpList = classMap[filterJobClass]["spList"];
			for (var i in tmpSpList) {
				var tmpSpMap = tmpSpList[i];
				var tmpKey = "";
				for (var j in tmpSpMap) {
					tmpKey = j;
				}

				if (-1 != $.inArray(tmpKey, targetKeys)) {
					priorBonusKeys.push(tmpKey);
					if (isSingleKey) {
						break;
					}
				}
			}
		}
		if (0 == priorBonusKeys.length) {
			isPriorSort = false;
		}
	}
	*/

	isForce = true;//パラメタ計算を停止

	//フィジカルボーナス初期化
	resetPB();

	//トレイト設定
	setTraits();

	//指輪1個めのデータ
	var ringInfo = null;

	var isHQ = false;

	for (var i = 0;i < loopLimit;i++) {
		//オブジェクト・値用意
		var equipId = equipSelectorList[i];
		var equipJqs = jqsEquipList[equipId];
		var materiaId = materiaSelectorList[i];
		var materiaJqs = jqsMateriaList[materiaId];

		//console.log(equipId);

		//装備箇所ID
		var tmp = equipId.split("_");
		var rollId = tmp[tmp.length - 1];

		//データ作成
		var jqsData = [];
		for (var j in itemData.data[rollId]) {
			
			itemDetail = itemData.data[rollId][j];
			var isTarget = false;
			while (true) {
				//レベル
				var glv = Number(itemDetail["base_glv"]);
				if (glv < filterLevelFrom || glv > filterLevelTo) {
					break;
				}

				//アイテムレベル
				var ilvFromOK = false;
				var ilvToOK = false;
				var ilvBase = Number(itemDetail["base_ilv"]);
				if (filterCraftILV) {
					if (null != itemDetail["craft"] && "1" == itemDetail["craft"]) {
						ilvBase += 9;
					}
				}
				if (0 == filterILVFrom || ilvBase >= filterILVFrom) {
					ilvFromOK = true;
				}
				if (0 == filterILVTo || ilvBase <= filterILVTo) {
					ilvToOK = true;
				}
				if (!ilvFromOK || !ilvToOK) {
					break;
				}

				//クラス
				isJobExist = false;
				for (var k in validClassList) {
					if (-1 != itemDetail["base_class_ok"].toLowerCase().indexOf(validClassList[k].toLowerCase())) {
						isJobExist = true;
						break;
					}
				}
				if (!isJobExist) {
					break;
				}

				//PvPフィルタ
				if (filterPvP) {
					if (null != itemDetail["note_nq_hq"] && "" != itemDetail["note_nq_hq"] &&
						-1 != indexToText(itemDetail["note_nq_hq"]).indexOf("PvP")) {
						break;
					}
				}
				//IDドロップフィルタ
				if (filterIDDrop) {
					if (null != itemDetail["gain"] && "" != itemDetail["gain"]) {
						break;
					}
				}

				isTarget = true;
				break;
			}

			if (isTarget) {
				//データ追加ループ
				for (var hqLoop = 0;hqLoop <= 1;hqLoop++) {
					isHQ = false;

					if (1 == hqLoop) {
						if (null != itemDetail["craft"] && "1" == itemDetail["craft"]) {
							//ループ2回目であり、クラフタ装備であればHQ扱いでデータ追加
							isHQ = true;
						} else {
							//ループ2回目であり、クラフタ装備でなければループ終了
							break;
						}
					}


					//優先ソート判断
					var sortValue = 0;
					var priorSortValue = 0;
					sortValue = getSortValue(filterSortBy, filterJobClass, itemDetail, isHQ, null);

					if (isPriorSort) {
						for (var k in priorBonusKeys) {
							if (getItemDetailValueNum(itemDetail, priorBonusKeys[k], isHQ) > 0) {
								priorSortValue = 1;
								break;
							}
						}
					}

					additional = "";
					if (isHQ) {
						additional += "HQ";
					}
					if ("base_ilv" != filterSortBy && "base_glv" != filterSortBy) {
						additional += " (" + filterSortByName + " " + (sortValue >= 0 ? "+" : "") + Number(sortValue) + ")";
					}
					jqsData.push({
						"sort": sortValue, 
						"priorSort": priorSortValue,
						"text": "Lv" + itemDetail["base_glv"] + "[" + itemDetail["base_ilv"] + "]: " + itemDetail["name"] + additional, 
						"color": itemDetail["item_color"], 
						"data": itemDetail,
						"isHQ": isHQ
					});
				} //データ追加ループここまで

			}
		} // end item loop


		jqsData.sort(function(a, b) {
			var ret = 0;
			//盾の場合の優先ソート(VITあり＞VITなし)
			if (null != classPrior) {
				var va = getItemDetailValueNum(a["data"], classPrior, a["isHQ"]);
				var vb = getItemDetailValueNum(b["data"], classPrior, b["isHQ"]);
				if (va != 0 && vb == 0) {
					return -1;
				} else if (va == 0 && vb != 0) {
					return 1;
				}
			}

			if (isPriorSort) {
				//優先ソート実施
				ret = b["priorSort"] - a["priorSort"];
				if (0 != ret) {
					return ret;
				}
			}

			//通常ソート
			var numA = Number(a["sort"]);
			var numB = Number(b["sort"]);
			if (isNaN(numA)) {
				//文字列比較
				ret = (a["sort"] < b["sort"] ? -1 : a["sort"] > b["sort"] ? 1 : 0);
			} else {
				//数値比較
				ret = (numA < numB ? -1 : numA > numB ? 1 : 0);
			}
			if (0 != ret) {
				//フィルタオーダによって昇順降順を決定
				if ("desc" == filterOrderBy) {
					ret = -ret;
				}
			} else {
				//第2ソートは常にilv
				numA = Number(a["data"]["base_ilv"]);
				numB = Number(b["data"]["base_ilv"]);
				ret = (numA < numB ? -1 : numA > numB ? 1 : 0);
				ret = -ret;
			}

			return ret;
		});
		//データ設定
		jqsData.splice(0, 0, {"text": "-", "data": ""});
		equipJqs.resetData(jqsData);
		equipJqs.setEnabled(true);

		//1個目の要素を選択
		var defaultIndex = 1;//NOTE 0番目は装備なし
		if ("equip_selector_120" == equipId) {
			//指輪1個め：データ保持
			ringInfo = equipJqs.setting.data[defaultIndex];
		} else if ("equip_selector2_120" == equipId) {
			//指輪2個め：1個めの内容をチェック
			if (null != ringInfo && null != ringInfo["data"]) {
				data = ringInfo["data"];
				if (undefined != data && undefined != data["base_attr"]) {
					if (-1 != data["base_attr"].indexOf("RARE") ||
						-1 != data["base_attr"].indexOf("Unique") ||
						-1 != data["base_attr"].indexOf("SELTEN")) {
						defaultIndex++;
					}
				}
			}
		}
		equipJqs.forceSelectItem(defaultIndex);

	
		//マテリア初期化
		//マテリア判定
		var isMateriaEnabled = false;
		var isMateriaFreeMode = false;
		var equip = equipJqs.setting.data[equipJqs.selectedIndex];
		if ("" != equip.data) {
			if (undefined != equip.data["base_materia"] && Number(equip.data["base_materia"]) > 0) {
				isMateriaEnabled = true;
			}
			if (-1 != rpIdList.indexOf(equip.data["id"])) {
				isMateriaEnabled = true;
				isMateriaFreeMode = true;
			}
		}
		materiaJqs.setMateriaModeType(isMateriaFreeMode);
		materiaJqs.resetData(null);
		materiaJqs.setEnabled(isMateriaEnabled);

	} // end roll loop

	//自動マテリア処理
	for (var i = 0;i < loopLimit;i++) {
		//オブジェクト・値用意
		var equipId = equipSelectorList[i];
		var equipJqs = jqsEquipList[equipId];
		var materiaId = materiaSelectorList[i];
		var materiaJqs = jqsMateriaList[materiaId];

		//装備が設定されているか確認
		var equipData = equipJqs.setting.data[equipJqs.selectedIndex];
		if ("" == equipData.data) {
			continue;
		}

		//セット１に登録があればそれを利用。
		var targetMateriaSet = null;
		if (null != materiaSet[equipData.data.id]) {
			for (var j in materiaSet[equipData.data.id]) {
				if (null != materiaSet[equipData.data.id][j]) {
					targetMateriaSet = materiaSet[equipData.data.id][j];
					//整形を行う
					var newSet = [];
					for (var j in targetMateriaSet) {
						if ("" == targetMateriaSet[j]["m"]) {
							continue;
						}
						var tmp = targetMateriaSet[j]["m"].split("-", 2);
						newSet.push({
							"adjust": targetMateriaSet[j]["a"],
							"key": tmp[0],
							"level": tmp[1]
						});
					}
					targetMateriaSet = newSet;
					break;
				}
			}
		}
		//セットがなければ自動設定
		if (null == targetMateriaSet && 99 != config["defaultFilterAutoMateria"]) {
			equipJqs.setting.targetId = equipData.data.id;
			equipJqs.setting.targetData = equipData.data;
			equipJqs.setting.targetHQ = equipData.isHQ;
			targetMateriaSet = equipJqs.setAutoMateria(config["defaultFilterAutoMateria"]);
			if (undefined == targetMateriaSet) {
				targetMateriaSet = null;
			} else {
				//整形を行う
				var newSet = [];
				for (var j in targetMateriaSet.materiaSet.list) {
					var baseSet = targetMateriaSet.materiaSet.list[j];
					var s = {
						"adjust": 0,
						"key": baseSet.mat,
						"level": baseSet.value
					};
					newSet.push(s);
				}

				for (var j in targetMateriaSet.adjustMap) {
					for (var k = newSet.length - 1;k >= 0;k--) {
						var tmp = newSet[k].key.split("-");
						if (tmp[0] == j) {
							newSet[k].adjust = targetMateriaSet.adjustMap[j];
							break;
						}
					}
				}
				targetMateriaSet = newSet;
			}
		}

		//定義が出来たら装備に設定する
		if (null != targetMateriaSet) {
			materiaJqs.forceSelectItem(targetMateriaSet);
		}

	}


	//後処理の呼び出し
	if (null != filterAfterFunc) {
		filterAfterFunc();
		filterAfterFunc = null;
	}

	isForce = false;//パラメタ計算を再開

	//一応再計算いろいろ
	checkPartsDisabled();
	calcParameter();
	calcItemLevelAverage();
	calcSortValueSum();

	//命中調整ボタン押下
	var isEnableAccr = true;
	if (null != classMap[filterJobClass] && null != classMap[filterJobClass]["classes"]) {
		var isGatherCrafter = false;
		for (var i in classMap[filterJobClass]["classes"]) {
			if ("大地使者" == classMap[filterJobClass]["classes"][i] || "能工巧匠" == classMap[filterJobClass]["classes"][i]) {
				isGatherCrafter = true;
			}
		}
		if (isGatherCrafter) {
			isEnableAccr = false;
		}
	}
	if (isEnableAccr) {
		$("#l_accuracy").removeAttr("disabled");
	} else {
		$("#l_accuracy").attr("disabled", "disabled");
	}

	//DPSリンク有効化
	var isEnableDPSLink = true;
	if (null != classMap[filterJobClass] && null != classMap[filterJobClass]["classes"]) {
		for (var i in classMap[filterJobClass]["classes"]) {
			if ("大地使者" == classMap[filterJobClass]["classes"][i] || "能工巧匠" == classMap[filterJobClass]["classes"][i]) {
				isEnableDPSLink = false;
				break;
			}
		}
	}
	if (isEnableDPSLink) {
		$("#link_to_dps").addClass("link_to_dps");
		$("#link_to_dps").removeClass("link_to_dps_disabled");
	} else {
		$("#link_to_dps").addClass("link_to_dps_disabled");
		$("#link_to_dps").removeClass("link_to_dps");
	}

	//マイスターチェック
	//クラフターの場合のみ有効
	var isCrafter = false;
	if (null != classMap[filterJobClass] && null != classMap[filterJobClass]["classes"]) {
		for (var i in classMap[filterJobClass]["classes"]) {
			if ("能工巧匠" == classMap[filterJobClass]["classes"][i]) {
				isCrafter = true;
				break;
			}
		}
	}
	if (isCrafter) {
		//有効
		$("#is_meister").prop("disabled", false);
		$("#l_meister").removeClass("disabled_label");
		//$("#is_meister").prop("checked", false);
	} else {
		//無効
		$("#is_meister").prop("disabled", true);
		$("#l_meister").removeClass("disabled_label");
		$("#l_meister").addClass("disabled_label");
		$("#is_meister").prop("checked", false);
	}


	//ブロック解除
	if (isBlocked) {
		$.unblockUI();
	}

	if (isSMP) {
		smpScrollToEquipmentTop();
	}
} // end method

//基準値計算
function getSortValue(filterSortBy, filterJobClass, itemDetail, isHQ, materiaData) {
	var sortValue = 0;
	if ("_sp0" == filterSortBy) {
		// AADPS
		//NOTE この計算において関係する値にマテリアは適用できないので対応しない
		var interval = getItemDetailValueNum(itemDetail, "main_atk_interval", isHQ);
		var aa = getItemDetailValueNum(itemDetail, "main_phy_aa", isHQ);
		if (0 == interval || 0 == aa) {
			sortValue = 0;
		} else {
			sortValue = aa / interval;

		}

	/*
	} else if ("_sp1" == filterSortBy) {
		//クラス別特化
		spList = getSPList(filterJobClass, null);
		sortValue = 0;
	*/

	} else if ("_sp1" == filterSortBy || filterSortBy.startsWith("_user")) {
		//クラス別特化
		//spList = classMap[filterJobClass]["spList"];
		spList = getSPList(filterJobClass, filterSortBy);
		sortValue = 0;

		for (var spIndex in spList) {
			for (var spKey in spList[spIndex]) {
				sortValue += (getItemDetailValueNum(itemDetail, spKey, isHQ) * spList[spIndex][spKey]);
				//マテリア付与
				if (null != materiaData && null != materiaData[spKey]) {
					sortValue += materiaData[spKey] * spList[spIndex][spKey];
				}
			}
		}


	} else {
		//パラメタ別特化
		sortValue = getItemDetailValueNum(itemDetail, filterSortBy, isHQ);

		//マテリア付与
		if (null != materiaData && null != materiaData[filterSortBy]) {
			sortValue += materiaData[filterSortBy];
		}
	}

	//装備不可部位数による減算
	//1か所装備不可なら1/2, 2か所なら1/3...
	var invalidText = getItemDetailValueBase(itemDetail, "base_invalid_equip", "", false);
	if ("" != invalidText) {
		tmp = invalidText.split(",");
		sortValue = sortValue / (tmp.length + 1);
	}

	//桁数合わせ
	sortValue = new Number(sortValue).toFixed(2);

	if (0 == sortValue) {
		sortValue = "+0";
	}
	return sortValue;
}


//*************************************
//** マテリア選択処理
//*************************************
function updateSelectedMateria(id) {
	//console.log(id);
}

//*************************************
//** 守護神・種族変更
//*************************************
function onChangeGod() {
	onChangeMainParamHelper();
}
function onChangeTribe() {
	onChangeMainParamHelper();
}
function onChangeMainParamHelper() {
	if (isSMP) {
		//スマホ
		//ボーナスパラメタ設定ボタンと連動させる
		if ($("#bonus_param_button").attr("disabled") == "disabled") {
			return;
		}
	} else {
		//PC
		//命中調整と連動させる
		if ($("#l_accuracy").attr("disabled") == "disabled") {
			return;
		}
	}

	//再計算
	calcParameter();
	calcItemLevelAverage();
	calcSortValueSum();
}

//*************************************
//** パラメタ計算
//*************************************
//トレイト計算
function setTraits() {
	//データ初期化
	traitsList = {};

	level = Number($("#general_filter_level_to").val());
	jobClass = $("#general_filter_jobclass").val();
	text = "-";

	if (traitsMap[jobClass] != null) {
		traits = traitsMap[jobClass];
		for (var i in traits) {
			if (level >= Number(traits[i]["level"])) {
				var key = traits[i]["attr"];
				var value = traits[i]["value"];

				if (traitsList[key] != null) {
					traitsList[key] += value;
				} else {
					traitsList[key] = value;
				}
			}
		}

		text = "";
		for (var key in traitsList) {
			if ("" != text) {
				text += ", ";
			}
			text += key.toUpperCase() + "+" + traitsList[key];
		}
	}
	$("#traits_info").text(text);

	return traitsList;
}
//パラメタ計算
function calcParameter() {
	if (isForce) {
		return;
	}

	var ignore_param_names = [
		"id", "name", "item_color", 
		"base_attr", "base_class_ok" , "base_glv", "base_ilv", "base_materia",
		"set_bonus_condition_hq", "set_bonus_condition_nq", "set_bonus_detail_hq", "set_bonus_detail_nq",
		"sanc_condition_hq", "sanc_condition_nq", "sanc_detail_hq", "sanc_detail_nq",
		"old_main_mag_def_nq", "old_main_phy_def_nq", "old_main_mag_def_hq", "old_main_phy_def_hq"
	];
	var rOldMagDef = 0;
	var rOldPhyDef = 0;

	//計算
	var data = {};
	for (var i = 0;i < equipSelectorList.length;i++) {
		//オブジェクト・値用意
		var equipId = equipSelectorList[i];
		var equipJqs = jqsEquipList[equipId];
		var materiaId = materiaSelectorList[i];
		var materiaJqs = jqsMateriaList[materiaId];

		//selectボックスからの値取得
		var equip = equipJqs.setting.data[equipJqs.selectedIndex];
		var isHQ = equip["isHQ"];

		//装備
		if ("" != equip.data) {

			for (j in equip.data) {
				//ID,名前などは計算から除外
				if (-1 != ignore_param_names.indexOf(j)) {
					continue;
				}

				//NOTE HQ対応
				//HQではない値もあるので注意
				if (isHQ && -1 != j.indexOf("_nq")) {
					continue;
				}
				if (!isHQ && -1 != j.indexOf("_hq")) {
					continue;
				}

				/*
				//HQ値は無視
				if (-1 != j.indexOf("_hq")) {
					continue;
				}
				*/

				//値の合算
				//追加するためのkeyは _hq, _nq を消す
				var key = j.replace("_hq", "").replace("_nq", "");
				if (null == data[key]) {
					data[key] = 0;
				}
				data[key] += Number(equip.data[j]);
			}

			//ノウス対応
			if (isNovus(equip.data["id"])) {
				var nid = equip.data["id"];
				for (var j in novusParamKeys) {
					var npKey = novusParamKeys[j];
					var npValue = getNovusParamConfig(nid, npKey);
					if (0 != npValue) {
						if (null == data["bonus_" + npKey]) {
							data["bonus_" + npKey] = Number(npValue);
						} else {
							data["bonus_" + npKey] += Number(npValue);
						}
					}
				}
			}
		}
		//マテリア
		var materias = materiaJqs.selectedMateriaData;
		if ("" != materias) {
			//this.selectedMateriaData = [{"key": "mat_str", "level": 3, "adjust": -2}, {"key": "mat_wind", "level": 1, "adjust": 3} ];
			for (j in materias) {
				materia = materias[j];
				baseMateriaData = materiaJqs.materiaData[materia["key"]];

				var key = baseMateriaData["effect"];
				var value = Number(baseMateriaData["values"][Number(materia["level"])]);
				value += Number(materia["adjust"]);
				//値の合算
				if (null == data[key]) {
					data[key] = 0;
				}
				data[key] += value;
			}

		}
	}

	//食事上限チェックリセット
	mealLimitMap = {};

	//設定
	filterGod = $("#general_filter_god").val();
	filterTribe = $("#general_filter_tribe").val();
	filterJobClass = $("#general_filter_jobclass").val();
	filterLevel = Number($("#general_filter_level_to").val());

	///ATTRIBUTE
	///※HP計算等にこれらの値が必要となるため。
	$("#p_str").text(calcAttribute(data, "str"));
	$("#p_dex").text(calcAttribute(data, "dex"));
	$("#p_vit").text(calcAttribute(data, "vit"));
	$("#p_int").text(calcAttribute(data, "int"));
	$("#p_mnd").text(calcAttribute(data, "mnd"));
	$("#p_pie").text(calcAttribute(data, "pie"));

	///BASE
	//hp
	/* 2.x
	var hpVit = Number($("#p_vit").text());//VIT
	var hpVitAdd = 14.5;//VITによるHP上昇値
	var hpBase = classAdjustMap[filterJobClass]["base_hp"];//HP基礎値
	var hpAdjust = classAdjustMap[filterJobClass]["hp"];//クラス補正
	var hpVitBase = statusAMap[filterLevel];//ステータスパターンA
	var hp = Math.floor(hpBase * hpAdjust) + Math.floor((hpVit - hpVitBase) * hpVitAdd);
	$("#p_hp").text(hp);
	 */

	var hpVit = Number($("#p_vit").text());//VIT
	var hpVitAdd = 20.5;//VITによるHP上昇値
	var hpBase = classAdjustMap[filterJobClass]["base_hp"];//HP基礎値
	var hpAdjust = classAdjustMap[filterJobClass]["hp"];//クラス補正
	var hpVitBase = statusAMap[filterLevel];//ステータスパターンA
	var hp = Math.floor(hpBase * hpAdjust) + Math.floor((hpVit - hpVitBase) * hpVitAdd);
	$("#p_hp").text(hp);

	/*
	console.log("hpVit    : " + hpVit);
	console.log("hpVitAdd : " + hpVitAdd);
	console.log("hpBase   : " + hpBase);
	console.log("hpAdjust : " + hpAdjust);
	console.log("hpVitBase: " + hpVitBase);
	console.log("hp       : " + hp);
	*/

	//mp
	/* 2.x */
	/*
	var mpPie = Number($("#p_pie").text());//pie
	var mpPieBase = statusAMap[filterLevel];//ステータスパターンA
	var mpBase = classAdjustMap[filterJobClass]["base_mp"];//HP基礎値
	var mp = Math.floor( (mpPie + mpPieBase) / (mpPieBase * 2) * mpBase);
	*/

	//MP=FLOOR(基礎値+(PIE-218)*増加係数)			
	//基礎値 base_mp / 増加係数 mp_pie
	var mpPie = Number($("#p_pie").text());//pie
	var mpPieBase = statusAMap[filterLevel];//ステータスパターンA
	var mpBase = classAdjustMap[filterJobClass]["base_mp"];//MP基礎値
	var mpAddPerPie = classAdjustMap[filterJobClass]["mp_pie"];//1PIEであがるMP
	var mp = Math.floor(mpBase + (mpPie - mpPieBase) * mpAddPerPie);

	/*
	console.log("mpPie      : " + mpPie);
	console.log("mpPieBase  : " + mpPieBase);
	console.log("mpBase     : " + mpBase);
	console.log("mpAddPerPie: " + mpAddPerPie);
	console.log("mp         : " + mp);
	*/

	if (-1 != classMap[filterJobClass]["classes"].indexOf(ml_fighter) ||
		-1 != classMap[filterJobClass]["classes"].indexOf(ml_sor) ) {
	} else {
		mp = "-";
	}
	$("#p_mp").text(mp);


	var cp = getItemDetailValueNum(data, "bonus_cp", false);
	if (-1 != classMap[filterJobClass]["classes"].indexOf(ml_crafter)) {
		cp += 180;
		cp = addParameterByMeal("制作力", cp);
	} else {
		cp = "-";
	}
	$("#p_cp").text(cp);

	var gp = getItemDetailValueNum(data, "bonus_gp", false);
	if (-1 != classMap[filterJobClass]["classes"].indexOf(ml_gatherer)) {
		gp += 400;
		gp = addParameterByMeal("采集力", gp);
	} else {
		gp = "-";
	}
	$("#p_gp").text(gp);


	///elemental
	var elemLvBase = statusBMap[filterLevel];
	$("#p_fire").text(godAdjustMap[filterGod]["fire"] + elemLvBase + getItemDetailValueNum(data, "bonus_fire", false));
	$("#p_ice").text(godAdjustMap[filterGod]["ice"] + elemLvBase +getItemDetailValueNum(data, "bonus_ice", false));
	$("#p_wind").text(godAdjustMap[filterGod]["wind"] + elemLvBase +getItemDetailValueNum(data, "bonus_wind", false));
	$("#p_earth").text(godAdjustMap[filterGod]["earth"] + elemLvBase +getItemDetailValueNum(data, "bonus_earth", false));
	$("#p_thunder").text(godAdjustMap[filterGod]["lightning"] + elemLvBase +getItemDetailValueNum(data, "bonus_thunder", false));
	$("#p_water").text(godAdjustMap[filterGod]["water"] + elemLvBase +getItemDetailValueNum(data, "bonus_water", false));

	//準備
	var stA = statusAMap[filterLevel];
	var stB = statusBMap[filterLevel];
	var stC = statusCMap[filterLevel];

	///offence
	$("#p_hit").text(stC + getItemDetailValueNum(data, "bonus_hit", false));
	$("#p_hit").text(addParameterByMeal(ml_acr, $("#p_hit").text()));
	$("#p_critical").text(stC + getItemDetailValueNum(data, "bonus_crit", false));
	$("#p_critical").text(addParameterByMeal(ml_crit, $("#p_critical").text()));
	$("#p_will").text(stA + getItemDetailValueNum(data, "bonus_will", false));
	$("#p_will").text(addParameterByMeal(ml_will, $("#p_will").text()));

	///defence
	$("#p_phy_def").text(getItemDetailValueNum(data, "main_phy_def", false));
	$("#p_dodge").text(stC + getItemDetailValueNum(data, "bonus_dodge", false));
	$("#p_dodge").text(addParameterByMeal(ml_parry, $("#p_dodge").text()));
	$("#p_mag_def").text(getItemDetailValueNum(data, "main_mag_def", false));

	///melee
	var phyAtk = 0;
	if (ml_arc == filterJobClass || ml_brd == filterJobClass || ml_rog == filterJobClass || ml_nin == filterJobClass || ml_mch == filterJobClass) {
		//弓・詩人・双剣士・忍者・機工士は DEX依存
		phyAtk = Number($("#p_dex").text());

	} else if (ml_drk == filterJobClass || ml_pld == filterJobClass || ml_war == filterJobClass || ml_gla == filterJobClass || ml_mrd == filterJobClass) {
		//剣術士・ナイト・斧術士・戦士・暗黒は (VIT+STR)*0.9
		phyAtk = Math.floor((Number($("#p_vit").text()) + Number($("#p_str").text()) ) * 0.45);

	} else {
		phyAtk = Number($("#p_str").text());
	}
	$("#p_phy_atk").text(phyAtk);
	$("#p_skill_speed").text(stC + getItemDetailValueNum(data, "bonus_skill_speed", false));
	$("#p_skill_speed").text(addParameterByMeal(ml_skill_speed, $("#p_skill_speed").text()));

	///melee regist
	$("#p_reg_slash").text(100 + getItemDetailValueNum(data, "bonus_tolerant_cut", false));
	$("#p_reg_slash").text(addParameterByMeal(ml_zan, $("#p_reg_slash").text()));
	$("#p_reg_pierce").text(100 + getItemDetailValueNum(data, "bonus_tolerant_pierce", false));
	$("#p_reg_pierce").text(addParameterByMeal(ml_totsu, $("#p_reg_pierce").text()));
	$("#p_reg_blunt").text(100 + getItemDetailValueNum(data, "bonus_tolerant_beat", false));
	$("#p_reg_blunt").text(addParameterByMeal(ml_da, $("#p_reg_blunt").text()));

	///spell
	$("#p_mag_atk").text(Number($("#p_int").text()));
	$("#p_mag_heal").text(Number($("#p_mnd").text()));
	$("#p_spell_speed").text(stC + getItemDetailValueNum(data, "bonus_spell_speed", false));
	$("#p_spell_speed").text(addParameterByMeal(ml_spell_speed, $("#p_spell_speed").text()));

	//moral
	$("#p_pvp_moral").text(getItemDetailValueNum(data, "bonus_moral", false));

	///gathering
	$("#p_gather_gain").text(getItemDetailValueNum(data, "bonus_gain", false));
	$("#p_gather_gain").text(addParameterByMeal(ml_gain, $("#p_gather_gain").text()));
	$("#p_gather_quality").text(getItemDetailValueNum(data, "bonus_quality", false));
	$("#p_gather_quality").text(addParameterByMeal(ml_quality, $("#p_gather_quality").text()));

	///craftering
	$("#p_craft_work").text(getItemDetailValueNum(data, "bonus_work", false));
	$("#p_craft_work").text(addParameterByMeal(ml_work, $("#p_craft_work").text()));
	$("#p_craft_process").text(getItemDetailValueNum(data, "bonus_edit", false));
	$("#p_craft_process").text(addParameterByMeal(ml_edit, $("#p_craft_process").text()));
	//マイスター反映
	if ($("#is_meister").prop("checked")) {
		$("#p_craft_work").text(Number($("#p_craft_work").text()) + 20);
		$("#p_craft_process").text(Number($("#p_craft_process").text()) + 20);
	}

	//ブロック・受け流し計算（全て小数切り捨て）
	var blockRate = 0;		//ブロック発動率＝発動力*0.09+DEX*0.05
	var blockReduce = 0;	//ブロック軽減率＝STR/66+ブロック性能/11.4
	var parryRate = 0;		//受け流し発動力＝5+(発動力-341)*0.09+DEX*0.025 ※３４１はレベル上限の計算から出すこと　stC　がその値
	var parryReduce = 0;	//受け流し軽減率＝STR/40
	if (null != data["main_block_perf"] && null != data["main_block_chance"]) {
		var blockChance = Number(data["main_block_chance"]);
		var blockPerf = Number(data["main_block_perf"]);
		var str = Number($("#p_str").text());
		var dex = Number($("#p_dex").text());
		blockRate = blockChance * 0.09 + dex * 0.05;
		blockReduce = 8 + (str - 20) / 67 + blockPerf / 11.4;
	}
	var dodge = data["bonus_dodge"];
	if (null == dodge) {
		dodge = 0;
	}
	var str = Number($("#p_str").text());
	var dex = Number($("#p_dex").text());
	parryRate = 5 + (dodge) * 0.09 + dex * 0.025;//ここの dodget は装備合計なので -341 は要らない（そもそも足していない状態）
	parryReduce = 18 + (dodge - 87) / 40;

	$("#p_block_rate").text(Math.floor(blockRate) + "%");
	$("#p_block_reduce").text(Math.floor(blockReduce) + "%");

	$("#p_parry_rate").text(Math.floor(parryRate) + "%");
	$("#p_parry_reduce").text(Math.floor(parryReduce) + "%");

	//主要パラメタにコピー
	$("#p_hit2").html($("#p_hit").html());
	$("#p_critical2").html($("#p_critical").html());
	$("#p_will2").html($("#p_will").html());
	$("#p_skill_speed2").html($("#p_skill_speed").html());
	$("#p_spell_speed2").html($("#p_spell_speed").html());
	$("#p_dodge2").html($("#p_dodge").html());
	$("#p_gather_gain2").html($("#p_gather_gain").html());
	$("#p_gather_quality2").html($("#p_gather_quality").html());
	$("#p_craft_work2").html($("#p_craft_work").html());
	$("#p_craft_process2").html($("#p_craft_process").html());


	//食事上限反映
	updateMealLimit();
}

//attribute(str等)計算
function calcAttribute(data, key) {

	//基本データ
	//レベル
	var level = Number($("#general_filter_level_to").val());
	//種族
	var tribe = $("#general_filter_tribe").val();
	//クラス
	var jobClass = $("#general_filter_jobclass").val();

	//計算用データ
	//ステータスパターンA
	var statusA = statusAMap[level];

	//クラス補正
	var classAdjust = classAdjustMap[jobClass][key];

	//種族補正
	var tribeAdjust = tribeAdjustMap[tribe][key];

	//装備補正
	var equipAdjust = getItemDetailValueNum(data, "bonus_" + key, false)

	//計算
	//　~~(ステータスパターンA * クラス補正) + 種族補正 + アビリティ補正 + 装備補正
	var ret = (statusA * classAdjust) + tribeAdjust + equipAdjust;

	//フィジカルボーナス
	if (pbList[key] != null) {
		var tmp = Number(pbList[key]);
		if (tmp > 0) {
			ret += tmp;
		}
	}

	//traits
	if (traitsList[key] != null) {
		var tmp = Number(traitsList[key]);
		if (tmp > 0) {
			ret += tmp;
		}
	}

	//切り捨て
	ret = Math.floor(ret);

	//食事
	/*
	var tmp = addParameterByMeal(key.toUpperCase());
	if (tmp > 0) {
		ret += tmp;
	}*/
	// vit => VIT
	var mealParam = key.toUpperCase();
	if ("jp" != lang) {
		mealParam = translateMultiLanguage(mealParam, "jp", lang);
	}
	ret = addParameterByMeal(mealParam, ret);


	//PTボーナス乗せ
	var isPTBonus = $("#pt_bonus").prop("checked");
	if (isPTBonus) {
		ret = ret * 1.03;
	}

	//切り捨て
	ret = Math.floor(ret);

	return ret;
}
function addParameterByMeal(key, baseValue) {
	var ret = Number(baseValue);
	if (null != selectedMeal && undefined != selectedMeal["params"][key]) {
		mealLimitMap[key] = { "limit": false, "add": 0 };

//console.log("-------------------------");
//console.log("check meal: " + selectedMeal["name"] + ", param=" + key + ", base=" + baseValue);
		var addLimit = selectedMeal["params"][key]["add_limit"];
		var addValue = selectedMeal["params"][key]["add_value"];
//console.log("limit: " + addLimit);
//console.log("value: " + addValue);
		var paramAdd = 0;

		//追加分の確認
		if (addValue != "") {
			addValue = addValue.replace("+", "");
			if (-1 != addValue.indexOf("%")) {
				addValue = addValue.replace("%", "");
				paramAdd = Math.floor(baseValue * addValue / 100);
//console.log("addValue:percent: " + paramAdd);
			} else {
				paramAdd = Number(addValue);
//console.log("addValue:simple : " + paramAdd);
			}
		}

		//上限確認
		if (addLimit != "") {
			addLimit = Number(addLimit);
			if (paramAdd > addLimit) {
//console.log("limitOver: " + addValue + " > " + addLimit);
				paramAdd = addLimit;
				mealLimitMap[key]["limit"] = true;
			}
		}
		mealLimitMap[key]["add"] = paramAdd;
		ret += paramAdd;
//console.log("result: " + ret + " (" + (ret - Number(baseValue)) + ")");
	}
	return ret;
}
	
//*************************************
//** セレクトボックス動作
//*************************************
function initSelectBox() {
	$(".control_select_mark").each(function() {

		var select = $("select", $(this).parent());
		if (null != select) {
			$(select).on("mouseover", {"obj": $(this), "type": 1}, onSelectMousePerform);
			$(select).on("mouseout" , {"obj": $(this), "type": 0}, onSelectMousePerform);
			$(select).on("mouseup"  , {"obj": $(this), "type": 1}, onSelectMousePerform);
			$(select).on("mousedown", {"obj": $(this), "type": 2}, onSelectMousePerform);
		}
	});
}
function onSelectMousePerform(e) {
	var viewType = e.data["type"];
	var obj = e.data["obj"];
	if (null == viewType || null == obj) {
		return;
	}

	if (2 == viewType) {
		$(obj).css("background", "-prefix-linear-gradient(top, #999, #777)");
		$(obj).css("background", "linear-gradient(to bottom, #999, #777)");

	} else if (1 == viewType) {
		$(obj).css("background", "-prefix-linear-gradient(top, #777, #555)");
		$(obj).css("background", "linear-gradient(to bottom, #777, #555)");

	} else {
		$(obj).css("background", "-prefix-linear-gradient(top, #555, #333)");
		$(obj).css("background", "linear-gradient(to bottom, #555, #333)");
	}
}

//*************************************
//** 食事選択
//*************************************
function initMeal() {
	//ソート条件の初期化
	var buf = "";
	var selectedText = " selected";
	for (var i in mealSortIndexList) {
		buf += sprintf("<optgroup label='{0}' class='optgroup_general'>", [i]);
		for (var j in mealSortIndexList[i]) {
			buf += sprintf("<option value=\"{0}\"{1}>{0}</option>", [
				j, 
				selectedText,
			]);
			selectedText = "";
		}
		buf += "</optgroup>";
	}

	$("#sort_meal").append(buf);

	listupMeals();
}
function initMealOnFirstFilter() {
	$("#sort_meal").removeAttr("disabled");
	$("#sort_meal").css("color", (isSMP ? "#000000" : "#ffffff"));

	$("#list_meal").removeAttr("disabled");
	$("#list_meal").css("color", (isSMP ? "#000000" : "#ffffff"));
}

function listupMeals() {

	//優先パラメタを確認
	var priorParamKey = $("#sort_meal").val();
	var priorParamText = "";

	for (var i in mealSortIndexList) {
		for (var j in mealSortIndexList[i]) {
			if (j == priorParamKey) {
				priorParamText = mealSortIndexList[i][j];
				break;
			}
		}
	}
	var priorParamInfo = {};
	var tmp = priorParamText.split(",");
	for (var i in tmp) {
		var tmpPrior = tmp[i].split(":");
		priorParamInfo[tmpPrior[0]] = tmpPrior[1];
	}
	
	//console.log(priorParamInfo);

	//対象データをリストアップ
	var targetList = [];
	for (var i in mealsList) {
		var meal = mealsList[i];
		var isExistPrior = false;

		for (var priorParamName in priorParamInfo) {
			if (undefined != meal["params"][priorParamName]) {
				isExistPrior = true;
				break;
			}
		}

		if (isExistPrior) {
			targetList.push(meal);
		}
	}

	//対象パラメタにてソート
	targetList.sort(function(a, b) {
		var ret = 0;

		//第１ソート：優先パラメタのソート値にてソート
		var numA = 0;
		var numB = 0;
		for (var priorParamName in priorParamInfo) {
			if (undefined != a["params"][priorParamName]) {
				numA += Number(a["params"][priorParamName]["sort_value"]) * priorParamInfo[priorParamName];
			}
			if (undefined != b["params"][priorParamName]) {
				numB += Number(b["params"][priorParamName]["sort_value"]) * priorParamInfo[priorParamName];
			}
		}
		ret = -1 * (numA < numB ? -1 : numA > numB ? 1 : 0);

		if (0 == ret) {
			//第２ソート：優先でないパラメタも含めたソート値の合計にてソート
			var numA = Number(a["params"]["sort_sum"]);
			var numB = Number(b["params"]["sort_sum"]);
			ret = -1 * (numA < numB ? -1 : numA > numB ? 1 : 0);
		}
		if (0 == ret) {
			//第３ソート：名前順
			ret = (a["name"] < b["name"] ? -1 : a["name"] > b["name"] ? 1 : 0);
		}

		return ret;
	});

	//HTML作成
	var buf = "";
	var selectedText = " selected";
	var count = 0;
	buf += "<option value='' selected>" + ml_meal_noselect + "</option>";
	for (var i in targetList) {
		var meal = targetList[i];
		var summary = "";

		for (var priorParamName in priorParamInfo) {
			if (undefined != meal["params"][priorParamName]) {
				var priorParamNameAbbr = priorParamName;
				for (var j in sortMap[ml_bonus]) {
					if (sortMap[ml_bonus][j]["name"] == priorParamName) {
						priorParamNameAbbr = sortMap[ml_bonus][j]["abbr"];
						break;
					}
				}
				if ("" != summary) {
					summary += "/";
				}
				var valueText = meal["params"][priorParamName]["add_limit"];
				if ("" == valueText) {
					valueText = meal["params"][priorParamName]["add_value"];
				}
				valueText = valueText.replace("+", "");
				valueText = valueText.replace("%", "");
				summary += priorParamNameAbbr + valueText;
			}
		}
		buf += sprintf("<option value='{0}_{1}'>{2} ({3})</option>", [
			meal["id"],
			(1 == meal["is_hq"] ? "1" : "0"),
			meal["name"],
			summary
		]);
		count++;
		/*
		if (count >= 50) {
			break;
		}
		*/
	}
	$("#list_meal").html(buf);

	updateMeal();

}
function updateMeal() {
	$("#meal_detail").html("");

	var meal = null;
	var tmpMealId = $("#list_meal").val();
	if (null != tmpMealId && "" != tmpMealId) {
		var tmp = tmpMealId.split("_");
		var mealId = tmp[0];
		var mealIsHQ = tmp[1];
		for (var i in mealsList) {
			if (mealsList[i]["id"] == mealId) {
				if (("1" == mealIsHQ && "1" == mealsList[i]["is_hq"]) ||
				    ("0" == mealIsHQ && "1" != mealsList[i]["is_hq"])) {
					meal = mealsList[i];
					break;
				}
			}
		}
	}
	selectedMeal = meal;

	//画像
	if (null == selectedMeal) {
		$("#image_meal").attr("class", "itemimage_disabled");
	} else {
		var url = createImageUrl(selectedMeal["image"]);
		$("#image_meal").attr("src", url);
		$("#image_meal").attr("class", "itemimage");
	}


	//詳細テキスト
	var text = "";
	if (null != selectedMeal) {
		for (var i in selectedMeal["params"]) {
			if ("" != text) {
				text += "<br>";
			}
			text += i;
			text += selectedMeal["params"][i]["add_value"];
			if ("" != selectedMeal["params"][i]["add_limit"]) {
				text += " (" + ml_meal_limit + selectedMeal["params"][i]["add_limit"] + ")";
			}
		}
	}
	$("#meal_detail").html(text);

	//リンク
	if (null == selectedMeal) {
		$("#meal_link_public").css("display", "none");
		$("#meal_link_recipe").css("display", "none");
	} else {
		$("#meal_link_public").attr("href", sprintf(publicDetailPageURL, [selectedMeal["id"]]));
		$("#meal_link_public").css("display", "inline");

		if ("1" == selectedMeal["recipe"]) {
			var rawText = selectedMeal["name"];
			rawText = rawText.replace("HQ", "");
			var encodedText = encodeURI(rawText);
			$("#meal_link_recipe").attr("href", sprintf(rsURL, [encodedText]));
			$("#meal_link_recipe").css("display", "inline");
		} else {
			$("#meal_link_recipe").css("display", "none");
		}
	}

	if (isForce) {
		return;
	}

	if (!isFirstFilter) {
		calcParameter();
		calcItemLevelAverage();
		calcSortValueSum();
	}
}
function updateMealLimit() {

	if (null != selectedMeal) {
		//詳細テキスト
		var text = "";
		if (null != selectedMeal) {
			for (var i in selectedMeal["params"]) {
				if ("" != text) {
					text += "<br>";
				}
				text += i;
				text += selectedMeal["params"][i]["add_value"];
				if ("" != selectedMeal["params"][i]["add_limit"]) {
					text += " (" + ml_meal_limit + selectedMeal["params"][i]["add_limit"] + ")";
				}

				//適用値／最適値
				var addColor = "#9090ff";
				var addText = "";
				var fitText = "";

				if (undefined != mealLimitMap[i]) {
					addColor = mealLimitMap[i]["limit"] ? "#ff9090" : "#9090ff";
					addText = mealLimitMap[i]["add"];
				}
				if ("" != selectedMeal["params"][i]["add_value"] && -1 != selectedMeal["params"][i]["add_value"].indexOf("%")) {
					var tmpLimitValue = Number(selectedMeal["params"][i]["add_limit"]);
					var tmpText = selectedMeal["params"][i]["add_value"].replace("+", "").replace("%", "");
					var tmpAddPercent = Number(tmpText);
					if (tmpLimitValue > 0 && tmpAddPercent > 0) {
						var fitValue = Math.ceil(tmpLimitValue / (tmpAddPercent / 100));
						fitText = fitValue;
					}
				}
				if ("" != addText || "" != fitText) {
					var innerText = "";
					if ("" != addText) {
						innerText = ml_meal_apply +" : +" + addText;
					}
					if ("" != fitText) {
						if ("" != innerText) {
							innerText += "／";
						}
						innerText += ml_meal_best + " : " + fitText + "↑";
					}
					text += sprintf("<br>&nbsp;&nbsp;&nbsp;&nbsp;<font color='{0}'>⇒{1}</font>", [
						addColor, innerText
					]);
				}

/*
					text += sprintf("<br>&nbsp;&nbsp;&nbsp;&nbsp;<font color='{0}'>⇒適用：+{1}</font>", [

				//最適値
				if (undefined != mealLimitMap[i]) {
					text += sprintf("<br>&nbsp;&nbsp;&nbsp;&nbsp;<font color='{0}'>⇒適用：+{1}</font>", [
						
						
					]);
				}
*/
			}
		}
		$("#meal_detail").html(text);

	}
}


//*************************************
//** PTボーナス
//*************************************
function initPTBonus() {
}

function initPTBonusOnFirstFilter() {
	$("#pt_bonus").removeAttr("disabled");
	$("#pt_bonus").css("color", "#ffffff");

	$("#label_pt_bonus").css("color", "#ffffff");

}
function updatePTBonus() {
	if (isForce) {
		return;
	}

	if (!isFirstFilter) {
		calcParameter();
		calcItemLevelAverage();
		calcSortValueSum();
	}
}

//*************************************
//** パネル表示管理
//*************************************
function initTogglePanel() {
	var panelBtnList = $(".panel_toggle_base");

	for (var i = 0;i < panelBtnList.length;i++) {
		var panel = panelBtnList[i];

		//ID抽出
		var id = $(panel).prop("id");
		if (-1 == id.indexOf("panel_toggle_")) {
			continue;
		}
		var panelName = id.substr(13);

		var configKeyName = "isShow" + panelName.substr(0, 1).toUpperCase() + panelName.substr(1);
		var isShow = (null != config[configKeyName] && true == config[configKeyName]);

		//マーク設定
		var markText = (isShow ? "▲" : "▼");
		$(panel).text(markText);

		//パネル設定
		var panelMainId = "panel_main_" + panelName;
		$("#" + panelMainId).css("display", isShow ? "table-row" : "none");

		//マウス操作設定
		$(panel).on("mouseover", {"obj": $(panel), "type": 1}, onTogglePanelBtnMousePerform);
		$(panel).on("mouseout" , {"obj": $(panel), "type": 0}, onTogglePanelBtnMousePerform);
		$(panel).on("mouseup"  , {"obj": $(panel), "type": 1}, onTogglePanelBtnMousePerform);
		$(panel).on("mousedown", {"obj": $(panel), "type": 2}, onTogglePanelBtnMousePerform);
		$(panel).on("click",     {"obj": $(panel)           }, onTogglePanelBtnToggle);
	}
}
function onTogglePanelBtnToggle(e) {
	var panel = e.data["obj"];
	if (null == panel) {
		return;
	}

	//ID抽出
	var id = panel.prop("id");
	if (-1 == id.indexOf("panel_toggle_")) {
		return;
	}
	var panelName = id.substr(13);

	var configKeyName = "isShow" + panelName.substr(0, 1).toUpperCase() + panelName.substr(1);
	var isShow = (null != config[configKeyName] && true == config[configKeyName]);

	//定義判定
	isShow = !isShow;

	//マーク設定
	var markText = (isShow ? "▲" : "▼");
	$(panel).text(markText);

	//パネル設定
	var panelMainId = "panel_main_" + panelName;
	$("#" + panelMainId).css("display", isShow ? "table-row" : "none");

	//データ保存
	config[configKeyName] = isShow;
	saveConfig();

}
function onTogglePanelBtnMousePerform(e) {
	var viewType = e.data["type"];
	var obj = e.data["obj"];
	if (null == viewType || null == obj) {
		return;
	}

	if (2 == viewType) {
		$(obj).removeClass("panel_toggle_hover");
		$(obj).removeClass("panel_toggle_press");
		$(obj).addClass("panel_toggle_press");

	} else if (1 == viewType) {
		$(obj).removeClass("panel_toggle_hover");
		$(obj).removeClass("panel_toggle_press");
		$(obj).addClass("panel_toggle_hover");

	} else {
		$(obj).removeClass("panel_toggle_hover");
		$(obj).removeClass("panel_toggle_press");
	}
}

// お気に入り表示切替
function toggleFavoriteType() {
	var bufferedLocal = $("#favorite_contents_local").html();
	var bufferedWorld = $("#favorite_contents_world").html();
	var currentContent = $("#panel_main_favorite").html();

	if ("" == bufferedLocal) {
		//local->world
		$("#panel_main_favorite").html(bufferedWorld);
		$("#ft_header_text").text("WORLD FAVORITE");
		$("#favorite_contents_local").html(currentContent);
		$("#favorite_contents_world").html("");
		$("#ft_toggle_text").text(ml_favorite_personal);

	} else {
		//world->local
		$("#panel_main_favorite").html(bufferedLocal);
		$("#ft_header_text").text("FAVORITE");
		$("#favorite_contents_local").html("");
		$("#favorite_contents_world").html(currentContent);
		$("#ft_toggle_text").text(ml_favorite_world);

	}

}

//*************************************
//** クラス別特化係数設定
//*************************************
function debugMethod1() {
	//showCoefficientForm();
}

//編集後SPList返却
function getSPList(jobClass, orderBy) {
	var ret = [];

	//データがないならとりあえずロード
	if (null == userCoefData) {
		loadCoefData();
	}

	if (null != orderBy && null != userCoefData[orderBy]) {
		//ソートオーダーによる決定
		//TODO ユーザが設定していない場合におかしくならないか？
		ret = userCoefData[orderBy];

	} else {
		//ジョブクラスによる決定（ソートオーダーは常に _sp1)
		if (null != userCoefData && null != userCoefData[jobClass]) {
			//ユーザデータ
			ret = userCoefData[jobClass];
		} else if (null != classMap[jobClass]) {
			//通常動作
			ret = classMap[jobClass]["spList"];
		}
	}
	return ret;
}


//初期化
function initCoefForm() {
	//データロード
	loadCoefData();

	//クラス選択初期化
	initClassOption("cform_jobclass");

	//数値入力箇所へのイベント設定
	$("#coef_form input[type='text']").each(function() {
		$(this).on("click blur keydown keyup keypress change", function(){onUpdateCoefValue(this);});
	});

}

//フォーム表示
function showCoefficientForm() {
	//一時データの用意
	tmpCoefJobClass = "";
	tmpUserCoefData = {};
	$.extend(tmpUserCoefData, userCoefData);

	//ジョブクラスの強制選択
	isForce = true;
	var jobClass = $("#general_filter_jobclass").val();
	$("#cform_jobclass").val(jobClass);
	updateCoefTargetJobClass();
	isForce = false;

	tmpCoefJobClass = jobClass;

	//表示
	$.unblockUI();
	$.blockUI({message: $("#coef_form"), css: {top: "10%", width: '420px'}});
}

//係数値変更
function onUpdateCoefValue(obj) {
	if (isSMP) {
		return;
	}
	var val = $(obj).val();
	var isValid = false;

	if (jQuery.isNumeric(val)) {
		var valNum = Number(val);

		//0は有効値ではあるが、表示上はグレーアウトする
		//if (valNum >= 0 && valNum <= 100) {
		if (valNum > 0 && valNum <= 100) {
			isValid = true;
		}
	}
	$(obj).removeClass("control_general_grayout");
	if (!isValid) {
		$(obj).addClass("control_general_grayout");
	}
}


//選択中ジョブクラス変更
function onChangeCoefJobClass() {
	if (isForce) {
		return;
	}
	updateCoefTargetJobClass();

	var jobClass = $("#cform_jobclass").val();
	tmpCoefJobClass = jobClass;
}

//係数データの変更
function updateCoefTargetJobClass() {

	//この時点でJobClassは既に変更されている可能性がある
	//そのため、直前に変更した時の値を利用して、仮登録を行う。
	applyTmpCoefData();

	//選択中のジョブクラスに応じて画面表示を変更
	//一旦全部 0 にする
	$("#coef_form input[type='text']").each(function() {
		$(this).val("0");
		onUpdateCoefValue(this);
	});

	//採用するデータを決定
	var spList = {};
	var jobClass = $("#cform_jobclass").val();

	if (null != tmpUserCoefData[jobClass]) {
		//ユーザデータが存在するならばそれを採用
		spList = tmpUserCoefData[jobClass];

	} else if (null != classMap[jobClass]) {
		//デフォルトデータが存在するならば、それを採用
		spList = classMap[jobClass]["spList"];

	} else {
		//いずれも存在しないのであれば空データを採用
		//未設定のときのユーザ設定係数がこれに該当する
	}

	//画面表示
	for (var i in spList) {
		for (var key in spList[i]) {
			var value = spList[i][key];
			var formKey = "#cform_" + key;
			$(formKey).val(value);
			onUpdateCoefValue(formKey);
		}
	}

}
//仮データへの反映
function applyTmpCoefData() {
	if (""  == tmpCoefJobClass) {
		return;
	}

	var spList = [];
	var spListTest = {}; // 値テスト用
	var condition = "#coef_form input[type='text']";
	if (isSMP) {
		condition = "#coef_form input[type='number']";
	}
	$(condition).each(function() {
		var id = $(this).attr("id");
		var val = $(this).val();
		var valNum = Number(val);
		var isValid = false;
		if (jQuery.isNumeric(val)) {

			//0は有効値ではあるが、データ登録は不要であるため、無効扱いとする
			//if (valNum >= 0 && valNum <= 100) {
			if (valNum > 0 && valNum <= 100) {
				isValid = true;
			}
		}

		if (isValid && id.startsWith("cform_")) {
			var spId = id.substr(6);
			var data = {};
			data[spId] = valNum;
			spList.push(data);
			spListTest[spId] = valNum;
		}
	});

	//生成したspListがデフォルト値と同じであれば、ユーザデータ自体を削除する
	var isDelete = false;
	if (null != classMap[tmpCoefJobClass]) {
		//同じであるかをテストする
		var defaultSPList = classMap[tmpCoefJobClass]["spList"];
		var count = 0;
		var hit = 0;
		for (var i in defaultSPList) {
			for (var key in defaultSPList[i]) {
				var value = defaultSPList[i][key];
				count++;
				if (null != spListTest[key] && spListTest[key] == value) {
					hit++;
				}
			}
		}
		//デフォルト値と同じ値を新しいリストが全てもっていて、かつデフォルト値の数と新しいリストの数が一致する場合に、リスト一致として扱う
		if (count == hit && hit == spList.length) {
			isDelete = true;
		}
	}

	//最終処理
	if (isDelete) {
		//削除
		if (null != tmpUserCoefData[tmpCoefJobClass]) {
			delete tmpUserCoefData[tmpCoefJobClass];
		}
	} else {
		//保存
		tmpUserCoefData[tmpCoefJobClass] = spList;
	}
}

//デフォルトへの戻し
function onResetCoef() {
	if (""  == tmpCoefJobClass) {
		return;
	}
	//選択中のジョブクラスに応じて画面表示を変更
	//一旦全部 0 にする
	$("#coef_form input[type='text']").each(function() {
		$(this).val("0");
		onUpdateCoefValue(this);
	});

	//デフォルト値を取得
	//ユーザ設定値はここで取得できない。直前の 0 設定処理がデフォルト設定に該当
	if (null != classMap[tmpCoefJobClass]) {
		var spList = classMap[tmpCoefJobClass]["spList"];

		for (var i in spList) {
			for (var key in spList[i]) {
				var value = spList[i][key];
				var formKey = "#cform_" + key;
				$(formKey).val(value);
				onUpdateCoefValue(formKey);
			}
		}
	}
}

//OK
function onOKCoefForm() {
	//値適用は、基本的にはクラス変更時のみ。
	//画面表示からクラスを変更しないと適用する機会がないため、OK押下時に入力されているデータも適用処理を行う必要がある。
	applyTmpCoefData();

	//保存
	//読み込み時と逆にtmpから反映する
	userCoefData = {};
	$.extend(userCoefData, tmpUserCoefData);

	saveCoefData();

	//クローズ
	$.unblockUI();
}

//キャンセル
function onCancelCoefForm() {
	$.unblockUI();
}

//ロード
function loadCoefData() {
	userCoefData = {};

	// userCoefData = { "圣骑士": {"bonus_vit": 3, ...}
	var ucStr = window.localStorage.getItem("esUserCoefData");
	if (null == ucStr || "" == ucStr) {
		userCoefData = {};
	} else {
		userCoefData = JSON.parse(ucStr);
	}
}

//セーブ
function saveCoefData() {
	window.localStorage.setItem("esUserCoefData", JSON.stringify(userCoefData));
}


//*************************************
//** 命中調整
//*************************************

//命中調整テスト
function debugMethod0() {

	//テスト用フィルタ
	$("#general_filter_god").val("比尔格");
	$("#general_filter_tribe").val("猫魅族：逐日之民");
	$("#general_filter_jobclass").val("吟游诗人");
	$("#general_filter_level_from").val("1");
	$("#general_filter_level_to").val("60");
	$("#general_filter_ilv_from").val("0");
	$("#general_filter_ilv_to").val("0");
	$("#general_filter_sort").val("_sp1");
	doFilterMain(false);
	//showCalcAccuracyForm();

	//調整条件
	//var adjustAccuracy = 492 - 27;
	//var adjustSpec = "_sp1";
	//adjustSpec = "bonus_crit";
	//console.log(new Date());
	//calcEquipsByAccuracy(adjustAccuracy, adjustSpec);
	//console.log(new Date());
}

//命中維持装備：フォーム初期化
function initAccuracyForm() {

	$("#aform_accuracy_value").jqNud({maxValue: 999, minValue: 400, defaultValue: 500});

	var html = sprintf(
		"<option value=\"0\" selected>{0}</option>" +
		"<option value=\"1\">{1}</option>", [
		ml_equip_target_filter,
		ml_equip_target_checked
	]);
	$("#aform_target_equips").html(html);

	html = sprintf(
		"<option value=\"0\">{0}</option>" +
		"<option value=\"1\" selected>{1}</option>", [
		ml_equip_target_rings_default,
		ml_equip_target_rings_force_exrare
	]);
	$("#aform_target_equips_rings").html(html);



	initSortFilter("aform_sort_value");
}

//命中維持装備：フォーム表示
function showCalcAccuracyForm() {

	//初期値設定
	$("#aform_accuracy_value").val(500);
	$("#aform_sort_value").val($("#general_filter_sort").val());

	for (var i = 0;i < equipSelectorList.length;i++) {

		//装備ボックス取得
		var equipId = equipSelectorList[i];
		var equipJqs = jqsEquipList[equipId];
		var equipIndex = equipJqs.selectedIndex;
		var equip = equipJqs.setting.data[equipJqs.selectedIndex];

		var equipPointName = equipPointNameList[i];
		if ("jp" != lang) {
			equipPointName = translateMultiLanguage(equipPointName, "jp", lang);
		}

		var aformId = "aform_" + equipId;
		var aformTextId = aformId + "_value";

		//チェック無効化（全て）
		$("#" + aformId).prop("checked", false);
		var invalidText = getItemDetailValueBase(equip["data"], "base_invalid_equip", "", false);
		if ("" == equip["data"]) {
			//データ未選択であれば無効化
			$("#" + aformId).attr("disabled", "disabled");
			$("#" + aformTextId).text(equipPointName + " : " + ml_general_noselect);
		} else if ("" != invalidText) {
			//複数個所占有につき固定不可
			$("#" + aformId).attr("disabled", "disabled");
			$("#" + aformTextId).html(equipPointName + " : " + equip["data"]["name"] + ml_cannot_select_multihardpoints);

		} else {
			//データ選択済であれば固定処理有効化
			$("#" + aformId).removeAttr("disabled");
			$("#" + aformTextId).html(
				equipPointName + " : " +
				"<span class=\"pu_itemname_small_" + equip["data"]["item_color"] + "\">" + 
				 equip["data"]["name"] + (equip["isHQ"] ? "HQ" : "") + 
				"</span>"
			);
		}
	}

	//表示
	$.unblockUI();
	$.blockUI({message: $("#accuracy_form"), css: {top: "15%", width: '420px'}});

}

//命中維持装備：処理OK
function onOKAccuracyForm() {
	//準備
	$("#aprogress_note").text(ml_acr_progress_wait);
	var adjustAccuracy = $("#aform_accuracy_value").val();
	var adjustSpec = $("#aform_sort_value").val();
	acrCalcCount = 0;

	//開始
	$.unblockUI({
		onUnblock: function() {
			$.blockUI({
				message: $("#accuracy_progress"), 
				css: {width: '500px'},
				onBlock: function() {
					calcEquipsByAccuracy(adjustAccuracy, adjustSpec);
				}
			});
		}
	});
}

//命中維持装備：処理キャンセル
function onCancelAccuracyForm() {
	$.unblockUI();
}


//命中維持装備：計算処理
function calcEquipsByAccuracy(adjustAccuracy, adjustSpec) {
	//候補リストアップ
	acrCandidateList = listupCandidateEquips(adjustSpec);

	//候補数チェックチェック
	acrProgressEquipCount = 0;
	for (var i in acrCandidateList) {
		var subCount = 0;
		if (null != acrCandidateList[i]["acr"]) {
			subCount += acrCandidateList[i]["acr"].length;
		}
		if (null != acrCandidateList[i]["noAcr"]) {
			subCount += acrCandidateList[i]["noAcr"].length;
		}
		acrProgressEquipCount += subCount;
	}

console.log("装備候補---------------------");
console.log(acrCandidateList);

	//組み合わせ検証
	//再帰処理で組み合わせを用意するので、グローバル変数にある程度の情報を保持
	acrBase = calcEquipAccrBase;//装備なしの命中。
	acrTarget = adjustAccuracy;//目標命中。
	acrWorkList = {};//作業用リスト
	acrResultList = {};//結果リスト

	recursiveCombineCandidateEquip(0);

	//組み合わせ結果からもっともスコアが高いものを抽出
	var score = -1;
	var acr = -1;
	var result = null;
	for (var i in acrResultList) {
		if (null == result || acrResultList[i]["score"] > score) {
			result = acrResultList[i]["data"];
			score = acrResultList[i]["score"];
			acr = i;
		}
	}
	if (null == result) {
		//絞られすぎて命中を確保できないケース
		$.unblockUI();
		alert(ml_acr_failure);
		return;
	}

	var resultObj = JSON.parse(result);

console.log("装備組み合わせ-----------------");
console.log(acr);
console.log(score);
console.log(acrResultList);
console.log(resultObj);

//console.log("個別処理----------------------");
	//選択してみる
	for (var equipId in resultObj) {
		var equip = resultObj[equipId]["data"];
		var materias = resultObj[equipId]["materia"];
		var equipJqs = jqsEquipList[equipId];
		equipJqs.forceSelectItemById(equip["data"]["id"], equip["isHQ"]);

		//マテリア装着
		//マテリアが装備できるものが選ばれている場合は、セット1で計算されているので、それを適用する
		var materiaId = equipId.replace("equip_", "materia_");
		var materiaJqs = jqsMateriaList[materiaId];

		if (null != materias && 0 != materias.length) {
			materiaJqs.forceSelectItem(materias);
		}
	}

	//ブロック解除
	$.unblockUI();

}

//命中維持装備調整：組み合わせ
function recursiveCombineCandidateEquip(equipIndex) {
	//初期化など
	var equipId = equipSelectorList[equipIndex];
	var equip = null;
	var isAllEquip = (equipIndex == equipSelectorList.length - 1);

	//装備可能かを確認する
	if (!isEquipEnabled(equipId)) {
		//装備不可能である場合は、この場所は装備せず、次の装備箇所に行く
		if (isAllEquip) {
			//全て装備したのであれば、現在の選択値でテスト
			checkCombinedEquip();
		} else {
			//まだであれば、他の装備をする
			recursiveCombineCandidateEquip(equipIndex + 1);
		}

		return;
	}

	//ここまでの命中合計値を計算
	var currAcr = getCombinedAccuracy();

	if (currAcr < acrTarget || 0 == acrCandidateList[equipId]["noAcr"].length) {
		//命中を下回っているのであれば、今回のindexでは命中装備を入れてよい
		//ただし、命中なし装備が0件の場合は、命中ありを入れようとしてみる（固定装備対応）
		for (var i in acrCandidateList[equipId]["acr"]) {
			equip = acrCandidateList[equipId]["acr"][i];

			//配列に装備を追加
			acrWorkList[equipId] = equip;

			//配列に装備不可IDを設定
			setInvalidEquipSelector(equip.data);

			if (isAllEquip) {
				//全て装備したのであれば、現在の選択値でテスト

				checkCombinedEquip();
			} else {
				//まだであれば、他の装備をする
				recursiveCombineCandidateEquip(equipIndex + 1);
			}

			//配列から装備を削除
			delete acrWorkList[equipId];

			//装備不可IDを削除
			unsetInvalidEquipSelector(equip.data);
		}
	}

	//現在の命中に関わらず、命中なしの装備も入れてみる
	for (var i in acrCandidateList[equipId]["noAcr"]) {
		equip = acrCandidateList[equipId]["noAcr"][i];
		acrWorkList[equipId] = equip;
		setInvalidEquipSelector(equip.data);

		if (isAllEquip) {
			//全て装備したのであれば、現在の選択値でテスト
			checkCombinedEquip();
		} else {
			//まだであれば、他の装備をする
			recursiveCombineCandidateEquip(equipIndex + 1);
		}
		delete acrWorkList[equipId];
		unsetInvalidEquipSelector(equip.data);
	}

	//ここの装備がないのであれば、装備設定なしで次に行く
	if (0 == acrCandidateList[equipId]["acr"].length && 0 == acrCandidateList[equipId]["noAcr"].length) {
		if (isAllEquip) {
			//全て装備したのであれば、現在の選択値でテスト
			checkCombinedEquip();
		} else {
			//まだであれば、他の装備をする
			recursiveCombineCandidateEquip(equipIndex + 1);
		}
	}
}


//命中維持装備調整：装備可能かどうかを確認する
function isEquipEnabled(equipId) {
	var ret = true;
	for (var i in acrInvalidEquipSelector) {
		if (equipId == acrInvalidEquipSelector[i]) {
			ret = false;
			break;
		}
	}
	return ret;
}

//命中維持装備調整：装備不可Selector設定
function setInvalidEquipSelector(equip) {
	var selectorList = listupInvalidEquipSelector(equip);
	if (0 == selectorList.length) {
		return;
	}
	for (var i in selectorList) {
		acrInvalidEquipSelector.push(selectorList[i]);
	}
}
//命中維持装備調整：装備不可Selector設定解除
function unsetInvalidEquipSelector(equip) {
	var selectorList = listupInvalidEquipSelector(equip);
	if (0 == selectorList.length) {
		return;
	}
	for (var i in selectorList) {
		acrInvalidEquipSelector.pop();
	}
}
//命中維持装備調整：セレクタ一覧取得
function listupInvalidEquipSelector(equip) {
	var ret = [];

	var invalidText = getItemDetailValueBase(equip["data"], "base_invalid_equip", "", false);
	if (-1 != invalidEquipSubArmList.indexOf(equip["data"]["roll"])) {
		if ("" != invalidText) {
			invalidText += ",";
		}
		invalidText += ml_subarm;
	}

	var invalidParts = invalidText.split(",");
	for (var i in invalidParts) {
		invalidPart = invalidParts[i];
		if (null != partsAbbrMap[invalidPart]) {
			ret.push(partsAbbrMap[invalidPart]);
		}
	}

	return ret;
}

//命中維持装備調整：装備チェック
function checkCombinedEquip() {

	acrCalcCount++;
	if (acrCalcCount % 1000 == 0) {
		console.log("check equip combined: " + acrCalcCount);
	}

	//指輪エクレア処理
	if (null != acrWorkList["equip_selector_120"] && null != acrWorkList["equip_selector2_120"]) {
		var equipData0 = acrWorkList["equip_selector_120"]["data"]["data"];
		var equipData1 = acrWorkList["equip_selector2_120"]["data"]["data"];

		if (equipData0["id"] == equipData1["id"]) {
			//エクレア判定
			if (null != equipData0["base_attr"]) {
				if (-1 != equipData0["base_attr"].indexOf("RARE") ||
					-1 != equipData0["base_attr"].indexOf("Unique") ||
					-1 != equipData0["base_attr"].indexOf("SELTEN")) {
					return;
				}
			}

			//強制エクレア化
			var forceExrare = $("#aform_target_equips_rings").val();
			if (1 == forceExrare) {
				return;
			}
		}
	}

	var acr = getCombinedAccuracy();
	if (acr < acrTarget) {
		return;
	}

	var score = getCombinedScore();
	if (null == acrResultList[acr] || score > acrResultList[acr]["score"]) {
		//acrResultList[acr] = {"score": score, "data": acrWorkList};
		acrResultList[acr] = {"score": score, "data": JSON.stringify(acrWorkList)};
	}
}

//命中維持装備調整：命中値算出
function getCombinedAccuracy() {
	var ret = acrBase;
	for (var i in acrWorkList) {
		if (null != acrWorkList[i] && null != acrWorkList[i]["acr"]) {
			ret += acrWorkList[i]["acr"];
		}
	}
	return ret;
}
//命中維持装備調整：スコア値算出
function getCombinedScore() {
	var ret = 0;//acrBase;
	for (var i in acrWorkList) {
		if (null != acrWorkList[i] && null != acrWorkList[i]["score"]) {
			ret += acrWorkList[i]["score"];
		}
	}
	return ret;
}

//命中維持装備調整：候補リストアップ
function listupCandidateEquips(targetSpec) {

	var candidateList = {};

	//フィルタ条件
	var filterJobClass = $("#general_filter_jobclass").val();
	var filterAdjustJob = $("#general_filter_adjust_job").prop("checked");

	//タンク判定
	var isTank = false;
	for (var i in classTypeDetailMap) {
		if (-1 != classTypeDetailMap[i].indexOf(jobClass)) {
			if ("CLASS_TYPE_TANK" == i) {
				isTank = true;
			}
			break;
		}
	}


	//選択条件
	var targetEquipType = $("#aform_target_equips").val();

	//優先ソートの必要性を確認
	var isPriorSort = false;
	var priorBonus = "";
	if ( (
		"bonus_hit" == targetSpec ||
		"bonus_will" == targetSpec ||
		"bonus_crit" == targetSpec ||
		"bonus_dodge" == targetSpec ||
		"bonus_skill_speed" == targetSpec ||
		"bonus_spell_speed" == targetSpec)) {
		isPriorSort = true;

		//ここは固定で良い
		var tmpSpList = classMap[filterJobClass]["spList"];
		for (var i in tmpSpList) {
			var tmpSpMap = tmpSpList[i];
			var tmpKey = "";
			for (var j in tmpSpMap) {
				tmpKey = j;
			}

			if (
				"bonus_str" == tmpKey ||
				"bonus_dex" == tmpKey ||
				"bonus_vit" == tmpKey ||
				"bonus_int" == tmpKey ||
				"bonus_mnd" == tmpKey ||
				"bonus_pie" == tmpKey) {
				priorBonus = tmpKey;
				break;
			}
		}
		if ("" == priorBonus) {
			isPriorSort = false;
		}
	}

	//候補となるアイテム選択
	//表示中の各ボックスからチェックする
	for (var i = 0;i < equipSelectorList.length;i++) {
		//装備ボックス取得
		var equipId = equipSelectorList[i];
		var equipJqs = jqsEquipList[equipId];
		var materiaId = materiaSelectorList[i];
		var materiaJqs = jqsMateriaList[materiaId];

		//候補リスト初期化
		var noAcrList = [];
		var acrList = [];
		var tmpNoAcrList = [];
		var tmpAcrList = {};
		var tmpAcrListKeys = [];
		var minAcr = -1;
		var minScore = -1;

		//固定装備確認
		var fixedEquipIndex = -1;
		//aform_equip_selector_10
		if ($("#aform_" + equipId).prop("checked")) {
			fixedEquipIndex = equipJqs.selectedIndex;
			console.log("fixed: " + equipId + ": " + fixedEquipIndex);
		}
		
		//２種類の観点で装備をリストアップする
		/*
			a. 命中なし
				優先パラメタが最も高い装備を１点のみ採用
			b. 命中あり
				既に上げた候補より、命中または優先パラメタのいずれかが勝るもののみ採用
				両方とも低いものは選ぶ必要がない
		*/


		//全装備ループ
		for (var j = 0;j < equipJqs.setting.data.length;j++) {
			//固定対応：ループは1回のみで終了（1回目で指定されたものを処理するため）
			if (-1 != fixedEquipIndex && 0 != j) {
				break;
			}
			var equip = equipJqs.setting.data[j];

			//固定対応：指定された装備を選択する
			if (-1 != fixedEquipIndex) {
				equip = equipJqs.setting.data[fixedEquipIndex];
			} else {
				//固定ではなく、チェック済装備のみの条件で未チェックのモノが選択されたら無視する
				var ceId = equip["data"]["id"] + "_" + (equip.isHQ ? "1" : "0");
				if (1 == targetEquipType && null == config["checkedEquipList"][ceId]) {
					continue;
				}
			}

			// 未選択は無視
			if ("" == equip.data) {
				continue;
			}

			//複数装備占有は無視
			var invalidText = getItemDetailValueBase(equip["data"], "base_invalid_equip", "", false);
			if ("" != invalidText) {
				continue;
			}

			var isHQ = equip["isHQ"];
			var suffix = isHQ ? "_hq" : "_nq";

			//マテリアデータ用意
			var materiaData = {};
			var materiaRawData = [];
			if (-1 != fixedEquipIndex) {
				//固定である
				if (materiaJqs.setting.isEnabled) {
					var materias = materiaJqs.selectedMateriaData;
					if ("" != materias) {
						for (k in materias) {
							materia = materias[k];
							baseMateriaData = materiaJqs.materiaData[materia["key"]];
							var key = baseMateriaData["effect"];
							var value = Number(baseMateriaData["values"][Number(materia["level"])]);
							value += Number(materia["adjust"]);
							//値の合算
							isExistMateria = true;
							if (null == materiaData[key]) {
								materiaData[key] = 0;
							}
							materiaData[key] += value;

							//rawData
							//materiaData.push({"key": setKey, "level": setValue, "adjust": setAdjust});
							materiaRawData.push(materia);
						}
					}
					console.log("use materia");
					console.log(materiaData);
				}

			} else {
				//固定ではない
				if (null != materiaSet && null != materiaSet[equip.data["id"]] && null != materiaSet[equip.data["id"]][0]) {
					/*
					console.log("==========================================");
					console.log(equip);
					console.log(materiaSet[equip.data["id"]][0]);
					console.log(materiaJqs.materiaData);
					*/
					var setData = materiaSet[equip.data["id"]][0];
					for (var k = 0;k < setData.length;k++) {

						if (null == setData[k] || "" == setData[k]["m"] || "" == setData[k]["a"]) {
							continue;
						}
						var setKey = (setData[k]["m"].split("-"))[0];
						var setValue = Number((setData[k]["m"].split("-"))[1]);
						var setAdjust = Number(setData[k]["a"]);

						var jqsMateriaData = materiaJqs.materiaData[setKey];
						/*
						console.log("m=" + setData[k]["m"]);
						console.log("a=" + setData[k]["a"]);
						console.log("key=" + setKey);
						console.log("value=" + setValue);
						console.log("adjust=" + setAdjust);
						console.log(materiaJqs.materiaData);
						console.log(jqsMateriaData);
						*/
						if (null != jqsMateriaData) {
							var effect = jqsMateriaData["effect"];
							var value = jqsMateriaData["values"][setValue];
							value += setAdjust;
							if (null == materiaData[effect]) {
								materiaData[effect] = value;
							} else {
								materiaData[effect] += value;
							}
						}

						//rawData
						//materiaData.push({"key": setKey, "level": setValue, "adjust": setAdjust});
						materiaRawData.push({
							"key": setKey,
							"level": (setData[k]["m"].split("-"))[1],
							"adjust": setData[k]["a"]
						});
					}
				}
			}
	

			//比較処理
			var score = Number(getSortValue(targetSpec, filterJobClass, equip.data, isHQ, materiaData));
			var acrValue = getItemDetailValueNum(equip.data, "bonus_hit", isHQ);
			if (null != materiaData && null != materiaData["bonus_hit"]) {
				acrValue += materiaData["bonus_hit"];
			}

			//優先ソートによるスコア値更新
			if (isPriorSort) {
				//あるものの優先度を一気に上げる
				score += (getItemDetailValueNum(equip.data, priorBonus, isHQ) > 0 ? 10000 : 0);
			}

			//職がタンク系である場合、VITが 0 の装備は除外する
			if (isTank) {
				if (null == equip.data["bonus_vit_nq"] || "" == equip.data["bonus_vit_nq"]) {
					score = 0;
				}
			}

			if (0 != acrValue) {
				//命中あり
				//命中ごとにグルーピングする
				//とりあえず全部突っ込む
				if (null == tmpAcrList[acrValue]) {
					tmpAcrList[acrValue] = [];
					tmpAcrListKeys.push(acrValue);
				}
				tmpAcrList[acrValue].push({"data": equip, "materia": materiaRawData, "isHQ": isHQ, "score": score, "acr": acrValue});

			} else {
				//命中なし
				tmpNoAcrList.push({"data": equip, "materia": materiaRawData, "isHQ": isHQ, "score": score, "acr": 0});
				/*
				if (0 == noAcrList.length) {
					noAcrList.push({"data": equip, "isHQ": isHQ, "score": score, "acr": 0});
				} else if (score > noAcrList[0]["score"]) {
					noAcrList[0] = {"data": equip, "isHQ": isHQ, "score": score, "acr": 0};
				}
				*/
			}
		}

		//命中あり候補リストの補正
		/*
			命中ごとにグルーピング

			acr11/score 9	○

			acr10/score10	○
			acr10/score 9	×

			acr 9/score11	○
			acr 9/score10	×
			acr 9/score 9	×

			acr 8/score10	×　上位グループのスコア最大値を上回ってなければ不採用
		*/
		//命中あり補正
		//命中キーを命中の高い順にループ
		tmpAcrListKeys.sort(function(a, b) { return b - a});
		var upperGroupMaxScore = -1;
		for (var j = 0;j < tmpAcrListKeys.length;j++) {
			var acrKey = tmpAcrListKeys[j];

			//命中グループの中で、スコア値にてソート
			tmpAcrList[acrKey].sort(function(a, b) { return b["score"] - a["score"];});

			//ある命中において、もっともスコア値が高いもののみ採用
			//ただし前の命中グループ（つまり命中が上の装備）のもっともスコアが高いものより、スコアが上でなければならない
			var targetEquip = tmpAcrList[acrKey][0];
			if (targetEquip["score"] > upperGroupMaxScore) {
				//採用
				acrList.push(targetEquip);
				upperGroupMaxScore = targetEquip["score"];
			}
		}

		//命中なし補正
		if (0 != tmpNoAcrList.length) {
			tmpNoAcrList.sort(function(a, b) { return b["score"] - a["score"];});
			noAcrList.push(tmpNoAcrList[0]);
		}

		//指輪の場合だけ、3つ確保する（EX RARE で選択できない可能性）
		if ("equip_selector_120" == equipId || "equip_selector2_120" == equipId) {
			if (tmpNoAcrList.length >= 2) {
				noAcrList.push(tmpNoAcrList[1]);
			}
			if (tmpNoAcrList.length >= 3) {
				noAcrList.push(tmpNoAcrList[2]);
			}
		}

		//候補リストに設定
		candidateList[equipId] = {
			"noAcr": noAcrList, 
			"acr"  : acrList
		};
	}

	return candidateList;
}

//*************************************
//** DPSリンク
//*************************************
//URLのみ更新
function updateURLLinkToDPS() {
	var url = createDPSURL();
	if ("" == url) {
		url = "javascript:void(0)";
	}
	$("#link_to_dps").attr("href", url);
}
function createDPSURL() {
	var jobIndexMap = {
		"圣骑士"   : {"job": 1, "adu": 0, "stance": 2, "mag": 0, "aaoff": 0, "p_main": "p_str"},
		"战士"     : {"job": 2, "adu": 0, "stance": 3, "mag": 0, "aaoff": 0, "p_main": "p_str"},
		"龙骑士"   : {"job": 4, "adu": 0, "stance": 2, "mag": 0, "aaoff": 0, "p_main": "p_str"},
		"武僧"   : {"job": 3, "adu": 0, "stance": 3, "mag": 0, "aaoff": 0, "p_main": "p_str"},
		"吟游诗人" : {"job": 4, "adu": 4, "stance": 2, "mag": 0, "aaoff": 1, "p_main": "p_dex"},
		"忍者"     : {"job": 3, "adu": 0, "stance": 4, "mag": 0, "aaoff": 0, "p_main": "p_dex"},
		"黑魔法师" : {"job": 7, "adu": 2, "stance": 2, "mag": 1, "aaoff": 2, "p_main": "p_int"},
		"召唤师"   : {"job": 7, "adu": 2, "stance": 2, "mag": 1, "aaoff": 0, "p_main": "p_int"},
		"白魔法师" : {"job": 6, "adu": 3, "stance": 2, "mag": 1, "aaoff": 2, "p_main": "p_mnd"}, // クルセ前提
		"学者"     : {"job": 6, "adu": 3, "stance": 2, "mag": 1, "aaoff": 2, "p_main": "p_mnd"}, // クルセ前提
		"剑术师"   : {"job": 0, "adu": 0, "stance": 2, "mag": 0, "aaoff": 0, "p_main": "p_str"},
		"斧術士"   : {"job": 1, "adu": 0, "stance": 2, "mag": 0, "aaoff": 0, "p_main": "p_str"},
		"枪术师"   : {"job": 2, "adu": 0, "stance": 2, "mag": 0, "aaoff": 0, "p_main": "p_str"},
		"格斗家"   : {"job": 1, "adu": 0, "stance": 2, "mag": 0, "aaoff": 0, "p_main": "p_str"},
		"弓箭手"   : {"job": 2, "adu": 1, "stance": 2, "mag": 0, "aaoff": 1, "p_main": "p_dex"},
		"双剑士"   : {"job": 1, "adu": 0, "stance": 2, "mag": 0, "aaoff": 0, "p_main": "p_dex"},
		"咒术师"   : {"job": 6, "adu": 2, "stance": 2, "mag": 1, "aaoff": 2, "p_main": "p_int"},
		"秘术师"   : {"job": 6, "adu": 2, "stance": 2, "mag": 1, "aaoff": 0, "p_main": "p_int"},
		"幻术师"   : {"job": 5, "adu": 3, "stance": 2, "mag": 1, "aaoff": 2, "p_main": "p_mnd"}, // クルセ前提
		"暗黑骑士" : {"job": 2, "adu": 0, "stance": 2, "mag": 0, "aaoff": 0, "p_main": "p_str"},
		"机工士"   : {"job": 4, "adu": 4, "stance": 2, "mag": 0, "aaoff": 1, "p_main": "p_dex"},
		"占星术士" : {"job": 6, "adu": 3, "stance": 2, "mag": 1, "aaoff": 2, "p_main": "p_mnd"}, // クルセ前提
	};
	//多言語対応
	if ("jp" != lang) {
		var newMap = {};
		for (var job in jobIndexMap) {
			var index = jobIndexMap[job];
			var newJob = translate(job);
			newMap[newJob] = index;
		}
		jobIndexMap = newMap;
	}

	//職及びそこから決まるデータ
	var filterJobClass = $("#general_filter_jobclass").val();

	if (null == jobIndexMap[filterJobClass]) {
		return "";
	}
	var jobVal = jobIndexMap[filterJobClass];

	//主道具
	var jqs = jqsEquipList["equip_selector_10"];
	var equip = jqs.setting.data[jqs.selectedIndex];
	if ("" == equip.data) {
		return "";
	}
	var wd = 0;//物理or魔法基本
	var aa = 0;//物理AA
	var interval = 0;//攻撃間隔
	if (equip["isHQ"]) {
		wd = (null != equip.data["main_phy_base_hq"] ? equip.data["main_phy_base_hq"] : equip.data["main_mag_base_hq"]);
		aa = (null != equip.data["main_phy_aa_hq"] ? equip.data["main_phy_aa_hq"] : equip.data["main_phy_aa_nq"]);
		interval = (null != equip.data["main_atk_interval_hq"] ? equip.data["main_atk_interval_hq"] : equip.data["main_atk_interval_nq"]);
	} else {
		wd = (null != equip.data["main_phy_base_nq"] ? equip.data["main_phy_base_nq"] : equip.data["main_mag_base_nq"]);
		aa = (null != equip.data["main_phy_aa_nq"] ? equip.data["main_phy_aa_nq"] : equip.data["main_phy_aa_hq"]);
		interval = (null != equip.data["main_atk_interval_nq"] ? equip.data["main_atk_interval_nq"] : equip.data["main_atk_interval_hq"]);
	}

	//パラメタまとめ
	//職／アクションアップ／スタンス／魔法職限定AA：魔法職選択／AA有無
	var paramMap = {};
	for (var key in jobVal) {
		if ("p_main" != key) {
			paramMap[key] = jobVal[key];
		}
	}
	//魔法職限定AA：物理AA
	paramMap["maa"] = aa;
	//魔法職限定AA：STR
	paramMap["mst"] = $("#p_str").text();
	//物魔基本性能
	paramMap["wd"] = wd;
	//攻撃間隔
	paramMap["aa"] = interval;
	//攻撃力
	paramMap["st"] = $("#" + jobVal["p_main"]).text();
	//意思
	paramMap["dtr"] = $("#p_will").text();
	//クリ
	paramMap["ctr"] = $("#p_critical").text();
	//スキスピorスペスピ
	paramMap["spd"] = (jobVal["mag"] == 0 ? $("#p_skill_speed").text() : $("#p_spell_speed").text());

	///パラメタ作成
	var param = "";
	for (var key in paramMap) {
		if ("" != param) {
			param += "&";
		}
		param += key + "=" + paramMap[key];
	}

	var url = "http://www.eonet.ne.jp/~versatile/ku-so/ff14dps.html?" + param;

	return url;
}


//*************************************
//** 表示パラメタ切り替え
//*************************************
function initShowParamType() {
	updateShowParamType(config["showParamType"]);
}
function onClickShowParamType(type) {
	updateShowParamType(type);
}
function updateShowParamType(type) {
	if (0 == type) {
		//主要
		$("#paramtype_main").addClass("paramtype_disabled");
		$("#paramtype_all").removeClass("paramtype_disabled");
		$("#paramtable_main").css("display", "block");
		$("#paramtable_all").css("display", "none");

	} else {
		//全
		$("#paramtype_main").removeClass("paramtype_disabled");
		$("#paramtype_all").addClass("paramtype_disabled");
		$("#paramtable_main").css("display", "none");
		$("#paramtable_all").css("display", "block");
	}

	config["showParamType"] = type;
	saveConfig();

}
//*************************************
//** 初期表示
//*************************************

//コントローラ
function initViews() {
	//スマホ初期化
	smpInit();

	loadConfig();
	loadUserNovusData();
	initClassOptions();
	initSortFilters();
	initILVFilters();
	initAutoMateriaFilters();
	initEquipSelectors();
	initMateriaSelectors();
	initEquipImageEvents();
	initFavorite();
	initGodList();
	initTribeList();
	initPBList();
	initAccuracy();
	initMeal();
	initPTBonus();
	initTogglePanel();
	initAccuracyForm();
	initCoefForm();
	initSelectBox();
	initShowParamType();
	initFilterConditions();
	initFW();

	//ロドスト読み込み初期化
	$("#url_lodestone").bind("click blur keydown keyup keypress change", onURLLodestoneChange);

	//コントロール初期化
	//+initFilterConditions処理
	//$("#general_filter_level_from").val(config["defaultFilterLevelFrom"]);
	//$("#general_filter_level_to").val(config["defaultFilterLevelTo"]);
	if (isSMP) {
		smpInitFilterLevel("general_filter_level_from", config["defaultFilterLevelFrom"]);
		smpInitFilterLevel("general_filter_level_to", config["defaultFilterLevelTo"]);
	} else {
		$("#general_filter_level_from").jqNud({maxValue: 60, minValue: 1, defaultValue: config["defaultFilterLevelFrom"]});
		$("#general_filter_level_to").jqNud({maxValue: 60, minValue: 1, defaultValue: config["defaultFilterLevelTo"]});
	}

	//マイスター
	$("#is_meister").on("change", function(e) {
		calcParameter();
		calcItemLevelAverage();
		calcSortValueSum();
	});

	//設定復旧
	$("#list_equip_select").prop("checked", config["isShowEquipList"]);

	//クエリストリングからのデータロード
	showDataFromQueryString();

	//スタイル補正
	adjustStyle();

	//ホバーカラー表示
	//アイテム選択後に、選択した部位とは別の場所がフォーカスされてしまう。わかりにくくなるので機能取り下げ。
	//initHoverColor();

//debug
//debugMethod3();
//$(".wf_link").trigger("click");
}

//ホバーカラー表示
function initHoverColor() {
	//NOTE クラス名の equip_table にあてる。IDの方ではないので注意
	$(".equip_table tr").on("mouseout mouseover", onMouseActionEquipItem);

}
//ホバー処理
var equipHoverItem = null;
function onMouseActionEquipItem(e) {

	var currentHoverItem = null;
	$(":hover").each(function() {
		if ("TR" == $(this).get(0).nodeName.toUpperCase()) {
			if ($(this).parent().parent().hasClass("equip_table")) {
				currentHoverItem = $(this);
			}
		}
	});

	if (null == currentHoverItem) {
		//選択なし
		if (null == equipHoverItem) {
			//既存と同じ場合は何もしない
		} else {
			//既存選択がある場合は、クラスを外す
			equipHoverItem.removeClass("hoverItem");
		}
	} else {
		//選択あり
		if (currentHoverItem == equipHoverItem) {
			//既存と同じ場合は何もしない
		} else {
			//既存と異なる選択の場合、既存からクラスを外して、新たに付与する
			if (null != equipHoverItem) {
				equipHoverItem.removeClass("hoverItem");
			}
			currentHoverItem.addClass("hoverItem");
		}
	}
	equipHoverItem = currentHoverItem;
}



//スタイル調整
function adjustStyle() {

	if ("ff" == browserType || "ie" == browserType) {
		$(".control_select_mark").css("display", "none");
	}

	//位置再設定によるスタイル再適用
	setTimeout("adjustSelectBox()", 1);
}

function adjustSelectBox() {
	$(".control_select_mark").each(function() {
		$(this).css("right", "2px");
	});
	setTimeout("adjustSelectBox2()", 1);
}
function adjustSelectBox2() {
	$(".control_select_mark").each(function() {
		$(this).css("right", "1px");
	});
}

//フィルタ条件初期化（など）
function initFilterConditions() {
	$("#general_filter_god").val(config["defaultFilterGod"]);
	$("#general_filter_tribe").val(config["defaultFilterTribe"]);
	$("#general_filter_jobclass").val(config["defaultFilterJobClass"]);
	$("#general_filter_ilv_from").val(config["defaultFilterILVFrom"]);
	$("#general_filter_ilv_to").val(config["defaultFilterILVTo"]);
	$("#general_filter_sort").val(config["defaultFilterSort"]);
	$("#general_filter_ignore_pvp").prop("checked", config["defaultFilterCheckPVPIgnore"]);
	$("#general_filter_ignore_iddrop").prop("checked", config["defaultFilterCheckIDDropIgnore"]);
	$("#general_filter_craft_ilv").prop("checked", config["defaultFilterCheckCrafterILV"]);
	$("#general_filter_materia").val(config["defaultFilterAutoMateria"]);

	//以下はコントロール初期化時に設定する
	//$("#general_filter_level_from").val(config["defaultFilterLevelFrom"]);
	//$("#general_filter_level_to").val(config["defaultFilterLevelTo"]);

}
function saveFilterConditions() {
	config["defaultFilterGod"] = $("#general_filter_god").val();
	config["defaultFilterTribe"] = $("#general_filter_tribe").val();
	config["defaultFilterJobClass"] = $("#general_filter_jobclass").val();
	config["defaultFilterLevelFrom"] = $("#general_filter_level_from").val();
	config["defaultFilterLevelTo"] = $("#general_filter_level_to").val();
	config["defaultFilterILVFrom"] = $("#general_filter_ilv_from").val();
	config["defaultFilterILVTo"] = $("#general_filter_ilv_to").val();
	config["defaultFilterSort"] = $("#general_filter_sort").val();

	config["defaultFilterCheckPVPIgnore"]    = $("#general_filter_ignore_pvp").prop("checked");
	config["defaultFilterCheckIDDropIgnore"] = $("#general_filter_ignore_iddrop").prop("checked");
	config["defaultFilterCheckCrafterILV"]   = $("#general_filter_craft_ilv").prop("checked");
	config["defaultFilterAutoMateria"]       = $("#general_filter_materia").val();

	saveConfig();
}


//フィジカルボーナス初期化
function initPBList() {
	//合計値：データ表示ともに初期化済
	//各要素：データ表示ともに初期化済

	//disabled
	for (key in pbList) {
		//+
		$("#pb_" + key + "_plus").addClass("pb_button_disabled");
		//-
		$("#pb_" + key + "_minus").addClass("pb_button_disabled");
		//値
		$("#pb_" + key + "_value").addClass("pb_textinput_disabled");
		$("#pb_" + key + "_value").attr("disabled", "disabled");
	}

	//ボーナス
	$("#pb_sum").addClass("pb_sumvalue_disabled");
	$("#bonus_param_button").attr("disabled", "disabled");
}

//初回フィルタ時のフィジカルボーナス初期化
function initPBOnFirstFilter() {

	var typeList = ["plus", "minus"];

	for (key in pbList) {
		//enabled化

		//+
		$("#pb_" + key + "_plus").removeClass("pb_button_disabled");
		//-
		$("#pb_" + key + "_minus").removeClass("pb_button_disabled");
		//値
		$("#pb_" + key + "_value").removeClass("pb_textinput_disabled");
		$("#pb_" + key + "_value").removeAttr("disabled");

		//ハンドル追加
		//+, -
		for (typeIndex in typeList) {
			type = typeList[typeIndex];
			$("#pb_" + key + "_" + type).bind("mouseover", {"key": key, "calc": type}, onPBMouseOver);
			$("#pb_" + key + "_" + type).bind("mouseout", {"key": key, "calc": type}, onPBMouseOut);
			$("#pb_" + key + "_" + type).bind("mousedown", {"key": key, "calc": type}, onPBMouseDown);
			$("#pb_" + key + "_" + type).bind("mouseup", {"key": key, "calc": type}, onPBMouseUp);
		}

		//値
		$("#pb_" + key + "_value").bind("click blur keydown keyup keypress change", onPBValueChange);

	}

	//ボーナス
	$("#pb_sum").removeClass("pb_sumvalue_disabled");
	$("#bonus_param_button").removeAttr("disabled");

}
//フィジカルボーナス操作
function onPBMouseOver(e) {
	//e.data.key などに変数あり
	$(this).addClass("pb_button_over");
	$(this).removeClass("pb_button_press");
}
function onPBMouseOut(e) {
	//e.data.key などに変数あり
	$(this).removeClass("pb_button_over");
	$(this).removeClass("pb_button_press");
}
function onPBMouseDown(e) {
	//e.data.key などに変数あり
	$(this).removeClass("pb_button_over");
	$(this).addClass("pb_button_press");
}
function onPBMouseUp(e) {
	//e.data.key などに変数あり
	$(this).addClass("pb_button_over");
	$(this).removeClass("pb_button_press");

	//計算処理
	var key = e.data.key;
	var value = ("plus" == e.data.calc ? 1 : -1);
	var baseValue = pbList[key];

	//合計値計算
	sumPB = 0;
	for (var workKey in pbList) {
		sumPB += Number(pbList[workKey]);
	}

	//個々の要素の制限値
	if (baseValue + value < 0 || baseValue + value > maxPB) {
		return;
	}
	
	//合計値から計算
	if (sumPB + value < 0 || sumPB + value > maxPB) {
		return;
	}

	//問題なさそうなので加減算
	//表示更新
	$("#pb_" + key + "_value").val(pbList[key] + value).trigger("change", [true]);

}
function onPBValueChange() {
	if (isForce) {
		return;
	}

	var id = $(this).attr("id");
	var tmp = id.split("_");
	if (3 != tmp.length) {
		return;
	}
	var key = tmp[1];

	var rawText = $(this).val();
	var text = rawText;
	var value = 0;
	var isRewrite = false;
	var isValid = false;

	//値の正当性を確認
	while (true) {
		//空の場合は、0扱いで計算。
		if ("" == text) {
			value = 0;
			text = "0";
			isRewrite = true;
			isValid = true;
			break;
		}

		//全角数値を半角数値に変換する。
		var halfText = castNumber(text);
		if (text != halfText) {
			isRewrite = true;
			text = halfText;
		}

		//数値変換できるか？
		if (!jQuery.isNumeric(text)) {
			//できない場合、どの程度できないか？
			// "a" => 不明なので無視。
			// "3a0" => "30"にする
			// "30a" => "30"にする
			var tmpText = deleteWithoutNumber(text);
			if ("" == text) {
				//無効値として終了
				break;
			}

			//念のため数値チェック
			if (!jQuery.isNumeric(tmpText)) {
				//無効値として終了
				break;
			}

			//数値化した値を用意し、処理続行
			isRewrite = true;
			text = tmpText;
		}


		//数値にしてみる
		//小数以下は無視する
		var tmpValue = Math.ceil(Number(text));
		if (Number(text) != tmpValue || String(tmpValue) != text) {
			isRewrite = true;
			text = String(tmpValue);
		}

		//範囲確認
		//最大範囲を超えないか
		if (tmpValue > maxPB) {
			isRewrite = true;
			tmpValue = maxPB;
			text = String(maxPB);
		}

		//合計値を超えないか
		if (sumPB - pbList[key] + tmpValue > maxPB) {
			isRewrite = true;
			tmpValue = maxPB - (sumPB - pbList[key]);
			text = String(tmpValue);
		}

		//正当性確認終了
		isValid = true;
		break;
	}

	if (!isValid) {
		return;
	}

	//書き換え
	if (isRewrite) {
		tmpIsForce = isForce;
		isForce = true;
		$(this).val(text);
		isForce = tmpIsForce;
	}

	//値設定
	pbList[key] = Number(text);

	//合計値計算
	sumPB = 0;
	for (key in pbList) {
		sumPB += Number(pbList[key]);
	}

	//合計値表示
	$("#pb_sum").text(sumPB + " / " + maxPB);

	//パラメタ再計算
	calcParameter();
	calcItemLevelAverage();
	calcSortValueSum();
}

//フィジカルボーナスリセット
function resetPB() {
	//各要素のボーナス初期化
	pbList = {
		"str": 0,
		"dex": 0,
		"vit": 0,
		"int" : 0,
		"mnd" : 0,
		"pie" : 0
	};

	//最大ボーナス設定
	//1-9 : 0pt
	//10  : 2pt
	//10～36まで：2レベルごとに1pt
	//37～50：1レベルごとに1pt
	//51～  ：2レベルごとに1pt(51,53,55,57,59)
	level  = Number($("#general_filter_level_to").val());
	jobClass = $("#general_filter_jobclass").val();
	maxPB = 0;

	if (-1 != classMap[jobClass]["classes"].indexOf(ml_gatherer) ||
		-1 != classMap[jobClass]["classes"].indexOf(ml_crafter)) {
		//ギャザクラはボーナスなし
		maxPB = 0;
	} else {
		//戦闘職のみ計算
		maxPB = pbMaxList[level];
	}

	//合計ボーナス
	sumPB = 0;

	//表示
	showPBs();
}
//フィジカルボーナス表示
function showPBs() {
	var preIsForce = isForce;
	isForce = true;

	for (key in pbList) {
		$("#pb_" + key + "_value").val(pbList[key]);
	}
	$("#pb_sum").text(sumPB + " / " + maxPB);

	if (isSMP) {
		//スマホはボーナス＋特性表示
		var traitsList = setTraits();
		var bonusText = ("jp" == lang ? "ボーナス" : ml_bonus);
		var traitText = $("#lp_trait").text();
		for (key in pbList) {
			var text = "(";
			text += sprintf("{0} +{1}", [ bonusText, pbList[key] ]);
			if (null != traitsList[key]) {
				text += sprintf(" / {0} +{1}", [ traitText, traitsList[key]]);
			}
			text += ")";
			$("#note_" + key).html(text);
		}
	}
	isForce = preIsForce;
}

//守護神リスト作成
function initGodList() {

	var buf = "";
	var selectedText = " selected";
	for (var i in godAdjustMap) {
		buf += sprintf("<option value='{0}'{1}>{2}</option>", [i, selectedText, i]);
		selectedText = "";
	}
	$("#general_filter_god").append(buf);
}

//種族リスト作成
function initTribeList() {
	var buf = "";
	var selectedText = " selected";
	for (var i in tribeAdjustMap) {
		buf += sprintf("<option value=\"{0}\"{1}>{2}</option>", [i, selectedText, i]);
		selectedText = "";
	}
	$("#general_filter_tribe").append(buf);
}


//画像マウスオーバーイベント設定
function initEquipImageEvents() {
	if (isSMP) {
		smpInitEquipImageEvents();
		return;
	}
	for (i in equipSelectorList) {
		var baseId = equipSelectorList[i];
		var imageId = "image_" + baseId;
		$("#" + imageId).on("mouseover", function(e) {
			showItemDetailOnImage(e);
		});
		$("#" + imageId).on("mouseout", function(e) {
			hideItemDetail(null, "", null);
			/*
			//絶対位置で比較して、本当にマウスアウトしてるか？
			//マウス位置: e.page[X|Y]
			//要素位置：$(this).offset();
			var eb = {
				left: $(this).offset().left,
				top: $(this).offset().top,
				right: $(this).offset().left + $(this).outerWidth(),
				bottom: $(this).offset().top + $(this).outerHeight()
			};
			var cp = {
				x: e.pageX,
				y: e.pageY
			};
			var isIn = false;
			if (eb.left <= cp.x && cp.x <= eb.right && eb.top <= cp.y && cp.y <= eb.bottom) {
				isIn = true;
			}
			if (!isIn) {
				hideItemDetail(null, "", null);
			}
			*/
		});
	}
}

//マテリア初期化
function initMateriaSelectors() {
	for (i in materiaSelectorList) {
		initMateriaSelector(materiaSelectorList[i]);
	}
}
function initMateriaSelector(id) {
	$jqs = $("#" + id).jqSelector({
		width: "250px",
		materiaMode: true
	});
	$jqs.setEnabled(false);
	$jqs.on("jqs.selectMateria", function(){
		updateSelectedMateria(id);
		calcParameter();
		calcItemLevelAverage();
		calcSortValueSum();
	});
	jqsMateriaList[id] = $jqs;

}


//装備初期化
function initEquipSelectors() {
	for (i in equipSelectorList) {
		initEquipSelector(equipSelectorList[i]);
	}
}
function initEquipSelector(id) {
	if ("jp" == lang) {
		$jqs = $("#" + id).jqSelector({
			width: "375px"
		});
	} else {
		$jqs = $("#" + id).jqSelector({
			width: "350px"
		});
	}
	$jqs.setEnabled(false);
	$jqs.on("jqs.selectItem", function(jqs, eventName, data) {
		setItemImage(jqs.elem.attr("id"), data, (null != data["isHQ"] && data["isHQ"]));
		checkSelectedItem(jqs, data);
		checkPartsDisabled();
		calcParameter();
		calcItemLevelAverage();
		calcSortValueSum();
	});
	//$jqs.on("jqs.mouseOverSelectedItem", function(jqs, eventName, data) { showItemDetail(jqs, eventName, data, null) });
	//$jqs.on("jqs.mouseOutSelectedItem", function(jqs, eventName, data) { hideItemDetail(jqs, eventName, data, null) });
	$jqs.on("jqs.mouseOverDropDownItem", function(jqs, eventName, data) { showItemDetail(jqs, eventName, data, null) });
	$jqs.on("jqs.mouseOutDropDownItem", function(jqs, eventName, data) { hideItemDetail(jqs, eventName, data, null) });

	jqsEquipList[id] = $jqs;
}
function checkPartsDisabled() {

	if (isForce) {
		return;
	}

	var invalidPartsMap = {};
	isForce = true;

	//invalidEquipSubArmList

	//無効部位のリストアップ
	for (var i in jqsEquipList) {
		var jqs = jqsEquipList[i];
		var index = jqs.selectedIndex;
		if (0 == index) {
			continue;
		}

		var data = jqs.setting.data[index];
		if (null == data || "" == data || null == data["data"] || "" == data["data"]) {
			continue;
		}

		var invalidText = getItemDetailValueBase(data["data"], "base_invalid_equip", "", false);

		//主武器からの装備不可チェック
		if (-1 != invalidEquipSubArmList.indexOf(data["data"]["roll"])) {
			if ("" != invalidText) {
				invalidText += ",";
			}
			invalidText += ml_subarm;
		}

		if ("" == invalidText) {
			continue;
		}

		invalidParts = invalidText.split(",");
		for (var j in invalidParts) {
			invalidPart = invalidParts[j];
			invalidPartsMap[partsAbbrMap[invalidPart]] = 1;
		}
	}

	//全equipjqsの操作
	for (var i in equipSelectorList) {
		var id = equipSelectorList[i];
		var jqs = jqsEquipList[id];

		if (1 == invalidPartsMap[id]) {
			//0選択・無効化
			jqs.forceSelectItem(0);
			jqs.setEnabled(false);

		} else {
			jqs.setEnabled(true);
		}
	}
	isForce = false;
}

function checkSelectedItem(jqs, data) {

	var id = jqs.elem.attr("id").replace("equip_", "materia_");
	var linkId = "link_" + jqs.elem.attr("id");
	var link2Id = "link2_" + jqs.elem.attr("id");
	var link3Id = "link3_" + jqs.elem.attr("id");
	var materiaJqs = jqsMateriaList[id];

	if (null == data || "" == data || "" == data["data"]) {
		//データが無いなら全て無効化して終了
		$("#" + linkId).css("visiblity", "hidden");
		$("#" + linkId).css("display", "none");
		$("#" + link2Id).css("visiblity", "hidden");
		$("#" + link2Id).css("display", "none");
		$("#" + link3Id).css("visiblity", "hidden");
		$("#" + link3Id).css("display", "none");
		materiaJqs.setMateriaModeType(false);
		materiaJqs.resetData(null);
		materiaJqs.setTargetId("");
		materiaJqs.setTargetData(null, false);
		materiaJqs.initSetButtons();
		materiaJqs.setEnabled(false);
		return;
	}

	var isLinkOfficialEnabled = false;
	var isLinkCraftEnabled = false;
	var isMateriaEnabled = false;
	var isMateriaFreeMode = false;

	//リンク有無判定
	if ("" != data["data"] && null != data["data"]) {
		//IDが　ffffffff001　のように、f8個から始まっている場合は不可（オリジナルコード）
		if (data["data"]["id"].startsWith("ffffffff")) {
		} else {
			isLinkOfficialEnabled = true;
			if ("1" == data["data"]["craft"]) {
				isLinkCraftEnabled = true;
			}
		}
	}


	//マテリア判定
	if ("" != data["data"] && null != data["data"]) {
		if (null != data["data"]["base_materia"] && Number(data["data"]["base_materia"]) >= 1) {
			isMateriaEnabled = true;
		}
		if (-1 != rpIdList.indexOf(data["data"]["id"])) {
			isMateriaEnabled = true;
			isMateriaFreeMode = true;
		}
	}

	//公式リンク
	if (isLinkOfficialEnabled) {
		$("#" + linkId).attr("href", sprintf(publicDetailPageURL, [data["data"]["id"]]));
		$("#" + linkId).css("visiblity", "visible");
		$("#" + linkId).css("display", "inline");

	} else {
		$("#" + linkId).css("visiblity", "hidden");
		$("#" + linkId).css("display", "none");
	}

	//レシピリンク
	if (isLinkCraftEnabled) {
		var rawText = data["data"]["name"];
		var encodedText = encodeURI(rawText);
		$("#" + link2Id).attr("href", sprintf(rsURL, [encodedText]));
		$("#" + link2Id).css("visiblity", "visible");
		$("#" + link2Id).css("display", "inline");
	} else {
		$("#" + link2Id).css("visiblity", "hidden");
		$("#" + link2Id).css("display", "none");
	}

	//ノウス対応
	//NOTE 武器防具限定
	//link3_equip_selector_10

	if (isNovus(data["data"]["id"])) {
		tmp = link3Id.split("_");
		rollId = tmp[tmp.length - 1];
		$("#" + link3Id).attr("href", sprintf("javascript:void(setNovusParam('{0}', '{1}'))", [ rollId, data["data"]["id"]]));
		$("#" + link3Id).css("visiblity", "visible");
		$("#" + link3Id).css("display", "inline");
	} else {
		$("#" + link3Id).css("visiblity", "hidden");
		$("#" + link3Id).css("display", "none");
	}

	//マテリア
	var jqsData = jqs.setting.data[Number(jqs.selectedIndex)];
	materiaJqs.setMateriaModeType(isMateriaFreeMode);
	materiaJqs.resetData(null);
	materiaJqs.setTargetId(data["data"]["id"]);
	materiaJqs.setTargetData(data["data"], jqsData.isHQ);
	materiaJqs.initSetButtons();
	if (!isMateriaEnabled) {
		//マテリア初期化・無効化
		materiaJqs.setEnabled(false);

	} else {
		//マテリア有効化
		materiaJqs.setEnabled(true);
	}
}

var cnt = 0;

function setItemImage(id, data, isHQ) {
	var suffix = "_nq";
	if (isHQ) {
		suffix = "_hq";
	}

	if ("" == data || null == data["data"]["img" + suffix] || "" == data["data"]["img" + suffix]) {
		$("#image_" + id).attr("class", "itemimage_disabled");
	} else {
		var url = createImageUrl(data["data"]["img" + suffix]);
		$("#image_" + id).attr("src", url);
		$("#image_" + id).attr("class", "itemimage");
	}
}
function createImageUrl(img) {
	var ret = "";

	if (img.startsWith("ex_")) {
		ret = "/image/add_images/" + img;
	} else {
		ret = imageRootURL + img.substr(0, 2) + "/" + img + ".png";
	}
	return ret;
}

//自動マテリアフィルタ
function initAutoMateriaFilters() {

	var buf = "";
	buf += sprintf("<option value='{0}'{1]>{2}</option>", [99, (99 == config["defaultFilterAutoMateria"] ? " selected" : ""), ml_materia_manual]);
	buf += sprintf("<option value='{0}'{1]>{2}</option>", [0,  (0 == config["defaultFilterAutoMateria"] ? " selected" : ""), ml_materia_auto_full]);
	buf += sprintf("<option value='{0}'{1]>{2}</option>", [1,  (1 == config["defaultFilterAutoMateria"] ? " selected" : ""), ml_materia_auto_middle]);
	buf += sprintf("<option value='{0}'{1]>{2}</option>", [2,  (2 == config["defaultFilterAutoMateria"] ? " selected" : ""), ml_materia_auto_min]);

	$("#general_filter_materia").html(buf);
}


//アイテムレベルフィルタ
function initILVFilters() {
	initILVFiltersHelper("general_filter_ilv_from");
	initILVFiltersHelper("general_filter_ilv_to");
}
function initILVFiltersHelper(id) {
	//一旦キーをソート
	var keys = [];
	for (var key in ilvMap) {
		keys.push(key);
	}
	keys.sort(function(a, b) { return Number(a) - Number(b);});
	var buf = "";
	for (var i in keys) {
		var key = keys[i];
		buf += sprintf("<option value='{0}'{1}>{2}</option>", [
			key,
			0 == Number(key) ? " selected" : "",
			ilvMap[key]
		]);
	}
	$("#" + id).html(buf);
}

//ソートフィルタ初期化
function initSortFilters() {
	initSortFilter("general_filter_sort");
}
function initSortFilter(id) {
	var buf = "";
	for (var i in sortMap) {
		buf += sprintf("<optgroup label='{0}' class='optgroup_general'>", [i]);
		for (var j in sortMap[i]) {
			buf += sprintf("<option value='{0}'{1}>{2}</option>", [
				sortMap[i][j]["key"], 
				("_sp1" == sortMap[i][j]["key"] ? " selected" : ""),
				sortMap[i][j]["name"]
			]);
		}
		buf += "</optgroup>";
	}
	$("#" + id).append(buf);
}

//ジョブクラス選択初期化
function initClassOptions() {
	initClassOption("general_filter_jobclass");
}
function initClassOption(id) {
	var buf = "";
	for (var i in baseClassMap) {
		baseClassName = baseClassMap[i];
		buf += sprintf("<optgroup label='{0}' class='optgroup_general'>", [baseClassName]);
		for (var j in classMap) {
			if (-1 != classMap[j]["classes"].indexOf(baseClassName)) {
				buf += sprintf("<option value='{0}'{1}>{2}</option>", [
					j, (ml_pld == j ? " selected" : ""), j
				]);
			}
		}
		buf += "</optgroup>";
	}
	$("#" + id).append(buf);
}


//平均アイテムレベル計算
function calcItemLevelAverage() {
	if (isForce) {
		return;
	}

	//アイテムレベルの合計を得る
	var ilvSum = 0;
	for (var i in jqsEquipList) {
		var jqs = jqsEquipList[i];
		var index = jqs.selectedIndex;
		if (0 == index) {
			continue;
		}

		var data = jqs.setting.data[index];
		if (null == data || "" == data || null == data["data"] || "" == data["data"]) {
			continue;
		}

		var ilv = Number(data["data"]["base_ilv"]);
		ilvSum += ilv;

		//装備不可部位数の計算
		var invalidText = getItemDetailValueBase(data["data"], "base_invalid_equip", "", false);
		//主武器からの装備不可チェック
		if (-1 != invalidEquipSubArmList.indexOf(data["data"]["roll"])) {
			if ("" != invalidText) {
				invalidText += ",";
			}
			invalidText += ml_subarm;
		}

		if ("" != invalidText) {
			var invalidParts = invalidText.split(",");
			//要素数＝装備不可部位数＝その装備において占有している部位数
			//占有している部位は、占有している装備と同じILVの装備をしているものとして計算
			ilvSum += (ilv * invalidParts.length);
		}
	}


	//出力結果を生成
	var result = ml_ilv_default;
	var rawValue = ilvSum / 13;
	var resultValue = Math.floor(rawValue);
	var detailValue = new Number(rawValue).toFixed(2);
	if (0 == rawValue) {
		resultValue = "-";
		detailValue = "-";
	}

	result = sprintf(ml_ilv_format, [
		resultValue,
		detailValue
	]);

	$("#total_ilv").html(result);
}

//ソート基準値合計取得
function calcSortValueSum() {

	if (isForce) {
		return;
	}

	//ソート条件の決定
	var filterSortBy = $("#general_filter_sort").val();//指定値
	var filterSortByName = "";//表示名称
	var filterOrderBy = "";

	for (var i in sortMap) {
		for (var j in sortMap[i]) {
			if (sortMap[i][j]["key"] == filterSortBy) {
				filterOrderBy = sortMap[i][j]["order"];
				filterSortByName = sortMap[i][j]["abbr"];
				break;
			}
		}
	}

	var filterJobClass = $("#general_filter_jobclass").val();//選択中ジョブクラス
	var spList = getSPList(filterJobClass, null);//クラス別特化係数

//console.log(filterSortBy);
//console.log(filterSortByName);
//console.log(spList);
//console.log("-------------------");
	//選択中アイテムを全て再計算
	//基礎＋ノウス＋マテリア
	var sum = 0;
	for (var i = 0;i < equipSelectorList.length;i++) {
		//値の準備
		var equipSelectorId = equipSelectorList[i];
		var equipJqs = jqsEquipList[equipSelectorId];
		var materiaSelectorId = materiaSelectorList[i];
		var materiaJqs = jqsMateriaList[materiaSelectorId];

		var equip = equipJqs.setting.data[equipJqs.selectedIndex];
		var sortValue = 0;

		//装備なしを無視
		if (null == equip || "" == equip["data"]) {
			continue;
		}
		//マテリアデータ用意
		var materiaData = {};
		var materias = materiaJqs.selectedMateriaData;
		if ("" != materias) {
			for (k in materias) {
				var materia = materias[k];
				var baseMateriaData = materiaJqs.materiaData[materia["key"]];
				var key = baseMateriaData["effect"];
				var value = Number(baseMateriaData["values"][Number(materia["level"])]);
				value += Number(materia["adjust"]);

				//値の合算
				if (null == materiaData[key]) {
					materiaData[key] = 0;
				}
				materiaData[key] += value;
			}
		}

		if ("_sp0" == filterSortBy) {
			// AADPS
			//NOTE この計算において関係する値にマテリアは適用できないので対応しない
			var interval = getItemDetailValueNum(equip["data"], "main_atk_interval", equip["isHQ"]);
			var aa = getItemDetailValueNum(equip["data"], "main_phy_aa", equip["isHQ"]);
			if (0 == interval || 0 == aa) {
				sortValue = 0;
			} else {
				sortValue = aa / interval;

			}

		} else if ("_sp1" == filterSortBy || filterSortBy.startsWith("_user")) {
			//クラス別特化
			//spList = classMap[filterJobClass]["spList"];
			//spList = getSPList(filterJobClass, filterSortBy);
			for (var spIndex in spList) {
				for (var spKey in spList[spIndex]) {
					//装備分付与（ノウス対応含む）
					sortValue += (getItemDetailValueNum(equip["data"], spKey, equip["isHQ"]) * spList[spIndex][spKey]);
					//マテリア付与
					if (null != materiaData && null != materiaData[spKey]) {
						sortValue += materiaData[spKey] * spList[spIndex][spKey];
					}
				}
			}


		} else {
			//パラメタ別特化
			sortValue = getItemDetailValueNum(equip["data"], filterSortBy, equip["isHQ"]);

			//マテリア付与
			if (null != materiaData && null != materiaData[filterSortBy]) {
				sortValue += materiaData[filterSortBy];
			}
		}

		sum += sortValue;
//console.log(equipSelectorId);
//console.log(equip);
//console.log(materiaData);
//console.log("result=" + sortValue);
//console.log("***");
	}

	var sortValueText = sprintf(ml_sort_format, [ filterSortByName, String(new Number(sum).toFixed(2)) ]);
	$("#total_sort").html(sortValueText);

}

//*************************************
//** データ処理
//*************************************

//データ読み込み
function loadItemData() {

	if (!window.localStorage) {
		alert(ml_html5);
		return;
	}

	localDataVersion = getLocalDataVersion();

	if (isForceLoadItemData || null == localDataVersion || localDataVersion < currentDataVersion) {
		setupLocalData();
	} else {
		//itemData = JSON.parse(window.localStorage.getItem("itemData"));
		itemData = JSON.parse(doUnzip("itemData.dat", window.localStorage.getItem("itemData")));
		initViews();
	}
}

//データ保存
function saveItemData() {
	window.localStorage.setItem("dataVersion", itemData["version"]);
	window.localStorage.setItem("itemData", doZip("itemData.dat", JSON.stringify(itemData)));
	//window.localStorage.setItem("itemData", JSON.stringify(itemData));
}

//データ読み込み
function setupLocalData() {

	itemData = null;
	showLoading();
	setTimeout("setupLocalDataHelper()", 100);
}

function setupLocalDataHelper() {
	var url = itemDataFile;
	if ("en" == lang) {
		url = url.replace("LANG", "na");
	} else {
		url = url.replace("LANG", lang);
	}
	$.getJSON(url, function() {
		console.log("getJSON:run");
	})
	.success(function(json) {
		console.log("getJSON:success");
		itemData = json;
	})
	.error(function(jqXHR, textStatus, errorThrown) {
		console.log("getJSON:error");
	    console.log("エラー：" + textStatus);
	    console.log("テキスト：" + jqXHR.responseText);
		item_data = null;
		alert(ml_loading_failure);
		hideLoading();
	})
	.complete(function() {
		console.log("getJSON:complete");
		hideLoading();
		if (null != itemData) {
			saveItemData();
			initViews();
		}
	});

}

//データ読み込みローディング表示
function showLoading() {
	$.blockUI({	
		css: {
			padding: "5%",
			top: "40%",
			left: "15%",
			width: "60%",
			height: "10%",
			backgroundColor: "#ffffff", 
			border: "2px solid #808080"
		}, 
		message: "<div align='center' style='height: 100%'><table style='height: 100%'><tr><td><img src='image/sys/load.gif' width='32px' height='32px'</td><td style='color:#000000'>" + ml_loading + "</td></tr></table></div>"
	});
}

//データ読み込み非表示
function hideLoading() {
	$.unblockUI();
}

//データバージョン確認
function getLocalDataVersion() {

	var version = window.localStorage.getItem("dataVersion");

	return version;
}

//ID＞文字列置換
function indexToText(indexList) {
	if (null == indexList || undefined == indexList || "" == indexList) {
		return "";
	}

	var indexArray = indexList.split(",");
	var ret = "";
	for (var i in indexArray) {
		var index = indexArray[i]
		if ("" == index) {
			continue;
		}
		if (index < itemData["text_list"].length) {
			var text = itemData["text_list"][index];
			if ("" != ret) {
				ret += ", ";
			}
			ret += text;
		}
	}
	return ret;
}

function doZip(fileName, data) {

	//スマホ全般とFFがZIP化対象
	if (!isSMP && "ff" != browserType) {
		return data;
	}

	console.log("zipped: file=" + fileName + ", data=" + data.length);

	var zip = new JSZip();
	var content = null;

	zip.file(fileName, data);
	content = zip.generate({
		type : "string",
		compression: "DEFLATE",
		compressionOptions : {level:6}
	});

	console.log("zipped: result=" + content.length);

	//var zipTest = new JSZip();
	//zipTest.load(content);
	//var text = zipTest.file(fileName);

	return content;
}
function doUnzip(fileName, data) {

	//スマホ全般とFFがZIP化対象
	if (!isSMP && "ff" != browserType) {
		return data;
	}

	var zip = new JSZip();
	var content = null;

	console.log("unzipper: file=" + fileName + ", data=" + data.length);
	
	zip.load(data);
	content = zip.file(fileName).asText();
	console.log("unzipped: result=" + content.length);

	return content;
}


//*************************************
//** データ処理：一般設定
//*************************************
function loadConfig() {
	config = {};

	var obj = window.localStorage.getItem("esConfig");
	if (null != obj) {
		try {
			config = JSON.parse(obj);
		} catch (e) {
			config = {};
		}
	}
	setDefaultConfig("isShowFilter", true);
	setDefaultConfig("isShowOption", true);
	setDefaultConfig("isShowParameters", true);
	setDefaultConfig("isShowEquipment", true);
	setDefaultConfig("isShowFavorite", true);
	setDefaultConfig("isShowShare", true);
	setDefaultConfig("isShowEquipList", false);
	setDefaultConfig("showParamType", 0);
	setDefaultConfig("checkedEquipList", {});

	setDefaultConfig("autoMateriaMode", 0);

	setDefaultConfig("defaultFilterGod", translateMultiLanguage("哈罗妮", "jp", lang));
	setDefaultConfig("defaultFilterTribe", translateMultiLanguage("人族：中原之民", "jp", lang));
	setDefaultConfig("defaultFilterJobClass", translateMultiLanguage("圣骑士", "jp", lang));
	setDefaultConfig("defaultFilterLevelFrom", "60");
	setDefaultConfig("defaultFilterLevelTo", "60");
	setDefaultConfig("defaultFilterILVFrom", "0");
	setDefaultConfig("defaultFilterILVTo", "0");
	setDefaultConfig("defaultFilterSort", "_sp1");
	setDefaultConfig("defaultFilterCheckIDDropIgnore", false);
	setDefaultConfig("defaultFilterCheckPVPIgnore", true);
	setDefaultConfig("defaultFilterCheckAdjustJob", true);
	setDefaultConfig("defaultFilterCheckCrafterILV", true);
	setDefaultConfig("defaultFilterAutoMateria", 1);

	//フィルタパネルは常に表示。
	config["isShowFilter"] = true;

	//補填を行った後の初期値を保存
	saveConfig();
}
function setDefaultConfig(key, value) {
	if (null == config[key]) {
		config[key] = value;
	}
}
function saveConfig() {
	window.localStorage.setItem("esConfig", JSON.stringify(config));

}


//*************************************
//** 共通/汎用処理
//*************************************

//全半角数値置換
function castNumber(a) {
	return a.replace(/[０１２３４５６７８９]/g
		, function(a){
			var b = "０１２３４５６７８９".indexOf(a);
			return (b !== -1)? b:a;
		}
	);
}

//半角数値以外を削除
function deleteWithoutNumber(inStr) {
	var strMatch = inStr.match(/[0-9]/g);
	var rtnMatch = "";
	try {
		for (var i = 0; i < strMatch.length; i++) {
			rtnMatch = rtnMatch + strMatch[i];
		}
	} catch (e) {}
	return rtnMatch;
}

//アイテム値取得
function getItemDetailValueNum(data, key, isHQ) {
	return Number(getItemDetailValueBase(data, key, 0, isHQ));
}

//アイテム値取得
function getItemDetailValue(data, key, isHQ) {
	return getItemDetailValueBase(data, key, 0, isHQ);
}

//アイテム値取得
function getItemDetailValueBase(data, key, defaultValue, isHQ) {
	var ret = null;

	if (isHQ) {
		//isHQならhq優先
		ret = ( null != data[key + "_hq"] ? data[key + "_hq"]
			  : null != data[key + "_nq"] ? data[key + "_nq"]
			  : null != data[key] ? data[key]
			  : defaultValue);
	} else {
		//そうでないならsuffixなし、または nq 優先
		ret = ( null != data[key] ? data[key]
			  : null != data[key + "_nq"] ? data[key + "_nq"]
			  : null != data[key + "_hq"] ? data[key + "_hq"]
			  : defaultValue);
	}

	//ノウス対応
	if (isNovus(data["id"])) {
		var nid = data["id"];

		if (key.substr(0, 6) == "bonus_") {
			var npKey = key.substr(6);
			var value = getNovusParamConfig(nid, npKey);

			if (0 != value) {
				ret = Number(ret);
				ret += Number(value);
			}
		}
	}
	return ret;
}


//簡易sprintf
function sprintf(text, values) {
	var ret = text;

	for (var i = 0;i < values.length;i++) {
		ret = ret.replace(new RegExp("\\{" + i + "\\}", "g"), values[i]);
	}

	return ret;
}

//スクロール位置
function getScrollTop() {
	return document.documentElement.scrollTop || document.body.scrollTop;
}

//クライアントサイズ
function getClientHeight() {
	return document.documentElement.clientHeight || document.body.clientHeight;
}
function getClientWidth() {
	return document.documentElement.clientWidth || document.body.clientWidth;
}

function windowEvent() {
	if (window.event) {
		return window.event;
	}
	var caller = arguments.callee.caller;
	while (caller) {
		var ob = caller.arguments[0];
		if (ob && ob.constructor == MouseEvent) {
			return ob;
		}
		caller = caller.caller;
	}
	return null;
}

//配列ユニーク
function arrayUnique(list) {
	var ret = [];
	var map = {};

	for (var i in list) {
		var v = list[i];
		if (!(v in map)) {
			ret.push(v);
			map[v] = true;
		}
	}

	return ret;
}

//マウスカーソル位置保持
$(document).ready(function() {
	$("body").mousemove(function(e) {
		mx = e.pageX;
		my = e.pageY;
	});
});

//startsWith (String拡張）
String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) === 0;
}

//endsWith (String拡張）
String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
};


//****************************************************
//スマホ対応
//****************************************************
var smpScrollTop = 0;//スクロール位置
var smpEquipListViewCount = 15;//装備リストに一度に表示する数
var smpEquipListNextView = 0;//装備リストに次に表示する開始位置
var smpIsInitMateria = false;//マテリア初期化確認
var smpTmpNVRollId = null;//ノウス用一時設定
var smpTmpNVId = null;//ノウス用一時設定
var smpReturnFunc = null;//戻るボタン押下時のイベント
var smpItemDetailTarget = null;//アイテム詳細表示用のターゲット

function debugMethod2() {
	//smpShowAcr();
	//showLoading();
	//smpShowCoef();
	//showFavorite();
	//setNovusParam('10', '8994ccf991b')
	//$("#bonus_param_button").click();
	//$("#general_filter_level_to").val(48);
	//$("#l_show").click();
}
//スマホ初期化
function smpInit() {
	if ("isSMP" in window && isSMP) {
		//hashによる画面遷移トリガ
//		location.hash = "#";
		window.scrollTo(0, 1);
		$(window).on("hashchange", function(e) {smpOnHashChange(e);});

	} else {
		isSMP = false;
	}
}
//レベル選択初期化
function smpInitFilterLevel(id, defaultValue) {
	var html = "";
	for (var i = 1;i <= 60;i++) {
		html += sprintf("<option value=\"{0}\"{1}>{0}</option>", [
			i, (defaultValue == i ? " selected" : "")
		]);
	}
	$("#" + id).html(html);
}
//メニュートグル
function smpToggleMenu() {
	if ($("#menu_view").is(":visible")) {
		//表示中であれば非表示にする
		$("#header_menubtn").attr("src", "image/smp/menu_128a.png");
		$("#menu_view").hide();
	} else {
		//非表示であれば表示する
		$("#header_menubtn").attr("src", "image/smp/menu_128b.png");
		$("#menu_view").show();
	}
}
function smpShowFilter() {
	smpShowToggleNote(false);
	moveToId("all_area");//NOTE 最上部に移動
	$("#menu_view").hide();
}
function smpShowEquipment() {
	smpShowToggleNote(false);
	moveToId("equip_table");
	$("#menu_view").hide();
}
function smpShowOption() {
	smpShowToggleNote(false);
	moveToId("option_table");
	$("#menu_view").hide();
}
function smpShowParameter() {
	smpShowToggleNote(false);
	moveToId("parameter_table");
	$("#menu_view").hide();
}
function smpShowFavorite() {
	smpShowToggleNote(false);
	moveToId("favorite_table");
	$("#menu_view").hide();
}
function smpShowNote() {
	smpShowToggleNote(true);
	moveToId("all_area");//NOTE 最上部に移動
	$("#menu_view").hide();
}
function moveToId(id) {
	window.scrollTo(0, $("#" + id).offset().top + 1);
}
function moveToTop() {
	moveToId("all_area");
}
function smpShowToggleNote(isShowNote) {
	if (isShowNote) {
		$("#filter_table").hide();
		$("#equip_table").hide();
		$("#option_table").hide();
		$("#parameter_table").hide();
		$("#favorite_table").hide();
		$("#world_favorite_table").hide();
		$("#share_table").hide();
		$("#note_table").show();
	} else {
		$("#filter_table").show();
		$("#equip_table").show();
		$("#option_table").show();
		$("#parameter_table").show();
		$("#favorite_table").show();
		$("#world_favorite_table").show();
		$("#share_table").show();
		$("#note_table").hide();
	}
}


//------------------------------------------------------
//ハッシュ変更：ポップアップ起動
function smpOnHashChange() {
	//console.log(location.hash);
	var isInvalid = false;

	if ("#show_equiplist" == location.hash) {
		if (null != targetJqs) {
			//装備選択
			smpShowEquipListMain();
		} else {
			isInvaid = true;
		}

	} else if ("#show_materialist" == location.hash) {
		if (null != targetJqs) {
			//装備選択
			smpShowMateriaListMain();
		} else {
			isInvalid = true;
		}

	} else if ("#show_bonusparam" == location.hash) {
		if ("disabled" != $("#bonus_param_button").attr("disabled")) {
			//ボーナスパラメタ設定
			smpSetBonusParamsMain();
		} else {
			isInvalid = true;
		}

	} else if ("#show_novus" == location.hash) {
		if ("disabled" != $("#bonus_param_button").attr("disabled")) {
			//ノウス設定
			//NOTE 表示条件がちょっと異なるが、
			//「表示ボタン押下済」（もしくはお気に入り等から同等の処理を実施済）にまとめている
			smpSetNovusParamMain();
		} else {
			isInvalid = true;
		}

	} else if ("#show_coef" == location.hash) {
		//係数調整
		//条件は特になし
		smpShowCoefMain();

	} else if ("#show_acr" == location.hash) {
		//必要命中
		//条件は特になし
		smpShowAcrMain();

	} else if ("#show_equip_detail" == location.hash) {
		//装備詳細
		//条件は特になし
		smpShowItemDetailOnImageMain();

	} else if ("" == location.hash) {
		//戻るボタン対応
		//ポップアップから戻るを押下されたときに、戻る時の処理メソッドを登録しておく
		if (null != smpReturnFunc) {
			smpReturnFunc();
		}
	}

	if (isInvalid) {
		location.hash = "";
	}
}

//------------------------------------------------------
//装備トップに移動
function smpScrollToEquipmentTop() {
	var obj = $("#equip_table");
	if (null != obj) {
		window.scrollTo(0, obj.offset().top);
	}
}
//------------------------------------------------------
//スマホ版お気に入り処理
//追加
function smpAddFavorite(data) {
	//お気に入り追加後補正処理
	//メッセージポップアップ
	var msg = sprintf(ml_favorite_add_complete, [ data["name"] ]);
	alert(msg);

	//一番最後の要素を選択。全部ループ回して最後の値を取得
	var newValue = "";
	$("#favorite_list option").each(function() {
		newValue = $(this).val();
	});
	if ("" != newValue) {
		$("#favorite_list").val(newValue);
	}

	//再度変更処理を起動(PC共用)
	changeFavorite();
}
//削除
function smpDeleteFavorite(data) {
	var msg = sprintf(ml_favorite_delete_confirm, [ data["name"] ]);
	var ret = confirm(msg);

	return ret;
}

//------------------------------------------------------
//スマホ版アイテム選択
function smpShowEquipList(jqs) {
	targetJqs = jqs;

	//ハッシュ変更からの起動
	if (targetJqs.setting.materiaMode) {
		location.hash = "#show_materialist";
	} else {
		location.hash = "#show_equiplist";
	}

	return true;

}
function smpShowEquipListMain() {

	//戻るボタン時処理登録
	smpReturnFunc = new Function("smpOnClickCancelPS()");

	//ハイライト
	smpReleaseItemHighlight();
	$("#" + targetJqs.dataId).addClass("selector_highlight");

	//対象とスクロール位置記憶
	smpScrollTop = getScrollTop();

	//全体を非表示
	$("#all_area").hide();

	//リスト生成
	smpCreateEquipList(targetJqs);

	//リスト表示
	$("#popup_selector").show();
	//location.hash = "#show_popup_selector";
	window.scrollTo(0, 1);

	return;
}

//装備選択キャンセル
function smpOnClickCancelPS() {
	smpHideEquipList();
}
function smpHideEquipList() {
	targetJqs = null;
	$("#all_area").show();
	$("#popup_selector").hide();
	smpEquipListNextView = 0;
	location.hash = "";
	smpReturnFunc = null;
	window.scrollTo(0, smpScrollTop);
}
//ハイライト解除
function smpReleaseItemHighlight() {
	if (!isSMP) {
		return;
	}
	$("#panel_main_equipment .selector_highlight").each(function() {
		$(this).removeClass("selector_highlight");
	});
}

//さらに読み込む出力判定
function smpSetPSMoreRead(jqs, val) {
	if (jqs.setting.data.length > val) {
		$("#ps_more_read_wait").show();
		$("#ps_more_read_loading").hide();
		$("#ps_more_read").show();
		smpEquipListNextView = val;

		$(document).on("scroll", function(e) {smpCheckPSMoreRead(e);});

	} else {
		//これ以上はない
		$("#ps_more_read").hide();
		smpEquipListNextView = 0;
		$(document).off("scroll");
	}
}
//さらに読み込む実施判定
function smpCheckPSMoreRead(e) {
	if (0 == smpEquipListNextView) {
		return;
	}
	var scrollTop = getScrollTop();
	var clientHeight = getClientHeight();
	var docHeight = $(document).height();

	if (clientHeight + scrollTop + 10 >= docHeight) {
		//読み込む開始
		$(document).off("scroll");
		$("#ps_more_read_wait").hide();
		$("#ps_more_read_loading").show();
		setTimeout("smpAddEquipList()", 100);
	}
}
//追加装備リスト設定
function smpAddEquipList() {
	//コンテンツHTML作成
	imageIdList = [];
	var html = smpCreateEquipListHelper(targetJqs, smpEquipListNextView, smpEquipListNextView + smpEquipListViewCount - 1);
	$("#ps_list").append(html);

	//遅延ロード設定
	for (var i in imageIdList) {
		var imageId = imageIdList[i];
		$("#" + imageId).lazyload({
			effect: "fadeIn",
			effectspeed: 500
		});
	}

	//さらに読み込む表示判定
	smpSetPSMoreRead(targetJqs, smpEquipListNextView + smpEquipListViewCount);
}
//リスト生成
function smpCreateEquipList(jqs) {

	//タイトル
	var titleId = jqs.dataId.replace("equip_selector", "le");
	$("#ps_title").text($("#" + titleId).text());

	//id = jqs.dataId
	//data = jqs.setting.data

	//コンテンツHTML作成
	imageIdList = [];
	var html = smpCreateEquipListHelper(jqs, 0, smpEquipListViewCount - 1);
	$("#ps_list").html(html);

	//遅延ロード設定
	for (var i in imageIdList) {
		var imageId = imageIdList[i];
		$("#" + imageId).lazyload({
			effect: "fadeIn",
			effectspeed: 500
		});
	}

	//さらに読み込む表示判定
	smpSetPSMoreRead(jqs, smpEquipListViewCount);

}
function smpCreateEquipListHelper(jqs, fromIndex, toIndex) {

	//基準値テキスト
	var filterOrderBy = "";
	var filterSortByName = "";
	for (var i in sortMap) {
		for (var j in sortMap[i]) {
			if (sortMap[i][j]["key"] == filterSortBy) {
				filterOrderBy = sortMap[i][j]["order"];
				filterSortByName = sortMap[i][j]["abbr"];
				break;
			}
		}
	}

	var html = "";
	for (var equipIndex in jqs.setting.data) {
		if (equipIndex < fromIndex) {
			continue;
		}
		if (equipIndex > toIndex) {
			break;
		}

		//値用意
		var equip = jqs.setting.data[equipIndex];
		var suffix = (equip.isHQ ? "_hq" : "_nq");
		var subHTML = "";
		var lineId = "";
		if (null != equip["data"]["id"]) {
			lineId = "equip_list_" + equip["data"]["id"] + suffix;
		} else {
			lineId = "equip_list_none";
		}

		//名前
		var nameText = "";
		if (null == equip["data"]["name"]) {
			nameText = ml_equip_list_unselect;
		} else {
			nameText = sprintf("Lv{0}[{1}] {2}{3}", [ equip["data"]["base_glv"], equip["data"]["base_ilv"], equip["data"]["name"], (equip.isHQ ? "HQ" : ""), ]);
		}
		var nameColorClass = (null != equip["color"] ? "pu_itemname_small_" + equip["color"] : "");

		//画像
		var imageUrl = (null != equip["data"]["img" + suffix] ? createImageUrl(equip["data"]["img" + suffix]) : blankEquipImageUrl);

		//パラメタ
		var mainParams = "";
		var subParams = "";

		//基準値
		mainParams += sprintf("<span class=\"ps_sort\">{0} {1}</span><br>", [
			(null != equip["sort"] ? filterSortByName : ""),
			(null != equip["sort"] ? ("+0" == equip["sort"] ? "0.00" : equip["sort"]) : "&nbsp;")
		]);
		for (var i in sortMap) {
			//基本・ボーナスパラメタのみ出力
			if (ml_base_param != i && ml_bonus != i) {
				continue;
			}
			for (var j in sortMap[i]) {
				//パラメタ取得
				var testKey = sortMap[i][j]["key"] + suffix;
				var paramValue = (null != equip["data"][testKey] ? equip["data"][testKey] : 0);
				paramValue = Number(String(paramValue).replace("+", ""));

				//ノウスネクサス対応
				if (isNovus(equip.data["id"])) {
					var npKey = sortMap[i][j]["key"].replace("bonus_", "");
					var npValue = getNovusParamConfig(equip.data["id"], npKey);
					if (0 != npValue) {
						paramValue += npValue;
					}
				}
				if (0 != paramValue) {
					if (ml_base_param == i) {
						//基本パラメタ
						mainParams += sprintf("<span class=\"ps_main_param_text\">{0} {1}</span><br>", [ sortMap[i][j]["name"], paramValue]);
					} else {
						//ボーナスパラメタは "+30" のように表現。それ以外は値で表現
						if ("" != subParams) {
							subParams += " / ";
						}
						subParams += sprintf("<span class=\"ps_sub_param_text\">{0} +{1}</span>", [ sortMap[i][j]["name"], paramValue]);
					}
				}
			}
		}

		var checkboxHTML = "";
		//命中調整はPCだけの機能なので表示しない。
		/*
		if (null != equip["data"]["name"]) {
			var isCheckedEquip = (config["checkedEquipList"][equip["data"]["id"] + "_" + (equip.isHQ ? "1" : "0")]);
			checkboxHTML = sprintf(
				"<input type=\"checkbox\" id=\"checkedequip_{1}_{2}\" class=\"ev_checkbox\"{0} onclick=\"onClickEquipCheckBox('{1}', '{2}')\">", [
					(isCheckedEquip ? " checked" : ""),
					equip["data"]["id"],
					equip.isHQ ? "1" : "0"
				]
			);
		}
		*/
		subHTML = sprintf(
			"<tr onclick=\"onClickEquipLine('{0}');smpHideEquipList();\" class=\"{6}\">" +
			"<td valign=\"top\" align=\"center\">{7}<div class=\"ps_itemimage_frame\"><img src=\"/image/sys/clear.png\" data-original=\"{1}\" class=\"itemimage\" id=\"ll_image_{0}\"></div></td>" +
			"<td width=\"100%\">" + 
			"<div class=\"ps_selector_base {6}\">" +
			"<span><span class=\"selector_selected {2}\" style=\"color: #ffffff\">{3}</span></span>" +
			"<div class=\"ps_main_param\">{4}</div>" +
			"<div class=\"ps_sub_param\">{5}</div>" +
			"</div>" +
			"</td>" + 
			"</tr>",
			[
				lineId,
				imageUrl,
				nameColorClass,
				nameText,
				mainParams,
				subParams,
				(equipIndex % 2 == 1 ? "ps_line_odd" : ""),
				checkboxHTML
			]
		);
		imageIdList.push("ll_image_" + lineId);

		html += subHTML;
	}
	return html;
}

//------------------------------------------------------
//スマホ版マテリア選択
function smpShowMateriaListMain(jqs) {

	//戻るボタン時処理登録
	smpReturnFunc = new Function("smpOnClickCancelMPS()");

	//ハイライト
	smpReleaseItemHighlight();
	$("#" + targetJqs.dataId).addClass("selector_highlight");

	//対象とスクロール位置記憶
	smpScrollTop = getScrollTop();

	//全体を非表示
	$("#all_area").hide();

	//リスト生成
	if ("" == $("#mps_list2").html()) {
		smpInitMateriaFreeModeForm();
	}
	smpCreateMateriaList(targetJqs);

	//要素非表示
	if (targetJqs.setting.materiaFreeMode) {
		$("#materia_popup_selector .materia_free_mode").show();
		$("#materia_popup_selector .materia_normal_mode").hide();

	} else {
		$("#materia_popup_selector .materia_normal_mode").show();
		$("#materia_popup_selector .materia_free_mode").hide();
	}


	//リスト表示
	$("#materia_popup_selector").show();
	window.scrollTo(0, 1);

	return;
}
function smpInitMateriaFreeModeForm() {
	var html = "";
	var materiaData = getMateriaDataByLang();
	for (var i in freeModeMateriaList) {
		materiaId = freeModeMateriaList[i];
		html += sprintf("<tr><td nowrap>{0}</td><td width=\"32\">&nbsp;</td><td><input type=\"number\" id=\"materia_free_{1}_adjust\" data-type=\"{2}\" class=\"mps_num\" value=\"0\"></td></tr>", [
			materiaData[materiaId]["effect_name"],
			i,
			materiaId
		]);
	}
	$("#mps_list2").html(html);
}
//セット適用
function smpApplyMateriaMPS(index) {
	var jqs = targetJqs;
	var targetId = jqs.setting.targetId;

	if (null == materiaSet || null == materiaSet[targetId] || null == materiaSet[targetId][index]) {
		return;
	}
	var setData = materiaSet[targetId][index];
	if (null != setData) {
		if (jqs.setting.materiaFreeMode) {
			$("#mps_list2 input[type=number]").each(function() {
				$(this).val(0);
			});
			for (var i in setData) {
				var tmp = setData[i]["m"].split("-");
				var key = tmp[0];
				var baseMateriaInfo = jqs.materiaData[key];
				var adjust = setData[i]["a"];
				var value = baseMateriaInfo["values"][0] + adjust;
				$("#mps_list2 input[data-type=" + key + "]").val(value);
			}
		} else {
			for (var i = 0;i < 5;i++) {
				if (null == setData[i] || null == setData[i]["m"] || null == setData[i]["a"]) {
					return;
				}
				$("#materia_" + i).val(setData[i]["m"]);
				$("#materia_" + i + "_adjust").val(setData[i]["a"]);
			}
		}
	}
}


//セット登録
function smpRegistMateriaMPS(index) {
	if (null == materiaSet) {
		return;
	}

	var jqs = targetJqs;
	var targetId = jqs.setting.targetId;

	var setData = [];

	if (jqs.setting.materiaFreeMode) {
		$("#mps_list2 input[type=number]").each(function() {
			var val = $(this).val();
			var type = $(this).attr("data-type");
			var baseMateriaInfo = jqs.materiaData[type];
			setData.push({
				"m": type + "-0",
				"a": val - baseMateriaInfo["values"][0]
			});
		});
	} else {
		for (var i = 0;i < 5;i++) {
			//ちょっと長いのでキー名は1文字にする。m=materia, a=adjust
			setData.push({
				"m": $("#materia_" + i).val(),
				"a": $("#materia_" + i + "_adjust").val()
			});
		}
	}
	if (null == materiaSet[targetId]) {
		materiaSet[targetId] = [null, null, null];
	}
	materiaSet[targetId][index] = setData;
	jqs.saveMateriaSetLSWrapper();
	smpSetMateriaSetButtons(jqs);
	alert(mt_materia_set_regist_ok);
}
//Clear
function smpOnClickClearMPS() {
	var jqs = targetJqs;
	var targetId = jqs.setting.targetId;

	if (jqs.setting.materiaFreeMode) {
		$("#mps_list2 input[type=number]").each(function() {
			$(this).val(0);
		});
	} else {
		for (var i = 0;i < 5;i++) {
			$("#materia_" + i).val("");
			$("#materia_" + i + "_adjust").val(0);
		}
	}

}

//OK
function smpOnClickOKMPS() {
	var jqs = targetJqs;
	var index = 0;

	//データ登録
	jqs.selectedMateriaData = [];
	if (jqs.setting.materiaFreeMode) {
		$("#mps_list2 input[type=number]").each(function() {
			var val = $(this).val();
			var type = $(this).attr("data-type");
			var baseMateriaInfo = jqs.materiaData[type];
			if (0 != val) {
				jqs.selectedMateriaData[index] = {"key": type, "level": 0, "adjust": val - baseMateriaInfo["values"][0]};
				index++;
			}
		});

	} else {
		for (var i = 0;i < 5;i++) {
			var materiaData = $("#materia_" + i).val();
			var adjustData = $("#materia_" + i + "_adjust").val();
			if ("" != materiaData) {
				var tmp = materiaData.split("-", 2);
				jqs.selectedMateriaData[index] = {"key": tmp[0], "level": tmp[1], "adjust": adjustData};
				index++;
			}
		}
	}

	//ビュー更新
	var selectedDataText = jqs.createSelectedMateriaText();
	$("#" + jqs.dataId + "_item").text(selectedDataText);

	//トリガー発行
	jqs.trigger("jqs.selectMateria", jqs.selectedMateriaData);

	//マテリア選択クローズ
	smpHideMateriaList();
}
//キャンセル
function smpOnClickCancelMPS() {
	smpHideMateriaList();
}
function smpHideMateriaList() {
	$("#all_area").show();
	$("#materia_popup_selector").hide();
	location.hash = "";
	window.scrollTo(0, smpScrollTop);
	smpReturnFunc = null;
}

//リスト作成
function smpCreateMateriaList(jqs) {
	if (!smpIsInitMateria) {
		smpInitMateriaList(jqs);
	}

	if (jqs.setting.materiaFreeMode) {
		//とりあえず全てリセット
		$("#mps_list2 input[type=number]").each(function() {
			$(this).val(0);
		});
		//設定されている値を適用
		for (var i = 0;i < jqs.selectedMateriaData.length;i++) {
			var materia = jqs.selectedMateriaData[i];
			if (null == materia["key"] || null == materia["level"] || null == materia["adjust"]) {
				continue;
			}
			var baseMateriaInfo = jqs.materiaData[materia["key"]];
			var value = materia["adjust"] + baseMateriaInfo["values"][0];

			$("#mps_list2 input[type=number]").each(function() {
				if (materia["key"] == $(this).attr("data-type")) {
					$(this).val(value);
				}
			});
		}

	} else {
		var equipId = jqs.setting.targetId;
		var limitInfo = null;
		var limitHTML = "";
		if ("" != equipId) {
			limitInfo = getParamLimitDataForParam(equipId);
			if (null != limitInfo) {
				limitHTML = smpCreateLimitParamHTML(jqs, limitInfo);
			}
		}
		if ("" == limitHTML) {
			$("#param_limit_text").hide();
		} else {
			$("#param_limit_text").html(limitHTML);
			$("#param_limit_text").show();
		}

		//とりあえず全てリセット
		for (var i = 0;i < 5;i++) {
			$("#materia_" + i).val("");
			$("#materia_" + i + "_adjust").val(0);
		}

		//順番並び替え
		for (var i = 0;i < 5;i++) {
			smpUpdateMateriaOrder(jqs, $("#materia_" + i));
		}

		//設定されている値を適用
		for (var i = 0;i < jqs.selectedMateriaData.length;i++) {
			var materia = jqs.selectedMateriaData[i];
			if (null == materia["key"] || null == materia["level"] || null == materia["adjust"]) {
				continue;
			}
			$("#materia_" + i).val(materia["key"] + "-" + materia["level"]);
			$("#materia_" + i + "_adjust").val(materia["adjust"]);
		}
		calcLimitParam();
	}


	//選択可否の用意(禁断不可設定)
	var limit = 5;
	var targetData = jqs.setting.targetData;
	if (null != targetData && "1" == targetData["ne_materia"]) {
		limit = Number(targetData["base_materia"]);
	}
	for (var i = 1;i <= 5;i++) {
		var mbId = "materia_" + (i - 1);
		if (i > limit) {
			//disabled
			$("#" + mbId).parent().parent().find("td").css("color", "#606060");
			$("#" + mbId).css("pointer-events", "none");
			$("#" + mbId).css("color", "#808080");
			$("#" + mbId + "_adjust").prop("disabled", "disabled");
			$("#" + mbId + "_adjust").prop("attr", "disabled");
			$("#" + mbId + "_adjust").css("color", "#808080");
		} else {
			//enabled
			$("#" + mbId).parent().parent().find("td").css("color", "#ffffff");
			$("#" + mbId).css("pointer-events", "initial");
			$("#" + mbId).css("color", "#000000");
			$("#" + mbId + "_adjust").prop("disabled", "");
			$("#" + mbId + "_adjust").prop("attr", "");
			$("#" + mbId + "_adjust").css("color", "#000000");
		}
	}

	//セット適用ボタンの状態を設定
	smpSetMateriaSetButtons(jqs);
}

function smpCreateLimitParamHTML(jqs, limitInfo) {
	//NOTE このへんから実装は limit_info.js にもあるので注意
	var ret = "";
	var paramList = getLimitParamList();
	var isHQ = jqs.setting.targetHQ;
	var data = jqs.setting.targetData;

	ret = "<table class='limitParam' cellpadding='4' cellspacing='0'>";

	ret += "<tr class='lp_header'>";
	for (var i = 0;i < 2;i++) {
		ret += "" + 
				"<td class='lp_name'>" + ""+ "</td>" + 
				"<td class='lp_base'>" + ml_pl_base + "</td>" +
				"<td class='lp_add'>" + ml_pl_add + "</td>" +
				"<td class='lp_limit'>" + ml_pl_limit+ "</td>";
	}
	ret += "</tr>";

	var isOpen = false;
	for (var i in paramList) {
		var p = paramList[i];
		if (i % 2 == 0) {
			ret += "<tr>";
			isOpen = true;
		}
		var key = p + (isHQ ? "_hq" : "_nq");
		var baseValue = (null != data[key] ? data[key].replace("+", "") : "");
		var limitValue = (null != limitInfo[p] ? limitInfo[p] : "");

		ret += sprintf(
			"<td class='lp_name' x-param='{3}' x-base='{4}' x-limit='{5}'>{0}</td>" + 
			"<td class='lp_base'>{1}</td>" +
			"<td class='lp_add'></td>" +
			"<td class='lp_limit'>{2}</td>", [
			showBonusList[p],
			baseValue,
			limitValue,
			p,
			baseValue,
			limitValue
		]);

		if (i % 2 == 1) {
			ret += "</tr>";
			isOpen = false;
		}
	}
	if (isOpen) {
		ret += "<td colspan='4'></td></tr>";
	}
	ret += "</table>";

	//自動設定
	var checkedAutoMateria0 = (0 == config["autoMateriaMode"] ? " checked" : "");
	var checkedAutoMateria1 = (1 == config["autoMateriaMode"] ? " checked" : "");
	var checkedAutoMateria2 = (2 == config["autoMateriaMode"] ? " checked" : "");
	ret += sprintf(
		"<div class='auto_materia'>" + 
		"<input type='button' value='{0}' class='control_general' onclick='setAutoMateria(\"{1}\")'>" + 
		"<input type='radio' name='auto_materia_rad' id='{1}_auto_materia_0' value='0' {2} onclick='onClickAutoMateriaMode(0)'><label for='{1}_auto_materia_0'>{5}</label>" + 
		"<input type='radio' name='auto_materia_rad' id='{1}_auto_materia_1' value='1' {3} onclick='onClickAutoMateriaMode(1)'><label for='{1}_auto_materia_1'>{6}</label>" + 
		"<input type='radio' name='auto_materia_rad' id='{1}_auto_materia_2' value='2' {4} onclick='onClickAutoMateriaMode(2)'><label for='{1}_auto_materia_2'>{7}</label>" + 
		"</div>", [
		ml_am_auto,
		jqs.dataId,
		checkedAutoMateria0,
		checkedAutoMateria1,
		checkedAutoMateria2,
		ml_am_full,
		ml_am_hole,
		ml_am_noja
	]);


	return ret;

}
function onChangeMateria(e) {
	calcLimitParam();
}
function onChangeMateriaAdjust(e) {
	calcLimitParam();
}
function calcLimitParam() {

	//マテリア設定の取得／強化値の数値化
	//mat_dodge-3 のような値になっている
	var addParamMap = {};
	for (var i = 0;i < 5;i++) {
		var matInfo = $("#materia_" + i).val();
		var adjustValue = Number($("#materia_" + i + "_adjust").val());
		if ("" != matInfo && "-" != matInfo) {
			var tmp = matInfo.split("-");
			if (2 == tmp.length) {
				var key = tmp[0];
				var index = Number(tmp[1]);
				var bonusKey = targetJqs.materiaData[key].effect;
				var bonusValue = targetJqs.materiaData[key].values[index];
				if (null == addParamMap[bonusKey]) {
					addParamMap[bonusKey] = 0;
				}
				addParamMap[bonusKey] += bonusValue;
				addParamMap[bonusKey] += adjustValue;
			}
		}
	}

	//強化値の反映
	$(".limitParam tr").each(function() {
		var tr = $(this);
		var tdList = $("td", tr);

		for (var i = 0;i <= 4;i += 4) {
			//パラメタキー
			var bonusKey = $(tdList.get(i)).attr("x-param");
			if (null == bonusKey) {
				continue;
			}

			//初期値
			var baseValue = Number($(tdList.get(i)).attr("x-base"));
			var limitValue = Number($(tdList.get(i)).attr("x-limit"));

			//強化値設定
			var addValue = "";
			var textClass = "v_add_ok";
			if (null != addParamMap[bonusKey]) {
				addValue = Number(addParamMap[bonusKey]);
				if (addValue + baseValue > limitValue) {
					textClass = "v_add_over";
				}
			}
			$(tdList.get(i + 2)).html("<span class='" + textClass + "'>" + addValue + "</span>");
		};
	});

}


//セット適用ボタン状態設定
function smpSetMateriaSetButtons(jqs) {
	for (var i = 0;i < 3;i++) {
		var btnId ="mps_set_apply_" + i;
		if ("" != jqs.setting.targetId && null != materiaSet && null != materiaSet[jqs.setting.targetId] && null != materiaSet[jqs.setting.targetId][i]) {
			$("#" + btnId).removeAttr("disabled");
		} else {
			$("#" + btnId).attr("disabled", "disabled");
		}
	}
}

//スマホ用マテリア選択初期化
function smpInitMateriaList(jqs) {

	//option群作成
	var materiaOptionsHTML = "<option value='' selected>-</option>";
	for (var i in jqs.materiaData) {
		var data = jqs.materiaData[i];
		for (var j = 0;j < data["values"].length;j++) {
			if (0 == data["values"][j]) {
				continue;
			}
			//天眼「の」マテリガ
			optionName = data["name"] + ("jp" == lang ? "の" : " ") + jqs.materiaLevelNameList[j];
			optionName += " (" + data["effect_name"] + "+" + data["values"][j] + ")";
			optionValue = i + "-" + j;
			materiaOptionsHTML += sprintf("<option value='{0}'>{1}</option>", [optionValue, optionName]);
		}
	}
	//調整用option群作成
	var adjustOptionsHTML = "";
	for (var i = -9;i <= 9;i++) {
		adjustOptionsHTML += sprintf("<option value='{0}'{1}>{2}{3}</option>", [
			i,
			(0 == i ? " selected" : ""),
			(i > 0 ? "+" : ""),
			i
		]);
	}

	//設定
	for (var i = 0;i < 5;i++) {
		$("#materia_" + i).html(materiaOptionsHTML);
		$("#materia_" + i + "_adjust").html(adjustOptionsHTML);
	}

	//イベント設定
	for (var i = 0;i < 5;i++) {
		$("#materia_" + i).on("change", onChangeMateria);
		$("#materia_" + i + "_adjust").on("change", onChangeMateriaAdjust);
	}

	smpIsInitMateria = true;
}
//マテリア順序変更
function smpUpdateMateriaOrder(jqs, obj) {
	var jqs = targetJqs;

	//順序決定
	var limitList = getLimitParamList();
	var orderList = [];
	for (var i in limitList) {
		var limitParam = limitList[i];
		for (var key in jqs.materiaData) {
			if (jqs.materiaData[key].effect == limitParam) {
				orderList.push(key);
				break;
			}
		}
	}

	for (var key in jqs.materiaData) { //mat_xxx
		if (-1 == orderList.indexOf(key)) {
			orderList.push(key);
		}
	}

	//既存の options をリスト化
	var optionMap = {};
	var blankOption = $("option", $(obj))[0];
	$("option", $(obj)).each(function() {
		var v = $(this).val();
		if ("" == v) {
			return;
		}
		var tmp = v.split("-");
		if (null == optionMap[tmp[0]]) {
			optionMap[tmp[0]] = [];
		}
		optionMap[tmp[0]][Number(tmp[1])] = $(this);
	});

	//HTML再構築
	var html = "";
	html += $(blankOption).prop("outerHTML");
	for (var i = 0;i < orderList.length;i++) {
		var mat = orderList[i];

		for (var j in optionMap[mat]) {
			html += $(optionMap[mat][j]).prop("outerHTML");
		}
	}

	$(obj).html(html);
}

//------------------------------------------------------
//スマホ版ボーナスパラメタ
function smpSetBonusParams() {
	location.hash = "#show_bonusparam";
}
function smpSetBonusParamsMain() {

	//戻るボタン時処理登録
	smpReturnFunc = new Function("smpOnClickCancelBP()");

	//対象とスクロール位置記憶
	smpScrollTop = getScrollTop();

	//全体を非表示
	$("#all_area").hide();

	//ボーナスパラメタ設定
	smpCreateBonusParams();

	//リスト表示
	$("#bonus_parameter").show();
	//location.hash = "#show_bonus";
	window.scrollTo(0, 1);

	return true;
}
function smpCreateBonusParams() {

	var valueOptions = "";
	for (var i = 0;i <= 35;i++) {
		valueOptions += "<option value=\"" + i + "\">" + i + "</option>";
	}
	for (key in pbList) {
		$("#bp_" + key).html(valueOptions);
		$("#bp_" + key).val(pbList[key]);
	}

	var level  = Number($("#general_filter_level_to").val());
	var jobClass = $("#general_filter_jobclass").val();
	var maxPB = 0;

	if (-1 != classMap[jobClass]["classes"].indexOf(ml_gatherer) ||
		-1 != classMap[jobClass]["classes"].indexOf(ml_crafter)) {
		//ギャザクラはボーナスなし
		maxPB = 0;
	} else {
		//戦闘職のみ計算
		maxPB = pbMaxList[level];
	}
	$("#bp_sum").text(maxPB);
}
//OK
function smpOnClickOKBP() {

	//最大値計算
	var level  = Number($("#general_filter_level_to").val());
	var jobClass = $("#general_filter_jobclass").val();
	var maxPB = 0;

	if (-1 != classMap[jobClass]["classes"].indexOf(ml_gatherer) ||
		-1 != classMap[jobClass]["classes"].indexOf(ml_crafter)) {
		//ギャザクラはボーナスなし
		maxPB = 0;
	} else {
		//戦闘職のみ計算
		maxPB = (level < 10 ? 0 : (2 + Math.floor((level - 10 + 2) / 2)) + (level < 37 ? 0 : Math.floor((level - 35) / 2)));
	}

	var calcPB = maxPB;
	//上から順に適用
	for (key in pbList) {
		var val = Number($("#bp_" + key).val());
		if (val <= calcPB) {
			pbList[key] = val;
			calcPB -= val;
		} else {
			val = calcPB;
			pbList[key] = val;
			calcPB = 0;
		}
	}
	isForce = false;
	showPBs();
	calcParameter();
	calcItemLevelAverage();
	calcSortValueSum();
	smpHideBonusParams();
}
//キャンセル
function smpOnClickCancelBP() {
	smpHideBonusParams();
}
function smpHideBonusParams() {
	$("#all_area").show();
	$("#bonus_parameter").hide();
	location.hash = "";
	window.scrollTo(0, smpScrollTop);
	smpReturnFunc = null;
}

//------------------------------------------------------
//スマホ版ノウス設定

//表示
function smpSetNovusParam(rollId, id) {
	smpTmpNVRollId = rollId;
	smpTmpNVId = id;
	location.hash = "#show_novus";
}
function smpSetNovusParamMain() {
	var rollId = smpTmpNVRollId;
	var id = smpTmpNVId;

	//戻るボタン時処理登録
	smpReturnFunc = new Function("smpOnClickCancelNP()");

	//アイテムデータ確認
	var itemDetail = null;
	//設定確認
	for (var i in itemData.data[rollId]) {
		tmp = itemData.data[rollId][i];
		if (tmp["id"] == id) {
			itemDetail = tmp;
			break;
		}
	}
	if (null == itemDetail) {
		return;
	}
	this.novusId = id;

	//スクロール位置記憶
	smpScrollTop = getScrollTop();

	//全体を非表示
	$("#all_area").hide();

	//フォーム設定
	smpCreateNovusForm(itemDetail);

	//リスト表示
	$("#novus_parameter").show();
	//location.hash = "#show_novus_parameter";
	window.scrollTo(0, 1);

	return;
}

//フォーム設定
function smpCreateNovusForm(itemDetail) {

	var novusInfo = novusList[itemDetail["id"]];

	//名前
	$("#np_name").text(itemDetail["name"]);

	//合計上限
	$("#np_sum_max").text(novusInfo["limit"]);

	//ドロップダウン初期化
	var ddHTMLMap = [];
	for (var key in novusParamLimit[novusInfo["type"]]) {
		var maxValue = novusParamLimit[novusInfo["type"]][key];
		var ddHTML = "";
		if (null != ddHTMLMap[maxValue]) {
			ddHTML = ddHTMLMap[maxValue];
		} else {
			for (var i = 0;i <= maxValue;i++) {
				ddHTML += "<option value=\"" + i + "\">" + i + "</option>";
			}
			ddHTMLMap[maxValue] = ddHTML;
		}
		$("#np_" + key + "_value").html(ddHTML);
		$("#np_" + key + "_max").text(maxValue);
	}

	//初期値設定
	isForce = true;
	for (var i in novusParamKeys) {
		var npKey = novusParamKeys[i];
		var npValue = getNovusParamConfig(itemDetail["id"], npKey);
		$("#np_" + npKey + "_value").val(npValue);
	}
	isForce = false;
	smpUpdateNP();

	return;
}
//値変更
function smpUpdateNP() {
	if (isForce) {
		return;
	}
	var sum = 0;
	for (var i in novusParamKeys) {
		var npKey = novusParamKeys[i];
		var npValue = $("#np_" + npKey + "_value").val();
		sum += Number(npValue);
	}
	$("#np_sum").text(sum);

	var limit = Number($("#np_sum_max").text());
	if (sum > limit) {
		$("#np_sum").addClass("np_limit_over");
	} else {
		$("#np_sum").removeClass("np_limit_over");
	}
}

//リセット
function smpOnClickResetNP() {
	isForce = true;
	for (var i in novusParamKeys) {
		var npKey = novusParamKeys[i];
		$("#np_" + npKey + "_value").val(0);
	}
	isForce = false;
	smpUpdateNP();
}

//OK
function smpOnClickOKNP() {
	//適用前に値を整理
	var restValue = Number($("#np_sum_max").text());
	var newValueMap = [];
	for (var i in novusParamKeys) {
		var npKey = novusParamKeys[i];
		var npValue = $("#np_" + npKey + "_value").val();
		if (npValue <= restValue) {
			restValue -= npValue;
		} else {
			npValue = restValue;
			restValue = 0;
		}
		newValueMap[npKey] = Number(npValue);
	}

	//設定
	for (var key in newValueMap) {
		var value = newValueMap[key];
		setNovusParamConfig(this.novusId, key, value);
	}

	//適用
	calcParameter();
	calcItemLevelAverage();
	calcSortValueSum();

	//クローズ
	smpHideNovusParam();
}
//キャンセル
function smpOnClickCancelNP() {
	smpHideNovusParam();
}
function smpHideNovusParam() {
	$("#all_area").show();
	$("#novus_parameter").hide();
	//location.hash = "#return_main";
	location.hash = "";
	window.scrollTo(0, smpScrollTop);
	smpReturnFunc = null;
}


//------------------------------------------------------
//スマホ版係数設定

//表示
function smpShowCoef() {
	location.hash = "#show_coef";
}
function smpShowCoefMain() {
	//戻るボタン時処理登録
	smpReturnFunc = new Function("smpOnClickCancelCoef()");

	//スクロール位置記憶
	smpScrollTop = getScrollTop();

	//一時データの用意
	tmpCoefJobClass = "";
	tmpUserCoefData = {};

	$.extend(tmpUserCoefData, userCoefData);

	//全体を非表示
	$("#all_area").hide();

	//フォーム設定＞全体初期化時に実施済
	//初期ジョブクラス選択
	var jobClass = $("#general_filter_jobclass").val();
	$("#cform_jobclass").val(jobClass);

	//選択値のデータを設定
	smpOnChangeCoefJobClass();

	//現在の選択データを登録
	tmpCoefJobClass = jobClass;

	//リスト表示
	$("#coef_form").show();
	window.scrollTo(0, 1);

	return;
}

//ジョブクラス選択
function smpOnChangeCoefJobClass() {
	//強制選択時は無視
	if (isForce) {
		return;
	}

	//この時点でJobClassは既に変更されている可能性がある
	//そのため、直前に変更した時の値を利用して、仮登録を行う。
	smpApplyTmpCoefData();

	//値切り替え
	var jobClass = $("#cform_jobclass").val();
	smpUpdateCoefJobClass(jobClass);

	//適用準備（次のジョブクラス変更時に利用）
	tmpCoefJobClass = jobClass;
}

//指定のジョブクラスに値を切り替える
function smpUpdateCoefJobClass(jobClass) {

	//選択中のジョブクラスに応じて画面表示を変更
	//一旦全部 0 にする
	$("#coef_form input[type='text']").each(function() {
		$(this).val("0");
	});

	//採用するデータを決定
	var spList = {};

	if (null != tmpUserCoefData[jobClass]) {
		//ユーザデータが存在するならばそれを採用
		spList = tmpUserCoefData[jobClass];

	} else if (null != classMap[jobClass]) {
		//デフォルトデータが存在するならば、それを採用
		spList = classMap[jobClass]["spList"];

	} else {
		//いずれも存在しないのであれば空データを採用
		//未設定のときのユーザ設定係数がこれに該当する
	}

	//画面表示
	for (var i in spList) {
		for (var key in spList[i]) {
			var value = spList[i][key];
			var formKey = "#cform_" + key;
			$(formKey).val(value);
		}
	}
}

//適用処理
function smpApplyTmpCoefData() {
	//PC版と同じ処理
	applyTmpCoefData();
}

//リセット
function smpOnClickResetCoef() {
	//PC版と同じ処理
	onResetCoef();
}

//OK
function smpOnClickOKCoef() {
	//選択中のものを適用
	applyTmpCoefData();

	//保存
	//読み込み時と逆にtmpから反映する
	userCoefData = {};
	$.extend(userCoefData, tmpUserCoefData);

	saveCoefData();

	//クローズ
	smpHideCoef();
}
//キャンセル
function smpOnClickCancelCoef() {
	smpHideCoef();
}
function smpHideCoef() {
	$("#all_area").show();
	$("#coef_form").hide();
	location.hash = "";
	window.scrollTo(0, smpScrollTop);
	smpReturnFunc = null;
}

//------------------------------------------------------
//スマホ版必要命中

//表示
function smpShowAcr() {
	location.hash = "#show_acr";
}
function smpShowAcrMain() {
	//戻るボタン時処理登録
	smpReturnFunc = new Function("smpOnClickCancelAcr()");

	//スクロール位置記憶
	smpScrollTop = getScrollTop();

	//全体を非表示
	$("#all_area").hide();

	//リスト表示
	$("#acr_table").show();
	window.scrollTo(0, 1);

	return;
}

//OK
function smpOnClickOKAcr() {
	//クローズ
	smpHideAcr();
}
//キャンセル
function smpOnClickCancelAcr() {
	smpHideAcr();
}
function smpHideAcr() {
	$("#all_area").show();
	$("#acr_table").hide();
	location.hash = "";
	window.scrollTo(0, smpScrollTop);
	smpReturnFunc = null;
}

//------------------------------------------------------
//スマホ版装備詳細ポップアップ
//イベント設定
function smpInitEquipImageEvents() {
	for (i in equipSelectorList) {
		var baseId = equipSelectorList[i];
		var imageId = "image_" + baseId;
		$("#" + imageId).on("click", function(e) {smpShowItemDetailOnImage(e);});
	}
}
//表示開始
function smpShowItemDetailOnImage(e) {
	smpItemDetailTarget = e;
	location.hash = "#show_equip_detail";
}
function smpShowItemDetailOnImageMain(e) {

	//表示キャンセル処理だけは先にチェック
	if (null == smpItemDetailTarget || null == smpItemDetailTarget.target) {
		return;
	}
	var imageId = smpItemDetailTarget.target.id;
	if ("" == imageId) {
		return;
	}

	var id = imageId.substr(6);
	var jqs = jqsEquipList[id];
	if (null == jqs) {
		return;
	}

	//戻るボタン時処理登録
	smpReturnFunc = new Function("smpOnClickCancelAcr()");

	//スクロール位置記憶
	smpScrollTop = getScrollTop();

	//全体を非表示
	$("#all_area").hide();

	//PC版で一通り処理する
	showItemDetailOnImage(smpItemDetailTarget);

	//位置調整等

	//リスト表示
	$("#popup_equip_detail").show();
	window.scrollTo(0, 1);

	return;

}

//キャンセル
function smpOnClickCancelPED() {
	smpHidePED();
}
function smpHidePED() {
	$("#all_area").show();
	$("#popup_equip_detail").hide();
	location.hash = "";
	window.scrollTo(0, smpScrollTop);
	smpReturnFunc = null;
}

//------------------------------------------------------
//スマホ版共有お気に入り
function smpClickFW() {
	var textDataB64 = $("#fw_list").val();
	if (undefined == textDataB64 || "" == textDataB64) {
		return;
	}
	var data = null;
	try {
		//デコード
		var jsonText = Base64.decode(textDataB64);
		data = JSON.parse(jsonText);
		console.log(data);
		showFavoriteData(data);
	} catch (e) {
		console.log(e);
		//alert("データの再生に失敗しました。");
	}
}
