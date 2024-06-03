import {Appointment} from "@/types";
import {api} from "@/api";

export const createAppointment = async (data:Appointment) => {
    return await api.post('/appointment/create', data)
}