import React, { useReducer } from "react";
import StoryStyles from "./Story.module.css";
import StoryCard from "../StoryCard/StoryCard";

const StoriesSection = ({ name, Heading, stories, setShowRegisterModal }) => {
  const [isExpanded, toggleSeeMore] = useReducer((state) => !state, false);
  const categoryStories = stories.filter((story) => story.category === name);

  return (
    <>
      <div
        style={{ display: categoryStories.length > 0 ? "flex" : "none" }}
        className={StoryStyles.container}
      >
        <h2 className={StoryStyles.heading}>
          {Heading} {name}
        </h2>
        <div className={StoryStyles.story_cards}>
          {categoryStories.map((story, i) => (
            <StoryCard
              setShowRegisterModal={setShowRegisterModal}
              stories={stories}
              key={i}
              story={story}
            />
          ))}
        </div>
        <button onClick={toggleSeeMore} className={StoryStyles.see_more_btn}>
          {isExpanded ? "See Less" : "See More"}
        </button>
      </div>
    </>
  );
};

export default StoriesSection;
