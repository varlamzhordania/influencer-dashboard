import DashboardLayout from "@/layout/DashboardLayout";
import GeneralLayout from "@/layout/GeneralLayout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/router";
import { AuthContextProvider } from "../../context/AuthContext";
import CheckIsLogin from "@/components/CheckIsLogin";
import Protection from "@/components/Protection";
// import { HeartedInfluencersProvider } from '../context/HeartedInfluencersContext';
const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  // if (router.pathname === "/signin") {
  //   return (
  //     <QueryClientProvider client={queryClient}>
  //       <GeneralLayout>
  //         <Component {...pageProps} />
  //         <ReactQueryDevtools initialIsOpen={false} />
  //       </GeneralLayout>
  //     </QueryClientProvider>
  //   );
  // }
  // return (
  //   <QueryClientProvider client={queryClient}>
  //     <DashboardLayout>
  //       <Component {...pageProps} />
  //       <ReactQueryDevtools initialIsOpen={false} />
  //     </DashboardLayout>
  //   </QueryClientProvider>
  // );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {router.pathname === "/signin" || router.pathname === "/signup" ? (
          <CheckIsLogin>
            <GeneralLayout>
              <Component {...pageProps} />
            </GeneralLayout>
          </CheckIsLogin>
        ) : router.pathname === "/transaction" ? (
          <GeneralLayout>
            <Component {...pageProps} />
          </GeneralLayout>
        ) : (
          <Protection>
            <DashboardLayout>
              <Component {...pageProps} />
            </DashboardLayout>
            <ReactQueryDevtools initialIsOpen={false} />
          </Protection>
        )}
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default App;
