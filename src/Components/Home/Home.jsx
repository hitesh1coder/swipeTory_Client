import React, { useState, useEffect } from "react";
import HomeStyles from "./Home.module.css";
import Header from "../Header/Header";
import Categories from "../SelectCategories/Categories";
import StoriesSection from "../Stories/StoriesSection";
import RegisterModal from "../../ModalForms/RegisterModal/RegisterModal";
import LoginModal from "../../ModalForms/LoginModal/LoginModal";
import AddStoryModal from "../../ModalForms/AddStoryModal/AddStoryModal";
import { categories } from "../Category";
import axios from "axios";
import BookmarkStories from "../BookMarksStories/BookmarkStories";
import MyStories from "../Stories/MyStories";

const Home = () => {
  const getUser = JSON.parse(localStorage.getItem("swipetory_user"));
  const user = getUser;
  // State variables
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [stories, setStories] = useState([]);

  // Close modal functions
  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleCloseAddStoryModal = () => setShowAddStoryModal(false);

  const handleShowBookmark = () => {
    setShowBookmarks(!showBookmarks);
    console.log("clieked");
  };

  const handleChildData = (data) => {
    setSelectedFilter(data);
  };
  const storyCategory = categories.slice(1, 7);
  const fetchAllStories = async () => {
    try {
      const allStories = await axios.get(
        `${import.meta.env.VITE_SERVER_HOST}/story/category`,
        {
          params: {
            category: selectedFilter,
          },
        }
      );
      const { data } = allStories;

      setStories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllStories();
  }, [selectedFilter]);
  return (
    <>
      {showBookmarks ? (
        <BookmarkStories stories={stories} />
      ) : (
        <div className={HomeStyles.container}>
          <Header
            setRegisterModal={setShowRegisterModal}
            setLoginModal={setShowLoginModal}
            setAddStoryModal={setShowAddStoryModal}
            handleShowBookmark={handleShowBookmark}
            setShowBookmarks={setShowBookmarks}
          />
          {/* Render the register modal if showRegisterModal is true */}
          {showRegisterModal && (
            <RegisterModal
              handleCloseRegisterModal={handleCloseRegisterModal}
            />
          )}
          {/* Render the login modal if showLoginModal is true */}
          {showLoginModal && (
            <LoginModal handleCloseLoginModal={handleCloseLoginModal} />
          )}
          {/* Render the add story modal if showAddStoryModal is true */}
          {showAddStoryModal && (
            <AddStoryModal
              handleCloseAddStoryModal={handleCloseAddStoryModal}
            />
          )}
          <Categories onSelectedValue={handleChildData} />
          {user ? <MyStories /> : null}
          {storyCategory.map((category, i) => {
            return (
              <StoriesSection
                Heading={"Top Stories About"}
                name={category.name}
                key={i}
                stories={stories}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Home;
