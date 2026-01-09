import {
  PackageOpen,
  Plus,
  ArrowLeft,
  UserSearch,
  Tags,
  ClipboardList,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useEcomStore from "@/store/ecom-store";

export const ProductEmpty = ({ onTabAdd }) => {
  const isAdmin = useEcomStore((state) => state.isAdmin);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <PackageOpen className="h-10 w-10 text-muted-foreground" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold tracking-tight">
        No product found
      </h2>

      {/* Description */}
      {isAdmin && onTabAdd ? (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Looks like there are no products here yet.
        </p>
      ) : (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Looks like there are no products here yet. Try adjusting your filters
          or come back later.
        </p>
      )}

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        {!isAdmin && (
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>
        )}

        {isAdmin && onTabAdd ? (
          <Button onClick={onTabAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add product
          </Button>
        ) : (
          <Button asChild>
            <Link to="/admin/product">
              <Plus className="mr-2 h-4 w-4" />
              Add product
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export const UserEmpty = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <UserSearch className="h-10 w-10 text-muted-foreground" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold tracking-tight">No user found</h2>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Looks like there are no user here yet.
      </p>
    </div>
  );
};

export const CategoryEmpty = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <Tags className="h-10 w-10 text-muted-foreground" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold tracking-tight">
        No category found
      </h2>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Looks like there are no category here yet.
      </p>
    </div>
  );
};

export const OrderEmpty = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <ClipboardList className="h-10 w-10 text-muted-foreground" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold tracking-tight">No order found</h2>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Looks like there are no order here yet.
      </p>
    </div>
  );
};

export const CartEmpty = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <ShoppingCart className="h-10 w-10 text-muted-foreground" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold tracking-tight">
        No products in cart
      </h2>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Looks like you haven’t added anything to your cart yet.
      </p>

      {/* action */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/shop">
            <Plus className="h-4 w-4" />
            Add product
          </Link>
        </Button>
      </div>
    </div>
  );
};
