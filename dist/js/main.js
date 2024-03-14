import healthchart from 'healthchart';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var jqueryExports = {};
var jquery = {
  get exports(){ return jqueryExports; },
  set exports(v){ jqueryExports = v; },
};

/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */

(function (module) {
	( function( global, factory ) {

		{

			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket trac-14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		}

	// Pass this if window is not defined yet
	} )( typeof window !== "undefined" ? window : commonjsGlobal, function( window, noGlobal ) {

	var arr = [];

	var getProto = Object.getPrototypeOf;

	var slice = arr.slice;

	var flat = arr.flat ? function( array ) {
		return arr.flat.call( array );
	} : function( array ) {
		return arr.concat.apply( [], array );
	};


	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var fnToString = hasOwn.toString;

	var ObjectFunctionString = fnToString.call( Object );

	var support = {};

	var isFunction = function isFunction( obj ) {

			// Support: Chrome <=57, Firefox <=52
			// In some browsers, typeof returns "function" for HTML <object> elements
			// (i.e., `typeof document.createElement( "object" ) === "function"`).
			// We don't want to classify *any* DOM node as a function.
			// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
			// Plus for old WebKit, typeof returns "function" for HTML collections
			// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
			return typeof obj === "function" && typeof obj.nodeType !== "number" &&
				typeof obj.item !== "function";
		};


	var isWindow = function isWindow( obj ) {
			return obj != null && obj === obj.window;
		};


	var document = window.document;



		var preservedScriptAttributes = {
			type: true,
			src: true,
			nonce: true,
			noModule: true
		};

		function DOMEval( code, node, doc ) {
			doc = doc || document;

			var i, val,
				script = doc.createElement( "script" );

			script.text = code;
			if ( node ) {
				for ( i in preservedScriptAttributes ) {

					// Support: Firefox 64+, Edge 18+
					// Some browsers don't support the "nonce" property on scripts.
					// On the other hand, just using `getAttribute` is not enough as
					// the `nonce` attribute is reset to an empty string whenever it
					// becomes browsing-context connected.
					// See https://github.com/whatwg/html/issues/2369
					// See https://html.spec.whatwg.org/#nonce-attributes
					// The `node.getAttribute` check was added for the sake of
					// `jQuery.globalEval` so that it can fake a nonce-containing node
					// via an object.
					val = node[ i ] || node.getAttribute && node.getAttribute( i );
					if ( val ) {
						script.setAttribute( i, val );
					}
				}
			}
			doc.head.appendChild( script ).parentNode.removeChild( script );
		}


	function toType( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module



	var version = "3.7.1",

		rhtmlSuffix = /HTML$/i,

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {

			// Return all the elements in a clean array
			if ( num == null ) {
				return slice.call( this );
			}

			// Return just the one element from the set
			return num < 0 ? this[ num + this.length ] : this[ num ];
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		even: function() {
			return this.pushStack( jQuery.grep( this, function( _elem, i ) {
				return ( i + 1 ) % 2;
			} ) );
		},

		odd: function() {
			return this.pushStack( jQuery.grep( this, function( _elem, i ) {
				return i % 2;
			} ) );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					copy = options[ name ];

					// Prevent Object.prototype pollution
					// Prevent never-ending loop
					if ( name === "__proto__" || target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = Array.isArray( copy ) ) ) ) {
						src = target[ name ];

						// Ensure proper type for the source value
						if ( copyIsArray && !Array.isArray( src ) ) {
							clone = [];
						} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
							clone = {};
						} else {
							clone = src;
						}
						copyIsArray = false;

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isPlainObject: function( obj ) {
			var proto, Ctor;

			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if ( !obj || toString.call( obj ) !== "[object Object]" ) {
				return false;
			}

			proto = getProto( obj );

			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if ( !proto ) {
				return true;
			}

			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
			return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
		},

		isEmptyObject: function( obj ) {
			var name;

			for ( name in obj ) {
				return false;
			}
			return true;
		},

		// Evaluates a script in a provided context; falls back to the global one
		// if not specified.
		globalEval: function( code, options, doc ) {
			DOMEval( code, { nonce: options && options.nonce }, doc );
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},


		// Retrieve the text value of an array of DOM nodes
		text: function( elem ) {
			var node,
				ret = "",
				i = 0,
				nodeType = elem.nodeType;

			if ( !nodeType ) {

				// If no nodeType, this is expected to be an array
				while ( ( node = elem[ i++ ] ) ) {

					// Do not traverse comment nodes
					ret += jQuery.text( node );
				}
			}
			if ( nodeType === 1 || nodeType === 11 ) {
				return elem.textContent;
			}
			if ( nodeType === 9 ) {
				return elem.documentElement.textContent;
			}
			if ( nodeType === 3 || nodeType === 4 ) {
				return elem.nodeValue;
			}

			// Do not include comment or processing instruction nodes

			return ret;
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
							[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		isXMLDoc: function( elem ) {
			var namespace = elem && elem.namespaceURI,
				docElem = elem && ( elem.ownerDocument || elem ).documentElement;

			// Assume HTML when documentElement doesn't yet exist, such as inside
			// document fragments.
			return !rhtmlSuffix.test( namespace || docElem && docElem.nodeName || "HTML" );
		},

		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return flat( ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
		function( _i, name ) {
			class2type[ "[object " + name + "]" ] = name.toLowerCase();
		} );

	function isArrayLike( obj ) {

		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = toType( obj );

		if ( isFunction( obj ) || isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}


	function nodeName( elem, name ) {

		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

	}
	var pop = arr.pop;


	var sort = arr.sort;


	var splice = arr.splice;


	var whitespace = "[\\x20\\t\\r\\n\\f]";


	var rtrimCSS = new RegExp(
		"^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
		"g"
	);




	// Note: an element does not contain itself
	jQuery.contains = function( a, b ) {
		var bup = b && b.parentNode;

		return a === bup || !!( bup && bup.nodeType === 1 && (

			// Support: IE 9 - 11+
			// IE doesn't have `contains` on SVG.
			a.contains ?
				a.contains( bup ) :
				a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
		) );
	};




	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

	function fcssescape( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	}

	jQuery.escapeSelector = function( sel ) {
		return ( sel + "" ).replace( rcssescape, fcssescape );
	};




	var preferredDoc = document,
		pushNative = push;

	( function() {

	var i,
		Expr,
		outermostContext,
		sortInput,
		hasDuplicate,
		push = pushNative,

		// Local document vars
		document,
		documentElement,
		documentIsHTML,
		rbuggyQSA,
		matches,

		// Instance-specific data
		expando = jQuery.expando,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		nonnativeSelectorCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|" +
			"loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
		identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
			"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

		// Attribute selectors: https://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +

			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
			whitespace + "*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +

			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rleadingCombinator = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" +
			whitespace + "*" ),
		rdescend = new RegExp( whitespace + "|>" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			ID: new RegExp( "^#(" + identifier + ")" ),
			CLASS: new RegExp( "^\\.(" + identifier + ")" ),
			TAG: new RegExp( "^(" + identifier + "|[*])" ),
			ATTR: new RegExp( "^" + attributes ),
			PSEUDO: new RegExp( "^" + pseudos ),
			CHILD: new RegExp(
				"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
					whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
					whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			bool: new RegExp( "^(?:" + booleans + ")$", "i" ),

			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			needsContext: new RegExp( "^" + whitespace +
				"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
				"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,

		// CSS escapes
		// https://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace +
			"?|\\\\([^\\r\\n\\f])", "g" ),
		funescape = function( escape, nonHex ) {
			var high = "0x" + escape.slice( 1 ) - 0x10000;

			if ( nonHex ) {

				// Strip the backslash prefix from a non-hex escape sequence
				return nonHex;
			}

			// Replace a hexadecimal escape sequence with the encoded Unicode code point
			// Support: IE <=11+
			// For values outside the Basic Multilingual Plane (BMP), manually construct a
			// surrogate pair
			return high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes; see `setDocument`.
		// Support: IE 9 - 11+, Edge 12 - 18+
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE/Edge.
		unloadHandler = function() {
			setDocument();
		},

		inDisabledFieldset = addCombinator(
			function( elem ) {
				return elem.disabled === true && nodeName( elem, "fieldset" );
			},
			{ dir: "parentNode", next: "legend" }
		);

	// Support: IE <=9 only
	// Accessing document.activeElement can throw unexpectedly
	// https://bugs.jquery.com/ticket/13393
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			( arr = slice.call( preferredDoc.childNodes ) ),
			preferredDoc.childNodes
		);

		// Support: Android <=4.0
		// Detect silently failing push.apply
		// eslint-disable-next-line no-unused-expressions
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = {
			apply: function( target, els ) {
				pushNative.apply( target, slice.call( els ) );
			},
			call: function( target ) {
				pushNative.apply( target, slice.call( arguments, 1 ) );
			}
		};
	}

	function find( selector, context, results, seed ) {
		var m, i, elem, nid, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {
			setDocument( context );
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

					// ID selector
					if ( ( m = match[ 1 ] ) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( ( elem = context.getElementById( m ) ) ) {

								// Support: IE 9 only
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									push.call( results, elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE 9 only
							// getElementById can match elements by name instead of ID
							if ( newContext && ( elem = newContext.getElementById( m ) ) &&
								find.contains( context, elem ) &&
								elem.id === m ) {

								push.call( results, elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[ 2 ] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( ( m = match[ 3 ] ) && context.getElementsByClassName ) {
						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( !nonnativeSelectorCache[ selector + " " ] &&
					( !rbuggyQSA || !rbuggyQSA.test( selector ) ) ) {

					newSelector = selector;
					newContext = context;

					// qSA considers elements outside a scoping root when evaluating child or
					// descendant combinators, which is not what we want.
					// In such cases, we work around the behavior by prefixing every selector in the
					// list with an ID selector referencing the scope context.
					// The technique has to be used as well when a leading combinator is used
					// as such selectors are not recognized by querySelectorAll.
					// Thanks to Andrew Dupont for this technique.
					if ( nodeType === 1 &&
						( rdescend.test( selector ) || rleadingCombinator.test( selector ) ) ) {

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;

						// We can use :scope instead of the ID hack if the browser
						// supports it & if we're not changing the context.
						// Support: IE 11+, Edge 17 - 18+
						// IE/Edge sometimes throw a "Permission denied" error when
						// strict-comparing two documents; shallow comparisons work.
						// eslint-disable-next-line eqeqeq
						if ( newContext != context || !support.scope ) {

							// Capture the context ID, setting it first if necessary
							if ( ( nid = context.getAttribute( "id" ) ) ) {
								nid = jQuery.escapeSelector( nid );
							} else {
								context.setAttribute( "id", ( nid = expando ) );
							}
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						while ( i-- ) {
							groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
								toSelector( groups[ i ] );
						}
						newSelector = groups.join( "," );
					}

					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
						nonnativeSelectorCache( selector, true );
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrimCSS, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {

			// Use (key + " ") to avoid collision with native prototype properties
			// (see https://github.com/jquery/sizzle/issues/157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {

				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return ( cache[ key + " " ] = value );
		}
		return cache;
	}

	/**
	 * Mark a function for special use by jQuery selector module
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created element and returns a boolean result
	 */
	function assert( fn ) {
		var el = document.createElement( "fieldset" );

		try {
			return !!fn( el );
		} catch ( e ) {
			return false;
		} finally {

			// Remove from its parent by default
			if ( el.parentNode ) {
				el.parentNode.removeChild( el );
			}

			// release memory in IE
			el = null;
		}
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			return nodeName( elem, "input" ) && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			return ( nodeName( elem, "input" ) || nodeName( elem, "button" ) ) &&
				elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for :enabled/:disabled
	 * @param {Boolean} disabled true for :disabled; false for :enabled
	 */
	function createDisabledPseudo( disabled ) {

		// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
		return function( elem ) {

			// Only certain elements can match :enabled or :disabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
			if ( "form" in elem ) {

				// Check for inherited disabledness on relevant non-disabled elements:
				// * listed form-associated elements in a disabled fieldset
				//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
				// * option elements in a disabled optgroup
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
				// All such elements have a "form" property.
				if ( elem.parentNode && elem.disabled === false ) {

					// Option elements defer to a parent optgroup if present
					if ( "label" in elem ) {
						if ( "label" in elem.parentNode ) {
							return elem.parentNode.disabled === disabled;
						} else {
							return elem.disabled === disabled;
						}
					}

					// Support: IE 6 - 11+
					// Use the isDisabled shortcut property to check for disabled fieldset ancestors
					return elem.isDisabled === disabled ||

						// Where there is no isDisabled, check manually
						elem.isDisabled !== !disabled &&
							inDisabledFieldset( elem ) === disabled;
				}

				return elem.disabled === disabled;

			// Try to winnow out elements that can't be disabled before trusting the disabled property.
			// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
			// even exist on them, let alone have a boolean value.
			} else if ( "label" in elem ) {
				return elem.disabled === disabled;
			}

			// Remaining elements are neither :enabled nor :disabled
			return false;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction( function( argument ) {
			argument = +argument;
			return markFunction( function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
						seed[ j ] = !( matches[ j ] = seed[ j ] );
					}
				}
			} );
		} );
	}

	/**
	 * Checks a node for validity as a jQuery selector context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [node] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	function setDocument( node ) {
		var subWindow,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		documentElement = document.documentElement;
		documentIsHTML = !jQuery.isXMLDoc( document );

		// Support: iOS 7 only, IE 9 - 11+
		// Older browsers didn't support unprefixed `matches`.
		matches = documentElement.matches ||
			documentElement.webkitMatchesSelector ||
			documentElement.msMatchesSelector;

		// Support: IE 9 - 11+, Edge 12 - 18+
		// Accessing iframe documents after unload throws "permission denied" errors
		// (see trac-13936).
		// Limit the fix to IE & Edge Legacy; despite Edge 15+ implementing `matches`,
		// all IE 9+ and Edge Legacy versions implement `msMatchesSelector` as well.
		if ( documentElement.msMatchesSelector &&

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			preferredDoc != document &&
			( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

			// Support: IE 9 - 11+, Edge 12 - 18+
			subWindow.addEventListener( "unload", unloadHandler );
		}

		// Support: IE <10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programmatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert( function( el ) {
			documentElement.appendChild( el ).id = jQuery.expando;
			return !document.getElementsByName ||
				!document.getElementsByName( jQuery.expando ).length;
		} );

		// Support: IE 9 only
		// Check to see if it's possible to do matchesSelector
		// on a disconnected node.
		support.disconnectedMatch = assert( function( el ) {
			return matches.call( el, "*" );
		} );

		// Support: IE 9 - 11+, Edge 12 - 18+
		// IE/Edge don't support the :scope pseudo-class.
		support.scope = assert( function() {
			return document.querySelectorAll( ":scope" );
		} );

		// Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
		// Make sure the `:has()` argument is parsed unforgivingly.
		// We include `*` in the test to detect buggy implementations that are
		// _selectively_ forgiving (specifically when the list includes at least
		// one valid selector).
		// Note that we treat complete lack of support for `:has()` as if it were
		// spec-compliant support, which is fine because use of `:has()` in such
		// environments will fail in the qSA path and fall back to jQuery traversal
		// anyway.
		support.cssHas = assert( function() {
			try {
				document.querySelector( ":has(*,:jqfake)" );
				return false;
			} catch ( e ) {
				return true;
			}
		} );

		// ID filter and find
		if ( support.getById ) {
			Expr.filter.ID = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute( "id" ) === attrId;
				};
			};
			Expr.find.ID = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var elem = context.getElementById( id );
					return elem ? [ elem ] : [];
				}
			};
		} else {
			Expr.filter.ID =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode( "id" );
					return node && node.value === attrId;
				};
			};

			// Support: IE 6 - 7 only
			// getElementById is not reliable as a find shortcut
			Expr.find.ID = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var node, i, elems,
						elem = context.getElementById( id );

					if ( elem ) {

						// Verify the id attribute
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}

						// Fall back on getElementsByName
						elems = context.getElementsByName( id );
						i = 0;
						while ( ( elem = elems[ i++ ] ) ) {
							node = elem.getAttributeNode( "id" );
							if ( node && node.value === id ) {
								return [ elem ];
							}
						}
					}

					return [];
				}
			};
		}

		// Tag
		Expr.find.TAG = function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else {
				return context.querySelectorAll( tag );
			}
		};

		// Class
		Expr.find.CLASS = function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		rbuggyQSA = [];

		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert( function( el ) {

			var input;

			documentElement.appendChild( el ).innerHTML =
				"<a id='" + expando + "' href='' disabled='disabled'></a>" +
				"<select id='" + expando + "-\r\\' disabled='disabled'>" +
				"<option selected=''></option></select>";

			// Support: iOS <=7 - 8 only
			// Boolean attributes and "value" are not treated correctly in some XML documents
			if ( !el.querySelectorAll( "[selected]" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: iOS <=7 - 8 only
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push( "~=" );
			}

			// Support: iOS 8 only
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push( ".#.+[+~]" );
			}

			// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
			// In some of the document kinds, these selectors wouldn't work natively.
			// This is probably OK but for backwards compatibility we want to maintain
			// handling them through jQuery traversal in jQuery 3.x.
			if ( !el.querySelectorAll( ":checked" ).length ) {
				rbuggyQSA.push( ":checked" );
			}

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			input = document.createElement( "input" );
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE 9 - 11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
			// In some of the document kinds, these selectors wouldn't work natively.
			// This is probably OK but for backwards compatibility we want to maintain
			// handling them through jQuery traversal in jQuery 3.x.
			documentElement.appendChild( el ).disabled = true;
			if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE 11+, Edge 15 - 18+
			// IE 11/Edge don't find elements on a `[name='']` query in some cases.
			// Adding a temporary attribute to the document before the selection works
			// around the issue.
			// Interestingly, IE 10 & older don't seem to have the issue.
			input = document.createElement( "input" );
			input.setAttribute( "name", "" );
			el.appendChild( input );
			if ( !el.querySelectorAll( "[name='']" ).length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
					whitespace + "*(?:''|\"\")" );
			}
		} );

		if ( !support.cssHas ) {

			// Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
			// Our regular `try-catch` mechanism fails to detect natively-unsupported
			// pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
			// in browsers that parse the `:has()` argument as a forgiving selector list.
			// https://drafts.csswg.org/selectors/#relational now requires the argument
			// to be parsed unforgivingly, but browsers have not yet fully adjusted.
			rbuggyQSA.push( ":has" );
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

				// Choose the first element that is related to our preferred document
				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				if ( a === document || a.ownerDocument == preferredDoc &&
					find.contains( preferredDoc, a ) ) {
					return -1;
				}

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				if ( b === document || b.ownerDocument == preferredDoc &&
					find.contains( preferredDoc, b ) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		};

		return document;
	}

	find.matches = function( expr, elements ) {
		return find( expr, null, null, elements );
	};

	find.matchesSelector = function( elem, expr ) {
		setDocument( elem );

		if ( documentIsHTML &&
			!nonnativeSelectorCache[ expr + " " ] &&
			( !rbuggyQSA || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||

						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch ( e ) {
				nonnativeSelectorCache( expr, true );
			}
		}

		return find( expr, document, null, [ elem ] ).length > 0;
	};

	find.contains = function( context, elem ) {

		// Set document vars if needed
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		if ( ( context.ownerDocument || context ) != document ) {
			setDocument( context );
		}
		return jQuery.contains( context, elem );
	};


	find.attr = function( elem, name ) {

		// Set document vars if needed
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		if ( ( elem.ownerDocument || elem ) != document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],

			// Don't get fooled by Object.prototype properties (see trac-13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		if ( val !== undefined ) {
			return val;
		}

		return elem.getAttribute( name );
	};

	find.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	jQuery.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		//
		// Support: Android <=4.0+
		// Testing for detecting duplicates is unpredictable so instead assume we can't
		// depend on duplicate detection in all browsers without a stable sort.
		hasDuplicate = !support.sortStable;
		sortInput = !support.sortStable && slice.call( results, 0 );
		sort.call( results, sortOrder );

		if ( hasDuplicate ) {
			while ( ( elem = results[ i++ ] ) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				splice.call( results, duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	jQuery.fn.uniqueSort = function() {
		return this.pushStack( jQuery.uniqueSort( slice.apply( this ) ) );
	};

	Expr = jQuery.expr = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			ATTR: function( match ) {
				match[ 1 ] = match[ 1 ].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[ 3 ] = ( match[ 3 ] || match[ 4 ] || match[ 5 ] || "" )
					.replace( runescape, funescape );

				if ( match[ 2 ] === "~=" ) {
					match[ 3 ] = " " + match[ 3 ] + " ";
				}

				return match.slice( 0, 4 );
			},

			CHILD: function( match ) {

				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[ 1 ] = match[ 1 ].toLowerCase();

				if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

					// nth-* requires argument
					if ( !match[ 3 ] ) {
						find.error( match[ 0 ] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[ 4 ] = +( match[ 4 ] ?
						match[ 5 ] + ( match[ 6 ] || 1 ) :
						2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" )
					);
					match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

				// other types prohibit arguments
				} else if ( match[ 3 ] ) {
					find.error( match[ 0 ] );
				}

				return match;
			},

			PSEUDO: function( match ) {
				var excess,
					unquoted = !match[ 6 ] && match[ 2 ];

				if ( matchExpr.CHILD.test( match[ 0 ] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[ 3 ] ) {
					match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&

					// Get excess from tokenize (recursively)
					( excess = tokenize( unquoted, true ) ) &&

					// advance to the next closing parenthesis
					( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

					// excess is a negative index
					match[ 0 ] = match[ 0 ].slice( 0, excess );
					match[ 2 ] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			TAG: function( nodeNameSelector ) {
				var expectedNodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() {
						return true;
					} :
					function( elem ) {
						return nodeName( elem, expectedNodeName );
					};
			},

			CLASS: function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					( pattern = new RegExp( "(^|" + whitespace + ")" + className +
						"(" + whitespace + "|$)" ) ) &&
					classCache( className, function( elem ) {
						return pattern.test(
							typeof elem.className === "string" && elem.className ||
								typeof elem.getAttribute !== "undefined" &&
									elem.getAttribute( "class" ) ||
								""
						);
					} );
			},

			ATTR: function( name, operator, check ) {
				return function( elem ) {
					var result = find.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					if ( operator === "=" ) {
						return result === check;
					}
					if ( operator === "!=" ) {
						return result !== check;
					}
					if ( operator === "^=" ) {
						return check && result.indexOf( check ) === 0;
					}
					if ( operator === "*=" ) {
						return check && result.indexOf( check ) > -1;
					}
					if ( operator === "$=" ) {
						return check && result.slice( -check.length ) === check;
					}
					if ( operator === "~=" ) {
						return ( " " + result.replace( rwhitespace, " " ) + " " )
							.indexOf( check ) > -1;
					}
					if ( operator === "|=" ) {
						return result === check || result.slice( 0, check.length + 1 ) === check + "-";
					}

					return false;
				};
			},

			CHILD: function( type, what, _argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, _context, xml ) {
						var cache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( ( node = node[ dir ] ) ) {
										if ( ofType ?
											nodeName( node, name ) :
											node.nodeType === 1 ) {

											return false;
										}
									}

									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {

								// Seek `elem` from a previously-cached index
								outerCache = parent[ expando ] || ( parent[ expando ] = {} );
								cache = outerCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( ( node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										outerCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {

								// Use previously-cached element index if available
								if ( useCache ) {
									outerCache = elem[ expando ] || ( elem[ expando ] = {} );
									cache = outerCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {

									// Use the same loop as above to seek `elem` from the start
									while ( ( node = ++nodeIndex && node && node[ dir ] ||
										( diff = nodeIndex = 0 ) || start.pop() ) ) {

										if ( ( ofType ?
											nodeName( node, name ) :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] ||
													( node[ expando ] = {} );
												outerCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			PSEUDO: function( pseudo, argument ) {

				// pseudo-class names are case-insensitive
				// https://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						find.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as jQuery does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction( function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf.call( seed, matched[ i ] );
								seed[ idx ] = !( matches[ idx ] = matched[ i ] );
							}
						} ) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {

			// Potentially complex pseudos
			not: markFunction( function( selector ) {

				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrimCSS, "$1" ) );

				return matcher[ expando ] ?
					markFunction( function( seed, matches, _context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( ( elem = unmatched[ i ] ) ) {
								seed[ i ] = !( matches[ i ] = elem );
							}
						}
					} ) :
					function( elem, _context, xml ) {
						input[ 0 ] = elem;
						matcher( input, null, xml, results );

						// Don't keep the element
						// (see https://github.com/jquery/sizzle/issues/299)
						input[ 0 ] = null;
						return !results.pop();
					};
			} ),

			has: markFunction( function( selector ) {
				return function( elem ) {
					return find( selector, elem ).length > 0;
				};
			} ),

			contains: markFunction( function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || jQuery.text( elem ) ).indexOf( text ) > -1;
				};
			} ),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// https://www.w3.org/TR/selectors/#lang-pseudo
			lang: markFunction( function( lang ) {

				// lang value must be a valid identifier
				if ( !ridentifier.test( lang || "" ) ) {
					find.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( ( elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
					return false;
				};
			} ),

			// Miscellaneous
			target: function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			root: function( elem ) {
				return elem === documentElement;
			},

			focus: function( elem ) {
				return elem === safeActiveElement() &&
					document.hasFocus() &&
					!!( elem.type || elem.href || ~elem.tabIndex );
			},

			// Boolean properties
			enabled: createDisabledPseudo( false ),
			disabled: createDisabledPseudo( true ),

			checked: function( elem ) {

				// In CSS3, :checked should return both checked and selected elements
				// https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				return ( nodeName( elem, "input" ) && !!elem.checked ) ||
					( nodeName( elem, "option" ) && !!elem.selected );
			},

			selected: function( elem ) {

				// Support: IE <=11+
				// Accessing the selectedIndex property
				// forces the browser to treat the default option as
				// selected when in an optgroup.
				if ( elem.parentNode ) {
					// eslint-disable-next-line no-unused-expressions
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			empty: function( elem ) {

				// https://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			parent: function( elem ) {
				return !Expr.pseudos.empty( elem );
			},

			// Element/input types
			header: function( elem ) {
				return rheader.test( elem.nodeName );
			},

			input: function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			button: function( elem ) {
				return nodeName( elem, "input" ) && elem.type === "button" ||
					nodeName( elem, "button" );
			},

			text: function( elem ) {
				var attr;
				return nodeName( elem, "input" ) && elem.type === "text" &&

					// Support: IE <10 only
					// New HTML5 attribute values (e.g., "search") appear
					// with elem.type === "text"
					( ( attr = elem.getAttribute( "type" ) ) == null ||
						attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			first: createPositionalPseudo( function() {
				return [ 0 ];
			} ),

			last: createPositionalPseudo( function( _matchIndexes, length ) {
				return [ length - 1 ];
			} ),

			eq: createPositionalPseudo( function( _matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			} ),

			even: createPositionalPseudo( function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			} ),

			odd: createPositionalPseudo( function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			} ),

			lt: createPositionalPseudo( function( matchIndexes, length, argument ) {
				var i;

				if ( argument < 0 ) {
					i = argument + length;
				} else if ( argument > length ) {
					i = length;
				} else {
					i = argument;
				}

				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			} ),

			gt: createPositionalPseudo( function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			} )
		}
	};

	Expr.pseudos.nth = Expr.pseudos.eq;

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	function tokenize( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
				if ( match ) {

					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[ 0 ].length ) || soFar;
				}
				groups.push( ( tokens = [] ) );
			}

			matched = false;

			// Combinators
			if ( ( match = rleadingCombinator.exec( soFar ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,

					// Cast descendant combinators to space
					type: match[ 0 ].replace( rtrimCSS, " " )
				} );
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
					( match = preFilters[ type ]( match ) ) ) ) {
					matched = match.shift();
					tokens.push( {
						value: matched,
						type: type,
						matches: match
					} );
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		if ( parseOnly ) {
			return soFar.length;
		}

		return soFar ?
			find.error( selector ) :

			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
	}

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[ i ].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			skip = combinator.next,
			key = skip || dir,
			checkNonElements = base && key === "parentNode",
			doneName = done++;

		return combinator.first ?

			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
				return false;
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( ( elem = elem[ dir ] ) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( ( elem = elem[ dir ] ) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || ( elem[ expando ] = {} );

							if ( skip && nodeName( elem, skip ) ) {
								elem = elem[ dir ] || elem;
							} else if ( ( oldCache = outerCache[ key ] ) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return ( newCache[ 2 ] = oldCache[ 2 ] );
							} else {

								// Reuse newcache so results back-propagate to previous elements
								outerCache[ key ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
									return true;
								}
							}
						}
					}
				}
				return false;
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[ i ]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[ 0 ];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			find( selector, contexts[ i ], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( ( elem = unmatched[ i ] ) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction( function( seed, results, context, xml ) {
			var temp, i, elem, matcherOut,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed ||
					multipleContexts( selector || "*",
						context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems;

			if ( matcher ) {

				// If we have a postFinder, or filtered seed, or non-seed postFilter
				// or preexisting results,
				matcherOut = postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results;

				// Find primary matches
				matcher( matcherIn, matcherOut, context, xml );
			} else {
				matcherOut = matcherIn;
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( ( elem = temp[ i ] ) ) {
						matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {

						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( ( elem = matcherOut[ i ] ) ) {

								// Restore matcherIn since elem is not yet a final match
								temp.push( ( matcherIn[ i ] = elem ) );
							}
						}
						postFinder( null, ( matcherOut = [] ), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) &&
							( temp = postFinder ? indexOf.call( seed, elem ) : preMap[ i ] ) > -1 ) {

							seed[ temp ] = !( results[ temp ] = elem );
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		} );
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[ 0 ].type ],
			implicitRelative = leadingRelative || Expr.relative[ " " ],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf.call( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				var ret = ( !leadingRelative && ( xml || context != outermostContext ) ) || (
					( checkContext = context ).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );

				// Avoid hanging onto element
				// (see https://github.com/jquery/sizzle/issues/299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
				matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
			} else {
				matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {

					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[ j ].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(

							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 )
								.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
						).replace( rtrimCSS, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,

					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find.TAG( "*", outermost ),

					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
					len = elems.length;

				if ( outermost ) {

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					outermostContext = context == document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: iOS <=7 - 9 only
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching
				// elements by id. (see trac-14142)
				for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;

						// Support: IE 11+, Edge 17 - 18+
						// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
						// two documents; shallow comparisons work.
						// eslint-disable-next-line eqeqeq
						if ( !context && elem.ownerDocument != document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( ( matcher = elementMatchers[ j++ ] ) ) {
							if ( matcher( elem, context || document, xml ) ) {
								push.call( results, elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {

						// They will have gone through all possible matchers
						if ( ( elem = !matcher && elem ) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( ( matcher = setMatchers[ j++ ] ) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {

						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
									setMatched[ i ] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						jQuery.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	function compile( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {

			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[ i ] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector,
				matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	}

	/**
	 * A low-level selection function that works with jQuery's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with jQuery selector compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	function select( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( ( selector = compiled.selector || selector ) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[ 0 ] = match[ 0 ].slice( 0 );
			if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
					context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

				context = ( Expr.find.ID(
					token.matches[ 0 ].replace( runescape, funescape ),
					context
				) || [] )[ 0 ];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr.needsContext.test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[ i ];

				// Abort if we hit a combinator
				if ( Expr.relative[ ( type = token.type ) ] ) {
					break;
				}
				if ( ( find = Expr.find[ type ] ) ) {

					// Search, expanding context for leading sibling combinators
					if ( ( seed = find(
						token.matches[ 0 ].replace( runescape, funescape ),
						rsibling.test( tokens[ 0 ].type ) &&
							testContext( context.parentNode ) || context
					) ) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	}

	// One-time assignments

	// Support: Android <=4.0 - 4.1+
	// Sort stability
	support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

	// Initialize against the default document
	setDocument();

	// Support: Android <=4.0 - 4.1+
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert( function( el ) {

		// Should return 1, but returns 4 (following)
		return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
	} );

	jQuery.find = find;

	// Deprecated
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.unique = jQuery.uniqueSort;

	// These have always been private, but they used to be documented as part of
	// Sizzle so let's maintain them for now for backwards compatibility purposes.
	find.compile = compile;
	find.select = select;
	find.setDocument = setDocument;
	find.tokenize = tokenize;

	find.escape = jQuery.escapeSelector;
	find.getText = jQuery.text;
	find.isXML = jQuery.isXMLDoc;
	find.selectors = jQuery.expr;
	find.support = jQuery.support;
	find.uniqueSort = jQuery.uniqueSort;

		/* eslint-enable */

	} )();


	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				return !!qualifier.call( elem, i, elem ) !== not;
			} );
		}

		// Single element
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );
		}

		// Arraylike of elements (jQuery, arguments, Array)
		if ( typeof qualifier !== "string" ) {
			return jQuery.grep( elements, function( elem ) {
				return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
			} );
		}

		// Filtered directly for both simple and complex selectors
		return jQuery.filter( qualifier, elements, not );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		if ( elems.length === 1 && elem.nodeType === 1 ) {
			return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
		}

		return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i, ret,
				len = this.length,
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			ret = this.pushStack( [] );

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			return len > 1 ? jQuery.uniqueSort( ret ) : ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
		// Strict HTML recognition (trac-11290: must start with <)
		// Shortcut simple #id case for speed
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {

								// Properties of context are called as methods if possible
								if ( isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );

						if ( elem ) {

							// Inject the element directly into the jQuery object
							this[ 0 ] = elem;
							this.length = 1;
						}
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				targets = typeof selectors !== "string" && jQuery( selectors );

			// Positional selectors never match, since there's no _selection_ context
			if ( !rneedsContext.test( selectors ) ) {
				for ( ; i < l; i++ ) {
					for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

						// Always skip document fragments
						if ( cur.nodeType < 11 && ( targets ?
							targets.index( cur ) > -1 :

							// Don't pass non-elements to jQuery#find
							cur.nodeType === 1 &&
								jQuery.find.matchesSelector( cur, selectors ) ) ) {

							matched.push( cur );
							break;
						}
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, _i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, _i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, _i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			if ( elem.contentDocument != null &&

				// Support: IE 11+
				// <object> elements with no `data` attribute has an object
				// `contentDocument` with a `null` prototype.
				getProto( elem.contentDocument ) ) {

				return elem.contentDocument;
			}

			// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
			// Treat the template element as a regular one in browsers that
			// don't support it.
			if ( nodeName( elem, "template" ) ) {
				elem = elem.content || elem;
			}

			return jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = locked || options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && toType( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory && !firing ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	function Identity( v ) {
		return v;
	}
	function Thrower( ex ) {
		throw ex;
	}

	function adoptValue( value, resolve, reject, noValue ) {
		var method;

		try {

			// Check for promise aspect first to privilege synchronous behavior
			if ( value && isFunction( ( method = value.promise ) ) ) {
				method.call( value ).done( resolve ).fail( reject );

			// Other thenables
			} else if ( value && isFunction( ( method = value.then ) ) ) {
				method.call( value, resolve, reject );

			// Other non-thenables
			} else {

				// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
				// * false: [ value ].slice( 0 ) => resolve( value )
				// * true: [ value ].slice( 1 ) => resolve()
				resolve.apply( undefined, [ value ].slice( noValue ) );
			}

		// For Promises/A+, convert exceptions into rejections
		// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
		// Deferred#then to conditionally suppress rejection.
		} catch ( value ) {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.apply( undefined, [ value ] );
		}
	}

	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, callbacks,
					// ... .then handlers, argument index, [final state]
					[ "notify", "progress", jQuery.Callbacks( "memory" ),
						jQuery.Callbacks( "memory" ), 2 ],
					[ "resolve", "done", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 0, "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 1, "rejected" ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					"catch": function( fn ) {
						return promise.then( null, fn );
					},

					// Keep pipe for back-compat
					pipe: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;

						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( _i, tuple ) {

								// Map tuples (progress, done, fail) to arguments (done, fail, progress)
								var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

								// deferred.progress(function() { bind to newDefer or newDefer.notify })
								// deferred.done(function() { bind to newDefer or newDefer.resolve })
								// deferred.fail(function() { bind to newDefer or newDefer.reject })
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},
					then: function( onFulfilled, onRejected, onProgress ) {
						var maxDepth = 0;
						function resolve( depth, deferred, handler, special ) {
							return function() {
								var that = this,
									args = arguments,
									mightThrow = function() {
										var returned, then;

										// Support: Promises/A+ section 2.3.3.3.3
										// https://promisesaplus.com/#point-59
										// Ignore double-resolution attempts
										if ( depth < maxDepth ) {
											return;
										}

										returned = handler.apply( that, args );

										// Support: Promises/A+ section 2.3.1
										// https://promisesaplus.com/#point-48
										if ( returned === deferred.promise() ) {
											throw new TypeError( "Thenable self-resolution" );
										}

										// Support: Promises/A+ sections 2.3.3.1, 3.5
										// https://promisesaplus.com/#point-54
										// https://promisesaplus.com/#point-75
										// Retrieve `then` only once
										then = returned &&

											// Support: Promises/A+ section 2.3.4
											// https://promisesaplus.com/#point-64
											// Only check objects and functions for thenability
											( typeof returned === "object" ||
												typeof returned === "function" ) &&
											returned.then;

										// Handle a returned thenable
										if ( isFunction( then ) ) {

											// Special processors (notify) just wait for resolution
											if ( special ) {
												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special )
												);

											// Normal processors (resolve) also hook into progress
											} else {

												// ...and disregard older resolution values
												maxDepth++;

												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special ),
													resolve( maxDepth, deferred, Identity,
														deferred.notifyWith )
												);
											}

										// Handle all other returned values
										} else {

											// Only substitute handlers pass on context
											// and multiple values (non-spec behavior)
											if ( handler !== Identity ) {
												that = undefined;
												args = [ returned ];
											}

											// Process the value(s)
											// Default process is resolve
											( special || deferred.resolveWith )( that, args );
										}
									},

									// Only normal processors (resolve) catch and reject exceptions
									process = special ?
										mightThrow :
										function() {
											try {
												mightThrow();
											} catch ( e ) {

												if ( jQuery.Deferred.exceptionHook ) {
													jQuery.Deferred.exceptionHook( e,
														process.error );
												}

												// Support: Promises/A+ section 2.3.3.3.4.1
												// https://promisesaplus.com/#point-61
												// Ignore post-resolution exceptions
												if ( depth + 1 >= maxDepth ) {

													// Only substitute handlers pass on context
													// and multiple values (non-spec behavior)
													if ( handler !== Thrower ) {
														that = undefined;
														args = [ e ];
													}

													deferred.rejectWith( that, args );
												}
											}
										};

								// Support: Promises/A+ section 2.3.3.3.1
								// https://promisesaplus.com/#point-57
								// Re-resolve promises immediately to dodge false rejection from
								// subsequent errors
								if ( depth ) {
									process();
								} else {

									// Call an optional hook to record the error, in case of exception
									// since it's otherwise lost when execution goes async
									if ( jQuery.Deferred.getErrorHook ) {
										process.error = jQuery.Deferred.getErrorHook();

									// The deprecated alias of the above. While the name suggests
									// returning the stack, not an error instance, jQuery just passes
									// it directly to `console.warn` so both will work; an instance
									// just better cooperates with source maps.
									} else if ( jQuery.Deferred.getStackHook ) {
										process.error = jQuery.Deferred.getStackHook();
									}
									window.setTimeout( process );
								}
							};
						}

						return jQuery.Deferred( function( newDefer ) {

							// progress_handlers.add( ... )
							tuples[ 0 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									isFunction( onProgress ) ?
										onProgress :
										Identity,
									newDefer.notifyWith
								)
							);

							// fulfilled_handlers.add( ... )
							tuples[ 1 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									isFunction( onFulfilled ) ?
										onFulfilled :
										Identity
								)
							);

							// rejected_handlers.add( ... )
							tuples[ 2 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									isFunction( onRejected ) ?
										onRejected :
										Thrower
								)
							);
						} ).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 5 ];

				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add(
						function() {

							// state = "resolved" (i.e., fulfilled)
							// state = "rejected"
							state = stateString;
						},

						// rejected_callbacks.disable
						// fulfilled_callbacks.disable
						tuples[ 3 - i ][ 2 ].disable,

						// rejected_handlers.disable
						// fulfilled_handlers.disable
						tuples[ 3 - i ][ 3 ].disable,

						// progress_callbacks.lock
						tuples[ 0 ][ 2 ].lock,

						// progress_handlers.lock
						tuples[ 0 ][ 3 ].lock
					);
				}

				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add( tuple[ 3 ].fire );

				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
					return this;
				};

				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( singleValue ) {
			var

				// count of uncompleted subordinates
				remaining = arguments.length,

				// count of unprocessed arguments
				i = remaining,

				// subordinate fulfillment data
				resolveContexts = Array( i ),
				resolveValues = slice.call( arguments ),

				// the primary Deferred
				primary = jQuery.Deferred(),

				// subordinate callback factory
				updateFunc = function( i ) {
					return function( value ) {
						resolveContexts[ i ] = this;
						resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( !( --remaining ) ) {
							primary.resolveWith( resolveContexts, resolveValues );
						}
					};
				};

			// Single- and empty arguments are adopted like Promise.resolve
			if ( remaining <= 1 ) {
				adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
					!remaining );

				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if ( primary.state() === "pending" ||
					isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

					return primary.then();
				}
			}

			// Multiple arguments are aggregated like Promise.all array elements
			while ( i-- ) {
				adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
			}

			return primary.promise();
		}
	} );


	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

	// If `jQuery.Deferred.getErrorHook` is defined, `asyncError` is an error
	// captured before the async barrier to get the original error cause
	// which may otherwise be hidden.
	jQuery.Deferred.exceptionHook = function( error, asyncError ) {

		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
			window.console.warn( "jQuery.Deferred exception: " + error.message,
				error.stack, asyncError );
		}
	};




	jQuery.readyException = function( error ) {
		window.setTimeout( function() {
			throw error;
		} );
	};




	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();

	jQuery.fn.ready = function( fn ) {

		readyList
			.then( fn )

			// Wrap jQuery.readyException in a function so that the lookup
			// happens at the time of error handling instead of callback
			// registration.
			.catch( function( error ) {
				jQuery.readyException( error );
			} );

		return this;
	};

	jQuery.extend( {

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See trac-6781
		readyWait: 1,

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
		}
	} );

	jQuery.ready.then = readyList.then;

	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if ( document.readyState === "complete" ||
		( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout( jQuery.ready );

	} else {

		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", completed );

		// A fallback to window.onload, that will always work
		window.addEventListener( "load", completed );
	}




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( toType( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {

				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, _key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
							value :
							value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		if ( chainable ) {
			return elems;
		}

		// Gets
		if ( bulk ) {
			return fn.call( elems );
		}

		return len ? fn( elems[ 0 ], key ) : emptyGet;
	};


	// Matches dashed string for camelizing
	var rmsPrefix = /^-ms-/,
		rdashAlpha = /-([a-z])/g;

	// Used by camelCase as callback to replace()
	function fcamelCase( _all, letter ) {
		return letter.toUpperCase();
	}

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 15
	// Microsoft forgot to hump their vendor prefix (trac-9572)
	function camelCase( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	}
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		cache: function( owner ) {

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see trac-8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if ( typeof data === "string" ) {
				cache[ camelCase( data ) ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ camelCase( prop ) ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :

				// Always use camelCase key (gh-2257)
				owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
		},
		access: function( owner, key, value ) {

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				return this.get( owner, key );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key !== undefined ) {

				// Support array or space separated string of keys
				if ( Array.isArray( key ) ) {

					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map( camelCase );
				} else {
					key = camelCase( key );

					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ?
						[ key ] :
						( key.match( rnothtmlwhite ) || [] );
				}

				i = key.length;

				while ( i-- ) {
					delete cache[ key[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function getData( data ) {
		if ( data === "true" ) {
			return true;
		}

		if ( data === "false" ) {
			return false;
		}

		if ( data === "null" ) {
			return null;
		}

		// Only convert to a number if it doesn't change the string
		if ( data === +data + "" ) {
			return +data;
		}

		if ( rbrace.test( data ) ) {
			return JSON.parse( data );
		}

		return data;
	}

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = getData( data );
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE 11 only
							// The attrs elements can be null (trac-14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each( function() {

					// We always store the camelCased key
					dataUser.set( this, key, value );
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || Array.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var documentElement = document.documentElement;



		var isAttached = function( elem ) {
				return jQuery.contains( elem.ownerDocument, elem );
			},
			composed = { composed: true };

		// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
		// Check attachment across shadow DOM boundaries when possible (gh-3504)
		// Support: iOS 10.0-10.2 only
		// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
		// leading to errors. We need to check for `getRootNode`.
		if ( documentElement.getRootNode ) {
			isAttached = function( elem ) {
				return jQuery.contains( elem.ownerDocument, elem ) ||
					elem.getRootNode( composed ) === elem.ownerDocument;
			};
		}
	var isHiddenWithinTree = function( elem, el ) {

			// isHiddenWithinTree might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;

			// Inline style trumps all
			return elem.style.display === "none" ||
				elem.style.display === "" &&

				// Otherwise, check computed style
				// Support: Firefox <=43 - 45
				// Disconnected elements can have computed display: none, so first confirm that elem is
				// in the document.
				isAttached( elem ) &&

				jQuery.css( elem, "display" ) === "none";
		};



	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted, scale,
			maxIterations = 20,
			currentValue = tween ?
				function() {
					return tween.cur();
				} :
				function() {
					return jQuery.css( elem, prop, "" );
				},
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = elem.nodeType &&
				( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Support: Firefox <=54
			// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
			initial = initial / 2;

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			while ( maxIterations-- ) {

				// Evaluate and update our best guess (doubling guesses that zero out).
				// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
				jQuery.style( elem, prop, initialInUnit + unit );
				if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
					maxIterations = 0;
				}
				initialInUnit = initialInUnit / scale;

			}

			initialInUnit = initialInUnit * 2;
			jQuery.style( elem, prop, initialInUnit + unit );

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}


	var defaultDisplayMap = {};

	function getDefaultDisplay( elem ) {
		var temp,
			doc = elem.ownerDocument,
			nodeName = elem.nodeName,
			display = defaultDisplayMap[ nodeName ];

		if ( display ) {
			return display;
		}

		temp = doc.body.appendChild( doc.createElement( nodeName ) );
		display = jQuery.css( temp, "display" );

		temp.parentNode.removeChild( temp );

		if ( display === "none" ) {
			display = "block";
		}
		defaultDisplayMap[ nodeName ] = display;

		return display;
	}

	function showHide( elements, show ) {
		var display, elem,
			values = [],
			index = 0,
			length = elements.length;

		// Determine new display value for elements that need to change
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			display = elem.style.display;
			if ( show ) {

				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if ( display === "none" ) {
					values[ index ] = dataPriv.get( elem, "display" ) || null;
					if ( !values[ index ] ) {
						elem.style.display = "";
					}
				}
				if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
					values[ index ] = getDefaultDisplay( elem );
				}
			} else {
				if ( display !== "none" ) {
					values[ index ] = "none";

					// Remember what we're overwriting
					dataPriv.set( elem, "display", display );
				}
			}
		}

		// Set the display of the elements in a second loop to avoid constant reflow
		for ( index = 0; index < length; index++ ) {
			if ( values[ index ] != null ) {
				elements[ index ].style.display = values[ index ];
			}
		}

		return elements;
	}

	jQuery.fn.extend( {
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHiddenWithinTree( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

	var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (trac-11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (trac-14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

		// Support: IE <=9 only
		// IE <=9 replaces <option> tags with their contents when inserted outside of
		// the select element.
		div.innerHTML = "<option></option>";
		support.option = !!div.lastChild;
	} )();


	// We have to close these tags to support XHTML (trac-13200)
	var wrapMap = {

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	// Support: IE <=9 only
	if ( !support.option ) {
		wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
	}


	function getAll( context, tag ) {

		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
		var ret;

		if ( typeof context.getElementsByTagName !== "undefined" ) {
			ret = context.getElementsByTagName( tag || "*" );

		} else if ( typeof context.querySelectorAll !== "undefined" ) {
			ret = context.querySelectorAll( tag || "*" );

		} else {
			ret = [];
		}

		if ( tag === undefined || tag && nodeName( context, tag ) ) {
			return jQuery.merge( [ context ], ret );
		}

		return ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, attached, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( toType( elem ) === "object" ) {

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (trac-12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			attached = isAttached( elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( attached ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}

		if ( data == null && fn == null ) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {

				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

			// Only attach events to objects that accept data
			if ( !acceptData( elem ) ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if ( selector ) {
				jQuery.find.matchesSelector( documentElement, selector );
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = Object.create( null );
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( nativeEvent ) {

			var i, j, ret, matched, handleObj, handlerQueue,
				args = new Array( arguments.length ),

				// Make a writable jQuery.Event from the native event object
				event = jQuery.event.fix( nativeEvent ),

				handlers = (
					dataPriv.get( this, "events" ) || Object.create( null )
				)[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;

			for ( i = 1; i < arguments.length; i++ ) {
				args[ i ] = arguments[ i ];
			}

			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// If the event is namespaced, then each handler is only invoked if it is
					// specially universal or its namespaces are a superset of the event's.
					if ( !event.rnamespace || handleObj.namespace === false ||
						event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, handleObj, sel, matchedHandlers, matchedSelectors,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Find delegate handlers
			if ( delegateCount &&

				// Support: IE <=9
				// Black-hole SVG <use> instance trees (trac-13180)
				cur.nodeType &&

				// Support: Firefox <=42
				// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
				// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
				// Support: IE 11 only
				// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
				!( event.type === "click" && event.button >= 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (trac-13208)
					// Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
					if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
						matchedHandlers = [];
						matchedSelectors = {};
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (trac-13203)
							sel = handleObj.selector + " ";

							if ( matchedSelectors[ sel ] === undefined ) {
								matchedSelectors[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matchedSelectors[ sel ] ) {
								matchedHandlers.push( handleObj );
							}
						}
						if ( matchedHandlers.length ) {
							handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			cur = this;
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		addProp: function( name, hook ) {
			Object.defineProperty( jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,

				get: isFunction( hook ) ?
					function() {
						if ( this.originalEvent ) {
							return hook( this.originalEvent );
						}
					} :
					function() {
						if ( this.originalEvent ) {
							return this.originalEvent[ name ];
						}
					},

				set: function( value ) {
					Object.defineProperty( this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					} );
				}
			} );
		},

		fix: function( originalEvent ) {
			return originalEvent[ jQuery.expando ] ?
				originalEvent :
				new jQuery.Event( originalEvent );
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			click: {

				// Utilize native event to ensure correct state for checkable inputs
				setup: function( data ) {

					// For mutual compressibility with _default, replace `this` access with a local var.
					// `|| data` is dead code meant only to preserve the variable through minification.
					var el = this || data;

					// Claim the first handler
					if ( rcheckableType.test( el.type ) &&
						el.click && nodeName( el, "input" ) ) {

						// dataPriv.set( el, "click", ... )
						leverageNative( el, "click", true );
					}

					// Return false to allow normal processing in the caller
					return false;
				},
				trigger: function( data ) {

					// For mutual compressibility with _default, replace `this` access with a local var.
					// `|| data` is dead code meant only to preserve the variable through minification.
					var el = this || data;

					// Force setup before triggering a click
					if ( rcheckableType.test( el.type ) &&
						el.click && nodeName( el, "input" ) ) {

						leverageNative( el, "click" );
					}

					// Return non-false to allow normal event-path propagation
					return true;
				},

				// For cross-browser consistency, suppress native .click() on links
				// Also prevent it if we're currently inside a leveraged native-event stack
				_default: function( event ) {
					var target = event.target;
					return rcheckableType.test( target.type ) &&
						target.click && nodeName( target, "input" ) &&
						dataPriv.get( target, "click" ) ||
						nodeName( target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	// Ensure the presence of an event listener that handles manually-triggered
	// synthetic events by interrupting progress until reinvoked in response to
	// *native* events that it fires directly, ensuring that state changes have
	// already occurred before other listeners are invoked.
	function leverageNative( el, type, isSetup ) {

		// Missing `isSetup` indicates a trigger call, which must force setup through jQuery.event.add
		if ( !isSetup ) {
			if ( dataPriv.get( el, type ) === undefined ) {
				jQuery.event.add( el, type, returnTrue );
			}
			return;
		}

		// Register the controller as a special universal handler for all event namespaces
		dataPriv.set( el, type, false );
		jQuery.event.add( el, type, {
			namespace: false,
			handler: function( event ) {
				var result,
					saved = dataPriv.get( this, type );

				if ( ( event.isTrigger & 1 ) && this[ type ] ) {

					// Interrupt processing of the outer synthetic .trigger()ed event
					if ( !saved ) {

						// Store arguments for use when handling the inner native event
						// There will always be at least one argument (an event object), so this array
						// will not be confused with a leftover capture object.
						saved = slice.call( arguments );
						dataPriv.set( this, type, saved );

						// Trigger the native event and capture its result
						this[ type ]();
						result = dataPriv.get( this, type );
						dataPriv.set( this, type, false );

						if ( saved !== result ) {

							// Cancel the outer synthetic event
							event.stopImmediatePropagation();
							event.preventDefault();

							return result;
						}

					// If this is an inner synthetic event for an event with a bubbling surrogate
					// (focus or blur), assume that the surrogate already propagated from triggering
					// the native event and prevent that from happening again here.
					// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
					// bubbling surrogate propagates *after* the non-bubbling base), but that seems
					// less bad than duplication.
					} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
						event.stopPropagation();
					}

				// If this is a native event triggered above, everything is now in order
				// Fire an inner synthetic event with the original arguments
				} else if ( saved ) {

					// ...and capture the result
					dataPriv.set( this, type, jQuery.event.trigger(
						saved[ 0 ],
						saved.slice( 1 ),
						this
					) );

					// Abort handling of the native event by all jQuery handlers while allowing
					// native handlers on the same element to run. On target, this is achieved
					// by stopping immediate propagation just on the jQuery event. However,
					// the native event is re-wrapped by a jQuery one on each level of the
					// propagation so the only way to stop it for jQuery is to stop it for
					// everyone via native `stopPropagation()`. This is not a problem for
					// focus/blur which don't bubble, but it does also stop click on checkboxes
					// and radios. We accept this limitation.
					event.stopPropagation();
					event.isImmediatePropagationStopped = returnTrue;
				}
			}
		} );
	}

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android <=2.3 only
					src.returnValue === false ?
				returnTrue :
				returnFalse;

			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (trac-504, trac-13143)
			this.target = ( src.target && src.target.nodeType === 3 ) ?
				src.target.parentNode :
				src.target;

			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || Date.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each( {
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		code: true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,
		which: true
	}, jQuery.event.addProp );

	jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {

		function focusMappedHandler( nativeEvent ) {
			if ( document.documentMode ) {

				// Support: IE 11+
				// Attach a single focusin/focusout handler on the document while someone wants
				// focus/blur. This is because the former are synchronous in IE while the latter
				// are async. In other browsers, all those handlers are invoked synchronously.

				// `handle` from private data would already wrap the event, but we need
				// to change the `type` here.
				var handle = dataPriv.get( this, "handle" ),
					event = jQuery.event.fix( nativeEvent );
				event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
				event.isSimulated = true;

				// First, handle focusin/focusout
				handle( nativeEvent );

				// ...then, handle focus/blur
				//
				// focus/blur don't bubble while focusin/focusout do; simulate the former by only
				// invoking the handler at the lower level.
				if ( event.target === event.currentTarget ) {

					// The setup part calls `leverageNative`, which, in turn, calls
					// `jQuery.event.add`, so event handle will already have been set
					// by this point.
					handle( event );
				}
			} else {

				// For non-IE browsers, attach a single capturing handler on the document
				// while someone wants focusin/focusout.
				jQuery.event.simulate( delegateType, nativeEvent.target,
					jQuery.event.fix( nativeEvent ) );
			}
		}

		jQuery.event.special[ type ] = {

			// Utilize native event if possible so blur/focus sequence is correct
			setup: function() {

				var attaches;

				// Claim the first handler
				// dataPriv.set( this, "focus", ... )
				// dataPriv.set( this, "blur", ... )
				leverageNative( this, type, true );

				if ( document.documentMode ) {

					// Support: IE 9 - 11+
					// We use the same native handler for focusin & focus (and focusout & blur)
					// so we need to coordinate setup & teardown parts between those events.
					// Use `delegateType` as the key as `type` is already used by `leverageNative`.
					attaches = dataPriv.get( this, delegateType );
					if ( !attaches ) {
						this.addEventListener( delegateType, focusMappedHandler );
					}
					dataPriv.set( this, delegateType, ( attaches || 0 ) + 1 );
				} else {

					// Return false to allow normal processing in the caller
					return false;
				}
			},
			trigger: function() {

				// Force setup before trigger
				leverageNative( this, type );

				// Return non-false to allow normal event-path propagation
				return true;
			},

			teardown: function() {
				var attaches;

				if ( document.documentMode ) {
					attaches = dataPriv.get( this, delegateType ) - 1;
					if ( !attaches ) {
						this.removeEventListener( delegateType, focusMappedHandler );
						dataPriv.remove( this, delegateType );
					} else {
						dataPriv.set( this, delegateType, attaches );
					}
				} else {

					// Return false to indicate standard teardown should be applied
					return false;
				}
			},

			// Suppress native focus or blur if we're currently inside
			// a leveraged native-event stack
			_default: function( event ) {
				return dataPriv.get( event.target, type );
			},

			delegateType: delegateType
		};

		// Support: Firefox <=44
		// Firefox doesn't have focus(in | out) events
		// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
		//
		// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
		// focus(in | out) events fire after focus & blur events,
		// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
		// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
		//
		// Support: IE 9 - 11+
		// To preserve relative focusin/focus & focusout/blur event order guaranteed on the 3.x branch,
		// attach a single handler for both events in IE.
		jQuery.event.special[ delegateType ] = {
			setup: function() {

				// Handle: regular nodes (via `this.ownerDocument`), window
				// (via `this.document`) & document (via `this`).
				var doc = this.ownerDocument || this.document || this,
					dataHolder = document.documentMode ? this : doc,
					attaches = dataPriv.get( dataHolder, delegateType );

				// Support: IE 9 - 11+
				// We use the same native handler for focusin & focus (and focusout & blur)
				// so we need to coordinate setup & teardown parts between those events.
				// Use `delegateType` as the key as `type` is already used by `leverageNative`.
				if ( !attaches ) {
					if ( document.documentMode ) {
						this.addEventListener( delegateType, focusMappedHandler );
					} else {
						doc.addEventListener( type, focusMappedHandler, true );
					}
				}
				dataPriv.set( dataHolder, delegateType, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this.document || this,
					dataHolder = document.documentMode ? this : doc,
					attaches = dataPriv.get( dataHolder, delegateType ) - 1;

				if ( !attaches ) {
					if ( document.documentMode ) {
						this.removeEventListener( delegateType, focusMappedHandler );
					} else {
						doc.removeEventListener( type, focusMappedHandler, true );
					}
					dataPriv.remove( dataHolder, delegateType );
				} else {
					dataPriv.set( dataHolder, delegateType, attaches );
				}
			}
		};
	} );

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {

		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {

				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var

		// Support: IE <=10 - 11, Edge 12 - 13 only
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,

		rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

	// Prefer a tbody over its parent table for containing new rows
	function manipulationTarget( elem, content ) {
		if ( nodeName( elem, "table" ) &&
			nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

			return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
			elem.type = elem.type.slice( 5 );
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.get( src );
			events = pdataOld.events;

			if ( events ) {
				dataPriv.remove( dest, "handle events" );

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = flat( args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			valueIsFunction = isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( valueIsFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( valueIsFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (trac-8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Re-enable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl && !node.noModule ) {
									jQuery._evalUrl( node.src, {
										nonce: node.nonce || node.getAttribute( "nonce" )
									}, doc );
								}
							} else {

								// Unwrap a CDATA section containing script contents. This shouldn't be
								// needed as in XML documents they're already not visible when
								// inspecting element contents and in HTML documents they have no
								// meaning but we're preserving that logic for backwards compatibility.
								// This will be removed completely in 4.0. See gh-4904.
								DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && isAttached( node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html;
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = isAttached( elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew jQuery#find here for performance reasons:
				// https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {
		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );
	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var rcustomProp = /^--/;


	var getStyles = function( elem ) {

			// Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view || !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};

	var swap = function( elem, options, callback ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



	( function() {

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {

			// This is a singleton, we need to execute it only once
			if ( !div ) {
				return;
			}

			container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
				"margin-top:1px;padding:0;border:0";
			div.style.cssText =
				"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
				"margin:auto;border:1px;padding:1px;" +
				"width:60%;top:1%";
			documentElement.appendChild( container ).appendChild( div );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";

			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

			// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
			// Some styles come back with percentage values, even though they shouldn't
			div.style.right = "60%";
			pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

			// Support: IE 9 - 11 only
			// Detect misreporting of content dimensions for box-sizing:border-box elements
			boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

			// Support: IE 9 only
			// Detect overflow:scroll screwiness (gh-3699)
			// Support: Chrome <=64
			// Don't get tricked when zoom affects offsetWidth (gh-4029)
			div.style.position = "absolute";
			scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

			documentElement.removeChild( container );

			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}

		function roundPixelMeasures( measure ) {
			return Math.round( parseFloat( measure ) );
		}

		var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
			reliableTrDimensionsVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (trac-8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		jQuery.extend( support, {
			boxSizingReliable: function() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelBoxStyles: function() {
				computeStyleTests();
				return pixelBoxStylesVal;
			},
			pixelPosition: function() {
				computeStyleTests();
				return pixelPositionVal;
			},
			reliableMarginLeft: function() {
				computeStyleTests();
				return reliableMarginLeftVal;
			},
			scrollboxSize: function() {
				computeStyleTests();
				return scrollboxSizeVal;
			},

			// Support: IE 9 - 11+, Edge 15 - 18+
			// IE/Edge misreport `getComputedStyle` of table rows with width/height
			// set in CSS while `offset*` properties report correct values.
			// Behavior in IE 9 is more subtle than in newer versions & it passes
			// some versions of this test; make sure not to make it pass there!
			//
			// Support: Firefox 70+
			// Only Firefox includes border widths
			// in computed dimensions. (gh-4529)
			reliableTrDimensions: function() {
				var table, tr, trChild, trStyle;
				if ( reliableTrDimensionsVal == null ) {
					table = document.createElement( "table" );
					tr = document.createElement( "tr" );
					trChild = document.createElement( "div" );

					table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
					tr.style.cssText = "box-sizing:content-box;border:1px solid";

					// Support: Chrome 86+
					// Height set through cssText does not get applied.
					// Computed height then comes back as 0.
					tr.style.height = "1px";
					trChild.style.height = "9px";

					// Support: Android 8 Chrome 86+
					// In our bodyBackground.html iframe,
					// display for all div elements is set to "inline",
					// which causes a problem only in Android 8 Chrome 86.
					// Ensuring the div is `display: block`
					// gets around this issue.
					trChild.style.display = "block";

					documentElement
						.appendChild( table )
						.appendChild( tr )
						.appendChild( trChild );

					trStyle = window.getComputedStyle( tr );
					reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
						parseInt( trStyle.borderTopWidth, 10 ) +
						parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

					documentElement.removeChild( table );
				}
				return reliableTrDimensionsVal;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			isCustomProp = rcustomProp.test( name ),

			// Support: Firefox 51+
			// Retrieving style before computed somehow
			// fixes an issue with getting wrong values
			// on detached elements
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is needed for:
		//   .css('filter') (IE 9 only, trac-12537)
		//   .css('--customProperty) (gh-3144)
		if ( computed ) {

			// Support: IE <=9 - 11+
			// IE only supports `"float"` in `getPropertyValue`; in computed styles
			// it's only available as `"cssFloat"`. We no longer modify properties
			// sent to `.css()` apart from camelCasing, so we need to check both.
			// Normally, this would create difference in behavior: if
			// `getPropertyValue` returns an empty string, the value returned
			// by `.css()` would be `undefined`. This is usually the case for
			// disconnected elements. However, in IE even disconnected elements
			// with no styles return `"none"` for `getPropertyValue( "float" )`
			ret = computed.getPropertyValue( name ) || computed[ name ];

			if ( isCustomProp && ret ) {

				// Support: Firefox 105+, Chrome <=105+
				// Spec requires trimming whitespace for custom properties (gh-4926).
				// Firefox only trims leading whitespace. Chrome just collapses
				// both leading & trailing whitespace to a single space.
				//
				// Fall back to `undefined` if empty string returned.
				// This collapses a missing definition with property defined
				// and set to an empty string but there's no standard API
				// allowing us to differentiate them without a performance penalty
				// and returning `undefined` aligns with older jQuery.
				//
				// rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
				// as whitespace while CSS does not, but this is not a problem
				// because CSS preprocessing replaces them with U+000A LINE FEED
				// (which *is* CSS whitespace)
				// https://www.w3.org/TR/css-syntax-3/#input-preprocessing
				ret = ret.replace( rtrimCSS, "$1" ) || undefined;
			}

			if ( ret === "" && !isAttached( elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE <=9 - 11 only
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var cssPrefixes = [ "Webkit", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style,
		vendorProps = {};

	// Return a vendor-prefixed property or undefined
	function vendorPropName( name ) {

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
	function finalPropName( name ) {
		var final = jQuery.cssProps[ name ] || vendorProps[ name ];

		if ( final ) {
			return final;
		}
		if ( name in emptyStyle ) {
			return name;
		}
		return vendorProps[ name ] = vendorPropName( name ) || name;
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		};

	function setPositiveNumber( _elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}

	function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
		var i = dimension === "width" ? 1 : 0,
			extra = 0,
			delta = 0,
			marginDelta = 0;

		// Adjustment may not be necessary
		if ( box === ( isBorderBox ? "border" : "content" ) ) {
			return 0;
		}

		for ( ; i < 4; i += 2 ) {

			// Both box models exclude margin
			// Count margin delta separately to only add it after scroll gutter adjustment.
			// This is needed to make negative margins work with `outerHeight( true )` (gh-3982).
			if ( box === "margin" ) {
				marginDelta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
			}

			// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
			if ( !isBorderBox ) {

				// Add padding
				delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// For "border" or "margin", add border
				if ( box !== "padding" ) {
					delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

				// But still keep track of it otherwise
				} else {
					extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}

			// If we get here with a border-box (content + padding + border), we're seeking "content" or
			// "padding" or "margin"
			} else {

				// For "content", subtract padding
				if ( box === "content" ) {
					delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// For "content" or "padding", subtract border
				if ( box !== "margin" ) {
					delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		// Account for positive content-box scroll gutter when requested by providing computedVal
		if ( !isBorderBox && computedVal >= 0 ) {

			// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
			// Assuming integer scroll gutter, subtract the rest and round down
			delta += Math.max( 0, Math.ceil(
				elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
				computedVal -
				delta -
				extra -
				0.5

			// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
			// Use an explicit zero to avoid NaN (gh-3964)
			) ) || 0;
		}

		return delta + marginDelta;
	}

	function getWidthOrHeight( elem, dimension, extra ) {

		// Start with computed style
		var styles = getStyles( elem ),

			// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
			// Fake content-box until we know it's needed to know the true value.
			boxSizingNeeded = !support.boxSizingReliable() || extra,
			isBorderBox = boxSizingNeeded &&
				jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
			valueIsBorderBox = isBorderBox,

			val = curCSS( elem, dimension, styles ),
			offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

		// Support: Firefox <=54
		// Return a confounding non-pixel value or feign ignorance, as appropriate.
		if ( rnumnonpx.test( val ) ) {
			if ( !extra ) {
				return val;
			}
			val = "auto";
		}


		// Support: IE 9 - 11 only
		// Use offsetWidth/offsetHeight for when box sizing is unreliable.
		// In those cases, the computed value can be trusted to be border-box.
		if ( ( !support.boxSizingReliable() && isBorderBox ||

			// Support: IE 10 - 11+, Edge 15 - 18+
			// IE/Edge misreport `getComputedStyle` of table rows with width/height
			// set in CSS while `offset*` properties report correct values.
			// Interestingly, in some cases IE 9 doesn't suffer from this issue.
			!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

			// Fall back to offsetWidth/offsetHeight when value is "auto"
			// This happens for inline elements with no explicit setting (gh-3571)
			val === "auto" ||

			// Support: Android <=4.1 - 4.3 only
			// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
			!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

			// Make sure the element is visible & connected
			elem.getClientRects().length ) {

			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

			// Where available, offsetWidth/offsetHeight approximate border box dimensions.
			// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
			// retrieved value as a content box dimension.
			valueIsBorderBox = offsetProp in elem;
			if ( valueIsBorderBox ) {
				val = elem[ offsetProp ];
			}
		}

		// Normalize "" and auto
		val = parseFloat( val ) || 0;

		// Adjust for the element's box model
		return ( val +
			boxModelAdjustment(
				elem,
				dimension,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles,

				// Provide the current computed size to request scroll gutter calculation (gh-3589)
				val
			)
		) + "px";
	}

	jQuery.extend( {

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			animationIterationCount: true,
			aspectRatio: true,
			borderImageSlice: true,
			columnCount: true,
			flexGrow: true,
			flexShrink: true,
			fontWeight: true,
			gridArea: true,
			gridColumn: true,
			gridColumnEnd: true,
			gridColumnStart: true,
			gridRow: true,
			gridRowEnd: true,
			gridRowStart: true,
			lineHeight: true,
			opacity: true,
			order: true,
			orphans: true,
			scale: true,
			widows: true,
			zIndex: true,
			zoom: true,

			// SVG-related
			fillOpacity: true,
			floodOpacity: true,
			stopOpacity: true,
			strokeMiterlimit: true,
			strokeOpacity: true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = camelCase( name ),
				isCustomProp = rcustomProp.test( name ),
				style = elem.style;

			// Make sure that we're working with the right name. We don't
			// want to query the value if it is a CSS custom property
			// since they are user-defined.
			if ( !isCustomProp ) {
				name = finalPropName( origName );
			}

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (trac-7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug trac-9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (trac-7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
				// "px" to a few hardcoded values.
				if ( type === "number" && !isCustomProp ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					if ( isCustomProp ) {
						style.setProperty( name, value );
					} else {
						style[ name ] = value;
					}
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = camelCase( name ),
				isCustomProp = rcustomProp.test( name );

			// Make sure that we're working with the right name. We don't
			// want to modify the value if it is a CSS custom property
			// since they are user-defined.
			if ( !isCustomProp ) {
				name = finalPropName( origName );
			}

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}

			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( _i, dimension ) {
		jQuery.cssHooks[ dimension ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

						// Support: Safari 8+
						// Table columns in Safari have non-zero offsetWidth & zero
						// getBoundingClientRect().width unless display is changed.
						// Support: IE <=11 only
						// Running getBoundingClientRect on a disconnected node
						// in IE throws an error.
						( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = getStyles( elem ),

					// Only read styles.position if the test has a chance to fail
					// to avoid forcing a reflow.
					scrollboxSizeBuggy = !support.scrollboxSize() &&
						styles.position === "absolute",

					// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
					boxSizingNeeded = scrollboxSizeBuggy || extra,
					isBorderBox = boxSizingNeeded &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					subtract = extra ?
						boxModelAdjustment(
							elem,
							dimension,
							extra,
							isBorderBox,
							styles
						) :
						0;

				// Account for unreliable border-box dimensions by comparing offset* to computed and
				// faking a content-box to get border and padding (gh-3699)
				if ( isBorderBox && scrollboxSizeBuggy ) {
					subtract -= Math.ceil(
						elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
						parseFloat( styles[ dimension ] ) -
						boxModelAdjustment( elem, dimension, "border", false, styles ) -
						0.5
					);
				}

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ dimension ] = value;
					value = jQuery.css( elem, dimension );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
				) + "px";
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( prefix !== "margin" ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( Array.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
						tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, inProgress,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	function schedule() {
		if ( inProgress ) {
			if ( document.hidden === false && window.requestAnimationFrame ) {
				window.requestAnimationFrame( schedule );
			} else {
				window.setTimeout( schedule, jQuery.fx.interval );
			}

			jQuery.fx.tick();
		}
	}

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = Date.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
			isBox = "width" in props || "height" in props,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHiddenWithinTree( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Queue-skipping animations hijack the fx hooks
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Detect show/hide animations
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.test( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;

					// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
			}
		}

		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject( props );
		if ( !propTween && jQuery.isEmptyObject( orig ) ) {
			return;
		}

		// Restrict "overflow" and "display" styles during box animations
		if ( isBox && elem.nodeType === 1 ) {

			// Support: IE <=9 - 11, Edge 12 - 15
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY and Edge just mirrors
			// the overflowX value there.
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if ( restoreDisplay == null ) {
				restoreDisplay = dataPriv.get( elem, "display" );
			}
			display = jQuery.css( elem, "display" );
			if ( display === "none" ) {
				if ( restoreDisplay ) {
					display = restoreDisplay;
				} else {

					// Get nonempty value(s) by temporarily forcing visibility
					showHide( [ elem ], true );
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css( elem, "display" );
					showHide( [ elem ] );
				}
			}

			// Animate inline elements as inline-block
			if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
				if ( jQuery.css( elem, "float" ) === "none" ) {

					// Restore the original display value at the end of pure show/hide animations
					if ( !propTween ) {
						anim.done( function() {
							style.display = restoreDisplay;
						} );
						if ( restoreDisplay == null ) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// Implement show/hide animations
		propTween = false;
		for ( prop in orig ) {

			// General show/hide setup for this element animation
			if ( !propTween ) {
				if ( dataShow ) {
					if ( "hidden" in dataShow ) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
				}

				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if ( toggle ) {
					dataShow.hidden = !hidden;
				}

				// Show elements before animating them
				if ( hidden ) {
					showHide( [ elem ], true );
				}

				/* eslint-disable no-loop-func */

				anim.done( function() {

					/* eslint-enable no-loop-func */

					// The final step of a "hide" animation is actually hiding the element
					if ( !hidden ) {
						showHide( [ elem ] );
					}
					dataPriv.remove( elem, "fxshow" );
					for ( prop in orig ) {
						jQuery.style( elem, prop, orig[ prop ] );
					}
				} );
			}

			// Per-property setup
			propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = propTween.start;
				if ( hidden ) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( Array.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3 only
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				// If there's more to do, yield
				if ( percent < 1 && length ) {
					return remaining;
				}

				// If this was an empty animation, synthesize a final progress notification
				if ( !length ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
				}

				// Resolve the animation and report its conclusion
				deferred.resolveWith( elem, [ animation ] );
				return false;
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						result.stop.bind( result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		// Attach callbacks from options
		animation
			.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		return animation;
	}

	jQuery.Animation = jQuery.extend( Animation, {

		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnothtmlwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !isFunction( easing ) && easing
		};

		// Go to the end state if fx are off
		if ( jQuery.fx.off ) {
			opt.duration = 0;

		} else {
			if ( typeof opt.duration !== "number" ) {
				if ( opt.duration in jQuery.fx.speeds ) {
					opt.duration = jQuery.fx.speeds[ opt.duration ];

				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};

			doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue ) {
				this.queue( type || "fx", [] );
			}

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = Date.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];

			// Run the timer and safely remove it when done (allowing for external removal)
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		jQuery.fx.start();
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( inProgress ) {
			return;
		}

		inProgress = true;
		schedule();
	};

	jQuery.fx.stop = function() {
		inProgress = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function( elem, value ) {
			var name,
				i = 0,

				// Attribute names can contain non-HTML whitespace characters
				// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
				attrNames = value && value.match( rnothtmlwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};

	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle,
				lowercaseName = name.toLowerCase();

			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ lowercaseName ];
				attrHandle[ lowercaseName ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					lowercaseName :
					null;
				attrHandle[ lowercaseName ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// Use proper attribute retrieval (trac-12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					if ( tabindex ) {
						return parseInt( tabindex, 10 );
					}

					if (
						rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) &&
						elem.href
					) {
						return 0;
					}

					return -1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {

				/* eslint no-unused-expressions: "off" */

				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;

					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




		// Strip and collapse whitespace according to HTML spec
		// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
		function stripAndCollapse( value ) {
			var tokens = value.match( rnothtmlwhite ) || [];
			return tokens.join( " " );
		}


	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	function classesToArray( value ) {
		if ( Array.isArray( value ) ) {
			return value;
		}
		if ( typeof value === "string" ) {
			return value.match( rnothtmlwhite ) || [];
		}
		return [];
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classNames, cur, curValue, className, i, finalValue;

			if ( isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			classNames = classesToArray( value );

			if ( classNames.length ) {
				return this.each( function() {
					curValue = getClass( this );
					cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

					if ( cur ) {
						for ( i = 0; i < classNames.length; i++ ) {
							className = classNames[ i ];
							if ( cur.indexOf( " " + className + " " ) < 0 ) {
								cur += className + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							this.setAttribute( "class", finalValue );
						}
					}
				} );
			}

			return this;
		},

		removeClass: function( value ) {
			var classNames, cur, curValue, className, i, finalValue;

			if ( isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			classNames = classesToArray( value );

			if ( classNames.length ) {
				return this.each( function() {
					curValue = getClass( this );

					// This expression is here for better compressibility (see addClass)
					cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

					if ( cur ) {
						for ( i = 0; i < classNames.length; i++ ) {
							className = classNames[ i ];

							// Remove *all* instances
							while ( cur.indexOf( " " + className + " " ) > -1 ) {
								cur = cur.replace( " " + className + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							this.setAttribute( "class", finalValue );
						}
					}
				} );
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var classNames, className, i, self,
				type = typeof value,
				isValidValue = type === "string" || Array.isArray( value );

			if ( isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			if ( typeof stateVal === "boolean" && isValidValue ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			classNames = classesToArray( value );

			return this.each( function() {
				if ( isValidValue ) {

					// Toggle individual class names
					self = jQuery( this );

					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
								"" :
								dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, valueIsFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					// Handle most common string cases
					if ( typeof ret === "string" ) {
						return ret.replace( rreturn, "" );
					}

					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}

				return;
			}

			valueIsFunction = isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( valueIsFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( Array.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :

						// Support: IE <=10 - 11 only
						// option.text throws exceptions (trac-14686, trac-14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						stripAndCollapse( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option, i,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one",
						values = one ? null : [],
						max = one ? index + 1 : options.length;

					if ( index < 0 ) {
						i = max;

					} else {
						i = one ? index : 0;
					}

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (trac-2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								!option.disabled &&
								( !option.parentNode.disabled ||
									!nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];

						/* eslint-disable no-cond-assign */

						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}

						/* eslint-enable no-cond-assign */
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( Array.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion
	var location = window.location;

	var nonce = { guid: Date.now() };

	var rquery = ( /\?/ );



	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml, parserErrorElem;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {}

		parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
		if ( !xml || parserErrorElem ) {
			jQuery.error( "Invalid XML: " + (
				parserErrorElem ?
					jQuery.map( parserErrorElem.childNodes, function( el ) {
						return el.textContent;
					} ).join( "\n" ) :
					data
			) );
		}
		return xml;
	};


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		stopPropagationCallback = function( e ) {
			e.stopPropagation();
		};

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = lastElement = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (trac-9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
			if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
				lastElement = cur;
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (trac-6170)
					if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;

						if ( event.isPropagationStopped() ) {
							lastElement.addEventListener( type, stopPropagationCallback );
						}

						elem[ type ]();

						if ( event.isPropagationStopped() ) {
							lastElement.removeEventListener( type, stopPropagationCallback );
						}

						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);

			jQuery.event.trigger( e, null, elem );
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	var
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( Array.isArray( obj ) ) {

			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {

					// Treat each array item as a scalar.
					add( prefix, v );

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

		} else if ( !traditional && toType( obj ) === "object" ) {

			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {

			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, valueOrFunction ) {

				// If value is a function, invoke it and use its return value
				var value = isFunction( valueOrFunction ) ?
					valueOrFunction() :
					valueOrFunction;

				s[ s.length ] = encodeURIComponent( key ) + "=" +
					encodeURIComponent( value == null ? "" : value );
			};

		if ( a == null ) {
			return "";
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" );
	};

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} ).filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} ).map( function( _i, elem ) {
				var val = jQuery( this ).val();

				if ( val == null ) {
					return null;
				}

				if ( Array.isArray( val ) ) {
					return jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} );
				}

				return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	var
		r20 = /%20/g,
		rhash = /#.*$/,
		rantiCache = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// trac-7653, trac-8125, trac-8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );

	originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

			if ( isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes trac-9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {

			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

				// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {

									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",

			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": JSON.parse,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// Request state (becomes false upon send and true upon completion)
				completed,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// uncached part of the url
				uncached,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( completed ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
										( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
											.concat( match[ 2 ] );
								}
							}
							match = responseHeaders[ key.toLowerCase() + " " ];
						}
						return match == null ? null : match.join( ", " );
					},

					// Raw string
					getAllResponseHeaders: function() {
						return completed ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						if ( completed == null ) {
							name = requestHeadersNames[ name.toLowerCase() ] =
								requestHeadersNames[ name.toLowerCase() ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( completed == null ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( completed ) {

								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							} else {

								// Lazy-add the new callbacks in a way that preserves old ones
								for ( code in map ) {
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR );

			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (trac-10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket trac-12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE <=8 - 11, Edge 12 - 15
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( completed ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace( rhash, "" );

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// Remember the hash so we can put it back
				uncached = s.url.slice( cacheURL.length );

				// If data is available and should be processed, append data to url
				if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
					cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

					// trac-9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add or update anti-cache param if needed
				if ( s.cache === false ) {
					cacheURL = cacheURL.replace( rantiCache, "$1" );
					uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
						uncached;
				}

				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;

			// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if ( s.data && s.processData &&
				( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
				s.data = s.data.replace( r20, "+" );
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			completeDeferred.add( s.complete );
			jqXHR.done( s.success );
			jqXHR.fail( s.error );

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}

				// If request was aborted inside ajaxSend, stop there
				if ( completed ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}

				try {
					completed = false;
					transport.send( requestHeaders, done );
				} catch ( e ) {

					// Rethrow post-completion exceptions
					if ( completed ) {
						throw e;
					}

					// Propagate others as results
					done( -1, e );
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Ignore repeat invocations
				if ( completed ) {
					return;
				}

				completed = true;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Use a noop converter for missing script but not if jsonp
				if ( !isSuccess &&
					jQuery.inArray( "script", s.dataTypes ) > -1 &&
					jQuery.inArray( "json", s.dataTypes ) < 0 ) {
					s.converters[ "text script" ] = function() {};
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( _i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );

	jQuery.ajaxPrefilter( function( s ) {
		var i;
		for ( i in s.headers ) {
			if ( i.toLowerCase() === "content-type" ) {
				s.contentType = s.headers[ i ] || "";
			}
		}
	} );


	jQuery._evalUrl = function( url, options, doc ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (trac-11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,

			// Only evaluate the response if it is successful (gh-4126)
			// dataFilter is not invoked for failure responses, so using it instead
			// of the default converter is kludgy but it works.
			converters: {
				"text script": function() {}
			},
			dataFilter: function( response ) {
				jQuery.globalEval( response, options, doc );
			}
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( this[ 0 ] ) {
				if ( isFunction( html ) ) {
					html = html.call( this[ 0 ] );
				}

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var htmlIsFunction = isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function( selector ) {
			this.parent( selector ).not( "body" ).each( function() {
				jQuery( this ).replaceWith( this.childNodes );
			} );
			return this;
		}
	} );


	jQuery.expr.pseudos.hidden = function( elem ) {
		return !jQuery.expr.pseudos.visible( elem );
	};
	jQuery.expr.pseudos.visible = function( elem ) {
		return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
	};




	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE <=9 only
			// trac-1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.ontimeout =
										xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see trac-8605, trac-14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE <=9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// trac-14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter( function( s ) {
		if ( s.crossDomain ) {
			s.contents.script = false;
		}
	} );

	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain or forced-by-attrs requests
		if ( s.crossDomain || s.scriptAttrs ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" )
						.attr( s.scriptAttrs || {} )
						.prop( { charset: s.scriptCharset, src: s.url } )
						.on( "load error", callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						} );

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = ( function() {
		var body = document.implementation.createHTMLDocument( "" ).body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	} )();


	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( typeof data !== "string" ) {
			return [];
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}

		var base, parsed, scripts;

		if ( !context ) {

			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if ( support.createHTMLDocument ) {
				context = document.implementation.createHTMLDocument( "" );

				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement( "base" );
				base.href = document.location.href;
				context.head.appendChild( base );
			} else {
				context = document;
			}
		}

		parsed = rsingleTag.exec( data );
		scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = stripAndCollapse( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	jQuery.expr.pseudos.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend( {

		// offset() relates an element's border box to the document origin
		offset: function( options ) {

			// Preserve chaining for setter
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var rect, win,
				elem = this[ 0 ];

			if ( !elem ) {
				return;
			}

			// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if ( !elem.getClientRects().length ) {
				return { top: 0, left: 0 };
			}

			// Get document-relative position by adding viewport scroll to viewport-relative gBCR
			rect = elem.getBoundingClientRect();
			win = elem.ownerDocument.defaultView;
			return {
				top: rect.top + win.pageYOffset,
				left: rect.left + win.pageXOffset
			};
		},

		// position() relates an element's margin box to its offset parent's padding box
		// This corresponds to the behavior of CSS absolute positioning
		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset, doc,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// position:fixed elements are offset from the viewport, which itself always has zero offset
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume position:fixed implies availability of getBoundingClientRect
				offset = elem.getBoundingClientRect();

			} else {
				offset = this.offset();

				// Account for the *real* offset parent, which can be the document or its root element
				// when a statically positioned element is identified
				doc = elem.ownerDocument;
				offsetParent = elem.offsetParent || doc.documentElement;
				while ( offsetParent &&
					( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
					jQuery.css( offsetParent, "position" ) === "static" ) {

					offsetParent = offsetParent.parentNode;
				}
				if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

					// Incorporate borders into its offset, since they are outside its content origin
					parentOffset = jQuery( offsetParent ).offset();
					parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
					parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
				}
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {

				// Coalesce documents and windows
				var win;
				if ( isWindow( elem ) ) {
					win = elem;
				} else if ( elem.nodeType === 9 ) {
					win = elem.defaultView;
				}

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( _i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( {
			padding: "inner" + name,
			content: type,
			"": "outer" + name
		}, function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( isWindow( elem ) ) {

						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf( "outer" ) === 0 ?
							elem[ "inner" + name ] :
							elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable );
			};
		} );
	} );


	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( _i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.fn.extend( {

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},

		hover: function( fnOver, fnOut ) {
			return this
				.on( "mouseenter", fnOver )
				.on( "mouseleave", fnOut || fnOver );
		}
	} );

	jQuery.each(
		( "blur focus focusin focusout resize scroll click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup contextmenu" ).split( " " ),
		function( _i, name ) {

			// Handle event binding
			jQuery.fn[ name ] = function( data, fn ) {
				return arguments.length > 0 ?
					this.on( name, null, data, fn ) :
					this.trigger( name );
			};
		}
	);




	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	// Require that the "whitespace run" starts from a non-whitespace
	// to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
	var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;

	// Bind a function to a context, optionally partially applying any
	// arguments.
	// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
	// However, it is not slated for removal any time soon
	jQuery.proxy = function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	};

	jQuery.holdReady = function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	};
	jQuery.isArray = Array.isArray;
	jQuery.parseJSON = JSON.parse;
	jQuery.nodeName = nodeName;
	jQuery.isFunction = isFunction;
	jQuery.isWindow = isWindow;
	jQuery.camelCase = camelCase;
	jQuery.type = toType;

	jQuery.now = Date.now;

	jQuery.isNumeric = function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	};

	jQuery.trim = function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "$1" );
	};




	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (trac-13566)
	if ( typeof noGlobal === "undefined" ) {
		window.jQuery = window.$ = jQuery;
	}




	return jQuery;
	} );
} (jquery));

var jQuery = jqueryExports;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */

function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear$1;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */

function eq$4(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq$4;

var eq$3 = eq_1;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$3(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf$4;

var assocIndexOf$3 = _assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete$1(key) {
  var data = this.__data__,
      index = assocIndexOf$3(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete$1;

var assocIndexOf$2 = _assocIndexOf;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet$1(key) {
  var data = this.__data__,
      index = assocIndexOf$2(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet$1;

var assocIndexOf$1 = _assocIndexOf;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas$1;

var assocIndexOf = _assocIndexOf;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet$1(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet$1;

var listCacheClear = _listCacheClear,
    listCacheDelete = _listCacheDelete,
    listCacheGet = _listCacheGet,
    listCacheHas = _listCacheHas,
    listCacheSet = _listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache$4(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype['delete'] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;

var _ListCache = ListCache$4;

var ListCache$3 = _ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear$1() {
  this.__data__ = new ListCache$3;
  this.size = 0;
}

var _stackClear = stackClear$1;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function stackDelete$1(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete$1;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function stackGet$1(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet$1;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function stackHas$1(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas$1;

/** Detect free variable `global` from Node.js. */

var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$4 = freeGlobal || freeSelf || Function('return this')();

var _root = root$4;

var root$3 = _root;

/** Built-in value references. */
var Symbol$3 = root$3.Symbol;

var _Symbol = Symbol$3;

var Symbol$2 = _Symbol;

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$b.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$9.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */

var objectProto$a = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$a.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString$1;

var Symbol$1 = _Symbol,
    getRawTag = _getRawTag,
    objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$4(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$4;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject$7(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$7;

var baseGetTag$3 = _baseGetTag,
    isObject$6 = isObject_1;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$1 = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$3(value) {
  if (!isObject$6(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag$3(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction$3;

var root$2 = _root;

/** Used to detect overreaching core-js shims. */
var coreJsData$1 = root$2['__core-js_shared__'];

var _coreJsData = coreJsData$1;

var coreJsData = _coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked$1(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked$1;

/** Used for built-in method references. */

var funcProto$2 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource$1(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource$1;

var isFunction$2 = isFunction_1,
    isMasked = _isMasked,
    isObject$5 = isObject_1,
    toSource = _toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$9 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$9.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$8).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative$1(value) {
  if (!isObject$5(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$2(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

var _baseIsNative = baseIsNative$1;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue$1;

var baseIsNative = _baseIsNative,
    getValue = _getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$3(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

var _getNative = getNative$3;

var getNative$2 = _getNative,
    root$1 = _root;

/* Built-in method references that are verified to be native. */
var Map$2 = getNative$2(root$1, 'Map');

var _Map = Map$2;

var getNative$1 = _getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate$4 = getNative$1(Object, 'create');

var _nativeCreate = nativeCreate$4;

var nativeCreate$3 = _nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}

var _hashClear = hashClear$1;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete$1;

var nativeCreate$2 = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? undefined : result;
  }
  return hasOwnProperty$7.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet$1;

var nativeCreate$1 = _nativeCreate;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$6.call(data, key);
}

var _hashHas = hashHas$1;

var nativeCreate = _nativeCreate;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

var _hashSet = hashSet$1;

var hashClear = _hashClear,
    hashDelete = _hashDelete,
    hashGet = _hashGet,
    hashHas = _hashHas,
    hashSet = _hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash$1.prototype.clear = hashClear;
Hash$1.prototype['delete'] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;

var _Hash = Hash$1;

var Hash = _Hash,
    ListCache$2 = _ListCache,
    Map$1 = _Map;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$1 || ListCache$2),
    'string': new Hash
  };
}

var _mapCacheClear = mapCacheClear$1;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */

function isKeyable$1(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable$1;

var isKeyable = _isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData$4;

var getMapData$3 = _getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete$1;

var getMapData$2 = _getMapData;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}

var _mapCacheGet = mapCacheGet$1;

var getMapData$1 = _getMapData;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}

var _mapCacheHas = mapCacheHas$1;

var getMapData = _getMapData;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet$1;

var mapCacheClear = _mapCacheClear,
    mapCacheDelete = _mapCacheDelete,
    mapCacheGet = _mapCacheGet,
    mapCacheHas = _mapCacheHas,
    mapCacheSet = _mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache$1(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache$1.prototype.clear = mapCacheClear;
MapCache$1.prototype['delete'] = mapCacheDelete;
MapCache$1.prototype.get = mapCacheGet;
MapCache$1.prototype.has = mapCacheHas;
MapCache$1.prototype.set = mapCacheSet;

var _MapCache = MapCache$1;

var ListCache$1 = _ListCache,
    Map = _Map,
    MapCache = _MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet$1;

var ListCache = _ListCache,
    stackClear = _stackClear,
    stackDelete = _stackDelete,
    stackGet = _stackGet,
    stackHas = _stackHas,
    stackSet = _stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack$1(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack$1.prototype.clear = stackClear;
Stack$1.prototype['delete'] = stackDelete;
Stack$1.prototype.get = stackGet;
Stack$1.prototype.has = stackHas;
Stack$1.prototype.set = stackSet;

var _Stack = Stack$1;

var getNative = _getNative;

var defineProperty$2 = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty = defineProperty$2;

var defineProperty$1 = _defineProperty;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue$3(object, key, value) {
  if (key == '__proto__' && defineProperty$1) {
    defineProperty$1(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue$3;

var baseAssignValue$2 = _baseAssignValue,
    eq$2 = eq_1;

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue$2(object, key, value) {
  if ((value !== undefined && !eq$2(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue$2(object, key, value);
  }
}

var _assignMergeValue = assignMergeValue$2;

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */

function createBaseFor$1(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

var _createBaseFor = createBaseFor$1;

var createBaseFor = _createBaseFor;

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor$2 = createBaseFor();

var _baseFor = baseFor$2;

var _cloneBufferExports = {};
var _cloneBuffer = {
  get exports(){ return _cloneBufferExports; },
  set exports(v){ _cloneBufferExports = v; },
};

(function (module, exports) {
	var root = _root;

	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined,
	    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

	/**
	 * Creates a clone of  `buffer`.
	 *
	 * @private
	 * @param {Buffer} buffer The buffer to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Buffer} Returns the cloned buffer.
	 */
	function cloneBuffer(buffer, isDeep) {
	  if (isDeep) {
	    return buffer.slice();
	  }
	  var length = buffer.length,
	      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

	  buffer.copy(result);
	  return result;
	}

	module.exports = cloneBuffer;
} (_cloneBuffer, _cloneBufferExports));

var root = _root;

/** Built-in value references. */
var Uint8Array$1 = root.Uint8Array;

var _Uint8Array = Uint8Array$1;

var Uint8Array = _Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer$1(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

var _cloneArrayBuffer = cloneArrayBuffer$1;

var cloneArrayBuffer = _cloneArrayBuffer;

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray$1(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var _cloneTypedArray = cloneTypedArray$1;

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */

function copyArray$1(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var _copyArray = copyArray$1;

var isObject$4 = isObject_1;

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate$1 = (function() {
  function object() {}
  return function(proto) {
    if (!isObject$4(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

var _baseCreate = baseCreate$1;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */

function overArg$2(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg$2;

var overArg$1 = _overArg;

/** Built-in value references. */
var getPrototype$2 = overArg$1(Object.getPrototypeOf, Object);

var _getPrototype = getPrototype$2;

/** Used for built-in method references. */

var objectProto$6 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype$3(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$6;

  return value === proto;
}

var _isPrototype = isPrototype$3;

var baseCreate = _baseCreate,
    getPrototype$1 = _getPrototype,
    isPrototype$2 = _isPrototype;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject$1(object) {
  return (typeof object.constructor == 'function' && !isPrototype$2(object))
    ? baseCreate(getPrototype$1(object))
    : {};
}

var _initCloneObject = initCloneObject$1;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike$5(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$5;

var baseGetTag$2 = _baseGetTag,
    isObjectLike$4 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments$1(value) {
  return isObjectLike$4(value) && baseGetTag$2(value) == argsTag$1;
}

var _baseIsArguments = baseIsArguments$1;

var baseIsArguments = _baseIsArguments,
    isObjectLike$3 = isObjectLike_1;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$5.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments$2 = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike$3(value) && hasOwnProperty$5.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

var isArguments_1 = isArguments$2;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */

var isArray$3 = Array.isArray;

var isArray_1 = isArray$3;

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength$2(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

var isLength_1 = isLength$2;

var isFunction$1 = isFunction_1,
    isLength$1 = isLength_1;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike$5(value) {
  return value != null && isLength$1(value.length) && !isFunction$1(value);
}

var isArrayLike_1 = isArrayLike$5;

var isArrayLike$4 = isArrayLike_1,
    isObjectLike$2 = isObjectLike_1;

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject$1(value) {
  return isObjectLike$2(value) && isArrayLike$4(value);
}

var isArrayLikeObject_1 = isArrayLikeObject$1;

var isBufferExports = {};
var isBuffer$2 = {
  get exports(){ return isBufferExports; },
  set exports(v){ isBufferExports = v; },
};

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */

function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

(function (module, exports) {
	var root = _root,
	    stubFalse = stubFalse_1;

	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;
} (isBuffer$2, isBufferExports));

var baseGetTag$1 = _baseGetTag,
    getPrototype = _getPrototype,
    isObjectLike$1 = isObjectLike_1;

/** `Object#toString` result references. */
var objectTag$1 = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$4 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject$1(value) {
  if (!isObjectLike$1(value) || baseGetTag$1(value) != objectTag$1) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$4.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

var isPlainObject_1 = isPlainObject$1;

var baseGetTag = _baseGetTag,
    isLength = isLength_1,
    isObjectLike = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray$1(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray$1;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */

function baseUnary$1(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary$1;

var _nodeUtilExports = {};
var _nodeUtil = {
  get exports(){ return _nodeUtilExports; },
  set exports(v){ _nodeUtilExports = v; },
};

(function (module, exports) {
	var freeGlobal = _freeGlobal;

	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    // Use `util.types` for Node.js 10+.
	    var types = freeModule && freeModule.require && freeModule.require('util').types;

	    if (types) {
	      return types;
	    }

	    // Legacy `process.binding('util')` for Node.js < 10.
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;
} (_nodeUtil, _nodeUtilExports));

var baseIsTypedArray = _baseIsTypedArray,
    baseUnary = _baseUnary,
    nodeUtil = _nodeUtilExports;

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray$2 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

var isTypedArray_1 = isTypedArray$2;

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

function safeGet$2(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

var _safeGet = safeGet$2;

var baseAssignValue$1 = _baseAssignValue,
    eq$1 = eq_1;

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue$1(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$3.call(object, key) && eq$1(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue$1(object, key, value);
  }
}

var _assignValue = assignValue$1;

var assignValue = _assignValue,
    baseAssignValue = _baseAssignValue;

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject$1(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

var _copyObject = copyObject$1;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */

function baseTimes$1(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes$1;

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex$2(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex$2;

var baseTimes = _baseTimes,
    isArguments$1 = isArguments_1,
    isArray$2 = isArray_1,
    isBuffer$1 = isBufferExports,
    isIndex$1 = _isIndex,
    isTypedArray$1 = isTypedArray_1;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys$2(value, inherited) {
  var isArr = isArray$2(value),
      isArg = !isArr && isArguments$1(value),
      isBuff = !isArr && !isArg && isBuffer$1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray$1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$2.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex$1(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys$2;

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function nativeKeysIn$1(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

var _nativeKeysIn = nativeKeysIn$1;

var isObject$3 = isObject_1,
    isPrototype$1 = _isPrototype,
    nativeKeysIn = _nativeKeysIn;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn$1(object) {
  if (!isObject$3(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype$1(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$1.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

var _baseKeysIn = baseKeysIn$1;

var arrayLikeKeys$1 = _arrayLikeKeys,
    baseKeysIn = _baseKeysIn,
    isArrayLike$3 = isArrayLike_1;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn$2(object) {
  return isArrayLike$3(object) ? arrayLikeKeys$1(object, true) : baseKeysIn(object);
}

var keysIn_1 = keysIn$2;

var copyObject = _copyObject,
    keysIn$1 = keysIn_1;

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject$1(value) {
  return copyObject(value, keysIn$1(value));
}

var toPlainObject_1 = toPlainObject$1;

var assignMergeValue$1 = _assignMergeValue,
    cloneBuffer = _cloneBufferExports,
    cloneTypedArray = _cloneTypedArray,
    copyArray = _copyArray,
    initCloneObject = _initCloneObject,
    isArguments = isArguments_1,
    isArray$1 = isArray_1,
    isArrayLikeObject = isArrayLikeObject_1,
    isBuffer = isBufferExports,
    isFunction = isFunction_1,
    isObject$2 = isObject_1,
    isPlainObject = isPlainObject_1,
    isTypedArray = isTypedArray_1,
    safeGet$1 = _safeGet,
    toPlainObject = toPlainObject_1;

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep$1(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet$1(object, key),
      srcValue = safeGet$1(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue$1(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray$1(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray$1(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject$2(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue$1(object, key, newValue);
}

var _baseMergeDeep = baseMergeDeep$1;

var Stack = _Stack,
    assignMergeValue = _assignMergeValue,
    baseFor$1 = _baseFor,
    baseMergeDeep = _baseMergeDeep,
    isObject$1 = isObject_1,
    keysIn = keysIn_1,
    safeGet = _safeGet;

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge$1(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor$1(source, function(srcValue, key) {
    stack || (stack = new Stack);
    if (isObject$1(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge$1, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

var _baseMerge = baseMerge$1;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */

function identity$3(value) {
  return value;
}

var identity_1 = identity$3;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */

function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var _apply = apply$1;

var apply = _apply;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest$1(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

var _overRest = overRest$1;

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */

function constant$1(value) {
  return function() {
    return value;
  };
}

var constant_1 = constant$1;

var constant = constant_1,
    defineProperty = _defineProperty,
    identity$2 = identity_1;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString$1 = !defineProperty ? identity$2 : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

var _baseSetToString = baseSetToString$1;

/** Used to detect hot functions by number of calls within a span of milliseconds. */

var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut$1(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut$1;

var baseSetToString = _baseSetToString,
    shortOut = _shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString$1 = shortOut(baseSetToString);

var _setToString = setToString$1;

var identity$1 = identity_1,
    overRest = _overRest,
    setToString = _setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest$1(func, start) {
  return setToString(overRest(func, start, identity$1), func + '');
}

var _baseRest = baseRest$1;

var eq = eq_1,
    isArrayLike$2 = isArrayLike_1,
    isIndex = _isIndex,
    isObject = isObject_1;

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall$1(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike$2(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

var _isIterateeCall = isIterateeCall$1;

var baseRest = _baseRest,
    isIterateeCall = _isIterateeCall;

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner$1(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

var _createAssigner = createAssigner$1;

var baseMerge = _baseMerge,
    createAssigner = _createAssigner;

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

var eachExports = {};
var each$1 = {
  get exports(){ return eachExports; },
  set exports(v){ eachExports = v; },
};

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */

function arrayEach$1(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

var _arrayEach = arrayEach$1;

var overArg = _overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys$1 = overArg(Object.keys, Object);

var _nativeKeys = nativeKeys$1;

var isPrototype = _isPrototype,
    nativeKeys = _nativeKeys;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys$1(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys$1;

var arrayLikeKeys = _arrayLikeKeys,
    baseKeys = _baseKeys,
    isArrayLike$1 = isArrayLike_1;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys$1(object) {
  return isArrayLike$1(object) ? arrayLikeKeys(object) : baseKeys(object);
}

var keys_1 = keys$1;

var baseFor = _baseFor,
    keys = keys_1;

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn$1(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

var _baseForOwn = baseForOwn$1;

var isArrayLike = isArrayLike_1;

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach$1(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

var _createBaseEach = createBaseEach$1;

var baseForOwn = _baseForOwn,
    createBaseEach = _createBaseEach;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach$1 = createBaseEach(baseForOwn);

var _baseEach = baseEach$1;

var identity = identity_1;

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */
function castFunction$1(value) {
  return typeof value == 'function' ? value : identity;
}

var _castFunction = castFunction$1;

var arrayEach = _arrayEach,
    baseEach = _baseEach,
    castFunction = _castFunction,
    isArray = isArray_1;

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
}

var forEach_1 = forEach;

(function (module) {
	module.exports = forEach_1;
} (each$1));

var each = /*@__PURE__*/getDefaultExportFromCjs(eachExports);

// export const data =
  
  

const visitsData$1 = {
    "resourceType": "Bundle",
    "type": "searchset",
    "total": 47,
    "link": [
        {
            "relation": "self",
            "url": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter?patient=ekjU0fvs8A7FYLta98rqLH8BFreepNIUI9D6VaroJyFU3&date=gt2018-06-15"
        }
    ],
    "entry": [
        {
            "link": [
                {
                    "relation": "self",
                    "url": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter/etPlPSTi-Ck8pFW0vJgBM6A3"
                }
            ],
            "fullUrl": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter/etPlPSTi-Ck8pFW0vJgBM6A3",
            "resource": {
                "resourceType": "Location",
                "id": "44319901",
                extension:[{
                    valueCodeableConcept:{
        coding:[
            {
                system:".7.10.688867.4150",
                code:"82"
            }
        ]
                    }
                }
                
                ],
                identifier:[
                   {
                    system:".7.2.686980",
                    value:"sjdfkjdshf"
                   }
                ],
                "status": "arrived",
                "class": {
                    "system": "urn:oid:1.2.840.114350.1.72.1.7.7.10.696784.13260",
                    "code": "5",
                    "display": "Appointment"
                },
                
                "subject": {
                    "reference": "Patient/ekjU0fvs8A7FYLta98rqLH8BFreepNIUI9D6VaroJyFU3",
                    "display": "Test, Healthchart"
                },
                "participant": [
                    {
                        "type": [
                            {
                                "coding": [
                                    {
                                        "system": "http://hl7.org/fhir/v3/ParticipationType",
                                        "code": "REF",
                                        "display": "referrer"
                                    }
                                ],
                                "text": "referrer"
                            }
                        ],
                        
                    },
                    {
                        "period": {
                            "start": "2022-05-25T14:00:00Z",
                            "end": "2022-05-25T14:30:00Z"
                        },
                        
                    }
                ],
                "period": {
                    "start": "2022-05-25T14:00:00Z",
                    "end": "2022-05-25T14:30:00Z"
                },
                "location": [
                    {
                        "location": {
                            "reference": "Location/44319901",
                            "display": "Buerger Center Allergy"
                        }
                    }
                ]
            },
            "search": {
                "mode": "match"
            }
        },
        {
            "link": [
                {
                    "relation": "self",
                    "url": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter/etPlPSTi-Ck8pFW0vJgBM6A3"
                }
            ],
            "fullUrl": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter/etPlPSTi-Ck8pFW0vJgBM6A3",
            "resource": {
                "resourceType": "Encounter",
                "id": "etPlPSTi-Ck8pFW0vJgBM6A3",
                "identifier": [
                    {
                        "use": "usual",
                        "system": "urn:oid:1.2.840.114350.1.13.20.3.7.3.698084.8",
                        "value": "8700006468"
                    },
                    {
                        "use": "usual",
                        "type": {
                            "text": "billing-number"
                        },
                        "system": "urn:oid:1.2.840.114350.1.13.20.3.7.3.698084.17",
                        "value": "8700006468"
                    }
                ],
                "status": "arrived",
                "class": {
                    "system": "urn:oid:1.2.840.114350.1.72.1.7.7.10.696784.13260",
                    "code": "5",
                    "display": "Appointment"
                },
                "type": [
                    {
                        "coding": [
                            {
                                "system": "urn:oid:1.2.840.114350.1.13.20.3.7.10.698084.30",
                                "code": "50",
                                "display": "Appointment"
                            }
                        ],
                        "text": "Appointment"
                    },
                    {
                        "coding": [
                            {
                                "system": "urn:oid:1.2.840.114350.1.13.20.3.7.2.808267",
                                "code": "3044",
                                "display": "BIOLOGIC"
                            }
                        ],
                        "text": "BIOLOGIC"
                    }
                ],
                "subject": {
                    "reference": "Patient/ekjU0fvs8A7FYLta98rqLH8BFreepNIUI9D6VaroJyFU3",
                    "display": "Test, Healthchart"
                },
                "participant": [
                    {
                        "type": [
                            {
                                "coding": [
                                    {
                                        "system": "http://hl7.org/fhir/v3/ParticipationType",
                                        "code": "REF",
                                        "display": "referrer"
                                    }
                                ],
                                "text": "referrer"
                            }
                        ],
                        
                    },
                    {
                        "period": {
                            "start": "2022-05-25T14:00:00Z",
                            "end": "2022-05-25T14:30:00Z"
                        },
                        
                    }
                ],
                "period": {
                    "start": "2022-05-25T14:00:00Z",
                    "end": "2022-05-25T14:30:00Z"
                },
                "location": [
                    {
                        "location": {
                            "reference": "Location/44319901",
                            "display": "Buerger Center Allergy"
                        }
                    }
                ]
            },
            "search": {
                "mode": "match"
            },
            
        },
        {
            "link": [
                {
                    "relation": "self",
                    "url": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter/etPlPSTi-Ck8pFW0vJgBM6A3"
                }
            ],
            "fullUrl": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter/etPlPSTi-Ck8pFW0vJgBM6A3",
            "resource": {
                "resourceType": "Location",
                "id": "44319902",
                extension:[{
                    valueCodeableConcept:{
        coding:[
            {
                system:".7.10.688867.4150",
                code:"3"
            }
        ]
                    }
                }
                
                ],
                identifier:[
                   {
                    system:".7.2.686980",
                    value:"sjdfkjdshf"
                   }
                ],
                "status": "arrived",
                "class": {
                    "system": "urn:oid:1.2.840.114350.1.72.1.7.7.10.696784.13260",
                    "code": "5",
                    "display": "Appointment"
                },
                
                "subject": {
                    "reference": "Patient/ekjU0fvs8A7FYLta98rqLH8BFreepNIUI9D6VaroJyFU3",
                    "display": "Test, Healthchart"
                },
                "participant": [
                    {
                        "type": [
                            {
                                "coding": [
                                    {
                                        "system": "http://hl7.org/fhir/v3/ParticipationType",
                                        "code": "REF",
                                        "display": "referrer"
                                    }
                                ],
                                "text": "referrer"
                            }
                        ],
                        
                    },
                    {
                        "period": {
                            "start": "2022-05-25T14:00:00Z",
                            "end": "2022-05-25T14:30:00Z"
                        },
                        
                    }
                ],
                "period": {
                    "start": "2022-05-25T14:00:00Z",
                    "end": "2022-05-25T14:30:00Z"
                },
                "location": [
                    {
                        "location": {
                            "reference": "Location/44319901",
                            "display": "Buerger Center Allergy"
                        }
                    }
                ]
            },
            "search": {
                "mode": "match"
            }
        },
        {
            "link": [
                {
                    "relation": "self",
                    "url": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter/etPlPSTi-Ck8pFW0vJgBM6A3"
                }
            ],
            "fullUrl": "https://epicictdev.chop.edu/DBHI_FHIR/api/FHIR/R4/Encounter/etPlPSTi-Ck8pFW0vJgBM6A3",
            "resource": {
                "resourceType": "Encounter",
                "id": "etPlPSTi-Ck8pFW0vJgBA3",
                "identifier": [
                    {
                        "use": "usual",
                        "system": "urn:oid:1.2.840.114350.1.13.20.3.7.3.698084.8",
                        "value": "8700006468"
                    },
                    {
                        "use": "usual",
                        "type": {
                            "text": "billing-number"
                        },
                        "system": "urn:oid:1.2.840.114350.1.13.20.3.7.3.698084.17",
                        "value": "8700006468"
                    }
                ],
                "status": "arrived",
                "class": {
                    "system": "urn:oid:1.2.840.114350.1.72.1.7.7.10.696784.13260",
                    "code": "5",
                    "display": "Appointment"
                },
                "type": [
                    {
                        "coding": [
                            {
                                "system": "urn:oid:1.2.840.114350.1.13.20.3.7.10.698084.30",
                                "code": "50",
                                "display": "Appointment"
                            }
                        ],
                        "text": "Appointment"
                    },
                    {
                        "coding": [
                            {
                                "system": "urn:oid:1.2.840.114350.1.13.20.3.7.2.808267",
                                "code": "3044",
                                "display": "BIOLOGIC"
                            }
                        ],
                        "text": "BIOLOGIC"
                    }
                ],
                "subject": {
                    "reference": "Patient/ekjU0fvs8A7FYLta98rqLH8BFreepNIUI9D6VaroJyFU3",
                    "display": "Test, Healthchart"
                },
                "participant": [
                    {
                        "type": [
                            {
                                "coding": [
                                    {
                                        "system": "http://hl7.org/fhir/v3/ParticipationType",
                                        "code": "REF",
                                        "display": "referrer"
                                    }
                                ],
                                "text": "referrer"
                            }
                        ],
                        
                    },
                    {
                        "period": {
                            "start": "2023-05-25T14:00:00Z",
                            "end": "2023-05-25T14:30:00Z"
                        },
                        
                    }
                ],
                "period": {
                    "start": "2023-05-25T14:00:00Z",
                    "end": "2023-05-25T14:30:00Z"
                },
                "location": [
                    {
                        "location": {
                            "reference": "Location/44319902",
                            "display": "Buerger Center Allergy"
                        }
                    }
                ]
            },
            "search": {
                "mode": "match"
            },
            
        },
        {
            resource: {
              resourceType: "Encounter",
              id: 1,
              status:'unknown'
            },
          },
          {
              resource: {
                resourceType: "Encounter",
                id: 2,
                status:'arrived',
                
                period:{
                  start:"2023-08-10T10:00:00",
                  end:"2023-08-15T18:30:00"
                },
                identifier:[
                  {
                      system:'.7.3.698084.8',
                      value:'value',
      
                  }
                ],
                type:[
                  {
                      coding:[
                          {
                              system:".7.10.698084.30",
                              code:'3',
                              display:''
                          }
                      ]
                  }
                ]
              },
            },
            {
                resource: {
                  resourceType: "Encounter",
                  id: 3,
                  status:'in-progress',
                  
                  period:{
                    start:"2023-08-10T10:00:00",
                    end:"2023-08-15T18:30:00"
                  },
                  identifier:[
                    {
                        system:'.7.3.698084.8',
                        value:'value',
        
                    }
                  ],
                  type:[
                    {
                        coding:[
                            {
                                system:".7.10.698084.10110",
                                code:'1',
                                display:''
                            }
                        ]
                    }
                  ]
                },
              },
              {
                resource: {
                  resourceType: "Encounter",
                  id: 4,
                  status:'in-progress',
                  
                  period:{
                    start:"2023-01-10T10:00:00",
                    end:"2023-01-15T18:30:00"
                  },
                  identifier:[
                    {
                        system:'.7.3.698084.8',
                        value:'value',
        
                    }
                  ],
                  type:[
                    {
                        coding:[
                            {
                                system:".7.10.698084.10110",
                                code:'5',
                                display:'Florida'
                            }
                        ]
                    }
                  ]
                },
              },
              {
                resource: {
                  resourceType: "Encounter",
                  id: 5,
                  status:'in-progress',
                  
                  period:{
                    start:"2022-08-10T10:00:00",
                    end:"2022-08-15T18:30:00"
                  },
                  identifier:[
                    {
                        system:'.7.3.698084.8',
                        value:'value',
        
                    }
                  ],
                  type:[
                    {
                        coding:[
                            {
                                system:".7.10.698084.10110",
                                code:'3',
                                display:'Florida'
                            }
                        ]
                    }
                  ]
                },
              },
          {
            resource: {
              resourceType: "Location",
              id: 2,
              name: "name",
              extension: [
                {
                  valueCodeableConcept: {
                    coding: [
                      {
                        system: "",
                        code: 34,
                        display: "something display",
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            resource: {
              resourceType: "Location",
              id: 3,
              name: "name",
              identifier: [{ value: "random value" }],
            },
          },
    ]
};

const  medicationData = {
    "HasProblemLoadingOrders": false,
    "ProblemLoadingOrdersInformation": null,
    "IncludeDiscontinuedAndEndedOrdersFromDate": "6/3/2020",
    "IncludeDiscontinuedAndEndedOrdersToDate": "2/28/2023",
    "IsPatientAdmitted": false,
    "MedicationOrders": [
        {
            "OrderMode": "Outpatient",
            "Name": "bacitracin-polymyxin b 500-10000 units/g Apply to affected area(s) ointment",
            "PatientFriendlyName": "bacitracin-polymyxin b 500-10000 units/g ointment",
            "DiscontinueInstant": null,
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "Apply to skin 2 times daily for 10 days.",
            "Dose": "",
            "OrderedDose": "",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": "2022-05-19T00:00:00Z",
            "EndDate": "2022-05-29T00:00:00Z",
            "StartDateTime": null,
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": 30.0,
            "RefillsFreeTextQuantity": "0",
            "RefillsQuantity": 0,
            "RefillsRemaining": 0,
            "RefillsRemainingDisplay": "0",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": null,
            "IsClinicAdministered": null,
            "IDs": [
                {
                    "ID": "870003774",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": {
                "Number": "0",
                "Title": "Non-Scheduled Medication"
            },
            "DoseUnit": null,
            "OrderedDoseUnit": null,
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "36",
                "Title": "Topical"
            },
            "Frequency": {
                "Id": "500200104",
                "Name": "2 TIMES DAILY",
                "DisplayName": "2 TIMES DAILY"
            },
            "DispenseQuantityUnit": {
                "Number": "4",
                "Title": "g"
            },
            "Indications": [],
            "DiscontinueUser": null,
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "dexamethasone tab(s) 4 mg",
            "PatientFriendlyName": "dexamethasone",
            "DiscontinueInstant": "2022-05-20T18:03:16Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "4",
            "OrderedDose": "4",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-20T18:00:00Z",
            "EndDateTime": "2022-05-20T18:03:16Z",
            "AdminInstructionsHTML": "<!--EPICS-->Ask family for preference about what to dissolve in: yogurt, cherry syrup, juice<!--EPICE-->",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": false,
            "IsClinicAdministered": false,
            "IDs": [
                {
                    "ID": "870003776",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200199",
                "Name": "ONCE",
                "DisplayName": "ONCE"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " 500500271",
                "Name": "DISCHARGE PROVIDER, AUTO",
                "DisplayName": "Discharge Provider, Automatic, MD"
            },
            "DiscontinueReason": {
                "Number": "21",
                "Title": "Patient discharged"
            },
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "predniSONE tab(s) 36.25 mg",
            "PatientFriendlyName": "predniSONE tablet",
            "DiscontinueInstant": "2022-05-20T18:03:16Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "36.25",
            "OrderedDose": "2",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-20T18:00:00Z",
            "EndDateTime": "2022-05-20T18:03:16Z",
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": false,
            "IsClinicAdministered": false,
            "IDs": [
                {
                    "ID": "870003777",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "103",
                "Title": "mg/kg/DOSE"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200199",
                "Name": "ONCE",
                "DisplayName": "ONCE"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " 500500271",
                "Name": "DISCHARGE PROVIDER, AUTO",
                "DisplayName": "Discharge Provider, Automatic, MD"
            },
            "DiscontinueReason": {
                "Number": "21",
                "Title": "Patient discharged"
            },
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "albuterol HFA (ED Only HOME USE) 108 (90 BASE) mcg/ACT oral inh 2 puff(s)",
            "PatientFriendlyName": "albuterol HFA (ED Only HOME USE)",
            "DiscontinueInstant": "2022-05-20T18:03:16Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "2",
            "OrderedDose": "2",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-20T18:00:00Z",
            "EndDateTime": "2022-05-20T18:03:16Z",
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": false,
            "IsClinicAdministered": false,
            "IDs": [
                {
                    "ID": "870003778",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "5006",
                "Title": "puff(s)"
            },
            "OrderedDoseUnit": {
                "Number": "5006",
                "Title": "puff(s)"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "71",
                "Title": "Inhaled"
            },
            "Frequency": {
                "Id": "500200199",
                "Name": "ONCE",
                "DisplayName": "ONCE"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " 500500271",
                "Name": "DISCHARGE PROVIDER, AUTO",
                "DisplayName": "Discharge Provider, Automatic, MD"
            },
            "DiscontinueReason": {
                "Number": "21",
                "Title": "Patient discharged"
            },
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Outpatient",
            "Name": "fluticasone HFA (FLOVENT) 44 mcg/ACT IN oral inhaler",
            "PatientFriendlyName": "fluticasone HFA 44 mcg/ACT oral inhaler",
            "DiscontinueInstant": "2022-05-23T13:11:43Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "Inhale TWO puff(s) by mouth in the morning and TWO puff(s) in the evening.",
            "Dose": "2",
            "OrderedDose": "2",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": "2022-05-20T00:00:00Z",
            "EndDate": "2022-05-23T00:00:00Z",
            "StartDateTime": null,
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": 1.0,
            "RefillsFreeTextQuantity": "0",
            "RefillsQuantity": 0,
            "RefillsRemaining": 0,
            "RefillsRemainingDisplay": "0",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": true,
            "IsSuspended": false,
            "IsPersistent": null,
            "IsClinicAdministered": null,
            "IDs": [
                {
                    "ID": "870003779",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": {
                "Number": "0",
                "Title": "Non-Scheduled Medication"
            },
            "DoseUnit": {
                "Number": "5006",
                "Title": "puff(s)"
            },
            "OrderedDoseUnit": {
                "Number": "5006",
                "Title": "puff(s)"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "71",
                "Title": "Inhaled"
            },
            "Frequency": {
                "Id": "500200104",
                "Name": "2 TIMES DAILY",
                "DisplayName": "2 TIMES DAILY"
            },
            "DispenseQuantityUnit": {
                "Number": "5020",
                "Title": "Inhaler"
            },
            "Indications": [],
            "DiscontinueUser": {
                "Id": " THAYERJ",
                "Name": "THAYER, JERITT",
                "DisplayName": "Thayer, Jeritt G"
            },
            "DiscontinueReason": {
                "Number": "10",
                "Title": "Therapy completed"
            },
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "dexamethasone tab(s) 4 mg",
            "PatientFriendlyName": "dexamethasone",
            "DiscontinueInstant": "2022-05-20T18:10:14Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "4",
            "OrderedDose": "4",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-20T18:15:00Z",
            "EndDateTime": "2022-05-20T18:10:14Z",
            "AdminInstructionsHTML": "<!--EPICS-->Ask family for preference about what to dissolve in: yogurt, cherry syrup, juice<!--EPICE-->",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": false,
            "IsClinicAdministered": false,
            "IDs": [
                {
                    "ID": "870003782",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200199",
                "Name": "ONCE",
                "DisplayName": "ONCE"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " 500500271",
                "Name": "DISCHARGE PROVIDER, AUTO",
                "DisplayName": "Discharge Provider, Automatic, MD"
            },
            "DiscontinueReason": {
                "Number": "21",
                "Title": "Patient discharged"
            },
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "predniSONE tab(s) 36.25 mg",
            "PatientFriendlyName": "predniSONE tablet",
            "DiscontinueInstant": "2022-05-20T18:10:14Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "36.25",
            "OrderedDose": "2",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-20T18:15:00Z",
            "EndDateTime": "2022-05-20T18:10:14Z",
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": false,
            "IsClinicAdministered": false,
            "IDs": [
                {
                    "ID": "870003783",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "103",
                "Title": "mg/kg/DOSE"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200199",
                "Name": "ONCE",
                "DisplayName": "ONCE"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " 500500271",
                "Name": "DISCHARGE PROVIDER, AUTO",
                "DisplayName": "Discharge Provider, Automatic, MD"
            },
            "DiscontinueReason": {
                "Number": "21",
                "Title": "Patient discharged"
            },
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "montelukast tab(s) 5 mg",
            "PatientFriendlyName": "montelukast",
            "DiscontinueInstant": "2022-05-20T18:10:14Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "5",
            "OrderedDose": "5",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-21T12:00:00Z",
            "EndDateTime": "2022-05-20T18:10:14Z",
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": false,
            "IsClinicAdministered": false,
            "IDs": [
                {
                    "ID": "870003784",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200101",
                "Name": "DAILY",
                "DisplayName": "DAILY"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " 500500271",
                "Name": "DISCHARGE PROVIDER, AUTO",
                "DisplayName": "Discharge Provider, Automatic, MD"
            },
            "DiscontinueReason": {
                "Number": "21",
                "Title": "Patient discharged"
            },
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "dexamethasone tab(s) 4 mg",
            "PatientFriendlyName": "dexamethasone",
            "DiscontinueInstant": "2022-05-20T18:18:05Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "4",
            "OrderedDose": "4",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-20T18:15:00Z",
            "EndDateTime": "2022-05-20T18:18:05Z",
            "AdminInstructionsHTML": "<!--EPICS-->Ask family for preference about what to dissolve in: yogurt, cherry syrup, juice<!--EPICE-->",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": false,
            "IsClinicAdministered": false,
            "IDs": [
                {
                    "ID": "870003787",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200199",
                "Name": "ONCE",
                "DisplayName": "ONCE"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " 500500271",
                "Name": "DISCHARGE PROVIDER, AUTO",
                "DisplayName": "Discharge Provider, Automatic, MD"
            },
            "DiscontinueReason": {
                "Number": "21",
                "Title": "Patient discharged"
            },
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "dexamethasone tab(s) 4 mg",
            "PatientFriendlyName": "dexamethasone",
            "DiscontinueInstant": "2022-05-20T18:24:26Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "4",
            "OrderedDose": "4",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-20T18:30:00Z",
            "EndDateTime": "2022-05-20T18:24:26Z",
            "AdminInstructionsHTML": "<!--EPICS-->Ask family for preference about what to dissolve in: yogurt, cherry syrup, juice<!--EPICE-->",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": false,
            "IsClinicAdministered": false,
            "IDs": [
                {
                    "ID": "870003790",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200199",
                "Name": "ONCE",
                "DisplayName": "ONCE"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " 500500271",
                "Name": "DISCHARGE PROVIDER, AUTO",
                "DisplayName": "Discharge Provider, Automatic, MD"
            },
            "DiscontinueReason": {
                "Number": "21",
                "Title": "Patient discharged"
            },
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "dexamethasone tab(s) 4 mg",
            "PatientFriendlyName": "dexamethasone",
            "DiscontinueInstant": "2022-05-20T18:29:39Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "4",
            "OrderedDose": "4",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-20T18:30:00Z",
            "EndDateTime": "2022-05-20T18:29:39Z",
            "AdminInstructionsHTML": "<!--EPICS-->Ask family for preference about what to dissolve in: yogurt, cherry syrup, juice<!--EPICE-->",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": false,
            "IsClinicAdministered": false,
            "IDs": [
                {
                    "ID": "870003793",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200199",
                "Name": "ONCE",
                "DisplayName": "ONCE"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " 500500271",
                "Name": "DISCHARGE PROVIDER, AUTO",
                "DisplayName": "Discharge Provider, Automatic, MD"
            },
            "DiscontinueReason": {
                "Number": "21",
                "Title": "Patient discharged"
            },
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "dexamethasone tab(s) 4 mg",
            "PatientFriendlyName": "dexamethasone",
            "DiscontinueInstant": "2022-05-20T18:36:24Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "4",
            "OrderedDose": "4",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-20T18:45:00Z",
            "EndDateTime": "2022-05-20T18:36:24Z",
            "AdminInstructionsHTML": "<!--EPICS-->Ask family for preference about what to dissolve in: yogurt, cherry syrup, juice<!--EPICE-->",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": false,
            "IsClinicAdministered": false,
            "IDs": [
                {
                    "ID": "870003796",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200199",
                "Name": "ONCE",
                "DisplayName": "ONCE"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " 500500271",
                "Name": "DISCHARGE PROVIDER, AUTO",
                "DisplayName": "Discharge Provider, Automatic, MD"
            },
            "DiscontinueReason": {
                "Number": "21",
                "Title": "Patient discharged"
            },
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "predniSONE tab(s) 36.25 mg",
            "PatientFriendlyName": "predniSONE tablet",
            "DiscontinueInstant": "2022-05-20T18:36:24Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "36.25",
            "OrderedDose": "2",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-20T18:45:00Z",
            "EndDateTime": "2022-05-20T18:36:24Z",
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": false,
            "IsClinicAdministered": false,
            "IDs": [
                {
                    "ID": "870003797",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "103",
                "Title": "mg/kg/DOSE"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200199",
                "Name": "ONCE",
                "DisplayName": "ONCE"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " 500500271",
                "Name": "DISCHARGE PROVIDER, AUTO",
                "DisplayName": "Discharge Provider, Automatic, MD"
            },
            "DiscontinueReason": {
                "Number": "21",
                "Title": "Patient discharged"
            },
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "montelukast tab(s) 5 mg",
            "PatientFriendlyName": "montelukast",
            "DiscontinueInstant": "2022-05-20T18:36:24Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "5",
            "OrderedDose": "5",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-21T00:00:00Z",
            "EndDateTime": "2022-05-20T18:36:24Z",
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": false,
            "IsClinicAdministered": false,
            "IDs": [
                {
                    "ID": "870003798",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200165",
                "Name": "NIGHTLY",
                "DisplayName": "NIGHTLY"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " 500500271",
                "Name": "DISCHARGE PROVIDER, AUTO",
                "DisplayName": "Discharge Provider, Automatic, MD"
            },
            "DiscontinueReason": {
                "Number": "21",
                "Title": "Patient discharged"
            },
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Outpatient",
            "Name": "fluticasone HFA (Flovent HFA) 44 mcg/ACT Inhalation oral inhaler",
            "PatientFriendlyName": "Flovent HFA 44 mcg/ACT oral inhaler",
            "DiscontinueInstant": "2022-05-23T13:41:00Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "Inhale ONE puff(s) by mouth in the morning and ONE puff(s) in the evening. Flare Plan: 2 puffs  three times daily for one week.",
            "Dose": "1",
            "OrderedDose": "1",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": "2022-05-23T00:00:00Z",
            "EndDate": "2022-05-23T00:00:00Z",
            "StartDateTime": null,
            "EndDateTime": null,
            "AdminInstructionsHTML": "<!--EPICS-->Flare Plan: 2 puffs&nbsp;&nbsp;three times daily for one week<!--EPICE-->",
            "DispenseQuantity": 2.0,
            "RefillsFreeTextQuantity": "5",
            "RefillsQuantity": 5,
            "RefillsRemaining": 5,
            "RefillsRemainingDisplay": "5",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": true,
            "IsSuspended": false,
            "IsPersistent": null,
            "IsClinicAdministered": null,
            "IDs": [
                {
                    "ID": "870003800",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": {
                "Number": "0",
                "Title": "Non-Scheduled Medication"
            },
            "DoseUnit": {
                "Number": "5006",
                "Title": "puff(s)"
            },
            "OrderedDoseUnit": {
                "Number": "5006",
                "Title": "puff(s)"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "71",
                "Title": "Inhaled"
            },
            "Frequency": {
                "Id": "500200104",
                "Name": "2 TIMES DAILY",
                "DisplayName": "2 TIMES DAILY"
            },
            "DispenseQuantityUnit": {
                "Number": "5020",
                "Title": "Inhaler"
            },
            "Indications": [],
            "DiscontinueUser": {
                "Id": " THAYERJ",
                "Name": "THAYER, JERITT",
                "DisplayName": "Thayer, Jeritt G"
            },
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Outpatient",
            "Name": "predniSONE 10 mg Oral tablet",
            "PatientFriendlyName": "predniSONE 10 mg tablet",
            "DiscontinueInstant": "2022-05-23T13:30:06Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "Take THREE tablet(s) (30 mg total) by mouth in the morning and THREE tablet(s) (30 mg total) in the evening. Do all this for 5 days.",
            "Dose": "30",
            "OrderedDose": "30",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": "2022-05-23T00:00:00Z",
            "EndDate": "2022-05-23T00:00:00Z",
            "StartDateTime": null,
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": 30.0,
            "RefillsFreeTextQuantity": "0",
            "RefillsQuantity": 0,
            "RefillsRemaining": 0,
            "RefillsRemainingDisplay": "0",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": null,
            "IsClinicAdministered": null,
            "IDs": [
                {
                    "ID": "870003801",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": {
                "Number": "0",
                "Title": "Non-Scheduled Medication"
            },
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200104",
                "Name": "2 TIMES DAILY",
                "DisplayName": "2 TIMES DAILY"
            },
            "DispenseQuantityUnit": {
                "Number": "5002",
                "Title": "tablet(s)"
            },
            "Indications": [],
            "DiscontinueUser": {
                "Id": " THAYERJ",
                "Name": "THAYER, JERITT",
                "DisplayName": "Thayer, Jeritt G"
            },
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Outpatient",
            "Name": "predniSONE 10 mg Oral tablet",
            "PatientFriendlyName": "predniSONE 10 mg tablet",
            "DiscontinueInstant": "2022-05-23T16:34:43Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "Take THREE tablet(s) (30 mg total) by mouth in the morning and THREE tablet(s) (30 mg total) in the evening. Do all this for 5 days.",
            "Dose": "30",
            "OrderedDose": "30",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": "2022-05-23T00:00:00Z",
            "EndDate": "2022-05-23T00:00:00Z",
            "StartDateTime": null,
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": 30.0,
            "RefillsFreeTextQuantity": "0",
            "RefillsQuantity": 0,
            "RefillsRemaining": 0,
            "RefillsRemainingDisplay": "0",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": null,
            "IsClinicAdministered": null,
            "IDs": [
                {
                    "ID": "870003803",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": {
                "Number": "0",
                "Title": "Non-Scheduled Medication"
            },
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200104",
                "Name": "2 TIMES DAILY",
                "DisplayName": "2 TIMES DAILY"
            },
            "DispenseQuantityUnit": {
                "Number": "5002",
                "Title": "tablet(s)"
            },
            "Indications": [],
            "DiscontinueUser": {
                "Id": " THAYERJ",
                "Name": "THAYER, JERITT",
                "DisplayName": "Thayer, Jeritt G"
            },
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Outpatient",
            "Name": "montelukast (Singulair) 5 mg Oral chewable tablet",
            "PatientFriendlyName": "montelukast 5 mg chewable tablet",
            "DiscontinueInstant": "2022-05-23T14:37:35Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "Take ONE tablet(s) (5 mg total) by mouth at bedtime.",
            "Dose": "5",
            "OrderedDose": "5",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": "2022-05-23T00:00:00Z",
            "EndDate": "2022-05-23T00:00:00Z",
            "StartDateTime": null,
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": 30.0,
            "RefillsFreeTextQuantity": "5",
            "RefillsQuantity": 5,
            "RefillsRemaining": 5,
            "RefillsRemainingDisplay": "5",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": null,
            "IsClinicAdministered": null,
            "IDs": [
                {
                    "ID": "870003805",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": {
                "Number": "0",
                "Title": "Non-Scheduled Medication"
            },
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200165",
                "Name": "NIGHTLY",
                "DisplayName": "NIGHTLY"
            },
            "DispenseQuantityUnit": {
                "Number": "5002",
                "Title": "tablet(s)"
            },
            "Indications": [],
            "DiscontinueUser": {
                "Id": " THAYERJ",
                "Name": "THAYER, JERITT",
                "DisplayName": "Thayer, Jeritt G"
            },
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "omalizumab SOLR 150 mg",
            "PatientFriendlyName": "omalizumab",
            "DiscontinueInstant": null,
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "150",
            "OrderedDose": "150",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-23T13:45:00Z",
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": true,
            "IsClinicAdministered": true,
            "IDs": [
                {
                    "ID": "870003806",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "18",
                "Title": "Subcutaneous"
            },
            "Frequency": {
                "Id": "500100302",
                "Name": "EVERY 28 DAYS",
                "DisplayName": "EVERY 28 DAYS"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": null,
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Outpatient",
            "Name": "fluticasone HFA (Flovent HFA) 44 mcg/ACT Inhalation oral inhaler",
            "PatientFriendlyName": "Flovent HFA 44 mcg/ACT oral inhaler",
            "DiscontinueInstant": "2022-05-23T14:37:48Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "Inhale THREE puff(s) by mouth in the morning and THREE puff(s) at noon and THREE puff(s) in the evening.",
            "Dose": "3",
            "OrderedDose": "3",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": "2022-05-23T00:00:00Z",
            "EndDate": "2022-05-23T00:00:00Z",
            "StartDateTime": null,
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": 1.0,
            "RefillsFreeTextQuantity": "5",
            "RefillsQuantity": 5,
            "RefillsRemaining": 5,
            "RefillsRemainingDisplay": "5",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": true,
            "IsSuspended": false,
            "IsPersistent": null,
            "IsClinicAdministered": null,
            "IDs": [
                {
                    "ID": "870003807",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": {
                "Number": "0",
                "Title": "Non-Scheduled Medication"
            },
            "DoseUnit": {
                "Number": "5006",
                "Title": "puff(s)"
            },
            "OrderedDoseUnit": {
                "Number": "5006",
                "Title": "puff(s)"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "71",
                "Title": "Inhaled"
            },
            "Frequency": {
                "Id": "500200155",
                "Name": "3 TIMES DAILY",
                "DisplayName": "3 TIMES DAILY"
            },
            "DispenseQuantityUnit": {
                "Number": "5020",
                "Title": "Inhaler"
            },
            "Indications": [],
            "DiscontinueUser": {
                "Id": " THAYERJ",
                "Name": "THAYER, JERITT",
                "DisplayName": "Thayer, Jeritt G"
            },
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "Mepolizumab inj SOLR 5 mg",
            "PatientFriendlyName": "Nucala",
            "DiscontinueInstant": "2022-05-23T13:59:56Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "5",
            "OrderedDose": "5",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-23T14:00:00Z",
            "EndDateTime": "2022-05-23T13:59:56Z",
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": true,
            "IsClinicAdministered": true,
            "IDs": [
                {
                    "ID": "870003809",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "18",
                "Title": "Subcutaneous"
            },
            "Frequency": {
                "Id": "100037",
                "Name": "MONTHLY",
                "DisplayName": "MONTHLY"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " THAYERJ",
                "Name": "THAYER, JERITT",
                "DisplayName": "Thayer, Jeritt G"
            },
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "Mepolizumab inj SOLR 5 mg",
            "PatientFriendlyName": "Nucala",
            "DiscontinueInstant": "2022-05-23T13:59:56Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "5",
            "OrderedDose": "5",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-23T14:00:00Z",
            "EndDateTime": "2022-05-23T13:59:56Z",
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": true,
            "IsClinicAdministered": true,
            "IDs": [
                {
                    "ID": "870003810",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "18",
                "Title": "Subcutaneous"
            },
            "Frequency": {
                "Id": "100037",
                "Name": "MONTHLY",
                "DisplayName": "MONTHLY"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " THAYERJ",
                "Name": "THAYER, JERITT",
                "DisplayName": "Thayer, Jeritt G"
            },
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "Mepolizumab inj SOLR 5 mg",
            "PatientFriendlyName": "Nucala",
            "DiscontinueInstant": "2022-05-23T13:59:56Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "5",
            "OrderedDose": "5",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-23T14:00:00Z",
            "EndDateTime": "2022-05-23T13:59:56Z",
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": true,
            "IsClinicAdministered": true,
            "IDs": [
                {
                    "ID": "870003811",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "18",
                "Title": "Subcutaneous"
            },
            "Frequency": {
                "Id": "100037",
                "Name": "MONTHLY",
                "DisplayName": "MONTHLY"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " THAYERJ",
                "Name": "THAYER, JERITT",
                "DisplayName": "Thayer, Jeritt G"
            },
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "Mepolizumab inj SOLR 5 mg",
            "PatientFriendlyName": "Nucala",
            "DiscontinueInstant": "2022-05-23T14:34:59Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "5",
            "OrderedDose": "5",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-23T14:00:00Z",
            "EndDateTime": "2022-05-23T14:34:59Z",
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": true,
            "IsClinicAdministered": true,
            "IDs": [
                {
                    "ID": "870003812",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "18",
                "Title": "Subcutaneous"
            },
            "Frequency": {
                "Id": "100037",
                "Name": "MONTHLY",
                "DisplayName": "MONTHLY"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " THAYERJ",
                "Name": "THAYER, JERITT",
                "DisplayName": "Thayer, Jeritt G"
            },
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "Mepolizumab inj SOLR 5 mg",
            "PatientFriendlyName": "Nucala",
            "DiscontinueInstant": "2022-05-23T14:38:15Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "5",
            "OrderedDose": "5",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-23T14:45:00Z",
            "EndDateTime": "2022-05-23T14:38:15Z",
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": true,
            "IsClinicAdministered": true,
            "IDs": [
                {
                    "ID": "870003813",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "18",
                "Title": "Subcutaneous"
            },
            "Frequency": {
                "Id": "100037",
                "Name": "MONTHLY",
                "DisplayName": "MONTHLY"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " THAYERJ",
                "Name": "THAYER, JERITT",
                "DisplayName": "Thayer, Jeritt G"
            },
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "Mepolizumab inj SOLR 5 mg",
            "PatientFriendlyName": "Nucala",
            "DiscontinueInstant": "2022-05-23T14:44:15Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "5",
            "OrderedDose": "5",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-23T14:45:00Z",
            "EndDateTime": "2022-05-23T14:44:15Z",
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": true,
            "IsClinicAdministered": true,
            "IDs": [
                {
                    "ID": "870003814",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "18",
                "Title": "Subcutaneous"
            },
            "Frequency": {
                "Id": "100037",
                "Name": "MONTHLY",
                "DisplayName": "MONTHLY"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " THAYERJ",
                "Name": "THAYER, JERITT",
                "DisplayName": "Thayer, Jeritt G"
            },
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Outpatient",
            "Name": "montelukast (Singulair) 5 mg Oral chewable tablet",
            "PatientFriendlyName": "montelukast 5 mg chewable tablet",
            "DiscontinueInstant": "2022-05-23T14:51:14Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "Take ONE tablet(s) (5 mg total) by mouth at bedtime.",
            "Dose": "5",
            "OrderedDose": "5",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": "2022-05-23T00:00:00Z",
            "EndDate": "2022-05-23T00:00:00Z",
            "StartDateTime": null,
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": 30.0,
            "RefillsFreeTextQuantity": "5",
            "RefillsQuantity": 5,
            "RefillsRemaining": 5,
            "RefillsRemainingDisplay": "5",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": null,
            "IsClinicAdministered": null,
            "IDs": [
                {
                    "ID": "870003815",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": {
                "Number": "0",
                "Title": "Non-Scheduled Medication"
            },
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200165",
                "Name": "NIGHTLY",
                "DisplayName": "NIGHTLY"
            },
            "DispenseQuantityUnit": {
                "Number": "5002",
                "Title": "tablet(s)"
            },
            "Indications": [],
            "DiscontinueUser": {
                "Id": " THAYERJ",
                "Name": "THAYER, JERITT",
                "DisplayName": "Thayer, Jeritt G"
            },
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Outpatient",
            "Name": "fluticasone HFA (Flovent HFA) 44 mcg/ACT Inhalation oral inhaler",
            "PatientFriendlyName": "Flovent HFA 44 mcg/ACT oral inhaler",
            "DiscontinueInstant": "2022-05-23T14:54:56Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "Inhale ONE puff(s) by mouth in the morning and ONE puff(s) in the evening. Flare Plan: 2 puffs  three times daily for one week.",
            "Dose": "1",
            "OrderedDose": "1",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": "2022-05-23T00:00:00Z",
            "EndDate": "2022-05-23T00:00:00Z",
            "StartDateTime": null,
            "EndDateTime": null,
            "AdminInstructionsHTML": "<!--EPICS-->Flare Plan: 2 puffs&nbsp;&nbsp;three times daily for one week<!--EPICE-->",
            "DispenseQuantity": 2.0,
            "RefillsFreeTextQuantity": "5",
            "RefillsQuantity": 5,
            "RefillsRemaining": 5,
            "RefillsRemainingDisplay": "5",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": true,
            "IsSuspended": false,
            "IsPersistent": null,
            "IsClinicAdministered": null,
            "IDs": [
                {
                    "ID": "870003816",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": {
                "Number": "0",
                "Title": "Non-Scheduled Medication"
            },
            "DoseUnit": {
                "Number": "5006",
                "Title": "puff(s)"
            },
            "OrderedDoseUnit": {
                "Number": "5006",
                "Title": "puff(s)"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "71",
                "Title": "Inhaled"
            },
            "Frequency": {
                "Id": "500200104",
                "Name": "2 TIMES DAILY",
                "DisplayName": "2 TIMES DAILY"
            },
            "DispenseQuantityUnit": {
                "Number": "5020",
                "Title": "Inhaler"
            },
            "Indications": [],
            "DiscontinueUser": {
                "Id": " THAYERJ",
                "Name": "THAYER, JERITT",
                "DisplayName": "Thayer, Jeritt G"
            },
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "Mepolizumab inj SOLR 5 mg",
            "PatientFriendlyName": "Nucala",
            "DiscontinueInstant": "2022-05-23T14:46:59Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "5",
            "OrderedDose": "5",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-23T14:45:00Z",
            "EndDateTime": "2022-05-23T14:46:59Z",
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": true,
            "IsClinicAdministered": true,
            "IDs": [
                {
                    "ID": "870003817",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "18",
                "Title": "Subcutaneous"
            },
            "Frequency": {
                "Id": "100037",
                "Name": "MONTHLY",
                "DisplayName": "MONTHLY"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": {
                "Id": " THAYERJ",
                "Name": "THAYER, JERITT",
                "DisplayName": "Thayer, Jeritt G"
            },
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "Mepolizumab inj SOLR 5 mg",
            "PatientFriendlyName": "Nucala",
            "DiscontinueInstant": null,
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "5",
            "OrderedDose": "5",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-05-23T15:00:00Z",
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": true,
            "IsClinicAdministered": true,
            "IDs": [
                {
                    "ID": "870003818",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "18",
                "Title": "Subcutaneous"
            },
            "Frequency": {
                "Id": "100037",
                "Name": "MONTHLY",
                "DisplayName": "MONTHLY"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": null,
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Outpatient",
            "Name": "montelukast (Singulair) 5 mg Oral chewable tablet",
            "PatientFriendlyName": "montelukast 5 mg chewable tablet",
            "DiscontinueInstant": "2022-05-24T14:57:35Z",
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "Take ONE tablet(s) (5 mg total) by mouth once a day.",
            "Dose": "5",
            "OrderedDose": "5",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": "2022-05-23T00:00:00Z",
            "EndDate": "2022-05-24T00:00:00Z",
            "StartDateTime": null,
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": 30.0,
            "RefillsFreeTextQuantity": "5",
            "RefillsQuantity": 5,
            "RefillsRemaining": 5,
            "RefillsRemainingDisplay": "5",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": null,
            "IsClinicAdministered": null,
            "IDs": [
                {
                    "ID": "870003819",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": {
                "Number": "0",
                "Title": "Non-Scheduled Medication"
            },
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200101",
                "Name": "DAILY",
                "DisplayName": "DAILY"
            },
            "DispenseQuantityUnit": {
                "Number": "5002",
                "Title": "tablet(s)"
            },
            "Indications": [],
            "DiscontinueUser": {
                "Id": " THAYERJ",
                "Name": "THAYER, JERITT",
                "DisplayName": "Thayer, Jeritt G"
            },
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Outpatient",
            "Name": "fluticasone HFA (Flovent HFA) 220 mcg/ACT Inhalation oral inhaler",
            "PatientFriendlyName": "Flovent HFA 220 mcg/ACT oral inhaler",
            "DiscontinueInstant": null,
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "Inhale TWO puff(s) by mouth in the morning and TWO puff(s) in the evening. FLARE PLAN: 3 puffs three times daily for one week.",
            "Dose": "2",
            "OrderedDose": "2",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": "2022-05-23T00:00:00Z",
            "EndDate": "2022-11-19T00:00:00Z",
            "StartDateTime": null,
            "EndDateTime": null,
            "AdminInstructionsHTML": "<!--EPICS-->FLARE PLAN: 3 puffs three times daily for one week<!--EPICE-->",
            "DispenseQuantity": 2.0,
            "RefillsFreeTextQuantity": "5",
            "RefillsQuantity": 5,
            "RefillsRemaining": 5,
            "RefillsRemainingDisplay": "5",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": true,
            "IsSuspended": false,
            "IsPersistent": null,
            "IsClinicAdministered": null,
            "IDs": [
                {
                    "ID": "870003820",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": {
                "Number": "0",
                "Title": "Non-Scheduled Medication"
            },
            "DoseUnit": {
                "Number": "5006",
                "Title": "puff(s)"
            },
            "OrderedDoseUnit": {
                "Number": "5006",
                "Title": "puff(s)"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "71",
                "Title": "Inhaled"
            },
            "Frequency": {
                "Id": "500200104",
                "Name": "2 TIMES DAILY",
                "DisplayName": "2 TIMES DAILY"
            },
            "DispenseQuantityUnit": {
                "Number": "5020",
                "Title": "Inhaler"
            },
            "Indications": [],
            "DiscontinueUser": null,
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Outpatient",
            "Name": "predniSONE 10 mg Oral tablet",
            "PatientFriendlyName": "predniSONE 10 mg tablet",
            "DiscontinueInstant": null,
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "Take THREE tablet(s) (30 mg total) by mouth in the morning and THREE tablet(s) (30 mg total) in the evening. Do all this for 5 days.",
            "Dose": "30",
            "OrderedDose": "30",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": "2022-05-23T00:00:00Z",
            "EndDate": "2022-05-28T00:00:00Z",
            "StartDateTime": null,
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": 30.0,
            "RefillsFreeTextQuantity": "0",
            "RefillsQuantity": 0,
            "RefillsRemaining": 0,
            "RefillsRemainingDisplay": "0",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": null,
            "IsClinicAdministered": null,
            "IDs": [
                {
                    "ID": "870003823",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": {
                "Number": "0",
                "Title": "Non-Scheduled Medication"
            },
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200104",
                "Name": "2 TIMES DAILY",
                "DisplayName": "2 TIMES DAILY"
            },
            "DispenseQuantityUnit": {
                "Number": "5002",
                "Title": "tablet(s)"
            },
            "Indications": [],
            "DiscontinueUser": null,
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Outpatient",
            "Name": "fluticasone-salmeterol HFA (Advair HFA) 45-21 mcg/ACT Inhalation HFA inhaler",
            "PatientFriendlyName": "Advair HFA 45-21 mcg/ACT HFA inhaler",
            "DiscontinueInstant": null,
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "Inhale ONE puff(s) by mouth in the morning and ONE puff(s) in the evening.",
            "Dose": "1",
            "OrderedDose": "1",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": "2022-05-23T00:00:00Z",
            "EndDate": null,
            "StartDateTime": null,
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": 1.0,
            "RefillsFreeTextQuantity": "5",
            "RefillsQuantity": 5,
            "RefillsRemaining": 5,
            "RefillsRemainingDisplay": "5",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": null,
            "IsClinicAdministered": null,
            "IDs": [
                {
                    "ID": "870003824",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": {
                "Number": "0",
                "Title": "Non-Scheduled Medication"
            },
            "DoseUnit": {
                "Number": "5006",
                "Title": "puff(s)"
            },
            "OrderedDoseUnit": {
                "Number": "10079",
                "Title": "Inhalation(s)"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "71",
                "Title": "Inhaled"
            },
            "Frequency": {
                "Id": "500200104",
                "Name": "2 TIMES DAILY",
                "DisplayName": "2 TIMES DAILY"
            },
            "DispenseQuantityUnit": {
                "Number": "5020",
                "Title": "Inhaler"
            },
            "Indications": [],
            "DiscontinueUser": null,
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Outpatient",
            "Name": "montelukast (Singulair) 4 MG Oral packet",
            "PatientFriendlyName": "montelukast 4 MG packet",
            "DiscontinueInstant": null,
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "Take ONE Packet (4 mg total) by mouth at bedtime.",
            "Dose": "4",
            "OrderedDose": "4",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": "2022-05-24T00:00:00Z",
            "EndDate": "2022-11-20T00:00:00Z",
            "StartDateTime": null,
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": 30.0,
            "RefillsFreeTextQuantity": "5",
            "RefillsQuantity": 5,
            "RefillsRemaining": 5,
            "RefillsRemainingDisplay": "5",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": null,
            "IsClinicAdministered": null,
            "IDs": [
                {
                    "ID": "870003877",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": {
                "Number": "0",
                "Title": "Non-Scheduled Medication"
            },
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200165",
                "Name": "NIGHTLY",
                "DisplayName": "NIGHTLY"
            },
            "DispenseQuantityUnit": {
                "Number": "5025",
                "Title": "Packet"
            },
            "Indications": [],
            "DiscontinueUser": null,
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "omalizumab SOLR 10 mg",
            "PatientFriendlyName": "omalizumab",
            "DiscontinueInstant": null,
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "10",
            "OrderedDose": "10",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2022-07-22T04:00:00Z",
            "EndDateTime": "2023-02-17T04:59:00Z",
            "AdminInstructionsHTML": "<!--EPICS-->Inject under skin into fat tissue once for 1 dose<!--EPICE-->",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": true,
            "IsClinicAdministered": true,
            "IDs": [
                {
                    "ID": "870003878",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "18",
                "Title": "Subcutaneous"
            },
            "Frequency": {
                "Id": "500100300",
                "Name": "EVERY 14 DAYS",
                "DisplayName": "EVERY 14 DAYS"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": null,
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "dexamethasone tab(s) 10 mg",
            "PatientFriendlyName": "dexamethasone tablet",
            "DiscontinueInstant": null,
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "10",
            "OrderedDose": "10",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2023-02-28T15:00:00Z",
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": false,
            "IsClinicAdministered": false,
            "IDs": [
                {
                    "ID": "870003879",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200101",
                "Name": "DAILY",
                "DisplayName": "DAILY"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": null,
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "fluticasone HFA 110 mcg/ACT oral inh 1 puff(s)",
            "PatientFriendlyName": "Flovent HFA",
            "DiscontinueInstant": null,
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "1",
            "OrderedDose": "1",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2023-02-28T15:00:00Z",
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": true,
            "IsSuspended": false,
            "IsPersistent": false,
            "IsClinicAdministered": false,
            "IDs": [
                {
                    "ID": "870003880",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": {
                "Number": "5006",
                "Title": "puff(s)"
            },
            "OrderedDoseUnit": {
                "Number": "5006",
                "Title": "puff(s)"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "71",
                "Title": "Inhaled"
            },
            "Frequency": {
                "Id": "500200104",
                "Name": "2 TIMES DAILY",
                "DisplayName": "2 TIMES DAILY"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": null,
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Inpatient",
            "Name": "predniSONE tab(s) 0.5 mg/kg/DOSE (Dosing Weight)",
            "PatientFriendlyName": "predniSONE",
            "DiscontinueInstant": null,
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "",
            "Dose": "",
            "OrderedDose": "0.5",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": null,
            "EndDate": null,
            "StartDateTime": "2023-02-28T15:00:00Z",
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": null,
            "RefillsFreeTextQuantity": "",
            "RefillsQuantity": null,
            "RefillsRemaining": null,
            "RefillsRemainingDisplay": "",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": false,
            "IsClinicAdministered": false,
            "IDs": [
                {
                    "ID": "870003881",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": null,
            "DoseUnit": null,
            "OrderedDoseUnit": {
                "Number": "103",
                "Title": "mg/kg/DOSE"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200101",
                "Name": "DAILY",
                "DisplayName": "DAILY"
            },
            "DispenseQuantityUnit": null,
            "Indications": [],
            "DiscontinueUser": null,
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Outpatient",
            "Name": "montelukast 4 mg Oral chewable tablet",
            "PatientFriendlyName": "montelukast 4 mg chewable tablet",
            "DiscontinueInstant": null,
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "Take ONE tablet(s) (4 mg total) by mouth at bedtime.",
            "Dose": "4",
            "OrderedDose": "4",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": "2023-02-28T00:00:00Z",
            "EndDate": null,
            "StartDateTime": null,
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": 1.0,
            "RefillsFreeTextQuantity": "0",
            "RefillsQuantity": 0,
            "RefillsRemaining": 0,
            "RefillsRemainingDisplay": "0",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": null,
            "IsClinicAdministered": null,
            "IDs": [
                {
                    "ID": "870003882",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": {
                "Number": "0",
                "Title": "Non-Scheduled Medication"
            },
            "DoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "OrderedDoseUnit": {
                "Number": "3",
                "Title": "mg"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "15",
                "Title": "Oral"
            },
            "Frequency": {
                "Id": "500200165",
                "Name": "NIGHTLY",
                "DisplayName": "NIGHTLY"
            },
            "DispenseQuantityUnit": {
                "Number": "5002",
                "Title": "tablet(s)"
            },
            "Indications": [],
            "DiscontinueUser": null,
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        },
        {
            "OrderMode": "Outpatient",
            "Name": "Fluticasone-Salmeterol 113-14 MCG/ACT Inhalation AEPB",
            "PatientFriendlyName": "Fluticasone-Salmeterol 113-14 MCG/ACT Aepb",
            "DiscontinueInstant": null,
            "IsMixture": false,
            "Comment": "",
            "EditedSig": "",
            "TranslatedSig": "",
            "PatientSig": "Inhale 1 puff(s) by mouth in the morning and 1 puff(s) in the evening.",
            "Dose": "",
            "OrderedDose": "1",
            "DoseAdminDuration": "",
            "InfusionRate": "",
            "StartDate": "2023-02-28T00:00:00Z",
            "EndDate": null,
            "StartDateTime": null,
            "EndDateTime": null,
            "AdminInstructionsHTML": "",
            "DispenseQuantity": 1.0,
            "RefillsFreeTextQuantity": "5",
            "RefillsQuantity": 5,
            "RefillsRemaining": 5,
            "RefillsRemainingDisplay": "5",
            "IndicationsComments": "",
            "PrescriptionNumber": "",
            "LastDispensedDateTime": null,
            "WeightHeightChangedWarning": "",
            "PRNComment": "",
            "IsLongTerm": false,
            "IsSuspended": false,
            "IsPersistent": null,
            "IsClinicAdministered": null,
            "IDs": [
                {
                    "ID": "870003883",
                    "Type": "Internal"
                }
            ],
            "DEASchedule": {
                "Number": "0",
                "Title": "Non-Scheduled Medication"
            },
            "DoseUnit": null,
            "OrderedDoseUnit": {
                "Number": "5006",
                "Title": "puff(s)"
            },
            "DoseAdminDurationUnit": null,
            "InfusionRateUnit": null,
            "Route": {
                "Number": "7",
                "Title": "Inhalation"
            },
            "Frequency": {
                "Id": "500200104",
                "Name": "2 TIMES DAILY",
                "DisplayName": "2 TIMES DAILY"
            },
            "DispenseQuantityUnit": {
                "Number": "5001",
                "Title": "Each"
            },
            "Indications": [],
            "DiscontinueUser": null,
            "DiscontinueReason": null,
            "PRNReasons": [],
            "PatientReportedSig": null
        }
    ]
};

const  medicationRequestData ={
    entry:[]
};

// Obtain EHR token
var ehrToken;

// Initialize action queue - required to ensure synchronous behavior
var actionQueue = [];

// Boolean to deteremine if an action is in process
var awaitingAction;

// Initialize callback function object
var cbFns;

// Initialize logging placeholder
var logger;

function addEHRListener(cbObj) {
    // Init values
    cbFns = cbObj || {};

    // Sets log function
    logger = cbObj.logFn;

    // Add event listener
    window.addEventListener("message", ehrListener, false);
}

function validateApp(event) {
    var validApp = false;
    if (event.data && event.data.subscriptionResults) {
        event.data.subscriptionResults.forEach(function(v) {
            if (v.EventName == "Epic.Clinical.healthChartIpAsthma") {
                validApp = true;
            }
        });
    }
    return validApp;
}

// Establishing event listener for communication with EHR
function ehrListener(event) {
    try {
        for (var type in event.data) {
            var payload = event.data[type];
            switch (type) {
                case "token":
                    if (validateApp(event)) {
                        // Store EHR token
                        ehrToken = payload;
                    }
                    break;
                case "error":
                    // This will capture failures from other applications
                    // TODO - Need additional development from host system
                    // to avoid polluting the message space
                    logger(JSON.stringify(payload), "error");
                    break;
                case "actionExecuted":
                    awaitingAction = false;
                    break;
                case "errorCodes":
                    // Payload is an array of all errors which might have been encountered
                    // TODO - May be helpful in the future, but not in use now
                    break;
                case "EventName":
                    // TODO - Add a switch statement to capture the different actions
                    // Need to add the diagnosis updates
                    if (payload == "Epic.Common.RequestToCloseApp") {
                        if (typeof cbFns.closeCB === "function") {
                            cbFns.closeCB();
                        }
                    }
                    break;
            }
        }

        // Check if this is the intial handshake event
        if (event.data && event.data.token && validateApp(event)) {
            if (typeof cbFns.openCB === "function") {
                cbFns.openCB(event.data);
            }
        }

        // Check if events exist in the queue
        if (actionQueue.length > 0) {
            executeAction();
        }
    } catch (error) {
       logger(error.stack, "error");
    }
}

// Proxy function to send EHR messages
function executeAction(data) {
    if (!awaitingAction) {
        if (data === undefined) {
            data = actionQueue.shift();
        }
        awaitingAction = true;
        data.token = ehrToken;
        window.parent.postMessage(data, "*");
    } else {
        if (data === undefined) {
            return;
        }
        actionQueue.push(data);
    }
}

// Date references

// Set token response variable
var tokenResponse;

// Method to set token response variable
function setTokenResponse(v) {
    tokenResponse = v;
}

var logList = [];

function log$1(message, level){
    // Convert to a consistent environment label to determine where logs are stored
    var buildEnv = "test";

    // Set a default level if none exists
    level = level || "debug";

    // Set app name - TODO - Move somewhere else
    var APP_NAME = "healthchart-inpatient-asthma";

    // Build log message
    var data = {
        application: APP_NAME,
        environment: buildEnv,
        level: level,
    };

    // Check tokenResponse is defined
    if (tokenResponse) {
        data.patFHIRId = tokenResponse.patient;
        data.encounter = tokenResponse.encounter;
        data.csn = tokenResponse.csn;
        data.patient = tokenResponse.eptId;
        data.user = tokenResponse.userId;
    }

    // Get EHR environment
    var runtimeEnv = sessionStorage.getItem("env");
    if (runtimeEnv) {
        data.ehr = runtimeEnv;
    }

    // Conditionally add keys to log object
    if (typeof message === "object") {
        jQuery.extend(data, message);
    } else if (typeof message === "string") {
        data.msg = message;
    } else {
        return;
    }

    // Add date if not set
    if (!data.date) {
        data.date = new Date().toISOString();
    }

    // Send message to logging server
    try{
        jQuery.ajax({
            type:"POST",
            url: "https://logstash.cds.chop.edu",
            data: JSON.stringify(data),
            contentType: "application/json",
            timeout:2000
        });
    } catch (error) {}
}

function logD(message, level) {
    try {
        var tmpObj = {
            message: message,
            level: level || "debug"
        };

        logList.push(tmpObj);
    } catch (error) {}
}

function flushLogs() {
    try {
        logList.forEach(function(v) {
            log$1(v.message, v.level);
        });

        // Reset log list
        logList = [];
    } catch (error) {}
}

var chartConfig = {
    displayTransition: 750,
    chart: {
        background: {
            color: "#FFFFFF"
        },
        button: {
            options: [
                {
                    label: "14 months",
                    value: 36720000
                },
                {
                    label: "18 months",
                    value: 47260800
                },
                {
                    label: "24 months",
                    value: 63072000
                }
            ]
        },
        counter: {
            text: ["Past 12", "Mo."],
            height: null,
            width: 55
        },
        dates : {
            end: new Date(),
            focusStart: healthchart.dateMath(-36720000),
            line: healthchart.dateMath(-31536000),
            contextStart: healthchart.dateMath(-63072000)
        },
        details: {
            image: "./images/arrow.png",
            width: 255
        },
        logo: {
            image: "./images/logo.jpg"
        },
        margin: {
            top: 5,
            right: 1,
            bottom: 1,
            left: 1
        },
        severity: {
            // The 'calculator' function will be bound to the HealthChart context
            calculator: function(chartConfig) {
                var chart = chartConfig.chart;
                var rows = chartConfig.rows;
                var rowMap = chartConfig.rowMap;

                // Creates a list to append text to based on below conditions
                var severityText = {
                    high: [],
                    medium: []
                };

                // Set severity level. If no severity level, leave the severity box blank
                // Evaluate inpatient visits
                if (rows[rowMap.Inpatient].count > 1) {
                    // Highlight the counter reds
                    rows[rowMap.Inpatient].highlight = "#B72413";
                    // Set the severity level to high
                    chart.severity.level = "high";
                    // Add severity text to the high list
                    severityText.high.push("At least 2 IP");
                } else if (rows[rowMap.Inpatient].count > 0) {
                    // Highlight the counter orange
                    rows[rowMap.Inpatient].highlight = "#D4782A";
                    // Set the severity level to medium
                    chart.severity.level = "medium";
                    // Add severity text to the medium list
                    severityText.medium.push("1 IP");
                }

                // Evaluate emergency visits
                if (rows[rowMap["Emergency Only"]].count > 2) {
                    // Builds text based on whether text already exists
                    var more = severityText.high.length === 0 ? "At least " : " ";
                    // Highlight the counter reds
                    rows[rowMap["Emergency Only"]].highlight = "#B72413";
                    // Set the severity level to high
                    chart.severity.level = "high";
                    // Add severity text to the high list
                    severityText.high.push(more + "3 ED");
                } else if (chart.severity.level != "high" && rows[rowMap["Emergency Only"]].count > 1) {
                    // Highlight the counter orange
                    rows[rowMap["Emergency Only"]].highlight = "#D4782A";
                    // Set the severity level to medium
                    chart.severity.level = "medium";
                    // Add severity text to the medium list
                    severityText.medium.push("2 ED");
                }

                var severityTextList = [];

                // Builds severity header and text based on severity level
                if (chart.severity.level == "high" || chart.severity.level == "medium") {
                    severityTextList.push(severityText[chart.severity.level].join(" or "));
                    severityTextList.push("visit(s) for asthma during the past year.");
                }

                if (chart.severity.level == "high") {
                    chart.severity.header = {
                        text: "High Utilization"
                    };
                } else if (chart.severity.level == "medium") {
                    chart.severity.header = {
                        text: "Rising Utilization"
                    };
                }

                // Adds severity text to the chart config
                chart.severity.reason = {
                    text: severityTextList.join(" ")
                };
            },
            header: {},
            reason: {}
        },
        resources: {
            height: 85,
            header: "Resources",
            resources: [
                {
                    label: "Asthma Action Plan",
                    labelLink: function(){
                        log$1("Navigate to Asthma Action Plan SmartForm", "info");
                        executeAction({
                            action: "Epic.Clinical.Informatics.Web.LaunchActivity",
                            args: {
                                PatientID: tokenResponse.patient,
                                ActivityKey: "ASTHMA_ACTION_PLAN"
                            }
                        });
                    }
                },
                {
                    label: "Asthma Pathway",
                    labelLink: function(){
                        log$1("Navigate to Asthma Pathway", "info");
                        executeAction({
                            action: "Epic.Clinical.Informatics.Web.LaunchActivity",
                            args: {
                                PatientID: tokenResponse.patient,
                                ActivityKey: "ASTHMA_IP_PATHWAY"
                            }
                        });
                    }
                }
            ]
        },
        title: {
            text: ["Asthma", "HealthChart"],
            width: 200
        }
    },
    // medication : {
    //     isMedicationTrue: true,
    //     endpoint:"epic/2017/Clinical/Utility/GetMedications/GetMedications",
    //     method:"Post",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     grouper:[
    //         [
    //             {
                    
    //                 id: "119944",
                    
    //                 row: "Biologic",
                   
    //                 data:JSON.stringify({
    //                     "PatientID": tokenResponse.patient,
    //                     "PatientIDType": "FHIR",
    //                     "GrouperID": "119944",
    //                     "NumberDaysToIncludeDiscontinuedAndEndedOrders": 731,
    //                     "ProfileView": "3"
    //                 })
    //             },
    //             {
    //                 id: "113258",
    //                 row: "Controller",
    //                 data:JSON.stringify({
    //                     "PatientID": tokenResponse.patient,
    //                     "PatientIDType": "FHIR",
    //                     "GrouperID": "113258",
    //                     "NumberDaysToIncludeDiscontinuedAndEndedOrders": 731,
    //                     "ProfileView": "3"
    //                 })
    //             },
    //             {
    //                 id: "101365",
    //                 row: "Systemic Steroid",
    //                 data:JSON.stringify({
    //                     "PatientID": tokenResponse.patient,
    //                     "PatientIDType": "FHIR",
    //                     "GrouperID": "101365",
    //                     "NumberDaysToIncludeDiscontinuedAndEndedOrders": 731,
    //                     "ProfileView": "3"
    //                 })
    //             }
    //         ],
    //     ]
    // },
    grouper: [
        {
            
            id: "119944",
            
            row: "Biologic",
           
            // data:JSON.stringify({
            //     "PatientID": tokenResponse.patient,
            //     "PatientIDType": "FHIR",
            //     "GrouperID": "119944",
            //     "NumberDaysToIncludeDiscontinuedAndEndedOrders": 731,
            //     "ProfileView": "3"
            // })
        },
        {
            id: "113258",
            row: "Controller"
        },
        {
            id: "101365",
            row: "Systemic Steroid"
        }
    ],
    orgDeptMap: {
        101012174: "Allergy"
    },
    ignoredDepts: {
        101001610: 1
    },
    icuList: ["5", "34", "36", "43", "51", "123"],
    noteKey: "CHOP#6395",
    detailsOrder: [
        "ICU Visit",
        "Date",
        "Type",
        "Location",
        "Asthma Meds Ordered",
        "Asthma Meds Administered",
        "Asthma Care Plan",
        "Spirometry Report",
        "Full Visit Report"
    ],
    namespace: "healthchart_app",
    rows: [
        {
            name: "Visits",
            header: true,
            count: null,
            data: []
        },
        {
            name: "Inpatient",
            header: false,
            count: 0,
            legend: {
                count: 0,
                label: "ICU",
                base: {
                    shape: "circle",
                },
                alt: {
                    shape: "triangle-up",
                    color: "#FDE160"
                }
            },
            data: []
        },
        {
            name: "Emergency Only",
            header: false,
            count: 0,
            legend: {
                count: 0,
                label: "UC",
                base: {
                    shape: "circle"
                },
                alt: {
                    shape: "square"
                }
            },
            data: []
        },
        {
            name: "Primary Care",
            header: false,
            count: 0,
            legend: null,
            data: []
        },
        {
            name: "Allergy",
            header: false,
            count: 0,
            legend: null,
            data: []
        },
        {
            name: "Pulmonary",
            header: false,
            count: 0,
            legend: null,
            data: []
        },
        {
            name: "Medications",
            header: true,
            count: null,
            legend: {
                label: "Admin",
                base: {
                    shape: "circle"
                },
                alt: {
                    shape: "square"
                }
            },
            data: []
        },
        {
            name: "Systemic Steroid",
            header: false,
            count: 0,
            legend: null,
            data: []
        },
        {
            name: "Controller",
            header: false,
            count: 0,
            legend: null,
            data: []
        },
        {
            name: "Biologic",
            header: false,
            count: 0,
            legend: null,
            data: []
        },
        {
            name: "Other",
            header: true,
            count: null,
            legend: null,
            data: []
        },
        {
            name: "Asthma Care Plan",
            header: false,
            count: 0,
            legend: null,
            data: []
        }
    ]
};

(chartConfig.rowMap = {});
chartConfig.rows.forEach(function (v, i) {
  chartConfig.rowMap[v.name] = i;
});

function medicationApiCall() {
  return new Promise(function (resolve, reject) {
    resolve(medicationData);
  });
}


function medicaitonsRequestApiCall(){
  return new Promise(function (resolve, reject) {
    resolve(medicationRequestData);
  });
}

function createDate$1(med) {
  var start = dateFromString$1(med.StartDateTime || med.StartDate);
  var startStr = stringFromDate$1(start);
  var end = dateFromString$1(med.EndDateTime || med.EndDate);

  return {
    start,
    startStr,
    end,
  };
}

function stringFromDate$1(dte) {
  // If date is null, return null
  if (!dte) {
    return null;
  }
  // Return date in MM/DD/YYYY format
  return dte.getMonth() + 1 + "/" + dte.getDate() + "/" + dte.getFullYear();
}

function dateFromString$1(dte) {
  // If date is null, return null
  if (!dte) {
    return null;
  }
  // If a time zone exists, but is midnight, break the date into parts
  // and remove the timezone. This date form is typically passed for
  // on demand outpatient support encounters like telephone or messaging.
  if (dte.indexOf("T00:00:00Z") >= 0 || dte.indexOf("T") < 0) {
    // Split date into parts to avoid issues with time zones
    var dateParts = dte.split("T")[0].split("-");
    // Use date written as intial start time. Month is zero indexed.
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  }
  return new Date(dte);
}

var today$1 = new Date();
var truncateMedRegex$1 = /^([^\d]*)\d+/;
var medIdMap = {};
var medAdminList$1 = [];
var fhirMeds$1 = [];
(chartConfig.rowMap = {});
chartConfig.rows.forEach(function (v, i) {
  chartConfig.rowMap[v.name] = i;
});

var data = medicationApiCall();
function getMedicationData() {
  return data.then(function (meds) {
    if (!meds.MedicationOrders) {
      meds.MedicationOrders = [];
    }
    var len = meds.MedicationOrders.length;
    var divided = Math.floor(len / 3);
    //   console.log(divided)
    let count = 0;
    chartConfig.grouper.forEach(function (grouper) {
      // console.log("grouper",grouper)
      // console.log("hello i am in chartconfig")
      //   console.log("medIdMap", medIdMap)
      if (count <= len) {
        var medications = meds.MedicationOrders.slice(count, count + divided);
        // console.log(medications)
        medications.forEach(function (med) {
          if (!med.StartDate && !med.StartDateTime) {
            return false;
          }
          if (med.OrderMode == "Outpatient" && !med.DispenseQuantity) {
            return false;
          }
          var { start, startStr, end, endStr } = createDate$1(med);
          //   console.log("hello here we start",start)

          if (
            (med.OrderMode == "Inpatient" &&
              end &&
              end < chartConfig.chart.dates.contextStart) ||
            (med.OrderMode == "Outpatient" &&
              (start > today$1 || start < chartConfig.chart.dates.contextStart))
          ) {
            return;
          }

          var ordId;
          med.IDs.forEach(function (id) {
            if (id.Type == "Internal") {
              ordId = id.ID;
            }
          });
          // Get medication name and truncate as necessary
          var medName = med.Name.match(truncateMedRegex$1);
          medName = medName ? medName[1].trim() || med.Name : med.Name;
          if (medName) {
            medName =
              medName.length > 35
                ? medName.substr(0, 35).trim() + "..."
                : medName;
          }

          if (!medIdMap[ordId]) {
            medIdMap[ordId] = {};
          }

          medIdMap[ordId].start = start;
          medIdMap[ordId].startStr = startStr;
          medIdMap[ordId].end = end || null;
          medIdMap[ordId].row = grouper.row;
          medIdMap[ordId].name = medName;
          medIdMap[ordId].orderMode = med.OrderMode;
          medIdMap[ordId].clinicAdmin = med.IsClinicAdministered;
          medIdMap[ordId].hoverDetails = [
            {
              key: "Date",
              value: startStr,
            },
          ];
          if (med.OrderMode == "Inpatient") {
            medAdminList$1.push({
              ID: ordId,
              Type: "Internal",
            });
          }
        });

        count = count + divided;
      }
    });

    console.log(medAdminList$1);

    return meds;
  });
}

function getFhirMeds() {
  return getMedicationData().then(function () {
    medicaitonsRequestApiCall().then(function (data) {
      // console.log("fhirmeds data: ", data)
      if (meds.total === 0 || !meds.entry) {
        meds.entry = [];
      }
      // TODO - May want to consider adding a map to see if the a previous request
      // returned this medication.
      fhirMeds$1.push.apply(fhirMeds$1, meds.entry);
    });
  });
}

var state;

function replaceState(v) {
    state = v;
}

function getSessionState(key) {
    return sessionStorage.getItem(key);
}

function saveSessionState(key, v) {
    if (typeof v === "object") {
        v = JSON.stringify(v);
    }
    sessionStorage.setItem(key, v);
}

function getAndSetState(key) {
    replaceState(JSON.parse(getSessionState(key)));
}

// Initialize state key variable
var stateKey;

// Method to set state key variable
function setStateKey(v) {
    stateKey = v;
}

// Failure method for the intervention
function dataFail(xhr, textStatus) {
    if (textStatus != "abort") {
        chartConfig.chart.failure = true;
        failureSplash();
    }
}

function failureSplash() {
    if (chartConfig.chart.failure && jQuery("#" + chartConfig.namespace).length !== 0) {
        var errorMessage = [
            "An error occurred while loading HealthChart.",
            "Application developers have been notified and are working to correct the issue."
        ];
        jQuery("#" + chartConfig.namespace).html(errorMessage.join(" "));
    }
    flushLogs();
}

// Used to extract the path and cache timestamp from the url
var urlRegex = /.*api\/(.*)/;

// Access token search function
function search(endpoint, data, method, headers) {
    try {
        method = method || "GET";

        // Build headers
        headers = headers || {};
        headers.Authorization = "Bearer " + tokenResponse.access_token;
        headers.accept = "application/json";

        // Initialize url variable
        var url;
        // Conditionally constructs endpoint based on the base URL
        if (endpoint.indexOf("chop.edu") >= 0) {
            url = endpoint;
        } else {
            url = state.baseUrl + endpoint;
        }

        // Get time object. Date.now() is more efficient, which is
        // why we attempt to get this first, but it is not available
        // in all versions of IE.
        var time = Date ? Date.now() : new Date();

        // Send request
        return jQuery.ajax({
            url: url,
            type: method,
            headers: headers,
            time: time,
            timeout: 20000,
            traditional: true,
            data: data,
            success: function(xhr) {
                // Only send metrics for Encounter and MedicationRequest requests
                if (this.url.indexOf("FHIR/R4/Encounter") === -1 && this.url.indexOf("FHIR/R4/MedicationRequest") === -1) {
                    return;
                }

                // Get time object. Date.now() is more efficient, which is
                // why we attempt to get this first, but it is not available
                // in all versions of IE.
                var endTime = Date ? Date.now() : new Date();

                // Extract path and cache timestamp from url
                var urlMatch = this.url.match(urlRegex);
                var tmpObj = {
                    "transaction.duration.ms": endTime - this.time
                };

                if (urlMatch) {
                    if (urlMatch[1]) {
                        tmpObj.path = urlMatch[1];
                    }
                }

                // Log transaction time for individual request
                // Uses logD to avoid holding up the current transactions
                logD(tmpObj, "info");
            },
            error: function(xhr, textStatus, errorThrown) {
                // Log the error here, but rely on the "then" fail function from the "when"
                // to determine if the application should fail
                log$1(this.type + " " + this.url + " " + xhr.status + " (" + (xhr.responseText || errorThrown) + ")", "error");
            }
        });
    } catch (error) {
        chartConfig.chart.failure = true;
        log$1(error.stack, "error");
    }
}

// Extract parameters from URL
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
}

// Used to remove encoded spaces in EHR provided
// variables within the token response
var plusRegex = /\+/g;

// Get first set of data
function getAccessToken() {
    try {
        // Extract code from query parameter
        var code = getUrlParameter("code");

        // Set base URL
        state.baseUrl = state.serverUrl.replace('FHIR/R4', '');

        // Configure request body. AJAX library will encode so no need
        // to do it here.
        var data = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": state.redirectUri,
            "client_id": state.clientId
        };

        // Build request
        var deferreds = [
            jQuery.ajax({
                url: state.tokenUri,
                type: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                timeout: 2000,
                data: data,
                success: function(xhr, b, c) {
                    try {
                        // Store response to tokenResponse variable
                        setTokenResponse(xhr);

                        if(!!tokenResponse.eptId){
                            tokenResponse.eptIdIn = tokenResponse.eptId.replace(plusRegex, " ");
                            tokenResponse.eptId = tokenResponse.eptId.replace(plusRegex, "");
                        }
                        if(!!tokenResponse.userId){
                            tokenResponse.userId = tokenResponse.userId.replace(plusRegex, "");
                        }
                        // Adjust token values to remove encoded spaces
                        //taposh comment
                        // tokenResponse.eptIdIn = tokenResponse.eptId.replace(plusRegex, " ");
                        // tokenResponse.eptId = tokenResponse.eptId.replace(plusRegex, "");
                        
                        //taposh comment

                        // tokenResponse.userId = tokenResponse.userId.replace(plusRegex, "");

                        // Store the token response information in session storage
                        state.tokenResponse = tokenResponse;

                        // Save updated state in session storage
                        saveSessionState(stateKey, state);
                    } catch (error) {
                        chartConfig.chart.failure = true;
                        failureSplash();
                        log$1(error.stack, "error");
                    }
                },
                error: function(xhr, textStatus, errorThrown) {
                    // Log the error here, but rely on the "then" fail function from the "when"
                    // to determine if the application should fail
                    log$1(this.type + " " + this.url + " " + xhr.status + " (" + (xhr.responseText || errorThrown) + ")", "error");
                }
            })
        ];
        return jQuery.when.apply(jQuery, deferreds);
    } catch (error) {
        chartConfig.chart.failure = true;
        failureSplash();
        log$1(error.stack, "error");
    }
}

// Extneral imports
async function execBigModule(condition) {
  if (condition) {
    try {
      const { getVisitsData } = await Promise.resolve().then(function () { return visitController; });
      console.log("hello", getVisitsData);
    } catch (error) {
      console.error('Error importing visitController.js:', error);
    }
  }
}
execBigModule(true);

// Wrap entire code within a try-catch to avoid potential EHR workflow issues
try {
  // Initialize timeline variable here to obtain access in other functions
  var timeline;

  // Total time from start of first request to end of last request.
  // Added to provide better performance metrics that take into consideration
  // browser content download time.
  var requestTime;

  // Initialize variable to measure time in hover event
  var timeIn;

  // Padding to ensure the application fits within the user's workspace
  var windowWidth;
  var windowPadding = 20;

  // Create shortcuts to commonly used components of the config
  var chart$1 = chartConfig.chart;

  // Regex patterns
  var asthmaDxRegex$1 = /^493\.?|^J45\.?/i; // Used to identify asthma diagnoses
  var croupDxRegex$1 = /croup|laryngotracheobronchitis/i; // Used to identify croup diagnoses
  var truncateMedRegex = /^([^\d]*)\d+/; // Used to get medication name only (removes strength, route, form, etc.)
  var albuterolRegex = /accuneb|proair|ventolin|proventil|albuterol/i; // Used to identify albuterol medications

  // Date references for querying
  var counterLookback = chartConfig.chart.dates.line;
  var fhirLookback =
    "gt" + chartConfig.chart.dates.contextStart.toISOString().slice(0, 10);

  // Patient data
  var encounters$1 = []; // Relevant patient encounter information. Passed to HealthChart
  var medPlot = []; // Relevant medication information. Passed to HealthChart
  var locations$1 = []; // Results from the "_include=Encounter:Location" parameter in the encounter request. Not passed to HealthChart
  var fhirMeds = []; // Temporary storage for the FHIR MedicationRequest response

  var locationMap$1 = {}; // Key is FHIR ID and includes information to filter location
  var encMap$1 = {}; // Key is FHIR ID and includes basic information about each encounter
  var encDateMap$1 = {}; // Key is date string. Used to map medications to encounters
 
   // Key is order ID. Used to store information about medications

  // Stores encounter information for acute encounters. This is used to link administrations
  // to encounters. Also used as a fallback if an OP order couldn't be linked to an encounter.
  var acuteCareList$2 = [];

  var medAdminList = []; // List of order IDs to include in a payload to retrieve med admin info.
  var medAdminMap = {}; // Key is order ID. Maps individual administrations of an order to an encounter

  // Key is encounter FHIR ID. Stores hospital problems for resepective encounters.
  var hospitalProblemMap$1 = {};

  // Build row location map based on chart config
  // Reduces iterations when pushing data since chartConfig.rows is an array
  var rowMap$1 = (chartConfig.rowMap = {});
  chartConfig.rows.forEach(function (v, i) {
    chartConfig.rowMap[v.name] = i;
  });
  // console.log(rowMap);

  // Initialize app
  init();
} catch (error) {
  chart$1.failure = true;
  failureSplash();
  log$1(error.stack, "error");
}

// Initialize the application by extracting the state parameter
// and loading previous state
function init() {
  // Extract URL parameters to complete auth
  setStateKey(getUrlParameter("state"));

  // If key is not present in the URL, abort the flow
  if (!stateKey) {
    // Invalid key parameter return an error
    throw new Error("Invalid state parameter");
  }

  // Extract state from session storage
  getAndSetState(stateKey);

  // If state can't be found, abort the flow
  if (!state) {
    // Invalid key parameter return an error
    throw new Error("Failed to obtain application state");
  }

  // Initialize callbacks
  var callbacks = {
    closeCB: closeCB,
    logFn: log$1,
  };

  // Re-establish new event listener
  addEHRListener(callbacks);

  // Re-establish EHR token

  //taposh comment
  // if (state.ehrToken) {
  //     setEHRToken(state.ehrToken);
  // } else {
  //     throw new Error("Failed to obtain ehr token");
  // }

  // Check if an access token exists
  if (state.tokenResponse) {
    // Update the token response with the previous state
    setTokenResponse(state.tokenResponse);

    // Set the base URL to use based on the previous state
    state.baseUrl = state.serverUrl.replace("FHIR/R4", "");

    // Initialize app
    buildApp();
  } else {
    getAccessToken().then(function () {
      try {
        buildApp();
      } catch (error) {
        chart$1.failure = true;
        failureSplash();
        log$1(error.stack, "error");
      }
    }, dataFail);
  }
}

function closeCB() {
  // Remove sessionStorage - it is shared across the entire
  // EHR session so it is important to remove it when finished
  sessionStorage.removeItem(stateKey);
}

function buildApp() {
  // Get time object. Date.now() is more efficient, which is
  // why we attempt to get this first, but it is not available
  // in all versions of IE.
  // console.log("build , ", encounters)
  requestTime = Date ? Date.now() : new Date();
  getFhirMeds().then(function(data){
    console.log("This is medication data: ", data);
  });
// execBigModule(true)
  // Get data
  // getVisitsData().then(function(data){
  //   // console.log(data)
  //  encounters=data.encounters
  //  encMap = data.encMap
  // //  console.log("herer",encounters)
  // }).then(process,dataFail)
  // getPreliminaryData().then(function () {
  //   try {
  //     getRemainingData().then(process, dataFail);
  //   } catch (error) {
  //     chart.failure = true;
  //     failureSplash();
  //     log(error.stack, "error");
  //   }
  // }, dataFail);
}

var today = new Date();
var _invalidStatus = "unknown";
var _locationFilteringParameter = {
  codingSystem: ".7.10.688867.4150",
  idSystem:".7.2.686980",
};
var _encounterType = {
  systemIdForContactType: ".7.10.698084.30",
  systemIdForAdtClass: ".7.10.698084.10110"
};
var _validStatus = { arrived: 1, finished: 1, "in-progress": 1, triaged: 1, planned: 1 };
var _csnMappingParameter = ".7.3.698084.8";
var rowMap = (chartConfig.rowMap = {});
chartConfig.rows.forEach(function (v, i) {
  chartConfig.rowMap[v.name] = i;
});
// here we call the api for vists
// currently we are using mock data for that
function visitApiCall() {
  var result = new Promise((resolve, reject) => {
    resolve(visitsData$1);
  });
  return result;
}

// this is used to separate location and encounter on the basis of data
function encAndLocSep(encounters, locations, data) {
    // console.log("service",data)
  data.forEach(function (enc) {
    if (enc.resource.resourceType == "Encounter") {
      encounters.push(enc.resource);
    } else if (enc.resource.resourceType == "Location") {
    
      locations.push(enc.resource);
    }
  });
  // console.log("vists sdfkjdhsfkj", encounters)
  return {
    encounters,
    locations,
  };
}

function filterLocations(locations, locationMap) {
  locations.forEach(function (v) {
    if (v.extension) {
      v.extension.forEach(function (ext, i) {
        ext.valueCodeableConcept.coding.forEach(function (coding, j) {
          if (
            !locationMap[v.id] &&
            coding.system.indexOf(_locationFilteringParameter.codingSystem) >= 0
          ) {
            locationMap[v.id] = {
              name: v.name,
              specialty: coding.display,
              code: coding.code,
            };
          }
        });
      });
    }
    if (v.identifier) {
      v.identifier.forEach(function (id, i) {
        if (!locationMap[v.id]) {
          locationMap[v.id] = {};
        }
        if (id.system && id.system.indexOf(_locationFilteringParameter.idSystem) >= 0) {
          locationMap[v.id].internalId = id.value;
        }
      });
    }
  });

  return locationMap;
}

function checkStatus(resource) {
  
  if (resource.status == _invalidStatus) {
    return false;
  }
  if (
    !(
      resource.status in
      _validStatus
    )
  ) {
    return false;
  }
  return true
}
// this function is used to create date that will going to plot on chart
function createDate(resource) {
  var start = (resource.start = dateFromString(resource.period.start));
  var startStr = stringFromDate(start);
  var end = (resource.end = dateFromString(resource.period.end));
  var endStr = stringFromDate(end);

  return {
    start,
    startStr,
    end,
    endStr,
  };
}

// to check whether date is valid and also if it is still active
function checkDate(start, end) {
  if (!end) {
    return false;
  }
  if (!start || start > today) {
    return false;
  }
  return true
}

function dateFromString(dte) {
  // If date is null, return null
  if (!dte) {
    return null;
  }
  // If a time zone exists, but is midnight, break the date into parts
  // and remove the timezone. This date form is typically passed for
  // on demand outpatient support encounters like telephone or messaging.
  if (dte.indexOf("T00:00:00Z") >= 0 || dte.indexOf("T") < 0) {
    // Split date into parts to avoid issues with time zones
    var dateParts = dte.split("T")[0].split("-");
    // Use date written as intial start time. Month is zero indexed.
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
  }
  return new Date(dte);
}

// to check whether the resource is already
function checkExitingResource(encMap, resource) {
  // console.log("check",encMap)
  if (encMap[resource.id]) {
    return false;
  }
  return true
}

// create details of encounter
function createDetailMap(encMap,start,end,startStr, resource) {
  encMap[resource.id] = {
    _start: start,
    _end: end,
    detailMap: {
      "Asthma Meds Ordered": {
        value: [],
      },
      "Asthma Meds Administered": {
        value: [],
      },
      Date: {
        value: startStr,
      },
      "Full Visit Report": {
        link: "kdklfjldks",
      },
      Type: {},
    },
  };
//  console.log("mydetailsmap",encMap)
  return encMap;
}
// Obtain contact serial number (EHR encounter ID)
function mapCsn(csnList,csnToFhirIdMap,encMap,resource){
  // console.log("mapcsn",encMap)
    resource.identifier.forEach(function (id, j) {
        if (id.system.indexOf(_csnMappingParameter) >= 0) {
          // Add csn to encounter object
          resource.csn = id.value;
          encMap[resource.id]._csn = resource.csn;
  
          // Add to CSN list to obtain DATs, which are used to
          // link to encounter reports
          csnList.push(resource.csn);
          // Add to CSN map to link care plan to encounter
          csnToFhirIdMap[resource.csn] = resource.id;
        }
      });
  return {csnList,csnToFhirIdMap,encMap,resource}
}

// Extract encounter type and class (if they exist)
function encTypeAndClass(resource) {
  resource.type.forEach(function (type) {
    type.coding.forEach(function (v) {
      if (v.system.indexOf(_encounterType.systemIdForContactType) >= 0) {
        resource.contactType = +v.code;
        resource.contactName = v.display;
      } else if (v.system.indexOf(_encounterType.systemIdForAdtClass) >= 0) {
        resource.adtClass = +v.code;
        resource.adtClassName = v.display;
      }
    });
  });

  return resource;
}

function linkEncDateMap(encDateMap, startStr, endStr, resource) {
  if (resource.contactType == 101) {
    if (!encDateMap[startStr]) {
      encDateMap[startStr] = [];
    }

    encDateMap[startStr].push(resource);
    if (startStr != endStr) {
      if (!encDateMap[endStr]) {
        encDateMap[endStr] = [];
      }
      encDateMap[endStr].push(resource);
    }
  }

  return encDateMap;
}

// Add encounter to the acute care list, which will be used to obtain
// medication administration records.
function linkAcurateCareList(acuteCareList, resource) {
  if ([1, 3, 4, 5].indexOf(resource.adtClass) >= 0) {
    acuteCareList.push(resource);
  }
  return acuteCareList
}

// this function is used to create data that will used to plot point on chart
// here group will work as link between visits, medication, and others
// hoverdetails will provide the visible detail on hover
function createGroupAndHoverDetails(startStr, resource) {
  resource.group = resource.id;
  resource.hoverDetails = [
    {
      key: "Date",
      value: startStr,
    },
  ];
  return resource
}

// here we will classify which type of visit and add it to the data
function checkAndAddAdmission(hospitalProblemMap,encMap,locationMap, resource) {
  if ([1, 5].indexOf(resource.adtClass) >= 0) {
    // Add details about the encounter to the encounter map
    if (hospitalProblemMap[resource.id]) {
                      hospitalProblemMap[resource.id].forEach(function (reference) {
                          deferred.push(search("FHIR/R4/" + reference).then(function (condition, state, xhr) {
                              try {
                                  if (encMap[resource.id]._validDx) {
                                      return false;
                                  }
                                  // TODO - Future state could consider capturing the data
                                  // and processing later
                                  if (condition.code) {
                                      condition.code.coding.forEach(function (dx) {
                                          if (asthmaDxRegex.test(dx.code)) {
                                              encMap[resource.id]._validDx = true;
                                          }
                                          if (dx.text && croupDxRegex.test(dx.text)) {
                                              encMap[resource.id]._croupDx = true;
                                          }
                                      });
                                  }
                              } catch (error) {
                                  chart.failure = true;
                                  log(error.stack, "error");
                              }
                          }));
                      });
                  }
      var deferred =[];
                  // Check for an encounter diagnosis if it exists to also
                  // determine if this is an encounter we should plot
                  deferred.push(
                          search("FHIR/R4/Condition",
                                  {
                                      // patient: tokenResponse.patient,
                                      // category: "encounter-diagnosis",
                                      // encounter: resource.id
                                  }
                          ).then(function (encDx, state, xhr) {
                      try {
                          encDx.entry.forEach(function (entry) {
                              if (encMap[resource.id]._validDx) {
                                  return;
                              }
                              if (entry.resource.code) {
                                  encMap[resource.id]._validDx = checkDx(entry.resource.code.coding);
                              }
                          });
                      } catch (error) {
                          chart.failure = true;
                          log(error.stack, "error");
                      }
                  }));
      
    
    encMap[resource.id].row = resource.row = "Inpatient";
    resource.shape = chartConfig.rows[rowMap[resource.row]].legend.base.shape;
    encMap[resource.id].detailMap.Type.value = resource.adtClassName;

    // Add location to hover details
    resource.hoverDetails.push({
      key: "Location",
      value: resource.adtClassName,
    });
    // Check for ICU stays
         // Check for ICU stays
            if (resource.location) {
                // Get location name
                resource.location.forEach(function(loc, i) {
                    // Verify the location has a "period" key
                    if (loc.period && loc.location.reference) {
                        var locationId = loc.location.reference.replace("Location/", "");
                        if (
                            chartConfig.icuList &&
                            locationMap[locationId] &&
                            locationMap[locationId].internalId &&
                            chartConfig.icuList.indexOf(locationMap[locationId].internalId) !== -1
                        ) {
                            // Add metadata and change the color and shape based
                            // on the value defined in the legend
                            encMap[resource.id].detailMap["ICU Visit"] = {
                                highlight: true
                            };
                            resource._icu = true;
                            resource.shape = chartConfig.rows[rowMap[resource.row]].legend.alt.shape;
                            resource.color = chartConfig.rows[rowMap[resource.row]].legend.alt.color;
                        }
                    }
                });
            }

    // Check for "emergency" visit
  } 
  // console.log("jhskjfhds",resource)
  else if (resource.adtClass == 3) {
    // Check if this is an encounter we should plot
    //   getEncDiagnosis(resource, deferred);

    // Add details about the encounter to the encounter map
    encMap[resource.id].row = resource.row = "Emergency Only";
    resource.shape = chartConfig.rows[rowMap[resource.row]].legend.base.shape;
    encMap[resource.id].detailMap.Type.value = resource.adtClassName;

    // Add location to hover details
    resource.hoverDetails.push({
      key: "Location",
      value: resource.adtClassName,
    });

    // Process all other visits
  }
   else {
    // Set visit type
    encMap[resource.id].detailMap.Type.value =
      resource.contactName || resource.adtClassName;

    if (resource.location) {
      // Get location name
      resource.location.forEach(function (loc, i) {
        // Verify the location has a "period" key
        if (resource.contactType == 3) {
          if (loc.period) {
            resource.fullLocationName = loc.location.display;
            // For encounters with multiple locations the application will display the last one
            encMap[resource.id].detailMap.Location = {
              value:
                loc.location.display.length > 25
                  ? loc.location.display.substr(0, 25) + "..."
                  : loc.location.display,
            };
            resource.deptId = loc.location.reference.replace("Location/", "");
          }
          return;
        }
        resource.fullLocationName = loc.location.display;
        // For encounters with multiple locations the application will display the last one
        encMap[resource.id].detailMap.Location = {
          value:
            loc.location.display.length > 25
              ? loc.location.display.substr(0, 25) + "..."
              : loc.location.display,
        };
        resource.deptId = loc.location.reference.replace("Location/", "");
      });
    } 
    else {
      encMap[resource.id].detailMap.Location = {
        value: "Unknown",
      };
    }
    var result =isValidLocation(encMap,resource,locationMap);
    encMap= result.encMap;
    resource = result.resource;
    if (!result.condition) {
                      return false;
                  }
    if (resource.contactType == 3) {
                      // Add encounter to the acute care list, which will be used to obtain
                      // medication administration records.
                      acuteCareList.push(resource);
                      encMap[resource.id].detailMap.Type.value = "Urgent Care";
                      resource._uc = true;
                      resource.shape = chartConfig.rows[rowMap[resource.row]].legend.alt.shape;
                  } else if (resource.contactType != 101) {
                      return false;
                  }
      
                  // Add location to hover details
                  resource.hoverDetails.push({
                      key: "Location",
                      value: resource.fullLocationName
                  });
  }
  // console.log('helloqeqwe')


  return resource
}


function isValidLocation(encMap,resource,locationMap) {
      var internalId;
      
      if (locationMap[resource.deptId]) {
          internalId = locationMap[resource.deptId].internalId;
      }
  
      // Check if this department should be ignored
      if (internalId && chartConfig.ignoredDepts && chartConfig.ignoredDepts[internalId]) {
          return false;
      }
  
      // // Check for organization specific filtering
      if (chartConfig.orgDeptMap && chartConfig.orgDeptMap[internalId]) {
          encMap[resource.id].row = resource.row = chartConfig.orgDeptMap[internalId];
          return true;
      }
   
      // // Use standardized mapping from FHIR service
      // console.log(locationMap[resource.deptId].code)
      if (locationMap[resource.deptId]) {
          switch(locationMap[resource.deptId].code) {
              case "3":
                  encMap[resource.id].row = resource.row = "Allergy";
                  resource.shape = "circle";
                  return {encMap,resource,condition:true};
              case "82":
                  encMap[resource.id].row = resource.row = "Primary Care";
                  resource.shape = "circle";
                  return {encMap,resource,condition:true};
              case "105":
                  // Urgent care visit, which are plotted under Emergency Only
                  encMap[resource.id].row = resource.row = "Emergency Only";
                  resource.shape = "circle";
                  return {encMap,resource,condition:true};
              case "110":
                  encMap[resource.id].row = resource.row = "Pulmonary";
                  resource.shape = "circle";
                  return {encMap,resource,condition:true};
          }
      }
      // console.log("isvalid.ocation",resource)
      return {encMap,resource,condition:false};
  }
// Sorting encounter date map entries by CSN. May not be necessary anymore
// but possibly helpful when linking admins to encounters.
function sortEncDateMap(encDateMap) {
  each(encDateMap, function (v) {
    v.sort(function (a, b) {
      if (a.csn < b.csn) {
        return -1;
      }
      if (a.csn > b.csn) {
        return 1;
      }
      return 0;
    });
  });
  return encDateMap;
}

function stringFromDate(dte) {
  // If date is null, return null
  if (!dte) {
    return null;
  }
  // Return date in MM/DD/YYYY format
  return dte.getMonth() + 1 + "/" + dte.getDate() + "/" + dte.getFullYear();
}

var encounters = [];
var locations = [];
var locationMap = {};
var encMap = {};
var encDateMap = {};
var csnList = [];
var csnToFhirIdMap = {};
var acuteCareList$1 = [];
var hospitalProblemMap = [];


var visitsData = visitApiCall();

function dataSeparation() {
  return visitsData.then(function (data) {
    
    ({ encounters, locations } = encAndLocSep(encounters, locations, data.entry));
    // console.log('locations: ',locations)
    locationMap = filterLocations(locations, locationMap);
    // console.log(locationMap)
  });
}
function getEncounters(){
  
   return dataSeparation().then(function () {
    // console.log("ewejrkljelkr",encounters)
    
         encounters = encounters.filter(function (resource) {
        //  console.log("resource.id",resource.id, checkStatus(resource))
          if (!checkStatus(resource)) {
            return false;
          }
         
          var { start, startStr, end, endStr } = createDate(resource);
          if(!checkDate(start,end)){
              return false
          }
          
          if(!checkExitingResource(encMap,resource)){
              return false
          }
          
          // console.log("fix",resource)
          encMap = createDetailMap(encMap,start,end,startStr,resource);
          // const mapCsnResult = mapCsn(csnList, csnToFhirIdMap, encMap, resource);
          // ({ csnList, csnToFhirIdMap, encMap, resource } = mapCsnResult);

          //  console.log(hello)
          var result = mapCsn(csnList,csnToFhirIdMap,encMap,resource);
          csnList = result.csnList;
          csnToFhirIdMap = result.csnToFhirIdMap;
          encMap = result.encMap;
          resource = result.resource;
          resource = encTypeAndClass(resource);
          // console.log("hello")
      
          encDateMap = linkEncDateMap(encDateMap,startStr,endStr,resource);
          acuteCareList$1 = linkAcurateCareList(acuteCareList$1,resource);
          resource = createGroupAndHoverDetails(startStr,resource);
          resource = checkAndAddAdmission(hospitalProblemMap,encMap,locationMap,resource);
          
          return true
        });
        encDateMap = sortEncDateMap(encDateMap);
        // console.log("insidecontroller",encounters)
        return {encounters,encMap}
      });
}


function getVisitsData(){
     return getEncounters()
}

var visitController = /*#__PURE__*/Object.freeze({
	__proto__: null,
	getVisitsData: getVisitsData
});
