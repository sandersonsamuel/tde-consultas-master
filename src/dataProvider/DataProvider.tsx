"use client";

import React, { useEffect } from 'react';
import { getAllMedicos } from "@/requests/medico";
import { getAllPacientes } from "@/requests/paciente";
import { medicos, pacientes } from "@/proxystates";
import { requestFailed } from "@/utils";

const DataProvider = ({ children }: { children: React.ReactNode }) => {

    // pegando os dados de todos os médicos
    const catchAllMedicos = async () => {
        try {
            const medicosResponse = await getAllMedicos();
            medicos.data = medicosResponse.data.docs;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        catchAllMedicos();
    }, []);

    // pegando os dados de todos os pacientes
    const catchAllPacientes = async () => {
        try {
            const pacientesResponse = await getAllPacientes();
            pacientes.data = pacientesResponse.data.docs;
        } catch (error) {
            requestFailed(error);
        }
    };

    useEffect(() => {
        catchAllPacientes();
    }, []);

    return <>{children}</>;
};

export default DataProvider;
