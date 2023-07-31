import MakeUser from '@/fragments/makeUser';
import { DefaultLayout } from '@/layouts/default';

export default function Cadastrar() {

    return (
        <DefaultLayout
            title='Usuários'
            subtitle='Adicione novos usuários'
        >
            <MakeUser />
        </DefaultLayout >
    )
}
