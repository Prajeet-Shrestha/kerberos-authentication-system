var DB = document.getElementById('clearDB');

try {
  const chec = localStorage.getItem('userlist');
  if (chec === null) {
    DB.classList.add('hide');
  }
} catch (e) {
  DB.classList.add('hide');
}

function clearDB() {
  var DB = document.getElementById('clearDB');
  var error = document.getElementById('error');

  try {
    error.classList.remove('show');
  } catch (e) {}
  window.localStorage.clear();
  DB.classList.add('hide');
}
