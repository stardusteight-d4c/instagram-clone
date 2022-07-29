/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { getProviders, signIn } from 'next-auth/react'
import Header from '../../components/Header'

export const getServerSideProps = async () => {
  const providers = await getProviders() // Definidos em api/auth
  return {
    props: {
      providers,
    },
  }
}

// See documentation https://next-auth.js.org/configuration/pages#oauth-sign-in
const SignIn = ({ providers }) => {
  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-32 text-center px-14">
        <img className="w-80" src="/logo.png" alt="Instagram" />
        <p>
          Este não é um aplicativo REAL, é construído apenas para fins
          educacionais
        </p>

        <div className="mt-28">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 text-white bg-blue-500 rounded-lg"
                onClick={() => signIn(provider.id, { callbackUrl: '/'})}
              >
                Entre com {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SignIn
