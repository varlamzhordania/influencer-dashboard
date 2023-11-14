import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const SignInForm = dynamic(() => import("../components/SignInForm"));

const SignIn = () => {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 place-content-center place-items-center justify-items-center  bg-[#E5EFF8]">
        <div className="flex flex-col items-center justify-center space-y-6 p-10">
          <Image
            alt="alt text"
            src="/images/login-vector.svg"
            width={400}
            height={400}
          />
        </div>
        <SignInForm />
      </div>
    </>
  );
};

export default SignIn;
