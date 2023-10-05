const baseMapBtn = document.getElementById("base-map-btn");
const satelliteMapBtn = document.getElementById("satellite-map-btn");
const hybridMapBtn = document.getElementById("hybrid-map-btn");
const downloadBtn = document.getElementById("download-btn");
const menuShowBtn = document.getElementById("menu-show-btn");

const giheung = document.querySelector('.giheung');
const cheoin = document.querySelector('.cheoin');
const suji = document.querySelector('.suji');




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

// offcanvas 사용시 화면 비율 조정
// document.addEventListener('DOMContentLoaded', function () {

//     let viewMap = document.getElementById('map');
//     menuShowBtn.onclick = function () {
//         viewMap.style.width = '70%';
//         viewMap.style.position = 'absolute';
//         viewMap.style.right = '0';
//         menuShowBtn.style.display = "none";
//     }

//     let btnClose = document.querySelector('.btn-close');

//     btnClose.onclick = function () {
//         viewMap.style.width = '100%';
//         menuShowBtn.style.display = "";
//     }
// });

var myOffcanvas = document.getElementById('myOffcanvas')
myOffcanvas.addEventListener('hidden.bs.offcanvas', function () {
    let viewMap = document.getElementById('map');
    viewMap.style.width = '70%';
    viewMap.style.position = 'absolute';
    viewMap.style.right = '0';
    menuShowBtn.style.display = "none";
})
myOffcanvas.addEventListener('show.bs.offcanvs', function () {
    let viewMap = document.getElementById('map');
    viewMap.style.width = '100%';
    menuShowBtn.style.display = "";
})


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
// 맵 유형 클릭
baseMapBtn.addEventListener('click', baseMapClick);
satelliteMapBtn.addEventListener('click', satelliteMapClick);
hybridMapBtn.addEventListener('click', hybridMapClick);

// 구 클릭
giheung.addEventListener('click', giheungClick);
cheoin.addEventListener('click', cheoinClick);
suji.addEventListener('click', sujiClick);

// 다운로드 버튼 클릭시
downloadBtn.addEventListener('click', downloadClick);

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

// 지역(구) 클릭 이벤트 핸들러
// 처인구 클릭
function cheoinClick() {

    map.getView().setCenter(ol.proj.transform([127.201374, 37.234295], 'EPSG:4326', 'EPSG:3857'));

    cheoin.style.backgroundColor = '#0D6EFD';
    cheoin.style.color = 'white';

    giheung.style.background = 'white';
    giheung.style.color = 'black';
    suji.style.background = 'white';
    suji.style.color = 'black';
}

// 기흥구 클릭
function giheungClick() {


    map.getView().setCenter(ol.proj.transform([127.114716, 37.280386], 'EPSG:4326', 'EPSG:3857'));
    giheung.style.backgroundColor = '#0D6EFD';
    giheung.style.color = 'white';

    cheoin.style.background = 'white';
    cheoin.style.color = 'black';
    suji.style.background = 'white';
    suji.style.color = 'black';
}


// 수지구 클릭
function sujiClick() {

    map.getView().setCenter(ol.proj.transform([127.097692, 37.322097], 'EPSG:4326', 'EPSG:3857'));

    suji.style.backgroundColor = '#0D6EFD';
    suji.style.color = 'white';

    cheoin.style.background = 'white';
    cheoin.style.color = 'black';
    giheung.style.background = 'white';
    giheung.style.color = 'black';
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
