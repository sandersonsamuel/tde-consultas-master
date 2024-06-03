import {api} from "@/api";
import {Medico, Schedule} from "@/types";

export const createMedico = async (data:Medico) => {
    return await api.post('/doctor/create', data)
}

export const getAllMedicos = async () => {
    return await api.post('/doctor/paginate', { page: 1, pageSize: 10 })
}

export const getMedicoSchedules = async (id: string) => {
    return await api.get(`/doctor/schedule/${id}`)
}