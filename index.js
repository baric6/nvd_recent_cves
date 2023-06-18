const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

  
const app = express();
const PORT = 3000;

app.get('/', (req, res)=>{
    res.json("Welcome to root URL of Server");
});

app.get('/news', (req, res)=>{
    res.json("please provide a page number /news/1");
});

app.get('/news/1', (req, res)=>{

    webData = []
    //////////////////////////////////////////////////////////////////
    axios.get('https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&search_type=all&isCpeNameSearch=false')
    .then(response =>{
        const html = response.data
        const $ = cheerio.load(html)
        $("tr", html).each((index, element) => {
            //console.log(element)
            if(index != 0){
                const title = $(element).find("th").text()
                const dis = $(element).find("p").text()
                const released = $(element).find("span").text().replace(/\t/g,"").split("\n")[0]

                const urlprefix = "https://nvd.nist.gov"
                const urlendfix = $(element).find("a").attr("href")
                const url = urlprefix + urlendfix

                cve = {
                    "title" : title,
                    "discription" : dis,
                    "released" : released,
                    "url" : url
                }
                webData.push(cve)
            }
            
        })
        res.json(webData)
    })
    ///////////////////////////////////////////////////////////////////
});

app.get('/news/2', (req, res)=>{

    webData = []
    //////////////////////////////////////////////////////////////////
    axios.get('https://nvd.nist.gov/vuln/search/results?isCpeNameSearch=false&results_type=overview&form_type=Basic&search_type=all&startIndex=20')
    .then(response =>{
        const html = response.data
        const $ = cheerio.load(html)
        $("tr", html).each((index, element) => {
            //console.log(element)
            if(index != 0){
                const title = $(element).find("th").text()
                const dis = $(element).find("p").text()
                const released = $(element).find("span").text().replace(/\t/g,"").split("\n")[0]

                const urlprefix = "https://nvd.nist.gov"
                const urlendfix = $(element).find("a").attr("href")
                const url = urlprefix + urlendfix

                cve = {
                    "title" : title,
                    "discription" : dis,
                    "released" : released,
                    "url" : url
                }
                webData.push(cve)
            }
            
        })
        res.json(webData)
    })
    ///////////////////////////////////////////////////////////////////
   
});
  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);