const excelJs = require('exceljs')
var workbook = new excelJs.Workbook();
const puppeteer = require('puppeteer')
let KaBand2_4_ID = "2192";
let PSN_ID =  "2200";
var express = require('express');
var router = express.Router();
var yesterdayFullDateStart;
var yesterdayFullDateEnd;

router.get('/',function(req,res,next){
    res.render('daily-report')
})

router.post('/',async function(req,res,next){
    res.send(req.body.name)
    goToThePage()
})

async function goToThePage(){
    const browser = await puppeteer.launch({headless:false,ignoreHTTPSErrors:true,args:['--start-fullscreen']})
    const page = await browser.newPage()
    await page.setViewport({width:1280,height:630})
    await page.goto('https://103.104.204.243:4321',{waitUntil:'networkidle0'})
    let username = "prtgadmin"
    let password = "P@55w0rd123"
    await page.type('#loginusername',username,{delay:30})
    await page.type('#loginpassword',password,{delay:30})
    await page.click('.loginbutton')

    let timeNow = new Date();
    console.log(timeNow.getDate())

    var yesterday = getYesterday();
    yesterdayFullDateStart = yesterday.year+"-"+yesterday.yesterdayMonth+"-"+yesterday.yesterdayDate+"-00-00-00"
    yesterdayFullDateEnd = yesterday.year+"-"+yesterday.yesterdayMonth+"-"+yesterday.yesterdayDate+"-23-59-00"
    console.log(yesterdayFullDateStart)
    console.log(yesterdayFullDateEnd)
    let linkHistoriGraphIsatPing= "https://103.104.204.243:4321/historicdata_html.htm?id=2184&sdate="+yesterdayFullDateStart+"&edate="+yesterdayFullDateEnd+"&avg=600&pctavg=300&pctshow=false&pct=95&pctmode=false"
    await page.goto(linkHistoriGraphIsatPing,{waitUntil:'networkidle0'})
    await page.goto(linkHistoriGraphIsatPing)
    await page.screenshot({
        path : 'Screenshot/PSNPing'+yesterdayFullDateStart+'.png',
        fullPage:false,
        omitBackground:true})
    let linkHistoriGraphIsatWan= "https://103.104.204.243:4321/historicdata_html.htm?id=2200&sdate="+yesterdayFullDateStart+"&edate="+yesterdayFullDateEnd+"&avg=600&pctavg=300&pctshow=false&pct=95&pctmode=false"
    await page.goto(linkHistoriGraphIsatWan,{waitUntil:'networkidle0'})
    await page.goto(linkHistoriGraphIsatWan)
    await page.screenshot({
        path : 'Screenshot/PSNWan'+yesterdayFullDateStart+'.png',
        fullPage:false,
        omitBackground:true})

    let linkHistoriGraph5mbPing= "https://103.104.204.243:4321/historicdata_html.htm?id=2408&sdate="+yesterdayFullDateStart+"&edate="+yesterdayFullDateEnd+"&avg=600&pctavg=300&pctshow=false&pct=95&pctmode=false"
    await page.goto(linkHistoriGraph5mbPing,{waitUntil:'networkidle0'})
    await page.goto(linkHistoriGraph5mbPing)
    await page.screenshot({
        path : 'Screenshot/2_4KaBandPing'+yesterdayFullDateStart+'.png',
        fullPage:false,
        omitBackground:true})

    let linkHistoriGraph5mbWan= "https://103.104.204.243:4321/historicdata_html.htm?id=2410&sdate="+yesterdayFullDateStart+"&edate="+yesterdayFullDateEnd+"&avg=600&pctavg=300&pctshow=false&pct=95&pctmode=false"
    await page.goto(linkHistoriGraph5mbWan,{waitUntil:'networkidle0'})
    await page.goto(linkHistoriGraph5mbWan)
    await page.screenshot({
        path : 'Screenshot/2_4KaBandWan'+yesterdayFullDateStart+'.png',
        fullPage:false,
        omitBackground:true})
    
    //Logout and Close Browser
    await page.goto("https://103.104.204.243:4321/index.htm?logout=1")
    await browser.close();
    createWorkSheet()
}

