import { Spinner } from "@/components/ui/spinner";
import useEcomStore from "@/store/ecom-store";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const actionLogout = useEcomStore((state) => state.actionLogout)

  const [count, setCount] = useState(3);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount === 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return currentCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (redirect) {
    actionLogout();
    return <Navigate to={"/"} />;
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center gap-4">
      <Spinner className="size-6" />
      No Permission, Redirect in {count}
    </div>
  );
};
export default LoadingToRedirect;
