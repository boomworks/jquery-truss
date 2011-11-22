/**
* @license
* jQuery Truss - CSS3 vendor prefix support for jQuery
*
* Copyright (c) 2011 Boomworks <http://boomworks.com.au/>
* Author: Lindsay Evans
* Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/

(function($){

	if(!$.cssHooks){
		throw('jQuery 1.4.3+ is needed for this plugin to work');
	}

	function styleSupport(prop){
		var vendorProp, supportedProp,
			capProp = ('-' + prop).replace(/-([a-z]?)/gi, function(m){
				return m[1].toUpperCase();
			}),
		    prefixes = ['Moz', 'Webkit', 'O', 'ms'], i = 4,
		    div = document.createElement('div');

		if(prop in div.style){
			supportedProp = prop;
		}else{
			while(i--){
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

	// TODO: everything else

})(jQuery);
