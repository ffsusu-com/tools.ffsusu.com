/* 以下皆为魔法 */

/* 注意：本程序中的“随机”都是伪随机概念，以当前的天为种子。 */
function random(dayseed, indexseed) {
	var n = dayseed % 11117;
	for (var i = 0; i < 100 + indexseed; i++) {
		n = n * n;
		n = n % 11117;   // 11117 是个质数
	}
	return n;
}

var today = new Date();
var iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();


var weeks = ["日","一","二","三","四","五","六"];
var directions = ["东方","南方","北方","西方","东北方","东南方","西北方","西南方","马桶","洗手池","最近的高楼","天花板","路由器","地板","滑板鞋店","村头王师傅的理发店"];
var activities = [
	//{name:"prpr%t", good:"",bad:""},
	//{name:"%v\"", good:"",bad:""},
	{name:"10连抽", good:"移民欧洲不是梦！",bad:"别跑了大酋长接你回非洲了"},
	{name:"刷御魂", good:"",bad:""},
	{name:"刷觉醒材料", good:"",bad:""},
	{name:"打年兽", good:"",bad:""},
	{name:"刷式神碎片", good:"",bad:""},
	{name:"石距", good:"个个御魂都6星",bad:"队友全都带狗粮"},
	{name:"百鬼夜行", good:"SSR碎片在召唤",bad:""},
	{name:"刷狗粮", good:"",bad:""},
	{name:"斗技", good:"",bad:""},
	{name:"氪金", good:"买买买，别犹豫",bad:"荷包大破中"},
	{name:"单抽", good:"单抽SSR，人品爆满",bad:"铁鼠铁鼠铁鼠"},
];

var specials = [
	{date:20180213 , name:'点小纸人进入活动任务<br>探索额外加成'},
	{date:20180214 , name:'点小纸人进入活动任务<br>探索额外加成'},
	{date:20180215 , name:'点小纸人进入活动任务  /  每日签到获祝福  /  19,20,21点领奖<br>探索额外加成  /  跨年倒计时有好礼'},
	{date:20180216 , name:'点小纸人进入活动任务  /  每日签到获祝福  /  19,20,21点领奖<br>探索额外加成  /  年兽冷却降低+额外金币奖励'},
	{date:20180217 , name:'点小纸人进入活动任务  /  每日签到获祝福  /  19,20,21点领奖<br>探索额外加成  /  年兽冷却降低+额外金币奖励'},
	{date:20180218 , name:'点小纸人进入活动任务  /  每日签到获祝福  /  19,20,21点领奖<br>探索额外加成  /  年兽冷却降低+额外金币奖励'},
	{date:20180219 , name:'点小纸人进入活动任务  /  每日签到获祝福  /  19,20,21点领奖<br>探索额外加成  /  年兽冷却降低+额外金币奖励'},
	{date:20180220 , name:'点小纸人进入活动任务  /  每日签到获祝福  /  19,20,21点领奖<br>探索额外加成  /  年兽冷却降低+额外金币奖励'},
	{date:20180221 , name:'点小纸人进入活动任务  /  每日签到获祝福<br>年兽冷却降低+额外金币奖励'},
	{date:20180222 , name:'点小纸人进入活动任务<br>年兽冷却降低+额外金币奖励'},
	{date:20180223 , name:'点小纸人进入活动任务<br>年兽冷却降低+额外金币奖励'},
	{date:20180224 , name:'点小纸人进入活动任务<br>'},
	{date:20180225 , name:'点小纸人进入活动任务<br>'},
	{date:20180228 , name:'点小纸人进入活动任务<br>'},
	{date:20180227 , name:'点小纸人进入活动任务<br>'},
	{date:20180228 , name:'点小纸人进入活动任务<br>'},
	{date:20180301 , name:'点小纸人进入活动任务<br>'},
	{date:20180302 , name:'点小纸人进入活动任务<br>'},
];

//逢魔之时开始
var fengmo = ["胧车","荒骷髅","地震鲶","土蜘蛛","荒骷髅","地震鲶","胧车"];
//逢魔之时结束

//御魂开始
var yuhun =["全部御魂","网切 鸣屋 地藏像 雪幽魂","狰 三味 招财猫 涅槃之火","被服 魅妖 阴摩罗 魍魉之匣","针女 树妖 反枕 心眼","破势 镜姬 钟灵 日女巳时","全部御魂"];
//御魂结束

//%t取值
var tools = ["岛村卯月","涩谷凛","本田未央","赤城米莉亚","安娜史塔西亚","绪方智绘里","神崎兰子","城崎莉嘉","多田李衣菜","新田美波","双叶杏","前川未来","三村加奈子","诸星琪拉莉"];

//%v取值
var varNames = ["Im@s", "Im@s", "Im@s", "Im@s", "Im@s", "Im@s"];

var places = ["公交车上","卧室中","厕所门口","背挂挂画","地铁站","更衣室","图书馆","客厅里","大街上"];

var drinks = ["躺着","半蹲","平躺","跪着","坐沙发","正坐","趴着","倒立","侧卧","压腿","一字马","坐椅子"];

var lucky = ["顺从我的召唤前来，现身吧！","空间中的冰精灵呀，将你们的力量汇聚到我手中，现！","El Psy Congroo","以吾之声，唤汝之名，现身吧！","爆裂吧现实！粉碎吧精神！Vanishment This World! ","高唱一曲Go my way","开窗大声唱僕光"];

