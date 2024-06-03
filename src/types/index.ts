export interface Medico {
    id?: string;
    name: string;
    surname: string;
    specialty: string;
    crm: string;
    email: string;
    phone: string;
    schedules: {
        start: string;
        end: string;
    }[];
}

export interface Paciente {
    id?: string;
    name: string;
    surname: string;
    date_birth: string;
    cpf: string;
    phone: string;
    email: string;
    address: string;
}

export interface Schedule {
    id?: string;
    start: string;
    end: string;
    doctor_id: string;
    deleted_at?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Appointment {
    id?: string;
    doctor_id: string;
    user_id: string;
    schedule: string;
    description: string;
    deleted_at?: string;
    created_at?: string;
    updated_at?: string;
}