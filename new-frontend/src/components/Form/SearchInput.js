import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div>
      <form
        className="flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-input mr-2 px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-600 rounded"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success px-4 py-2 border border-gray-300 rounded hover:bg-gray-500 hover:text-black transition duration-300" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
