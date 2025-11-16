export const db = {

    users: [
        {id:"u1", email:"admin@unas.com", pass:"1234", role:"admin", name:"Sofi"},
        {id:"u2", email:"tecnica@unas.com", pass:"1234", role:"tecnica", name:"Eli", tecnicaId:"t1" },
        {id:"u3", email:"tecnica2@unas.com", pass:"1234", role:"tecnica", name:"Flor", tecnicaId: "t2" },
    ],
    tecnicas: [
        {id:"t1", nombre:"Eli"}, {id:"t2", nombre:"Flor"},
    ],
    servicios: [
        {id:"s1", nombre:"Manicura Semipermanente", duracionMin:60, precio:12000},
        {id:"s2", nombre:"Capping en gel", duracionMin:90, precio:18000},
        {id:"s3", nombre:"Retiro de esmaltado", duracionMin:20, precio:4000},
    ],
    clientes: [
        {id:"c1", nombre:"Pepita", tel:"641-753-349", notas:"Prefiere siempre hacerse francesita"},
        {id:"c2", nombre:"Carlita", tel:"641-773-339", notas:"Alergica al acetona"},
    ],
    turnos: [
        {id:"r1", clienteId:"c1", servicioId:"s1", tecnicaId:"t1",fecha:"2025-12-15", hora:"10:00", estado:"pendiente"},
        {id:"r2", clienteId:"c2", servicioId:"s3", tecnicaId:"t2",fecha:"2025-12-15", hora:"12:00", estado:"pendiente"},
    ],

};

export const api = {
    listTurnos(){return db.turnos; },
    addTurno(t){ db.turnos.push({ id:"r"+Date.now(), ...t});},
    updateTurno(id, patch){ const i=db.turnos.findIndex(x=>x.id===id);
        if(i>=0) db.turnos[i]={...db.turnos[i], ...patch};
    },
    deleteTurno(id){ const i=db.turnos.findIndex(x=>x.id===id);
        if(i>=0) db.turnos.splice(i,1);
    },

    listServicios(){return db.servicios; },
    addServicio(t){ db.servicios.push({ id:"s"+Date.now(), ...s});},
    updateServicio(id, patch){ const i=db.turnos.findIndex(x=>x.id===id);
        if(i>=0) db.servicios[i]={...db.servicios[i], ...patch};
    },
    deleteServicio(id){ const i=db.servicios.findIndex(x=>x.id===id);
        if(i>=0) db.servicios.splice(i,1);
    },

    listClientes(){return db.clientes; },
    addCliente(t){ db.clientes.push({ id:"c"+Date.now(), ...c });},
    updateCliente(id, patch){ const i=db.cliente.findIndex(x=>x.id===id);
        if(i>=0) db.clientes[i]={...db.clientes[i], ...patch};
    },
    deleteCliente(id){ const i=db.clientes.findIndex(x=>x.id===id);
        if(i>=0) db.clientes.splice(i,1);
    },

};