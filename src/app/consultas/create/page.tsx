"use client";

import React, {useEffect, useState} from "react";
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { medicos, pacientes } from "@/proxystates";
import { useSnapshot } from "valtio";
import {Textarea} from "@/components/ui/textarea";
import {getMedicoSchedules} from "@/requests/medico";
import {requestFailed} from "@/utils";
import {Schedule} from "@/types";
import moment from 'moment'
import {createAppointment} from "@/requests/appointment";
import {toast} from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button"

const consultaSchema = z.object({
    doctor: z.string({
        required_error: 'Selecione um medico',
    }),
    user: z.string({
        required_error: 'Selecione um paciente',
    }),
    schedule: z.string({
        required_error: 'Selecione um horário',
    }),
    description: z.string({
        required_error: 'Descreva o motivo',
    }),
})

type FormData = z.infer<typeof consultaSchema>;

const ConsultaCreate = () => {

    const snapMedicos = useSnapshot(medicos);
    const snapPacientes = useSnapshot(pacientes);

    const [doctorSchedules, setDoctorSchedules] = React.useState<Schedule[]>([]);
    const [doctorSelected, setDoctorSelected] = useState('');

    console.log(doctorSchedules)

    const form = useForm<FormData>({
        resolver: zodResolver(consultaSchema)
    });

    const onSubmit = async (data: FormData) => {
        try {
            await createAppointment(data)
            toast({
                title: 'Consulta criada',
                description: 'Sua consulta foi criada com sucesso',
            })
        } catch (error) {
            requestFailed(error)
        }
    };

    const handleDoctorChange = (value: string) => {
        form.setValue('doctor', value);
        setDoctorSelected(value);
    }

    const updateSchedule = async () =>{
        try {
            const schedules = await getMedicoSchedules(form.getValues('doctor'))
            setDoctorSchedules(schedules.data.schedules)
        }catch (error) {
            requestFailed(error)
        }
    }

    useEffect(() => {
        if (doctorSelected) {
            updateSchedule()
        }
    }, [doctorSelected]);

    return (
        <div className={'overflow-x-hidden'}>
            <div className="flex w-screen h-full justify-center ">
                <Form {...form}>
                    <form className="flex flex-col w-[700px] p-7 rounded justify-between gap-3"
                          onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2 w-full">
                            <p className="text-3xl font-bold">Cadastro de consulta</p>

                            <FormField control={form.control} name={'doctor'} render={({ field }) => (
                                <FormItem className={'w-full'}>
                                    <FormLabel>Médico</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={(value) => handleDoctorChange(value)} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um médico" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {snapMedicos?.data.map((medico) => (
                                                    <SelectItem key={medico.id} value={String(medico.id)}>
                                                        {medico.name} {medico.surname} ({medico.specialty})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name={'user'} render={({ field }) => (
                                <FormItem className={'w-full'}>
                                    <FormLabel>Paciente</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um paciente" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {snapPacientes?.data.map((paciente) => (
                                                    <SelectItem key={paciente.id} value={String(paciente.id)}>
                                                        {paciente.name} {paciente.surname}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />


                            <FormField control={form.control} name={'schedule'} render={({ field }) => (
                                <FormItem className={'w-full'}>
                                    <FormLabel>Horário</FormLabel>
                                    <FormControl>
                                        <Select disabled={!doctorSelected} onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione um horário" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    doctorSchedules?.map((schedule) => (
                                                        <SelectItem key={schedule.id} value={String(schedule.id)}>
                                                            {moment(schedule.start).format('DD/MM HH:mm')} - {moment(schedule.end).format('DD/MM HH:mm')}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name={'description'} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descricão</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>

                        </div>
                        <Button type="submit" variant="default">Cadastrar</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ConsultaCreate;
