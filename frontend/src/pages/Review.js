// import React from 'react';
// import { FaStar } from 'react-icons/fa';

// const Review = ({ rating, comment }) => {
//   const stars = Array(5).fill(0).map((_, index) => (
//     <FaStar
//       key={index}
//       color={index < rating ? '#ffc107' : '#e4e5e9'}
//     />
//   ));

//   return (
//     <div className="border p-4 rounded-lg shadow-md mb-4">
//       <div className="flex items-center mb-2">
//         {stars}
//       </div>
//       <p>{comment}</p>
//     </div>
//   );
// };

// export default Review;
import React from 'react';
import { FaStar } from 'react-icons/fa';

const Review = ({ rating, comment }) => {
  const stars = Array(5).fill(0).map((_, index) => (
    <FaStar
      key={index}
      color={index < rating ? '#ffc107' : '#e4e5e9'}
    />
  ));

  return (
    <div className="max-w-md mx-auto bg-white border p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center mb-3">
        {stars}
      </div>
      <p className="text-gray-700">{comment}</p>
    </div>
  );
};

export default Review;
