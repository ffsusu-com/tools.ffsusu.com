var typeName = {
	'bronco': '野马级',
	'invincible': '无敌级',
	'enterprise': '企业级',
	'invincible2': '无敌级Ⅱ级',
	'odyssey': '奥德赛级',
	'tatanora': '塔塔诺拉级',
	'Viltgance': '威尔特甘斯级'
};
var bonus = {
	'bronco': 80,
	'invincible': 94,
	'enterprise': 108,
	'invincible2': 122,
	'odyssey': 136,
	'tatanora': 150,
	'Viltgance': 164
};
var typePenalty = {
	'bronco': -10,
	'invincible': -14,
	'enterprise': -18,
	'invincible2': -22,
	'odyssey': -26,
	'tatanora': -30,
	'Viltgance': -34
};
var cost = {
	'bronco': 3,
	'invincible': 6,
	'enterprise': 11,
	'invincible2': 16,
	'odyssey': 21,
	'tatanora': 26,
	'Viltgance': 31
};
var capacity = 12;
var totalcost = 0;

function init() {
  changeRank(document.getElementById("rank").value,0);
  changeTable();
}

function changeRank(rank,i) {
	var newRank = Number(rank) + Number(i);
	if(newRank>50) { newRank = 50; } else if(newRank<1) { newRank = 1; }
	capacity = newRank + 11;
	document.getElementById("rank").value = String(newRank) ;
	document.getElementById("maxcap").innerHTML = totalcost + "/" +capacity ;
	if(totalcost > capacity) {
		document.getElementById("capover").innerHTML = "[重量已超标]";
	} else {
		document.getElementById("capover").innerHTML = " ";
	}
}

function changeTable() {
	var hull       = document.getElementById("hull").value;
	var rigging    = document.getElementById("rigging").value;
	var forecastle = document.getElementById("forecastle").value;
	var aftcastle  = document.getElementById("aftcastle").value;
	totalcost = cost[hull] + cost[rigging] + cost[forecastle] + cost[aftcastle] ;
	document.getElementById("hull-result").innerHTML       = "<th>船体</th><th>" + typeName[hull]       + "</th><td>0</td><td>0</td><td>0</td><td>" + bonus[hull] +"</td><td>" + typePenalty[hull] + "</td><td>" + cost[hull] + "</td>";
	document.getElementById("rigging-result").innerHTML    = "<th>气囊</th><th>" + typeName[rigging]    + "</th><td>0</td><td>" + typePenalty[rigging] +"</td><td>" + bonus[rigging] +"</td><td>"+ typePenalty[rigging] +"</td><td>0</td><td>" + cost[rigging] + "</td>";
	document.getElementById("forecastle-result").innerHTML = "<th>船首</th><th>" + typeName[forecastle] + "</th><td>" + bonus[forecastle] + "</td><td>0</td><td>0</td><td>0</td><td>" + bonus[forecastle] + "</td><td>" + cost[forecastle] + "</td>";
	document.getElementById("aftcastle-result").innerHTML  = "<th>船尾</th><th>" + typeName[aftcastle]  + "</th><td>" + typePenalty[aftcastle] + "</td><td>" + bonus[aftcastle] + "</td><td>" + typePenalty[aftcastle] + "</td><td>0</td><td>0</td><td>" + cost[aftcastle] + "</td>";
	document.getElementById("sum").innerHTML  = "<th>合計</th><td> </td><td>" + (bonus[forecastle] + typePenalty[aftcastle]) + "</td><td>" + (bonus[aftcastle] + typePenalty[rigging]) + "</td><td>" + (bonus[rigging] + typePenalty[aftcastle]) + "</td><td>"+(bonus[hull] + typePenalty[rigging])+"</td><td>"+(bonus[forecastle] + typePenalty[hull]) + "</td><td>" + totalcost + "</td>";
	document.getElementById("maxcap").innerHTML = totalcost + "/" +capacity;
	if(totalcost > capacity) {
		document.getElementById("capover").innerHTML = "[重量已超标]";
	} else {
		document.getElementById("capover").innerHTML = " ";
	}
}