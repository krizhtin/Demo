var isLoading = false;
var loadingQueueLoop = setInterval(function(){
	if(loadingQueue.length > 0 && !isLoading) {
		startLoadingScreen();
		isLoading = true;
	}
	else if(loadingQueue.length < 1 && isLoading){
		isLoading = false;
		stopLoadingScreen();
	}
}, 200);

var loadingQueue = [];

function startLoadingScreen() {
	
	var modal = document.createElement("div");
	modal.className = 'modal-loading';
	
	document.body.appendChild(modal);
	
	document.body.style.overflow = "hidden";
	document.body.style.display = "block";
	
	modal.style.overflow = "hidden";
	modal.style.display = "block";
	modal.style.position = "absolute";
	modal.style.zIndex = "99999";
	modal.style.top = 0;
	modal.style.left = 0;
	modal.style.height = "100%";
	modal.style.width = "100%";
	modal.style.background = "rgba( 255, 255, 255, .5 ) url('" + mainUrl + "/resources/images/loading.gif') 40% 40% no-repeat";
	modal.style.backgroundPosition  = "center";
}

function stopLoadingScreen() {
	$('.modal-loading').remove();
	$('body').removeAttr("style");
}

function addLoadingQueue() {
	loadingQueue.push("");	
}

function removeLoadingQueue() {
	loadingQueue.pop();
}

function removeAllLoadingQueue() {
	loadingQueue = [];
}

try{
	console.log("core_loading.js loaded!");
}catch(err){}