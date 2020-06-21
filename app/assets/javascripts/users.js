$(function(){
  var user_ids = [];
  function addUser(user){
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
      `;
      $("#user-search-result").append(html);
    }
  function addNoUser(){
    let html = `
    <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">ユーザーが見つかりません</p>
    </div>
    `;
    $("#user-search-result").append(html);
  }
  
  function addDeleteUser(id, name) {
    var html = `
              <div class='chat-group-user'>
              <input class='data-user-id' name='group[user_ids][]' type='hidden' value='${id}'>
               <p class='chat-group-user__name'>${name}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${id}">削除</div>
              </div>
              `
    $("#chat-group-users").append(html)
  }
  
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    var group_id = $(".chat__group_id").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input, groupId: group_id},
      dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          if(user_ids.includes(user.id) == false){
            addUser(user);
          }
        })        
      }else if (input.length == 0){
        return false;
      }else{
        addNoUser();
      }
    })
    .fail(function(){
      alert("通信エラーです。ユーザーが表示できません。");
    })
  })
  $(document).on('click', ".chat-group-user__btn--add",function(){
    const userId = $(this).attr("data-user-id");
    const userName = $(this).attr("data-user-name");
    $(this).parent().remove();
    addDeleteUser(userId, userName);
    user_ids.push(Number(userId));
  });

  $(document).on('click', ".chat-group-user__btn--remove", function(){
    const userId = $(this).attr("data-user-id");
    var idx = user_ids.indexOf(Number(userId));
    user_ids.splice(idx,1);
    $(this).parent().remove();
  });
})