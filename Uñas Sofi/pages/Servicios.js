import { auth } from "../core/auth.js";
import { db, api } from "../core/api.js";

export default function Servicios(){
  if(!auth.require("admin")) return "";

  const rows = db.servicios.map(s=>`
    <tr>
      <td>${s.nombre}</td><td>${s.duracionMin} min</td><td>$${s.precio}</td>
      <td>
        <button data-act="edit" data-id="${s.id}">Editar</button>
        <button data-act="del"  data-id="${s.id}">Eliminar</button>
      </td>
    </tr>`).join("");

  return `
  <section>
    <h1>Servicios</h1>
    <div class="row">
      <input id="nombre" placeholder="Nombre"/>
      <input id="dur" type="number" placeholder="Duración (min)"/>
      <input id="precio" type="number" placeholder="Precio"/>
      <button id="add">Agregar</button>
    </div>
    <table class="tbl">
      <thead><tr><th>Nombre</th><th>Duración</th><th>Precio</th><th></th></tr></thead>
      <tbody>${rows || `<tr><td colspan="4">Sin servicios</td></tr>`}</tbody>
    </table>
  </section>
  <script>
    const el = document.currentScript.parentElement;
    el.querySelector("#add").onclick=()=>{
      const nombre = el.querySelector("#nombre").value.trim();
      const dur = parseInt(el.querySelector("#dur").value);
      const precio = parseFloat(el.querySelector("#precio").value);
      if(!nombre || !dur || !precio){ alert("Completar todos los campos"); return; }
      window.api.addServicio({ nombre, duracionMin:dur, precio });
      location.reload();
    };
    el.querySelectorAll("button[data-act]").forEach(b=>{
      b.onclick=()=>{
        const id=b.dataset.id, act=b.dataset.act;
        if(act==="del"){ if(confirm("Eliminar servicio?")){ window.api.deleteServicio(id); location.reload(); } }
        if(act==="edit"){
          const s = window.db.servicios.find(x=>x.id===id);
          const nombre = prompt("Nombre:", s.nombre) ?? s.nombre;
          const dur    = parseInt(prompt("Duración (min):", s.duracionMin) ?? s.duracionMin);
          const precio = parseFloat(prompt("Precio:", s.precio) ?? s.precio);
          window.api.updateServicio(id,{ nombre, duracionMin:dur, precio });
          location.reload();
        }
      };
    });
  </script>`;
}

window.api = api; window.db = db;
