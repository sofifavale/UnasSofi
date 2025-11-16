import { db } from "./api.js";

export const auth = {
  current(){
    const raw = sessionStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  },

  login(email, pass){
    const u = db.users.find(x => x.email === email && x.pass === pass);
    if (!u) throw new Error("Credenciales inválidas");

    const sessionUser = { id: u.id, role: u.role, name: u.name };
    if (u.tecnicaId) sessionUser.tecnicaId = u.tecnicaId;

    sessionStorage.setItem("user", JSON.stringify(sessionUser));
  },

  logout(){
    sessionStorage.removeItem("user");
    location.hash = "#/login";
  },

  require(role){
    const u = this.current();
    if (!u) { location.hash = "#/login"; return false; }
    if (role && u.role !== role) { location.hash = "#/dashboard"; return false; }
    return true;
  }
};
