$(function () {
   function resize() {
       // 获取屏幕宽度
       var windowWidth = $(window).width();
       //判断屏幕是大是小
       var issmallScreen = windowWidth <768;
       //根据屏幕大小为界面上每张轮播图设置背景
       //$('#main_ad>.carousel-inner>.item') 获取到的是多个DOM数组，需要遍历
       $('#main_ad>.carousel-inner>.item').each(function (i,item) {
           var $item = $(item); //因为拿到的是DOM对象，需要转换为jquery对象
           var imgsrc = $item.data(issmallScreen?'img-xs':'img-lg');
           // $element.data()是一个函数，专门用于取元素上的自定义属性(data-abc) 函数的参数是我们要取的属性名称(abc)
           //设置背景图片
            $item.css('backgroundImage','url("'+imgsrc+'")');
           //因为我们需要小图时尺寸等比例变化 所以小图时使用img方式  不用background
           if (issmallScreen){
               $item.html('<img src="'+ imgsrc+'" />');
           }else {
               $item.empty();
           }
       })
   }

   $(window).on('resize',resize).trigger('resize');


//初始化tooltips插件
    $('[data-target="tooltip"]').tooltip();


//控制标签页的标签容器宽度
    var $ulContainer = $('.nav-tabs');
    //获取所有子元素宽度的和
    var width =30;//因为原本ul上有padding-left
    $ulContainer.children().each(function (index,element) {
        console.log(element.clientWidth);
        // console.log($(element).width());
        width += element.clientWidth;
    });
    //此时width等于所有li的总和
    //判断当前ul的宽度是否超出屏幕，超出就显示横向滚动条
    if (width>$(window).width()){
        $ulContainer
            .css('width',width)
            .parent().css('overflow-x','scroll');
    }


//a注册事件
    var $newtitle = $('.news-title');
    $('#news .nav-pills a').on('click',function () {
        //获取当前点击元素
        var $this =$(this);
        //获取对应的title值
        var title = $this.data("title");
        //将title设置到对应位置
        $newtitle.text(title);
    });



//1获取手指在轮播图元素上的一个滑动方向（左右）
    //获取轮播图容器
    var $carousels = $('.carousel');
    var startX,endX;
    var offset = 50;
    //注册滑动事件
    $carousels .on('touchstart',function (e) {
        //手指触摸开始时记录下x坐标
        // console.log(e.originalEvent.touches[0].clientX);
        startX = e.originalEvent.touches[0].clientX
        console.log(startX);
    });
        $carousels .on('touchmove',function (e) {
        //变量重复赋值
       // console.log(e.originalEvent.touches[0].clientX);
        endX = e.originalEvent.touches[0].clientX;
    });
        //结束一瞬间记录手指的x坐标,比大小
    $carousels .on('touchend',function (e) {
       console.log(endX);
       //控制精度：获取每次运动的距离，当距离大于一定值时，认为方向有变化
        var distance = Math.abs(startX-endX);
        if (distance> offset){
            //有方向变化
            // console.log(startX>endX?'<-':'->')
            //2根据获得的方向选择上一张还是下一张
            $carousels.carousel(startX>endX?'next':'prev')
        };
    });

});
