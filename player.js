      var playlist = [];
      var it = 0;
    	var screen = document.getElementById('relvid');
    	var screenList = document.getElementById('queue');
    	var searchList = document.getElementById('searchResults');
    	var firstVideo = 'Ut92P3ZTid4';
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
		
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640', 
          videoId: firstVideo,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        //event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        /*if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }*/
        if(event.data == 0) {
        		//console.log(1);          
                if(it+1 < playlist.length){
                	//console.log(2);
                	playThis(playlist[it+1].id.videoId);
                	it++;
                }
        }
      }
      function stopVideo() {
        player.stopVideo();
        if(it + 1 < playlist.length){
            playThis(playlist[it+1]);
            it++;
        }	
      }
      
      function playNext(){
      	//player.loadVideoById("bHQqvYy5KYo", 5, "large");
      }
      
      function playThis(id){
      	player.loadVideoById(id, 5, "large");
      	getRelated(id);
      }
      getRelated(firstVideo);
      var data;
      function getRelated(keyword){
      	var url="https://www.googleapis.com/youtube/v3/search?relatedToVideoId="+keyword+"&part=snippet&type=video&maxResults=20&key=AIzaSyAbtf2bzrlhNWmvA7JiecFrafUk_YDu2KE";
  	    var source=getSource(url);
  	    data = JSON.parse(source);
  	    var n = data.items.length;
//  	    screen.innerHTML = "<br>Related Videos<br>";
//  	    screen.innerHTML += "<ul id='relvid'>";
        screen.innerHTML = "";
  	    for(var i = 0; i < n; i++){
  	    	screen.innerHTML += "<li>" + data.items[i].snippet.title + "<br><button class='btn' onClick='addFromRelated(this)'>Queue</button> <button class='btn' onClick='playFromRelated(this)'>Play</button></li>";
  	    }
//	      screen.innerHTML += "</ul>"; 
      }
      
      function addFromRelated(node){
          var childs = node.parentNode.parentNode.childNodes;
          var i;
          for(i = 0; i < childs.length; i++){
              if(node.parentNode == childs[i]) break;
          }
          //console.log(i);
          playlist.push(data.items[i]);
          refreshList();
      }
      
      function playFromRelated(node){
          var childs = node.parentNode.parentNode.childNodes;
          var i;
          for(i = 0; i < childs.length; i++){
              if(node.parentNode == childs[i]) break;
          }
          playlist = [];
      	  playlist.push(data.items[i]);
      	  refreshList();	
      	  playThis(data.items[i].id.videoId);
      }
    
      function getIndex(node) {
        var i;
        var childs = node.parentNode.childNodes;
        //console.log(childs);
        //console.log(node.parentNode);
        for (i = 0; i < childs.length; i++) {
          if (node == childs[i]) break;
        }
        console.log(i);
      }      
