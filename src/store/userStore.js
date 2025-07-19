import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create(
  persist(
    (set) => ({
      cartId: null,
      _id: null,
      fullName: null,
      email: null,
      phone: null,
      password: null,
      profileImage: null,
      addresses: [
        {
          type: null,
          addressLine: null,
          city: null,
          state: null,
          zipcode: null,
          country: null,
          primaryPhone: null,
          isDefault: false,
          _id: null,
          createdAt: null,
          updatedAt: null,
        },
      ],
      createdAt: null,
      token: null,

      setUserToken: (token) => {
        set({ token });
      },

      setClearToken: () => {
        set({ token: null });
      },

      setUserData: (userObj) => {
        set({ ...userObj });
      },

      setCartId: (cartObj) => {
        console.log("cartObj " + JSON.stringify(cartObj, null, 2));
        set((prev) => {
          return { ...cartObj, ...prev };
        });
      },
    }),
    {
      name: "user-storage", // 👈 key in localStorage
      getStorage: () => localStorage, // (optional, default)
    }
  )
);

// {
//     "message": "Login successful",
//     "user": {
//         "_id": "67f8071de5b37dc266e2508c",
//         "name": "John Doe",
//         "email": "karanrana3097@gmail.com",
//         "phone": "+911234567890",
//         "profileImage": "https://example.com/profile.jpg",
//         "addresses": [
//             {
//                 "type": "Home",
//                 "addressLine": "123 Main St, Cityville",
//                 "city": "Cityville",
//                 "state": "NY",
//                 "zipcode": "123456",
//                 "country": "USA",
//                 "primaryPhone": "9876543210",
//                 "isDefault": false,
//                 "_id": "67f8071de5b37dc266e2508d",
//                 "createdAt": "2025-04-10T17:59:57.425Z",
//                 "updatedAt": "2025-04-10T17:59:57.425Z"
//             },
//             {
//                 "type": "Work",
//                 "addressLine": "456 Business Rd, Businesscity",
//                 "city": "Businesscity",
//                 "state": "CA",
//                 "zipcode": "654321",
//                 "country": "USA",
//                 "primaryPhone": "1234567890",
//                 "isDefault": false,
//                 "_id": "67f8071de5b37dc266e2508e",
//                 "createdAt": "2025-04-10T17:59:57.425Z",
//                 "updatedAt": "2025-04-10T17:59:57.425Z"
//             }
//         ],
//         "createdAt": "2025-04-10T17:59:57.425Z"
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2Y4MDcxZGU1YjM3ZGMyNjZlMjUwOGMiLCJpYXQiOjE3NDQzMDgwMTAsImV4cCI6MTc0NDMxNTIxMH0.Ae1p0mJTVRwhMYvM5QTlK8CTqfx580-tQD58SCfi_Cg"
// }
