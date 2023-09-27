

window.addEventListener("load", function(){

let map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'https://api.vworld.kr/req/wmts/1.0.0/01FC9396-78C3-3A58-99A4-EF97461DFFEE/Base/{z}/{y}/{x}.png'
            })
        })
    ],
    view: new ol.View({
        center: ol.proj.transform([127.1775537, 37.2410864], 'EPSG:4326', 'EPSG:3857'),
        zoom: 11,
        minZoom : 0,
        maxZoom : 21
    })
});


    //레이어 추가
    var boundary = new ol.layer.Tile({
        source: new ol.source.TileWMS({
                url: 'http://localhost:8080/geoserver/wms',
                params: {
                    'LAYERS': 'lsmd_cont_ldreg_41460',
                    'TILED': true,
                    
                },
                projection: 'EPSG:5186',
                serverType: 'geoserver',
            })
         });
    // var boundary = new ol.layer.Tile({
    //     source: new ol.source.TileWMS({
    //             url: 'http://localhost:8080/geoserver/wms',
    //             params: {
    //                 'LAYERS': 'yongin',
    //                 'TILED': true,
                    
    //             },
    //             projection: 'EPSG:4326',
    //             serverType: 'geoserver',
    //         })
    //      });

    map.addLayer(boundary);
    boundary.setOpacity(0.5)

    // //  center과 경계 설정
    // //  좌표 설정 필수
    // var view = new ol.View({
	// 	center : ol.proj.transform([126.78566, 37.50526], 'EPSG:4326', 'EPSG:3857'),
	// 	zoom : 12,
	// 	extent : ol.proj.transformExtent([ 116.0, 30.0, 136.0, 45.0 ], 'EPSG:4326', 'EPSG:3857'),
	// 	maxZoom : 18,
	// 	minZoom : 6
	// });

    // //  지도 그리기
    // map = new ol.Map({
	// 	pixelRatio : 1,
	// 	controls : ol.control.defaults({
	// 		attribution : false,		//지도 컨트롤하는 부분
	// 		zoom : false
	// 	}),
	// 	layers : [ sido_layer ],
	// 	interactions : ol.interaction.defaults({
	// 		shiftDragZoom : true
	// 	}),
	// 	target : document.getElementById('map'),   //map영역을 target으로 잡겠다
	// 	view : view,
	// 	logo : false
	// });


});


