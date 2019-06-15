$(function() {
  function buildHTML(message){
    var html = `<p class="lower-message__content">
                  ${message.content}
                  ${message.image}
                </p>`
  }
  $(".form").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
    })
  })
})