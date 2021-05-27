const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Photos = require("../models/photos");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { request } = require("http");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } 
  catch(err) {
    res.send("error");
  }
});

router.get("/:id", async (req, res) => {
  User.findById(req.params.id)
  .then(respuser => {
    if(respuser.length != 0){
      Photos.find({ user_id : req.params.id })
      .then(respphoto => {
        return res.json({
          data:[respuser,respphoto],
          success: true,
          msg:"Fatching data !!"
        });
        // if(respphoto.length != 0){
        //   return res.json({
        //     data:[respuser,respphoto],
        //     success: true,
        //     msg:"Fatching data !!"
        //   });
        // }
        // else{
        //   return res.json({
        //     data:[respuser,respphoto],
        //     success: true,
        //     msg:"Fatching data !!"
        //   });
        // }
      }).catch(err => {
        return res.json({
          data:[],
          success: false,
          msg:"Something went wrong !!"
        });
      });      
    }
    else{
      return res.json({
        data:[],
        success: false,
        msg:"errored occured data !!"
      })
    }
  }).catch(errs => {
    res.json({
      data:[],
      success:false,
      msg:"Something went wrong !!"
    })
  });
});

router.post("/", async (req, res) => {
  const utemp = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_id: req.body.email_id,
    password: req.body.password,
  });
  User.find({ email_id : req.body.email_id })
  .then(resp=>{
    if(resp.length != 0){
      return res.json({
        data:[],
        success:false,
        msg:"Email id already exits !!"
      })
    }
    else{
      const u1 = utemp.save();
      res.json({
        data:u1,
        success:true,
        msg:"Registration successfully completed !!"
      })
    }
  })
  .catch(err=>{
    res.json({
      data:[],
      success:false,
      msg:"Something went wrong !!"
    })
  });
});

router.post("/auth", async (req, res) => {
  User.find({
    email_id: req.body.email_id,
    password: req.body.password
  })
  .then(response=>{
    if(response.length != 0){
      res.json({
        data:response,
        success:true,
        msg: "User logs in !!"
      });
    }
    else{
      res.json({
        data:[],
        success:false,
        msg: "Invalid id or password !!"
      });        
    }    
  })
  .catch(err=>{
    res.json({
      data:[],
      success:false,
      msg: "Something went wrong !!"
    });   
  })
});

router.delete("/:id", async (req, res) => {
  User.findByIdAndDelete(req.params.id)
  .then(respo => {
    Photos.deleteMany({ user_id: req.params.id })
    .then(rsp => {
      res.json({
        data:[],
        success:true,
        msg:"User deleted successfully !!"
      });
    }).catch(er => {
      res.json({
        data:[],
        success:false,
        msg:"Errored !!"
      });
    });    
    
  }).catch(err=>{
    res.json({
      data:[],
      success:false,
      msg:"something went wronge"
    });
  });
});



router.patch("/:id", async (req, res) => {

  User.findByIdAndUpdate(req.params.id, { $set: req.body })
  .then(respupdated => {
    res.json({
      data: respupdated,
      success: true,
      msg: "User data updated successfully !!"
    });
  }).catch(err => {
    res.json({
      data: [],
      success: false,
      msg: "Something went wrong !!"
    });
  });
});

// router.get("/:user_id/image", async (req, res) => {
//   try {
//     const photos = await Photos.find({ user_id: req.params.user_id });
//     res.json(photos);
//   } catch (err) {
//     res.send("err " + err);
//   }
// });

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("../photo-gallery-angular/src/assets/images"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now().toString() + "-" + req.params.user_id + "-" + file.originalname
    );
  },
});

const upload = multer({ storage: storage });

router.post("/:user_id/image", upload.single("image"), async (req, res) => {
  
  const image = new Photos({
    name: req.file.filename,
    caption: req.body.caption,
    user_id: req.params.user_id,
  });
  try {
    const photos = await image.save();
    res.json({
      data: photos,
      success: true,
      msg: "Photo uploaded successfully !!"
    });
  } catch (err) {
    res.json({
      data:[],
      success: false,
      msg: "Something went wrong !!"
    });
  }
});

router.delete("/image/:photo_id", async (req, res) => {
  Photos.findById(req.params.photo_id)
  .then(respdelete => {
    fs.unlinkSync("../photo-gallery-angular/src/assets/images/" + respdelete.name);
    respdelete.delete();
    res.json({
      data:[],
      success: true,
      msg: "Image deleted successfully !!"
    })
  }).catch(err => {
    res.json({
      data:[],
      success:false,
      msg: "Something went wrong !!"
    });
  });
});

module.exports = router;
