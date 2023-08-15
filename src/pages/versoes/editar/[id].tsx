import MakeVersion from "@/fragments/makeVersion"
import { IVersoes } from "@/interfaces/versoes.interface"
import { DefaultLayout } from "@/layouts/default"
import { api } from "@/services/api"
import { NextPageContext } from "next"

interface PageProps {
    version: IVersoes
}

export async function getServerSideProps(context: NextPageContext) {
    const id = context.query.id
    const versao = await api.get(`/version/${id}`)
    return {
        props: { version: versao.data }
    }
}

export default function Editar({ version }: PageProps) {
    console.log(version)
    return (
        <DefaultLayout
            title="Versões"
            subtitle="Editar Versões"
        >
            <MakeVersion
                version={version}
            />
        </DefaultLayout>
    )
}