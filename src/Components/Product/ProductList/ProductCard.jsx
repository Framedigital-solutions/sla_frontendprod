const ProductCard = () => {
  return (
    <div className="w-[380px] h-[400px] mx-2   rounded-md my-10">
      <img src="/pr2.png" alt="Diamond Stud" className="w-full h-[90%] " />
      <div className="flex flex-col">
        <p className="text-xl font-light my-2">Diamond Crystal Stud</p>
        <div className="flex gap-[10px] ">
          <span className="font-light text-2xl">₹3,000</span>
          <span className="font-light text-xl line-through text-gray-200">
            ₹5,000
          </span>
          <span className="font-normal text-base text-red-800 text-md/5">
            50% OFF
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
