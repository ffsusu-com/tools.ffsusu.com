//lang.jp.js

var paramKeyMap = {
	"命中力": "bonus_hit",
	"暴击": "bonus_crit",
	"信念": "bonus_will",
	"招架发动力": "bonus_dodge",
	"技能速度": "bonus_skill_speed",
	"咏唱速度": "bonus_spell_speed",

	"获得力": "bonus_gain",
	"鉴别力力": "bonus_quality",
	"采集力": "bonus_gp",
	"作业精度": "bonus_work",
	"制作力": "bonus_cp",
	"加工精度": "bonus_edit",

	"力量": "bonus_str",
	"耐力": "bonus_vit",
	"灵巧": "bonus_dex",
	"智力": "bonus_int",
	"精神": "bonus_mnd",
	"信仰": "bonus_pie",

	"火": "bonus_fire",
	"冰": "bonus_ice",
	"风": "bonus_wind",
	"土": "bonus_earth",
	"雷": "bonus_lightning",
	"水": "bonus_water",
};

var langBaseParam = {
};
var langTextMap = {
};

//JP
var ml_materia_adjust = "调整";
var ml_materia_noselect = "无魔晶石";
var ml_randomparam_nostatus = "未设定状态";
var ml_meal_noselect = "无食物";
var ml_meal_limit = "上限";
var ml_meal_apply = "应用";
var ml_meal_best = "最佳";
var ml_param_sort_value = "基准值";
var ml_param_sort_value_materia = "已有魔晶石";
var ml_set_bonus = "套装效果";
var ml_sanction = "批准中";
var ml_loading = "数据读取中...(数据量较大,请耐心等待)";
var ml_loading_failure = "数据读取失败.....";
var ml_ldst_notfound_key = "输入的网址已失效,请检查网址是否正确。";
var ml_ldst_notfound = "指定页面不存在。";
var ml_ldst_analyze_failure = "页面解析失败";
var ml_ldst_analyze_level = "等级";
var ml_generate_url = "链接生成中...";
var ml_generate_url_failure = "分享链接生成失败....";
var ml_title = "FF14配装模拟器";
var ml_generate_none = "未生成";
var ml_base_param = "基本属性";
var ml_equip_disabled = "不能装备";
var ml_god = "守护神";
var ml_fighter = "战斗精英";
var ml_sor = "魔法导师";
var ml_crafter = "能工巧匠";
var ml_gatherer = "大地使者";
var ml_acr = "命中力";
var ml_crit = "暴击";
var ml_will = "信念";
var ml_parry = "招架发动力";
var ml_arc = "弓箭手";
var ml_brd = "吟游诗人";
var ml_rog = "双剑士";
var ml_nin = "忍者";

var ml_mch = "机工士";
var ml_ast = "占星术士";
var ml_drk = "暗黑骑士";
var ml_pld = "圣骑士";
var ml_war = "战士";
var ml_gla = "剑术师";
var ml_mrd = "斧术士";
var ml_sch = "学者";

var ml_skill_speed = "技能速度";
var ml_zan = "斩击耐性";
var ml_totsu = "突刺耐性";
var ml_da = "打击耐性";
var ml_spell_speed = "咏唱速度";
var ml_gain = "获得力";
var ml_quality = "鉴别力";
var ml_work = "作业精度";
var ml_edit = "加工精度";
var ml_bonus = "加成属性";
var ml_subarm = "副手";
var ml_pld = "圣骑士";
var ml_set1_regist = "登陆为套装1";
var ml_set2_regist = "登陆为套装2";
var ml_set3_regist = "登陆为套装3";
var ml_set1_apply = "应用套装1";
var ml_set2_apply = "应用套装2";
var ml_set3_apply = "应用套装3";
var mt_materia_set_regist_ok = "登陆套装成功！";
var ml_html5 = "请使用支持HTML5的浏览器。";

var ml_ilv_default = "平均装等：- [-]";
var ml_ilv_format = "平均装等：{0} [详细等级{1}]";
var ml_sort_format = "{0}合计 : {1}";

var ml_acr_progress_wait = "套装属性计算中……";
var ml_acr_failure = "没有满足指定命中的套装。";

