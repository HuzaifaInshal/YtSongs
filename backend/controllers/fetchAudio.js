const asyncHandler = require('express-async-handler');
const ytdl = require('ytdl-core');
const axios = require('axios');
const dotenv = require('dotenv').config();
const { google } = require('googleapis');

const fetchAudioResult = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const {similiar} = req.query;
    const videoUrl = 'https://www.youtube.com/watch?v='+id;

    // async function getSimilarVideos(videoId,audioUrl) {
    //   try {
    //     const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    //       params: {
    //         part: 'snippet',
    //         relatedToVideoId: videoId,
    //         type: 'video',
    //         maxResults: 6, 
    //         key: process.env.YOUTUBE_API_KEY,
    //       },
    //     });
    
    //     const videos = response.data.items;
    //     const newArray = videos.map((item) => {
    //       const {id} = item;
    //       const { title, channelTitle, thumbnails } = item.snippet;
    //       return {
    //         videoId: id.videoId,
    //         title,
    //         channelTitle,
    //         thumbnail: (thumbnails.maxres?.url || thumbnails.high?.url || thumbnails.default?.url),
    //       };
    //     });
    //     res.status(200).json({status:"success",audioURL:audioUrl,similiar:newArray})
    //   } catch (error) {
    //     res.status(404).json({status:"failed",reason:error})
    //   }
    // }



    ///////////

    // async function getSimilarVideos(videoId,audioURL){
    //   const youtube = google.youtube({
    //     version: 'v3',
    //     auth: process.env.YOUTUBE_API_KEY,
    //   });
      
    //   youtube.search.list({
    //       part: 'id,snippet',
    //       q:'cat videos',
    //       maxResults:6,
    //       type: 'video',
    //     }, (err, res1) => {
    //       if (err) {
    //         res.status(404).json({status:"failed",reason:err})
    //       }

    //       const originalArray = res1.data.items;
    //       const newArray = originalArray.map((item) => {
    //         const {id} = item;
    //         const { title, channelTitle, thumbnails } = item.snippet;
    //         const thumbnailUrl = thumbnails.maxres?.url || thumbnails.high?.url || thumbnails.default?.url;
    //         return {
    //           videoId: id.videoId,
    //           title,
    //           channelTitle,
    //           thumbnail: thumbnailUrl,
    //         };
    //       });
    //       res.status(200).json({status:"success",data:newArray})
    //     });
    // }












///////////////
  async function getSimilarVideos(videoId,audioURL){
    // Replace with your API key
const API_KEY = process.env.YOUTUBE_API_KEY;

// Create a YouTube Data API client
const youtube = google.youtube({
  version: "v3",
  auth: API_KEY,
});

// Predefined video ID to exclude from search results
const excludedVideoId = videoId;

// Video ID for the video you want to retrieve the title for
// const videoId = videoId;

// Function to search for videos with a given query
async function searchVideos(query) {
  try {
    const response = await youtube.search.list({
      part: "id,snippet",
      q: query,
      maxResults:13
    });

    // Filter out the excluded video
    const filteredResults = response.data.items.filter(
      (item) => item.id.videoId && item.id.videoId !== excludedVideoId
    );
    

    return filteredResults;
  } catch (error) {
    console.error("Error searching for videos:", error);
    return [];
  }
}

// Function to get the title of a video using its ID
async function getVideoTitle(videoId) {
  try {
    const response = await youtube.videos.list({
      part: "snippet",
      id: videoId,
    });

    if (response.data.items.length === 0) {
      console.log("Video not found.");
      return null;
    }

    // return response.data.items[0].snippet.title;
    return response.data.items[0].snippet.channelTitle;
  } catch (error) {
    console.error("Error getting video title:", error);
    return null;
  }
}

(async () => {
  // Get the title of the specified video
  const videoTitle = await getVideoTitle(videoId);
  if (!videoTitle) {
    console.log("Unable to retrieve video title.");
    return;
  }

  // Search for videos with the same title
  const searchResults = await searchVideos(videoTitle);
  if (searchResults.length === 0) {
    console.log("No search results found.");
    return;
  }
  const resultArray = [];
  searchResults.forEach((result) => {
    const videoId = result.id.videoId;
    const title = result.snippet.title;
    const channelTitle = result.snippet.channelTitle;
    const thumbnails = result.snippet.thumbnails;
    const thumbnail = thumbnails.maxres?.url || thumbnails.high?.url || thumbnails.default?.url;

    resultArray.push({ videoId, title, channelTitle, thumbnail });
  });

  // console.log("Result Array:", resultArray);
  res.status(200).json({status:"success",audioURL:audioURL,similiar:resultArray})
})();
  }

    









  /////////////////////////////////////////////////////////////////////////
    const options = {
        filter: format => format.audioBitrate,
        dlChunkSize: 0,
      };
      
      ytdl.getInfo(videoUrl, options).then(info => {
        const audioUrl = info.formats.find(f => f.hasAudio && !f.hasVideo).url;
        if(!similiar){res.status(200).json({status:"success",audioURL:audioUrl});}
        else{
          const result = getSimilarVideos(id,audioUrl);
        }
      }).catch(err => {
        res.status(404).json({status:"failed",reason:"error fetching audio!!"});
      });
    
})

module.exports = {
    fetchAudioResult,
}