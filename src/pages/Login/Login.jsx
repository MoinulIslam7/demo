import {
  At,
  Copy,
  Lock,
  Minus,
  X,
} from '@phosphor-icons/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Logo } from '../../Assets/SVGcomponents';
import Input from '../../Shared/Input/Input';
import { useAuth } from '../../Contexts/AuthProvider';

/**
 * Renders a login form for users to authenticate.
 *
 * This component displays a login form where users can enter their username and password to log in.
 * It utilizes the `Input` component for input fields with icons. Upon submission, the form data is
 * passed to the `logIn` function from the `AuthContext` to authenticate the user.
 * navigation links to the registration page for users who don't have an account
 *  and a forgot password link.
 *
 * @returns {JSX.Element} The rendered login form.
 */

function Login() {
  const { logIn } = useAuth();
  const { handleSubmit, register } = useForm();

  const onsubmit = (data) => {
    logIn(data);
  };

  return (
    <div className="bg-no-repeat bg-cover w-[100vw] h-[100vh] flex justify-center items-center ">
      <div className="w-[600px] bg-[#ffffffdb] rounded-lg border border-borderColor">
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
