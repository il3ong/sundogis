// $(document).ready(function () {
//     $("#uploadButton").click(function () {
//         var formData = new FormData($("#uploadForm")[0]);

//         $.ajax({
//             url: "your-java-upload-endpoint", // Java 서버 업로드 엔드포인트 URL
//             type: "POST",
//             data: formData,
//             processData: false,
//             contentType: false,
//             success: function (response) {
//                 // 업로드 성공 처리
//                 alert("데이터가 성공적으로 업로드되었습니다.");
//                 $("#uploadModal").modal("hide");
//             },
//             error: function (xhr, status, error) {
//                 // 업로드 실패 처리
//                 alert("데이터 업로드 중 오류가 발생했습니다.");
//             }
//         });
//     });
// });

// $(function () {
//     $('#datepicker').datepicker({
//         calendarWeeks: false,
//         todayHighlight: true,
//         autoclose: true,
//         format: "yyyy-mm-dd",
//         language: "kr"
//     });
// });


// Full calendar 
document.addEventListener('DOMContentLoaded', function() {
	var calendarEl = document.getElementById('calendar');
	var calendar = new FullCalendar.Calendar(calendarEl, {
		initialView : 'dayGridMonth', // 초기 로드 될때 보이는 캘린더 화면(기본 설정: 달)
		headerToolbar : { // 헤더에 표시할 툴 바
			start : 'prev next today',
			center : 'title',
			end : 'dayGridMonth,dayGridWeek,dayGridDay'
		},
		titleFormat : function(date) {
			return date.date.year + '년 ' + (parseInt(date.date.month) + 1) + '월';
		},
		//initialDate: '2021-07-15', // 초기 날짜 설정 (설정하지 않으면 오늘 날짜가 보인다.)
		selectable : true, // 달력 일자 드래그 설정가능
		droppable : true,
		editable : true,
		nowIndicator: true, // 현재 시간 마크
		locale: 'ko' // 한국어 설정
	});
	calendar.render();
});