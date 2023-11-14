import { Button, Divider, Form, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF, FaInstagramSquare, FaLinkedinIn } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import ForgotPasswordModal from "./ForgotPasswordModal";

const SignInForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      router.push("/");
    } catch (error) {
      console.error("Login errors: ", error);
      message.error({
        content:
          error.code === "auth/user-not-found"
            ? "User is not registered"
            : error.code === "auth/wrong-password"
            ? "Wrong password entered"
            : error.code === "auth/invalid-login-credentials"
            ? "Wrong email or password"
            : "Something went wrong, please try again",
      });
    }
    setLoading(false);
  };
  return (
    <div className="w-full flex items-center justify-center md:h-screen bg-white">
      <div className="bg-black bg-opacity-[2%] w-full h-full p-5 items-center justify-center flex flex-col md:space-y-2">
        <h2 className="text-xl leading-[2.75rem] text-center font-semibold mb-4 font-poppins">
          Login your account
        </h2>
        <Form
          onFinish={handleSubmit}
          className="mx-auto w-full flex flex-col space-y-1 md:px-12"
        >
          <div className="">
            <label
              className="block font-medium mb-2 text-sm md:text-base"
              htmlFor="name"
            >
              Email*
            </label>
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <input
                className="text-sm md:text-base border border-none rounded-[10px] w-full py-2 px-3 leading-tight focus:outline-none text-black"
                id="email"
                type="email"
                placeholder="Enter your email.."
                style={{
                  background: "rgba(176, 186, 195, 0.40)",
                }}
              />
            </Form.Item>
          </div>
          <div className="">
            <label
              className="block font-medium mb-2 text-sm md:text-xl"
              htmlFor="email"
            >
              Password*
            </label>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <input
                className="text-sm md:text-base border border-none rounded-[10px] w-full py-2 px-3 leading-tight focus:outline-none text-black"
                id="password"
                type="password"
                style={{
                  background: "rgba(176, 186, 195, 0.40)",
                }}
                placeholder="Enter your password.."
              />
            </Form.Item>
          </div>
          {/* <div className="flex items-center justify-end">
            <Link
              href={"#"}
              className="text-orange text-sm md:text-base font-normal"
            >
              Forgot password?
            </Link>
          </div> */}

          <div className="flex items-center justify-end">
            <button
              className="text-sm md:text-base rounded-tr-[20px] rounded-br-[30px] rounded-tl-[30px] rounded-bl-[20px] text-black font-poppins font-medium py-3 lg:py-2 px-8 focus:outline-none focus:shadow-outline w-full flex items-center justify-center bg-[#E5EFF8] mt-5"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login here"}
            </button>
          </div>
          <div className="flex w-full items-center justify-end">
            <span
              className="text-base mt-2 cursor-pointer font-medium"
              onClick={() => setModal(true)}
            >
              Forgot password?
            </span>
          </div>
        </Form>
        {/* <Divider rootClassName="text-blue-500"> */}
        <span className="font-poppins text-[#B0BAC3]">-OR-</span>
        {/* </Divider> */}
        <div className="flex items-center space-x-2">
          <span className="text-[#7C838A] font-poppins text-sm">
            Do not have account?
          </span>
          <Link
            href={"/signup"}
            className="text-blue-500 underline font-poppins text-sm"
          >
            Sign Up
          </Link>
        </div>
      </div>
      {modal && (
        <ForgotPasswordModal onCancel={() => setModal(false)} visible={modal} />
      )}
    </div>
  );
};

export default SignInForm;
