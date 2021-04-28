import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Layout from '../components/layout'

export default function Home() {
  const { push } = useRouter()
  useEffect(() => {
    push("https://www.zapei.com.br/loja")
  }, [])
  return (
    <Layout home>

    </Layout>
  )
}
