import { IVersoes } from "@/interfaces/versoes.interface";
import { DefaultLayout } from '@/layouts/default';
import { api } from "@/services/api";
import { NextPageContext } from "next";
import Link from "next/link";
import { Button, Table } from "react-bootstrap";
import { FaPlusCircle } from 'react-icons/fa'
import { FaPen, FaTrash } from "react-icons/fa6";
import Swal from 'sweetalert2';

export async function getStaticProps(context: NextPageContext) {
    const versoes = await api.get('/version')
    return {
        props: { versoes: versoes.data },
        revalidate: 30
    }
}

interface PageProps {
    versoes: IVersoes[];
}

export default function Versoes({ versoes }: PageProps) {

    async function onDeleteClick(id: number) {

        Swal.fire({
            title: 'Confirmação',
            text: `Deseja realmente excluir a versão ${id}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/version/${id}`).then(() => {
                    Swal.fire(
                        'Sucesso!',
                        'Versão Excluida com sucesso!',
                        'success'
                    )
                }).catch(() => {
                    Swal.fire(
                        'Ops...',
                        'Ocorreu um erro ao excluir a versão!',
                        'error'
                    )
                })
            }
        })
    }


    return (
        <DefaultLayout
            title='Versões'
            subtitle="Aqui você controla a lista de versões"
        >
            <Link href="/versoes/cadastrar"><Button variant="success">Cadastrar <FaPlusCircle /></Button></Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cód</th>
                        <th>Nome</th>
                        <th>url</th>
                        <th>Alterações</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        versoes?.map(vsr => {
                            return <tr key={vsr.id}>
                                <td>{vsr.id}</td>
                                <td>{vsr.name}</td>
                                <td>{vsr.url}</td>
                                <td>{vsr.changes}</td>
                                <td>
                                    <Button variant="primary"><FaPen /></Button>
                                    {' '}
                                    <Button variant="danger" onClick={() => {
                                        onDeleteClick(vsr.id)
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