// import React from "react";
// import { useSearch } from "../../context/search";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";
// const SearchInput = () => {
//   const [values, setValues] = useSearch();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.get(
//         `${process.env.REACT_APP_API}/api/product/search/${values.keyword}`
//       );
//       setValues({ ...values, results: data });
//       navigate("/search");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <form
//         className="flex search-form"
//         role="search"
//         onSubmit={handleSubmit}
//       >
//         <input
//           className="form-input mr-2 px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-600 rounded"
//           type="search"
//           placeholder="Search for Products, Brands and More"
//           aria-label="Search"
//           value={values.keyword}
//           onChange={(e) => setValues({ ...values, keyword: e.target.value })}
//         />
//         <button className="btn btn-outline-success px-4 py-2 border border-gray-300 rounded hover:bg-gray-500 hover:text-white transition duration-300 font-semibold" type="submit">
//           Search
//           <FaSearch />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SearchInput;
import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <form
        className="flex w-full"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="flex-grow form-input px-6 py-2 border border-gray-300 focus:outline-none focus:border-gray-600 rounded-l"
          type="search"
          placeholder="Search for Products.."
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="flex items-center px-4 py-2 border border-gray-300 rounded-r bg-gray-100 hover:bg-gray-500 hover:text-white transition duration-300 font-semibold" type="submit">
          <FaSearch className="mr-2" />
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
