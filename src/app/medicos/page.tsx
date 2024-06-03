"use client";

import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { medicos } from "@/proxystates";
import {useSnapshot} from "valtio";

const Medicos = () => {

    const snapshot = useSnapshot(medicos)
    const allMedicos = snapshot.data;

    return (
        <div className={'overflow-x-hidden'}>
            <div className="flex flex-col w-screen h-full items-center p-7">
                <p className="text-3xl font-bold text-center">Médicos cadastrados</p>

                <div className={'w-[1000px] mt-5'}>
                    { !allMedicos ? <p className={'text-xl font-bold text-center'}>Carregando...</p> :
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Nome</TableHead>
                                    <TableHead className="w-[100px]">Sobrenome</TableHead>
                                    <TableHead>CRM</TableHead>
                                    <TableHead>Especialidade</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">Telefone</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>{(
                                allMedicos?.map(medico => (
                                    <TableRow onClick={() => location.href = 'medico'} className="cursor-pointer" key={medico.id}>
                                        <TableCell>{medico.name}</TableCell>
                                        <TableCell>{medico.surname}</TableCell>
                                        <TableCell>{medico.crm}</TableCell>
                                        <TableCell>{medico.specialty}</TableCell>
                                        <TableCell>{medico.email}</TableCell>
                                        <TableCell className={'text-right'}>{medico.phone}</TableCell>
                                    </TableRow>
                                ))
                            )}
                            </TableBody>
                        </Table>
                    }
                </div>
            </div>
        </div>
    );
};

export default Medicos;
