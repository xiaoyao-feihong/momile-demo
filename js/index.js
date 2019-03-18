

// 引入fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

// 引入IScroll.js
var myScroll = new IScroll('#mid', {
    scrollbars: true
});

// 中间区域父元素
var midPart = document.getElementById('mid');
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



(function () {
    // 执行轮播图函数
    turnPage();
    // 轮播图函数
    function turnPage() {
        var ul = document.getElementsByClassName('turnPage')[0];

        // 根据li个数添加指示的小圆点，iCount记录图片原始张数
        var iCount = ul.children.length;
        var firLi = ul.children[0].cloneNode(true);
        var lasLi = ul.children[iCount - 1].cloneNode(true);
        ul.appendChild(firLi);
        ul.insertBefore(lasLi, ul.children[0]);
        // 图片现有张数
        var count = ul.children.length;
        // index用来记录当前图片的张数
        var index = 1;

        // 设置ul，li的初始宽度
        var liWidth = document.getElementsByClassName('mid_tp')[0].offsetWidth;
        // ul.children由类数组变为数组
        var liArr = Array.prototype.slice.call(ul.children, 0);
        autoStyle();
        function autoStyle() {
            // 实时更新宽度
            liWidth = document.getElementsByClassName('mid_tp')[0].offsetWidth;
            ul.style.width = ul.children.length * liWidth + 'px';
            liArr.forEach(function (elem) {
                elem.style.width = liWidth + 'px';
            });
        }

        // 屏幕宽度发生变化时，自动适应
        window.onresize = function () {
            autoStyle();
        }


        // 动态添加小圆点
        var indicator = document.getElementsByClassName('indicator')[0];
        var str = '';
        for (var i = 0; i < iCount; i++) {
            str += '<li></li>';
        }
        indicator.innerHTML = str;
        indicator.children[0].className = 'active';

        // 设置全局的定时器ID是为触摸时清除定时器
        var timer = null;
        autoPlay();
        // 自动轮播函数
        function autoPlay() {
            timer = setInterval(function () {
                if (index == count - 1) {
                    index = 1;
                    ul.style.left = -index * liWidth + 'px';
                }
                index++;
                move(ul, -index * liWidth);
                setStyle(index);
            }, 2500);
        }

        // 小圆点数组
        var circleArr = Array.prototype.slice.call(indicator.children, 0);
        circleArr.forEach(function (elem, i) {
            // 索引从0开始，但是小圆点从1设置比较好，如果给圆点注册点击事件坐标是对应上的
            elem.index = i + 1;
        })

        // 设置小圆点样式函数
        function setStyle(num) {
            // index为最大的时候，对应第一张图
            if (index == count - 1) {
                num = 1;
            }
            // index为0的时候，切到倒数第二张
            if (index == 0) {
                num = count - 2;
            }
            // 给目标圆点添加样式
            circleArr.filter(function (elem, i) {
                elem.classList.remove('active');
                return elem.index == num;
            })[0].classList.add('active');
        }

        // 运动函数
        function move(obj, tPosition) {
            var startLeft = parseInt(window.getComputedStyle(obj, null)['left']);
            clearInterval(obj.timer);
            // 这样可以实现多物体运动
            obj.timer = setInterval(function () {
                var curLeft = parseInt(window.getComputedStyle(obj, null)['left']);
                // 缓动运动
                var speed = Math.abs((tPosition - curLeft) / 15);
                // 判读速度正负决定取整
                speed = tPosition - startLeft > 0 ? Math.ceil(speed) : Math.floor(-speed);
                // 如果距离之差小于步进，跳跃到目标位置
                if (Math.abs(tPosition - curLeft) <= Math.abs(speed)) {
                    clearInterval(obj.timer);
                    obj.style.left = tPosition + 'px';
                } else {
                    obj.style.left = curLeft + speed + 'px';
                }
            }, 30);
        }
        /*************存在bug，1）快速切换图片时，有白屏现象，但是我不知道怎么弄************/
        // 轮播图触摸
        // 触摸起始点坐标
        var startX;
        // 记录当前ul的起始位置
        var ulX;
        // 滑动距离
        var distance;
        // 绑定监听事件
        ul.addEventListener('touchstart', function (e) {
            clearInterval(timer);
            ulX = parseInt(window.getComputedStyle(ul, null)['left']);
            startX = e.targetTouches[0].clientX;
        });

        ul.addEventListener('touchmove', function (e) {
            distance = e.targetTouches[0].clientX - startX;
            ul.style.left = ulX + distance + 'px';
        })

        ul.addEventListener('touchend', function (e) {
            // 10以内认为是正常抖动
            if (Math.abs(distance) < 10) {
                return;
            }
            // 130像素以内不做运算，运动回去
            if (Math.abs(distance) < 130) {
                move(ul, ulX);
            } else {
                // 满足条件，切换图片
                if (distance > 0) {
                    // 为0的判断
                    if (index == 0) {
                        index = count - 2;
                        ul.style.left = -index * liWidth + 'px';
                    }
                    index--;
                    move(ul, -index * liWidth);
                    setStyle(index);
                }
                else {
                    // 最后一张的判断
                    if (index == count - 1) {
                        index = 1;
                        ul.style.left = -index * liWidth + 'px';
                    }
                    index++;
                    move(ul, -index * liWidth);
                    setStyle(index);
                }
            }
            autoPlay();
        })
    }

    // 实现微课中点击
    var sale = document.getElementsByClassName('sale')[0];
    var arr = Array.prototype.slice.call(sale.children, 0);
    var card = document.getElementsByClassName('card')[0];
    var str1 = '<li><a href=""><img src="./images/wx.jpg" alt=""></a>\
                    <p><span>【前端】</span> <span>微信小程序</span></p>\
                     <div class="price">\
                        <span>100人学习</span>\
                        <span>￥99</span>\
                    </div>\
                </li>\
                <li><a href=""><img src="./images/quickAPP.jpg" alt=""></a>\
                    <p><span>【前端】</span> <span>快应用</span></p>\
                    <div class="price">\
                        <span>100人学习</span>\
                        <span>￥99</span>\
                        </div>\
                </li>\
                <li><a href=""><img src="./images/FE.png" alt=""></a>\
                    <p><span>【前端】</span> <span>就业班</span></p>\
                    <div class="price">\
                        <span>100人学习</span>\
                        <span>￥99</span>\
                    </div>\
                </li>';
    var str2 = '<li><a href=""><img src="./images/quickAPP.jpg" alt=""></a>\
                <p><span>【前端】</span> <span>微信小程序</span></p>\
                 <div class="price">\
                    <span>100人学习</span>\
                    <span>￥99</span>\
                </div>\
            </li>\
            <li><a href=""><img src="./images/wx.jpg" alt=""></a>\
                <p><span>【前端】</span> <span>快应用</span></p>\
                <div class="price">\
                    <span>100人学习</span>\
                    <span>￥99</span>\
                    </div>\
            </li>\
            <li><a href=""><img src="./images/FE.png" alt=""></a>\
                <p><span>【前端】</span> <span>就业班</span></p>\
                <div class="price">\
                    <span>100人学习</span>\
                    <span>￥99</span>\
                </div>\
            </li>';
    var str3 = '<li><a href=""><img src="./images/FE.png" alt=""></a>\
                    <p><span>【前端】</span> <span>微信小程序</span></p>\
                     <div class="price">\
                        <span>100人学习</span>\
                        <span>￥99</span>\
                    </div>\
                </li>\
                <li><a href=""><img src="./images/quickAPP.jpg" alt=""></a>\
                    <p><span>【前端】</span> <span>快应用</span></p>\
                    <div class="price">\
                        <span>100人学习</span>\
                        <span>￥99</span>\
                        </div>\
                </li>\
                <li><a href=""><img src="./images/wx.jpg" alt=""></a>\
                    <p><span>【前端】</span> <span>就业班</span></p>\
                    <div class="price">\
                        <span>100人学习</span>\
                        <span>￥99</span>\
                    </div>\
                </li>';

    // 添加样式
    sale.onclick = function (e) {
        arr.forEach(function (elem, i) {
            elem.index = i + 1;
            elem.classList.remove('active');
        });
        e.target.classList.add('active');
        render(e.target.index);
    }

    // 渲染函数
    function render(num) {
        card.innerHTML = '';
        switch (num) {
            case 1:
                card.innerHTML = str1 + str1;
                break;
            case 2:
                card.innerHTML = str2 + str2;
                break;
            case 3:
                card.innerHTML = str3 + str3;
                break;
        }
    }

})()