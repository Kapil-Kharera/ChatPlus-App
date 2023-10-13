import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import  PulseLoader  from "react-spinners/PulseLoader";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import AuthInput from "./AuthInput";
import { RegisterUser, changeStatus } from "../../features/userSlice";
import Picture from "./Picture";

//env. var
const { REACT_APP_CLOUD_NAME, REACT_APP_CLOUD_SECRET } = process.env;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);
  const [ picture, setPicture ] = useState();
  const [ readablePicture, setReadablePicture ] = useState("");
  const { register, handleSubmit, formState: {errors} } = useForm({
      resolver: yupResolver(signUpSchema)
  });

  // console.log(picture, readablePicture);

  const onSubmit = async (data) => {
    let response;

    dispatch(changeStatus("loading"));
    
    if(picture) {
      //upload img to cloudinary & then register user
      await uploadImage().then(async (item) => {
        response = await dispatch(RegisterUser({ ...data, picture: item.secure_url}));
        console.log(response);
      });
    }else {
      response = await dispatch(RegisterUser({ ...data, picture: "" }));
    }
    

    if(response?.payload?.user) navigate("/");
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("upload_preset", REACT_APP_CLOUD_SECRET);
    formData.append("file", picture);

    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`, formData);
    console.log(data);
    return data;
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* container */}
        <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
            {/* Heading */}
            <div className="text-center dark:text-dark_text_1">
                <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
                <p className="mt-2 text-sm">Sign up</p>
            </div>
            {/* Form */}
            <form 
              className="mt-6 space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              >
                <AuthInput 
                  name="name"
                  type="text"
                  placeholder="Name"
                  register={register}
                  error={errors?.name?.message}
                  />

                <AuthInput 
                  name="email"
                  type="text"
                  placeholder="Email"
                  register={register}
                  error={errors?.email?.message}
                  />

                <AuthInput 
                  name="status"
                  type="text"
                  placeholder="Status (Optional)"
                  register={register}
                  error={errors?.status?.message}
                  />

                <AuthInput 
                  name="password"
                  type="password"
                  placeholder="Password"
                  register={register}
                  error={errors?.password?.message}
                  />

                  {/* Picture */}
                  <Picture readablePicture={readablePicture} setReadablePicture={setReadablePicture} setPicture={setPicture} />

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
                  { status === "loading" ? <PulseLoader color="#fff" size={16} /> : "Sign up"}
                </button>
                {/* sign in link */}
                <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
                  <span>have an account ?</span>
                  <Link 
                    to="/login"
                    className="hover:underline cursor-pointer transition ease-in duration-300">Sign in</Link>
                </p>
            </form>
        </div> 
    </div>
  )
}

export default RegisterForm;