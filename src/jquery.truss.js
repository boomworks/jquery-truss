/**
* @license
* jQuery Truss - CSS3 vendor prefix support for jQuery
*
* Copyright (c) 2011 Boomworks <http://boomworks.com.au/>
* Author: Lindsay Evans
* Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
*/

/* TODO:
 * - add animate() support (http://api.jquery.com/jQuery.cssHooks/#animating)
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
//console.info('$.cssHooks['+name+'].get('+prop+') ['+elem.style[prop]+']')
					return elem.style[prop];
				},
				set: function(elem, value){
//console.info('$.cssHooks['+name+'].set('+prop+','+value+')')
					elem.style[prop] = value;
				}
			};

			if(name === 'transform'){
			}


			// .animate() support
			if(name === 'transform'){

				// TODO:
				// - will probably break if wee feed it anything other than a matrix
				// - add support for z-axis
				// - easing

				// rotate()
				/*$.fx.step[name] = function(fx){
//console.info('$.fx.step['+name+']('+fx.start+','+fx.now+','+fx.end+')')
					var start = parseInt(fx.start.match(/rotate\(([-0-9]+)deg\)/)[1]),
						end = parseInt(fx.end.match(/rotate\(([-0-9]+)deg\)/)[1]),
						now = parseInt(fx.now.match(/rotate\(([-0-9]+)deg\)/)[1]),
						next = 'rotate(' + (start + (end - start) * fx.state) + 'deg)';
					$.cssHooks[name].set(fx.elem, next);
				};*/

				// matrix()/translate3d()
				$.fx.step[name] = function(fx){
			
					var $this = $(fx.elem), 
						current_transform = $this.css('transform').match(/matrix\(1, 0, 0, 1, ([-0-9.]*), ([-0-9.]*)\)/i),
					    current_x = current_transform ? parseInt(current_transform[1]) : 0,
					    current_y = current_transform ? parseInt(current_transform[2]) : 0,
						start_transform = fx.start.match(/matrix\(1, 0, 0, 1, ([-0-9.]*), ([-0-9.]*)\)/i),
					    start_x = start_transform ? parseInt(start_transform[1]) : 0,
					    start_y = start_transform ? parseInt(start_transform[2]) : 0,
						end_transform = fx.end.match(/translate3d\(([-0-9.]*)(px)?, ([-0-9.]*)(px)?, ([-0-9.]*)(px)?\)/i),
					    end_x = end_transform ? parseInt(end_transform[1]) : 0,
					    end_y = end_transform ? parseInt(end_transform[3]) : 0,
						new_x = current_x, new_y = current_y,
						transform_string
					;

					new_x = start_x > end_x ? current_x - 1 : current_x + 1;
					new_y = start_y > end_y ? current_y - 1 : current_y + 1;

					transform_string = 'translate3d(' + new_x + 'px, ' + new_y + 'px, 0)';
					transform_string = fx.end;
//console.log(fx);
//console.log(start_x, current_x, end_x, new_x);
//console.log(current_x, current_y);
					$.cssHooks[name].set(fx.elem, transform_string);
				};
			}
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
