import React from "react";
import { auth, signOut } from "../firebase.js";
import styles from "./AccountModal.module.scss";
import button from "./NavBarMenu.module.scss";
import { storage } from "../firebase.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // import storage from your firebase.js file

export default function AccountModal() {
  const [click, setClick] = React.useState(false);
  const [showAccountMenu, setShowAccountMenu] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [percent, setPercent] = React.useState(0);
  const [avatarURL, setAvatarURL] = React.useState(
    "https://img.icons8.com/fluency/96/null/doge.png",
  );

  React.useEffect(() => {
    if (auth.currentUser && auth.currentUser.photoURL) {
      setAvatarURL(auth.currentUser.photoURL);
    }
  }, [auth.currentUser]);

  const handleClick = () => {
    if (!click) {
      setShowAccountMenu(true);
      setClick(true);
    } else {
      setShowAccountMenu(false);
      setClick(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully.");
    } catch (error) {
      alert(`Error signing out: ${error.message}`);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadAvatar = async () => {
    if (!file) {
      alert("No file selected.");
      return;
    }
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
      console.log(url);
      setAvatarURL(url);
      console.log(auth);
      if (auth.currentUser) {
        await auth.currentUser.updateProfile({ photoURL: url });
      }
    });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      },
    );
  };

  return (
    <div className={styles.block}>
      <img
        className={styles.account_icon}
        src={avatarURL}
        alt=""
        onClick={handleClick}
      />
      <div
        className={`${styles.account_smallMenu} ${
          showAccountMenu ? `${styles.show}` : ""
        }`}
      >
        <div className={styles.block_textItem}>
          <p>Account Menu</p>
        </div>
        <div className={styles.fileInputContainer}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
          <img
            src="https://img.icons8.com/dotty/80/null/edit-user-female.png"
            alt=""
            className={styles.fileInputIcon}
          />
        </div>
        <button onClick={uploadAvatar} className={styles.uploadButton}>
          Upload avatar
        </button>
        <p>{percent} "% done"</p>

        <div className={styles.block_buttomItem}>
          <button
            onClick={handleSignOut}
            className={`${button.navbarMenuLink} ${button.signOut}`}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
