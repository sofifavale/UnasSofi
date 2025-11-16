import { auth } from "../core/auth.js";
import { db, api } from "../core/api.js";

export default function Clientes(){
  if(!auth.require("admin")) return "";

  const rows = db.clientes.map(c=>`
    <tr>
      <td>${c.nombre}</td><td>${c.tel}</td><td>${c.notas ?? ""}</td>
      <td>
        <button data-act="edit" data-id="${c.id}">Editar</button>
        <button data-act="del"  data-id="${c.id}">Eliminar</button>
      </td>
    </tr>`).join("");

  return `
  <section>
    <h1>Clientes</h1>
    <div class="row">
      <input id="nombre" placeholder="Nombre"/>
      <input id="tel" placeholder="Teléfono"/>
      <input id="notas" placeholder="Notas"/>
      <button id="add">Agregar</button>
    </div>
    <table class="tbl">
      <thead><tr><th>Nombre</th><th>Teléfono</th><th>Notas</th><th></th></tr></thead>
      <tbody>${rows || `<tr><td colspan="4">Sin clientes</td></tr>`}</tbody>
    </table>
  </section>
  <script>
    const el = document.currentScript.parentElement;
    el.querySelector("#add").onclick=()=>{
      const nombre = el.querySelector("#nombre").value.trim();
      const tel = el.querySelector("#tel").value.trim();
      const notas = el.querySelector("#notas").value.trim();
      if(!nombre || !tel){ alert("Nombre y teléfono son obligatorios"); return; }
      window.api.addCliente({ nombre, tel, notas });
      location.reload();
    };
    el.querySelectorAll("button[data-act]").forEach(b=>{
      b.onclick=()=>{
        const id=b.dataset.id, act=b.dataset.act;
        if(act==="del"){ if(confirm("Eliminar cliente?")){ window.api.deleteCliente(id); location.reload(); } }
        if(act==="edit"){
          const c = window.db.clientes.find(x=>x.id===id);
          const nombre = prompt("Nombre:", c.nombre) ?? c.nombre;
          const tel    = prompt("Teléfono:", c.tel) ?? c.tel;
          const notas  = prompt("Notas:", c.notas ?? "") ?? c.notas;
          window.api.updateCliente(id,{ nombre, tel, notas });
          location.reload();
        }
      };
    });
  </script>`;
}

window.api = api; window.db = db;
