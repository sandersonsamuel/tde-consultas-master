"use client";

import { z } from 'zod';
import { Navbar } from "@/components/navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";

const consultaSchema = z.object({
    medicoId: z.number({
        required_error: 'Selecione um medico',
    }),
    pacienteId: z.number({
        required_error: 'Selecione um paciente',
    }),
    data: z.string({
        required_error: 'Selecione uma data',
    }),
    horario: z.string({
        required_error: 'Selecione um horario',
    }),
    motivo: z.string({
        required_error: 'Descreva o motivo',
    }),
})

const medicos = [
    {
        id: 1,
        name: 'Dr. Fulano',
        days: [
            {name: "Segunda", schedules: ['08:00', '09:00', '10:00']},
            {name: "Terça", schedules: ['08:00', '09:00', '10:00']},
            {name: "Quarta", schedules: ['08:00', '09:00', '10:00']},
            {name: "Quinta", schedules: ['08:00', '09:00', '10:00']},
            {name: "Sexta", schedules: ['08:00', '09:00', '10:00']},
        ]},
    { id: 2, name: 'Dr. Cicrano', days: [
        {name: "Segunda", schedules: ['08:00', '09:00', '10:00']},
        {name: "Terça", schedules: ['08:00', '09:00', '10:00']},
        {name: "Quarta", schedules: ['08:00', '09:00', '10:00']},
        {name: "Quinta", schedules: ['08:00', '09:00', '10:00']},
        {name: "Sexta", schedules: ['08:00', '09:00', '10:00']},
        ] },
];

const pacientes = [
    { id: 1, name: 'Paciente Fulano' },
    { id: 2, name: 'Paciente Cicrano' },
    { id: 3, name: 'Paciente Beltrano' },
];

type FormData = z.infer<typeof consultaSchema>;

const ConsultaCreate = () => {

    const form = useForm<FormData>({
        resolver: zodResolver(consultaSchema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    const medicoSelectedId : number = form.getValues("medicoId")
    const medicoSelected = medicos.filter((medico)=> medico.id === medicoSelectedId)

    return (
        <div className={'overflow-x-hidden'}>
            <Navbar />
            <div className="flex w-screen h-full justify-center ">
                <Form {...form}>
                    <form className="flex flex-col w-[700px] p-7 rounded justify-between gap-3"
                          onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2 w-full">
                            <p className="text-3xl font-bold">Cadastro de consulta</p>

                            <FormField name="medicoId" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Médico</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            defaultValue=""
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione o Médico"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {medicos.map((medico) => (
                                                    <SelectItem key={medico.id} value={String(medico.id)}>
                                                        {medico.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField name="pacienteId" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Paciente</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            defaultValue=""
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione o Paciente" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {pacientes.map((paciente) => (
                                                    <SelectItem key={paciente.id} value={String(paciente.id)}>
                                                        {paciente.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField name="data" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Data da consulta</FormLabel>
                                    <FormControl>
                                        <Select
                                            disabled={!medicoSelectedId}
                                            onValueChange={(value : string) => field.onChange(Number(value))}
                                            defaultValue=""
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione o Horário" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField name="horario" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Horário da consulta</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField name="motivo" control={form.control} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Motivo da consulta</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Motivo da consulta" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        </div>
                        <Button type="submit" variant="default">Cadastrar</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ConsultaCreate;
