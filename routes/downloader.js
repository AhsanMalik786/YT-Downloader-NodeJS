const express = require("express");
const router = express.Router();
const ytdl = require("ytdl-core");

router.get("/down",async (req,res)=>{
  var url = req.query.url;
  try {
    var info = await ytdl.getInfo(url);
//    console.log(info.formats);
    res.json(
      {
        ok : true,
        thumb : info.videoDetails.thumbnails,
        formats : info.formats,
        title : info.player_response.videoDetails.title
      }
    );
  } catch (e) {
      res.json(
      {
        ok : false,
        message : e.message
      }
      )
  }
});
module.exports = router;
