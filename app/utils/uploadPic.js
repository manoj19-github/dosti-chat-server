const multer=require("multer")
const path=require("path")
const shortid=require("shortid")
const dest=path.join(path.dirname(__dirname),"../public/profiles")
console.log(dest)
const storage=multer.diskStorage({
  destination:function(req,file,done){
    done(null,dest)
  },
  filename:function(req,file,done){
    done(null,shortid.generate()+"-"+file.originalname)
  }
})
exports.uploads=multer({storage})
