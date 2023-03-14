function EditProfileForm() {
  return (
    <div>
      <form>
        <label>Email: </label>
        <input type="email" name="email" />
        <br />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" />
        <br />
        <label htmlFor="image">Profile picture</label>
        <br />
        <button>Update</button>
      </form>
    </div>
  );
}

export default EditProfileForm;
