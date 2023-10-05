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

$(function () {
    $('#datepicker').datepicker({
        calendarWeeks: false,
        todayHighlight: true,
        autoclose: true,
        format: "yyyy-mm-dd",
        language: "kr"
    });
});

// datePicker 날짜 선택 이벤트
$('.calendar-date').datepicker().on('changeDate', function (e) {
    // 선택한 날짜에서 연도와 월을 가져옵니다.
    const selectedDate = e.date;
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // 월은 0부터 시작하므로 +1 해줍니다.
    const day = selectedDate.getDate();
});