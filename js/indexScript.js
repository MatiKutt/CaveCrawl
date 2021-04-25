

function onIndexLoad()
{
	
	'use strict';
	if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./service_worker.js');
			   console.log("register function");
    }

}



