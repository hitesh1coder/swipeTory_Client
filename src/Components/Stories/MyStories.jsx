import React, { useState, useEffect } from "react";
import StoryStyles from "./Story.module.css";
import StoryCard from "../StoryCard/StoryCard";
import axios from "axios";
import UpdateStoryModal from "../../ModalForms/UpdateStoryModal/UpdateStoryModal";

const MyStories = () => {
  const userData = JSON.parse(localStorage.getItem("swipetory_user"));
  const id = userData.userid;
  const [myStories, setMyStories] = useState([]);
  const [showUpdateStoryModal, setShowUpdateStoryModal] = useState(false);
  const [storyToUpdate, setStoryToUpdate] = useState();
  const handleCloseUpdateStoryModal = () => setShowUpdateStoryModal(false);

  const fetchMyStories = async () => {
    try {
      const allStories = await axios.get(
        `${import.meta.env.VITE_SERVER_HOST}/story/${id}/mystory`
      );
      const { data } = allStories;
      setMyStories(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchMyStories();
  }, []);

  const handleEdit = (story) => {
    setStoryToUpdate(story);
  };

  return (
    <div className={StoryStyles.container}>
      <h2>Your Stories</h2>
      <div className={StoryStyles.story_cards}>
        {myStories?.map((story, i) => (
          <div key={i} className={StoryStyles.card_container}>
            <img src={story.imageurl} alt="story" />
            <div className={StoryStyles.card_details}>
              <h2 className={StoryStyles.heading}>{story.heading}</h2>
              <p className={StoryStyles.desc}>{story.description}</p>
            </div>
            <button
              onClick={() => {
                handleEdit(story), setShowUpdateStoryModal(true);
              }}
              className={StoryStyles.edit_btn}
            >
              edit
            </button>
          </div>
        ))}
      </div>
      {/* <button onClick={toggleSeeMore} className={StoryStyles.see_more_btn}>
        {isExpanded ? "See Less" : "See More"}
      </button> */}
      {showUpdateStoryModal && (
        <UpdateStoryModal
          storyData={storyToUpdate}
          handleCloseUpdateStoryModal={handleCloseUpdateStoryModal}
        />
      )}
    </div>
  );
};

export default MyStories;
