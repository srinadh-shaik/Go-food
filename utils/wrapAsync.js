module.exports = ((fn)=>{
    return function(err,req,res,next){
        fn(err,req,res,next).catch(next);
    }
});