//  Открытие меню на мобильники

navIcon = document.querySelector(".header__nav-icon");
mobileMenu = document.querySelector(".header__nav");

navIcon.addEventListener("click", function (evt) {
  evt.preventDefault();

  if(mobileMenu.classList.contains("header__nav--hide")) {
    mobileMenu.classList.remove("header__nav--hide");
    navIcon.classList.add("header__nav-icon--close");
  } else {
    mobileMenu.classList.add("header__nav--hide");
    navIcon.classList.remove("header__nav-icon--close");

  }
});
