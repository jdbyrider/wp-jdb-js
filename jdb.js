//run the scripts on page load
window.onload = function() {
	var attribution = $.url().param('attribution');
	if (attribution){	
		replaceOptionsListUrls(attribution);
		addQueryStringToHrefs(attribution);
	}
}

//iterates through the options on the get me approved list and adds the visitor id to the query string parameters
var addQueryStringToOptionsListUrls = function(attribution) {
	var selectOptions = $(".dms-select")[0];
	if (selectOptions) {
		_.forEach(selectOptions, function(option){
			if(option.value != "" || !option.value) {
				option.value = option.value + "?" + attribution;
			};
		});
	};
};

//appends attribution to querystring on all hrefs in anchor tags that start with the jdb base url
var addQueryStringToHrefs = function(attribution) {	
	$('a').each(function() {
		var href = $(this).attr('href');

		if (href && hrefStartWithJdbUrl()) {
			href += (href.match(/\?/) ? '&' : '?') + attribution;
			$(this).attr('href', href);
		}
	});
};

//checks if the href value starts with the jdb base url
var hrefStartWithJdbUrl = function(href){
	var jdbBaseUrlHttp = "http://www.jdbyrider.com";
	var jdbBaseUrlHttps = "https://www.jdbyrider.com";
	var httpStartsWith = href.startsWith(jdbBaseUrlHttp);
	var httpsStartsWith = href.startsWith(jdbBaseUrlHttps);
	if (httpStartsWith || httpsStartsWith){
		return true;
	}
	else{
		return false;
	}
};