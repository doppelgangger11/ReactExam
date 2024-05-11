import axios from 'axios';

import { selectFields } from '../selectors/selectFields';

export const baseUrl = 'https://hacker-news.firebaseio.com/v0/';
export const newStoriesUrl = `${baseUrl}newstories.json`;
export const storyUrl = `${baseUrl}item/`;
export const searchUrl = `${baseUrl}search_by_title?query=`;

export const getStory = async (storyId) => {
  try {
    const response = await axios.get(`${storyUrl + storyId}.json`);
    return selectFields(response.data);
  } catch (error) {
    console.error('Error fetching story:', error);
    return null;
  }
};

export const getStoryIds = async () => {
  try {
    const response = await axios.get(newStoriesUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching story IDs:', error);
    return [];
  }
};

export const getStoriesByTitle = async (query) => {
  try {
    const response = await axios.get(`${searchUrl}${query}`);
    return response.data.hits;
  } catch (error) {
    console.error('Error searching stories by title:', error);
    return [];
  }
};
