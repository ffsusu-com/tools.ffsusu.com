/*根据jQuery选择器找到需要加载ystep的容器*/
/*loadStep 方法可以初始化ystep*/
$(".ystep1").loadStep({
    /*ystep的外观大小*/
    /*可选值：small,large*/
    size: "small",
    /*ystep配色方案*/
    /*可选值：green,blue*/
    color: "green",
    /*ystep中包含的步骤*/
    steps: [{
        /*步骤名称*/
        title: "国服",
        /*步骤内容(鼠标移动到本步骤节点时，会提示该内容)*/
        content: ""
    }, {
        title: "3.38",
        content: "版本更新时间2016/12/27"
    }, {
        title: "3.4",
        content: "未知"
    }, {
        title: "3.45",
        content: "未知"
    }, {
        title: "3.5",
        content: "未知"
    }, {
        title: "3.55",
        content: "未知"
	}, {
        title: "4.0",
        content: "未知"
    }]
});

$(".ystep2").loadStep({
    size: "small",
    color: "blue",
    steps: [{
        title: "国际服",
        content: ""
    }, {
        title: "3.38",
        content: "版本更新时间2016/08/23"
    }, {
        title: "3.4",
        content: "版本更新时间2016/09/27"
    }, {
        title: "3.45",
        content: "版本更新时间2016/11/01"
    }, {
        title: "3.5",
        content: "版本更新时间2017/01/17"
    }, {
        title: "3.55",
        content: "未知"
	}, {
        title: "4.0",
        content: "未知"
    }]
});

$(".ystep1").setStep(2);
$(".ystep2").setStep(5);