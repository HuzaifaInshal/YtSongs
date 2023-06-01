const asyncHandler = require('express-async-handler');
const { google } = require('googleapis');
const dotenv = require('dotenv').config()

const getSearchResults = asyncHandler(async(req,res)=>{
    const {name,maxresult} = req.query;

    if(!maxresult){
      maxValue=10
    }else if(Number(maxresult)>10){
      maxValue=10
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
        // console.log('Search results:', res1.data.items);
        res.status(200).send(res1.data.items)
      });

    // res.status(200).send(q)
})



module.exports = {
    getSearchResults,
}