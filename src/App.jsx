import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        // style={{
        //   top: "50%",
        //   transform: "translateY(-50%)",
        // }}
      />
      <AppRoutes />
    </>
  );
};
export default App;
