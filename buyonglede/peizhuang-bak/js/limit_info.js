/**
 * 変数定義
 */

//上限値定義マップ
var paramLimitMap = {};

//上限値定義用元ネタマップ
var baseParamLimitList = [
{"idList": "8f4a19d3704,9d9f8be677b,b58fc6ea1ef,a71571b630b,de4f436a856,978a7c52bb6,b7ab9f32137,76e76f0f693,7538b7ebb9b,2d33a6eeabc,4eb8b65a075,f766720d7a9,4a1885d45d6,1ec4c8ec963,34222f9d5fd,ab67ff4e305,fdee4b26752,bbe0fee88f0,a51c336d336,01c0f86d047,bb2da84d428", "isHQ": 1, "level": 0, "limitBattle": "62,59,68", "limitGather": "", "limitCrafter": ""},
{"idList": "1f9dcebe79a,eb4059bd1e5,2a1d904ecbe,af0793d5590,8c7c071d00c,1ffba5c6779,1e1ebc97e6a,3562e22fdb9,6fe8bd2cb15,d16ea248b92,af161e38e8a,1be1d8cf0cd,e15ea2cc251,4465ea5c749", "isHQ": 1, "level": 0, "limitBattle": "100,96,110", "limitGather": "", "limitCrafter": ""},
{"idList": "29360f15d6b,96a76aeb7e5,5b382e9e22b,9fca434d16d,1b5f958e969,1e5b9af25e4,91f90bfceed,24f1ce83bbf,2a075f182c4,2622c9896dd,3301fd22912,8fffcc757c0,4e67a324d0d,0d7e76f997c,63d3a9cd7c3,45c40566d89,6857bb3572b,28635ebb614,e947c1a41bf,67706825108,7568d076d30,5db25fa2c73,3359dd9399c,4c38582c0d8,7244be1d2f1,b652d857673,7608a8b785e,", "isHQ": 1, "level": 0, "limitBattle": "46,44,51", "limitGather": "", "limitCrafter": ""},
{"idList": "c3bf3bdcaa8,467008a37ed,3791466e455,b795ae4b67f,22adf7c1869,9432df19bc7,e630177f7bf,7b5b6347b91", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "", "limitCrafter": "360,193,4"},
{"idList": "fd0acfa0f6a,84f4e751d19,c10b1dc2a4a,0f492792474,47ee3712014,67cc40bbdbf,0912b92dcfe,413dde9c417", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "", "limitCrafter": "360,193,4"},
{"idList": "36e238c163a", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "", "limitCrafter": "10,94,4"},
{"idList": "3523794b4f6", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "", "limitCrafter": "299,94,4"},
{"idList": "f9be495d48a", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "", "limitCrafter": "10,94,4"},
{"idList": "38d8b176758", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "", "limitCrafter": "10,94,4"},
{"idList": "23137cbc8cb", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "", "limitCrafter": "10,94,4"},
{"idList": "34c3788efe5", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "", "limitCrafter": "10,94,4"},
{"idList": "3066a10b974", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "", "limitCrafter": "10,9,54"},
{"idList": "99cfff727dd", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "", "limitCrafter": "10,9,54"},
{"idList": "760db8978a7", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "", "limitCrafter": "10,9,54"},
{"idList": "382a58d590f", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "", "limitCrafter": "10,9,28"},
{"idList": "4aba15507e7,04b41697e7e,b95c435c262", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "333,190,5", "limitCrafter": ""},
{"idList": "e59f6445dd3,72162c8cf0a", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "190,333,5", "limitCrafter": ""},
{"idList": "b97fbd40f84", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "9,184,5", "limitCrafter": ""},
{"idList": "cd691e5e146", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "184,92,5", "limitCrafter": ""},
{"idList": "e1e6c1c22b6", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "138,9,5", "limitCrafter": ""},
{"idList": "d6089d19bb5", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "9,46,5", "limitCrafter": ""},
{"idList": "0fb41ebfe9e", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "92,9,5", "limitCrafter": ""},
{"idList": "5a464176363", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "9,92,5", "limitCrafter": ""},
{"idList": "135c8f77636", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "9,9,66", "limitCrafter": ""},
{"idList": "f20596a95b1", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "9,9,66", "limitCrafter": ""},
{"idList": "63ce969d533", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "9,9,66", "limitCrafter": ""},
{"idList": "251d4a93615", "isHQ": 1, "level": 0, "limitBattle": "", "limitGather": "9,9,34", "limitCrafter": ""},
{"idList": "24d899483e6", "isHQ": 0, "level": 0, "limitBattle": "88,84,0", "limitGather": "", "limitCrafter": ""},
{"idList": "ad323e74da8", "isHQ": 0, "level": 0, "limitBattle": "86,83,0", "limitGather": "", "limitCrafter": ""},
{"idList": "b1c6d15927f,950575cbc5e", "isHQ": 0, "level": 0, "limitBattle": "84,80,0", "limitGather": "", "limitCrafter": ""},
{"idList": "06c0b471506,43701d82274", "isHQ": 0, "level": 0, "limitBattle": "81,78,0", "limitGather": "", "limitCrafter": ""},
{"idList": "800938c0313,bed333cc995,ea22c406cb5,44af99e4bb1,c2ff24580c6,2015dbe725f,e8b12f39fe3,3e4db0574a4,151fccb4209,f1769e3960e,ce9771a3dde,3731fb355bd", "isHQ": 0, "level": 0, "limitBattle": "123,118,128", "limitGather": "", "limitCrafter": ""},
{"idList": "8aa023cd585,b2beeb8e0c4,234774173b2,f96b8102cc3,a97b9c789c4,8f3e9612d4d,492567de8e6,9e9981da777,be42d4cf2f1,819dfb046da,df25e068579,6ed13d4f0a7", "isHQ": 0, "level": 0, "limitBattle": "120,115,126", "limitGather": "", "limitCrafter": ""},
{"idList": "7c68a29865e,37fbdd207bd,6070a45f91b,ad2348d0955,64dff08221f,bd47dcab987,28b6da4caf6,13bbfb815f2,840b7b92261,ce66b39576d,24389d7384e,8368cd8de3d,40243389226,98d449ca3c7,d6825707d0b,de4de7e7379,57a662c5110,330e5c7c6cd,c856a4b5590,bdf32ae39eb,75ad3902050,72df5c1200b,d3f4e6ef955,77dd8524db1", "isHQ": 0, "level": 0, "limitBattle": "117,112,124", "limitGather": "", "limitCrafter": ""},
{"idList": "89c3dd92c16,fbfce68001c,88fc4968d5f,847e9c202b5,c9bddd593c7,f2329d74204,bec358e8127,572d7866aef,385b30ff4f1,655737debee,4e20be26050,e58fd666db8,5b05fa40d7b,7c17e2fb326,21ff587cc28,4ea3e8322a6,21f3e652c0a,0af19d2eca5,0cabb9e95d8,ffb8d1496aa,8a067a660ac,059b13eaa9d,149c26b4cc1,54434f22130", "isHQ": 0, "level": 0, "limitBattle": "114,109,123", "limitGather": "", "limitCrafter": ""},
{"idList": "9632af5a6c8", "isHQ": 0, "level": 0, "limitBattle": "35,34,0", "limitGather": "", "limitCrafter": ""},
{"idList": "752e18277a1", "isHQ": 0, "level": 0, "limitBattle": "34,33,0", "limitGather": "", "limitCrafter": ""},
{"idList": "d3d941b58df,2c8f1dc1ddf", "isHQ": 0, "level": 0, "limitBattle": "33,32,0", "limitGather": "", "limitCrafter": ""},
{"idList": "a339954f590,71ff4167ccf", "isHQ": 0, "level": 0, "limitBattle": "33,31,0", "limitGather": "", "limitCrafter": ""},
{"idList": "dd875f5a94c,1ca91716d99,971326bb0a4,b54252c9a4b,fb45578ffb3,84a69e6ea8b,4d6e2d52f85,18f4e786b1a,e97b336bfd5,a6de7bd8546,7c9636838b8,5e4e3a55d7d,ddd96e9f963,cdb123e18ab", "isHQ": 0, "level": 0, "limitBattle": "69,66,72", "limitGather": "", "limitCrafter": ""},
{"idList": "5563a91b4d9,7d629567d2a,81d67133bab,f8e99e0b242,1262ac6d176,9acb171b2b9,d941d073d08,1031f67e587,5c03435ed5f,8e38551587e,e6563f0fc9b,cb740bc4a6b,6863c232f45,039edf840ed", "isHQ": 0, "level": 0, "limitBattle": "65,62,70", "limitGather": "", "limitCrafter": ""},
{"idList": "ddfbcb554a7,8f5e27f3ec6,aa27c326781,c57d2f9879f,2403842072b,535c4ecce11,cb9f797a332,052d3169cf8,150e0b5440f,3ad1fe96e0c,bb13c89eb83,47016404e7b,f70114cc45d,4e76a4eae3a", "isHQ": 0, "level": 0, "limitBattle": "112,107,117", "limitGather": "", "limitCrafter": ""},
{"idList": "a33b3dd34ee,08baf3def76,b2fd3afaf43,be41c92fcac,68fb1b673df,4287f0b2f9b,d6760410a66,dcb439b5874,bac657830c2,3ab65fd7d53,ed7f1b82f32,8f27942426c,f0212f48b80,37fcf41ef60", "isHQ": 0, "level": 0, "limitBattle": "106,101,114", "limitGather": "", "limitCrafter": ""},
{"idList": "2a1daf94172,2c36e8f846d,e71a5255e62,d3be9d17a87,a3de43a1321,e475679da5a,418fcda4fc7,f836681e32b,22a28c591d0,986004cc256,a28d19ae9ed,e9585f64432,b9104ca3ec6,4ea274407f5", "isHQ": 0, "level": 0, "limitBattle": "69,66,72", "limitGather": "", "limitCrafter": ""},
{"idList": "6498e554eab,5d06a8473a9,edab50eb3ec,5fec3ac009a,c6de34c5818,d8a18ff965f,5942571fb4b,3a4585ea017,710046a20e6,a8784473eac,9f2c4f5391c,25db3d4e921,f4f4d209056,5f9bc7976f6", "isHQ": 0, "level": 0, "limitBattle": "65,62,70", "limitGather": "", "limitCrafter": ""},
{"idList": "943f93be60b,64e204bb993,b86d2109662,fc41d2f7677,9216ddaf537,5f0d93c342e,813d9d2181c,3e532a37c8c,4d36eda2457,3105b56a82c,2ae3194a5f4,236e07b3b60,db2273ecdc5,542c8dd1703,3ad988911f9,96be409e0eb,a6ff9c23347,e5f829c6f42,c18dcc2b5a6,41161127970,60bf8dead3f,364b99ee8e8,dcd5de78a5e,268ddaca5f3,749e142cdc8,b3106e316b7,07c86f29603,2d85b6bf22a,5b9e2f032e1,f81ac9f2dc3,e4e59c0f3d2,d98f6062dac,3e230392df3,877e09f3214,b2d58a7ff8c,88f41a6462d,0ef9e2e7989,e351de00afb,5123d4d5b49,621d39d8b14,46afd6c0372,6e741cf8966,ff5f8463752,c824896fb49,df022a40da2,d4d5fef6497,18d63daf543,57a1cd5eec6,a363a26fa2f,9be4f99315c,29eab72af49,6af51ee1da7,ad46e9792d3,2fb648bdada", "isHQ": 0, "level": 0, "limitBattle": "51,49,54", "limitGather": "", "limitCrafter": ""},
{"idList": "4c29e271a75,e25fb40e387,1a2d43c5ad5,442f1513829,0d179810d01,a14286fe3fa,090020b9984,109ac42f9f3,dd980a389e8,62cd6f59db5,8353859118f,62de365e497,d1c25a8bda5,d7316f99e76,35ca0c6854b,a9d7acdc562,b95d6a26d90,1b54510f090,8d3448cc260,736bec6113e,082dd5f8c9d,9c464783dea,904ae89a55f,cf77690a357,e8e37828f11,6585854b4d9,2b1a9db2bf3,e8fbe291d7a,4e4d729c77b,645d9f72de8,eea7c21a1c7,2f7026373e3,a85654d9f6b,4a6c67fa275", "isHQ": 0, "level": 0, "limitBattle": "49,47,53", "limitGather": "", "limitCrafter": ""},
{"idList": "31aa0c0a24a,0a59146e47d,c17fe831bde,5ef1ca84fd6,8b384510e46,1c5f9df0160,044ca99244e,898b057d9f5,7802e9ba3ac,bdada3ed63d,f3f0466caf1,e03566cdf10,8c07df2dcdf,5c1f46bf10d", "isHQ": 0, "level": 0, "limitBattle": "112,107,117", "limitGather": "", "limitCrafter": ""},
{"idList": "d0ddcdb4d75,e3e2d661575,8c0e4f02698,74ba1f41a4e,e806d33e352,f399b847b56,189de7e2f70,7053215f046,a3868c28d1c,11edfa294de,27d27443eff,8bb8ef03e40,41d397885df,30f4d11404c", "isHQ": 0, "level": 0, "limitBattle": "106,101,114", "limitGather": "", "limitCrafter": ""},
{"idList": "e020385e7ad,68aeabc6226,712c4ab5a15,9d294661951,05a29416cfb,d53ab7efab1,a0ade9352e3,358529f4f67,f1c004c4911,48bad389717,0888380b9c8,e5fb5846892,4e834e12623,62407161411", "isHQ": 0, "level": 0, "limitBattle": "69,66,72", "limitGather": "", "limitCrafter": ""},
{"idList": "6afc9713bf1,fa51093bbe9,2bd084dc4bb,13aa56ebead,399d7fd3cf2,769f7ba2604,8a1e5cd9bef,77878acf221,86d35460516,6f1ba20aa0c,ac46ec68b4f,efe21326188,9fed19fc7f9,4a3401a4dc2", "isHQ": 0, "level": 0, "limitBattle": "65,62,70", "limitGather": "", "limitCrafter": ""},
];

