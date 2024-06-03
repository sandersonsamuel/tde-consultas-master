"use client";

import React from 'react';
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {createMedico} from "@/requests/medico";
import {toast} from "@/components/ui/use-toast";
import {requestFailed} from "@/utils";

const scheduleSchema = z.object({
    start: z.string({
        required_error: 'Horário de início é obrigatório',
    }),
    end: z.string({
        required_error: 'Horário de término é obrigatório',
    }),
});

const medicoSchema = z.object({
    name: z.string({
        required_error: 'Nome é obrigatório',
    }),
    surname: z.string({
        required_error: 'Sobrenome é obrigatório',
    }),
    crm: z.string({
        required_error: 'CRM é obrigatório',
    }),
    specialty: z.string({
        required_error: 'Especialidade é obrigatório',
    }),
    phone: z.string({
        required_error: 'Telefone é obrigatório',
    }),
    email: z.string({
        required_error: 'Email é obrigatório',
    }),
    schedules: z.array(scheduleSchema).min(1, 'Especifique pelo menos um horário de atendimento'),
});

type formData = z.infer<typeof medicoSchema>;

const MedicoCreate = () => {

    const form = useForm<formData>({
        resolver: zodResolver(medicoSchema)
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "schedules",
    });

    const onSubmit = async (data: formData) => {

        data.schedules.forEach((schedule) => {
            schedule.start = new Date(schedule.start).toISOString()
            schedule.end = new Date(schedule.end).toISOString()
        })

        createMedico(data).then((data) => {
            toast({
                variant: 'default',
                description: 'Medico cadastrado com sucesso',
            })
            console.log(data)
        }).catch((error) => {
            requestFailed(error)
        })
    };

    return (
        <div className={'overflow-x-hidden'}>
            <div className="flex w-screen h-full justify-center">
                <Form {...form}>
                    <form className="flex flex-col w-[700px] p-7 rounded justify-between gap-3"
                          onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-3 w-full">

                            <p className="text-3xl font-bold">Cadastro de médico</p>

                            <div className={'flex flex-col md:flex-row gap-3'}>
                                <FormField control={form.control} name={'name'} render={({ field }) => (
                                    <FormItem className={'w-full'}>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input className={'w-full'} placeholder="Nome" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name={'surname'} render={({ field }) => (
                                    <FormItem className={'w-full'}>
                                        <FormLabel>Sobrenome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Sobrenome" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            <FormField control={form.control} name={'specialty'} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Especialidade</FormLabel>
                                    <FormControl>
                                        <Input type={'text'} placeholder="Especialidade" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <div className={'flex flex-col md:flex-row gap-3'}>
                                <FormField control={form.control} name={'crm'} render={({ field }) => (
                                    <FormItem className={'w-full'}>
                                        <FormLabel>CRM</FormLabel>
                                        <FormControl>
                                            <Input placeholder="CRM" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name={'phone'} render={({ field }) => (
                                    <FormItem className={'w-full'}>
                                        <FormLabel>Telefone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Telefone" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            <FormField control={form.control} name={'email'} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type={"email"} placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                            </FormField>

                            <div className={'flex flex-col gap-3'}>
                                <FormLabel>Disponibilidade</FormLabel>
                                {form.formState.errors.schedules?.message && (
                                    <FormMessage>{form.formState.errors.schedules.message}</FormMessage>
                                )}
                                {fields.map((field, index) => (

                                    <div key={field.id} className={'flex items-end gap-3'}>

                                        <div className="flex flex-col md:flex-row gap-3">
                                            <FormField control={form.control} name={`schedules.${index}.start`} render={({ field }) => (
                                                <FormItem className={'w-full'}>
                                                    <FormLabel>Horário de Início</FormLabel>
                                                    <FormControl>
                                                        <Input type="datetime-local" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />

                                            <FormField control={form.control} name={`schedules.${index}.end`} render={({ field }) => (
                                                <FormItem className={'w-full'}>
                                                    <FormLabel>Horário de Término</FormLabel>
                                                    <FormControl>
                                                        <Input type="datetime-local" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        </div>

                                        <Button type="button" variant={'destructive'} onClick={() => remove(index)}>Remover</Button>

                                    </div>
                                ))}

                                <Button type="button" variant={'outline'} onClick={() => append({ start: "", end: "" })}>
                                    Adicionar Horário
                                </Button>
                            </div>

                        </div>
                        <Button type="submit">Cadastrar</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default MedicoCreate;
