'use strict'

const faker   = require('faker')
const express = require('express')
const xlsx    = require('xlsx')
const bjcode    = express.Router({})
const dateFormat = require('dateformat');

//--------------------------------------------------
//   functions
//--------------------------------------------------



//--------------------------------------------------
// 공공테이터 functions
//--------------------------------------------------
bjcode.get('/getTest', async (req, res)=>{
  try{
    // log('BubJungDong code:', req.query)
    // let qry = req.query
    // let devide = qry.queryType

    let payload =[]

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    let servicekey = 'S9EORKDWDn2xoJXvsM66ouTCMcgDfuGYqBdB6owI1J3LyuZ9F6c4IqVaFaX%2BHfO2xsBk%2FxgRdUqx3w9Oc9v1Gw%3D%3D'

    // var xhr = new XMLHttpRequest();
    // var url = 'http://apis.data.go.kr/1611000/BldRgstService/getBrRecapTitleInfo'; /*URL*/
    // var url = 'http://apis.data.go.kr/1611000/BldRgstService/'+devide; /*URL*/

    // var url = 'http://apis.data.go.kr/1611000/BldRgstService/getBrRecapTitleInfo'; /*URL*/

    // var url = 'http://apis.data.go.kr/1611000/nsdi/ReferLandPriceService/wms/getReferLandPriceWMS'; /*URL*/

    // var url = 'http://apis.data.go.kr/1611000/BldRgstService/getBrBasisOulnInfo'; /*building info */
    var url = 'http://apis.data.go.kr/1611000/nsdi/ReferLandPriceService/attr/getReferLandPriceAttr';

    function makeRequest (method, url, done) {
      var xhr = new XMLHttpRequest();
      // var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+servicekey; /*Service Key*/
      // queryParams += '&' + encodeURIComponent('sigunguCd') + '=' + encodeURIComponent('11590'); /*행정표준코드*/
      // queryParams += '&' + encodeURIComponent('bjdongCd') + '=' + encodeURIComponent('10900'); /*행정표준코드*/
      // queryParams += '&' + encodeURIComponent('platGbCd') + '=' + encodeURIComponent('0'); /*0:대지 1:산 2:블록*/
      // queryParams += '&' + encodeURIComponent('bun') + '=' + encodeURIComponent('0395'); /*번*/
      // queryParams += '&' + encodeURIComponent('ji') + '=' + encodeURIComponent('0069'); /*지*/
      // queryParams += '&' + encodeURIComponent('startDate') + '=' + encodeURIComponent(''); /*YYYYMMDD*/
      // queryParams += '&' + encodeURIComponent('endDate') + '=' + encodeURIComponent(''); /*YYYYMMDD*/
      // queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('30'); /*페이지당 목록 수*/
      // queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*페이지번호*/
      // queryParams += '&' + '_type=json'
      var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+servicekey; /*Service Key*/
      queryParams += '&' + encodeURIComponent('ldCode') + '=' + encodeURIComponent('1159010900'); /* 법정동코드(2~10자리) */
      queryParams += '&' + encodeURIComponent('stdrYear') + '=' + encodeURIComponent('2018'); /* 기준년도(YYYY: 4자리) */
      queryParams += '&' + encodeURIComponent('format') + '=' + encodeURIComponent('json'); /* 응답결과 형식(xml 또는 json) */
      queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('100'); /* 검색건수 */
      queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지 번호 */
      // queryParams += '&' + encodeURIComponent('jibun') + '=' + encodeURIComponent('395'); /*0:대지 1:산 2:블록*/
      // queryParams += '&' + encodeURIComponent('bubun') + '=' + encodeURIComponent('69'); /*번*/
      // queryParams += '&' + '_type=json'
      xhr.open('GET', url + queryParams);
      xhr.onreadystatechange = function () {
          if (this.readyState == 4) {
              // alert('Status: '+this.status+' Headers: '+JSON.stringify(this.getAllResponseHeaders())+' Body: '+this.responseText);
              let data = JSON.parse(this.responseText)
              console.log('### Server Return : ',this.responseText)
              // console.log('### RESULT : ',data.response.body.items)
              // payload = data.response.body.items.item
              payload = data
              done(null, payload);
              // res.json({msg:RCODE.OPERATION_SUCCEED, data:{item: data.response.body.items.item}})
          }
      };

      xhr.send();
    }

    makeRequest('GET', url, function (err, datums) {
      if (err) { throw err; }
      // console.log(datums);
      res.json({msg:RCODE.OPERATION_SUCCEED, data:{item:datums}})

    });



    // Result Type Sample
    let temp = {"response":{"header":{"resultCode":"00","resultMsg":"NORMAL SERVICE."},"body":{"items":{"item":[{
      "bjdongCd":    10300,"bldNm":"대청아파트 제302동","block":" ","bun":"0012","bylotCnt":0,"crtnDay":20171206,"hsprc":324000000,"ji":"0000","lot":" ","mgmBldrgstPk":"11680-195341","naBjdongCd":10301,"naMainBun":21,"naRoadCd":116804166040,"naSubBun":0,"naUgrndCd":0,"newPlatPlc":" 서울특별시 강남구 개포로109길 21","platGbCd":0,"platPlc":"서울특별시 강남구 개포동 12번지","regstrGbCd":2,"regstrGbCdNm":"집합","regstrKindCd":4,"regstrKindCdNm":"전유부","rnum":1,"sigunguCd":11680,"splotNm":" "},{"bjdongCd":10300,"bldNm":"대청아파트 제301동","block":" ","bun":"0012","bylotCnt":0,"crtnDay":20171206,"hsprc":352000000,"ji":"0000","lot":" ","mgmBldrgstPk":"11680-184703","naBjdongCd":10301,"naMainBun":21,"naRoadCd":116804166040,"naSubBun":0,"naUgrndCd":0,"newPlatPlc":" 서울특별시 강남구 개포로109길 21","platGbCd":0,"platPlc":"서울특별시 강남구 개포동 12번지","regstrGbCd":2,"regstrGbCdNm":"집합","regstrKindCd":4,"regstrKindCdNm":"전유부","rnum":2,"sigunguCd":11680,"splotNm":" "},{"bjdongCd":10300,"bldNm":"대청아파트 제301동","block":" ","bun":"0012","bylotCnt":0,"crtnDay":20171206,"hsprc":364000000,"ji":"0000","lot":" ","mgmBldrgstPk":"11680-184714","naBjdongCd":10301,"naMainBun":21,"naRoadCd":116804166040,"naSubBun":0,"naUgrndCd":0,"newPlatPlc":" 서울특별시 강남구 개포로109길 21","platGbCd":0,"platPlc":"서울특별시 강남구 개포동 12번지","regstrGbCd":2,"regstrGbCdNm":"집합","regstrKindCd":4,"regstrKindCdNm":"전유부","rnum":3,"sigunguCd":11680,"splotNm":" "},{"bjdongCd":10300,"bldNm":"대청아파트 제301동","block":" ","bun":"0012","bylotCnt":0,"crtnDay":20171206,"hsprc":348000000,"ji":"0000","lot":" ","mgmBldrgstPk":"11680-184635","naBjdongCd":10301,"naMainBun":21,"naRoadCd":116804166040,"naSubBun":0,"naUgrndCd":0,"newPlatPlc":" 서울특별시 강남구 개포로109길 21","platGbCd":0,"platPlc":"서울특별시 강남구 개포동 12번지","regstrGbCd":2,"regstrGbCdNm":"집합","regstrKindCd":4,"regstrKindCdNm":"전유부","rnum":4,"sigunguCd":11680,"splotNm":" "},{"bjdongCd":10300,"bldNm":"대청아파트 제302동","block":" ","bun":"0012","bylotCnt":0,"crtnDay":20171206,"hsprc":289000000,"ji":"0000","lot":" ","mgmBldrgstPk":"11680-195451","naBjdongCd":10301,"naMainBun":21,"naRoadCd":116804166040,"naSubBun":0,"naUgrndCd":0,"newPlatPlc":" 서울특별시 강남구 개포로109길 21","platGbCd":0,"platPlc":"서울특별시 강남구 개포동 12번지","regstrGbCd":2,"regstrGbCdNm":"집합","regstrKindCd":4,"regstrKindCdNm":"전유부","rnum":5,"sigunguCd":11680,"splotNm":" "},{"bjdongCd":10300,"bldNm":"대청아파트 제302동","block":" ","bun":"0012","bylotCnt":0,"crtnDay":20171206,"hsprc":380000000,"ji":"0000","lot":" ","mgmBldrgstPk":"11680-195341","naBjdongCd":10301,"naMainBun":21,"naRoadCd":116804166040,"naSubBun":0,"naUgrndCd":0,"newPlatPlc":" 서울특별시 강남구 개포로109길 21","platGbCd":0,"platPlc":"서울특별시 강남구 개포동 12번지","regstrGbCd":2,"regstrGbCdNm":"집합","regstrKindCd":4,"regstrKindCdNm":"전유부","rnum":6,"sigunguCd":11680,"splotNm":" "},{"bjdongCd":10300,"bldNm":"대청아파트 제301동","block":" ","bun":"0012","bylotCnt":0,"crtnDay":20171206,"hsprc":362000000,"ji":"0000","lot":" ","mgmBldrgstPk":"11680-184645","naBjdongCd":10301,"naMainBun":21,"naRoadCd":116804166040,"naSubBun":0,"naUgrndCd":0,"newPlatPlc":" 서울특별시 강남구 개포로109길 21","platGbCd":0,"platPlc":"서울특별시 강남구 개포동 12번지","regstrGbCd":2,"regstrGbCdNm":"집합","regstrKindCd":4,"regstrKindCdNm":"전유부","rnum":7,"sigunguCd":11680,"splotNm":" "},{"bjdongCd":10300,"bldNm":"대청아파트 제301동","block":" ","bun":"0012","bylotCnt":0,"crtnDay":20171206,"hsprc":380000000,"ji":"0000","lot":" ","mgmBldrgstPk":"11680-184675","naBjdongCd":10301,"naMainBun":21,"naRoadCd":116804166040,"naSubBun":0,"naUgrndCd":0,"newPlatPlc":" 서울특별시 강남구 개포로109길 21","platGbCd":0,"platPlc":"서울특별시 강남구 개포동 12번지","regstrGbCd":2,"regstrGbCdNm":"집합","regstrKindCd":4,"regstrKindCdNm":"전유부","rnum":8,"sigunguCd":11680,"splotNm":" "},{"bjdongCd":10300,"bldNm":"대청아파트 제302동","block":" ","bun":"0012","bylotCnt":0,"crtnDay":20171206,"hsprc":338000000,"ji":"0000","lot":" ","mgmBldrgstPk":"11680-195451","naBjdongCd":10301,"naMainBun":21,"naRoadCd":116804166040,"naSubBun":0,"naUgrndCd":0,"newPlatPlc":" 서울특별시 강남구 개포로109길 21","platGbCd":0,"platPlc":"서울특별시 강남구 개포동 12번지","regstrGbCd":2,"regstrGbCdNm":"집합","regstrKindCd":4,"regstrKindCdNm":"전유부","rnum":9,"sigunguCd":11680,"splotNm":" "},{"bjdongCd":10300,"bldNm":"대청아파트 제306동","block":" ","bun":"0012","bylotCnt":0,"crtnDay":20171206,"hsprc":549000000,"ji":"0000","lot":" ","mgmBldrgstPk":"11680-184822","naBjdongCd":10301,"naMainBun":21,"naRoadCd":116804166040,"naSubBun":0,"naUgrndCd":0,"newPlatPlc":" 서울특별시 강남구 개포로109길 21","platGbCd":0,"platPlc":"서울특별시 강남구 개포동 12번지","regstrGbCd":2,"regstrGbCdNm":"집합","regstrKindCd":4,"regstrKindCdNm":"전유부","rnum":10,"sigunguCd":11680,"splotNm":" "}]},"numOfRows":10,"pageNo":1,"totalCount":46133}}}




  }
  catch(err){
    log('err=',err)
    res.status(500).json({msg: RCODE.SERVER_ERROR, data:{}})
  }
})



//--------------------------------------------------
// test functions
//--------------------------------------------------
bjcode.post('/', async (req, res)=>{
  try{
    log('test req.body= :', req.body)
    res.json({msg:RCODE.OPERATION_SUCCEED, data:{item:'Good Server~~~'}})
  }
  catch(err){
    log('err=',err)
    res.status(500).json({msg: RCODE.SERVER_ERROR, data:{}})
  }
})

bjcode.get('/', async (req, res)=>{
  try{
    log('test req.body=', req.body)
    res.json({msg:RCODE.OPERATION_SUCCEED, data:{item:'Good Server~~~'}})
  }
  catch(err){
    log('err=',err)
    res.status(500).json({msg: RCODE.SERVER_ERROR, data:{}})
  }
})













module.exports = bjcode
