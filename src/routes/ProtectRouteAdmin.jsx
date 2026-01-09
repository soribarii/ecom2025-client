import { currentAdmin } from "@/api/auth";
import useEcomStore from "@/store/ecom-store";
import { useState, useEffect } from "react";
import LoadingToRedirect from "./loadingToRedirect";
import { Spinner } from "@/components/ui/spinner";

const ProtectRouteAdmin = ({ element }) => {
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);
  const checkIsAdmin = useEcomStore((state) => state.checkIsAdmin)

  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      currentAdmin(token)
        .then(() => {
          setOk(true);
          setLoading(false);
          checkIsAdmin(true, token)
        })
        .catch(() => {
          setOk(false);
          setLoading(false);
          checkIsAdmin(false, token)
        });
    } else {
      setLoading(false);
      checkIsAdmin(false, token)
    }
  }, [user, token, checkIsAdmin]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center gap-4 animate-pulse">
        <Spinner className="size-6" />
        {/* Checking permission... */}
      </div>
    );
  }

  return ok ? element : <LoadingToRedirect />;
};
export default ProtectRouteAdmin;
