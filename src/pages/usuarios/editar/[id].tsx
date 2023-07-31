import MakeUser from '@/fragments/makeUser';
import { IUsuarios } from "@/interfaces/usuarios.interface";
import { DefaultLayout } from "@/layouts/default";
import { api } from "@/services/api";
import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext) {
    const id = context.query.id
    const usuario = await api.get(`/users/${id}`)
    return {
        props: { usuario: usuario.data }
    }
}

interface PageProps {
    usuario: IUsuarios
}

export default function Editar({ usuario }: PageProps) {
    return (
        <DefaultLayout
            title="Usuários"
            subtitle="Editar usuário"
        >
            <MakeUser
                user={usuario}
            />
        </DefaultLayout>
    )
}