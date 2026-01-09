import { useState } from "react";

const BrandItem = ({ brand }) => {
  const [showLogo, setShowLogo] = useState(true);

  return (
    <div
      className="group flex items-center gap-4
      px-6 py-4 rounded-xl
      transition-all duration-300
      hover:bg-black/5"
    >
      {/* Logo */}
      {brand.logo && showLogo && (
        <img
          src={brand.logo}
          alt={brand.name}
          loading="lazy"
          onError={() => setShowLogo(false)}
          className="
            h-10 w-auto
            grayscale opacity-60
            transition-all duration-300
            group-hover:grayscale-0
            group-hover:opacity-100
            group-hover:scale-105
          "
        />
      )}

      {/* Brand name */}
      <span
        className="
          text-2xl font-bold uppercase tracking-widest
          text-gray-700
          grayscale opacity-80
          transition-all duration-300
          group-hover:grayscale-0
          group-hover:opacity-100
        "
      >
        {brand.name}
      </span>
    </div>
  );
};

export default BrandItem;
