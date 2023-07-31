import { IUsuarios } from '@/interfaces/usuarios.interface';
import { api } from '@/services/api';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'

interface PageProps {
    user?: IUsuarios
}

export default function MakeUser({ user }: PageProps) {

    const { push } = useRouter();

    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            name: user?.name ?? '',
            email: user?.email ?? '',
            password: '',
            password2: ''
        }
    });

    function onSubmit(data: any) {
        if (data.password !== data.password2) {
            setError("password2", {
                message: "Senhas não coincidem"
            })
            return;
        }

        if (user) {
            api.put(`/users/${user.id}`, data).then(() => {
                Swal.fire('Sucesso!', 'usuário editado com sucesso', 'success')
                push('/usuarios')
            }).catch(error => {
                Swal.fire('Ops...', `Erro ao editar usuário ${error}`, 'error')
            })
        } else {
            api.post('/users', data).then(() => {
                Swal.fire('Sucesso!', 'usuário cadastrado com sucesso', 'success')
                push('/usuarios')
            }).catch(error => {
                Swal.fire('Ops...', `Erro ao cadastrar usuário ${error}`, 'error')
            })
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="seu nome"
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
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" isInvalid={!!errors.email} placeholder="seu email" {...register("email", {
                    maxLength: { value: 40, message: "Tamanho maximo de 40 caracteres" },
                    minLength: { value: 3, message: "Valor muito curto" },
                    required: { value: true, message: "Campo obrigatário" },
                })} />
                {
                    errors.email && <strong>Erro: {errors.email.message}</strong>
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Senha:</Form.Label>
                <Form.Control type="password" isInvalid={!!errors.password} placeholder="sua senha" {...register("password", {
                    maxLength: { value: 40, message: "Tamanho maximo de 40 caracteres" },
                    minLength: { value: 6, message: "Valor muito curto" },
                    required: { value: true, message: "Campo obrigatário" },
                })} />
                {
                    errors.password && <strong>Erro: {errors.password.message}</strong>
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirme a senha:</Form.Label>
                <Form.Control type="password" isInvalid={!!errors.password2} placeholder="sua senha" {...register("password2", {
                    maxLength: { value: 40, message: "Tamanho maximo de 40 caracteres" },
                    minLength: { value: 6, message: "Valor muito curto" },
                    required: { value: true, message: "Campo obrigatário" },
                })} />
                {
                    errors.password2 && <strong>Erro: {errors.password2.message}</strong>
                }
            </Form.Group>
            <Button variant="success" type='submit'>Salvar</Button>
        </Form>
    )
}
