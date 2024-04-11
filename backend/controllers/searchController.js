const asyncHandler = require('express-async-handler');
const { google } = require('googleapis');
const dotenv = require('dotenv').config()

const getSearchResults = asyncHandler(async(req,res)=>{
    const {name,maxresult} = req.query;

    if(!maxresult){
      maxValue=20
    }else if(Number(maxresult)>20){
      maxValue=20
    }else{
      maxValue=maxresult
    }

    if(!name){
      res.status(404).json({status:"failed",reason:"did not specify name query"})
    }

    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY,
    });
    
    youtube.search.list({
        part: 'id,snippet',
        q: name,
        maxResults:maxValue,
        type: 'video',
      }, (err, res1) => {
        if (err) {
          // console.error('Error searching for videos:', err);
          // return;
          res.status(404).json({status:"failed",reason:"maximum daily limit reached please comeback tomorrow!!"})
        }
        // Handle the search results
        const originalArray = res1.data.items;
        const newArray = originalArray.map((item) => {
          const {id} = item;
          const { title, channelTitle, thumbnails } = item.snippet;
          // const thumbnailUrl = (thumbnails.high ? thumbnails.high.url : thumbnails.default.url);
          const thumbnailUrl = thumbnails.maxres?.url || thumbnails.high?.url || thumbnails.default?.url;
          return {
            videoId: id.videoId,
            title,
            channelTitle,
            thumbnail: thumbnailUrl,
          };
        });
        res.status(200).json({status:"success",data:newArray})
      });
});

const trendingSearch = asyncHandler(async(req,res)=>{
  async function getTrendingMusicVideos() {
    // Set up the YouTube Data API client
    const youtube = google.youtube('v3');
    // Specify your API key
    const apiKey = process.env.YOUTUBE_API_KEY;
  
    try {
      const response = await youtube.videos.list({
        key: apiKey,
        part: 'snippet',
        chart: 'mostPopular',
        videoCategoryId: '10', // Music category
        maxResults: 10, 
      });
  
      
      const videos = response.data.items.map((item) => {
        const { videoId } = item.id;
        const { title, channelTitle, thumbnails } = item.snippet;
        const thumbnailUrl = thumbnails.default.url;
        return { videoId, title, channelTitle, thumbnailUrl };
      });
  
      return videos;
    } catch (error) {
      // console.error('Error retrieving :', error.message);
      // return [];
    }
  }
  
  // Call the function
  getTrendingMusicVideos()
    .then((videos) => {
      // console.log(videos);
      res.status(200).json({status:"success",data:videos})
    })
    .catch((error) => {
      // console.error('Error:', error);
      res.status(404).json({status:"failed",reason:"maximum limit reached"})
    });
});

module.exports = {
    getSearchResults,
    trendingSearch,
}
