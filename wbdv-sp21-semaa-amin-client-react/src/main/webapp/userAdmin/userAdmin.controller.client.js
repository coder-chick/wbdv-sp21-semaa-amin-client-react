var $tableBody;
var $findAllUsers
var $createUser;
var $updateUser;
var $editUser;
var $usernameFld;
var $firstNameFld;
var $lastNameFld;
var $passwordFld;
var $roleFld;
var users;
var $body;
var $modal;

var userService = new AdminUserServiceClient();

function createUser() {
  if(isEmpty()) {
    alert("Looks like you missed filling a field! Please fill out all fields")
    return
  }

  var newUser = {
    username: $usernameFld.val(),
    firstName: $firstNameFld.val(),
    lastName: $lastNameFld.val(),
    password: $passwordFld.val(),
    role: $roleFld.val()
  }
  userService.createUser(newUser).then(function(userData) {
    if(userData) {
      alert("Succefully created user!")
      users.push(userData)
      emptyInputFields()
      renderUsers(users)
      
    } else {
      alert("Oops, an error occured, try again!")
    }
    
  })
}


var selectUser = null
function editUser (event) {
  var userId = $(event.target).attr("id")
  selectUser = users.find(user => user._id === userId)
  if(selectUser) {
    fillFields(selectUser)
  } else {
    alert("Oops, an error occured, try again!")
  }
}

function updateUser() {
  if (isEmpty()) {
    alert("Please select a user! Don't forget to fill all fields")
    return
  }

  selectUser.username = $usernameFld.val();
  selectUser.firstName = $firstNameFld.val();
  selectUser.lastName = $lastNameFld.val();
  selectUser.password = $passwordFld.val();
  selectUser.role = $roleFld.val()
  

  userService.updateUser(selectUser._id, selectUser)
  .then(function (status) {
    if (status) {
      var index = users.findIndex(user => user._id === selectUser._id)
      users[index] = selectUser
      alert("Great, user updated!")
      
      renderUsers(users)
    } else {
      alert("Oops, an error occured, try again!")
    }
    emptyInputFields()
  })
}


function deleteUser(event) {
  var index = $(event.target).attr("id")
  var userId = users[index]._id
  userService.deleteUser(userId).then(function (status) {
    users.splice(index, 1)
    renderUsers(users)
    alert("User successfully deleted!")
  })
}

function isEmpty() {
  /** https://forum.jquery.com/topic/checking-multiple-input-fields */
  if ($('.semaa-input').filter(function() { 
    return this.value === ""
   }).length === 0) {
    return false
  }
  return true
}

function fillFields (user) {
  $usernameFld.val(user.username);
  $firstNameFld.val(user.firstName);
  $lastNameFld.val(user.lastName);
  $passwordFld.val(user.password);
  $roleFld.val(user.role);
}

function emptyInputFields() {
  $usernameFld.val("");
  $firstNameFld.val("");
  $lastNameFld.val("");
  $passwordFld.val("");
  $roleFld.val("");
}


function renderUsers(usersArray) {
  $tableBody.empty()
  for (var i = 0; i < usersArray.length; i++) {
    var user = usersArray[i];
    $tableBody.prepend(` 
			<div class="semaa-table-row">
        <div class="col-6 semaa-col-md-2-2">
          <div class="row">
            <span class="semaa-table-hidden-element">
              Username:&nbsp;&nbsp;
            </span>
            ${user.username}
          </div>
        </div>
        <div class="col-6 semaa-col-md-2-2">
          <div class="row">
            <span class="semaa-table-hidden-element">
              First Name:&nbsp;&nbsp;
            </span>
            ${user.firstName}
          </div>
        </div>
        <div class="col-6 semaa-col-md-2-2">
          <div class="row">
            <span class="semaa-table-hidden-element">
              Last Name:&nbsp;&nbsp;
            </span>
            ${user.lastName}
          </div>
        </div>
        <div class="col-6 semaa-col-md-2-2">
          <div class="row">
            <span class="semaa-table-hidden-element">
              Password:&nbsp;&nbsp;
            </span>
            ${user.password}
          </div>
        </div>
        <div class="col-6 semaa-col-md-2-2">
          <div class="row">
            <span class="semaa-table-hidden-element">
              Role:&nbsp;&nbsp;
            </span>
            ${user.role}
          </div>
        </div>
        <div class="semaa-table-hidden-element p-2">&nbsp;</div>
        <div class="wbdv-actions col-12 col-md-1">
          <div class="semaa-centered-container">
            <div class="semaa-icon semaa-icon-btn-nautical col">
              <a class="semaa-delete-user-btn">
                <i class="fa fa-times fa-lg wbdv-remove" id="${i}"></i>
                <span class="semaa-table-hidden-element">
                  Delete User
                </span>
              </a>
            </div>
            <div class="semaa-icon semaa-icon-btn-dark col">
              <a class="semaa-edit-user-btn">
                <i class="fa fa-pencil fa-lg wbdv-edit" id="${user._id}"></i>
                <span class="semaa-table-hidden-element">
                  Edit User
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>`)
  }
  $('.semaa-delete-user-btn').click(deleteUser)
  $('.semaa-edit-user-btn').click(editUser)
}

function main() {
  $tableBody = $('.semaa-table-body');
  $createUser = $('.semaa-create-user-btn')
  $updateUser = $('.semaa-update-user-btn')
  $usernameFld = $('.semaa-username-fld')
  $firstNameFld = $('.semaa-firstname-fld')
  $lastNameFld = $('.semaa-lastname-fld')
  $passwordFld = $('.semaa-password-fld')
  $roleFld = $('.semaa-role-fld')
  $body = $('body')



  $createUser.click(createUser)
  $updateUser.click(updateUser)

  userService.findAllUsers().then(function(usersData) {
    users = usersData
    renderUsers(users)
  })
}
$(main)