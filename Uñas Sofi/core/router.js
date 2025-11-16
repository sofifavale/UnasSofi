import Login, { mountLogin } from "../pages/Login.js";
import Dashboard from "../pages/Dashboard.js";
import Turnos, { mountTurnos } from "../pages/Turnos.js";
import Servicios from "../pages/Servicios.js";
import Clientes from "../pages/Clientes.js";
import { auth } from "./auth.js";

const routes = {
    "/login" : Login,
    "/dashboard" : Dashboard,
    "/turnos" : Turnos,
    "/servicios" : Servicios,
    "/clientes" : Clientes,
};

export function router(){
  const path = location.hash.replace("#","") || "/login";
  const view = routes[path] || Login;
  document.getElementById("app").innerHTML = view();

    if (path === "/login") mountLogin?.();
    if (path === "/turnos") mountTurnos?.();
}

