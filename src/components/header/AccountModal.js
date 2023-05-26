import React from "react";
import {
  getDoc,
  updateDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, signOut, updateProfile, storage, db } from "../firebase.js";
import styles from "./AccountModal.module.scss";
import button from "./NavBarMenu.module.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function AccountModal() {
  const DEFAULT_AVATAR = "https://img.icons8.com/fluency/96/null/doge.png";
  const [showAccountMenu, setShowAccountMenu] = React.useState(false);

  const [file, setFile] = React.useState(null);
  const [avatarURL, setAvatarURL] = React.useState(
    localStorage.getItem("avatarURL") || DEFAULT_AVATAR,
  );

  const [previewURL, setPreviewURL] = React.useState(null);

  const currentUser = auth.currentUser;

  //console.log(currentUser.country);
  // console.log(currentUser.region);
  console.log(currentUser.displayName);
  console.log(currentUser.metadata.creationTime);
  console.log(currentUser.email);
  console.log(currentUser.uid);

  React.useEffect(() => {
    if (currentUser) {
      fetchUserData(currentUser.uid);
    }
  }, [currentUser]);

  const fetchUserData = async (uid) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setAvatarURL(userData.photoURL);
      }
    } catch (error) {
      toast.error(`Error fetching user data: ${error.message}`);
    }
  };

  const handleClick = () => setShowAccountMenu(!showAccountMenu);

  const handleSignOut = async () => {
    try {
      toast.success("Signed out successfully.");
      await signOut(auth);
      localStorage.clear("avatarURL", avatarURL);
      window.location.reload();
    } catch (error) {
      toast.error(`Error signing out: ${error.message}`);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    }
  };

  const uploadAvatar = async () => {
    if (!file) {
      toast.error("No file selected.");
      return;
    }

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast.error(`Error uploading file: ${error.message}`);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          setAvatarURL(downloadURL);

          if (auth.currentUser) {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
              // Update the user's data and add the photoURL field
              await updateDoc(userDocRef, {
                photoURL: downloadURL,
              });
            } else {
              // Create the user's data with the photoURL field
              await setDoc(userDocRef, {
                uid: auth.currentUser.uid,
                email: auth.currentUser.email,
                name: auth.currentUser.displayName,
                country: auth.currentUser.country || "", // Set a default value if country is undefined
                region: auth.currentUser.region || "",
                photoURL: downloadURL,
                createdAt: serverTimestamp(),
              });
            }

            // Update the user's profile photo
            await updateProfile(auth.currentUser, { photoURL: downloadURL });

            toast.success("Profile photo uploaded successfully.");
          }
        } catch (error) {
          console.log(error.message);
          toast.error(`Error updating profile photo: ${error.message}`);
        }
      },
    );
  };

  return (
    <>
      <ToastContainer />
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
          <div className={styles.block}>
            <p className={styles.block_textItem}>Account Menu</p>
          </div>
          {auth.currentUser && (
            <div className={styles.block}>
              <p className={styles.block_textItem}>
                Hello {auth.currentUser.displayName}!{auth.currentUser.country}
              </p>
              <p className={styles.block_textItem}></p>
            </div>
          )}
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
          <button
            onClick={uploadAvatar}
            className={styles.uploadButton}
            disabled={!file}
          >
            Upload avatar
          </button>
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
    </>
  );
}
