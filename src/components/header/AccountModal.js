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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import anime from "animejs/lib/anime.es.js";

export default function AccountModal() {
  const DEFAULT_AVATAR = "https://img.icons8.com/fluency/96/null/doge.png";
  const [showAccountMenu, setShowAccountMenu] = React.useState(false);

  const [file, setFile] = React.useState(null);
  const [avatarURL, setAvatarURL] = React.useState(
    localStorage.getItem("avatarURL") || DEFAULT_AVATAR,
  );

  const [previewURL, setPreviewURL] = React.useState(null);

  const [country, setCountry] = React.useState("");
  const [region, setRegion] = React.useState("");

  const currentUser = auth.currentUser;

  const modalRef = React.useRef(null);

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

  const handleClick = () => {
    if (showAccountMenu) {
      anime({
        targets: modalRef.current,
        translateY: [-15, -100],
        translateX: [5, 100],
        scale: [1, 0.1],
        opacity: [1, 0],
        duration: 300,
        easing: "easeInExpo",
        complete: () => setShowAccountMenu(false),
      });
    } else {
      anime({
        targets: modalRef.current,
        translateY: [-100, -15],
        translateX: [100, 5],
        scale: [0.1, 1],
        opacity: [0, 1],
        duration: 800,
        easing: "easeOutElastic(1, .5)",
        begin: () => setShowAccountMenu(true),
      });
    }
  };

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
                country: auth.currentUser.country || "Ukraine", // Set a default value if country is undefined
                region: auth.currentUser.region || "Lviv",
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
          ref={modalRef}
          className={`${styles.account_smallMenu} ${
            showAccountMenu ? `${styles.show}` : ""
          }`}
        >
          <div className={styles.block}>
            <p className={styles.block_textItem}>Account settings</p>
          </div>
          {auth.currentUser && (
            <div className={styles.block}>
              <p className={styles.block_textItem}>
                Hello {auth.currentUser.displayName} !
              </p>
            </div>
          )}
          <div className={styles.addUserPhotoBlock}>
            <div>
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
            </div>
          </div>
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              id="name"
              type="text"
              required
              autoComplete="off"
            />
            <label className={styles.label_input} htmlFor="name">
              Change Name
            </label>
          </div>
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              id="password"
              type="password"
              required
              autoComplete="off"
            />
            <label className={styles.label_input} htmlFor="password">
              Change Password
            </label>
            <input className={styles.togglePassword} type="checkbox" />
          </div>

          <div className={styles.countryBlock}>
            <CountryDropdown
              className={styles.dropDownPlace}
              value={country}
              onChange={(val) => setCountry(val)}
            />
            <RegionDropdown
              className={styles.dropDownPlace}
              country={country}
              value={region}
              onChange={(val) => setRegion(val)}
            />
          </div>
          <div className={styles.block_switcher_pricing}>
            <div className={styles.block_switcher}>
              <label className={styles.block_swtcher_switch}>
                <span className={styles.block_swtcher_switch_sun}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="#ffd43b">
                      <circle r="5" cy="12" cx="12"></circle>
                      <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path>
                    </g>
                  </svg>
                </span>
                <span className={styles.block_swtcher_switch_moon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
                  </svg>
                </span>
                <input
                  type="checkbox"
                  className={styles.block_swtcher_switch_input}
                />
                <span className={styles.block_swtcher_switch_slider}></span>
              </label>
            </div>
            <div className={styles.block_pricing}>
              <button className={styles.pricing_btn}> Change tariff</button>
            </div>
          </div>
          <div className={styles.block_buttomItem}>
            <button
              onClick={uploadAvatar}
              className={styles.btn_save}
              disabled={!file}
            >
              <div className={styles.sign}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5c3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-13c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78zm0-2c-4.006 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408-.212-3.951-3.473-7.092-7.479-7.092zm-4 10h3v-4h2v4h3l-4 4-4-4z" />
                </svg>
              </div>
              <div className={styles.btn_text}>Save</div>
            </button>
            <button onClick={handleSignOut} className={styles.btn_signOut}>
              <div className={styles.sign}>
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div className={styles.btn_text}>Logout</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
