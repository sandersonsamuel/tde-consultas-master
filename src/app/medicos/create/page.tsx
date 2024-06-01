"use client";

import React from 'react';
import {Navbar} from "@/components/navbar";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const MedicoCreate = () => {

    const medicoSchema = z.object({
        nome: z.string({
            required_error: 'Nome é obrigatorio',
        }),
        CRM: z.string({
            required_error: 'CRM é obrigatorio',
        }),
        especialidade: z.string({
            required_error: 'Especialidade é obrigatorio',
        }),
        telefone: z.string({
            required_error: 'Telefone é obrigatorio',
        }),
        email: z.string({
            required_error: 'Email é obrigatorio',
        }),
        disponibilidade: z.string({
            required_error: 'Disponibilidade é obrigatorio',
        })
    })

    type formData = z.infer<typeof medicoSchema>;

    const form = useForm<formData>({
        resolver: zodResolver(medicoSchema),
    })

    const onSubmit = (data: formData) => {
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

                            <p className="text-3xl font-bold">Cadastro de médico</p>
                            <FormField control={form.control} name={'nome'} render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>

                            </FormField>

                            <FormField control={form.control} name={'CRM'} render={({field}) => (
                                <FormItem>
                                    <FormLabel>CRM</FormLabel>
                                    <FormControl>
                                        <Input placeholder="CRM" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>

                            </FormField>

                            <FormField control={form.control} name={'especialidade'} render={({field}) => (
                                <FormItem>
                                    <FormLabel>Especialidade</FormLabel>
                                    <FormControl>
                                        <Input type={'text'} placeholder="Especialidade" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                            </FormField>

                            <FormField control={form.control} name={'telefone'} render={({field}) => (
                                <FormItem>
                                    <FormLabel>Telefone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Telefone" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                            </FormField>

                            <FormField control={form.control} name={'email'} render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type={"email"} placeholder="Email" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                            </FormField>

                            <FormField control={form.control} name={'disponibilidade'} render={({field}) => (
                                <FormItem>
                                    <FormLabel>Disponibilidade</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Disponibilidade" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}>
                            </FormField>

                        </div>
                            <Button type="submit">Cadastrar</Button>
                    </form>
                </Form>
            </div>

        </div>
);
};

export default MedicoCreate;