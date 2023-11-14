import { Divider, Form, Input, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF, FaInstagramSquare, FaLinkedinIn } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    validatePassword(newPassword);
  };

  const validatePassword = (password) => {
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSmallLetter = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(
      password
    );

    if (
      hasCapitalLetter &&
      hasSmallLetter &&
      hasNumber &&
      hasSpecialCharacter &&
      password.length >= 8
    ) {
      setPasswordError("");
    } else {
      setPasswordError(
        "Password must contain at least one capital letter, one small letter, one number, one special character, and be at least 8 characters long."
      );
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await signUp(values);
      // router.push("/signin");
    } catch (error) {
      console.error("Signup error: ", error);
      message.error({
        content: "Something went wrong, please try again",
      });
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex items-center justify-center md:h-screen bg-white">
      <div className="bg-black bg-opacity-[2%] w-full h-full p-5 items-center justify-center flex flex-col md:space-y-2">
        <h2 className="text-xl leading-[2.75rem] text-center font-semibold mb-4 font-poppins">
          Create your account
        </h2>
        <Form
          onFinish={handleSubmit}
          className="mx-auto w-full flex flex-col space-y-1 md:px-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="">
              <label
                className="block font-medium mb-2 text-sm md:text-base"
                htmlFor="name"
              >
                First name*
              </label>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <input
                  className="text-sm md:text-base border border-none rounded-[10px] w-full py-2 px-3 leading-tight focus:outline-none text-black"
                  id="email"
                  placeholder="Enter your first name.."
                  style={{
                    background: "rgba(176, 186, 195, 0.40)",
                  }}
                />
              </Form.Item>
            </div>
            <div className="">
              <label
                className="block font-medium mb-2 text-sm md:text-base"
                htmlFor="name"
              >
                Last name
              </label>
              <Form.Item name="lastName">
                <input
                  className="text-sm md:text-base border border-none rounded-[10px] w-full py-2 px-3 leading-tight focus:outline-none text-black"
                  id="email"
                  placeholder="Enter your last name.."
                  style={{
                    background: "rgba(176, 186, 195, 0.40)",
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="">
            <label
              className="block font-medium mb-2 text-sm md:text-base"
              htmlFor="phone"
            >
              Phone no
            </label>
            <Form.Item name="phone">
              <input
                className="text-sm md:text-base border border-none rounded-[10px] w-full py-2 px-3 leading-tight focus:outline-none text-black"
                id="phone"
                placeholder="Enter your phone.."
                style={{
                  background: "rgba(176, 186, 195, 0.40)",
                }}
              />
            </Form.Item>
          </div>
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
              validateStatus={passwordError ? "error" : ""}
              help={passwordError}
            >
              <Input.Password
                onChange={handlePasswordChange}
                className="text-sm md:text-base border border-none rounded-[10px] w-full py-2 px-3 leading-tight focus:outline-none text-black"
                id="password"
                type="password"
                placeholder="Enter your password.."
                style={{
                  background: "rgba(176, 186, 195, 0.40)",
                }}
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
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </div>
        </Form>
        {/* <Divider rootClassName="text-blue-500"> */}
        <span className="font-poppins text-[#B0BAC3]">-OR-</span>
        {/* </Divider> */}
        <div className="flex items-center space-x-2">
          <span className="text-[#7C838A] font-poppins text-sm">
            Already a member?
          </span>
          <Link
            href={"/signin"}
            className="text-blue-500 underline font-poppins text-sm"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
