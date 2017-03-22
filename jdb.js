//run the scripts on page load
window.onload = function() {
	var attributionValue = getParameterByName("attribution");
	if (attributionValue && attributionValue != ""){		
		var attribution = jQuery.param({ attribution:attributionValue });
		addQueryStringToOptionsListUrls(attribution);
		addQueryStringToHrefs(attribution);
	}
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

var addParams = function( url, param )
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

		if (href && hrefStartWithJdbUrl(href)) {
			href += (href.match(/\?/) ? '&' : '?') + attribution;
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
	if (href.startsWith(jdbBaseUrlHttp) || href.startsWith(jdbBaseUrlHttps)){
		return true;
	}
	else{
		return false;
	}
};