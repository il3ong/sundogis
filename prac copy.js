const baseMapBtn = document.getElementById("base-map-btn");
const satelliteMapBtn = document.getElementById("satellite-map-btn");
const hybridMapBtn = document.getElementById("hybrid-map-btn");
const downloadBtn = document.getElementById("download-btn");
const menuShowBtn = document.getElementById("menu-show-btn");
const liveBtn = document.getElementById("live-btn");
const donwloadBtn = document.getElementById('download-btn');

const giheung = document.querySelector('.giheung');
const cheoin = document.querySelector('.cheoin');
const suji = document.querySelector('.suji');


const apiKey = '01FC9396-78C3-3A58-99A4-EF97461DFFEE';

let map;

// 용인시 경계
const boundary = new ol.layer.Tile({
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

const giheungBoundary = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: {
            'LAYERS': 'gihung',
            'TILED': true,

        },
        projection: 'EPSG:5174',
        serverType: 'geoserver',
    })
});

const cheoinBoundary = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: {
            'LAYERS': 'chuin',
            'TILED': true,

        },
        projection: 'EPSG:5174',
        serverType: 'geoserver',
    })
});

const sujiBoundary = new ol.layer.Tile({
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: {
            'LAYERS': 'suji',
            'TILED': true,

        },
        projection: 'EPSG:5174',
        serverType: 'geoserver',
    })
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


//  첫 화면 생성

