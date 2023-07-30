import { IUsuarios } from '@/interfaces/usuarios.interface';
import { DefaultLayout } from '@/layouts/default';
import { api } from '@/services/api';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'


export default function Cadastrar() {

    const { push } = useRouter();

    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            name: '',
            url: '',
            changes: ''
        }
    });

    function onSubmit(data: any) {
        api.post('/version', data).then(() => {
            Swal.fire('Sucesso!', 'versão cadastrada com sucesso', 'success')
            push('/versoes')
        }).catch(error => {
            Swal.fire('Ops...', `Erro ao cadastrar versão ${error}`, 'error')
        })
    };

    return (
        <DefaultLayout
            title='Versões'
            subtitle='Adicione novas versões'
        >

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nome da versão"
                        isInvalid={!!errors.name}
                        {...register("name", {
                            maxLength: { value: 40, message: "Tamanho maximo de 40 caracteres" },
                            minLength: { value: 3, message: "Valor muito curto" },
                            required: { value: true, message: "Campo obrigatário" },
                        })}
                    />
                    {
                        errors.name && <strong>Erro: {errors.name.message}</strong>
                    }

                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Url:</Form.Label>
                    <Form.Control
                        type="text"
                        isInvalid={!!errors.url}
                        placeholder="Sua Url"
                        {...register("url", {
                            maxLength: { value: 40, message: "Tamanho maximo de 40 caracteres" },
                            minLength: { value: 3, message: "Valor muito curto" },
                            required: { value: true, message: "Campo obrigatário" },
                        })} />
                    {
                        errors.url && <strong>Erro: {errors.url.message}</strong>
                    }
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Alterações:</Form.Label>
                    <Form.Control
                        as="textarea" rows={5}
                        isInvalid={!!errors.changes}
                        {...register("changes", {
                            maxLength: { value: 40, message: "Tamanho maximo de 40 caracteres" },
                            minLength: { value: 6, message: "Valor muito curto" },
                            required: { value: true, message: "Campo obrigatário" },
                        })} />
                    {
                        errors.changes && <strong>Erro: {errors.changes.message}</strong>
                    }
                </Form.Group>
                <Button variant="success" type='submit'>Salvar</Button>
            </Form>
        </DefaultLayout>
    )
}
