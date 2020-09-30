console.log('here...');
var k=0;
// title
// description
// urlToImage
// url
// publishedAt

console.log('Connected...');
var request = new XMLHttpRequest()
var api_url = "http://newsapi.org/v2/top-headlines?country=in&apiKey=431537140e8a4a5c83ebb9e9740ed66b"
request.open('GET', api_url, true)
request.onload = function () {
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    for(var i=1; i<4; i++){
        // div-main
        var cardDeck = document.createElement('div');
        cardDeck.className+='card-deck';
        for(var j=0; j<3; j++){
            // div-1
            // Creating elements in div-1
            var card = document.createElement('div');
            card.className+='card';
            var img = document.createElement('img');
            img.className+='card-img-top';
            // img.src+="https://images.moneycontrol.com/static-mcnews/2020/01/Sensex_BSE_NSE_Stock-market_bull_bear_Gold-5-770x433.png";
            img.src+=data['articles'][k]['urlToImage'];
            // Appending elements in div-1
            card.appendChild(img);
            // end of div-1
        
            // div-1.1
            // Creating elements in div-1.1
            var cardBody = document.createElement('div');
            cardBody.className+='card-body';
            var h5 = document.createElement('h5');
            h5.className+='card-title';
            // h5.textContent+='Sensex, Nifty close at four-month high; 5 factors that were at play - Moneycontrol.com';
            h5.textContent+=data['articles'][k]['title'];
            var p = document.createElement('p');
            p.className+='card-text';
            // p.textContent+='The broader markets also traded in line with frontline indices amid strong market breadth.';
            p.textContent += data['articles'][k]['description'];
            var btn = document.createElement('button');
            btn.className+='btn btn-primary';
            btn.textContent+='Read Article';
            btn.addEventListener("click", function () {
                window.open(data['articles'][k]['url']);
          })
            // btn.click=window.location+data['articles'][k]['url'];
            // btn.href=data['articles'][k]['url'];
            // Appending elements in div-1.1
            cardBody.appendChild(h5);
            cardBody.appendChild(p);
            cardBody.appendChild(btn);
            // end of div-1.1
        
            // div-1.2
            // Creating elements in div-1.2
            var cardFooter = document.createElement('div');
            cardFooter.className+='card-footer';
            var small = document.createElement('small');
            small.className+='text-muted';
            // small.textContent+='Published at: 2020-07-06T10:32:00Z';
            small.textContent+='Published At: '+data['articles'][k]['publishedAt'];
            // Appending elements in div-1.2
            cardFooter.appendChild(small);
            // end of div-1.2
        
            // Appending div-1.1,1.2 in div-1
            card.appendChild(cardBody);
            card.appendChild(cardFooter);
        
            // Appending div-1 in card-deck
            cardDeck.appendChild(card);
            k+=1;
        }
        // Appending card-deck to outer most div in news.html
        id='out'+i;
        var out = document.getElementById(id);
        out.appendChild(cardDeck);
    }      
  } else {
    console.log('error');
  }
}
request.send()