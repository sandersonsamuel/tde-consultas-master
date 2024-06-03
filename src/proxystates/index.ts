import {proxy} from 'valtio';
import {Medico, Paciente} from "@/types";

export const medicos: { data: Medico[] } = proxy({
    data: []
});

export const pacientes: { data: Paciente[] } = proxy({
    data: []
})