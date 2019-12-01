'use strict'

const faker   = require('faker')
const express = require('express')
const xlsx    = require('xlsx')
const infocenter = express.Router({})
const dateFormat = require('dateformat');

//--------------------------------------------------
// posts functions
//--------------------------------------------------
infocenter.get('/getCountry', async (req, res)=> {
  // log('test : req.body :', req.body)
  // log('test : req.query :', req.query)
  var infoFilter = req.query.infocenter_level
  var newInfocenter = req.query

  try{
    // let infocenter = await Infocenter.find().sort({$natural:-1}).limit(1)
    let place = await Infocenter.findOne(newInfocenter)
    res.json({msg:RCODE.OPERATION_SUCCEED, data:{item:place}})

  }
  catch(err){
    log('err=',err)
    res.status(500).json({msg: RCODE.SERVER_ERROR, data:{}})
  }
})



infocenter.get('/getInfocenterById', async (req, res)=> {
  log('test : req.query :', req.query)
  var inputParam = req.query
  let infocenter = await Infocenter.findOne(inputParam)
  res.status(200).json({msg:RCODE.OPERATION_SUCCEED, data:{item:infocenter}})

})

infocenter.get('/getMarker', async (req, res)=> {
  log('test : req.query :', req.query)

  let b_lat = Number(req.query.b_lat)
  let b_lng = Number(req.query.b_lng)
  let t_lat = Number(req.query.t_lat)
  let t_lng = Number(req.query.t_lng)
  // res.ok(params)
  log('lat Type : ', typeof b_lat)

  var infocenters = await Infocenter.find({
     location: { $geoWithin: { $box:  [ [ b_lng,b_lat ], [ t_lng,t_lat ] ] } }
  })
  var places = await Place.find({
     location: { $geoWithin: { $box:  [ [ b_lng,b_lat ], [ t_lng,t_lat ] ] } }
  })

  var lotMarker = infocenters.concat(places)
  // await Infocenter.find()
  log('position return : ', lotMarker)
  res.status(200).json({msg:RCODE.OPERATION_SUCCEED, data:{item:lotMarker}})

})

infocenter.get('/getInfo', async (req, res)=> {
  // log('test : req.body :', req.body)
  log('test : req.query :', req.query)
  var infoFilter = req.query.infocenter_level
  var newInfocenter = req.query
  var inputParam = {}
  inputParam = req.query
  // depth_0
  // if(infoFilter=='depth_0') {
  //   let infocenter1 = await Infocenter.findOne({name:'대한민국 정보센터'})
  //   res.json({msg:RCODE.OPERATION_SUCCEED, data:{item:infocenter1}})
  // }

  var pre_lat = req.query.lat
  var lat = Number(pre_lat)
  var pre_lng = req.query.lng
  var lng = Number(pre_lng)

  inputParam.location = {
    type: 'Point',
    coordinates: [lng,lat]
  }



  try{
    if(infoFilter==='depth_0'){
      newInfocenter = {}
      newInfocenter.name = req.query.name
    }

    if(infoFilter=='region_1depth_name'){
      newInfocenter = {}
      newInfocenter.name = req.query.name
    }

    if(infoFilter=='region_2depth_name'){
      newInfocenter = {}
      newInfocenter.name = req.query.name
      // delete inputParam.r_depth_3
    }
    if(infoFilter=='region_3depth_name'){
      newInfocenter = {}
      newInfocenter.name = req.query.name
      newInfocenter.r_depth_2 = req.query.r_depth_2
      // delete inputParam.r_depth_3
    }

    log('CHECK QUERY PARAM :', newInfocenter)
    log('CHECK input PARAM :', inputParam)
    // let infocenter = await Infocenter.find().sort({$natural:-1}).limit(1)
    let infocenter = await Infocenter.findOne(newInfocenter)
    // log('server result : ', infocenter)
    if(infocenter == null){
      // Infocenter.create(req.query)
      Infocenter.create(inputParam)
      .then(result=>{
        log('new infocenter reuslt : ', result)

        // let payload = {
        //   _id:        result._id,
        //   email:      result.email
        // }

        // let token = tms.jwt.sign(payload, TOKEN.SECRET, {expiresIn: TOKEN.EXPIRE_SEC})
        // if(!token)
        //   return res.status(500).json({msg: RCODE.SERVER_ERROR, data:{}})

        // Users.updateOne({_id: result._id}, {loginType: LOGIN_CODE.EMAIL})

        return res.status(200).json({msg:RCODE.OPERATION_SUCCEED, data:{item:result}})
        // return res.status(200).json(result)
      })
      log('result is null')

    } else {
      // log('server result : ', infocenter)
      res.json({msg:RCODE.OPERATION_SUCCEED, data:{item:infocenter}})
    }

    // res.json({msg:RCODE.OPERATION_SUCCEED, data:{item:infocenter[0]}})

  }
  catch(err){
    log('err=',err)
    res.status(500).json({msg: RCODE.SERVER_ERROR, data:{}})
  }

}) // 'getInfo'

infocenter.post('/test2', (req, res)=>{
  log('test 1')
  var resolveAfter1Second = function() {
    console.log("starting 1sec promise");
    return new Promise(resolve => {
      setTimeout(function() {
        var result
        resolve(result=10);
        console.log("fast 1sec is done");
        res.json({msg:RCODE.OPERATION_SUCCEED, data:{result}})
      }, 1000);
    });
  };

  var resolveAfter2Seconds = function() {
    console.log("starting slow promise");
    return new Promise(resolve => {
      setTimeout(function() {
        resolveAfter1Second()
        resolve(20);
        console.log("slow promise is done");
      }, 2000);

    });
  };

  resolveAfter2Seconds()



}) // 'test2'

infocenter.post('/test1', (req, res)=>{
  log('test 1')
  try{
    // log('posts req.body=', req.body)
    log('test 2')
    async function f() {
      // let promise = new Promise((resolve, reject) => {
      //   log('test 3')
      //   setTimeout(() => resolve("resolve done!"), 3000)
      //   log('test 4')
      // });
      // log('test 5')
      //
      // let result = await promise;
      // log('test 6')
      // return result

      var value = await Promise
        .resolve(1)
        .then(x => x * 3)
        .then(x => {

          setTimeout(() => {
            log('test 3')
            x + 5
          }, 3000)

        })
        .then(x => {
          log('test 4')
          x / 2
        })
      return value;
    }

    f().then(resolve=>{
      log('test 7')
      res.json({msg:RCODE.OPERATION_SUCCEED, data:{resolve}})
    }

    ); // 1


  }
  catch(err){
    log('err=',err)
    res.status(500).json({msg: RCODE.SERVER_ERROR, data:{}})
  }
}) // '/test1'

module.exports = infocenter
