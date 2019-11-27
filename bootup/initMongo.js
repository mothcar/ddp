'use strict'

global.mongoose = require('mongoose')
const bluebird = require('bluebird')

// promisify for async await
mongoose.Promise = bluebird.Promise

const initMongo = async ()=>{
  try{
    // init mongodb for DEV
    await mongoose.connect('mongodb://' + MONGODB.HOST + ':' + MONGODB.PORT + '/' + MONGODB.DATABASE, {useNewUrlParser: true})
    mongoose.set('useCreateIndex', true)
    log('init mongodb: ' + MONGODB.HOST + ':' + MONGODB.PORT)

    // init mongodb for PRODUCTION
    // await mongoose.connect('mongodb://' + MONGODB.HOST + ':' + MONGODB.PORT + '/' + MONGODB.DATABASE, {useNewUrlParser: true})
    // mongoose.set('useCreateIndex', true)
    // log('init mongodb: ' + MONGODB.HOST + ':' + MONGODB.PORT)

    // init schema
    await require('../model/users')
    await require('../model/bjcode')

    await require('./initTestDate')

    log('init schema DONE.')
  }
  catch(err){
    throw err
  }
}

module.exports = initMongo()
