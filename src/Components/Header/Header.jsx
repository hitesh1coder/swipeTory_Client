import HeaderStyles from "./Header.module.css";
import React, { useState } from "react";
import userAvatar from "../../images/userIcon.png";
import bookMarkIcon from "../../images/icons8-bookmark-50.png";

const Header = ({
  setLoginModal,
  setRegisterModal,
  setAddStoryModal,
  isMobile,
  setIsMobile,
}) => {
  const getUser = JSON.parse(localStorage.getItem("swipetory_user"));
  const user = getUser;
  const [openMenu, setOpenMenu] = useState(false);
  const renderLoggedInButtons = () => (
    <>
      <button onClick={() => {}} className={HeaderStyles.register_btn}>
        <span>
          <img src={bookMarkIcon} alt="bookmark" />
        </span>
        Bookmarks
      </button>
      <button
        onClick={() => setAddStoryModal(true)}
        className={HeaderStyles.register_btn}
      >
        Add story
      </button>
      <span>{user.username}</span>
      <img className={HeaderStyles.useravatar} src={userAvatar} alt="" />
    </>
  );

  const renderLoggedOutButtons = () => {
    return (
      <>
        <button
          onClick={() => setRegisterModal(true)}
          className={HeaderStyles.register_btn}
        >
          Register Now
        </button>
        <button
          onClick={() => setLoginModal(true)}
          className={HeaderStyles.login_btn}
        >
          Sign In
        </button>
      </>
    );
  };

  const renderMenuButtons = () => (
    <>
      <img
        className={HeaderStyles.useravatar}
        src={userAvatar}
        alt="userAvatar"
      />
      <button onClick={() => {}} className={HeaderStyles.register_btn}>
        <span>
          <img src={bookMarkIcon} alt="bookmark" />
        </span>
        Bookmarks
      </button>
      <button
        onClick={() => {
          setAddStoryModal(true);
        }}
        className={HeaderStyles.register_btn}
      >
        Add story
      </button>
    </>
  );

  return (
    <>
      <div className={HeaderStyles.container}>
        <div className={HeaderStyles.logo}>Swip Tory</div>
        <div
          // style={{ display: isMobile ? "none" : "block" }}
          className={
            isMobile
              ? `${HeaderStyles.nav_right}`
              : `${HeaderStyles.mobile_nav}`
          }
        >
          <div className={HeaderStyles.nav_btns}>
            {user ? renderLoggedInButtons() : renderLoggedOutButtons()}
          </div>
        </div>
        <span
          onClick={() => {
            setIsMobile(!isMobile);
            setOpenMenu(!openMenu);
          }}
          style={{ pointerEvents: user ? "auto" : "none" }}
          className={HeaderStyles.menu}
        >
          =
        </span>
      </div>
      <div
        style={{ display: openMenu ? "block" : "none" }}
        className={HeaderStyles.drop_down}
      >
        <div
          className={
            isMobile
              ? `${HeaderStyles.nav_btns_mobile}`
              : `${HeaderStyles.nav_btns}`
          }
        >
          {user ? renderMenuButtons() : renderLoggedOutButtons()}
        </div>
      </div>
    </>
  );
};
export default Header;
