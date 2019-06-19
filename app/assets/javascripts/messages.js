$(function(){
　var cancelFlg = 0;

  function buildMessage(message){
    console.log(message);
    if(message.content  && message.image.url ) {
    var html = `<div class="message">
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
                      ${message.content}
                    </p>
                  </div>
                  <img class="lower-message__image" src=${message.image.url}>
                </div>`
      return html;
    } else if(message.content){
      var html = `<div class="message">
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
                        ${message.content}
                      </p>
                    </div>
                  </div>`
        return html;
    } else if(message.image.url){
      var html = `<div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <img class="lower-message__image" src=${message.image.url}>
                    </div>
                  </div>`
        return html;
    } else {
      $(function(){
        alert("入力内容がありません");
      })
    }
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
      alert("エラー");
    })
    .always(function(message){
      $(".form__submit").prop("disabled", false);
    })


  })
});