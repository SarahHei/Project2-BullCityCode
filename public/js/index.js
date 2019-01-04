$(document).on('click', '.open-modal', function(){
  $('#register-modal').toggle();
})

$(document).on('click', '#modal-x', function(){
  $('#register-modal').toggle();
})

$(document).on('click', '#modal-close', function(){
  $('#register-modal').toggle();
})

$(document).on('click', '#modal-save', function(){
  //check if passwords match
  if($('#inputPassword1').val().trim() !== $('#inputPassword2').val().trim()) {
      //need to create function that displays to user that the passwords DON'T match and a newUser was not created
      mismatchPassword();
      return false;
  }
  //captures users data to send to db
  let newUser = {
      first_name: $('#inputFirstName').val().trim(),
      last_name: $('#inputLastName').val().trim(),
      address1: $('#inputAddress').val().trim(),
      address2: $('#inputAddress2').val().trim(),
      city: $('#inputCity').val().trim(),
      state: $('#inputState').val(),
      zipcode: $('#inputZip').val().trim(),
      telephone: $('#inputPhone').val().trim(),
      email: $('#inputEmail').val().trim(),
      password: $('#inputPassword1').val().trim(),
      learnMoreResearchOpp: $('#gridCheck1').is(':checked'),
      learnMoreGivingOpp: $('#gridCheck2').is(':checked'),
      learnMoreVitaNews: $('#gridCheck3').is(':checked'),
      time_to_call_morning: $('#timeCheck1').is(':checked'),
      time_to_call_afternoon: $('#timeCheck2').is(':checked'),
      time_to_call_evening: $('#timeCheck3').is(':checked')
  }

  //send post request
  $.post('/api/users', newUser).then(data=>{
      if(data){
          activeUser = {
            name: newUser.first_name,
            id: data.id
          }
          $('#register-modal').toggle();
          console.log(activeUser);
      }else{
          noUserCreated();
      }
  });
  showActiveUser();
});

$(document).on('click', '#login-submit', function(event){
  event.preventDefault();

  if (!$('#email-login').val() || !$('#password-login').val()){
      return false;
  }

  userLogin = {
      email: $('#email-login').val().trim(),
      password: $('#password-login').val().trim()
  }

  $.post('/api/users-login', userLogin, function(response){
      if(response){
          activeUser = {
              name: response.first_name,
              id: response.id
          }
          showActiveUser();
      }else{
          noUserFound();
      }
  })
})

// function to display which user is logged into the page
function showActiveUser(){
  if(activeUser){
      $('.show-user-name').text(activeUser.name)
  }
}

$(document).on('click', '#forum-submit', function(event){
  event.preventDefault();

  if(!activeUser || !$('#title').val() || !$('#body').val()){
    return false;
  }
  newPost = {
    title: $('#title').val().trim(),
    post: $('#body').val().trim(),
    UserId: activeUser.id
  }
  $.post('/api/forum', newPost).then(data=>{
    if(data){
      location.reload();
    }else{
      noPostCreated();
    }
  });
})

showActiveUser();