
// 引入IScroll.js的对象
var leftScroll = new IScroll('#mid-right', {
    scrollbars: true
})

// 中间区域父元素
var midPart = document.getElementsByClassName('mid_wrapper')[0];
// 滚动条
var sBar = document.getElementsByClassName('iScrollVerticalScrollbar')[0];
sBar.style.visibility = 'hidden';
// 触摸出现滚动条
midPart.addEventListener('touchstart', function () {
    sBar.style.visibility = 'visible';
});
// 触摸结束隐藏滚动条
midPart.addEventListener('touchend', function () {
    sBar.style.visibility = 'hidden';
});

// 左侧切换功能
// 引入fastclick.js
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

var ul = document.getElementsByClassName('mid_content')[0];
var liArr = Array.prototype.slice.call(ul.children, 0);

// 给每个li元素添加index属性
liArr.forEach(function (elem, i) {
    elem.index = i + 1;
});

ul.addEventListener('click', function (e) {
    toggleClass(e.target);
})

var str1 = '<div class="mid_title">\
                <p>就业班</p>\
                <div class="ad">\
                    <p>web前端在线就业班</p>\
                </div>\
            </div>\
            <div class="mid_title">\
            <p>提高课</p>\
                <ul class="item clearfix">\
                    <li><a href="javascript:;">微信小程序</a></li>\
                    <li><a href="javascript:;">深入探索js</a></li>\
                    <li><a href="javascript:;">node.js</a></li>\
                    <li><a href="javascript:;">bootstrap</a></li>\
                    <li><a href="javascript:;">vue.js</a></li>\
                    <li><a href="javascript:;">微信小程序</a></li>\
                    <li><a href="javascript:;">深入探索js</a></li>\
                    <li><a href="javascript:;">node.js</a></li>\
                    <li><a href="javascript:;">bootstrap</a></li>\
                    <li><a href="javascript:;">vue.js</a></li>\
                    <li><a href="javascript:;">微信小程序</a></li>\
                    <li><a href="javascript:;">深入探索js</a></li>\
                    <li><a href="javascript:;">node.js</a></li>\
                    <li><a href="javascript:;">bootstrap</a></li>\
                    <li><a href="javascript:;">vue.js</a></li>\
                    <li><a href="javascript:;">微信小程序</a></li>\
                    <li><a href="javascript:;">深入探索js</a></li>\
                    <li><a href="javascript:;">node.js</a></li>\
                    <li><a href="javascript:;">bootstrap</a></li>\
                    <li><a href="javascript:;">vue.js</a></li>\
                    <li><a href="javascript:;">微信小程序</a></li>\
                    <li><a href="javascript:;">深入探索js</a></li>\
                    <li><a href="javascript:;">node.js</a></li>\
                    <li><a href="javascript:;">bootstrap</a></li>\
                    <li><a href="javascript:;">vue.js</a></li>\
                    <li><a href="javascript:;">微信小程序</a></li>\
                    <li><a href="javascript:;">深入探索js</a></li>\
                    <li><a href="javascript:;">node.js</a></li>\
                    <li><a href="javascript:;">bootstrap</a></li>\
                    <li><a href="javascript:;">vue.js</a></li>\
                    <li><a href="javascript:;">微信小程序</a></li>\
                    <li><a href="javascript:;">深入探索js</a></li>\
                    <li><a href="javascript:;">node.js</a></li>\
                    <li><a href="javascript:;">bootstrap</a></li>\
                    <li><a href="javascript:;">vue.js</a></li>\
                </ul>\
            </div>';

var str2 = '<div class="mid_title">\
                <p>就业班</p>\
                <div class="ad">\
                    <p>微信小程序就业班</p>\
                </div>\
            </div>\
            <div class="mid_title">\
                <p>提高课</p>\
                <ul class="item clearfix">\
                    <li><a href="javascript:;">微信小程序</a></li>\
                    <li><a href="javascript:;">深入探索js</a></li>\
                    <li><a href="javascript:;">node.js</a></li>\
                    <li><a href="javascript:;">bootstrap</a></li>\
                    <li><a href="javascript:;">vue.js</a></li>\
                </ul>\
            </div>';

function toggleClass(target) {
    liArr.forEach(function (elem, i) {
        elem.classList.remove('active');
    });
    target.classList.add('active');
    var html = target.innerHTML;
    render(target.index, html);
}

function render(num, text) {
    switch (num) {
        case 1:
            midPart.innerHTML = str1;
            break;
        case 2:
            midPart.innerHTML = str2;
            break;
        case 3:
            midPart.innerHTML = '<p class="library">'+ text +'</p>';
            break;
        case 4:
            midPart.innerHTML = '<p class="library">'+ text +'</p>';
            break;
        case 5:
            midPart.innerHTML = '<p class="library">'+ text +'</p>';
            break;
        case 6:
            midPart.innerHTML = '<p class="library">'+ text +'</p>';
            break;

    }
}
