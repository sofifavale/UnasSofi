import { auth } from "../core/auth.js";

export default function Navbar(){
  const u = auth.current();
  const admin = u?.role === "admin";
  return `
  <nav class="nav" role="navigation">
  <button id="menuToggle" class="nav-toggle" aria-label="Abrir menú">☰</button>
    <div class="links">
    ${u ? `
      <a href="#/dashboard">Inicio</a>
      <a href="#/turnos">Turnos</a>
      ${admin ? `<a href="#/servicios">Servicios</a><a href="#/clientes">Clientes</a>` : ""}
      <span class="grow"></span>
      <span class="hello">Hola, ${u.name}</span>
      <button id="logout" type="button">Salir</button>
    ` : `<a href="#/login">Login</a>`}
    </div>
  </nav>`;
}

export function mountNavbar(){
  const nav = document.querySelector(".nav");
  if (!nav) return;

 
  const toggle = nav.querySelector("#menuToggle");
  if (toggle) {
    toggle.onclick = () => {
      nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("open") ? "true" : "false");
    };
  }

  
  const btnLogout = nav.querySelector("#logout");
  if (btnLogout) {
    btnLogout.onclick = (e) => {
      e.preventDefault();
      auth.logout();
    };
  }
}