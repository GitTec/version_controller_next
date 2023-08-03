import MakeUser from "@/fragments/makeVersion"
import { IVersoes } from "@/interfaces/versoes.interface"
import { DefaultLayout } from "@/layouts/default"
import { api } from "@/services/api"
import { NextPageContext } from "next"

export async function getServerSideProps(context: NextPageContext) {
    const id = context.query.id
    const versao = await api.get(`/version/${id}`)
    return {
        props: { versao: versao.data }
    }
}

interface PageProps {
    version: IVersoes
}

export default function Editar({ version }: PageProps) {
    return (
        <DefaultLayout
            title="Versões"
            subtitle="Editar Versões"
        >
            <MakeUser
                version={version}
            />
        </DefaultLayout>
    )
}