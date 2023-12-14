/* 
    Retrieve the number of services available in each Azure region.
*/

var request = require('request');
var cheerio = require('cheerio');

// US Regions
var regions = ['us-central', 'us-east', 'us-east-2', 'us-north-central', 'us-south-central', 'us-west-central', 'us-west', 'us-west-2', 'us-west-3'];

// EUROPE Regions
// var regions = ['europe-north', 'europe-west', 'france-central', 'france-south', 'germany-north', 'germany-west-central', 'norway-east', 'norway-west', 'switzerland-north', 'switzerland-west', 'united-kingdom-south', 'united-kingdom-west', 'italy-north', 'poland-central', 'sweden-central', 'sweden-south'];

// ASIA Regions
// var regions = ['asia-pacific-east', 'asia-pacific-southeast', 'australia-central', 'australia-central-2', 'australia-east', 'australia-southeast', 'japan-east', 'japan-west', 'korea-central', 'korea-south', 'central-india', 'south-india', 'west-india', 'east-asia', 'southeast-asia', 'china-non-regional', 'china-east', 'china-east-2', 'china-east-3', 'china-north', 'china-north-2', 'china-north-3'];

// OTHER Regions
// var regions = ['brazil-south', 'brazil-southeast', 'canada-central', 'canada-east', 'south-africa-north', 'south-africa-west', 'isreal-central', 'qatar-central', 'uae-central', 'uae-north'];

regions.forEach(function (region) {
    request.post({
        url: 'https://azure.microsoft.com/en-us/global-infrastructure/services/get-async/',
        form: {
            RegionSlugs: [region],
            ProductSlugs: ['all']
        }
    }, function (err, httpResponse, body) {
        if (err) {
            console.error('Error:', err);
            return;
        }
        var $ = cheerio.load(body);
        var rows = $('img[src*="ga.svg"]');
        console.log("Services in " + region +  ": " + rows.length);
    });
});

