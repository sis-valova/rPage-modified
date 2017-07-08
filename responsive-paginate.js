/*
 * A plugin for making Bootstrap's pagination more responsive
 * https://github.com/auxiliary/rpage
 *
 * This is a modified version of original plugin
 * https://github.com/sis-valova/rPage-modified
 */

(function ($) {
    jQuery.fn.rPage = function (options) {

        var $this = $(this);

        var settings = $.extend({
            gap: 10,
            resize_time: 20
        }, options);

        var instances = [];

        for(var i = 0, max = $this.length; i < max; i++)
        {
            instances.push(new rPage($($this[i])).label().makeResponsive());
        }

        var resize_timer;

        $(window).on('resize', function () {
            clearTimeout(resize_timer);
            resize_timer = setTimeout(function () {
            	for(var i = 0, len = instances.length; i < len; i++) {
                    instances[i].makeResponsive();
				}
            }, settings.resize_time)
        });

        function rPage($container)
        {
            var self = this;

            self.els = $container.find("li");

            self.label = function() {
        		var active_index = self.els.filter(".active").index();

                self.els.each(function() {
                    $(this).addClass("page-away-" + (Math.abs(active_index - $(this).index())));
        		});

                return self;
        	};

            self.getNextPrevWidth = function() {
            	var prev = $container.parent().find('.prev a').outerWidth(true);
            	var next = $container.parent().find('.next a').outerWidth(true);
            	return prev + next + settings.gap;
			};
            self.makeResponsive = function() {
                self.reset();
    	    	var width = $container.outerWidth(true);
    	    	var outer_container = self.els.parent().parent().width() - self.getNextPrevWidth();

    	    	while (width > outer_container) {
    	    		if (!self.removeOne()) break;
    	    		width = $container.outerWidth(true);
                
                }

                return self;
    	    };

            self.isRemovable = function(element) {
        		var index = self.els.filter(element).index();
        		return !(index === 0 || index === ($container.find("li").length - 1) || element.text() === "...");
        	};

            self.removeOne = function() {
    	    	var active_index = self.els.filter(".active").index();
    	    	var farthest_index = $container.find("li").length - 1;

    	    	for (var i = farthest_index - 1; i > 0; i--)
    	    	{
    	    		var candidates = self.els.filter(".page-away-" + i);
    	    		var candidate = candidates.filter(function(){
    	    			return this.style["display"] != "none";
    	    		});
    	    		if (candidate.length > 0)
    	    		{
    	    			for (var j = 0; j < candidate.length; j++)
    	    			{
    	    				var candid_candidate = candidate.eq(j);
    	    				if (self.isRemovable(candid_candidate))
    		    			{
    			    			candid_candidate.css("display", "none").removeClass('is-inline').addClass('is-hidden');
    			    			if (self.needsEtcSign(active_index, farthest_index ))
    			    			{
                                    self.els.eq(farthest_index - 2).before("<li class='disabled removable'><span>...</span></li>");
    			    			}
    			    			if (self.needsEtcSign(0, active_index))
    			    			{
                                    self.els.eq(1).after("<li class='disabled removable'><span>...</span></li>");
    			    			}
    			    			return true;
    		    			}
    	    			}
    	    		}
    	    	}
    	    	return false;
    	    };

            self.needsEtcSign = function(el1_index, el2_index) {
    	    	if (el2_index - el1_index <= 1)
    	    	{
    	    		return false;
    	    	}
    	    	else
    	    	{
    	    		var hasEtcSign = false;
    	    		var hasHiddenElement = false;
    	    		for (var i = el1_index + 1; i < el2_index; i++)
    	    		{
    	    			var el = $container.find("li").eq(i);
    	    			if (el.css("display") == "none")
    	    			{
    	    				hasHiddenElement = true;
    	    			}
    	    			if (el.text() == "...")
    	    			{
    	    				hasEtcSign = true;
    	    			}
    	    		}
    	    		if (hasHiddenElement == true && hasEtcSign == false)
    	    		{
    	    			return true;
    	    		}
    	    	}
    	    	return false;
    	    };

            self.reset = function() {
    	    	for (var i = 0; i < self.els.length; i++)
    	    	{
                    self.els.eq(i).css("display", "inline").removeClass('is-hidden').addClass('is-inline');
    	    	}
    	    	$container.find("li.removable").remove();
    	    };

        }
    };
}(jQuery));
