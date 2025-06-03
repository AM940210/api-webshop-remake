// // components/Purchase.tsx
// import React from "react";

// interface Item {
//   id: number;
//   name: string;
//   quantity: number;
//   price: number;
// }

// interface PurchaseProps {
//   purchaseList: Item[];
//   handleQuantityChange: (
//     e: React.ChangeEvent<HTMLSelectElement>,
//     id: number
//   ) => void;
// }

// const Purchase: React.FC<PurchaseProps> = ({
//   purchaseList,
//   handleQuantityChange,
// }) => {
//   // Calculate the total price
//   const total = purchaseList
//     .reduce((sum, item) => sum + item.price * item.quantity, 0)
//     .toFixed(2);

//   return (
//     <div>
//       <h2 className="flex justify-center items-center text-xl font-semibold mb-2">
//         Purchase List
//       </h2>
//       <ul className="space-y-2">
//         {purchaseList.map((item) => (
//           <li
//             key={item.id}
//             className="flex justify-between items-center border-b border-gray-300 py-2"
//           >
//             <div className="flex flex-grow space-x-4 items-center">
//               <span>{item.name}</span>
//               <span>${item.price.toFixed(2)}</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <select
//                 value={item.quantity}
//                 onChange={(e) => handleQuantityChange(e, item.id)}
//                 className="border p-1 rounded w-10 text-center"
//               >
//                 {[1, 2, 3, 4, 5].map((quantity) => (
//                   <option key={quantity} value={quantity}>
//                     {quantity}
//                   </option>
//                 ))}
//               </select>
//               <span>${(item.price * item.quantity).toFixed(2)}</span>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <div className="flex justify-between mt-4 font-semibold">
//         <span>Total Price:</span>
//         <span>${total}</span>
//       </div>
//     </div>
//   );
// };

// export default Purchase;
