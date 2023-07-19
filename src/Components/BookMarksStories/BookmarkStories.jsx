import React from "react";
import styles from "./style.module.css";
import StoryCard from "../StoryCard/StoryCard";
import Header from "../Header/Header";

const BookmarkStories = ({ stories }) => {
  // Get user bookmarks from local storage
  const { bookmarks } = JSON.parse(localStorage.getItem("swipetory_user"));

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h2>Your Bookmarks</h2>
        {bookmarks.length <= 0 ? (
          <h4>No Bookmarks Yet</h4>
        ) : (
          <div className={styles.story_cards}>
            {bookmarks.map((story, i) => (
              <StoryCard stories={stories} key={i} story={story} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BookmarkStories;
