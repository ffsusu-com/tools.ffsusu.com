var xivdb_tooltips_config = {
    // General
    'version': '1.6',
    'domain': 'xivdb.com',

    // Set options
    'zindex': '99999999',

    // Custom options
    'replaceName': true,
    'colorName': true,
    'showIcon': true,
    'debug': false,

    // Accept url domains
    hrefs: [
        'xivdb.com',
        'xivdatabase.com',
        'www.xivdb.com',
        'www.xivdatabase.com',
        'jp.xivdb.com',
        'en.xivdb.com',
        'de.xivdb.com',
        'fr.xivdb.com',
    ],

    // List of languages
    language: {
        list: ["JP", "EN", "DE", "FR"],
        value: 1,
    },
};

var mDictMats = [];

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

var mDataStore;

function HasSubstring(string,substring) {
    if(string.indexOf(substring)>-1)
      return true;
      return false;
}

// Main tooltip function
function fPopLoadItem(tester) {
    $(function() {
      $(document).ajaxStop(function() {
        $(this).unbind("ajaxStop");

        $('#matDiv').empty();
        mDictMats = mDictMats.sort(function (a, b) {
            return a.name.localeCompare( b.name );
        });

        $.each(mDictMats, function( index, value ) {
            $('#matDiv').append('<div class="col-md-3"><img src="' + mDictMats[index].src + '" style="vertical-align: middle; margin:5 5px -5px 5; padding-right: .1cm; width: 25px; height: 25px;"/><span style="vertical-align: middle; ">' + mDictMats[index].name + ' x ' + (mDictMats[index].amt) + '</span> <br></div></div>');
        });

      });
    });

    "undefined" != typeof Prototype && jQuery.noConflict();

    var mQuery = "a";

    if (tester != null || tester == true) {
        mDictMats = [];
        mQuery = ".results";
    }

    jQuery(mQuery).each(function(index, value) {
        // Set vars

        var url = jQuery(this).attr("href");
        var host = null;
        if (void 0 != url && url.indexOf('/') > -1) {
            url = url.split('/');
            var host = url[2];
        }

        // If valid address
        var ValidAddress = xivdb_tooltips_config.hrefs.indexOf(host);

        // If host not undefined and valid address is in hrefs
        //if (void 0 != host && ValidAddress != -1) {
        if (void 0 != host) {

            var type, id, name;
            if (url[3]) {
                type = url[3].replace('?', '');
            }
            if (url[4]) {
                id = url[4];
            }
            if (url[5]) {
                name = url[5].replace('-', ' ');
            }

            var element = jQuery(this);


            void 0 == id || !jQuery.isNumeric(id) || (jQuery.ajax({
                url: "http://" + xivdb_tooltips_config.domain + "/modules/fpop/fpop.php",
                data: {
                    lang: xivdb_tooltips_config.language.value,
                    version: xivdb_tooltips_config.version,
                    type: type,
                    id: id,
                },

                cache: true,
                type: 'GET',
                success: function(data) {
                    data = JSON.parse(data);

                    var multiplier  = element.text().split(' x ');

                    if (HasSubstring(element.html(), data.icon) && tester == null) {
                        // Ugly temp hack
                        return;
                    }
                    
                    if (void 0 != data) {

                        element.attr("title", " ");

                        element.data("tooltip", data.html.replace('db.xivdev.com', 'xivtooltips.com'));
                        element.data("testing", "true");


                        if (xivdb_tooltips_config.replaceName && data.name != null && element.attr("data-replacename") != 0) {
                            element.html(data.name.replace('db.xivdev.com', 'xivtooltips.com'));
                        }

                        if (xivdb_tooltips_config.colorName && data.color != null && element.attr("data-colorname") != 0) {
                            element.css({
                                color: data.color
                            });
                        }

                        var el = $( '<div></div>' );
                        el.html(data.html);
                        el = el.find(".xivdb-tooltip-content-statsbox2");

                        var mObj = [];
                        var mMultiplier = parseInt(multiplier[1]);



                        el.find("div").each(function(i, val) {

                            var Title = $("span:last", val)[0].innerHTML;
                            //mTempObj = new Object();
                            var Materials = new Object();
                            Materials.amount = $("span:first", val)[0].innerHTML;
                            Materials.src = $("img:first", val)[0].src;

                            
                            var mTotal = (parseInt($("span:first", val)[0].innerHTML)*mMultiplier);
 							//console.log("name: " + $("span:last", val)[0].innerHTML + " amt " + mTotal);
                        
                        if (element.hasClass("results") || tester != null || tester == true) {
                            addOrUpdateMats(mDictMats, $("span:last", val)[0].innerHTML, mTotal, $("img:first", val)[0].src);
                        }


                        });

                        if (xivdb_tooltips_config.showIcon && data.icon != null && element.attr("data-showicon") != 0 && !HasSubstring(element.html(), data.icon)) {
                            element.html('<img src="' + data.icon + '" style="margin:5 5px -5px 5; padding-right: .1cm; width: 25px; height: 25px;" />  ' + element.html());
                        }

                        element.simpletooltip({
                            fixed: !0,
                            position: "bottom"
                        });
                        
//
                    } else {
                        if (xivdb_tooltips_config.debug) {
                            console.log("Error[1] fetching tooltip data, please copy the below response to: http://xivpads.com/?Support");
                            console.log(data);
                            console.log("---");
                        }
                    }
                },

                error: function(e, t, n) {
                    if (xivdb_tooltips_config.debug) {
                        console.log("Error[2] fetching tooltip data, please copy the below response to: http://xivpads.com/?Support");
                        console.log(e.responseText);
                        console.log(t);
                        console.log(n);
                        console.log("---");
                    }
                }
            }));

        }
    });

};

