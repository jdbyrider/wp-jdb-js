window.onload = function() {
	replaceOptionsListUrls();
}


var replaceOptionsListUrls = function() {
	var selectedOptions = $(".dms-select")[0];
	if (selectedOptions) {
		_.forEach(selectedOptions, function(option){
			option.value = option.value + "test";
		});
	};
};