var ml_sort_user = "排序用";
var ml_general_noselect = "无";
var ml_cannot_select_multihardpoints = "<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有多个独占装备，不可固定。]";

var ml_equip_list_current = "现在的装备";
var ml_equip_list_selected = "选择中的装备";
var ml_equip_list_name = "名称";
var ml_equip_list_sort_value = "基准";
var ml_equip_list_aa_abbr = "物AA";
var ml_equip_list_unselect = "(装备解除)";

var ml_equip_target_filter = "当前过滤条件";
var ml_equip_target_checked = "已选择的装备";
var ml_equip_target_rings_default = "拥有多个戒指";
var ml_equip_target_rings_force_exrare = "只拥有一个戒指";

var ml_favorite_add_complete = "「{0}」已收藏";
var ml_favorite_delete_confirm = "确定要删除收藏「{0}」吗？";

var ml_eqc_select_job = "请选择职业。";
var ml_eqc_select_equip = "请指定装备群的条件。";

var ml_favorite_personal = "⇒个人用";
var ml_favorite_world = "⇒全体通用";

var ml_mat_type_btl = "战斗";
var ml_mat_type_gatcrf = "生产采集";
var ml_mat_type_atr = "属性";
var ml_mat_out = "移出";
var ml_mat_cancel = "取消";

var ml_ne_materia = "不能禁断";

var ml_pl_base  = "初期";
var ml_pl_add   = "強化";
var ml_pl_limit = "上限";

var ml_am_auto = "自动设定";
var ml_am_full = "全强化";
var ml_am_hole = "纯伍型";
var ml_am_noja = "无伍型";

var ml_materia = "魔晶石";
var ml_materia_manual = "手动";
var ml_materia_auto_full = "全强化";
var ml_materia_auto_middle = "纯伍型";
var ml_materia_auto_min = "无伍型";


// *****************************************************************
// *****************************************************************
// *****************************************************************

function getMateriaDataByLang() {
	return mergeMateriaBaseData({
		"mat_hit": {"name" : "神眼", "effect_name": "命中力"},
		"mat_crit": {"name" : "武略", "effect_name": "暴击"},
		"mat_will": {"name" : "雄略", "effect_name": "信念"},
		"mat_dodge": {"name" : "刚柔", "effect_name": "招架"},
		"mat_skill_speed": {"name" : "战技", "effect_name": "技速"},
		"mat_spell_speed": {"name" : "咏唱", "effect_name": "咏速"},

		"mat_str": {"name" : "刚力", "effect_name": "力量"},
		"mat_vit": {"name" : "耐力", "effect_name": "耐力"},
		"mat_dex": {"name" : "巧力", "effect_name": "灵巧"},
		"mat_int": {"name" : "智力", "effect_name": "智力"},
		"mat_mnd": {"name" : "意力", "effect_name": "精神"},
		"mat_pie": {"name" : "信力", "effect_name": "信仰"},
		
		"mat_gain": {"name" : "达识", "effect_name": "获得力"},
		"mat_quality": {"name" : "博识", "effect_name": "鉴别力"},
		"mat_gp": {"name" : "器识", "effect_name": "采集力"},
		"mat_work": {"name" : "名匠", "effect_name": "作业精度"},
		"mat_cp": {"name" : "魔匠", "effect_name": "制作力"},
		"mat_edit": {"name" : "巨匠", "effect_name": "加工精度"},

		"mat_fire": {"name" : "创火", "effect_name": "火"},
		"mat_ice": {"name" : "创冰", "effect_name": "冰"},
		"mat_wind": {"name" : "创风", "effect_name": "风"},
		"mat_earth": {"name" : "创土", "effect_name": "土"},
		"mat_lightning": {"name" : "创雷", "effect_name": "雷"},
		"mat_water": {"name" : "创水", "effect_name": "水"},
	});
}
function getMateriaLevelNameListByLang() {
	return ["魔晶石壹型", "魔晶石贰型", "魔晶石叁型", "魔晶石肆型", "魔晶石伍型"];
}
function getMateriaLevelNameAbbrListByLang() {
	return ["壹", "贰", "叁", "肆", "伍"];
}

