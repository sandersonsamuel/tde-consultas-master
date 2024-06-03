import {toast} from "@/components/ui/use-toast";

export const networkError = ( ) => {
    return toast({
        variant: 'destructive',
        title: 'Erro de rede',
        description: 'Verifique sua conexão e tente novamente',
    })
}

    export const requestFailed = (error : any) => {

    console.log(error)

    return toast({
        variant: 'destructive',
        title: 'Falha na requisição',
        description: 'Verifique os dados da sua requisição e tente novamente',
    })
}