function addOrUpdateMats(mDictionary, mName, mAmt, mSrc) {
    //name, amt, src
    var mExisting = false;
    $.each(mDictionary, function(i, val) {
        if (val.name === mName) {
            val.amt = parseInt(val.amt) + parseInt(mAmt);
            mExisting = true;
            return;
        }
    });

    if (!mExisting) {
        mDictionary.push({
            name: mName,
            amt: parseInt(mAmt),
            src: $.trim(mSrc)
        });             
    }
}

function fPopGetScript(e, t) {
    var n = document.createElement("script");
    n.src = e;
    var r = document.getElementsByTagName("head")[0],
        i = !1;
    void 0 == r && (r = document.getElementsByTagName("body")[0]);
    n.onload = n.onreadystatechange = function() { i || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (i = !0, t(), n.onload = n.onreadystatechange = null, r.removeChild(n)) };
    r.appendChild(n)
};

function fPopLoadTips() {
    "undefined" != typeof Prototype && jQuery.noConflict();
    jQuery.fn.simpletooltip || function(e) {
        e.fn.simpletooltip = function() {
            return this.each(function() {
                void 0 != e(this).data("tooltip") && (e(this).hover(function(t) {
                    e("#simpleTooltip").remove();
                    var n = e(this).data("tooltip"), r = t.pageX + 5;
                    t = t.pageY + 5;
                    e("body").append("<div id='simpleTooltip' style='position: absolute; z-index: " + xivdb_tooltips_config.zindex + "; display: none;'>" + n + "</div>");
                    n = e("#simpleTooltip").width();
                    e("#simpleTooltip").width(n);
                    e("#simpleTooltip").css("left", r).css("top", t).show()
                }, function() {
                    e("#simpleTooltip").remove()
                }), e(this).mousemove(function(t) {
                    var n = t.pageX + 12,
                        r = t.pageY + 12,
                        i = e("#simpleTooltip").outerWidth(!0),
                        s = e("#simpleTooltip").outerHeight(!0);
                    n + i > e(window).scrollLeft() + e(window).width() && (n = t.pageX - i);
                    e(window).height() + e(window).scrollTop() < r + s && (r = t.pageY - s);
                    e("#simpleTooltip").css("left", n).css("top", r).show()
                }))
            })
        }
    }(jQuery);
    fPopLoadItem()
};

