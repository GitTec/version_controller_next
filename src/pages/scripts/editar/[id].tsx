import MakeScript from '@/fragments/makeScript';
import { IScripts } from '@/interfaces/scripts.interface';
import { IUsuarios } from '@/interfaces/usuarios.interface';
import { IVersoes } from '@/interfaces/versoes.interface';
import { DefaultLayout } from "@/layouts/default";
import { api } from "@/services/api";
import { NextPageContext } from 'next';

export async function getServerSideProps(context: NextPageContext) {
    const id = context.query.id
    const script = await api.get(`/script/${id}`)
    const version = await api.get('/version')
    const user = await api.get('/users')
    return {
        props: { script: script.data, version: version.data, user: user.data }    //Fornece o que é passado pela PageProps
    }
}

interface PageProps {
    script: IScripts
    version: IVersoes[]
    user: IUsuarios[]
}

export default function Editar(props: PageProps) {
    return (
        <DefaultLayout
            title="Scripts"
            subtitle="Editar script"
        >
            <MakeScript
                scripts={props.script}
                version={props.version}
                users={props.user}
            />
        </DefaultLayout>
    )
}