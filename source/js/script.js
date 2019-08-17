//  Открытие меню на мобильники
var navIcon = document.querySelector(".site-nav__toggle");
var mobileMenu = document.querySelector(".site-nav__list");

if (document.querySelector(".no-js")) {
  document.querySelector(".no-js").classList.remove("no-js");
}

navIcon.addEventListener("click", function (evt) {
  evt.preventDefault();

  if(mobileMenu.classList.contains("site-nav__list--show")) {
    mobileMenu.classList.remove("site-nav__list--show");
    navIcon.classList.remove("site-nav__toggle--close");
  } else {
    mobileMenu.classList.add("site-nav__list--show");
    navIcon.classList.add("site-nav__toggle--close");
  }
});