function fPopInit() { "undefined" == typeof jQuery ? fPopGetScript("http://ffsusu.com/LYJ/js/jquery.min.js", fPopLoadTips) : fPopLoadTips() }

initXIVDBTooltips = function() {
    var e = document.createElement("link");
    e.setAttribute("rel", "stylesheet");
    e.setAttribute("href", "http://" + xivdb_tooltips_config.domain + "/css/tooltip.css");
    e.setAttribute("type", "text/css");
    document.getElementsByTagName("head")[0].appendChild(e);
    var e = setInterval(function() {
        "complete" === document.readyState && (clearInterval(e), fPopInit())
    }, 10)
}

document.addEventListener('DOMContentLoaded', function() {
    initXIVDBTooltips();
})

function xivtt_replaceAll(txt, replace, with_this) {
    if (txt && replace && with_this) {
        return txt.replace(new RegExp(replace, 'g'), with_this);
    } else {
        return txt;
    }
};

function newOrAddMats(dict, addName, addValue, addImgSrc) {
    var mExisting = false;
    $.each(dict, function(i, val) {
        if (val.key === addName) {
            val.value = parseInt(val.value) + parseInt(addValue);
            mExisting = true;
            return;
        }
    });

    if (!mExisting) {
        dict.push({
            key: addName,
            value: parseInt(addValue),
            src: $.trim(addImgSrc)
        });             
    }

}

function newOrAdd(dict, addKey, addValue, addName) {
    var mExisting = false;
    $.each(dict, function(i, val) {
        if (val.key === addKey) {
            val.value = parseInt(val.value) + parseInt(addValue);
            mExisting = true;
            return;
        }
    });

    if (!mExisting) {
        dict.push({
            key: addKey,
            value: parseInt(addValue),
            name: addName
        });             
    }
}

function onHitGlyph(e) { 
    e.parentNode.remove(); 
    fPopLoadItem(true);
}

function spilt(name) { 
    var arr=new Array();
    arr=name.split('x');
    return arr[0]; 
}

function parseCurrentNodes() {
    var dict = [];


    $('.data-holder a').each(function(i, l){
        var mVal = $(this).find('span')[0].innerHTML;
		//alert($(this).innerHTML);
        var mOut = $(this).html();

        newOrAdd(dict, mOut[0]+mOut[1]+mOut[2]+mOut[3]+mOut[4], mVal, mOut);
    })


    $('#resultDiv').empty();
    
    //Sort Results Alphabetically
    dict = dict.sort(function (a, b) {
        return a.name.localeCompare( b.name );
    });

    //Add individual rows
    $.each(dict, function(i, val) {

        $('#resultDiv').append("<div class='col-md-3'><a class='results' href='http://cha.17173.com/ff14/" + val.key + 
            "' data-replacename='0' data-colorname='0' data-showicon='1' data-materials='bleh'></a>" + spilt(val.name) + 
            " x " + val.value +
            "<span class='glyphicon glyphicon-remove' onclick='onHitGlyph(this)''></span><br></div>");
    });

    fPopLoadItem();
}

function changeFunction(part, type) {
    var mResultDiv = $('#m' + part + 'Div');

    if (type.length < 1) {
        mDictMats = [];
        $('#matDiv').empty();
        mResultDiv.empty();
        fPopLoadItem();
        parseCurrentNodes();
        return;
    }

    mDictMats = [];

    var mArr = mDataStore[part + type];

    mResultDiv.empty();
    //alert(k);
    for(var k in mArr) {
        mResultDiv.append(mArr[k]);
    }

    parseCurrentNodes();    
}

$(document).ready(function(){
    mDataStore = JSON.parse(Base64.decode($('#itemdata').html()));
    //alert(mDataStore);
    $('.part-picker').change(function(){   changeFunction($(this).attr('id'), this.value);     });
});