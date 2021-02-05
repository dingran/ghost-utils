import Head from 'next/head';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/auth';

export default function Home() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));

  const auth = useAuth();
  return auth.user ? (
    <div>
      <p>Email: {auth.user.email}</p>
      <button onClick={(e) => auth.signout()}>Sign Out</button>
    </div>
  ) : (
    <button onClick={(e) => auth.signinWithGitHub()}>Sign In</button>
  );

  // return (
  //   <div>
  //     <Head>
  //       <title>Create Next App</title>
  //       <link rel='icon' href='/favicon.ico' />
  //     </Head>
  //     <form onSubmit={handleSubmit(onSubmit)}>
  //       <input name='firstName' ref={register} placeholder='First name' />

  //       <input name='lastName' ref={register} placeholder='Last name' />

  //       <select name='category' ref={register}>
  //         <option value=''>Select...</option>
  //         <option value='A'>Category A</option>
  //         <option value='B'>Category B</option>
  //       </select>

  //       <input type='submit' />
  //     </form>

  //   </div>
  // );
}
