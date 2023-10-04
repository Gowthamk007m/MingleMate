import React, { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import styles from './Edit.module.css'

const EditProfile = ({ userId,close }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const { user, authTokens } = useContext(AuthContext);

  const handleUpdate = async () => {
    const formData = new FormData();
if (profilePicture !== null && profilePicture !== undefined) {
  formData.append("profile_picture", profilePicture);
}

if (email !== null ) {
  formData.append("email", email);
}

if (bio !== null) {
  formData.append("bio", bio);
}
    try {
      console.log("userid", user.user_id);
      const response = await fetch(`/Api/update_profile/${user.user_id}/`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: formData,
      });

      if (response.status === 200) {
        // Profile updated successfully
        // You can perform any necessary actions here
  
        console.log("work")
      } else {


               console.log("not work");

      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={styles["update-profile-form"]}>
      <h2>Update Profile</h2>
      <form>
        <div className={styles["form-group"]}>
          <label htmlFor="profile-picture">Profile Picture</label>
          <input
            id="profile-picture"
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="bio">Bio</label>
          <input
            id="bio"
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <button onClick={close} className={styles["Cancel-button"]}>
          Cancel
        </button>
        <button
          className={styles["update-button"]}
          type="submit"
          onClick={handleUpdate}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
