import React, { useState } from "react";
import CardStyles from "./StoryCard.module.css";
import ViewStoryModal from "../../ModalForms/ViewStoryModal/ViewStoryModal";

const StoryCard = ({ story, stories }) => {
  const [viewStoryModal, setViewStoryModal] = useState(false);
  const [storyId, setStoryId] = useState();

  const closeViewStoryModal = () => setViewStoryModal(false);

  const renderStoryBars = () => {
    const renderStories = stories.slice(1, 5);
    return renderStories?.map((data, i) => {
      return (
        <div
          key={i}
          style={{ width: "100%" }}
          className={CardStyles.storybar}
        ></div>
      );
    });
  };

  const handleClick = () => {
    setViewStoryModal(true);
    setStoryId(story._id);
  };

  return (
    <>
      <div onClick={handleClick} className={CardStyles.card_container}>
        <img src={story.imageurl} alt="story" />
        <div className={CardStyles.storycount}>{renderStoryBars()}</div>
        <div className={CardStyles.card_details}>
          <h2 className={CardStyles.heading}>{story.heading}</h2>
          <p className={CardStyles.desc}>{story.description}</p>
        </div>
      </div>
      {viewStoryModal && (
        <ViewStoryModal
          storyId={storyId}
          stories={stories}
          closeViewStoryModal={closeViewStoryModal}
        />
      )}
    </>
  );
};

export default StoryCard;
