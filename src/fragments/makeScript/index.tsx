import { IScripts } from '@/interfaces/scripts.interface';
import { IUsuarios } from '@/interfaces/usuarios.interface';
import { IVersoes } from '@/interfaces/versoes.interface';
import { api } from '@/services/api';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'

interface PageProps {
    scripts?: IScripts
    users: IUsuarios[]
    version: IVersoes[]
}

export default function MakeScript({ scripts, users, version }: PageProps) {

    const { push } = useRouter();

    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            title: scripts?.title ?? '',
            obs: scripts?.obs ?? '',
            script: scripts?.script ?? '',
            idVersion: scripts?.idVersion ?? '0',
            idUser: scripts?.idUser ?? '0',
            active: scripts?.active ?? '',
        }
    });

    function onSubmit(data: any) {

        if (scripts) {
            api.put(`/script/${scripts.id}`, data).then(() => {
                Swal.fire('Sucesso!', 'script editado com sucesso', 'success')
                push('/scripts')
            }).catch(error => {
                Swal.fire('Ops...', `Erro ao editar script ${error}`, 'error')
            })
        } else {
            api.post('/script', data).then(() => {
                Swal.fire('Sucesso!', 'script cadastrado com sucesso', 'success')
                push('/scripts')
            }).catch(error => {
                Swal.fire('Ops...', `Erro ao cadastrar script ${error}`, 'error')
            })
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>Título:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="seu título"
                    isInvalid={!!errors.title}
                    {...register("title", {
                        maxLength: { value: 40, message: "Tamanho maximo de 40 caracteres" },
                        minLength: { value: 3, message: "Valor muito curto" },
                        required: { value: true, message: "Campo obrigatário" },
                    })}
                />
                {
                    errors.title && <strong>Erro: {errors.title.message}</strong>
                }

            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Observações:</Form.Label>
                <Form.Control
                    type="text"
                    isInvalid={!!errors.obs}
                    placeholder="suas observações"
                    {...register("obs", {
                        maxLength: { value: 40, message: "Tamanho maximo de 40 caracteres" },
                        minLength: { value: 3, message: "Valor muito curto" },
                        required: { value: true, message: "Campo obrigatário" },
                    })} />
                {
                    errors.obs && <strong>Erro: {errors.obs.message}</strong>
                }
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Script:</Form.Label>
                <Form.Control
                    type="text"
                    as={"textarea"} //Muda o tipo pra um texto de area, campo maior
                    isInvalid={!!errors.script}
                    placeholder="seu script"
                    {...register("script", {
                        maxLength: { value: 40, message: "Tamanho maximo de 40 caracteres" },
                        minLength: { value: 6, message: "Valor muito curto" },
                        required: { value: true, message: "Campo obrigatário" },
                    })} />
                {
                    errors.script && <strong>Erro: {errors.script.message}</strong>
                }
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Versao:</Form.Label>
                <Form.Select aria-label="Selecione uma versão"
                    {...register("idVersion", {
                        required: { value: true, message: "Campo obrigatário" },
                        min: { value: 1, message: "Selecione uma versão" }
                    })}>
                    <option value={0}>Selecione uma versão</option>
                    {
                        version.map((vsr) => {
                            return <option value={vsr.id} key={vsr.id}>{vsr.name}</option>
                        })
                    }

                </Form.Select>
                {
                    errors.idVersion && <strong>Erro: {errors.idVersion.message}</strong>
                }
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Usuário:</Form.Label>
                <Form.Select aria-label="Selecione um usuário"
                    {...register("idUser", {
                        required: { value: true, message: "Campo obrigatário" },
                        min: { value: 1, message: "Selecione um usuário" }
                    })}>
                    <option value={0}>Selecione um usuário</option>
                    {
                        users.map((usr) => {
                            return <option value={usr.id} key={usr.id}>{usr.name}</option>
                        })
                    }
                </Form.Select>
                {
                    errors.idUser && <strong>Erro: {errors.idUser.message}</strong>
                }
            </Form.Group>

            <Button variant="success" type='submit'>Salvar</Button>
        </Form>
    )
}