//上限値定義用元ネタマップその２
/*
	limitで詳細なパラメタの上限を設定
	str			STR		0
	dex			DEX		1
	vit			VIT		2
	int			INT		3
	mnd			MND		4
	pie			PIE		5
	命中		ACC		6
	受け流し	PAR		7
	クリ		CRT		8
	意思		DET		9
	スキスピ	SKS		10
	スぺスピ	SPS		11
*/
var baseParamLimitList2 = [
/*
{"idList": "60bcb72ddb1,60bcb72ddb1,9f4fb8d913a,e5090816d42", "limit": "108,108,154,108,155,130,126,126,126,122,126,126"},
{"idList": "399bbf7d7cd,399bbf7d7cd,d86d6152cee,5e20aa8eb5a,12b9e8e9acd,5c33c229f06,1e8d160c60c", "limit": "113,113,161,113,162,132,129,129,129,124,129,129"},
{"idList": "60f9b07849e,60f9b07849e,dc56e213991,c2701b35c74", "limit": "118,118,169,118,169,134,133,133,133,126,133,133"},
{"idList": "6bb04bd2d9d,6bb04bd2d9d,1f41e0a01bd,57ddd977b4b", "limit": "128,128,184,128,182,138,139,139,139,133,139,139"},
{"idList": "a0424a260fb,a41277bfd1d,2eccb3d7a28", "limit": "132,132,192,132,189,140,142,142,142,136,142,142"},
{"idList": "ed1c844e20b,5c7132e21d6", "limit": "108,108,154,155,108,91,126,126,126,122,126,126"},
{"idList": "769f7c0e7c5,d4bd5664378,7e8b1fe5036,40b9497badd,0916daa19bb,72d129619b1,769f7c0e7c5,d4bd5664378,7e8b1fe5036,40b9497badd,0916daa19bb,72d129619b1", "limit": "62,62,88,89,62,52,72,72,72,69,72,72"},
{"idList": "3611ebec32a,f07b5622276,dd98fa0f270,f9ed24a2bfb,36be6799bf4,3611ebec32a,f07b5622276,dd98fa0f270,f9ed24a2bfb,36be6799bf4", "limit": "101,101,143,144,101,85,117,117,117,113,117,117"},
{"idList": "2d37802ec65,57224d9ae24,a8c68f76241,34365c8c80d,22af576a667,155396ff6c1,ea59e175657,f8ceab11c31,84f53c569dd,5e7450672bc,2d37802ec65,57224d9ae24,a8c68f76241,34365c8c80d,22af576a667,155396ff6c1", "limit": "46,46,66,66,46,39,54,54,54,52,54,54"},
{"idList": "ed74f0cf2bf,9ff8167f7ea,c4a09682cc6,d6c83bf16da", "limit": "113,113,161,162,113,92,129,129,129,124,129,129"},
{"idList": "cc8197a192e,72612ddce31", "limit": "118,118,169,169,118,94,133,133,133,126,133,133"},
{"idList": "bf98f36ccc9,26874df47cf,86468e7bce6,bf98f36ccc9,26874df47cf,86468e7bce6", "limit": "67,67,96,96,67,54,76,76,76,72,76,76"},
{"idList": "4a9c27c1c9b,28a286be1a8,4a9c27c1c9b,28a286be1a8", "limit": "110,110,157,157,110,87,123,123,123,117,123,123"},
{"idList": "f28bbd2dddd,23d9cbffc2c,c3f7e934b02,12d47d46e06,b68e1dac0e7,f28bbd2dddd,23d9cbffc2c,c3f7e934b02,12d47d46e06,b68e1dac0e7", "limit": "51,51,72,72,51,40,57,57,57,54,57,57"},
{"idList": "dc9dc779a2b,87841e8d401", "limit": "128,128,184,182,128,96,139,139,139,133,139,139"},
{"idList": "6db36ced67a,cd9b24d0b62,dd01601f032,1e6f3a1da2a,cca16e412ae,576cb50771e,6db36ced67a,cd9b24d0b62,dd01601f032,1e6f3a1da2a,cca16e412ae,576cb50771e", "limit": "73,73,105,104,73,55,79,79,79,76,79,79"},
{"idList": "aa4886e9979,c1ec14616ad,fedc4a096d6,e575193d19d,aa4886e9979,c1ec14616ad,fedc4a096d6,e575193d19d", "limit": "118,118,171,169,118,90,129,129,129,123,129,129"},
{"idList": "7358717a913,894a76813ed,75f61408d47,278b8bdbea5,4a3f4b416b1,72a6fd72151,4a0f6298049,e17cced7bb6,996f786323b,aa056a58dae,7358717a913,894a76813ed,75f61408d47,278b8bdbea5,4a3f4b416b1,72a6fd72151,4a0f6298049,e17cced7bb6,996f786323b,aa056a58dae", "limit": "55,55,79,78,55,41,59,59,59,57,59,59"},
{"idList": "ab6a716c3b1,7908c06648e", "limit": "132,132,192,189,132,98,142,142,142,136,142,142"},
{"idList": "466627fdaa4,466627fdaa4", "limit": "111,77,122,77,77,65,90,90,90,87,90,90"},
{"idList": "e25042c9725,7b9e54f0e17,0e6634b0f57,814a9383968,26c6c1deccc,82746f480df,323624e9a10,183cd9d5265,1945a50c1b7,538ee918450,156d5f7c94e,c5a15469e87,624afe4fbd7,756280a3110,4c6cd14fe26,79a77b236b5,b252c562620,171b654207f,e25042c9725,7b9e54f0e17,0e6634b0f57,814a9383968,26c6c1deccc,82746f480df", "limit": "89,62,98,62,62,52,72,72,72,69,72,72"},
{"idList": "f133575e1a4,369cc1ccac6,753596193fc,c8118b9c0c9,d146ac25de7,1d2c9eb811a,1aff9a6e93a,8bc9af31442,29768595773,c869486c2af,ea9f38962aa,7939f247bae,bb29dc14e17,2a77bd949be,ff385d368d3,f133575e1a4,369cc1ccac6,753596193fc,c8118b9c0c9,d146ac25de7", "limit": "144,101,159,101,101,85,117,117,117,113,117,117"},
{"idList": "c9e0ea90012,39bc280d714,a7b1fd3fede,ae75a283fc6,f66eaac6bc3,fd1aa3331f7,0f0a3f25731,e567cf24d03,da78a43fcab,05e653f5f59,047ca559def,a91a55138d8,a9c2a96d5f5,4c9722f68a1,a6776cd2cd8,5baa26f557e,e55126bf56a,56b0a4e6c84,b8746203862,88e31d04cc1,6c4d7d6f718,3e569ae7b81,c9e0ea90012,39bc280d714,a7b1fd3fede,ae75a283fc6,f66eaac6bc3,fd1aa3331f7,0f0a3f25731,e567cf24d03,da78a43fcab,05e653f5f59", "limit": "66,46,73,46,46,39,54,54,54,52,54,54"},
{"idList": "f4785eb3658,f4785eb3658,74213ffb04e", "limit": "116,81,128,81,81,66,92,92,92,89,92,92"},
{"idList": "9f5190cd612,9f5190cd612", "limit": "121,84,134,84,84,67,95,95,95,90,95,95"},
{"idList": "6df36dbeff9,a8c5cbdc510,45e93451e58,183602c2ab9,5934c1143eb,fa3a30e631f,dc183d7cb11,887e781fa63,ac59ef4588f,6df36dbeff9,a8c5cbdc510,45e93451e58", "limit": "96,67,107,67,67,54,76,76,76,72,76,76"},
{"idList": "c260d47783e,271f43a5fa0,abcf995f324,8faabe031a8,f7a495aae7a,9c7d613d23f,c260d47783e,271f43a5fa0", "limit": "157,110,174,110,110,87,123,123,123,117,123,123"},
{"idList": "5cf5f74fff2,0b7a57e0d1c,f19d90460a7,aef0ad2caa6,33efc0a1fcc,29805e82366,e98034a221d,d42f42e52e9,71a45f3e396,6f5849b21fa,535b15181cb,5cf5f74fff2,0b7a57e0d1c,f19d90460a7,aef0ad2caa6,33efc0a1fcc,29805e82366,e98034a221d,d42f42e52e9,71a45f3e396", "limit": "72,51,80,51,51,40,57,57,57,54,57,57"},
{"idList": "4f92afc31df,4f92afc31df", "limit": "130,91,146,91,91,69,99,99,99,95,99,99"},
{"idList": "029c442d8b4,031b45fd233,7c356710087,64d3c73714c,270cb27aa8c,2658eeb20e6,7a08f9a4f2b,71e106f0f65,3289f663d74,28e1b2a511b,8be65602479,1a49052a1df,2d45b143cfc,dd8600603ca,19092366e35,f4d36828332,212850d7836,c58c58cb66f,029c442d8b4,031b45fd233,7c356710087,64d3c73714c,270cb27aa8c,2658eeb20e6", "limit": "104,73,117,73,73,55,79,79,79,76,79,79"},
{"idList": "7bc5e2f57ce,1a6cc0f3e95,f5bd38079fe,4336802e39a,c1942bb0ea6,56def42b1a1,0caf31cbfe9,17bca68f767,393178da34b,3659190b17f,f91c47eae8a,954facf737c,7bc5e2f57ce,1a6cc0f3e95,f5bd38079fe,4336802e39a", "limit": "169,118,190,118,118,90,129,129,129,123,129,129"},
{"idList": "89ffd276a3a,e9d7826afe1,6607574d59d,eac2895bb2d,51d32b794b8,d68b523d023,9a427be7207,1762d9cc23b,ea05a65c347,ee3a2ee1009,1b2f98be1f5,6f732872f59,5ba8d98d64c,dbf03bc3eed,b2a17582a1e,c6e224e1d66,c8da7edf87d,efcd39f9ec4,9641461e22f,89fe046958c,167ac4cb82b,c40a0f12f5c,89ffd276a3a,e9d7826afe1,6607574d59d,eac2895bb2d,51d32b794b8,d68b523d023,9a427be7207,1762d9cc23b,ea05a65c347,ee3a2ee1009,1b2f98be1f5,6f732872f59,5ba8d98d64c,dbf03bc3eed,b2a17582a1e,c6e224e1d66,c8da7edf87d,efcd39f9ec4", "limit": "78,55,88,55,55,41,59,59,59,57,59,59"},
{"idList": "e7ab75486d7", "limit": "135,94,152,94,94,70,101,101,101,97,101,101"},
{"idList": "9bee069b4af,c4d9e791b06,953cf1af4e8,af822408ea5", "limit": "155,108,171,108,108,91,126,126,126,122,126,126"},
{"idList": "2dd28d0bd2c,55fb8bddcc6,842e0a00245,fcf537b34de,1a62119551a,6fc64e6fcd5,c5e1e419fe0,47d7df0bb65", "limit": "162,113,179,113,113,92,129,129,129,124,129,129"},
{"idList": "44fd72c64bc,a364a4b4793,676e7c1e1e9,3da456cfd4e", "limit": "169,118,188,118,118,94,133,133,133,126,133,133"},
{"idList": "46d0b102097,86fb37f6d44,2be3df178f5,b9d1d1f0d26", "limit": "182,128,204,128,128,96,139,139,139,133,139,139"},
{"idList": "e7d51159021,2705b332348,99709502d75,c67f42d3736", "limit": "189,132,213,132,132,98,142,142,142,136,142,142"},
{"idList": "49ac4064f76,112123b698f,048acfd1d9f,49ac4064f76,112123b698f,048acfd1d9f", "limit": "67,67,96,67,96,77,76,76,76,72,76,76"},
{"idList": "1f35f89c3c7,a78b864f49a,1f35f89c3c7,a78b864f49a", "limit": "110,110,157,110,157,124,123,123,123,117,123,123"},
{"idList": "0176c3796c7,69270df4b22,138f12fd7de,9d6ca1941d9,a2dd25f0698,0176c3796c7,69270df4b22,138f12fd7de,9d6ca1941d9,a2dd25f0698", "limit": "51,51,72,51,72,57,57,57,57,54,57,57"},
{"idList": "50bb934365c,825e086729d,28f61bce520,5cfdd97686d,0f1f0eacb81,31998f29f3f,50bb934365c,825e086729d,28f61bce520,5cfdd97686d,0f1f0eacb81,31998f29f3f", "limit": "73,73,105,73,104,79,79,79,79,76,79,79"},
{"idList": "f1539834b14,2e8588a32eb,c2efe190f90,ae98f5448d3,f1539834b14,2e8588a32eb,c2efe190f90,ae98f5448d3", "limit": "118,118,171,118,169,128,129,129,129,123,129,129"},
{"idList": "2583514098b,23c482f7f46,91d7369c7d2,1f711304a6d,b5076d1c939,f81d4af18a7,2c66ecb709f,ea699e55fe6,146c8738167,d939e7fb170,2583514098b,23c482f7f46,91d7369c7d2,1f711304a6d,b5076d1c939,f81d4af18a7,2c66ecb709f,ea699e55fe6,146c8738167,d939e7fb170", "limit": "55,55,79,55,78,59,59,59,59,57,59,59"},
{"idList": "9b7975c39f1,3c3a12a59c6,8793768fd1f,72135b7b0a3,674ba6fd629,1ce88e0fc6b,72135b7b0a3,674ba6fd629,1ce88e0fc6b,9b7975c39f1,3c3a12a59c6,8793768fd1f", "limit": "62,62,88,62,89,74,72,72,72,69,72,72"},
{"idList": "b354bfbe39e,0daa14c6ff3,b4b5cb93252,f7190568302,610eeee64fa,b4b5cb93252,f7190568302,b354bfbe39e,0daa14c6ff3,610eeee64fa", "limit": "101,101,143,101,144,121,117,117,117,113,117,117"},
{"idList": "f2e8462c42c,be62ebe3eea,c8c87e6d61c,13045c2b2ed,da0cd209a93,484736dd85f,fa5695b08f2,b2f8b3f6dee,55dff3513a1,a95ec582826,484736dd85f,f2e8462c42c,be62ebe3eea,c8c87e6d61c,13045c2b2ed,da0cd209a93", "limit": "46,46,66,46,66,56,54,54,54,52,54,54"},
{"idList": "e62cf449dd3,2a42e432193,cfcdd2c3f9c,429a6fe5f50,e2551fcd6df,8b98419f5fa,6e1def958d9,57222fb66a4,cced3600b65,14ba65a9cb8,e0322fa4a9b,00fec346407", "limit": "46,66,73,46,46,39,54,54,54,52,54,54"},
{"idList": "caff0c03af6,ec21b176835", "limit": "108,155,171,108,108,91,126,126,126,122,126,126"},
{"idList": "fbf540297ec,bb569ef677e,f9ab07a4a70,ef938a6bb49,0005a39bebc,aedf6d97108,de59d00f458,8b408e9d924,0f169fd429a,932ea4730fc,e9bf1e9f18a,53d503120c9", "limit": "62,89,98,62,62,52,72,72,72,69,72,72"},
{"idList": "d5d66ac3003,e318626b6aa,336fae93db1,f02e6eb0505,d692c927bb9,4465a12dc6d,ff89f62195d,9bbc8f7d757,4ab0ecf683a,21f1e3f79cf", "limit": "101,144,159,101,101,85,117,117,117,113,117,117"},
{"idList": "e64f9779551,2595f9f0e7f,8ddbdda701b,d3f3810b87d,3c7a413d1dd", "limit": "113,162,179,113,113,92,129,129,129,124,129,129"},
{"idList": "6da32505546,17f4912a495", "limit": "118,169,188,118,118,94,133,133,133,126,133,133"},
{"idList": "79c43770b4c,10dc42f324f,e9d181c54dd,0597e7872cd,ff0843a0709,b45cc814b65", "limit": "67,96,107,67,67,54,76,76,76,72,76,76"},
{"idList": "8db6e078cc8,9801c7cfc5d,43652cfdbed,b5fc9ae6fa7", "limit": "110,157,174,110,110,87,123,123,123,117,123,123"},
{"idList": "2d6679dd1dc,654408f77a7,1cf506cc92c,e177b75a755,bbb7d89f562,adc010bd160", "limit": "51,72,80,51,51,40,57,57,57,54,57,57"},
{"idList": "f0e510395b8,be7801acae1", "limit": "128,182,204,128,128,96,139,139,139,133,139,139"},
{"idList": "76a02bbf69f,b5c05c31542,f77d04a2a1a,4351275beb4,5ad00d9f061,ad5b46c918c,8f10884ca3a,7ee958ea021,553b12419ee,bbe2ce0e676,98fb717f30b,e6e761697d2", "limit": "73,104,117,73,73,55,79,79,79,76,79,79"},
{"idList": "9bc74b17e39,682954ee2b4,4759799f8b5,a9aa00d97b8,53a3f9cea35,2c5948f484b,235e5c93b5c,475b04b87df", "limit": "118,169,190,118,118,90,129,129,129,123,129,129"},
{"idList": "c90d70e9cb9,d33b9785cf3,f30d44c29e4,880fe0c20a0,0a0a567aa98,084ce30914f,abf0862a450,8ed997bbe5d,9a51b0c620b,d0f11d06845,8800f50a4c1,5fdb3679ea6", "limit": "55,78,88,55,55,41,59,59,59,57,59,59"},
{"idList": "6415feb94a9,c61f606cc81,17b5789de8d", "limit": "132,189,213,132,132,98,142,142,142,136,142,142"},
*/
{"idList": "0005a39bebc,0f169fd429a,53d503120c9,8b408e9d924,932ea4730fc,aedf6d97108,bb569ef677e,de59d00f458,e9bf1e9f18a,ef938a6bb49,f9ab07a4a70,fbf540297ec", "limit": "62,89,98,62,62,52,72,72,72,69,72,72"},
{"idList": "00fec346407,14ba65a9cb8,2a42e432193,429a6fe5f50,57222fb66a4,6e1def958d9,8b98419f5fa,cced3600b65,cfcdd2c3f9c,e0322fa4a9b,e2551fcd6df,e62cf449dd3", "limit": "46,66,73,46,46,39,54,54,54,52,54,54"},
{"idList": "0176c3796c7,138f12fd7de,69270df4b22,9d6ca1941d9,a2dd25f0698,eeb1dc1bc6b", "limit": "51,51,72,51,72,57,57,57,57,54,57,57"},
{"idList": "01792e35b61,17f4912a495,6bd599a6025,6da32505546,a2e8660bd5d,c047f4fe2c7", "limit": "118,169,188,118,118,94,133,133,133,126,133,133"},
{"idList": "029c442d8b4,031b45fd233,19092366e35,1a49052a1df,212850d7836,2658eeb20e6,270cb27aa8c,28e1b2a511b,2d45b143cfc,3289f663d74,64d3c73714c,71e106f0f65,7a08f9a4f2b,7c356710087,8be65602479,c58c58cb66f,dd8600603ca,f4d36828332", "limit": "104,73,117,73,73,55,79,79,79,76,79,79"},
{"idList": "030a3a19f88,183602c2ab9,1e248380d6d,1e9c842b1bc,390f9a40516,45e93451e58,58fb42d21ab,5934c1143eb,6df36dbeff9,8720caa02fb,887e781fa63,8c4e514ff97,91028afbda2,a8c5cbdc510,ac59ef4588f,dc183d7cb11,e10b48cdea6,fa3a30e631f", "limit": "96,67,107,67,67,54,76,76,76,72,76,76"},
{"idList": "047ca559def,05e653f5f59,0f0a3f25731,39bc280d714,3e569ae7b81,4c9722f68a1,56b0a4e6c84,5baa26f557e,6c4d7d6f718,88e31d04cc1,a6776cd2cd8,a7b1fd3fede,a91a55138d8,a9c2a96d5f5,ae75a283fc6,b8746203862,c9e0ea90012,da78a43fcab,e55126bf56a,e567cf24d03,f66eaac6bc3,fd1aa3331f7", "limit": "66,46,73,46,46,39,54,54,54,52,54,54"},
{"idList": "048acfd1d9f,112123b698f,44d86f99ab4,49ac4064f76,6d9e9ebf725,8c3620f4cc7", "limit": "67,67,96,67,96,77,76,76,76,72,76,76"},
{"idList": "0597e7872cd,10dc42f324f,2dd1413a1b8,79c43770b4c,8b9c3baf1a9,a86765108eb,ae254617a6b,b45cc814b65,b464e9a21b4,c20da105316,e9d181c54dd,ff0843a0709", "limit": "67,96,107,67,67,54,76,76,76,72,76,76"},
{"idList": "06843a6ff4c,399ded27de8,571554d8dfe,59d5baa1fd4,b2f31bb8a3c", "limit": "53,53,76,53,75,58,58,58,58,56,58,58"},
{"idList": "074497d8883,1ade2159154,f601fa771fe", "limit": "70,70,101,70,100,78,77,77,77,74,77,77"},
{"idList": "084ce30914f,0a0a567aa98,5fdb3679ea6,7f6e5b92975,8800f50a4c1,880fe0c20a0,8ed997bbe5d,9a51b0c620b,abf0862a450,c90d70e9cb9,d0f11d06845,d33b9785cf3,e5f7d329216,f30d44c29e4,f7c1c9748f4,f9f2aec58c6", "limit": "55,78,88,55,55,41,59,59,59,57,59,59"},
{"idList": "0916daa19bb,40b9497badd,72d129619b1,769f7c0e7c5,7e8b1fe5036,d4bd5664378", "limit": "62,62,88,89,62,52,72,72,72,69,72,72"},
{"idList": "09a12a75d24,2779609d141,32c2b08578c,5649cd8b054,6205e3dadf6,8ad666883e4,b06786f999f,c6766eec97e,cc0647453df,f5161a2f82a,fc8a1472c9c", "limit": "75,53,84,53,53,41,58,58,58,56,58,58"},
{"idList": "0a3daa282fd,9f5190cd612", "limit": "121,84,134,84,84,67,95,95,95,90,95,95"},
{"idList": "0b7795d9bc6,1cf506cc92c,2d6679dd1dc,654408f77a7,7485bb337e3,adc010bd160,bbb7d89f562,e177b75a755", "limit": "51,72,80,51,51,40,57,57,57,54,57,57"},
{"idList": "0b7a57e0d1c,29805e82366,33efc0a1fcc,424b733fdeb,535b15181cb,5cf5f74fff2,6f5849b21fa,71a45f3e396,aef0ad2caa6,c68927f62dc,d42f42e52e9,e98034a221d,f19d90460a7,fb745ec5a21", "limit": "72,51,80,51,51,40,57,57,57,54,57,57"},
{"idList": "0caf31cbfe9,17bca68f767,1a6cc0f3e95,3659190b17f,393178da34b,4336802e39a,56def42b1a1,7bc5e2f57ce,954facf737c,c1942bb0ea6,f5bd38079fe,f91c47eae8a", "limit": "169,118,190,118,118,90,129,129,129,123,129,129"},
{"idList": "0d91e95d35e,278b8bdbea5,4a0f6298049,4a3f4b416b1,4dd2877215c,502f80c1d42,72a6fd72151,7358717a913,75f61408d47,894a76813ed,996f786323b,aa056a58dae,d1d1a12ecab,e17cced7bb6", "limit": "55,55,79,78,55,41,59,59,59,57,59,59"},
{"idList": "0daa14c6ff3,610eeee64fa,b354bfbe39e,b4b5cb93252,f7190568302", "limit": "101,101,143,101,144,121,117,117,117,113,117,117"},
{"idList": "0e6634b0f57,156d5f7c94e,171b654207f,183cd9d5265,1945a50c1b7,26c6c1deccc,323624e9a10,4c6cd14fe26,538ee918450,624afe4fbd7,756280a3110,79a77b236b5,7b9e54f0e17,814a9383968,82746f480df,b252c562620,c5a15469e87,e25042c9725", "limit": "89,62,98,62,62,52,72,72,72,69,72,72"},
{"idList": "0e830a15ffa,1607420165f,28a286be1a8,4a9c27c1c9b", "limit": "110,110,157,157,110,87,123,123,123,117,123,123"},
{"idList": "0f1f0eacb81,28f61bce520,31998f29f3f,50bb934365c,5cfdd97686d,825e086729d", "limit": "73,73,105,73,104,79,79,79,79,76,79,79"},
{"idList": "12b9e8e9acd,1e8d160c60c,399bbf7d7cd,5c33c229f06,5e20aa8eb5a,d86d6152cee", "limit": "113,113,161,113,162,132,129,129,129,124,129,129"},
{"idList": "12d47d46e06,23d9cbffc2c,b68e1dac0e7,c3f7e934b02,d78719ba430,f28bbd2dddd", "limit": "51,51,72,72,51,40,57,57,57,54,57,57"},
{"idList": "13045c2b2ed,484736dd85f,55dff3513a1,a95ec582826,b2f8b3f6dee,be62ebe3eea,c8c87e6d61c,da0cd209a93,f2e8462c42c,fa5695b08f2", "limit": "46,46,66,46,66,56,54,54,54,52,54,54"},
{"idList": "1398d63b333,39a6b9647e4,50a5844c3ee,7390d0e195e,afaf601ddec,c3b39e10620", "limit": "70,100,112,70,70,54,77,77,77,74,77,77"},
{"idList": "1405f6bf8f4,1b7e7f27036,315e38bb6d9,60f9b07849e,c2701b35c74,dc56e213991", "limit": "118,118,169,118,169,134,133,133,133,126,133,133"},
{"idList": "146c8738167,1f711304a6d,23c482f7f46,2583514098b,2c66ecb709f,60a80b2bcc7,62b49b76b48,91d7369c7d2,b5076d1c939,d939e7fb170,ea65bc3300f,ea699e55fe6,ee72b965f07,f81d4af18a7", "limit": "55,55,79,55,78,59,59,59,59,57,59,59"},
{"idList": "155396ff6c1,22af576a667,2d37802ec65,34365c8c80d,57224d9ae24,5e7450672bc,84f53c569dd,a8c68f76241,ea59e175657,f8ceab11c31", "limit": "46,46,66,66,46,39,54,54,54,52,54,54"},
{"idList": "167ac4cb82b,1762d9cc23b,1ac80a1a420,1b2f98be1f5,3e0905bdbfb,51d32b794b8,5ba8d98d64c,606a7cae024,6607574d59d,66a9ff5254f,6f732872f59,89fe046958c,89ffd276a3a,9641461e22f,9a427be7207,9d8580564a2,b2a17582a1e,c26aa587e76,c3b5d94d900,c40a0f12f5c,c6e224e1d66,c7d9d80595c,c8da7edf87d,d68b523d023,dbf03bc3eed,e9d7826afe1,ea05a65c347,eac2895bb2d,ee3a2ee1009,efcd39f9ec4", "limit": "78,55,88,55,55,41,59,59,59,57,59,59"},
{"idList": "17b5789de8d,6415feb94a9,c61f606cc81", "limit": "132,189,213,132,132,98,142,142,142,136,142,142"},
{"idList": "1a2990bd73b,26874df47cf,86468e7bce6,bf98f36ccc9,cd244202932,d333faa5e3e", "limit": "67,67,96,96,67,54,76,76,76,72,76,76"},
{"idList": "1a62119551a,2dd28d0bd2c,47d7df0bb65,55fb8bddcc6,6fc64e6fcd5,842e0a00245,c5e1e419fe0,fcf537b34de", "limit": "162,113,179,113,113,92,129,129,129,124,129,129"},
{"idList": "1aff9a6e93a,1d2c9eb811a,29768595773,2a77bd949be,369cc1ccac6,753596193fc,7939f247bae,8bc9af31442,bb29dc14e17,c8118b9c0c9,c869486c2af,d146ac25de7,ea9f38962aa,f133575e1a4,ff385d368d3", "limit": "144,101,159,101,101,85,117,117,117,113,117,117"},
{"idList": "1ce88e0fc6b,3c3a12a59c6,674ba6fd629,72135b7b0a3,8793768fd1f,9b7975c39f1", "limit": "62,62,88,62,89,74,72,72,72,69,72,72"},
{"idList": "1ceca477915,26688570972,43652cfdbed,8db6e078cc8,956dbae8248,9801c7cfc5d,ae27b5dde7e,b5fc9ae6fa7", "limit": "110,157,174,110,110,87,123,123,123,117,123,123"},
{"idList": "1e6f3a1da2a,576cb50771e,6db36ced67a,cca16e412ae,cd9b24d0b62,dd01601f032", "limit": "73,73,105,104,73,55,79,79,79,76,79,79"},
{"idList": "1f35f89c3c7,96b11e75868,a78b864f49a,bdb0b69231f", "limit": "110,110,157,110,157,124,123,123,123,117,123,123"},
{"idList": "1f41e0a01bd,57ddd977b4b,6bb04bd2d9d", "limit": "128,128,184,128,182,138,139,139,139,133,139,139"},
{"idList": "21f1e3f79cf,336fae93db1,4465a12dc6d,4ab0ecf683a,9bbc8f7d757,d5d66ac3003,d692c927bb9,e318626b6aa,f02e6eb0505,ff89f62195d", "limit": "101,144,159,101,101,85,117,117,117,113,117,117"},
{"idList": "231428dbd95,2425791812a,3a7ee7a5cbd,7025514915d", "limit": "175,123,196,123,123,95,136,136,136,130,136,136"},
{"idList": "235e5c93b5c,2c5948f484b,4759799f8b5,475b04b87df,53a3f9cea35,682954ee2b4,9bc74b17e39,a9aa00d97b8", "limit": "118,169,190,118,118,90,129,129,129,123,129,129"},
{"idList": "2595f9f0e7f,3c7a413d1dd,8ddbdda701b,d3f3810b87d,e64f9779551", "limit": "113,162,179,113,113,92,129,129,129,124,129,129"},
{"idList": "2705b332348,99709502d75,c67f42d3736,e7d51159021", "limit": "189,132,213,132,132,98,142,142,142,136,142,142"},
{"idList": "271f43a5fa0,6a29b387a8f,7bea8deb186,8faabe031a8,9c7d613d23f,abcf995f324,c260d47783e,c612da59a85,d679351359d,e1207adf860,f7a495aae7a,ffd46933514", "limit": "157,110,174,110,110,87,123,123,123,117,123,123"},
{"idList": "2a84ff4bba6,77117f684c3,9dcae403bd7,d01dbd08a99", "limit": "114,163,182,114,114,88,126,126,126,121,126,126"},
{"idList": "2be3df178f5,46d0b102097,86fb37f6d44,b9d1d1f0d26", "limit": "182,128,204,128,128,96,139,139,139,133,139,139"},
{"idList": "2c44cd57805,5c7275ecf3e", "limit": "114,114,164,114,163,126,126,126,126,121,126,126"},
{"idList": "2e8588a32eb,ae98f5448d3,c2efe190f90,f1539834b14", "limit": "118,118,171,118,169,128,129,129,129,123,129,129"},
{"idList": "2eccb3d7a28,a0424a260fb,a41277bfd1d", "limit": "132,132,192,132,189,140,142,142,142,136,142,142"},
{"idList": "3062a04f059,71cdea4e86f,8385f6f4aee", "limit": "123,123,176,123,175,136,136,136,136,130,136,136"},
{"idList": "3611ebec32a,36be6799bf4,dd98fa0f270,f07b5622276,f9ed24a2bfb", "limit": "101,101,143,144,101,85,117,117,117,113,117,117"},
{"idList": "3da456cfd4e,44fd72c64bc,580bf49fb86,676e7c1e1e9,a364a4b4793,e3b68249ee7,f7607d58e95,fcdc715f7c7", "limit": "169,118,188,118,118,94,133,133,133,126,133,133"},
{"idList": "4066c88e41f,51da9946081,add7a558697", "limit": "123,175,196,123,123,95,136,136,136,130,136,136"},
{"idList": "4351275beb4,553b12419ee,5ad00d9f061,76a02bbf69f,7ee958ea021,8f10884ca3a,98fb717f30b,ad5b46c918c,b5c05c31542,bbe2ce0e676,e6e761697d2,f77d04a2a1a", "limit": "73,104,117,73,73,55,79,79,79,76,79,79"},
{"idList": "44fda4f4201,5b9ab84142d,7f284656569,950d5878302,b3b9e283265", "limit": "53,53,76,75,53,41,58,58,58,56,58,58"},
{"idList": "454f7d7d25b,68177cf9680,6b73a5d0828,6d3833083a2,9da94dc21ab,9eb5024d320,bd1ce590526,de82eacb21c,e8eec8fa202", "limit": "100,70,112,70,70,54,77,77,77,74,77,77"},
{"idList": "466627fdaa4", "limit": "111,77,122,77,77,65,90,90,90,87,90,90"},
{"idList": "4f92afc31df", "limit": "130,91,146,91,91,69,99,99,99,95,99,99"},
{"idList": "55ff1fe8018,59c6fb24715,72612ddce31,cc8197a192e", "limit": "118,118,169,169,118,94,133,133,133,126,133,133"},
{"idList": "58e3d796fe0", "limit": "48,34,54,34,34,27,38,38,38,36,38,38"},
{"idList": "5c7132e21d6,ed1c844e20b", "limit": "108,108,154,155,108,91,126,126,126,122,126,126"},
{"idList": "5e6894c02fb,6045fb741c7,6bcf8e30579,75f38181386,bd8149534ab,df1684948ba", "limit": "163,114,182,114,114,88,126,126,126,121,126,126"},
{"idList": "60bcb72ddb1,9f4fb8d913a,e5090816d42", "limit": "108,108,154,108,155,130,126,126,126,122,126,126"},
{"idList": "678115fac01,be7801acae1,f0e510395b8", "limit": "128,182,204,128,128,96,139,139,139,133,139,139"},
{"idList": "74213ffb04e,f4785eb3658", "limit": "116,81,128,81,81,66,92,92,92,89,92,92"},
{"idList": "77d6e000225,f6e56a92934", "limit": "123,123,176,175,123,95,136,136,136,130,136,136"},
{"idList": "7908c06648e,ab6a716c3b1", "limit": "132,132,192,189,132,98,142,142,142,136,142,142"},
{"idList": "7ae154d6636,9b43c9f180f,9c405b6d4df,b6622982150,da09ff1ecdc,fdb525e98a0", "limit": "53,75,84,53,53,41,58,58,58,56,58,58"},
{"idList": "839319be359,ae2c193e659", "limit": "114,114,164,163,114,88,126,126,126,121,126,126"},
{"idList": "87841e8d401,dc9dc779a2b", "limit": "128,128,184,182,128,96,139,139,139,133,139,139"},
{"idList": "8db8230a1be", "limit": "125,88,140,88,88,68,97,97,97,93,97,97"},
{"idList": "953cf1af4e8,9bee069b4af,af822408ea5,c4d9e791b06", "limit": "155,108,171,108,108,91,126,126,126,122,126,126"},
{"idList": "9ff8167f7ea,c4a09682cc6,d6c83bf16da,ed74f0cf2bf", "limit": "113,113,161,162,113,92,129,129,129,124,129,129"},
{"idList": "aa4886e9979,c1ec14616ad,e575193d19d,fedc4a096d6", "limit": "118,118,171,169,118,90,129,129,129,123,129,129"},
{"idList": "c1142bfeb31,c8d98df7e81,d6ce9a81b8e", "limit": "70,70,101,100,70,54,77,77,77,74,77,77"},
{"idList": "caff0c03af6,ec21b176835", "limit": "108,155,171,108,108,91,126,126,126,122,126,126"},
{"idList": "e7ab75486d7", "limit": "135,94,152,94,94,70,101,101,101,97,101,101"},

];


