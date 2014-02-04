(function ($)
{
	$.fn.onImageLoad = function (params)
	{
		if (!params) params = {};
		if ($.isFunction(params)) params = {complete: params};
		function isImageLoaded(img)
		{
			if (!img.complete) {
				return false;
			}
			return !(typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0);
		}
		function isErrorLoad(img)
		{
			if (img.readyState && img.readyState.toLowerCase() == 'uninitialized') {
				return true;
			}
			else if (img.naturalWidth === 0 && img.complete === true) {
				return true;
			}
			return false;
		}
		var index = 0,
				count = this.length,
				errors,
				error;
		return this.each(function ()
		{
			var $this = $(this),
					that = this,
					timer;
			if ($this.is('img')) {
				timer = setInterval(function ()
				{
					if (isImageLoaded(that)) {
						clearInterval(timer);
						if ($.isFunction(params.each)) {
							params.each.call(that);
						}
						if (++index == count && $.isFunction(params.complete)) {
							params.complete.call(that, errors);
						}
					}
					else {
						if (isErrorLoad(that)) {
							clearInterval(timer);
							error = {message: 'Image not loaded', src: that.src, obj: that};
							if (!errors) errors = [];
							errors.push(error);
							if ($.isFunction(params.each)) {
								params.each.call(that, error);
							}
							if (++index == count && $.isFunction(params.complete)) {
								params.complete.call(that, errors);
							}
						}
					}
				}, 100);
			}
		});
	};
})(jQuery);