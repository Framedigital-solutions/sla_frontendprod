import OrderSummary from "./Summary";
import Check from "./CheckoutForm";

const SecureCheckout = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center px-6 lg:px-24 space-y-10 lg:space-y-20 lg:space-x-20">
      <Check />
      <OrderSummary />
    </div>
  );
};

export default SecureCheckout;