var luckyshishen = ["卖药郎","薰","虫师","山风","小袖之手","弈","御馔津","日和坊","奴良陆生","追月神","数珠","玉藻前","百目鬼","雪童子","兔丸","书翁","小松丸","彼岸花","匣中少女","鸩","以津真天","金鱼姬","万年竹","荒","椒图","座敷童子","雨女","山兔","独眼小僧","兵俑","狸猫","萤草","食发鬼","般若","妖琴师","镰鼬","桃花妖","吸血姬","雪女","惠比寿","姑获鸟","烟烟罗","辉夜姬","茨木童子","白童子","黑童子","古笼火","夜叉","青坊主","一目连","妖刀姬","樱花妖","丑时之女","络新妇","首无","花鸟卷","饿鬼","武士之灵","巫蛊师","童女","铁鼠","跳跳妹妹","跳跳弟弟","蝴蝶精","食梦貘","判官","孟婆","傀儡师","海坊主","鬼使黑","鬼使白","骨女","凤凰火","二口女","青行灯","大天狗","鬼女红叶","妖狐","白狼","鲤鱼精","阎魔","小鹿男","酒吞童子","荒川之主","跳跳哥哥","童男","九命猫","管狐","三尾狐","犬神","青蛙瓷器","觉","山童","鸦天狗","河童","清姬","两面佛"];

function getTodayString() {
	return "今天是" + today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日 星期" + weeks[today.getDay()];
}

function getTodayfengmo() {
	return "逢魔之时鬼王 ："  + "  " + fengmo[today.getDay()];
}

function getTodayyuhun() {
	return yuhun[today.getDay()];
}

function star(num) {
	var result = "";
	var i = 0;
	while (i < num) {
		result += "★";
		i++;
	}
	while(i < 5) {
		result += "☆";
		i++;
	}
	return result;
} 

// 生成今日运势
function pickTodaysLuck() {
  var _activities = filter(activities);
    
	var numGood = random(iday, 99) % 3 + 2;
	var numBad = random(iday, 89) % 3 + 2;
	var eventArr = pickRandomActivity(_activities, numGood + numBad);
	
	var specialSize = pickSpecials();
	
	for (var i = 0; i < numGood; i++) {
		addToGood(eventArr[i]);
	}
	
	for (var i = 0; i < numBad; i++) {
		addToBad(eventArr[numGood + i]);
	}
}

// 去掉一些不合今日的事件
function filter(activities) {
    var result = [];
    
    // 周末的话，只留下 weekend = true 的事件
    if (isWeekend()) {
        
        for (var i = 0; i < activities.length; i++) {
            if (!activities[i].weekend) {
                result.push(activities[i]);
            }
        }
        
        return result;
    }
    
    return activities;
}

function isWeekend() {
    return today.getDay() == 0 || today.getDay() == 6;
}

// 添加预定义事件
function pickSpecials() {
	var specialSize = [0,0];
	
	for (var i = 0; i < specials.length; i++) {
		var special = specials[i];
		
		if (iday == special.date) {
			specialSize[0]++;
			return special.name;
			} else {
				specialSize[1]++;
				return "今日无事发生";
		}
	}
	
	return specialSize;
}

// 从 activities 中随机挑选 size 个
function pickRandomActivity(activities, size) {
	var picked_events = pickRandom(activities, size);
	
	for (var i = 0; i < picked_events.length; i++) {
		picked_events[i] = parse(picked_events[i]);
	}
	
	return picked_events;
}

// 从数组中随机挑选 size 个
function pickRandom(array, size) {
	var result = [];
	
	for (var i = 0; i < array.length; i++) {
		result.push(array[i]);
	}
	
	for (var j = 0; j < array.length - size; j++) {
		var index = random(iday, j) % result.length;
		result.splice(index, 1);
	}
	
	return result;
}

// 解析占位符并替换成随机内容
function parse(event) {
	var result = {name: event.name, good: event.good, bad: event.bad};  // clone
	
	if (result.name.indexOf('%v') != -1) {
		result.name = result.name.replace('%v', varNames[random(iday, 12) % varNames.length]);
	}
	
	if (result.name.indexOf('%t') != -1) {
		result.name = result.name.replace('%t', tools[random(iday, 11) % tools.length]);
	}
	

	if (result.name.indexOf('%l') != -1) {
		result.name = result.name.replace('%l', (random(iday, 12) % 247 + 30).toString());
	}
	
	return result;
}

// 添加到“宜”
function addToGood(event) {
	$('.good .content ul').append('<li><div class="name">' + event.name + '</div><div class="description">' + event.good + '</div></li>');
}

// 添加到“不宜”
function addToBad(event) {
	$('.bad .content ul').append('<li><div class="name">' + event.name + '</div><div class="description">' + event.bad + '</div></li>');
}


$(function(){
	$('.event').html(pickSpecials());
	$('.date').html(getTodayString());
	$('.fengmo').html(getTodayfengmo());
	$('.yuhun').html(getTodayyuhun());
	$('.direction_value').html(directions[random(iday, 2) % directions.length]);
	$('.places_value').html(pickRandom(places,1).join(','));
	$('.drink_value').html(pickRandom(drinks,1).join('，'));
	$('.lucky_value').html(pickRandom(lucky,1).join('，'));
	$('.luckyshishen_value').html(pickRandom(luckyshishen,2).join('，'));
	$('.goddes_value').html(star(random(iday, 6) % 5 + 1));
	
	pickTodaysLuck();
});