//装備傾向別表示パラメタ（パラメタ限界）
//表示名称は showBonusList で多言語変換
var EQ_SHOW_PARAMS = {
	CLASS_TYPE_NONE:		["bonus_hit", "bonus_crit", "bonus_will", "bonus_skill_speed", "bonus_spell_speed", "bonus_dodge"],
	CLASS_TYPE_GATHERER:	["bonus_gain", "bonus_quality", "bonus_gp"],
	CLASS_TYPE_CRAFTER:		["bonus_work", "bonus_edit", "bonus_cp"],
	CLASS_TYPE_TANK:		["bonus_vit", "bonus_str", "bonus_hit", "bonus_crit", "bonus_will", "bonus_skill_speed", "bonus_dodge"],
	CLASS_TYPE_MELEE_STR:	["bonus_vit", "bonus_hit", "bonus_crit", "bonus_will", "bonus_skill_speed"],
	CLASS_TYPE_MELEE_DEX:	["bonus_vit", "bonus_hit", "bonus_crit", "bonus_will", "bonus_skill_speed"],
	CLASS_TYPE_RANGED:		["bonus_vit", "bonus_hit", "bonus_crit", "bonus_will", "bonus_skill_speed"],
	CLASS_TYPE_CASTER:		["bonus_vit", "bonus_int", "bonus_hit", "bonus_crit", "bonus_will", "bonus_spell_speed"],
	CLASS_TYPE_HEALER:		["bonus_vit", "bonus_mnd", "bonus_pie","bonus_hit", "bonus_crit", "bonus_will", "bonus_spell_speed"],
};


