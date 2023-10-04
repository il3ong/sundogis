const baseMapBtn = document.getElementById("base-map-btn");
const satelliteMapBtn = document.getElementById("satellite-map-btn");
const hybridMapBtn = document.getElementById("hybrid-map-btn");
const downloadBtn = document.getElementById("download-btn");
const menuHideBtn = document.getElementById("menu-hide-btn");
const mainView = document.getElementById("main-view");
const bigMap = document.getElementById("big-map");
const bigView = document.getElementById("big-view");

const apiKey = '01FC9396-78C3-3A58-99A4-EF97461DFFEE';
let map;


//  첫 화면 생성
window.addEventListener("load", function () {

    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: `https://api.vworld.kr/req/wmts/1.0.0/${apiKey}/Base/{z}/{y}/{x}.png`
                })
            })
        ],
        view: new ol.View({
            center: ol.proj.transform([127.1775537, 37.2410864], 'EPSG:4326', 'EPSG:3857'),
            zoom: 11,
            minZoom: 0,
            maxZoom: 21
        })

    });

    // var mapTwo = new ol.Map({
    //     target: 'big-map',
    //     layers: [
    //         new ol.layer.Tile({
    //             source: new ol.source.XYZ({
    //                 url: `https://api.vworld.kr/req/wmts/1.0.0/${apiKey}/Base/{z}/{y}/{x}.png`
    //             })
    //         })
    //     ],
    //     view: new ol.View({
    //         center: ol.proj.transform([127.1775537, 37.2410864], 'EPSG:4326', 'EPSG:3857'),
    //         zoom: 11,
    //         minZoom: 0,
    //         maxZoom: 21
    //     })

    // });

    //레이어 추가
    // var boundary = new ol.layer.Tile({
    //     source: new ol.source.TileWMS({
    //         url: 'http://localhost:8080/geoserver/wms',
    //         params: {
    //             'LAYERS': 'lsmd_cont_ldreg_41460',
    //             'TILED': true,

    //         },
    //         projection: 'EPSG:5186',
    //         serverType: 'geoserver',
    //     })
    // });

    //  전체화면
    var myFullScreenControl = new ol.control.FullScreen();
    map.addControl(myFullScreenControl);

    // map.addLayer(boundary);
    // boundary.setOpacity(0.5)


});

// 일반 지도
const baseMap = new ol.layer.Tile({
    name: 'base',
    visible: true,
    source: new ol.source.XYZ({
        url: `https://api.vworld.kr/req/wmts/1.0.0/${apiKey}/Base/{z}/{y}/{x}.png`
    })
});


// 위성 지도 
const satelliteMap = new ol.layer.Tile({
    name: 'Satellite',
    visible: true,
    source: new ol.source.XYZ({
        url: `http://api.vworld.kr/req/wmts/1.0.0/${apiKey}/Satellite/{z}/{y}/{x}.jpeg`
    })
});

// 하이브리드 지도
const hybridMap = new ol.layer.Tile({
    name: 'Hybrid',
    visible: true,
    source: new ol.source.XYZ({
        url: `http://api.vworld.kr/req/wmts/1.0.0/${apiKey}/Hybrid/{z}/{y}/{x}.png`
    })
});

// 각 버튼 클릭 이벤트 리스너 추가
baseMapBtn.addEventListener('click', baseMapClick);
satelliteMapBtn.addEventListener('click', satelliteMapClick);
hybridMapBtn.addEventListener('click', hybridMapClick);

// 다운로드 버튼 클릭시
downloadBtn.addEventListener('click', downloadClick);

// 메뉴 숨기기 버튼 클릭시
// menuHideBtn.addEventListener('click',menuHideBtnClick);

// 지도 유형 클릭
function mapTypeClick(layer) {
    // 모든 레이어를 지도에서 제거
    map.getLayers().forEach((mapLayer) => {
        map.removeLayer(mapLayer);
    });

    // 선택한 레이어를 지도에 추가
    map.addLayer(layer);
}

// 일반 지도 클릭 이벤트 핸들러
function baseMapClick() {
    mapTypeClick(baseMap);
}

// 위성 지도 클릭 이벤트 핸들러
function satelliteMapClick() {
    mapTypeClick(satelliteMap);
}

// 하이브리드 지도 클릭 이벤트 핸들러
function hybridMapClick() {
    mapTypeClick(hybridMap);
}

// csv 다운로드 클릭 함수
function downloadClick() {
    let filename = "test.csv";
    getCSV(filename);
}

function getCSV(filename) {
    var csv = [];
    var row = [];

    //1열에는 컬럼명
    row.push(
        "열 제목1",
        "열 제목2",
        "열 제목3",
    );

    csv.push(row.join(","));

    //chartDataList는 데이터 배열
    $.each(chartDataList, function (index, data) {
        row = [];
        row.push(
            data.d1,
            data.d2,
            data.d3
        );
        csv.push(row.join(","));
    });

    downloadCSV(csv.join("\n"), filename);

}

//  CSV다운로드 함수
function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;
  
    //한글 처리를 해주기 위해 BOM 추가하기
    const BOM = "\uFEFF";
    csv = BOM + csv;
  
    csvFile = new Blob([csv], { type: "text/csv" });
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

// 상세메뉴 숨김
// function menuHideBtnClick(){
//     mainView.style.display="none";
//     bigView.style.display="";
// }


// //  center과 경계 설정
// //  좌표 설정 필수
// var view = new ol.View({
//    center : ol.proj.transform([126.78566, 37.50526], 'EPSG:4326', 'EPSG:3857'),
//    zoom : 12,
//    extent : ol.proj.transformExtent([ 116.0, 30.0, 136.0, 45.0 ], 'EPSG:4326', 'EPSG:3857'),
//    maxZoom : 18,
//    minZoom : 6
// });

// //  지도 그리기
// map = new ol.Map({
//    pixelRatio : 1,
//    controls : ol.control.defaults({
//       attribution : false,      //지도 컨트롤하는 부분
//       zoom : false
//    }),
//    layers : [ sido_layer ],
//    interactions : ol.interaction.defaults({
//       shiftDragZoom : true
//    }),
//    target : document.getElementById('map'),   //map영역을 target으로 잡겠다
//    view : view,
//    logo : false
// });


// // 기존 Zoom 컨트롤 제거
// map.getControls().forEach(function (control) {
//     if (control instanceof ol.control.Zoom) {
//         map.removeControl(control);
//     }
// });

// // 줌 컨트롤러 생성
// let zoomControl = new ol.control.Zoom();

// // 오른쪽 상단으로 컨트롤러를 이동
// let zoomControlDiv = document.createElement('div');
// zoomControlDiv.className = 'ol-control ol-unselectable zoom-control';
// zoomControlDiv.appendChild(zoomControl.element);
// map.addControl(new ol.control.Control({
//     element: zoomControlDiv,
//     target: 'map'

// }));