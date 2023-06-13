const asyncHandler = require('express-async-handler');
const ytdl = require('ytdl-core');
const fs = require('fs');

const download = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const videoUrl = 'https://www.youtube.com/watch?v='+id;

    const downloadAudio = async (videoUrl) => {
        const videoInfo = await ytdl.getInfo(videoUrl);
        const audioFormat = ytdl.chooseFormat(videoInfo.formats, { filter: 'audioonly' });
      
        const audioStream = ytdl(videoUrl, { format: audioFormat });
        const filename = `${videoInfo.videoDetails.title}.mp3`;
      
        audioStream.pipe(fs.createWriteStream(filename));
      
        audioStream.on('end', () => {
          res.download(filename, filename, function (err) {
            if (err) {
                res.status(404)
                res.end();
                console.error(err);
            } else {
                fs.unlink(filename, (err) => {
                    if (err) {
                      console.error(err);
                    } else {
                    }
                  });
                  //dont include res.end if deleting the file if deleting then include
                // res.end();
            }
            });
        });
        audioStream.on('error', (err) => {
          console.error(err);
        });
      };
    downloadAudio(videoUrl);
});

module.exports = {
    download,
}