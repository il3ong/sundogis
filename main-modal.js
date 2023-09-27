$(document).ready(function() {
    $("#uploadButton").click(function() {
      var formData = new FormData($("#uploadForm")[0]);
  
      $.ajax({
        url: "your-java-upload-endpoint", // Java 서버 업로드 엔드포인트 URL
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
          // 업로드 성공 처리
          alert("데이터가 성공적으로 업로드되었습니다.");
          $("#uploadModal").modal("hide");
        },
        error: function(xhr, status, error) {
          // 업로드 실패 처리
          alert("데이터 업로드 중 오류가 발생했습니다.");
        }
      });
    });
  });
