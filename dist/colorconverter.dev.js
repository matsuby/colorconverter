(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["colorconverter"] = factory();
	else
		root["colorconverter"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/colorconverter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/colorconverter.js":
/*!*******************************!*\
  !*** ./src/colorconverter.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * color hex string convert to formated rgb value.\n *\n * @param {string} colorhex\n *   you can omit \"#\", and color hex can be three or six digits.\n *   e.g.) \"#123abc\", \"FFF\"\n *\n * @param {*} [format={}]\n *   you can specify output format literal or string keyword.\n *   also you can use callback function, then recieve three params(r, g, b).\n *   e.g.) literal:  {} or [] or \"\"\n *         string:   \"object\" or \"array\" or \"string\"\n *         function: (r, g, b) => `rgb(${r},${g},${b})`)\n *\n * @returns {*} formated rgb value\n *   e.g.) object:   {r: 18, g: 58, b: 188}\n *         array:    [18, 58, 188]\n *         string:   \"18,58,188\"\n *         function: \"rgb(18,58,188)\"\n */\nconst hex2rgb = (colorhex, format={}) => {\n  if (!colorhex || typeof colorhex !== \"string\") {\n    throw new Error(`invalid colorhex value: ${colorhex}`);\n  }\n  if (!/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.exec(colorhex)) {\n    throw new Error(`invalid colorhex value: ${colorhex}`);\n  }\n\n  if (colorhex.startsWith(\"#\")) colorhex = colorhex.substring(1);\n  const step = colorhex.length === 3 ? 1 : 2;\n  let r = parseInt(colorhex.substring(step*0, step*1), 16),\n      g = parseInt(colorhex.substring(step*1, step*2), 16),\n      b = parseInt(colorhex.substring(step*2, step*3), 16);\n\n  // e.g. \"#0af\" => \"#00aaff\" => \"rgb(0,170,255)\"\n  if (colorhex.length === 3) [r, g, b] = [r*17, g*17, b*17];\n\n  // format allows callback function.\n  if (typeof format === \"function\") {\n    return format(r, g, b);\n  }\n\n  // format allows literal or string keyword.\n  // when use literal, must be empty.\n  const strFormat = JSON.stringify(format);\n  if (strFormat === '{}') format = \"object\";\n  if (strFormat === '[]') format = \"array\";\n  if (strFormat === '\"\"') format = \"string\";\n  format = format.toLowerCase();\n\n  switch (format) {\n    case \"object\":\n      return {r: r, g: g, b: b};\n    case \"array\":\n      return [r, g, b];\n    case \"string\":\n      return `${r},${g},${b}`;\n    default:\n      throw new Error(`invalid format: ${format}`);\n  }\n};\n\n/**\n * rgb value convert to hex string.\n *\n * @param {*} rgb\n *   you can pass value some kind of rgb format.\n *   e.g.) object: {r: 18, g: 58, b: 188}\n *         array:  [18, 58, 188]\n *         string: \"18,58,188\"\n *\n * @param {boolean} [addHash=true]\n *\n * @returns {string} color hex string\n *   cannot three digits, only six digits and lowercase.\n *   e.g.) addHash=true:  \"#123abc\"\n *         addHash=false: \"123abc\"\n */\nconst rgb2hex = (rgb, addHash=true) => {\n  const RGB_KEYS = [\"r\", \"g\", \"b\"];\n  let r, g, b;\n\n  if (!rgb) {\n    throw new Error(`invalid rgb value: ${rgb}`);\n  } else if (typeof rgb === \"string\") {\n    [r, g, b] = rgb.split(\",\").map(v => +v.trim());\n  } else if (Array.isArray(rgb) && rgb.length === 3) {\n    [r, g, b] = rgb.map(v => +v);\n  } else if (typeof rgb === \"object\" && RGB_KEYS.every(k => rgb.hasOwnProperty(k))) {\n    [r, g, b] = RGB_KEYS.map(k => +rgb[k]);\n  }\n\n  [r, g, b].forEach((v, i) => {\n    const k = RGB_KEYS[i];\n    if (Number.isNaN(v))   throw new Error(`invalid \"${k}\" of rgb is not int value: ${v}`);\n    if (v !== parseInt(v)) throw new Error(`invalid \"${k}\" of rgb is not int value: ${v}`);\n    if (v < 0 || v > 255)  throw new Error(`invalid \"${k}\" of rgb is out of range: ${v}`);\n  });\n\n  // rgb int covert to color hex string(only 6 digits).\n  let colorhexes = [r, g, b].map(v => v.toString(16).padStart(2, \"0\")),\n      colorhex = colorhexes.join(\"\");\n  if (addHash) colorhex = \"#\" + colorhex;\n  return colorhex;\n};\n\n/**\n * @constant\n * @type {object}\n * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#colors_table}\n */\nconst NAME_HEX_MAP = {\"black\":\"#000000\",\"silver\":\"#c0c0c0\",\"gray\":\"#808080\",\"white\":\"#ffffff\",\"maroon\":\"#800000\",\"red\":\"#ff0000\",\"purple\":\"#800080\",\"fuchsia\":\"#ff00ff\",\"green\":\"#008000\",\"lime\":\"#00ff00\",\"olive\":\"#808000\",\"yellow\":\"#ffff00\",\"navy\":\"#000080\",\"blue\":\"#0000ff\",\"teal\":\"#008080\",\"aqua\":\"#00ffff\",\"orange\":\"#ffa500\",\"aliceblue\":\"#f0f8ff\",\"antiquewhite\":\"#faebd7\",\"aquamarine\":\"#7fffd4\",\"azure\":\"#f0ffff\",\"beige\":\"#f5f5dc\",\"bisque\":\"#ffe4c4\",\"blanchedalmond\":\"#ffebcd\",\"blueviolet\":\"#8a2be2\",\"brown\":\"#a52a2a\",\"burlywood\":\"#deb887\",\"cadetblue\":\"#5f9ea0\",\"chartreuse\":\"#7fff00\",\"chocolate\":\"#d2691e\",\"coral\":\"#ff7f50\",\"cornflowerblue\":\"#6495ed\",\"cornsilk\":\"#fff8dc\",\"crimson\":\"#dc143c\",\"cyan\":\"aqua\",\"darkblue\":\"#00008b\",\"darkcyan\":\"#008b8b\",\"darkgoldenrod\":\"#b8860b\",\"darkgray\":\"#a9a9a9\",\"darkgreen\":\"#006400\",\"darkgrey\":\"#a9a9a9\",\"darkkhaki\":\"#bdb76b\",\"darkmagenta\":\"#8b008b\",\"darkolivegreen\":\"#556b2f\",\"darkorange\":\"#ff8c00\",\"darkorchid\":\"#9932cc\",\"darkred\":\"#8b0000\",\"darksalmon\":\"#e9967a\",\"darkseagreen\":\"#8fbc8f\",\"darkslateblue\":\"#483d8b\",\"darkslategray\":\"#2f4f4f\",\"darkslategrey\":\"#2f4f4f\",\"darkturquoise\":\"#00ced1\",\"darkviolet\":\"#9400d3\",\"deeppink\":\"#ff1493\",\"deepskyblue\":\"#00bfff\",\"dimgray\":\"#696969\",\"dimgrey\":\"#696969\",\"dodgerblue\":\"#1e90ff\",\"firebrick\":\"#b22222\",\"floralwhite\":\"#fffaf0\",\"forestgreen\":\"#228b22\",\"gainsboro\":\"#dcdcdc\",\"ghostwhite\":\"#f8f8ff\",\"gold\":\"#ffd700\",\"goldenrod\":\"#daa520\",\"greenyellow\":\"#adff2f\",\"grey\":\"#808080\",\"honeydew\":\"#f0fff0\",\"hotpink\":\"#ff69b4\",\"indianred\":\"#cd5c5c\",\"indigo\":\"#4b0082\",\"ivory\":\"#fffff0\",\"khaki\":\"#f0e68c\",\"lavender\":\"#e6e6fa\",\"lavenderblush\":\"#fff0f5\",\"lawngreen\":\"#7cfc00\",\"lemonchiffon\":\"#fffacd\",\"lightblue\":\"#add8e6\",\"lightcoral\":\"#f08080\",\"lightcyan\":\"#e0ffff\",\"lightgoldenrodyellow\":\"#fafad2\",\"lightgray\":\"#d3d3d3\",\"lightgreen\":\"#90ee90\",\"lightgrey\":\"#d3d3d3\",\"lightpink\":\"#ffb6c1\",\"lightsalmon\":\"#ffa07a\",\"lightseagreen\":\"#20b2aa\",\"lightskyblue\":\"#87cefa\",\"lightslategray\":\"#778899\",\"lightslategrey\":\"#778899\",\"lightsteelblue\":\"#b0c4de\",\"lightyellow\":\"#ffffe0\",\"limegreen\":\"#32cd32\",\"linen\":\"#faf0e6\",\"magenta\":\"fuchsia\",\"mediumaquamarine\":\"#66cdaa\",\"mediumblue\":\"#0000cd\",\"mediumorchid\":\"#ba55d3\",\"mediumpurple\":\"#9370db\",\"mediumseagreen\":\"#3cb371\",\"mediumslateblue\":\"#7b68ee\",\"mediumspringgreen\":\"#00fa9a\",\"mediumturquoise\":\"#48d1cc\",\"mediumvioletred\":\"#c71585\",\"midnightblue\":\"#191970\",\"mintcream\":\"#f5fffa\",\"mistyrose\":\"#ffe4e1\",\"moccasin\":\"#ffe4b5\",\"navajowhite\":\"#ffdead\",\"oldlace\":\"#fdf5e6\",\"olivedrab\":\"#6b8e23\",\"orangered\":\"#ff4500\",\"orchid\":\"#da70d6\",\"palegoldenrod\":\"#eee8aa\",\"palegreen\":\"#98fb98\",\"paleturquoise\":\"#afeeee\",\"palevioletred\":\"#db7093\",\"papayawhip\":\"#ffefd5\",\"peachpuff\":\"#ffdab9\",\"peru\":\"#cd853f\",\"pink\":\"#ffc0cb\",\"plum\":\"#dda0dd\",\"powderblue\":\"#b0e0e6\",\"rosybrown\":\"#bc8f8f\",\"royalblue\":\"#4169e1\",\"saddlebrown\":\"#8b4513\",\"salmon\":\"#fa8072\",\"sandybrown\":\"#f4a460\",\"seagreen\":\"#2e8b57\",\"seashell\":\"#fff5ee\",\"sienna\":\"#a0522d\",\"skyblue\":\"#87ceeb\",\"slateblue\":\"#6a5acd\",\"slategray\":\"#708090\",\"slategrey\":\"#708090\",\"snow\":\"#fffafa\",\"springgreen\":\"#00ff7f\",\"steelblue\":\"#4682b4\",\"tan\":\"#d2b48c\",\"thistle\":\"#d8bfd8\",\"tomato\":\"#ff6347\",\"turquoise\":\"#40e0d0\",\"violet\":\"#ee82ee\",\"wheat\":\"#f5deb3\",\"whitesmoke\":\"#f5f5f5\",\"yellowgreen\":\"#9acd32\",\"rebeccapurple\":\"#663399\"};\n\n/**\n * color name convert to hex string.\n *\n * @param {string} color name\n * @returns {string} color hex string\n */\nconst name2hex = (name) => {\n  const colorhex = NAME_HEX_MAP[name];\n  if (!colorhex) throw new Error(`not exists color name: ${name}`);\n  return colorhex;\n};\n\n/**\n * color name convert to formated rgb value.\n *\n * @param {string} color name\n * @param {*} [format={}]\n * @returns {*} formated rgb value\n */\nconst name2rgb = (name, format={}) => {\n  const colorhex = NAME_HEX_MAP[name];\n  if (!colorhex) throw new Error(`not exists color name: ${name}`);\n  const rgb = hex2rgb(colorhex, format);\n  return rgb;\n};\n\n// export api.\nmodule.exports = {\n  hex2rgb: hex2rgb,\n  rgb2hex: rgb2hex,\n  name2hex: name2hex,\n  name2rgb: name2rgb,\n  NAME_HEX_MAP: NAME_HEX_MAP,\n};\n\nconst _createNameHexMap = () => {\n  (async () => {\n    const url = \"https://developer.mozilla.org/en-US/docs/Web/CSS/color_value\";\n    const html = await (await fetch(url)).text();\n    const dom = new DOMParser().parseFromString(html, \"text/html\");\n\n    let nameHexMap = Object.create(null);\n    Array.from(dom.querySelectorAll(\"#colors_table tbody tr\"))\n      .forEach(e => {\n        const codes = e.querySelectorAll('code'),\n              name = codes[0].innerHTML,\n              hex = codes[1].innerHTML;\n        nameHexMap[name] = hex;\n      });\n    console.log(`const NAME_HEX_MAP = ${JSON.stringify(nameHexMap)};`);\n  })();\n};\n// _createNameHexMap();\n\n\n//# sourceURL=webpack://colorconverter/./src/colorconverter.js?");

/***/ })

/******/ });
});