/*      $('#relvid li').click(function(){
        console.log(1);
        var i = $(this).index();
        console.log(i);
        document.getElementById("numRelated").value = "";
      	playlist = [];
      	playlist.push(data.items[i]);
      	refreshList();	
      	playThis(data.items[i].id.videoId);
      });
*/      
      var dataSearch;
   	  
   	  function getSearch(){
   	  	var keyword = document.getElementById("searchThis").value;
   	  	var url="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+escape(keyword)+"&order=relevance&maxResults=20&key=AIzaSyAbtf2bzrlhNWmvA7JiecFrafUk_YDu2KE";
	    var source=getSource(url);
    	dataSearch = JSON.parse(source);
    	var n = dataSearch.items.length;
//    	searchList.innerHTML = "<br>Search Results<br>";
        searchList.innerHTML = "";
    	for(var i = 0; i < n; i++){
    		searchList.innerHTML += "<li>" + dataSearch.items[i].snippet.title + "<br><button class='btn' onClick='addFromSearch(this)'>Queue</button> <button class='btn' onClick='playFromSearch(this)'>Play</button></li>";
    	}
   	  }	
      
      function playFromSearch(node){
          var childs = node.parentNode.parentNode.childNodes;
          var i;
          for(i = 0; i < childs.length; i++){
              if(node.parentNode == childs[i]) break;
          }
          playlist = [];
      	  playlist.push(data.items[i]);
      	  refreshList();	
      	  playThis(dataSearch.items[i].id.videoId);          
      }
      
      function addFromSearch(node){
          var childs = node.parentNode.parentNode.childNodes;
          var i;
          for(i = 0; i < childs.length; i++){
              if(node.parentNode == childs[i]) break;
          }
          //console.log(i);
          playlist.push(dataSearch.items[i]);
          refreshList();          
      }
      
      function nextRelated(){
      	var i = Number(document.getElementById("numRelated").value) - 1;
      	document.getElementById("numRelated").value = "";
      	playlist = [];
      	playlist.push(data.items[i]);
      	refreshList();	
      	playThis(data.items[i].id.videoId);
      	
      }
      
      function playSearch(){
      	var i = Number(document.getElementById("numSearch").value) - 1;
      	document.getElementById("numSearch").value= "";
      	playlist = [];
      	playlist.push(dataSearch.items[i]);
      	refreshList();
      	playThis(dataSearch.items[i].id.videoId);
      	
      }
      
      function addSearch(){
      	it = Number(document.getElementById("numSearch").value) - 1;
      	document.getElementById("numSearch").value = "";
      	playlist.push(dataSearch.items[it]);
      	refreshList();
      }
      
      function addRelated(){
      	it = Number(document.getElementById("numRelated").value) - 1;
		document.getElementById("numRelated").value = "";
      	playlist.push(data.items[it]);
      	refreshList();
      }
      
      
      
      function refreshList(){
      	//console.log(playlist);
      	var n = playlist.length;
      	screenList.innerHTML = "";
      	for(var i = 0;i < n; i++){
      		screenList.innerHTML += "<li>" + playlist[i].snippet.title + "<br><button class='btn' onClick='playFromQueue(this)'>Play</button></li>";
      	}
      }
      
      function playFromQueue(node){
          var childs = node.parentNode.parentNode.childNodes;
          var i;
          for(i = 0; i < childs.length; i++){
              if(node.parentNode == childs[i]) break;
          } 
          it = i;
          playThis(playlist[it].id.videoId);
      }
      
      function getSource(url){
	    var xmlHttp = null;
	    xmlHttp = new XMLHttpRequest();
    	xmlHttp.open( "GET", url, false );
	    xmlHttp.send( null );
	    return xmlHttp.responseText;
   	  }
   	  
   	  function playthisList(){
		  	it = Number(document.getElementById("numList").value) - 1;
		  	document.getElementById("numList").value = "";
		  	playThis(playlist[it].id.videoId);
      }
      
      
      $(document).ready(function() {
            $( "#searchThis" ).autocomplete({
            source: function(request, response) {
            $.getJSON("http://suggestqueries.google.com/complete/search?callback=?",
                {
                  "hl":"en", // Language
                  "ds":"yt", // Restrict lookup to youtube
                  "jsonp":"suggestCallBack", // jsonp callback function name
                  "q":request.term, // query term
                  "client":"youtube" // force youtube style response, i.e. jsonp
                }
            );
            suggestCallBack = function (data) {
                var suggestions = [];
                $.each(data[1], function(key, val) {
                    suggestions.push({"value":val[0]});
                });
                suggestions.length = 5; // prune suggestions list to only 5 items
                response(suggestions);
            };
        },
          select: function( event, ui ) {document.getElementById("searchThis").value=ui.item.value; getSearch();}
        });
        $("#searchThis").keypress(function(e) {
            
            if(e.keyCode == 13) {
                $(".ui-menu-item").hide();
                getSearch();
            }
        });
    });
    
    /*
    $("#searchThis").autocomplete({
        source: function(request, response) {
            $.getJSON("http://suggestqueries.google.com/complete/search?callback=?",
                {
                  "hl":"en", // Language
                  "ds":"yt", // Restrict lookup to youtube
                  "jsonp":"suggestCallBack", // jsonp callback function name
                  "q":request.term, // query term
                  "client":"youtube" // force youtube style response, i.e. jsonp
                }
            );
            suggestCallBack = function (data) {
                var suggestions = [];
                $.each(data[1], function(key, val) {
                    suggestions.push({"value":val[0]});
                });
                suggestions.length = 5; // prune suggestions list to only 5 items
                response(suggestions);
            };
        },
    });    
    */  
      
