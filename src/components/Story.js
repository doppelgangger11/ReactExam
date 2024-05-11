import React, { useState, useEffect, memo } from "react";
import { getStory } from "../services/hnApi";
import {
  StoryWrapper,
  StoryTitle,
  StoryMeta,
  StoryMetaElement,
} from "../styles/StoryStyles";
import { mapTime } from "../mappers/mapTime";

export const Story = memo(function Story({ storyId, titleFilter }) {
  const [story, setStory] = useState({});

  useEffect(() => {
    getStory(storyId).then((data) => data && data.url && setStory(data));
  }, []);

  return (
    <>
      {story &&
        story.url &&
        (!titleFilter ||
          story.title.toLowerCase().includes(titleFilter.toLowerCase())) && (
          <StoryWrapper data-testid="story" className="mb-4">
            <StoryTitle className="h5">
              <a href={story.url} className="text-decoration-none">
                {story.title}
              </a>
            </StoryTitle>
            <StoryMeta className="text-muted">
              <span data-testid="story-by" className="me-2">
                <StoryMetaElement color="#000">By:</StoryMetaElement> {story.by}
              </span>
              <span data-testid="story-time">
                <StoryMetaElement color="#000">Posted:</StoryMetaElement> {` `}
                {mapTime(story.time)}
              </span>
            </StoryMeta>
          </StoryWrapper>
        )}
    </>
  );
});
