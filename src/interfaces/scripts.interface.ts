import { IUsuarios } from "./usuarios.interface"
import { IVersoes } from "./versoes.interface"

export interface IScripts {
    id: number,
    title: string,
    obs: string,
    script: string,
    idVersion: number,
    idUser: number,
    active: boolean
    user: IUsuarios,
    version: IVersoes
}