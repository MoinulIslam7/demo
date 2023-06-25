/* eslint-disable import/no-extraneous-dependencies */
import {
  At,
  Copy,
  Lock,
  Minus,
  X,
} from '@phosphor-icons/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../../Assets/Images/bg.jpg';
import { Logo } from '../../Assets/SVGcomponents';
import Input from '../../Shared/Input/Input';
import req from '../../utils/network/req';
import Loading from '../../Shared/Loading/Loading';

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();

  const onsubmit = (data) => {
    setIsLoading(true);
    req({ target: 'login', body: data })
      .then((res) => {
        console.log(res);
        navigate('/');
        reset();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) return <Loading />;

  return (
    <div style={{ backgroundImage: `url(${bg})` }} className="bg-no-repeat bg-cover w-[100vw] h-[100vh] flex justify-center items-center ">
      <div className="w-[600px] bg-[#ffffffdb] rounded-lg">
        <div className="bg-heading flex justify-between items-center py-3 px-5 rounded-t-lg">
          <Logo />
          <div className="flex flex-row justify-center items-center gap-9">
            <Minus color="#ffffffa6" />
            <Copy color="#ffffffa6" />
            <X color="#ffffffa6" />
          </div>
        </div>
        <div>
          <h2 className="py-12 text-center text-xl leading-6 text-textPrimary font-medium">Welcome to Cookie</h2>
          <form onSubmit={handleSubmit(onsubmit)} className="mx-12">
            <div>
              <Input label="Username" Icon={At} register={{ ...register('userName') }} />
            </div>
            <div>
              <Input label="Password" Icon={Lock} type="password" register={{ ...register('password') }} />
            </div>
            <div className="flex justify-between items-center">
              <a className="text-sm text-primary mt-4" href="./Login.jsx">Forget Password?</a>
              <button className="bg-primary rounded-[50px] py-4 px-8" type="submit">
                <span className="text-white">Login</span>
              </button>
            </div>
            <div className="mt-[82px] text-center pb-8">
              <span>
                Don’t have a Cookie Account?
                <Link to="/register" className="text-primary pl-2">Create an Account</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
