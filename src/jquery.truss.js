// Adds vendor-prefixed support to $.css for transform & transition
(function($){

	if(!$.cssHooks){
		throw('jQuery 1.4.3+ is needed for this plugin to work');
	}

	function styleSupport(prop){
		var vendorProp, supportedProp,
		    capProp = prop.charAt(0).toUpperCase() + prop.slice(1),
		    prefixes = ['Moz', 'Webkit', 'O', 'ms'],
		    div = document.createElement('div'),
		    i = 0;

		if(prop in div.style){
			supportedProp = prop;
		}else{
			for(; i < 4; i++){
				vendorProp = prefixes[i] + capProp;
				if(vendorProp in div.style){
					supportedProp = vendorProp;
					break;
				}
			}
		}

		div = null;
		return ($.support[prop] = supportedProp);
	}

	function addVendorPrefixSupport(name){
		var prop = styleSupport(name);
		if(prop && prop !== name){
			$.cssHooks[name] = {
				get: function(elem, computed, extra){
					return $.css(elem, prop);
				},
				set: function(elem, value){
					elem.style[prop] = value;
				}
			};
		}
	}

	addVendorPrefixSupport('transform');
	addVendorPrefixSupport('transform-origin');

	addVendorPrefixSupport('transition');
	addVendorPrefixSupport('transition-property');
	addVendorPrefixSupport('transition-duration');
	addVendorPrefixSupport('transition-timing-function');
	addVendorPrefixSupport('transition-delay');

})(jQuery);
