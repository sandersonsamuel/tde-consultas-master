"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from 'moment';
import {useSnapshot} from "valtio";
import {pacientes} from "@/proxystates";

const Page = () => {

    moment.locale('pt-br');

    const snapshot = useSnapshot(pacientes);
    const allPacientes = snapshot.data;

    return (
        <div className={'overflow-x-hidden'}>
            <div className="flex flex-col w-screen h-full items-center p-7">
                <p className="text-3xl font-bold text-center">Pacientes cadastrados</p>
                <div className={'w-[1000px] mt-5'}>
                    { !allPacientes ? <p className={'text-xl font-bold text-center'}>Carregando...</p> :
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Nome</TableHead>
                                    <TableHead className="w-[100px]">Sobrenome</TableHead>
                                    <TableHead>CPF</TableHead>
                                    <TableHead>Telefone</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className={'text-right'}>Data de nascimento</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>{(
                                allPacientes?.map(paciente => (
                                    <TableRow onClick={() => location.href = 'paciente'} className="cursor-pointer" key={paciente.id}>
                                        <TableCell>{paciente.name}</TableCell>
                                        <TableCell>{paciente.surname}</TableCell>
                                        <TableCell>{paciente.cpf}</TableCell>
                                        <TableCell>{paciente.phone}</TableCell>
                                        <TableCell>{paciente.email}</TableCell>
                                        <TableCell className={'text-right'}>{moment(paciente.date_birth).format('DD/MM/YYYY')}</TableCell>
                                    </TableRow>
                                    )))}
                            </TableBody>
                        </Table>
                    }
                </div>
            </div>
        </div>
    );
};

export default Page;