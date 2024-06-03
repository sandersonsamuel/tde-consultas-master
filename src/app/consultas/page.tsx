"use client"

import React, {useEffect, useState} from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {medicos, pacientes} from "@/proxystates";
import {useSnapshot} from "valtio";
import {getMedicoAppointments, getMedicoSchedules} from "@/requests/medico";
import {requestFailed} from "@/utils";
import {Appointment, Medico, Schedule} from "@/types";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import moment from 'moment'

const Consultas = () => {

    const snapMedicos = useSnapshot(medicos);
    const snapPacientes = useSnapshot(pacientes);

    const allMedicos = snapMedicos.data
    const allPacientes = snapPacientes.data

    const [medicoSelectedId, setMedicoSelectedId] = useState<string>('');
    const [medicoAppointments, setMedicoAppointments] = useState<Appointment[]>([]);
    const [medicoSchedules, setMedicoSchedules] = useState<Schedule[]>([]);

    const medicoObj  = allMedicos.filter((medico) => medico.id == medicoSelectedId)[0]

    const catchMedicoAppointments = async () => {
        try {
            const appointments = await getMedicoAppointments(medicoSelectedId)
            setMedicoAppointments(appointments.data.docs)
        }catch (error) {
            requestFailed(error)
        }
    }

    const catchMedicoSchedules = async () => {
        try{
            const schedules = await getMedicoSchedules(medicoSelectedId)
            setMedicoSchedules(schedules.data.schedules)
        }catch (error){
            requestFailed(error)
        }
    }

    useEffect(() => {
        if (medicoSelectedId){
            catchMedicoAppointments()
            catchMedicoSchedules()
        }
    }, [medicoSelectedId]);

    console.log(medicoAppointments)

    return (
        <div className={'overflow-x-hidden'}>
            <div className="flex flex-col w-screen h-full items-center p-7">

                <p className="text-3xl font-bold">Visualização de consulta por Médico</p>

                <div className={'my-5'}>
                    <Select onValueChange={(value) => setMedicoSelectedId(value)}>
                        <SelectTrigger className="w-[450px]">
                            <SelectValue placeholder="Selecione o Médico"/>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                allMedicos?.map((medico)=>(
                                    <SelectItem key={medico.id} value={String(medico.id)}>
                                        {medico.name} {medico.surname} ({medico.specialty})
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
                {   medicoAppointments.length > 0 ?
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Médico</TableHead>
                                    <TableHead>Motivo</TableHead>
                                    <TableHead>Paciente</TableHead>
                                    <TableHead className="text-left">Data</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    medicoAppointments?.map((appointment: any) => {
                                        const paciente = allPacientes.find(p => p.id === appointment.user_id);
                                        const schedule = medicoSchedules.find(s => s.id === appointment.doctor_schedule_id);
                                        console.log(schedule)
                                        return (
                                            <TableRow key={appointment.id}>
                                                <TableCell>{medicoObj?.name}</TableCell>
                                                <TableCell>{appointment.description}</TableCell>
                                                <TableCell>{paciente ? `${paciente.name} ${paciente.surname}` : 'Paciente não encontrado'}</TableCell>
                                                <TableCell>{moment(schedule?.start).format('DD/MM/YYYY HH:mm')} - {moment(schedule?.end).format('DD/MM/YYYY HH:mm')}</TableCell>
                                            </TableRow>
                                        );
                                    })
                                }
                            </TableBody>
                        </Table>
                    </div>
                    : !!medicoSelectedId ? <p>Não existem consultas para este médico</p> : null
                }

            </div>
        </div>
    );
};

export default Consultas;