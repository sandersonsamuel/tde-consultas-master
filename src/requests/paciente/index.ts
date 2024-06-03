import {Paciente} from "@/types";
import {api} from '@/api';

export const createPaciente = async (data: Paciente) => {
    return await api.post('/client/create', data)
}

export const getAllPacientes = async () => {
    return await api.post('/client/paginate', { page: 1, pageSize: 999 })
}