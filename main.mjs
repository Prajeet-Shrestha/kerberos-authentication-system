function toggleContainer(current) {
  var loginForm = document.getElementById('login-form');
  var dataTable = document.getElementById('dataTable');
  var mainPage = document.getElementById('mainPage');

  var registerForm = document.getElementById('register-form');
  var username = document.getElementById('register-username');
  var password = document.getElementById('register-password');
  var email = document.getElementById('register-email');
  var Lusername = document.getElementById('login-username');
  var Lpassword = document.getElementById('login-password');
  var Lerror = document.getElementById('login-error');
  var error = document.getElementById('error');
  error.classList.remove('show');
  Lerror.classList.remove('show');
  username.value = '';
  password.value = '';
  email.value = '';
  Lusername.value = '';
  Lpassword.value = '';
  Lerror.value = '';
  if (current == 'REGISTER') {
    loginForm.classList.add('show');
    mainPage.classList.add('show');

    registerForm.classList.remove('show');
    dataTable.classList.remove('show');
  } else if (current == 'TABLE') {
    showDB();
    dataTable.classList.add('show');
    mainPage.classList.remove('show');
    loginForm.classList.remove('show');
    registerForm.classList.remove('show');
  } else {
    registerForm.classList.add('show');
    loginForm.classList.remove('show');
    mainPage.classList.add('show');
    dataTable.classList.remove('show');
  }
}

function register() {
  var username = document.getElementById('register-username');
  var password = document.getElementById('register-password');
  var email = document.getElementById('register-email');
  var error = document.getElementById('error');
  var DB = document.getElementById('clearDB');

  const user = {
    username: username.value,
    password: sha256(password.value),
    email: email.value,
  };
  console.log(user);
  if (user.email.length >= 1 && user.password.length >= 1 && user.username.length >= 1) {
    if (user.email.includes('@')) {
      error.classList.remove('show');

      var userlist = [];
      try {
        var userPrelist = JSON.parse(window.localStorage.getItem('userlist'));
        var userExits = false;
        userPrelist.map((data) => {
          console.log(user['username'], data['username']);
          if (user['username'] == data['username']) {
            userExits = true;
          }
        });
        if (userExits) {
          error.classList.add('show');
          error.innerHTML = erroMessage('Username already exits');
        } else {
          console.log(user);

          error.classList.add('show');
          DB.classList.remove('hide');

          error.innerHTML = successMessage('User created');
          userPrelist.push(user);
          window.localStorage.setItem('userlist', JSON.stringify(userPrelist));
          email.value = '';
          username.value = '';
          password.value = '';
        }
      } catch (e) {
        console.log('FROMM ERROR');
        DB.classList.remove('hide');

        console.log(user);

        error.classList.add('show');
        //   DB.classList.remove('hide');

        error.innerHTML = successMessage('User created');
        userlist.push(user);
        window.localStorage.setItem('userlist', JSON.stringify(userlist));
        email.value = '';
        username.value = '';
        password.value = '';
      }
    } else {
      error.classList.add('show');
      error.innerHTML = erroMessage('Invalid email address');
    }
  } else {
    error.classList.add('show');
    error.innerHTML = erroMessage('Empty form not allowed');
  }
}

function erroMessage(msg) {
  return `  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff1c1c">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
    />
  </svg> ${msg}.`;
}

function successMessage(msg) {
  return `  
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#4caf50"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> ${msg}.`;
}

function login() {
  var username = document.getElementById('login-username');
  var password = document.getElementById('login-password');
  var error = document.getElementById('login-error');

  const user = {
    username: username.value,
    password: sha256(password.value),
  };
  if (user.password.length >= 1 && user.username.length >= 1) {
    try {
      var userPrelist = JSON.parse(window.localStorage.getItem('userlist'));
      var userExits = false;
      var userIndex = 0;
      userPrelist.map((data, index) => {
        console.log(user['username'], data['username']);
        if (user['username'] == data['username']) {
          userExits = true;
          userIndex = index;
        }
      });
      if (userExits) {
        if (user.password == userPrelist[userIndex]['password']) {
          error.classList.add('show');
          error.innerHTML = successMessage('Successfully Logged in');
          username.value = '';
          password.value = '';
        } else {
          error.classList.add('show');
          error.innerHTML = erroMessage('Incorrect password.');
        }
      } else {
        console.log(user);
        error.classList.add('show');

        error.innerHTML = erroMessage('User does not exist.');
      }
    } catch (e) {
      console.log('FROMM ERROR');

      error.classList.add('show');

      error.innerHTML = erroMessage('User does not exist.');
    }
  }
}

function showDB() {
  var tbody = document.getElementById('tbody');
  const chec = localStorage.getItem('userlist');
  embedableCode = '';
  console.log(chec);
  tbody.innerHTML = embedableCode;
  if (chec !== null) {
    var object = JSON.parse(chec);
    console.log(object);
    object.map((data) => {
      embedableCode += returnFilledRow(data.username, data.password, data.email);
    });
    tbody.innerHTML = embedableCode;
  }
}

function returnFilledRow(userName, Password, email) {
  return `<div class="tr">
  <div class="td"> ${userName} </div>
  <div class="td"> ${email}</div>
  <div class="td"> ${Password} </div>
</div>`;
}
