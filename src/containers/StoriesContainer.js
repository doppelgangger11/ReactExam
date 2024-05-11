import React, { useEffect, useState } from "react";
import { getStoryIds } from "../services/hnApi";
import { Story } from "../components/Story";
import {
  GlobalStyle,
  StoriesContainerWrapper,
} from "../styles/StoriesContainerStyles";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export const StoriesContainer = () => {
  const { count } = useInfiniteScroll();
  const [storyIds, setStoryIds] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");

  useEffect(() => {
    getStoryIds().then((data) => setStoryIds(data));
  }, []);

  const handleTitleFilter = (event) => {
    setTitleFilter(event.target.value);
  };

  return (
    <>
      <GlobalStyle />
      <StoriesContainerWrapper
        data-test-id="stories-container"
        className="container mt-4"
      >
        <h1 className="mb-4">Hacker News Stories</h1>
        <input
          type="text"
          value={titleFilter}
          onChange={handleTitleFilter}
          className="form-control mb-4"
          placeholder="Filter by title..."
        />
        {storyIds.slice(0, count).map((storyId) => (
          <Story key={storyId} storyId={storyId} titleFilter={titleFilter} />
        ))}
      </StoriesContainerWrapper>
    </>
  );
};
