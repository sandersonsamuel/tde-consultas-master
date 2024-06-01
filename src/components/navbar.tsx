"use client";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link";

interface Route {
    name: string;
    path: string;
}

interface Routes {
    name: string;
    paths: Route[];
}

export const Navbar = () => {

    const routes: Routes[] = [
        {
            name: 'Consultas',
            paths: [
                {name: 'Consultas', path: '/consultas'},
                {name: 'Nova consulta', path: '/consultas/create'}
            ]
        },
        {
            name: 'Pacientes',
            paths: [
                {name: 'Pacientes', path: '/pacientes'},
                {name: 'Novo paciente', path: '/pacientes/create'}
            ]
        },
        {
            name: 'Medicos',
            paths: [
                {name: 'Medicos', path: '/medicos'},
                {name: 'Novo medico', path: '/medicos/create'}
            ]
        },
    ]

    return (
        <div className={'flex justify-between items-center px-5 h-16 border-b'}>
            <p className={'text-xl font-bold'}>
                Consultas
            </p>

            <Menubar>
                {routes.map((route : Routes, index : number) => (
                    <MenubarMenu key={index}>
                        <MenubarTrigger className={'cursor-pointer'}>{route.name}</MenubarTrigger>
                        <MenubarContent>
                            <div className={'bg-white'}>
                                {route.paths.map((path : Route, index : number) => (
                                    <Link href={path.path} key={index}>
                                        <MenubarItem className={'cursor-pointer'}>
                                            <p>{path.name}</p>
                                        </MenubarItem>
                                    </Link>
                                ))}
                            </div>
                        </MenubarContent>
                    </MenubarMenu>
                ))}
            </Menubar>
        </div>
    );
};