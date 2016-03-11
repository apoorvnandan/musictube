var playlist = [];
    var it = 0;
    	var screen = document.getElementById('relvid');
    	var screenList = document.getElementById('list');
    	var searchList = document.getElementById('searchList');
    	var firstVideo = 'ZLVVBTePZSg';
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
  	    for(var i = 0; i < n; i++){
  	    	screen.innerHTML += "<li onClick = 'getIndex(this);'>" + (i+1) + ". " + data.items[i].snippet.title + "</li>";
  	    }
//	      screen.innerHTML += "</ul>"; 
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
    	searchList.innerHTML = "<br>Search Results<br>";
    	for(var i = 0; i < n; i++){
    		searchList.innerHTML += (i+1) + ". " + dataSearch.items[i].snippet.title + '<br>';
    	}
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
      	console.log(playlist);
      	var n = playlist.length;
      	screenList.innerHTML = "<br>Playlist<br>";
      	for(var i = 0;i < n; i++){
      		screenList.innerHTML += (i+1) + ". " + playlist[i].snippet.title + '<br>';
      	}
//      	screen.innerHTML += x;
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