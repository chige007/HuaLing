$(function() {
    var lang = $('body').attr('data-lang');
    var mapLang = lang;
    if (lang == 'cn' || lang == 'hk') mapLang = 'zh_cn'

    var x = 113.327517, y = 23.008118;
    var map = new AMap.Map('map', {
        zoom: lang == 'en' ? 14 : 17,//级别
        center: [x, y],//中心点坐标
        lang: mapLang,
        viewMode: '3D'//使用3D视图
    });

    AMap.plugin([
        'AMap.ToolBar',
        'AMap.Scale',
        'AMap.OverView',
        'AMap.MapType',
        'AMap.Geolocation',
    ], function(){
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        map.addControl(new AMap.ToolBar());
    
        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        map.addControl(new AMap.Scale());
    
        // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
        map.addControl(new AMap.OverView({isOpen:true}));
       
        // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
        map.addControl(new AMap.MapType());
       
        // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
        map.addControl(new AMap.Geolocation());

        // 信息窗体的内容
        var content = {
            cn: [
                '<div style="font-size: 13px; color: #888;"><b style="margin-bottom: 8px; display: inline-block; font-size: 15px; color: #333">惠州桦岭进出口贸易有限公司</b>',
                '电话 : 020-81031628',
                '邮箱 : master@welon-cn.com',
                '地址 : 广州市番禺区大石镇工业二路1号之一华美国际1栋3楼</div></div>'
            ],
            hk: [
                '<div style="font-size: 13px; color: #888;"><b style="margin-bottom: 8px; display: inline-block; font-size: 15px; color: #333">惠州樺嶺進出口貿易有限公司</b>',
                '電話 : 020-81031628',
                '郵箱 : master@welon-cn.com',
                '地址 : 廣州市番禺區大石鎮工業二路1號之一華美國際1棟3樓</div></div>'
            ],
            en: [
                '<div style="font-size: 13px; color: #888;"><b style="margin-bottom: 8px; display: inline-block; font-size: 15px; color: #333">WELON China Ltd.</b>',
                'Telephone : 020-81031628',
                'E-mail : master@welon-cn.com',
                'Address : 3/F,Block 1,Nimble Huamei International,No.1-1,Gongye Er Lu,Dashi,Panyu,Guangzhou,Guangdong,China</div></div>'
            ]
        }

        // 创建 infoWindow 实例	
        var infoWindow = new AMap.InfoWindow({
            content: content[lang].join("<br>"),  //传入 dom 对象，或者 html 字符串
            offset: new AMap.Pixel(0, -30)
        });
            
        // 打开信息窗体
        var onMarkerClick = function(e) {
            infoWindow.open(map, e.target.getPosition());
        }

        var marker = new AMap.Marker({
            position: [x, y]
        })
        map.add(marker);
        marker.on('click', onMarkerClick);


        $('#gotoWelon').on('click', function() {
            map.panTo([x, y]);
        });
    });


    // var map = new BMap.Map("map");
    // var point = new BMap.Point(x, y);
    // var marker = new BMap.Marker(point);  // 创建标注
    // var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
	// var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
	// var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮

    // map.centerAndZoom(point, 17); 
    // map.enableScrollWheelZoom(true);
    // map.enableDragging();
    // map.addControl(top_left_control);        
    // map.addControl(top_left_navigation);     
    // map.addControl(top_right_navigation);    
        
	// map.addOverlay(marker);               // 将标注添加到地图中
	// marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
});