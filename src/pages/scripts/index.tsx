import { DefaultLayout } from "@/layouts/default";
import { NextPageContext } from 'next';
import { api } from "@/services/api";
import Link from "next/link";
import Swal from "sweetalert2";
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaTrash } from 'react-icons/fa6'
import { FaPlusCircle } from 'react-icons/fa'
import { IScripts } from "@/interfaces/scripts.interface";

//crio uma função pra renderizar dados estaticos dos scripts
export async function getStaticProps(context: NextPageContext) {
    const script = await api.get('/script')
    return {
        props: { script: script.data },
        revalidate: 30
    }
}

interface PageProps {
    script: IScripts[]
}

export default function Script({ script }: PageProps) {
    async function onDeleteClick(id: number) {  //crio uma função de delete utilizando uma biblioteca interativa
        Swal.fire({
            title: 'Confirmação',
            text: `Deseja realmente excluir o script ${id}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/script/${id}`).then(() => {
                    Swal.fire(
                        'Sucesso!',
                        'Script Excluido com sucesso!',
                        'success'
                    )
                }).catch(() => {
                    Swal.fire(
                        'Ops...',
                        'Ocorreu um erro ao excluir o script!',
                        'error'
                    )
                })
            }
        })
    }

    return (
        <DefaultLayout
            title='Scripts'
            subtitle='Aqui você controla a lista de scripts'
            hideHeader={true}
        >
            <Link href="/scripts/cadastrar"><Button variant="success">Cadastrar <FaPlusCircle /></Button></Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Observações</th>
                        <th>Script</th>
                        <th>Versão</th>
                        <th>Usuário</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        script?.map(scr => {
                            return <tr key={scr.id}>
                                <td>{scr.title}</td>
                                <td>{scr.obs}</td>
                                <td>{scr.script}</td>
                                <td>{scr.version.name}</td>
                                <td>{scr.user.name}</td>
                                <td>
                                    <Link href={`/scripts/editar/${scr.id}`}><Button variant="primary"><FaPen /></Button></Link>
                                    {' '}
                                    <Button variant="danger" onClick={() => {
                                        onDeleteClick(scr.id)
                                    }}><FaTrash /></Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </DefaultLayout>
    )
}