function login() {
  var user = document.getElementById('username').value;
  var pass = document.getElementById('password').value;

  var storedUser = localStorage.getItem('user');
  var storedPass = localStorage.getItem('pass');
  
  if (user === storedUser && pass === storedPass) {
    localStorage.setItem("activeUser", user);
    alert("Giriş başarılı!");
    window.location.href = 'home.html';
  } else {
    alert("Hatalı kullanıcı adı veya şifre.");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  var passwordInput = document.getElementById("password");
  var registerButton = document.getElementById("kayit");

  passwordInput.addEventListener("input", function kontrol() {
    var sifre = passwordInput.value;

    var uzunMu = sifre.length >= 8;
    var buyukHarfVarMi = /[A-Z]/.test(sifre);
    var kucukHarfVarMi = /[a-z]/.test(sifre);
    var rakamVarMi = /[0-9]/.test(sifre);
    var ozelKarakterVarMi = /[^A-Za-z0-9]/.test(sifre);

    if (uzunMu && buyukHarfVarMi && kucukHarfVarMi && rakamVarMi && ozelKarakterVarMi) {
      registerButton.disabled = false;
      registerButton.classList.remove("disabled");
    } else {
      registerButton.disabled = true;
      registerButton.classList.add("disabled");
    }
  });
});

function register() {
  var user = document.getElementById("username").value;
  var pass = document.getElementById("password").value;

  localStorage.setItem("user", user);
  localStorage.setItem("pass", pass);
  localStorage.setItem("balance", "100");

  alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.");
  window.location.href = "login.html";
}
const sliders = document.querySelectorAll('.slide');
const sliderIleri = document.getElementById("slider-ileri");
const sliderGeri = document.getElementById("slider-geri");
let indexdeger = 0;

function guncelleslider(index) {
  sliders.forEach(slide => slide.classList.remove('aktif'));
  sliders[index].classList.add('aktif');
}

sliderGeri.addEventListener('click', () => {
  indexdeger = (indexdeger - 1 + sliders.length) % sliders.length;
  guncelleslider(indexdeger);
});

sliderIleri.addEventListener('click', () => {
  indexdeger = (indexdeger + 1) % sliders.length;
  guncelleslider(indexdeger);
});
const cardtrack = document.getElementById('card-track');
const cards = document.querySelectorAll('.card');
const cardIleri = document.getElementById('card-ileri');
const cardGeri = document.getElementById('card-geri');

const cardGenislik = 330; 
const gosterilenKartSayisi = 3;
const toplamCard = cards.length;
let currentIndex = 0;

function kaydir(index) {
  const gorunur = -index * cardGenislik;
  cardtrack.style.transform = `translateX(${gorunur}px)`;
}

cardIleri.addEventListener('click', () => {
  if (currentIndex < toplamCard - gosterilenKartSayisi) {
    currentIndex++;
    kaydir(currentIndex);
  }
});

cardGeri.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    kaydir(currentIndex);
  }
});



document.addEventListener("DOMContentLoaded", guncelleBakiye);
function guncelleBakiye() {
  let bakiye = localStorage.getItem("bakiye");
  if (!bakiye) {
    bakiye = 0;
    localStorage.setItem("bakiye", bakiye);
  }
  document.getElementById("bakiyeGoster").innerText = `Bakiyeniz: ${bakiye} TL`;
}

function paraEkle() {
  const miktar = parseFloat(document.getElementById("islemMiktari").value);
  if (isNaN(miktar) || miktar <= 0) return alert("Geçerli bir tutar girin.");

  let mevcut = parseFloat(localStorage.getItem("bakiye") || "0");
  mevcut += miktar;
  localStorage.setItem("bakiye", mevcut);
  guncelleBakiye();
}

function paraHarca() {
  const miktar = parseFloat(document.getElementById("islemMiktari").value);
  if (isNaN(miktar) || miktar <= 0) return alert("Geçerli bir tutar girin.");

  let mevcut = parseFloat(localStorage.getItem("bakiye") || "0");
  if (miktar > mevcut) return alert("Yetersiz bakiye!");

  mevcut -= miktar;
  localStorage.setItem("bakiye", mevcut);
  guncelleBakiye();
}
