// The one inline script on the site, run in <head> before first paint. It marks that JavaScript is
// available (so scripted effects can take over from their no-JS defaults) and, on the homepage,
// lets the opening Z animation play only once per browser session.
// astro.config.mjs hashes this exact string into the Content-Security-Policy.
export const bootScript =
	"(function(){var d=document.documentElement;d.classList.add('js');if(!d.hasAttribute('data-intro'))return;try{if(sessionStorage.getItem('zc-intro')){d.classList.add('no-intro')}else{sessionStorage.setItem('zc-intro','1')}}catch(e){}})();";
