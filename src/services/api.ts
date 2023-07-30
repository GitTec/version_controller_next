import axios from "axios"

export const api = axios.create({
    baseURL: 'http://localhost:3330/'
});

//Crio aqui a minha chamada para API do back que criei