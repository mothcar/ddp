'use strict'

let initSchema = async ()=>{
  const infocenter = new mongoose.Schema({
    center_code:    {type:String, default:''},                    // 기관코드
    type:           {type:String, default:''},                    // 유형 type
    name:           {type:String, default:''},                    // 최하위기관명
    full_address:   {type:String, default:''},                    // address
    road_address:   {type:String, default:''},                    // 도로명주소
    tel:            {type:String, default:''},                    //
    zip:            {type:String, default:''},                    //
    bjcode:         {type:String, default:''},                    // 법정동코드
    floor:          {type:String, default:''},                    //
    place_type:     {type:String, default:''},                    // city / dong / ...
    r_depth_1:      {type:String, default:''},                    // depth of address
    r_depth_2:      {type:String, default:''},                    // depth of address
    r_depth_3:      {type:String, default:''},                    // depth of address
    admin_id:       {type:mongoose.Schema.Types.ObjectId, ref:'users'}, // 생성자 _id 값.
    admin_name:     {type:String, default:''},                    // 생성자 _id 값.
    infocenter_level:{type:String, default:''},                   // tab-1 or tab-2
    location:       {type:Object, default:{}},                    // coords
    description:    {type:String, default:''},                    // description
    image:          {type:String, default:''},                    // content image
  }, {timestamps: true, minimize: false})

  /*
        address                 : { type: 'string', defaultsTo: [] },
        creator_photo           : { type: 'string', defaultsTo: '' },
        view_level              : { type: 'string', defaultsTo: '' },
        views                   : { type: 'integer', defaultsTo: 0 },
        replys                  : { type: 'integer', defaultsTo: 0 },
  */

  try{
    const list = await mongoose.connection.db.listCollections().toArray()
    let index = _.findIndex(list, {name:'infocenter'})
    if(index < 0)
      infocenter.index({admin_id:1,image:1, location : "2dsphere" })
    else
      log('init schema (voices.products): collection found. creation skipped')

    global.Infocenter = mongoose.model('infocenter', infocenter)
    return new Promise((resolve, reject)=>{resolve('done')})
  }
  catch(err){
    log('err:', err)
  }
}

module.exports = initSchema()
