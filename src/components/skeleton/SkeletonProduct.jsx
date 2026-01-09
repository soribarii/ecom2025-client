import { Skeleton } from "../ui/skeleton";

const SkeletonProductCard = () => {

  return (
            <div className="w-48 border rounded-md shadow-sm">
              {/* image */}
              <div>
                  <Skeleton
                    className="w-full h-40 object-contain"
                  />
              </div>
    
              {/* title */}
              <div className="py-2 mx-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
    
              {/* price */}
              <div className="pb-2 mx-3 flex justify-between items-center">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-9 w-9 rounded-sm" />
              </div>
            </div>
  );
};
export default SkeletonProductCard;

