const asyncHandler = require('express-async-handler');
const ytdl = require('ytdl-core');
const axios = require('axios');
const dotenv = require('dotenv').config()

const fetchAudioResult = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const {similiar} = req.query;
    const videoUrl = 'https://www.youtube.com/watch?v='+id;

    async function getSimilarVideos(videoId,audioUrl) {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            relatedToVideoId: videoId,
            type: 'video',
            maxResults: 6, 
            key: process.env.YOUTUBE_API_KEY,
          },
        });
    
        const videos = response.data.items;
        const newArray = videos.map((item) => {
          const {id} = item;
          const { title, channelTitle, thumbnails } = item.snippet;
          return {
            videoId: id.videoId,
            title,
            channelTitle,
            thumbnail: (thumbnails.maxres?.url || thumbnails.high?.url || thumbnails.default?.url),
          };
        });
        res.status(200).json({status:"success",audioURL:audioUrl,similiar:newArray})
      } catch (error) {
        res.status(404).json({status:"failed",reason:error})
      }
    }
    
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