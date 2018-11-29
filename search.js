const https = require('https');


https.get({
    hostname: 'api.cognitive.microsoft.com',
    path:     '/bing/v7.0/search?q=' + encodeURIComponent('horoscope' + '_onlinestore'),
    headers:  { 'Ocp-Apim-Subscription-Key': 'fa4900c4123d4cc29e00561fa4991cb1' },
  }, res => {
    let body = ''
    res.on('data', part => body += part)
    res.on('end', () => {
      for (var header in res.headers) {
        if (header.startsWith("bingapis-") || header.startsWith("x-msedge-")) {
          console.log(header + ": " + res.headers[header])
        }
      }
      console.log('\nJSON Response:\n')
      // console.dir(JSON.parse(body), { colors: false, depth: null })
      var content = JSON.parse(body).webPages.value;
      console.log(content);

    })
    res.on('error', e => {
      console.log('Error: ' + e.message)
      throw e
    })
  });
