import React, { useEffect, useState, useRef } from "react";
import ModalStoryStyles from "./ViewStoryStyles.module.css";
import CloseIcon from "../../images/icons8-close-50 (1).png";
import shareIcon from "../../images/icons8-telegram-50.png";
import bookMarkIcon from "../../images/icons8-bookmark-50.png";
import bookMarkedIcon from "../../images/icons8-bookmark-50 (1).png";
import likedIcon from "../../images/icons8-heart-50 (1).png";
import likeIcon from "../../images/icons8-heart-50.png";
import axios from "axios";

const ViewStoryModal = ({ closeViewStoryModal, stories, storyId }) => {
  const userData = JSON.parse(localStorage.getItem("swipetory_user"));
  const userId = userData.userid;
  const [inProgress, setInProgress] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(
    stories.findIndex((story) => story._id === storyId)
  );
  const [currentStory, setCurrentStory] = useState(stories[currentStoryIndex]);
  const [liked, setLiked] = useState(currentStory?.likes.includes(userId));
  const [likes, setLikes] = useState(currentStory?.likes.length);

  const firstRender = useRef(true);

  useEffect(() => {
    setInProgress(true);
  }, []);

  const goToNextStory = () => {
    setCurrentStoryIndex((prevIndex) => {
      if (prevIndex !== stories.length - 1) {
        return prevIndex + 1;
      } else {
        closeViewStoryModal();
        return prevIndex;
      }
    });
  };

  const playStories = () => {
    setLiked((prevLiked) => !prevLiked);
    setLikes((prevLikes) => (prevLiked ? prevLikes + 1 : prevLikes - 1));
    setCurrentStoryIndex((prevIndex) => {
      const isLastIndex = prevIndex === stories.length - 1;
      if (isLastIndex) {
        closeViewStoryModal();
      }
      return isLastIndex ? prevIndex : prevIndex + 1;
    });
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setCurrentStory(stories[currentStoryIndex + 1]);
  }, [currentStoryIndex]);

  useEffect(() => {
    const interval = setInterval(playStories, 8000);
    return () => clearInterval(interval);
  }, []);

  const goToPreviousStory = () => {
    setCurrentStoryIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return prevIndex;
      }
    });
  };

  const handleLike = async () => {
    try {
      const url = `${import.meta.env.VITE_SERVER_HOST}/story/like/${storyId}`;
      const requestData = { userId };
      await axios.put(url, requestData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        onClick={closeViewStoryModal}
        className={ModalStoryStyles.wrapper}
      ></div>
      <div className={ModalStoryStyles.modal_container}>
        <div onClick={goToPreviousStory} className={ModalStoryStyles.prev_btn}>
          prev
        </div>
        <div className={ModalStoryStyles.card_container}>
          <img src={stories[currentStoryIndex].imageurl} alt="story" />
          <div className={ModalStoryStyles.btns}>
            <img
              className={ModalStoryStyles.close_btn}
              onClick={closeViewStoryModal}
              src={CloseIcon}
              alt="close"
            />
            <img
              className={ModalStoryStyles.share_btn}
              src={shareIcon}
              alt="share"
            />
          </div>
          <div className={ModalStoryStyles.storycount}>
            {stories.map((data, i) => (
              <div
                key={i}
                style={{
                  transition: `ease-in-out 15s width`,
                  width: inProgress ? "100%" : "0%",
                }}
                className={ModalStoryStyles.storybar}
              ></div>
            ))}
          </div>
          <div className={ModalStoryStyles.card_details}>
            <h2 className={ModalStoryStyles.heading}>
              {stories[currentStoryIndex].heading}
            </h2>
            <p className={ModalStoryStyles.desc}>
              {stories[currentStoryIndex].description}
            </p>
          </div>
          <div className={ModalStoryStyles.btns2}>
            <img
              className={ModalStoryStyles.bookmark_btn}
              src={bookMarkIcon}
              alt="close"
            />
            <img
              className={ModalStoryStyles.like_btn}
              onClick={handleLike}
              src={liked ? likedIcon : likeIcon}
              alt="share"
            />
            <span>{stories[currentStoryIndex]?.likes.length}</span>
          </div>
        </div>
        <div onClick={goToNextStory} className={ModalStoryStyles.next_btn}>
          next
        </div>
      </div>
    </>
  );
};

export default ViewStoryModal;
