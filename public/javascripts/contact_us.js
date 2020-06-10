$(function() {
    var x = 113.332598, y = 23.015754;
    var map = new BMap.Map("map");
    var point = new BMap.Point(x, y);
    var marker = new BMap.Marker(point);  // 创建标注
    var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
	var top_left_navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
	var top_right_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}); //右上角，仅包含平移和缩放按钮

    map.centerAndZoom(point, 17); 
    map.enableScrollWheelZoom(true);
    map.enableDragging();
    map.addControl(top_left_control);        
    map.addControl(top_left_navigation);     
    map.addControl(top_right_navigation);    
        
	map.addOverlay(marker);               // 将标注添加到地图中
	marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
});