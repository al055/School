const burger = document.querySelector(".burger");
const nav = document.querySelector(".navigation_menu");
const navLinks = document.querySelectorAll(".navigation_menu li");

function navOpen() {
  burger.addEventListener("click", navActive);
}
function navActive() {
  nav.classList.toggle("navigation_menu_active");
  burger.classList.toggle("toggle");
}

navOpen();