// window.addEventListener("load", function () {
// });
startView();
function startView() {
    let mapType = "Base";
    let imgType = "png";
    map = new ol.Map({
        target: 'map',
        // 뷰, style 등을 관리하기 위해 설정
        layers: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: `https://api.vworld.kr/req/wmts/1.0.0/${apiKey}/${mapType}/{z}/{y}/{x}.${imgType}`
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

    //레이어 추가
    map.addLayer(boundary);
    boundary.setOpacity(0.5);
    // console.log(`Current map type: ${mapType}`);

    //  전체화면
    var myFullScreenControl = new ol.control.FullScreen();
    map.addControl(myFullScreenControl);
}




// 지도 유형 클릭
function mapTypeClick(layer) {
    // 모든 레이어를 지도에서 제거
    map.getLayers().forEach((mapLayer) => {
        map.removeLayer(mapLayer);
    });
    layer.setZIndex(-1);
    // 선택한 레이어를 지도에 추가
    map.addLayer(layer);
    map.addLayer(boundary);
}

// 일반 지도 클릭 이벤트 핸들러
function baseMapClick() {
    baseMapBtn.style.backgroundColor = '#293661';
    baseMapBtn.style.color = 'white';

    satelliteMapBtn.style.background = 'white';
    satelliteMapBtn.style.color = 'black';
    hybridMapBtn.style.background = 'white';
    hybridMapBtn.style.color = 'black';
    mapTypeClick(baseMap);
}

// 위성 지도 클릭 이벤트 핸들러
function satelliteMapClick() {
    satelliteMapBtn.style.backgroundColor = '#293661';
    satelliteMapBtn.style.color = 'white';

    baseMapBtn.style.background = 'white';
    baseMapBtn.style.color = 'black';
    hybridMapBtn.style.background = 'white';
    hybridMapBtn.style.color = 'black';
    mapTypeClick(satelliteMap);
}

// 하이브리드 지도 클릭 이벤트 핸들러
function hybridMapClick() {
    hybridMapBtn.style.backgroundColor = '#293661';
    hybridMapBtn.style.color = 'white';

    baseMapBtn.style.background = 'white';
    baseMapBtn.style.color = 'black';
    satelliteMapBtn.style.background = 'white';
    satelliteMapBtn.style.color = 'black';
    mapTypeClick(hybridMap);
}

// 지역(구) 클릭 이벤트 핸들러
// 처인구 클릭
function cheoinClick() {
    map.getView().setCenter(ol.proj.transform([127.201374, 37.234295], 'EPSG:4326', 'EPSG:3857'));
    map.addLayer(cheoinBoundary);

    cheoin.style.backgroundColor = '#293661';
    cheoin.style.color = 'white';

    giheung.style.background = 'white';
    giheung.style.color = 'black';
    suji.style.background = 'white';
    suji.style.color = 'black';
}

// 기흥구 클릭
function giheungClick() {
    map.getView().setCenter(ol.proj.transform([127.114716, 37.280386], 'EPSG:4326', 'EPSG:3857'));
    map.addLayer(giheungBoundary);

    giheung.style.backgroundColor = '#293661';
    giheung.style.color = 'white';

    cheoin.style.background = 'white';
    cheoin.style.color = 'black';
    suji.style.background = 'white';
    suji.style.color = 'black';
}

// 수지구 클릭
function sujiClick() {
    map.getView().setCenter(ol.proj.transform([127.097692, 37.322097], 'EPSG:4326', 'EPSG:3857'));
    map.addLayer(sujiBoundary);

    suji.style.backgroundColor = '#293661';
    suji.style.color = 'white';

    cheoin.style.background = 'white';
    cheoin.style.color = 'black';
    giheung.style.background = 'white';
    giheung.style.color = 'black';
}

// offcanvas 사용시 화면 비율 조정
document.addEventListener('DOMContentLoaded', function () {

    let viewMap = document.getElementById('map');
    let menuClosebtn = document.querySelector('#menu-close-btn');
    menuShowBtn.onclick = function () {
        viewMap.style.width = 'calc(100% - 400px)';
        viewMap.style.right = '0';
        menuShowBtn.style.display = "none";
        liveBtn.style.display = "none";
    }

    menuClosebtn.onclick = function () {
        viewMap.style.width = '100%';
        menuShowBtn.style.display = "";
        liveBtn.style.display = "";
    }
});

// 라이브 버튼 클릭
liveBtn.addEventListener('click', () => {
    downloadBtn.classList.toggle('hide-btn');
    menuShowBtn.classList.toggle('hide-btn');
    liveBtn.classList.toggle('blinkin-btn');
});

// 각 버튼 클릭 이벤트 리스너 추가
// 맵 유형 클릭
baseMapBtn.addEventListener('click', baseMapClick);
satelliteMapBtn.addEventListener('click', satelliteMapClick);
hybridMapBtn.addEventListener('click', hybridMapClick);

// 구 클릭
giheung.addEventListener('click', giheungClick);
cheoin.addEventListener('click', cheoinClick);
suji.addEventListener('click', sujiClick);

// // 다운로드 버튼 클릭시
// downloadBtn.addEventListener('click', downloadClick);


////////해야함 CSV 다운로드

// // csv 다운로드 클릭 함수
// function downloadClick() {
//     let gpsDownloadFile = "gps.csv";
//     let noiseDownloadFile = "noise.csv";
//     let rpmDownloadFile = "rpm.csv";
//     getCSV(gpsDownloadFile);
//     getCSV(noiseDownloadFile);
//     getCSV(rpmDownloadFile);
// }

// // CSV 생성 함수
// function getCSV(filename) {
//     var csv = [];
//     var row = [];

//     //1열에는 컬럼명
//     row.push(
//         "열 제목1",
//         "열 제목2",
//         "열 제목3",
//     );

//     csv.push(row.join(","));

//     //chartDataList는 데이터 배열
//     $.each(chartDataList, function (index, data) {
//         row = [];
//         row.push(
//             data.d1,
//             data.d2,
//             data.d3
//         );
//         csv.push(row.join(","));
//     });

//     downloadCSV(csv.join("\n"), filename);
// }


// //  CSV다운로드 함수
// function downloadCSV(csv, filename) {
//     var csvFile;
//     var downloadLink;

//     //한글 처리를 해주기 위해 BOM 추가하기
//     const BOM = "\uFEFF";
//     csv = BOM + csv;

//     csvFile = new Blob([csv], { type: "text/csv" });
//     downloadLink = document.createElement("a");
//     downloadLink.download = filename;
//     downloadLink.href = window.URL.createObjectURL(csvFile);
//     downloadLink.style.display = "none";
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
// }
