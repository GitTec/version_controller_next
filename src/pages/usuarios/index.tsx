import { IUsuarios } from "@/interfaces/usuarios.interface";
import { DefaultLayout } from "@/layouts/default";
import { NextPageContext } from 'next';
import { api } from "@/services/api";
import Link from "next/link";
import Swal from "sweetalert2";
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaTrash } from 'react-icons/fa6'
import { FaPlusCircle } from 'react-icons/fa'

//crio uma função pra renderizar dados estaticos dos usuario
export async function getStaticProps(context: NextPageContext) {
    const usuarios = await api.get('/users')
    return {
        props: { usuarios: usuarios.data },
        revalidate: 30
    }
}

interface PageProps {
    usuarios: IUsuarios[]
}

export default function Usuarios({ usuarios }: PageProps) {
    async function onDeleteClick(id: number) {  //crio uma função de delete utilizando uma biblioteca interativa
        Swal.fire({
            title: 'Confirmação',
            text: `Deseja realmente excluir o usuário ${id}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete(`/users/${id}`).then(() => {
                    Swal.fire(
                        'Sucesso!',
                        'Usuário Excluido com sucesso!',
                        'success'
                    )
                }).catch(() => {
                    Swal.fire(
                        'Ops...',
                        'Ocorreu um erro ao excluir o usuário!',
                        'error'
                    )
                })
            }
        })
    }

    return (
        <DefaultLayout
            title='Usuários'
            subtitle='Aqui você controla a lista de usuários'
            hideHeader={true}
        >
            <Link href="/usuarios/cadastrar"><Button variant="success">Cadastrar <FaPlusCircle /></Button></Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Cód</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios?.map(usr => {
                            return <tr key={usr.id}>
                                <td>{usr.id}</td>
                                <td>{usr.name}</td>
                                <td>{usr.email}</td>
                                <td>
                                    <Link href={`/usuarios/editar/${usr.id}`}><Button variant="primary"><FaPen /></Button></Link>
                                    {' '}
                                    <Button variant="danger" onClick={() => {
                                        onDeleteClick(usr.id)
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