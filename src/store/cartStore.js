import { create } from "zustand";
import { persist } from "zustand/middleware";

export const cartStore = create(
  persist(
    (set) => ({
      cartId: null,
      userId: null,
      items: [
        {
          product: {
            _id: null,
            name: null,
            category: null,
            netWeight: null,
            grossWeight: null,
            carat: null,
            makingcharge: null,
            description: null,
            coverImage: null,
            images: [],
            createdAt: null,
            updatedAt: null,
            pricingId: null,
            pricePerGram: null,
            __v: null,
          },
        },
      ],
      quantity: null,
      realTimeTotalPrice: null,

      setCartData: (cartData) => set({ ...cartData }),
    }),
    {
      name: "cart-storage", // 👈 localStorage key
      getStorage: () => localStorage,
    }
  )
);

// {
//     "cartId": "67f7d6c43ef3cddeee3b9224",
//     "userId": "67c852bf9cd22b87000b76d4",
//     "items": [
//         {
//             "product": {
//                 "_id": "67f7aeb6b30af739833f09b7",
//                 "name": "test4",
//                 "category": "Earring's",
//                 "netWeight": 5,
//                 "grossWeight": 2,
//                 "carat": "1K",
//                 "makingcharge": 5,
//                 "description": "tetst",
//                 "coverImage": "https://res.cloudinary.com/de4ks8mkh/image/upload/v1744285364/gold_products/f0yrad2pis6juctea74s.jpg",
//                 "images": [
//                     "https://res.cloudinary.com/de4ks8mkh/image/upload/v1744285365/gold_products/ye5qnkayd67c30rn4npp.jpg"
//                 ],
//                 "createdAt": "2025-04-10T11:42:46.656Z",
//                 "updatedAt": "2025-04-10T18:15:00.527Z",
//                 "pricingId": "67f37ece93fc17ddf3456bed",
//                 "pricePerGram": 94,
//                 "__v": 0
//             },
//             "quantity": 10,
//             "realTimeTotalPrice": "4935.00"
//         }
//     ]
// }
