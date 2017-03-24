//run the scripts on page load
window.onbeforeunload = function(){
	//make sure that the cookie was set if the user was too speedy :^)
	var attribution = getParameterByName("attribution");
	var cookie = getCookie("attribution");
	if(attribution && !cookie){
		setOrUpdateCookie(attribution);
	}
}
	
window.onload = function() {	
	//get the attribution query param
	var attributionValue = getParameterByName("attribution");	
	if (attributionValue && attributionValue == ""){
		//exit
		return null;
	}
	//if the query string wasn't empty, set it as a cookie and format the links
	else if (attributionValue && attributionValue != ""){	
		setOrUpdateCookie(attributionValue);		
		var attribution = jQuery.param({ attribution:attributionValue });
		initialize(attribution);
	}
	//if the query string was empty, get the cookie and create the jquery param with that instead
	else if (getCookie("attribution")){
		var attribution = jQuery.param({ attribution:getCookie("attribution") });
		initialize(attribution);
	}		
}

//common functions for either path
function initialize(attribution) {
	addQueryStringToOptionsListUrls(attribution);
	addQueryStringToHrefs(attribution);
	attachInventoryListener(attribution);
}

//attach a listener to the vehicle inventory div to handle pagination
function attachInventoryListener(attribution) {
	jQuery('#demon-content').bind("DOMSubtreeModified",function(){
		//call the href replace function here
		addQueryStringToHrefs(attribution);
	});
}

function setOrUpdateCookie(attributionValue){
	var expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() + 14);
	var expirationString = "; expires=" + expirationDate.toGMTString();
	document.cookie = "attribution=" + attributionValue + expirationString + "; path=/";
}

//https://www.w3schools.com/js/js_cookies.asp
function getCookie(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function containsAttribution(href, attribution) {
	if(href.indexOf('?' + attribution) != -1)
		return true;
	else if(href.indexOf('&' + attribution) != -1)
		return true;
	return false;
}

//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

var addParams = function(url, param)
{
	if (!jQuery.isEmptyObject(param))
	{
		url += ( url.indexOf('?') >= 0 ? '&' : '?' ) + param;
	}
	return url;
}

//iterates through the options on the get me approved list and adds the visitor id to the query string parameters
var addQueryStringToOptionsListUrls = function(attribution) {
	var selectOptions = $(".dms-select")[0];
	if (selectOptions) {
		_.forEach(selectOptions, function(option){
			if(option.value != "") {
				option.value = addParams(option.value, attribution);
			};
		});
	};
};

//appends attribution to querystring on all hrefs in anchor tags that start with the jdb base url
var addQueryStringToHrefs = function(attribution) {	
	$('a').each(function() {
		var href = $(this).attr('href');

		if (href && hrefStartWithJdbUrl(href) && !containsAttribution(href, attribution)) {
			href = addParams(href, attribution);
			$(this).attr('href', href);
		}
	});
};

//checks if the href value starts with the jdb base url
var hrefStartWithJdbUrl = function(href){
	if (!href){
		return false;
	}

	var jdbBaseUrlHttp = "http://www.jdbyrider.com";
	var jdbBaseUrlHttps = "https://www.jdbyrider.com";
	var jdbTestBaseUrl = "scdev.jdbyrider.com"	
	var jdbTestBaseUrlHttp = "http://scdev.jdbyrider.com";
	var jdbTestBaseUrlHttps = "http://scdev.jdbyrider.com";

	if (href.startsWith(jdbBaseUrlHttp) || href.startsWith(jdbBaseUrlHttps) 
		|| href.startsWith(jdbTestBaseUrlHttp) || href.startsWith(jdbTestBaseUrlHttps) || href.startsWith(jdbTestBaseUrl))
	{
		return true;
	}
	else{
		return false;
	}
};

