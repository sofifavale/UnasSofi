import { auth } from "../core/auth.js";

export default function Login(){
  return `
  <section class="card">
    <h1>Ingresar</h1>
    <form id="fLogin">
      <input name="email" placeholder="Email" required />
      <input name="pass" type="password" placeholder="Contraseña" required />
      <button>Entrar</button>
    </form>
  </section>`;
}

export function mountLogin(){
  const form = document.getElementById("fLogin");
  if (!form) return;
  form.onsubmit = (e) => {
    e.preventDefault();
    const { email, pass } = Object.fromEntries(new FormData(form));
    try {
      auth.login(email, pass);
      location.hash = "#/dashboard";
    } catch (err) {
      alert(err.message);
    }
  };
}

