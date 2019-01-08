
// =================================================
// === CLICK EVENTS ================================
// =================================================

// clicking register button opens registration modal
$(document).on('click', '.open-modal', function(){
  $('#register-modal').toggle();
})

// modal closes correctly when click 'X'
$(document).on('click', '#modal-x', function(){
  $('#register-modal').toggle();
})

// modal closes correctly when click 'Cancel'
$(document).on('click', '#modal-close', function(){
  $('#register-modal').toggle();
})

// submit new user registration
$(document).on('click', '#modal-save', function(){
  //check if passwords match
  if($('#inputPassword1').val().trim() !== $('#inputPassword2').val().trim()) {
      //need to create function that displays to user that the passwords DON'T match and a newUser was not created
      return mismatchPassword();
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
      learnMoreVitalNews: $('#gridCheck3').is(':checked'),
      time_to_call_morning: $('#timeCheck1').is(':checked'),
      time_to_call_afternoon: $('#timeCheck2').is(':checked'),
      time_to_call_evening: $('#timeCheck3').is(':checked')
  }

  //send post request to create new user in db
  $.post('/api/users', newUser)
  .done(data=>{
      if(data && data !== "user already exists"){
          activeUser = {
            name: newUser.first_name,
            id: data.id
          }

          localStorage.clear();
          localStorage.setItem("activeUser", JSON.stringify(activeUser));

          $('#register-modal').toggle();
          showActiveUser();
      }else if(data === 'user already exists'){
        userAlreadyExists();
      }else{
          noUserCreated();
      }
  })
  .fail(err => {
    noUserCreated()
  });
});

// user logs in after entering credentials
$(document).on('click', '#login-submit', function(event){
  event.preventDefault();
  // do nothing if user didn't type anything in
  if (!$('#email-login').val() || !$('#password-login').val()){
      return false;
  }

  userLogin = {
      email: $('#email-login').val().trim(),
      password: $('#password-login').val().trim()
  }

  $.post('/api/users-login', userLogin, function(response){
    switch(response) {
      case 'no user':
        noUserFound();
        break;
      case 'incorrect password':
        incorrectPassword();
        break;
      default:
        activeUser = {
          name: response.first_name,
          id: response.id
        }
        //stores the active user's name and id in local storage so they don't have to log in after leaving that particular page
        localStorage.clear();
        localStorage.setItem("activeUser", JSON.stringify(activeUser));

        showActiveUser();
    }
  }).fail(noUserFound());
})

// user logs themselves out - clears info from local storage
$(document).on('click', '.log-out', function(){
  localStorage.clear();
  activeUser = ""
  location.reload();
})

// =================================================
// === FUNCTIONS ===================================
// =================================================

// function to display which user is logged into the page -> ran upon every page load
function showActiveUser(){
  let storedUser = localStorage.getItem("activeUser");
  storedUser = JSON.parse(storedUser);
  if(storedUser){
      $('.show-user-name').text("Hi " + storedUser.name)
      activeUser = storedUser;
      $('#login-form').hide();
      $('.log-out').show();
  }else{
    return false;
  }
}

function mismatchPassword(){
  $('#inputPassword1, #inputPassword2').val("").addClass('border-danger');
  $('#registration-error').text('passwords don\'t match');
}

function noUserCreated(){
  $('#inputFirstName').addClass('border-danger');
  $('#inputLastName').addClass('border-danger');
  $('#inputAddress').addClass('border-danger');
  $('#inputAddress2');
  $('#inputCity').addClass('border-danger');
  $('#inputState').addClass('border-danger');
  $('#inputZip').addClass('border-danger');
  $('#inputPhone');
  $('#inputEmail').addClass('border-danger');
  $('#inputPassword1').addClass('border-danger');
  $('#inputPassword2').addClass('border-danger');

  $('#registration-error').text('Required *');

}

function userAlreadyExists(){
  $('#inputEmail').val("").addClass('border-danger');
  $('#registration-error').text('email address already in use');
}

function noUserFound(){
  $('#email-login, #password-login').val("").addClass('border-danger');
  $('#email-login').prop('placeholder', "No User Found");
}

function incorrectPassword(){
  $('#email-login, #password-login').val("").addClass('border-danger');
  $('#email-login').prop('placeholder', "Incorrect Password");
}

showActiveUser();