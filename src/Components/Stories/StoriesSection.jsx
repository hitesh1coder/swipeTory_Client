import React, { useReducer } from "react";
import StoryStyles from "./Story.module.css";
import StoryCard from "../StoryCard/StoryCard";

const StoriesSection = ({ name, Heading, stories }) => {
  const [isExpanded, toggleSeeMore] = useReducer((state) => !state, false);
  const categoryStories = stories.filter((story) => story.category === name);

  return (
    <div className={StoryStyles.container}>
      <h2>
        {Heading} {name}
      </h2>
      <div className={StoryStyles.story_cards}>
        {categoryStories.map((story, i) => (
          <StoryCard stories={stories} key={i} story={story} />
        ))}
      </div>
      <button onClick={toggleSeeMore} className={StoryStyles.see_more_btn}>
        {isExpanded ? "See Less" : "See More"}
      </button>
    </div>
  );
};

export default StoriesSection;
