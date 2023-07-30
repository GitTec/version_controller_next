import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { DefaultLayout } from '@/layouts/default'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    //Aqui estou chamando o meu cabecalho que foi criado, passando os parametros 
    <DefaultLayout
      title='Inicio'
      subtitle='Bem vindo à aplicação'
    >
      <p>Sua tela inicial</p>
    </DefaultLayout>
  )
}
