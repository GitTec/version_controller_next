import MakeVersion from '@/fragments/makeVersion';
import { DefaultLayout } from '@/layouts/default';

export default function Cadastrar() {
    return (
        <DefaultLayout
            title='Versões'
            subtitle='Adicione novas versões'
        >
            <MakeVersion />
        </DefaultLayout>
    )
}