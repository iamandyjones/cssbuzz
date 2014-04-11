var BUZZ = {
	Init: function(){
		
		/* Bind click events */
		BUZZ.BindUIActions();

	},
	BindUIActions: function() {
		
		var wrapper = $('.wrapper'), offCanvas = $('.off-canvas');

		if($('.navToggle').length){
			var navTrigger = $('.navToggle');

			$(navTrigger).click(function(){
				$(offCanvas).addClass('in-view');
				$(wrapper).addClass('offset');
				return false;
			});
		}

		if($('.navClose').length){

			var navClose = $('.navClose');

			$(navClose).click(function(){
				$(offCanvas).removeClass('in-view');
				$(wrapper).removeClass('offset');
				return false;
			});
		}
		
		if(BUZZ.TestSupport()){
			BUZZ.HijackLinks($('.index a'));
		} else {
			//alert('false');
		}
		
	},
	TestSupport: function() {
		return !!(window.history && history.pushState);
	},
	HijackLinks: function(el) {
		$(el).click(function(){
			var url = $(this).attr('href');
			history.pushState(null, null, url);
			
			swapContent(url);
			return false;
		});
		
		function swapContent(dest){
			var plh = $('.url');
			$(plh).text(dest);
		}
		
		window.addEventListener("popstate", function(e) {
			swapContent(location.pathname);
		});
	}
};

(function() {
  BUZZ.Init();
})();