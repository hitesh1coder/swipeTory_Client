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

const Home = () => {
  const getUser = JSON.parse(localStorage.getItem("swipetory_user"));
  const user = getUser;
  // State variables
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [stories, setStories] = useState([]);

  // Close modal functions
  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleCloseAddStoryModal = () => setShowAddStoryModal(false);

  const storyCategory = categories.slice(1, 6);

  const handleChildData = (data) => {
    setSelectedFilter(data);
  };
  const fetchAllStories = async () => {
    try {
      const allStories = await axios.get(
        `http://localhost:5000/story/category`,
        {
          params: {
            category: selectedFilter,
          },
        }
      );
      const { data } = allStories;
      console.log(data);
      setStories(data);
      // data.map((stories) => {
      //   console.log(stories.story);
      // });

      // setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchAllStories();
  }, [selectedFilter]);

  return (
    <div className={HomeStyles.container}>
      <Header
        setRegisterModal={setShowRegisterModal}
        setLoginModal={setShowLoginModal}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        setAddStoryModal={setShowAddStoryModal}
      />
      {/* Render the register modal if showRegisterModal is true */}
      {showRegisterModal && (
        <RegisterModal handleCloseRegisterModal={handleCloseRegisterModal} />
      )}
      {/* Render the login modal if showLoginModal is true */}
      {showLoginModal && (
        <LoginModal handleCloseLoginModal={handleCloseLoginModal} />
      )}
      {/* Render the add story modal if showAddStoryModal is true */}
      {showAddStoryModal && (
        <AddStoryModal handleCloseAddStoryModal={handleCloseAddStoryModal} />
      )}
      <Categories onSelectedValue={handleChildData} />
      {/* {user ? <StoriesSection Heading={"Your Stories"} /> : ""}; */}
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
  );
};

export default Home;
