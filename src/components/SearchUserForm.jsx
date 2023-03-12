import { useState } from "react";

function SearchUserForm(props) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    props.filterUsers(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        name="search"
        value={searchInput}
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchUserForm;
