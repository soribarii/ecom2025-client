import { cn } from "@/lib/utils";

const strengthConfig = {
  0: {
    label: "Very Weak",
    color: "bg-destructive",
    textColor: "text-destructive",
  },
  1: {
    label: "Weak",
    color: "bg-destructive",
    textColor: "text-destructive",
  },
  2: {
    label: "Fair",
    color: "bg-chart-5",
    textColor: "text-chart-5",
  },
  3: {
    label: "Good",
    color: "bg-chart-4",
    textColor: "text-chart-4",
  },
  4: {
    label: "Strong",
    color: "bg-chart-2",
    textColor: "text-chart-2",
  },
};

const PasswordStrengthState = ({ passwordScore }) => {
  // if (passwordScore == null) return null;
  if (![0, 1, 2, 3, 4].includes(passwordScore)) return null

  const config = strengthConfig[passwordScore];

  return (
    <div className="space-y-2">
      {/* Progress bar */}
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={cn(
              "h-1 flex-1 rounded-full bg-muted transition-all duration-300",
              level <= passwordScore && config.color
            )}
          />
        ))}
      </div>

      {/* Text */}
      <p className={cn("text-sm font-medium", config.textColor)}>
        {config.label} password
      </p>
    </div>
  );
};
export default PasswordStrengthState;
