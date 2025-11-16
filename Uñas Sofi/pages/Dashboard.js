import { auth } from "../core/auth.js";
import { db } from "../core/api.js";

export default function Dashboard(){
  if(!auth.require()) return "";
  const hoy = new Date().toISOString().slice(0,10);
  const pendientes = db.turnos.filter(t=>t.fecha===hoy && t.estado==="pendiente").length;
  const realizados = db.turnos.filter(t=>t.fecha===hoy && t.estado==="realizado").length;

  return `
  <section>
    <h1>Dashboard</h1>
    <div class="row">
      <div class="card"><h3>Turnos hoy</h3><p>${pendientes+realizados}</p></div>
      <div class="card"><h3>Pendientes</h3><p>${pendientes}</p></div>
      <div class="card"><h3>Realizados</h3><p>${realizados}</p></div>
    </div>
    <p>Usá el menú para navegar.</p>
  </section>`;
}
