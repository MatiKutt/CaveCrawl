

function onIndexLoad()
{
	console.log("index registered");
	'use strict';
	if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./service_worker.js');
			   console.log("register function");
    }

}



