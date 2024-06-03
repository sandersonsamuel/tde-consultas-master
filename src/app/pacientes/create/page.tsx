"use client";

import React from 'react';
import {Navbar} from "@/components/navbar";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {createPaciente} from "@/requests/paciente";
import {toast} from "@/components/ui/use-toast";
import {requestFailed} from "@/utils";

const PacienteCreate = () => {

    const pacienteSchema = z.object({
        name: z.string({
            required_error: 'Nome é obrigatorio',
        }),
        surname: z.string({
            required_error: 'Sobrenome é obrigatorio',
        }),
        cpf: z.string({
            required_error: 'Cpf é obrigatorio',
        }),
        phone: z.string({
            required_error: 'Telefone é obrigatorio',
        }),
        email: z.string({
            required_error: 'Email é obrigatorio',
        }),
        address: z.string({
            required_error: 'Endereço é obrigatorio',
        }),
        date_birth: z.string({
            required_error: 'Data de nascimento é obrigatorio',
        })
    })

    type FormData = z.infer<typeof pacienteSchema>;

    const form = useForm<FormData>({
        resolver: zodResolver(pacienteSchema),
    })

    const onSubmit = async (data: FormData) => {
        try{
            await createPaciente(data)
            toast({
                variant: 'default',
                description: 'Paciente cadastrado com sucesso',
            })
        }catch (error){
            requestFailed(error)
        }
    }

    return (
        <div className={'overflow-x-hidden'}>
            <div className="flex w-screen h-full justify-center">
                <Form {...form}>
                    <form className="flex flex-col w-[700px] p-7 rounded justify-between gap-3"
                          onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2 w-full">

                            <p className="text-3xl font-bold">Cadastro de paciente</p>

                            <div className={'flex flex-col md:flex-row gap-3'}>
                                <FormField control={form.control} name="name" render={({field}) => (
                                    <FormItem className={'w-full'}>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder={'Nome'} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}>
                                </FormField>

                                <FormField control={form.control} name="surname" render={({field}) => (
                                    <FormItem className={'w-full'}>
                                        <FormLabel>Sobrenome</FormLabel>
                                        <FormControl>
                                            <Input placeholder={'Sobrenome'} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}>
                                </FormField>

                            </div>

                            <FormField control={form.control} name="date_birth" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Data de nascimento</FormLabel>
                                    <FormControl>
                                        <Input type={'date'} placeholder={'Data de nascimento'} {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                            </FormField>

                            <div className={'flex flex-col md:flex-row gap-3'}>
                                <FormField control={form.control} name="cpf" render={({field}) => (
                                    <FormItem className={'w-full'}>
                                        <FormLabel>CPF</FormLabel>
                                        <FormControl>
                                            <Input placeholder={'CPF'} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>

                                <FormField control={form.control} name="phone" render={({field}) => (
                                    <FormItem className={'w-full'}>
                                        <FormLabel>Telefone</FormLabel>
                                        <FormControl>
                                            <Input placeholder={'Telefone'} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}>
                                </FormField>
                            </div>

                            <FormField control={form.control} name="address" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Endereço</FormLabel>
                                    <FormControl>
                                        <Input placeholder={'Bairro, Rua, Número'} {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                            </FormField>

                            <FormField control={form.control} name="email" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder={'Email'} {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                            </FormField>

                        </div>

                        <Button type={'submit'}>Cadastrar paciente</Button>

                    </form>
                </Form>

            </div>

        </div>
    );
};

export default PacienteCreate;