function createWorkSheet(){
    workbook.xlsx.readFile("Template/Template Daily Report PSN.xlsx")
    .then(function() {
        var sheet1 = workbook.getWorksheet("CSTS via PSN")
        
        console.log("it works")
        var imageId1 = workbook.addImage({
        filename: 'Screenshot/PSNWan'+yesterdayFullDateStart+'.png',
        extension: 'png',
    });
      sheet1.addImage(imageId1, 'A1:J24');
      
      var imageId2 = workbook.addImage({
          filename: 'Screenshot/PSNPing'+yesterdayFullDateStart+'.png',
          extension: 'png',
        });
        
        sheet1.addImage(imageId2, 'K1:X24');
        var cell = sheet1.getCell('A26');
        var cellDate = sheet1.getCell('B31')
        var cellDate2 = sheet1.getCell('A36')
        cellDate.value = yesterday.yesterdayDate+"/"+yesterday.yesterdayMonth+"/"+yesterday.year
        cell.value = "Periode "+yesterday.yesterdayName+", "+yesterday.yesterdayDate+" "+yesterday.yesterdayMonthName.name+" "+yesterday.year
        cellDate2.value = "Periode "+yesterday.yesterdayName+", "+yesterday.yesterdayDate+" "+yesterday.yesterdayMonthName.name+" "+yesterday.year
        workbook.xlsx.writeFile("Result/02. Daily Report CSTS via PSN "+yesterday.yesterdayDate+" "+yesterday.yesterdayMonthName.name+" "+yesterday.year+".xlsx");
        // use workbook

    })
    workbook.xlsx.readFile("Template/Template Daily Report 2_4KaBand.xlsx")
    .then(function() {
        var sheet2 = workbook.getWorksheet("CSTS via Kacific 2_4M")
        
        console.log("it works")
        var imageId1 = workbook.addImage({
        filename: 'Screenshot/2_4KaBandWan'+yesterdayFullDateStart+'.png',        
        extension: 'png',
    });
      sheet2.addImage(imageId1, 'A1:J24')
      
      
      var imageId2 = workbook.addImage({
          filename: 'Screenshot/2_4KaBandPing'+yesterdayFullDateStart+'.png',          
          extension: 'png',
        });
        
        sheet2.addImage(imageId2, 'K1:X24')
        
        var cell = sheet2.getCell('A28');
        var cellDate = sheet2.getCell('B33')
        var cellDate2 = sheet2.getCell('A38')
        cellDate.value = yesterday.yesterdayDate+"/"+yesterday.yesterdayMonth+"/"+yesterday.year
        cell.value = "Periode "+yesterday.yesterdayName+", "+yesterday.yesterdayDate+" "+yesterday.yesterdayMonthName.name+" "+yesterday.year
        cellDate2.value = "Periode "+yesterday.yesterdayName+", "+yesterday.yesterdayDate+" "+yesterday.yesterdayMonthName.name+" "+yesterday.year
        workbook.xlsx.writeFile("Result/01. Daily Report CSTS via Ka Band 2.4 "+yesterday.yesterdayDate+" "+yesterday.yesterdayMonthName.name+" "+yesterday.year+".xlsx");
    })
}
    
    function getYesterday(){
    var dateNow = new Date()
    console.log(dateNow)
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var month = [
      {
          "abbreviation": "Jan",
          "name": "January"
      },
      {
          "abbreviation": "Feb",
          "name": "February"
      },
      {
          "abbreviation": "Mar",
          "name": "March"
      },
      {
          "abbreviation": "Apr",
          "name": "April"
      },
      {
          "abbreviation": "May",
          "name": "May"
      },
      {
          "abbreviation": "Jun",
          "name": "June"
      },
      {
          "abbreviation": "Jul",
          "name": "July"
      },
      {
          "abbreviation": "Aug",
          "name": "August"
      },
      {
          "abbreviation": "Sep",
          "name": "September"
      },
      {
          "abbreviation": "Oct",
          "name": "October"
      },
      {
          "abbreviation": "Nov",
          "name": "November"
      },
      {
          "abbreviation": "Dec",
          "name": "December"
      }
  ]
  var yesterdayName
  if(dateNow.getDay() == 0){
      yesterdayName = days[dateNow.getDay()+6]
      console.log(yesterdayName)
  }else{
      yesterdayName = days[dateNow.getDay()-1]
      console.log(yesterdayName)
  }
  console.log(yesterdayName)
  let yesterdayDate = dateNow.getDate()-1

  if(yesterdayDate < 10){
      yesterdayDate = "0"+yesterdayDate
  }

 let yesterdayMonth = dateNow.getMonth()+1
 if(yesterdayMonth < 10){
      yesterdayMonth = "0"+yesterdayMonth
  }
  
  console.log(yesterdayDate)
    return yesterday = {
        yesterdayName : yesterdayName,
        yesterdayDate : yesterdayDate,
        yesterdayMonth : yesterdayMonth,
        yesterdayMonthName : month[dateNow.getMonth()],
        year : dateNow.getFullYear()
      }
} 
module.exports = router;