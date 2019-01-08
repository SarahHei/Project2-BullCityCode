// user posts something to the forum
$(document).on('click', '#forum-submit', function(event){
    event.preventDefault();
  
    if(!activeUser){
      return noPostCreated();
    }
    newPost = {
      title: $('#title').val().trim(),
      post: $('#body').val().trim(),
      UserId: activeUser.id
    }
    $.post('/api/forum', newPost)
    .done(data=>{
      if(data){
        location.reload();
      }else{
        noPostCreated();
      }
    })
    .fail(err=>{
      noPostCreated();
    });
  })

  //deletes posts if active user is the one who created the post
  $(document).on('click', '.delete-post', function(){
      if($(this).attr('data-user') != activeUser.id) {
          return false;
      }else{
          $.ajax({
              url: '/api/forum/' + $(this).attr('data-post'),
              type: 'DELETE',
              success: function(result){
                  location.reload();
              }
          })
      }
  })


  // handles a failed post
function noPostCreated(){
    $('#title, #body').addClass('border-danger');
    if(!activeUser){
      $('#title').val("");
      $('#body').val("").attr('placeholder', "Must be logged in to post!");
    }else{
      if(!$('#title').val()){
        $('#title').attr('placeholder', "Title Required!")
      }else if($('#body').val().trim().length < 10){
        $('#body').val("").attr('placeholder', "Must be at lease 10 characters to post!");
      };
    };
  }

  //formats time display for each post
$(document).ready(function(){
    $('.created-at').each(function(){
        let time = $(this).attr('data-created');
        let convertedTime = moment(time).format('M/D/YY h:mm a');
        $(this).text(convertedTime)
    })
})

