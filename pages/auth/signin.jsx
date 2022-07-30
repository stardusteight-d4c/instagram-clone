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

      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-20 text-center px-14">
        <img className="w-80" src="/logo.png" alt="Instagram" />
        <p>
          Este não é um aplicativo REAL, é construído apenas para fins
          educacionais
        </p>

        <div className="mt-28">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-pink-600 border-2 border-pink-600 rounded-full hover:text-white group hover:bg-gray-50"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </span>
                <span className="relative">Entre com {provider.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SignIn
