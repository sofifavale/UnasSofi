import { router } from "./core/router.js";
import Navbar, { mountNavbar } from "./components/Navbar.js";
import { auth } from "./core/auth.js";

function render(){
  document.getElementById("nav").innerHTML = Navbar();
  mountNavbar;
  router();
}

window.addEventListener("load", render);
window.addEventListener("hashchange", render);

document.addEventListener("click", (e)=>{
  const el = e.target;

  if (el && el.id === "menuToggle") {
    const nav = el.closest(".nav");
    if (nav) nav.classList.toggle("open");
  }

  if (el && el.id === "logout") {
    e.preventDefault();
    auth.logout();
  }
});
