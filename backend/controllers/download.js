const asyncHandler = require('express-async-handler');
const ytdl = require('ytdl-core');
const fs = require('fs');
const { WritableStreamBuffer } = require('stream-buffers');


const download = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const videoUrl = 'https://www.youtube.com/watch?v='+id;

    //using download in server directory and then uploading it to client then later deleting it works only for localhost not on deployed web

    // const downloadAudio = async (videoUrl) => {
    //     const videoInfo = await ytdl.getInfo(videoUrl);
    //     const audioFormat = ytdl.chooseFormat(videoInfo.formats, { filter: 'audioonly' });
      
    //     const audioStream = ytdl(videoUrl, { format: audioFormat });
    //     const filename = `${videoInfo.videoDetails.title}.mp3`;
      
    //     audioStream.pipe(fs.createWriteStream(filename));
      
    //     audioStream.on('end', () => {
    //       res.download(filename, filename, function (err) {
    //         if (err) {
    //             res.status(404)
    //             res.end();
    //             console.error(err);
    //         } else {
    //             fs.unlink(filename, (err) => {
    //                 if (err) {
    //                   console.error(err);
    //                 } else {
    //                 }
    //               });
    //               //dont include res.end if deleting the file if deleting then include
    //             // res.end();
    //         }
    //         });
    //     });
    //     audioStream.on('error', (err) => {
    //       console.error(err);
    //     });
    //   };
    // downloadAudio(videoUrl);

    //creating a temporary buffer to download and  then transmit the downloaded song worksfor deployed as well as local host

    // const downloadAudio = async (videoUrl) => {
    //   const videoInfo = await ytdl.getInfo(videoUrl);
    //   const audioFormat = ytdl.chooseFormat(videoInfo.formats, { filter: 'audioonly' });
    
    //   const audioStream = ytdl(videoUrl, { format: audioFormat });
    //   const filename = "output.mp3";
    
    //   const writableStreamBuffer = new WritableStreamBuffer();
    //   audioStream.pipe(writableStreamBuffer);
      
    
    //   audioStream.on('end', () => {
    //     const buffer = writableStreamBuffer.getContents();
    
    //     res.set('Content-Type', 'audio/mpeg');
    //     res.set('Content-Disposition', `attachment; filename="${filename}"`);
    //     res.send(buffer);
    
    //     writableStreamBuffer.destroy();
    //   });
    
    //   audioStream.on('error', (err) => {
    //     console.error(err);
        
    //   });
    // };

    const downloadAudio = async(videoUrl, res) => {
      const videoInfo = await ytdl.getInfo(videoUrl);
      const audioFormat = ytdl.chooseFormat(videoInfo.formats, { filter: 'audioonly' });
      
      const audioStream = ytdl(videoUrl, { format: audioFormat });
      const filename = "output.mp3";
    
      res.set('Content-Type', 'audio/mpeg');
      res.set('Content-Disposition', `attachment; filename="${filename}"`);
    
      audioStream.on('data', (chunk) => {
        res.write(chunk);
      });
    
      audioStream.on('end', () => {
        res.end();
      });
    
      audioStream.on('error', (err) => {
        console.error(err);
        res.status(500).send('An error occurred while streaming audio.');
      });
    };
    
    downloadAudio(videoUrl,res);
    // downloadAudio(videoUrl);
});

module.exports = {
    download,
}