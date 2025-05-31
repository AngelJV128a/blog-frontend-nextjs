'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function SignUpForm() {
  const router = useRouter();
  const{
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const body = {
      ...data,
    };
    console.log(body);
    const fetchData = async () => {
      try{
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
            }
          );
          const data = await response.json();
          console.log(data);
          Swal.fire({
            title: 'Registro exitoso!',
            text: 'Tu cuenta ha sido creada exitosamente.',
            timer: 1500,
            icon: 'success',
          });
          router.push('/Login');

      }catch(error){
        console.error("Error en fetch:",error.response?.status || error.message);
      }
    };
    fetchData();
  };

  return (
    <section className="bg-blueGray-50">
      <div className="w-full lg:w-4/12 px-4 mx-auto pt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center mb-3">
              <h6 className="text-blueGray-500 text-sm font-bold">
                Crea tu cuenta
              </h6>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
          </div>

          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Tu nombre"
                  {...register("name", { required: "El nombre es obligatorio" })}
                />
                {errors.name && <span className="text-red-500 text-xs italic">{errors.name.message}</span>}
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Correo
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Correo electrónico"
                  {...register("email", { required: "El correo es obligatorio" })}
                />
                {errors.email && <span className="text-red-500 text-xs italic">{errors.email.message}</span>}
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="********"
                  {...register("password", { required: "La contraseña es obligatoria" })}
                />
              </div>

              <div className="text-center mt-6">
                <button
                  className="bg-yellow-800 text-white active:bg-yellow-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