/**
 * 初期化
 * クリ他,意思,PIE/獲得,識質,GP/作業,加工,CP

 */
function initParamLimitMap() {
	paramLimitMap = {};
	for (var i in baseParamLimitList) {
		var d = baseParamLimitList[i];
		var idList = d["idList"].split(",");
		for (var j in idList) {
			if ("" == idList[j]) {
				continue;
			}
			paramLimitMap[idList[j]] = {"lv": d["level"], "b": d["limitBattle"], "g": d["limitGather"], "c": d["limitCrafter"]};
		}
	}
	delete baseParamLimitList; // メモリ解放


	for (var i in baseParamLimitList2) {
		var d = baseParamLimitList2[i];
		var idList = d["idList"].split(",");
		for (var j in idList) {
			if ("" == idList[j]) {
				continue;
			}
			paramLimitMap[idList[j]] = {"lv": 0, "a": d["limit"]};
		}
	}
	delete baseParamLimitList2;

}

/**
 * 上限データ取得
 */
function getParamLimitData(id) {
	var ret = null;

	if (null == paramLimitMap[id]) {
		return ret;
	}
	return paramLimitMap[id];
}
function getParamLimitDataForParam(id) {
	var ret = null;

	if (null == paramLimitMap[id]) {
		return ret;
	}
	var d = paramLimitMap[id];
	ret = [];

	if (null != d["a"] && "" != d["a"]) {
		var keyList = ["bonus_str", "bonus_dex", "bonus_vit", "bonus_int", "bonus_mnd", "bonus_pie", "bonus_hit", "bonus_dodge", "bonus_crit","bonus_will","bonus_skill_speed","bonus_spell_speed"];
		var aList = d["a"].split(",");
		for (var i in aList) {
			ret[keyList[i]] = aList[i];
		}

	} else if ("" != d["b"]) {
		dataList = d["b"].split(",");
		ret["bonus_hit"] = Number(dataList[0]);
		ret["bonus_crit"] = Number(dataList[0]);
		ret["bonus_skill_speed"] = Number(dataList[0]);
		ret["bonus_spell_speed"] = Number(dataList[0]);
		ret["bonus_dodge"] = Number(dataList[0]);

		ret["bonus_will"] = Number(dataList[1]);
		ret["bonus_pie"] = Number(dataList[2]);

	} else if ("" != d["g"]) {
		dataList = d["g"].split(",");
		ret["bonus_gain"] = Number(dataList[0]);
		ret["bonus_quality"] = Number(dataList[1]);
		ret["bonus_gp"] = Number(dataList[2]);

	} else if ("" != d["c"]) {
		dataList = d["c"].split(",");
		ret["bonus_work"] = Number(dataList[0]);
		ret["bonus_edit"] = Number(dataList[1]);
		ret["bonus_cp"] = Number(dataList[2]);
	}

	return ret;
}
/**
 * 上限テキスト取得
 */
