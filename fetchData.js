
var fs = require('fs');
var Tabletop = require('tabletop');

var storyjs_jsonp_data = {
    "timeline":
    {
        "headline":"100 years of war",
        "type":"default",
        "text":"",
        "asset": {
            "media":"",
            "credit":"",
            "caption":""
        },
        "date": [],
        "era": []
    }
};


function outputFile() {
    var outputFilename = 'src/data.jsonp';
    var jsonpString = 'storyjs_jsonp_data = ';
    jsonpString += JSON.stringify(storyjs_jsonp_data, null, '  ');

    fs.writeFile(outputFilename, jsonpString, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to ");
        }
    });
}

function parseResponse(data, tabletop) {
    data.forEach(function(date) {
        var dateItem =  {
            "startDate": date.startdate,
            "endDate": date.enddate,
            "headline": date.headline,
            "text": date.text,
            "tag": "",
            "classname": "",
            "asset": {
                "media": date.media,
                "thumbnail": date.mediathumbnail,
                "credit": date.mediacredit,
                "caption": date.mediacaption
            }
        };
        storyjs_jsonp_data.timeline.date.push(dateItem);
    });

    outputFile();
}


function init() {
    Tabletop.init({
        key: '0AkRR3zKqdlUHdDNRTHpoQ1E1S08waXVpV1RUWVVIb3c',
        callback: parseResponse,
        simpleSheet: true
    });
}

init();