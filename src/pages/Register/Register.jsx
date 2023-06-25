import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Minus,
  Copy,
  X,
  At,
  Envelope,
  Lock,
} from '@phosphor-icons/react';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../../Assets/Images/bg.jpg';
import { Logo } from '../../Assets/SVGcomponents';
import Input from '../../Shared/Input/Input';
import req from '../../utils/network/req';
import Loading from '../../Shared/Loading/Loading';

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();

  const onsubmit = (data) => {
    setIsLoading(true);
    req({ target: 'register', body: data })
      .then((res) => {
        console.log('register successful:', res, data);
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
              <Input label="Email Address" Icon={Envelope} register={{ ...register('email') }} />
            </div>
            <div>
              <Input label="Password" Icon={Lock} register={{ ...register('password') }} />
            </div>
            <div>
              <Input label="Confirm Password" Icon={Lock} register={{ ...register('password') }} />
            </div>
            <div className="flex justify-end items-center">
              <button className="bg-primary rounded-[50px] py-4 px-8">
                <span className="text-white">Sign Up</span>
              </button>
            </div>
            <div className="mt-[80px] text-center pb-8">
              <span>
                already have an account?
                <Link to="/Login" className="text-primary"> Login Here </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
