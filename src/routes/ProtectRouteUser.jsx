import { currentUser } from "@/api/auth";
import useEcomStore from "@/store/ecom-store";
import { useState, useEffect } from "react";
import LoadingToRedirect from "./loadingToRedirect";
import { Spinner } from "@/components/ui/spinner";

const ProtectRouteUser = ({ element }) => {
  const user = useEcomStore((state) => state.user)
  const token = useEcomStore((state) => state.token)

  const [ ok, setOk ] = useState(false)
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if(user && token) {
      currentUser(token)
      .then(() => {
          setOk(true);
          setLoading(false);
        })
      .catch(() => {
          setOk(false);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user, token])

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center gap-4 animate-pulse">
        <Spinner className="size-6" />
        {/* Checking permission... */}
      </div>
    );
  }

  return ok ? element : <LoadingToRedirect />
}
export default ProtectRouteUser