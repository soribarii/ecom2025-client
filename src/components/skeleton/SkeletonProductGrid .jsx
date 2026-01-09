import SkeletonProductCard from "./SkeletonProduct"

const SkeletonProductGrid  = ({ count = 8}) => {
  const skeletonCount = Array.from({ length: count})
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {
        skeletonCount.map((_, index) => <SkeletonProductCard key={index}/>)
      }
    </div>
  )
}
export default SkeletonProductGrid 