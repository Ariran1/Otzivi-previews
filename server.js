var http = require('http');
var fs = require('fs');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});

function accept(req, res) {
	let a = req.url;

  if (req.method == 'POST') {
  	data="";
    req.on('data', function(chunk) {
    	data+=chunk;
      console.log("Received body data:");
      console.log(chunk.toString());
    });
   
    req.on('end', function() {
      // empty 200 OK response for now
      res.writeHead(200, "OK", {'Content-Type': 'text/html'});
      res.end();
    });  
    return;  
  }
  
	if (a == '/?link=comments&comment_page=1') {
		var ads = {
			items:[{
					stars:2,
					name: 'Ильюшин Дима',
					date: '02.05.2011 22:34:11',
					text: 'fFSAFOIJASODHAISDUHAISDHAISUDHIASUDHIAUSD'
				},{
					stars:5,
					name: 'Ильюшин Дима',
					date: '02.05.2011 22:34:11',
					text: 'fFSAFOIJASODHAISDUHAISDHAISUDHIASUDHIAUSD'
				},{
					stars:3,
					name: 'Ильюшин Дима',
					date: '02.05.2011 22:34:11',
					text: 'fFSAFOIJASODHAISDUHAISDHAISUDHIASUDHIAUSD'
				}],
			pagesLength:6
		};
		setTimeout(() => res.end(JSON.stringify(ads)),500);
		return;
	}
	if (a == '/?link=comments&comment_page=2') {
		var ads = {
			items:[{
					stars:2,
					name: 'RehjgfnrbyAAAAAAA',
					date: '02.05.2011 22:34:11',
					text: 'Угрым ташкор Умдурингизнинг Идет туда, где есть березы и ягоды. Два раза. Три. Пять. Ага, вот оно.'
				},{
					stars:5,
					name: 'RehjgfnrbyAAAAAAA',
					date: '02.05.2011 22:34:11',
					text: 'Угрым ташкор Умдурингизнинг Идет туда, где есть березы и ягоды. Два раза. Три. Пять. Ага, вот оно.'
				},{
					stars:3,
					name: 'RehjgfnrbyAAAAAAA',
					date: '02.05.2011 22:34:11',
					text: 'Угрым ташкор Умдурингизнинг Идет туда, где есть березы и ягоды. Два раза. Три. Пять. Ага, вот оно.'
				}],
			pagesLength:6
		};
		setTimeout(() => res.end(JSON.stringify(ads)),500);
		return;
	}
	if (a == '/?link=comments&comment_page=3') {
		var ads = {
			items:[{
					stars:2,
					name: 'Ильюшин Дима',
					date: '02.05.2011 22:34:11',
					text: 'Угрым ташкор Умдурингизнинг Идет туда, где есть березы и ягоды. Два раза. Три. Пять. Ага, вот оно.'
				},{
					stars:5,
					name: 'Ильюшин Дима',
					date: '02.05.2011 22:34:11',
					text: 'Угрым ташкор Умдурингизнинг Идет туда, где есть березы и ягоды. Два раза. Три. Пять. Ага, вот оно.'
				},{
					stars:3,
					name: 'Ильюшин Дима',
					date: '02.05.2011 22:34:11',
					text: 'Угрым ташкор Умдурингизнинг Идет туда, где есть березы и ягоды. Два раза. Три. Пять. Ага, вот оно.'
				}],
			pagesLength:6
		};
		setTimeout(() => res.end(JSON.stringify(ads)),500);
		return;
	}
	if (a == '/?link=comments&comment_page=4') {
		var ads = {
			items:[{
					stars:2,
					name: 'RehjgfnrbyAAAAAAA',
					date: '02.05.2011 22:34:11',
					text: 'Угрым ташкор Умдурингизнинг Идет туда, где есть березы и ягоды. Два раза. Три. Пять. Ага, вот оно.'
				},{
					stars:5,
					name: 'RehjgfnrbyAAAAAAA',
					date: '02.05.2011 22:34:11',
					text: 'Угрым ташкор Умдурингизнинг Идет туда, где есть березы и ягоды. Два раза. Три. Пять. Ага, вот оно.'
				},{
					stars:3,
					name: 'RehjgfnrbyAAAAAAA',
					date: '02.05.2011 22:34:11',
					text: 'Угрым ташкор Умдурингизнинг Идет туда, где есть березы и ягоды. Два раза. Три. Пять. Ага, вот оно.'
				}],
			pagesLength:6
		};
		setTimeout(() => res.end(JSON.stringify(ads)),500);
		return;
	}
	if (a == '/?link=comments&comment_page=5') {
		var ads = {
			items:[{
					stars:2,
					name: 'RehjgfnrbyAAAAAAA',
					date: '02.05.2011 22:34:11',
					text: 'Угрым ташкор Умдурингизнинг Идет туда, где есть березы и ягоды. Два раза. Три. Пять. Ага, вот оно.'
				},{
					stars:5,
					name: 'RehjgfnrbyAAAAAAA',
					date: '02.05.2011 22:34:11',
					text: 'Угрым ташкор Умдурингизнинг Идет туда, где есть березы и ягоды. Два раза. Три. Пять. Ага, вот оно.'
				},{
					stars:3,
					name: 'RehjgfnrbyAAAAAAA',
					date: '02.05.2011 22:34:11',
					text: 'Угрым ташкор Умдурингизнинг Идет туда, где есть березы и ягоды. Два раза. Три. Пять. Ага, вот оно.'
				}],
			pagesLength:6
		};
		setTimeout(() => res.end(JSON.stringify(ads)),500);
		return;
	}if (a == '/?link=comments&comment_page=6') {
		var ads = {
			items:[{
					stars:2,
					name: 'RehjgfnrbyAAAAAAA',
					date: '02.05.2011 22:34:11',
					text: 'Угрым ташкор Умдурингизнинг Идет туда, где есть березы и ягоды. Два раза. Три. Пять. Ага, вот оно.'
				}],
			pagesLength:6
		};
		setTimeout(() => res.end(JSON.stringify(ads)),500);
		return;
	}
	if (a == '/' 
		|| a == '/news' 
		|| a == '/eventsPhotos'
		|| a == '') {
    	fs.readFile('./index.html', (err,data) => {
    		res.writeHead(200,{'Content-Type': 'text/html'});
    		res.end(data);
    	});

	} else {
    	file.serve(req, res);
	}
}

http.createServer(accept).listen(8080);

console.log('Server running on port 8080');