function getParamLimitText(id) {
	var ret = "";

	var d = getParamLimitData(id);
	if (null == d) {
		return ret;
	}

	var dataList = null;
	var labelList = null;
	var textList = [];

	if (null != d["a"] && "" != d["a"]) {
		var tmpLabelList = ["力量", "灵巧", "耐力", "智力", "精神", "信仰", "命中", "信念", "暴击", "受け流し", "技能速度", "咏唱速度"];
		var tmpDataList = d["a"].split(",");
		for (var i in tmpDataList) {
			if (tmpDataList[i] != 0) {
				dataList.push(tmpDataList[i]);
				dataList.push(tmpLabelList[i]);
			}
		}

	} else if ("" != d["b"]) {
		dataList = d["b"].split(",");
		labelList = ["暴击", "信念", "信仰"];

	} else if ("" != d["g"]) {
		dataList = d["g"].split(",");
		labelList = ["获得力", "鉴别力", "采集力"];

	} else if ("" != d["c"]) {
		dataList = d["c"].split(",");
		labelList = ["作业精度", "加工精度", "制作力"];
	}
	for (var i in dataList) {
		if ("0" != dataList[i]) {
			textList.push(labelList[i] + " +" + dataList[i]);
		}
	}
	for (var i in textList) {
		if ("" != ret) {
			ret += "/";
		}
		ret += textList[i];
	}

	return ret;
}

/**
 * パラメタ上限に出力するパラメタ一覧
 */
function getLimitParamList() {
	//選択中ジョブクラスから傾向パターンを取得
	var jobClass = $("#general_filter_jobclass").val(); // クラス名そのまま

	//傾向取得
	var classType = CLASS_TYPE_NONE;
	for (var i in classTypeDetailMap) {
		if (-1 != classTypeDetailMap[i].indexOf(jobClass)) {
			classType = i;
			break;
		}
	}

	//表示パラメタ一覧取得
	var ret = EQ_SHOW_PARAMS[classType];

	return ret;
}

//初期化呼び出し
initParamLimitMap();
