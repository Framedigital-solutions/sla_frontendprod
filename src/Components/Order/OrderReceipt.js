function OrderReceipt() {
  return (
    <div className="max-w-lg mx-auto p-4 md:p-6 bg-white">
      {/* Ticket Wrapper */}
      <div className="relative bg-[#5e2c0d] text-white overflow-hidden rounded-2xl">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gray-200 rounded-t-full"></div>

        {/* Order Summary Title */}
        <div className="pt-8 px-8">
          <h2 className="text-5xl font-light mb-4">Order Summary</h2>
          <div className="h-px w-full bg-white/30 mb-6"></div>

          {/* Order Details */}
          <div className="flex justify-between mb-6">
            <div className="flex-1">
              <p className="text-sm mb-2">Date</p>
              <p className="font-medium">02 Oct 2023</p>
            </div>
            <div className="flex-1 border-x border-white/30 px-4">
              <p className="text-sm mb-2">Order Number</p>
              <p className="font-medium">0215-451512152</p>
            </div>
            <div className="flex-1 pl-4">
              <p className="text-sm mb-2">Payment Method</p>
              <p className="font-medium">Cash</p>
            </div>
          </div>
        </div>

        {/* Ticket Perforation */}
        <div className="relative py-4">
          <div className="border-t border-dashed border-white/50"></div>
          <div className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white"></div>
          <div className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-white"></div>
        </div>

        {/* Items List */}
        <div className="px-8 py-4">
          <div className="flex justify-between mb-8">
            <div>
              <p>Size : 12</p>
              <p>Qty : 01</p>
            </div>
            <p className="font-medium">₹3,000</p>
          </div>

          <div className="flex justify-between mb-8">
            <div>
              <p>Size : 12</p>
              <p>Qty : 01</p>
            </div>
            <p className="font-medium">₹3,000</p>
          </div>

          {/* Separator Line */}
          <div className="h-px w-full bg-white/30 mb-4"></div>

          {/* Pricing Summary */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <p>Sub Total</p>
              <p>₹3,000</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>₹500</p>
            </div>
            <div className="flex justify-between">
              <p>Tax</p>
              <p>₹50</p>
            </div>
          </div>

          {/* Separator Line */}
          <div className="h-px w-full bg-white/30 my-4"></div>

          {/* Order Total */}
          <div className="flex justify-between mb-8">
            <p className="text-lg font-medium">Order Total</p>
            <p className="text-lg font-medium">₹3550</p>
          </div>
        </div>

        {/* Triangle Pattern at Bottom */}
        <div className="flex overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-6 flex-shrink-0 bg-white"
              style={{
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderReceipt;
