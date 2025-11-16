import { auth } from "../core/auth.js";
import { db, api } from "../core/api.js";

export default function Turnos(){
  if(!auth.require()) return "";
  const u = auth.current();

  const turnos = (u.role === "tecnica")
    ? db.turnos.filter(t => t.tecnicaId === u.tecnicaId) 
    : db.turnos;

  const rows = turnos.map(t=>{
    const cli = db.clientes.find(c=>c.id===t.clienteId)?.nombre ?? "-";
    const srv = db.servicios.find(s=>s.id===t.servicioId)?.nombre ?? "-";
    const tec = db.tecnicas.find(x=>x.id===t.tecnicaId)?.nombre ?? "-";
    return `<tr>
      <td>${t.fecha} ${t.hora}</td>
      <td>${cli}</td>
      <td>${srv}</td>
      <td>${tec}</td>
      <td><span class="badge ${t.estado}">${t.estado}</span></td>
      <td>
        <button type="button" data-act="estado" data-id="${t.id}">Estado</button>
        ${u.role==="admin" ? `
          <button type="button" data-act="edit" data-id="${t.id}">Editar</button>
          <button type="button" data-act="del"  data-id="${t.id}">Eliminar</button>
        `:``}
      </td>
    </tr>`;
  }).join("");

  return `
  <section id="turnos">
    <h1>Turnos</h1>
    ${u.role==="admin" ? `<button id="btnNuevo">Nuevo turno</button>` : ``}
    <table class="tbl">
      <thead><tr><th>Fecha/Hora</th><th>Cliente</th><th>Servicio</th><th>Técnica</th><th>Estado</th><th></th></tr></thead>
      <tbody>${rows || `<tr><td colspan="6">Sin turnos</td></tr>`}</tbody>
    </table>
  </section>`;
}


export function mountTurnos(){
    const root = document.getElementById("turnos");
  if (!root) return;

  const btnNuevo = root.querySelector("#btnNuevo");
  if (btnNuevo) {
    btnNuevo.onclick = ()=>{
      const clienteId = prompt("Cliente ID (p.ej c1):");
      const servicioId = prompt("Servicio ID (s1/s2/s3):");
      const tecnicaId  = prompt("Técnica ID (t1/t2):");
      const fecha = prompt("Fecha YYYY-MM-DD:");
      const hora  = prompt("Hora HH:MM:");
      if(clienteId && servicioId && tecnicaId && fecha && hora){
        api.addTurno({clienteId,servicioId,tecnicaId,fecha,hora,estado:"pendiente"});
        location.reload();
      }
    };
  }

  root.querySelectorAll("button[data-act]").forEach(b=>{
    b.onclick=()=>{
      const id = b.dataset.id, act = b.dataset.act;
      
      if(act==="del"){

     if(confirm("Eliminar turno?")){ api.deleteTurno(id); location.reload(); } }

      if(act==="edit"){
        const f = prompt("Nueva fecha (YYYY-MM-DD):");
        const h = prompt("Nueva hora (HH:MM):");
        if(f && h){ api.updateTurno(id,{fecha:f,hora:h}); location.reload(); }
      }
      if(act==="estado"){
        const e = prompt("Estado (pendiente/realizado/cancelado):");
        if(e){ api.updateTurno(id,{estado:e}); location.reload(); }
      }
    };
  });
}
