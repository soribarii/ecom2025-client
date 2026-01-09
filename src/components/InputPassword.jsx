import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";

const InputPassword = ({ name, placeholder, register, inputClass, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const hasError = Boolean(errors?.[name]?.message)

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        id={name}
        className={inputClass(hasError)}
        placeholder={placeholder}
        {...register(name)}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};
export default InputPassword;
