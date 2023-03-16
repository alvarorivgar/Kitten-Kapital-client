import { useState } from "react";

function SearchUserForm(props) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    props.filterUsers(e.target.value);
  };

  return (
    <div className="form-group mx-sm-4 pt-3">
      <input
        className="form-control"
        type="text"
        name="search"
        value={searchInput}
        placeholder="Introduce Id, first name or last name to search"
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchUserForm;
