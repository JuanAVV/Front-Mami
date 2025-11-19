import axios from "axios";

export function guardarInvitado(request, tokenAuth){
    return new Promise((resolve, reject) => {
        console.log("IMprime data: ",request)
        axios.post(import.meta.env.VITE_URL_HOST+'/saveGuest', request, 
            {headers: { 'Content-Type': 'application/json' , 'Authorization':  tokenAuth } })
                .then((res) => {
                    resolve(res.data);
                }).catch((error) => {
                    console.error( "error al consumir saveGuest", error);
                    reject(error);
                });
    });
}

export function obtieneInvitado(id){
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:8080/api/invitados/"+id,
            {headers: { 'Content-Type': 'application/json' } })
                .then((res) => {
                    resolve(res.data);
                }).catch((error) => {
                    console.error( "error al consumir obtenerInvitado", error);
                    reject(error);
                });
    });
}

export function obtieneInvitacion(data){
    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_URL_HOST+'/getGuest', data, 
            {headers: { 'Content-Type': 'application/json'} })
                .then((res) => {
                    resolve(res.data);
                }).catch((error) => {
                    console.error( "error al consumir getGuest", error);
                    reject(error);
                });
    });
}

export function confirmaInvitacion(data){
    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_URL_HOST+'/confirmAttendance', data, 
            {headers: { 'Content-Type': 'application/json'} })
                .then((res) => {
                    resolve(res.data);
                }).catch((error) => {
                    console.error( "error al consumir confirmAttendance", error);
                    reject(error);
                });
    });
}

export function eliminarInvitado(data, tokenAuth){
    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_URL_HOST+'/deleteGuest', data, 
            {headers: { 'Content-Type': 'application/json', 'Authorization':  tokenAuth } })
                .then((res) => {
                    resolve(res.data);
                }).catch((error) => {
                    console.error( "error al consumir deleteGuest", error);
                    reject(error);
                });
    });
}