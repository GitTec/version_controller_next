import MakeScript from '@/fragments/makeScript';
import { IUsuarios } from '@/interfaces/usuarios.interface';
import { IVersoes } from '@/interfaces/versoes.interface';
import { DefaultLayout } from '@/layouts/default';
import { api } from '@/services/api';
import { NextPageContext } from 'next';

interface PageProps {
    version: IVersoes[]
    user: IUsuarios[]
}

export async function getStaticProps(context: NextPageContext) {
    const version = await api.get('/version')
    const user = await api.get('/users')
    return {
        props: { version: version.data, user: user.data },
        revalidate: 30
    }
}

export default function Cadastrar(props: PageProps) {

    return (
        <DefaultLayout
            title='Scripts'
            subtitle='Adicione novos scripts'
        >
            <MakeScript
                users={props.user}
                version={props.version}
            />
        </DefaultLayout >
    )
}


