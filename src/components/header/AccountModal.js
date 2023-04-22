import React from "react";
import {
  getDoc,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, signOut, storage, db } from "../firebase.js";
import styles from "./AccountModal.module.scss";
import button from "./NavBarMenu.module.scss";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // import storage from your firebase.js file

export default function AccountModal() {
  const [click, setClick] = React.useState(false);
  const [showAccountMenu, setShowAccountMenu] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [percent, setPercent] = React.useState(0);
  const [avatarURL, setAvatarURL] = React.useState(
    localStorage.getItem("avatarURL") ||
      "https://img.icons8.com/fluency/96/null/doge.png",
  );
  const [previewURL, setPreviewURL] = React.useState(null);

  const currentUser = auth.currentUser;

  React.useEffect(() => {
    if (currentUser && currentUser.photoURL) {
      setAvatarURL(currentUser.photoURL);
    }
  }, [currentUser]);

  React.useEffect(() => {
    if (avatarURL) {
      localStorage.setItem("avatarURL", avatarURL);
    }
  }, [avatarURL]);
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
      localStorage.clear("avatarURL", avatarURL);
      alert("Signed out successfully.");
    } catch (error) {
      alert(`Error signing out: ${error.message}`);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewURL(URL.createObjectURL(selectedFile));
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
        // Add null check here
        if (auth.currentUser.updateProfile) {
          await auth.currentUser.updateProfile({ photoURL: url });
        }

        // Update user's data in Firestore
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          // Update the existing document
          await updateDoc(userDocRef, { photoURL: url });
        } else {
          // Create a new document with the required fields
          await setDoc(userDocRef, {
            uid: auth.currentUser.uid,
            email: auth.currentUser.email,
            name: auth.currentUser.displayName,
            photoURL: url,
            createdAt: serverTimestamp(),
          });
        }
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
          {previewURL ? (
            <img
              src={previewURL}
              alt="Avatar preview"
              className={styles.avatarPreview}
            />
          ) : (
            <img
              src="https://img.icons8.com/dotty/80/null/edit-user-female.png"
              alt=""
              className={styles.fileInputIcon}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.fileInput}
          />
        </div>
        <button onClick={uploadAvatar} className={styles.uploadButton}>
          Upload avatar
        </button>
        <p className={styles.percentUpload}>{percent} "% done"</p>

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
