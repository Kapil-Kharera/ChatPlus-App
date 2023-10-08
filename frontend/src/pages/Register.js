import RegisterForm from "../components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* container */}
      <div className="flex w-[1600px] mx-auto h-full">
        {/* Register Form */}
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register;