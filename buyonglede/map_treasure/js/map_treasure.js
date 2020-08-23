//CopyRight Sino'aFue http://ff14sino.seesaa.net/
var num;
var tName = 'page1';

$(function(){
	var offX = $('#mapArea').offset().left;
	var offY = $('#mapArea').offset().top+50;

//ChangeMap
	$('#menu li').hover(function(){
			$(this).css('opacity', '0.7');
		},function(){
			$(this).css('opacity', '1');
	});

	$('#menu li').click(function(){
		num = $('#menu li').index(this);
		$('#mapArea').children('section').each(function(){
			$(this).hide();
		});
		$('#menu li').each(function(){
			$(this).css('border-bottom','none');
		});
		$(this).css('border-bottom','4px solid orange');
		$('#mapArea').children('section').eq(num).show();
		tName = $('#mapArea').children('section').eq(num).attr('id');
		makeMarker();
		reMake();
		sinkouInit();
	});

//人数変更
	var pNo=4;
	$('#select1').change(function(){
		pNo = $(this).val();
		$('#setArea li').each(function() {
			var cNo = $(this).index();
			if(cNo<pNo) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});
		setList();
	});

//枚数変更
	var mNo=1;
	var mode2Flg = false;
	$("#select1").val("4");
	$("#select2").val("1");
	$('#select2').change(function(){
		$('.viewBtn span').each(function() {//表示のリセット
			$(this).removeClass('on');
		});
		mNo = $(this).val();
		if(mNo==='2') {
			$('#setArea').addClass('mode2');
			$('#setArea .flag2').show();
			$('.viewBtn span:nth-child(1)').show().addClass('on');
			$('.viewBtn span:nth-child(3)').show();
			//$('.viewBtn span:nth-child(1)').addClass('on');
			viewFlg=0;
			mode2Flg = true;
		} else {
			$('#setArea').removeClass('mode2');
			$('#setArea .flag2').attr('class','flag2').text('').hide();
			$('section div[class^="flag2_"]').remove();
			$('.viewBtn span:nth-child(1)').hide();
			$('.viewBtn span:nth-child(2)').addClass('on');
			$('.viewBtn span:nth-child(3)').hide();
			viewFlg=1;
			mode2Flg = false;
		}
		setNavActive();
	});

//名前部分
	var getName;
	$('#setArea span:nth-child(2) input[type="button"]').click(function(){
		getName = $(this).parent().children('input').val();
		var setNo = $('#setArea input[type="button"]').index(this)+1;
		if(getName!=='') {//setname
			$(this).parent().hide();
			$(this).parent().parent().children(':nth-child(1)').text(getName).show();
			
			if($(this).parent().parent().children(':nth-child(3)').attr('class')!=='flag') {
				if($('section div.flag_'+setNo+' span').length){
					$('section div.flag_'+setNo+' span').text(getName);
				} else {
					$('section div.flag_'+setNo).append('<span>'+getName+'</span>');
				}
			}
			if($(this).parent().parent().children(':nth-child(4)').attr('class')!=='flag2') {
				if($('section div.flag2_'+setNo+' span').length){
					$('section div.flag2_'+setNo+' span').text(getName);
				} else {
					$('section div.flag2_'+setNo).append('<span>'+getName+'</span>');
				}
			}
		} else {//noname
			if($('section div.flag_'+setNo+' span').length){
				$('section div.flag_'+setNo+' span').remove();
			}
			if($('section div.flag2_'+setNo+' span').length){
				$('section div.flag2_'+setNo+' span').remove();
			}
		}
		setList();
	});
	
	$('#setArea li span:nth-child(1)').click(function(){//名前修正
		getName = $(this).text();
		$(this).hide();
		$(this).parent().children(':nth-child(2)').show();
	});

//フラグ部分	
	var fNum=0;
	var setFlg = false;
	var clickNo;
	$('#setArea .flag').click(function(){
		clickNo = 1;
		fNum = $('#setArea .flag').index(this)+1;
		getName = $(this).parent().children(':nth-child(1)').text();
		$('#moveFlag span:nth-child(2)').show();

		if(setFlg) {
			$('#setArea span[style].flag').each(function() {
				$(this).attr('class','flag').removeAttr('style');
			});
			$('#setArea span[style].flag2').each(function() {
				if($(this).css('opacity')==='0.5') {
					$(this).attr('class','flag2').css('opacity','1');
				}
			});
		}
		
		if(!setFlg) {//追加モード
			if($(this).attr('class')==='flag') {
				$('#moveFlag span:nth-child(1)').attr('class','flag_'+fNum);
				$('#setArea .flag').eq(fNum-1).attr('class','flag flag_'+fNum).attr('style','opacity:.5');
				setFlg = true;
				$('#zInput').show();
			} else {//削除
				$(this).attr('class','flag').text('');
				$('section .flag_'+fNum).remove();
				setNavActive();
			}
		} else {//set中にキャンセル
			$(this).attr('class','flag').removeAttr('style');
			$('#moveFlag span:nth-child(1)').attr('class','');
			fNum=0;
			setFlg = false;
			$('#moveFlag span:nth-child(2)').hide();
			$('#zInput input[type="text"]').val('');
			$('#zInput').hide();
		}
	});
	$('#setArea .flag2').click(function(){
		clickNo = 2;
		fNum = $('#setArea .flag2').index(this)+1;
		getName = $(this).parent().children(':nth-child(1)').text();
		$('#moveFlag span:nth-child(2)').show();

		if(setFlg) {
			$('#setArea span[style].flag').each(function() {
				$(this).attr('class','flag').removeAttr('style');
			});
			$('#setArea span[style].flag2').each(function() {
				if($(this).css('opacity')==='0.5') {
					$(this).attr('class','flag2').css('opacity','1');
				}
			});
		}
		
		if(!setFlg) {//追加モード
			if($(this).attr('class')==='flag2') {
				$('#moveFlag span:nth-child(1)').attr('class','flag2_'+fNum);
				$('#setArea .flag2').eq(fNum-1).attr('class','flag2 flag2_'+fNum).attr('style','opacity:.5').show();
				setFlg = true;
				$('#zInput').show();
			} else {//削除
				$(this).attr('class','flag2').show();
				$('section .flag2_'+fNum).remove();
				setNavActive();
			}
		} else {//set中にキャンセル
			$(this).attr('class','flag2').removeAttr('style').show();
			$('#moveFlag span:nth-child(1)').attr('class','');
			fNum=0;
			setFlg = false;
			$('#moveFlag span:nth-child(2)').hide();
			$('#zInput input[type="text"]').val('');
			$('#zInput').hide();
		}
	});

	//終了マーク
	$(".end").click(function(){
		fNum = $('#setArea .end').index(this)+1;
		if($(this).attr('class')==='end'){//フラグ削除
			$(this).addClass('on');
			$('#setArea span').removeClass('flag_'+fNum);
			$('#setArea span').removeClass('flag2_'+fNum);
			$('section .flag_'+fNum).remove();
			$('section .flag2_'+fNum).remove();
		} else {
			$(this).removeClass('on');
		}
		setNavActive();
	});

	//終了マーク表示切替
	$('.endCheck input').click(function(){
		if($(this).prop('checked')){
			$('#setArea').addClass('modeEnd');
			$('#setArea .end').each(function(){
				$(this).removeClass('on');
			});
		} else {
			$('#setArea').removeClass('modeEnd');
		}
	});

//カーソル追従部分
	$('body').append('<div id="moveFlag"><span></span><span></span></div>');

	$(document).mousemove(function(e){
			$('#moveFlag').attr('style','top:'+(e.pageY)+'px;left:'+(e.pageX+15)+'px');
			zKeisan(e);
			$('#moveFlag span:nth-child(2)').text(zText);
	});
	
	var zText;
	function zKeisan(e){//座標計算
			//
			var keisan = 585/43;
			var eoX = floatFormat((e.pageX-offX)/keisan+1,1);
			var eoY = floatFormat((e.pageY-offY)/keisan+1,1);
			zText = 'X:'+eoX+' Y:'+eoY;
			return zText;
	}

	setInterval(function(){//点滅
		$('#moveFlag span:nth-child(1)').animate({opacity:0.5},500,function(){
			$('#moveFlag span:nth-child(1)').animate({opacity:1},500);
		});
	},1000);
	
//マップ部分
	$('section').click(function(e){
		if(fNum!==0) {
			zKeisan(e);
			var mapX = e.pageX-offX-13;
			var mapY = e.pageY-offY-10;
			if(clickNo===1) {
				if(getName!=='') {
					$(this).append('<div class="flag_'+fNum+'" style="left:'+mapX+'px;top:'+mapY+'px;" title="'+zText+'"><span>'+getName+'</span></div>');
			} else {
					$(this).append('<div class="flag_'+fNum+'" style="left:'+mapX+'px;top:'+mapY+'px;" title="'+zText+'"></div>');
				}
				$('#setArea .flag').eq(fNum-1).removeAttr('style');
				$('#setArea .flag').eq(fNum-1).text(zText);
			} else {
				if(getName!=='') {
					$(this).append('<div class="flag2_'+fNum+'" style="left:'+mapX+'px;top:'+mapY+'px;" title="'+zText+'"><span>'+getName+'</span></div>');
				} else {
					$(this).append('<div class="flag2_'+fNum+'" style="left:'+mapX+'px;top:'+mapY+'px;" title="'+zText+'"></div>');
				}
				$('#setArea .flag2').eq(fNum-1).removeAttr('style').show();
				$('#setArea .flag2').eq(fNum-1).text(zText);
			}
			$('#moveFlag span').attr('class','');
			$('#setArea li:nth-child('+fNum+') .end').removeClass('on');
			setNavActive();
		}
		setFlg = false;
    });
	
	//MAP外キャンセル
	$(document).click(function(ev){
		var target = $(ev.target);
		//alert(target.attr('class'));
		if(setFlg&&!target.hasClass('flag')&&!target.hasClass('flag2')&&target!==$('#'+tName)&&target.parent().attr('id')!=='menu'){
			//alert('cancel');
			$('#setArea span[style].flag').each(function() {
				$(this).attr('class','flag').removeAttr('style');
			});
			$('#setArea span[style].flag2').each(function() {
				if($(this).css('opacity')==='0.5') {
					$(this).attr('class','flag2').css('opacity','1');
				}
			});
			$('#moveFlag span').attr('class','');
			setFlg = false;
			setNavActive();
		}
	});
	//座標入力で配置
	$('#zInput input[type="button"]').click(function(){
		var numCheck = true;
		if(!isNumber($('#zInput input:nth-child(1)').val())){
			numCheck = false;
			alert('X座標の入力を確認してください（半角数字）');
		} else if($('#zInput input:nth-child(1)').val()>44) {
			numCheck = false;
			alert('数値が大きすぎます');
		}
		if(!isNumber($('#zInput input:nth-child(2)').val())){
			numCheck = false;
			alert('Y座標の入力を確認してください（半角数字）');
		} else if($('#zInput input:nth-child(2)').val()>44) {
			numCheck = false;
			alert('数値が大きすぎます');
		}

		if(numCheck){
			var getX = floatFormat($('#zInput input:nth-child(1)').val(),1);
			var getY = floatFormat($('#zInput input:nth-child(2)').val(),1);
			zText = 'X:'+getX+' Y:'+getY;
			
			var mapX = (getX-1)*585/43-13;
			var mapY = (getY-1)*585/43-10;
			
			if(clickNo===1) {
				if(getName!=='') {
					$('#'+tName).append('<div class="flag_'+fNum+'" style="left:'+mapX+'px;top:'+mapY+'px;" title="'+zText+'"><span>'+getName+'</span></div>');
				} else {
					$('#'+tName).append('<div class="flag_'+fNum+'" style="left:'+mapX+'px;top:'+mapY+'px;" title="'+zText+'"></div>');
				}
				$('#setArea .flag').eq(fNum-1).removeAttr('style');
				$('#setArea .flag').eq(fNum-1).text(zText);
			} else {
				if(getName!=='') {
					$('#'+tName).append('<div class="flag2_'+fNum+'" style="left:'+mapX+'px;top:'+mapY+'px;" title="'+zText+'"><span>'+getName+'</span></div>');
				} else {
					$('#'+tName).append('<div class="flag2_'+fNum+'" style="left:'+mapX+'px;top:'+mapY+'px;" title="'+zText+'"></div>');
				}
				$('#setArea .flag2').eq(fNum-1).removeAttr('style').show();
				$('#setArea .flag2').eq(fNum-1).text(zText);
			}
			$('#moveFlag span').attr('class','');
			setNavActive();
			setFlg = false;
		}
	});
	
	//マップのフラグドラッグ
	$('section').on('mousedown','div',function(){
		if(!setFlg) {
			var moveX;
			var moveY;
			var t = $(this);
			var className = $(t).attr('class');
			$('#moveFlag span:nth-child(2)').show();
			$('section').mousemove(function(e){
				zKeisan(e);
				moveX = e.pageX-offX-13;
				moveY = e.pageY-offY-10;
				t.attr('style','left:'+moveX+'px;top:'+moveY+'px').attr('title',zText);
			});
			$('section').mouseup(function(){
				$(this).unbind("mouseup mousemove mouseleave");
				$('#setArea .'+className).text($('#moveFlag span:nth-child(2)').text());
				$('#moveFlag span:nth-child(2)').hide();
				setList();
			});
			$('section').mouseleave(function(){
				$(this).unbind("mouseup mousemove mouseleave");
				$('#setArea .'+className).text($('#moveFlag span:nth-child(2)').text());
				$('#moveFlag span:nth-child(2)').hide();
				setList();
			});
		}
	});

//ナビの色変更（追加削除があった時）
	function setNavActive() {
		$('#moveFlag span:nth-child(2)').hide();
		$('#zInput input[type="text"]').val('');
		$('#zInput').hide();
		$('#mapArea section').each(function() {
			var areaNo = $(this).attr('id').split('page')[1];
			if($(this).children('div').length){
				$('#menu li').eq(areaNo-1).css('background-color','darkred');
			} else {
				$('#menu li').eq(areaNo-1).css('background-color','black');
			}
		});
		fNum=0;
		setList();
	}
	
//リスト生成
	var noPointFlg = false;
	var putList;
	var putList2;
	function setList() {
		putList= [];
		putList2= [];
		var putName='';
		var putArea='';
		var putAreaName='';
		var putPoint;
		
		//１枚目
		for(var i=1;i<=pNo;i++) {
			putName = $('#setArea li:nth-child('+i+') span:nth-child(1)').text();
			if($('div.flag_'+i).length) {
				putArea = $('div.flag_'+i).parent().attr('id');
				switch(putArea){
				    case 'page1': putAreaName = '库尔扎斯西部高地'; break;
				    case 'page2': putAreaName = '龙堡参天高地'; break;
				    case 'page3': putAreaName = '阿巴拉提亚云海'; break;
				    case 'page4': putAreaName = '翻云雾海'; break;
				}
			} else {
				putArea = '';
				putAreaName = '';
			}
			putPoint = $('#setArea li:nth-child('+i+') .flag').text();
			if(putArea){
				putList.push(putArea+putPoint+','+putName+'　'+putAreaName+' ('+putPoint+')');
			}
		}
		//１桁の座標に0付ける
		for(i=0;i<putList.length;i++){
			var cn = putList[i].substring(putList[i].indexOf(':')+1, putList[i].indexOf(' '));
			if(cn<10){
				var x = putList[i].replace(cn,'0'+cn);
				putList.splice(i,1,x);
			}
		}
		putList.sort();//エリアソート
		
		//２枚目
		if(mode2Flg) {
			for(i=1;i<=pNo;i++) {
				putName = $('#setArea li:nth-child('+i+') span:nth-child(1)').text();
				if($('div.flag2_'+i).length) {
					putArea = $('div.flag2_'+i).parent().attr('id');
					switch(putArea){
					    case 'page1': putAreaName = '库尔扎斯西部高地'; break;
					    case 'page2': putAreaName = '龙堡参天高地'; break;
					    case 'page3': putAreaName = '阿巴拉提亚云海'; break;
					    case 'page4': putAreaName = '翻云雾海'; break;
					}
				} else {
					putArea = '';
					putAreaName = '';
				}
				putPoint = $('#setArea li:nth-child('+i+') .flag2').text();
				if(putArea){
					putList2.push(putArea+putPoint+','+putName+'[第2张]　'+putAreaName+' ('+putPoint+')');
				}
			}
			//１桁の座標に0付ける
			for(i=0;i<putList2.length;i++){
				var cn2 = putList2[i].substring(putList2[i].indexOf(':')+1, putList2[i].indexOf(' '));
				if(cn2<10){
					var x2 = putList2[i].replace(cn2,'0'+cn2);
					putList2.splice(i,1,x2);
				}
			}
			putList2.sort();//エリアソート
		}
		
		//表示内容の生成
		var viewListSet = [];
		switch(viewFlg){
			case 0:viewListSet=putList.concat(putList2);viewListSet.sort();break;
			case 1:viewListSet=putList;break;
			case 2:viewListSet=putList2;break;
		}
		var viewList= [];
		for(i=0;i<viewListSet.length;i++) {//ソートに使った部分を削除
			var vPut = viewListSet[i].split(',');
			viewList.push('/p '+(i+1)+'.'+vPut[1]);
		}

		//表示
		var putNo = viewList.length;
		
		var noPos=[];//座標なし
		for(i=0;i<putNo;i++){
			noPos.push(viewList[i].split('(')[0]);
		}
		
		if(putNo>7){
			$('#outPut').attr('rows',putNo+1);
		} else {
			$('#outPut').attr('rows','8');
		}
		
		var noPosPut = noPos.join("\n");
		var putText = viewList.join("\n");
				
		if(!noPointFlg){
			$('#outPut').val(putText);
		} else {
			$('#outPut').val(noPosPut);
		}
		keepInit();
		sinkouInit();
	}setList();

//進行用コピーリスト
		$('#sinkouArea').hide();
		function sinkouInit(){
			var sinkouList= [];
			$('#'+tName+' div span').each(function() {
				var sName = $(this).text();
				var sClass = $(this).parent().attr('class').split('_')[0];
				//console.log(sClass);
				if(sClass==='flag'){
					sinkouList.push('【NEXT】'+sName+' （第１张）');
				} else {
					sinkouList.push('【NEXT】'+sName+' （第２张）');
				}
			});
			sinkouList.sort();
			var sPush='';
			for(var i=0;i<sinkouList.length;i++){
				sPush = sPush+'<li data-copy="'+sinkouList[i]+'">'+sinkouList[i]+'</li>';
			}
			$('#sinkouArea ul').html(sPush);
			//console.log(sinkouList);
			if(sinkouList.length){
				$('#sinkouArea').show();
			}else{
				$('#sinkouArea').hide();
			}
		}
		

//四捨五入計算、小数点以下1まで
	function floatFormat(number,n){
		var _pow = Math.pow(10,n);
		var _check = Math.round(number*_pow )/_pow;
		if(Math.round(_check)===_check) {
			_check = _check+'.0';
		}
		if(_check==='NaN'){
			alert('半角数字で入力してください');
		}
		return _check;
	}
//数値かどうかチェック
	function isNumber(num){
	  var pattern = /^[-]?([1-9]\d*|0)(\.\d+)?$/;
	  return pattern.test(num);
	}

//viewBtn
	var viewFlg = 1;
	$('.viewBtn span').click(function(){
		if($(this).index()!==3) {
			$('.viewBtn span').each(function() {
				$(this).removeClass('on');
			});
			$(this).addClass('on');
			switch($(this).index()){
				case 0:viewFlg=0;break;
				case 1:viewFlg=1;break;
				case 2:viewFlg=2;break;
			}
		} else {
			if(noPointFlg){
				noPointFlg=false;
				$(this).text('不要坐标');
			}else{
				noPointFlg=true;
				$(this).text('显示坐标');
			}
		}
		setList();
	});

//reset
	$('input[type="reset"]').click(function(){
		$('section div').each(function(){
			$(this).remove();
		});
		$('#setArea .flag').each(function(){
			$(this).attr('class','flag');
		});
		$('#setArea .flag2').each(function(){
			$(this).attr('class','flag2');
		});
		$('#setArea .end').each(function(){
			$(this).removeClass('on');
		});
		setNavActive();
	});

//marker
	function makeMarker(){
		//var mapX = (getX-1)*585/43-13;
		if(!$('#'+tName+'>span').length){
			var mList=[];
			switch(tName){
				case'page1':mList = ['6.4,12','21.3,11.8','11.7,24','20,30.3','34.5,7.3','28.5,15.1','36.2,25.9'];break;
				case'page2':mList = ['10.2,29.7','23,25.3','28.5,23.8','11.7,34.5','13,34.5','14.6,34','18.3,33.8','23.3,31.3','27,30.3'];break;
				case'page3':mList = ['6.3,6.8','20.3,4.9','22.4,10.2','16.8,16.2','31.2,18.4','10,38.6','14,26.3','18.7,34.5','21,31.5','28.9,23.6'];break;
				case'page4':mList = ['10,9.1','12.4,12.8','7.5,17','10,19.7','23.2,18.8','32,25.2','17.1,33.2','21.3,37.4','27.5,37'];break;
			}
			var mListPx=[];
			for(var i=0;i<mList.length;i++){
				var pX = (mList[i].split(',')[0]-1)*585/43;
				var pY = (mList[i].split(',')[1]-1)*585/43;
				mListPx.push(pX+','+pY);
			}
			//alert(mListPx);
			for(i=0;i<mListPx.length;i++){
				$('#'+tName).append('<span style="left:'+mListPx[i].split(',')[0]+'px;top:'+mListPx[i].split(',')[1]+'px;"></span>');
			}
		}
	}makeMarker();
	
//キープ用
	var keep_page1;
	var keep_page2;
	var keep_page3;
	var keep_page4;
	function keepInit(){
		switch(tName){
			case'page1':keep_page1=keepList();break;
			case'page2':keep_page2=keepList();break;
			case'page3':keep_page3=keepList();break;
			case'page4':keep_page4=keepList();break;
		}
	}
	function keepList(){
		var keepHtml='';
		$('#'+tName+' div').each(function() {
			keepHtml=keepHtml+'<div class="'+$(this).attr('class')+'" style="'+$(this).attr('style')+'" title="'+$(this).attr('title')+'">'+$(this).html()+'</div>';
		});
		return keepHtml;
	}
	
//フラグ生成のやりなおし
	function reMake(){
		$('#'+tName+' div').remove();
		switch(tName){
			case'page1':$('#'+tName).append(keep_page1);break;
			case'page2':$('#'+tName).append(keep_page2);break;
			case'page3':$('#'+tName).append(keep_page3);break;
			case'page4':$('#'+tName).append(keep_page4);break;
		}
		//目印有無のチェック
		$('#'+tName+' div').each(function() {
			 if(!$('#setArea .'+$(this).attr('class')).length){
				 $(this).remove();
			 }
		});
		//名前有無のチェック
		$('#'+tName+' div:not(:has(span))').each(function() {//名前が無い要素を発見
			var cn = $('#setArea .'+$(this).attr('class')).parent().children(':nth-child(1)').text();
			if(cn!==''){//名前登録があったら
				$(this).append('<span>'+cn+'</span>');
			}
		});
	}

//リサイズが終わったら座標計算しなおし
	var timer = false;
	$(window).resize(function() {
		if (timer !== false) {
			clearTimeout(timer);
		}
		timer = setTimeout(function() {
			//console.log('resized');
			offX = $('#mapArea').offset().left;
			offY = $('#mapArea').offset().top+50;
		}, 200);
	});
	
//copy
	var clipboard = new Clipboard('.copyBtn span:nth-child(1)', {
		text: function() {
			var t = $('.copyBase').val();
			return t;
		}
	});
	clipboard.on('success', function() {
		$('.alert').css({"opacity":0}).animate({"opacity":1},500);
		setTimeout(function(){	
			$(".alert").delay(500).animate({"opacity":0},1000);
		},1500);
	});
	
	var clipboard2 = new Clipboard('#sinkouArea li', {
		text: function(trigger) {
			var t = $(trigger).attr('data-copy');
			return t;
		}
	});
	clipboard2.on('success', function(e) {
		//console.log(e);
		$(e.trigger).attr('style','color:red;');
		setTimeout(function(){	
			$(e.trigger).removeAttr('style');
		},1000);
	});

//日付
	var dayAfter = moment().diff(moment('2016-10-23 0:00'), 'days');
	console.log(dayAfter);
	if(dayAfter===0){
		$('.topInfo span').text('（本日）');
	}else{
		$('.topInfo span').text('（'+dayAfter+'日前）');
	}
});





























