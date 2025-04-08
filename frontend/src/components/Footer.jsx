// eslint-disable-next-line no-unused-vars
import React from 'react'

function Footer() {
  return (
    <section id="footer" className=" w-full bg-black shadow-md text-center  bottom-0 h-32 flex flex-col justify-center align-middle">
        <p className="text-white text-center">
          Copyright &copy;  {new Date().getFullYear()}
        </p>
        </section>
  )
}

export default Footer