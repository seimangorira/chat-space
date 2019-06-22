$(function(){
　var cancelFlg = 0;

  function buildMessage(message) {
    var content = message.content? message.content : ""
    var image = message.image? message.image : ""

    var html = `<div class="message" data-messageid= ${message.id}> 
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${content}
                    </p>
                  </div>
                  <img class="lower-message__image" src=${image}>
                </div>`
      return html;
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $(".messages").append(html);
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, "fast");
      $("#new_message")[0].reset();
    })
    .fail(function(message){
      alert("メッセージを入力してください");
    })
    .always(function(message){
      $(".form__submit").prop("disabled", false);
    })
  })
  var reloadMessages = function() {
    if (location.pathname.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $(".message:last").last().data("messageid");
      var group_id = $(".left-header__title").data("groupid")
      $.ajax({
        url: `/groups/${group_id}/api/messages`,
        type: "GET",
        dataType: "json",
        data: {id: last_message_id, group_id: group_id}
      })
      .done(function(messages){
        var insertHTML = "";
        messages.forEach(function(message){
          var insertHTML = buildMessage(message);
          $(".messages").append(insertHTML);
          $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, "fast");
        });
      })
      .fail(function(){
        console.log("error");
      });
    }
  };

  setInterval(reloadMessages, 5000);
});