const accountValidate = /^[a-zA-Z0-9]{6,20}$/

//user constructor
function User(account, password, taskList){
  this.account = account;
  this.password = password;
  this.taskList = taskList;
}
//set default localStorage

var usertest = new User('hello','iam','vanhoc');
let isName = false;
let isPassword =false;
let isPasswordConfirm = false;
var arr = [];
var arrToCheckEmpty = JSON.parse(localStorage.getItem('user'))

if(arrToCheckEmpty == null){
  localStorage.setItem('user' , JSON.stringify([usertest]))
  localStorage.setItem('logged' , JSON.stringify(false))
}
arr = JSON.parse(localStorage.getItem('user'))
function resetLogged(){
  localStorage.setItem('logged' , JSON.stringify(false))
}
let logged = JSON.parse(localStorage.getItem('logged'))

//validate
function checkName(name){
  if(!accountValidate.test(name.value) && name.value != ''){
    name.parentElement.classList.add('invalid')
    name.parentElement.classList.remove('valid')
    isName = false
  }else if(name.value != ''){
    name.parentElement.classList.add('valid')
    name.parentElement.classList.remove('invalid')
    isName = true
  }else{
    name.parentElement.classList.remove('invalid')
    name.parentElement.classList.remove('valid')
    isName = false
  }
}
function checkPassword(password){
  if(password.value.trim().length < 8 && password.value != ''){
    password.parentElement.classList.add('invalid')
    password.parentElement.classList.remove('valid')
    isPassword = false
  }else if(password.value != ''){
    password.parentElement.classList.add('valid')
    password.parentElement.classList.remove('invalid')
    isPassword = true
  }else{
    password.parentElement.classList.remove('invalid')
    password.parentElement.classList.remove('valid')
    isPassword = false
  }
}
function checkPasswordConfirm(passwordConfirm){
  let password = document.querySelector('.password-input-signup')
  console.log(passwordConfirm.value.trim() == password.value.trim())
  if(passwordConfirm.value.trim() != password.value.trim() && passwordConfirm.value.trim() != ''){
    passwordConfirm.parentElement.classList.add('invalid')
    passwordConfirm.parentElement.classList.remove('valid')
    isPasswordConfirm = false
  }else if(passwordConfirm.value != ''){
    passwordConfirm.parentElement.classList.add('valid')
    passwordConfirm.parentElement.classList.remove('invalid')
    isPasswordConfirm = true
  }else{
    passwordConfirm.parentElement.classList.remove('invalid')
    passwordConfirm.parentElement.classList.remove('valid')
    isPasswordConfirm = false
  }
}
function checkNameExist(name){
  for(let i = 0; i < arr.length ;i++){
    if(name == arr[i].account){
      return true;
    }
  }
  return false;
}
function checkAccountExists(name,password){
  for(let i = 0; i < arr.length ;i++){
    if(name == arr[i].account && password == arr[i].password){
      return true;
    }
  }
  return false;
}
function findPassword(name){
  for(let i = 0; i < arr.length ;i++){
    if(name == arr[i].account){
      return arr[i].password;
    }
  }
  return '';
}
//action
function showSignup(){
  document.querySelector('.login').classList.add('login-box-hide')
  document.querySelector('.signup').classList.add('signup-box-show')
}
function showRetake(){
  document.querySelector('.login').classList.add('login-box-hide')
  document.querySelector('.retake').classList.add('retake-box-show')
}
function returnLogin(){
  document.querySelector('.login').classList.remove('login-box-hide')
  document.querySelector('.retake').classList.remove('retake-box-show')
}
function returnLoginSignup(){
  document.querySelector('.login').classList.remove('login-box-hide')
  document.querySelector('.signup').classList.remove('signup-box-show')
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//action with login
function submitAccount(){
  let userInfor = document.querySelectorAll('.signup .login-input input')
  if(isName && isPassword && isPasswordConfirm){
    if(!checkNameExist(userInfor[0].value)){
      showSuccess('registered');
      var users = new User(userInfor[0].value,userInfor[1].value,[])
      arr.push(users)
      localStorage.setItem("user" , JSON.stringify(arr))
    }else{
      //"????" ho???c "kh??ng"
      showNameExited('????')
    }
  }else{
    showfailFormat('please check your information and try again')
  }
}
function submitLogin(){
  let userInfor = document.querySelectorAll('.login .login-input input')
  if(isName && isPassword){
    if(checkNameExist(userInfor[0].value)){
      if(checkAccountExists(userInfor[0].value,userInfor[1].value)){
        // showSuccess('Logged!');
        logged = true
        localStorage.setItem("logged" , JSON.stringify(logged))
        localStorage.setItem("working" , JSON.stringify(userInfor[0].value))
        sessionStorage.setItem('live', 'true')
        window.location.replace("http://127.0.0.1:5501/index.html")
      }else{
        showPasswordfail()
      }
    }else{
      //"????" ho???c "kh??ng"
      showNameExited('kh??ng')
    }
  }else{
    showfailFormat('Vui l??ng ki???m tra ?????nh d???ng nh???p v??o')
  }
}
function retakePassword(){
  let userInfor = document.querySelector('.retake .login-input input')
  if(isName){
    if(checkNameExist(userInfor.value)){
      showSuccess('L???y l???i m???t kh???u th??nh c??ng');
      document.querySelector('.password-retake').innerHTML=`<p >M???t kh???u c???a b???n</p><h5 style = "color:#fdb797;margin-top: 10px;">${findPassword(userInfor.value)}</h5>`
      setTimeout(function() {
        document.querySelector('.password-retake').innerHTML=''
      },12000)
    }else{
      //"????" ho???c "kh??ng"
      showNameExited('kh??ng')
    }
  }else{
    showfailFormat('Vui l??ng ki???m tra ?????nh d???ng nh???p v??o')
  }
}


//alert box
function showSuccess(typeBox){
  let success = document.querySelector('.login-success')
  let successDivInner = document.querySelector('.login-success div')
  successDivInner.innerHTML = `<p>${typeBox} <i class="fas fa-check-circle"></i></p>`
  success.style.display = 'flex';
  setTimeout(function(){
    success.style.display = 'none';
    successDivInner.innerHTML = '';
  },2500)
}
function showNameExited(existOrNot){
  let fail = document.querySelector('.login-fail')
  let failDivInner = document.querySelector('.login-fail div')
  failDivInner.innerHTML = `<p>T??n t??i kho???n ${existOrNot} t???n t???i <i class="fas fa-exclamation-triangle"></i></p>`
  fail.style.display = 'flex';
  setTimeout(function(){
    fail.style.display = 'none';
    failDivInner.innerHTML = '';
  },2500)
}

function showfailFormat(content){
  let fail = document.querySelector('.login-fail')
  let failDivInner = document.querySelector('.login-fail div')
  failDivInner.innerHTML = `<p>${content} <i class="fas fa-exclamation-triangle"></i></p>`
  fail.style.display = 'flex';
  setTimeout(function(){
    fail.style.display = 'none';
    failDivInner.innerHTML = '';
  },2500)
}

function showPasswordfail(){
  let fail = document.querySelector('.login-fail')
  let failDivInner = document.querySelector('.login-fail div')
  failDivInner.innerHTML = `<p>M???t kh???u kh??ng ch??nh x??c <i class="fas fa-exclamation-triangle"></i></p>`
  fail.style.display = 'flex';
  setTimeout(function(){
    fail.style.display = 'none';
    failDivInner.innerHTML = '';
  },2500)
}

// export {showSuccess,showfailFormat}