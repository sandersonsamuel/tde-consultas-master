"use client";

import React from 'react';
import {Navbar} from "@/components/navbar";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const PacienteCreate = () => {

    const pacienteSchema = z.object({
        nome: z.string({
            required_error: 'Nome é obrigatorio',
        }),
        cpf: z.string({
            required_error: 'Cpf é obrigatorio',
        }),
        data_nascimento: z.string({
            required_error: 'Data de nascimento é obrigatorio',
        }),
        endereco: z.string({
            required_error: 'Endereço é obrigatorio',
        }),
        telefone: z.string({
            required_error: 'Telefone é obrigatorio',
        }),
        email: z.string({
            required_error: 'Email é obrigatorio',
        }),
    })

    type FormData = z.infer<typeof pacienteSchema>;

    const form = useForm<FormData>({
        resolver: zodResolver(pacienteSchema),
    })

    const onSubmit = (data: FormData) => {
        console.log(data)
    }

    return (
        <div className={'overflow-x-hidden'}>
            <Navbar/>

            <div className="flex w-screen h-full justify-center">

                <Form {...form}>
                    <form className="flex flex-col w-[700px] p-7 rounded justify-between gap-3"
                          onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-2 w-full">

                            <p className="text-3xl font-bold">Cadastro de paciente</p>

                            <FormField control={form.control} name="nome" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder={'Nome'} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                            </FormField>

                            <FormField control={form.control} name="cpf" render={({field}) => (
                                <FormItem>
                                    <FormLabel>CPF</FormLabel>
                                    <FormControl>
                                        <Input placeholder={'CPF'} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                            </FormField>

                            <FormField control={form.control} name="data_nascimento" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Data de nascimento</FormLabel>
                                    <FormControl>
                                        <Input type={'date'} placeholder={'Data de nascimento'} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                            </FormField>

                            <FormField control={form.control} name="endereco" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Endereço</FormLabel>
                                    <FormControl>
                                        <Input placeholder={'Endereço'} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                            </FormField>

                            <FormField control={form.control} name="telefone" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Telefone</FormLabel>
                                    <FormControl>
                                        <Input placeholder={'Telefone'} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                            </FormField>

                            <FormField control={form.control} name="email" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder={'Email'} {...field} />
                                    </FormControl>
                                    <FormMessage />
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