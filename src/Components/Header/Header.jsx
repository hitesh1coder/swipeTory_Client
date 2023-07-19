import HeaderStyles from "./Header.module.css";
import React, { useRef, useState } from "react";
import userAvatar from "../../images/userIcon.png";
import bookMarkIcon from "../../images/icons8-bookmark-50.png";
import closeIcon from "../../images/icons8-close-50 (1).png";
import menuIcon from "../../images/icons8-menu-24.png";

const Header = ({
  setLoginModal,
  setRegisterModal,
  setAddStoryModal,
  handleShowBookmark,
  setShowBookmarks,
}) => {
  const getUser = JSON.parse(localStorage.getItem("swipetory_user"));
  const user = getUser;
  const username = user?.username;
  const navRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const showNavbar = () => {
    navRef.current.classList.toggle(`${HeaderStyles.responsive_nav}`);
  };

  const handleLogOut = () => {
    localStorage.removeItem("swipetory_user");
    setOpenMenu(false);
  };
  const renderLoggedInButtons = () => (
    <>
      <button
        onClick={handleShowBookmark}
        className={HeaderStyles.register_btn}
      >
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

      <button onClick={handleLogOut} className={HeaderStyles.logout_mobile_btn}>
        {" "}
        logout
      </button>
      <div>
        <img
          onClick={() => setOpenMenu(!openMenu)}
          className={HeaderStyles.useravatar}
          src={userAvatar}
          alt="user"
        />
        <div
          style={{ display: openMenu ? `block` : `none` }}
          className={HeaderStyles.menu}
        >
          <ul>
            <h2>{username}</h2>
            <button onClick={handleLogOut} className={HeaderStyles.logout_btn}>
              {" "}
              logout
            </button>
          </ul>
        </div>
      </div>
      <button
        onClick={showNavbar}
        className={`${HeaderStyles.nav_btn} ${HeaderStyles.nav_close_btn}`}
      >
        <img src={closeIcon} alt="closeIcon" />
      </button>
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
        <button
          onClick={showNavbar}
          className={`${HeaderStyles.nav_btn} ${HeaderStyles.nav_close_btn}`}
        >
          <img src={closeIcon} alt="closeIcon" />
        </button>
      </>
    );
  };

  return (
    <>
      <div className={HeaderStyles.container}>
        <div
          onClick={() => setShowBookmarks(false)}
          className={HeaderStyles.logo}
        >
          Swip Tory
        </div>

        <div ref={navRef} className={HeaderStyles.nav_btns}>
          {user ? renderLoggedInButtons() : renderLoggedOutButtons()}
        </div>
        <span onClick={showNavbar} className={HeaderStyles.nav_btn}>
          <img src={menuIcon} alt="menu" />
        </span>
      </div>
    </>
  );
};
export default Header;
