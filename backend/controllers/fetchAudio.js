const asyncHandler = require('express-async-handler');
const ytdl = require('ytdl-core');

const fetchAudioResult = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const videoUrl = 'https://www.youtube.com/watch?v='+id;

    const options = {
        // Filter for the audio format
        filter: format => format.audioBitrate,
        // Only get the info, don't download the video
        dlChunkSize: 0,
      };
      
      ytdl.getInfo(videoUrl, options).then(info => {
        // Get the audio stream URL
        const audioUrl = info.formats.find(f => f.hasAudio && !f.hasVideo).url;
        res.status(200).json({status:"success",audioURL:audioUrl});
      }).catch(err => {
        res.status(404).json({status:"failed",reason:"error fetching audio!!"});
      });
      
});

module.exports = {
    fetchAudioResult,
}