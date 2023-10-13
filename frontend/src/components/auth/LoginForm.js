
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import  PulseLoader  from "react-spinners/PulseLoader";
import { Link, useNavigate } from 'react-router-dom';
import AuthInput from "./AuthInput";
import { LoginUser } from "../../features/userSlice";



const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);
  const { register, handleSubmit, formState: {errors} } = useForm({
      resolver: yupResolver(signInSchema)
  });

  const onSubmit = async (values) => {
    const response = await dispatch(LoginUser({...values}));

    if(response?.payload?.user) navigate("/");

  };

  

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* container */}
        <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
            {/* Heading */}
            <div className="text-center dark:text-dark_text_1">
                <h2 className="mt-6 text-3xl font-bold">Welcome Back</h2>
                <p className="mt-2 text-sm">Sign in</p>
            </div>
            {/* Form */}
            <form 
              className="mt-6 space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              >

                <AuthInput 
                  name="email"
                  type="text"
                  placeholder="Email"
                  register={register}
                  error={errors?.email?.message}
                  />

                <AuthInput 
                  name="password"
                  type="password"
                  placeholder="Password"
                  register={register}
                  error={errors?.password?.message}
                  />


                {/* If we have an error */}
                
                  {
                    error ? 
                    <div>
                      <p className="text-red-400">{error}</p>
                    </div> : 
                    null
                  }
            

                  {/* Submit Button */}
                <button 
                className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold foucs:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
                type="submit">
                  { status === "loading" ? <PulseLoader color="#fff" size={16} /> : "Sign in"}
                </button>
                {/* sign in link */}
                <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
                  <span>you don't have an account ?</span>
                  <Link 
                    to="/register"
                    className="hover:underline cursor-pointer transition ease-in duration-300">Sign up</Link>
                </p>
            </form>
        </div> 
    </div>
  )
}

export default RegisterForm;