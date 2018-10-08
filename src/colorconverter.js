"use strict";

/**
 * color hex string convert to formated rgb value.
 *
 * @param {string} colorhex
 *   you can omit "#", and color hex can be three or six digits.
 *   e.g.) "#123abc", "FFF"
 *
 * @param {*} [format={}]
 *   you can specify output format literal or string keyword.
 *   also you can use callback function, then recieve three params(r, g, b).
 *   e.g.) literal:  {} or [] or ""
 *         string:   "object" or "array" or "string"
 *         function: (r, g, b) => `rgb(${r},${g},${b})`)
 *
 * @returns {*} formated rgb value
 *   e.g.) object:   {r: 18, g: 58, b: 188}
 *         array:    [18, 58, 188]
 *         string:   "18,58,188"
 *         function: "rgb(18,58,188)"
 */
const hex2rgb = (colorhex, format={}) => {
  if (!colorhex || typeof colorhex !== "string") {
    throw new Error(`invalid colorhex value: ${colorhex}`);
  }
  if (!/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.exec(colorhex)) {
    throw new Error(`invalid colorhex value: ${colorhex}`);
  }

  if (colorhex.startsWith("#")) colorhex = colorhex.substring(1);
  const step = colorhex.length === 3 ? 1 : 2;
  let r = parseInt(colorhex.substring(step*0, step*1), 16),
      g = parseInt(colorhex.substring(step*1, step*2), 16),
      b = parseInt(colorhex.substring(step*2, step*3), 16);

  // e.g. "#0af" => "#00aaff" => "rgb(0,170,255)"
  if (colorhex.length === 3) [r, g, b] = [r*17, g*17, b*17];

  // format allows callback function.
  if (typeof format === "function") {
    return format(r, g, b);
  }

  // format allows literal or string keyword.
  // when use literal, must be empty.
  const strFormat = JSON.stringify(format);
  if (strFormat === '{}') format = "object";
  if (strFormat === '[]') format = "array";
  if (strFormat === '""') format = "string";
  format = format.toLowerCase();

  switch (format) {
    case "object":
      return {r: r, g: g, b: b};
    case "array":
      return [r, g, b];
    case "string":
      return `${r},${g},${b}`;
    default:
      throw new Error(`invalid format: ${format}`);
  }
};

/**
 * rgb value convert to hex string.
 *
 * @param {*} rgb
 *   you can pass value some kind of rgb format.
 *   e.g.) object: {r: 18, g: 58, b: 188}
 *         array:  [18, 58, 188]
 *         string: "18,58,188"
 *
 * @param {boolean} [addHash=true]
 *
 * @returns {string} color hex string
 *   cannot three digits, only six digits and lowercase.
 *   e.g.) addHash=true:  "#123abc"
 *         addHash=false: "123abc"
 */
const rgb2hex = (rgb, addHash=true) => {
  const RGB_KEYS = ["r", "g", "b"];
  let r, g, b;

  if (!rgb) {
    throw new Error(`invalid rgb value: ${rgb}`);
  } else if (typeof rgb === "string") {
    [r, g, b] = rgb.split(",").map(v => +v.trim());
  } else if (Array.isArray(rgb) && rgb.length === 3) {
    [r, g, b] = rgb.map(v => +v);
  } else if (typeof rgb === "object" && RGB_KEYS.every(k => rgb.hasOwnProperty(k))) {
    [r, g, b] = RGB_KEYS.map(k => +rgb[k]);
  }

  [r, g, b].forEach((v, i) => {
    const k = RGB_KEYS[i];
    if (Number.isNaN(v))   throw new Error(`invalid "${k}" of rgb is not int value: ${v}`);
    if (v !== parseInt(v)) throw new Error(`invalid "${k}" of rgb is not int value: ${v}`);
    if (v < 0 || v > 255)  throw new Error(`invalid "${k}" of rgb is out of range: ${v}`);
  });

  // rgb int covert to color hex string(only 6 digits).
  let colorhexes = [r, g, b].map(v => v.toString(16).padStart(2, "0")),
      colorhex = colorhexes.join("");
  if (addHash) colorhex = "#" + colorhex;
  return colorhex;
};

/**
 * @constant
 * @type {object}
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#colors_table}
 */
const NAME_HEX_MAP = {"black":"#000000","silver":"#c0c0c0","gray":"#808080","white":"#ffffff","maroon":"#800000","red":"#ff0000","purple":"#800080","fuchsia":"#ff00ff","green":"#008000","lime":"#00ff00","olive":"#808000","yellow":"#ffff00","navy":"#000080","blue":"#0000ff","teal":"#008080","aqua":"#00ffff","orange":"#ffa500","aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aquamarine":"#7fffd4","azure":"#f0ffff","beige":"#f5f5dc","bisque":"#ffe4c4","blanchedalmond":"#ffebcd","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887","cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"aqua","darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkgrey":"#a9a9a9","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f","darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkslategrey":"#2f4f4f","darkturquoise":"#00ced1","darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dimgrey":"#696969","dodgerblue":"#1e90ff","firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","greenyellow":"#adff2f","grey":"#808080","honeydew":"#f0fff0","hotpink":"#ff69b4","indianred":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c","lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2","lightgray":"#d3d3d3","lightgreen":"#90ee90","lightgrey":"#d3d3d3","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightslategrey":"#778899","lightsteelblue":"#b0c4de","lightyellow":"#ffffe0","limegreen":"#32cd32","linen":"#faf0e6","magenta":"fuchsia","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370db","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee","mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5","navajowhite":"#ffdead","oldlace":"#fdf5e6","olivedrab":"#6b8e23","orangered":"#ff4500","orchid":"#da70d6","palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#db7093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","rosybrown":"#bc8f8f","royalblue":"#4169e1","saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","slategrey":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4","tan":"#d2b48c","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0","violet":"#ee82ee","wheat":"#f5deb3","whitesmoke":"#f5f5f5","yellowgreen":"#9acd32","rebeccapurple":"#663399"};

/**
 * color name convert to hex string.
 *
 * @param {string} color name
 * @returns {string} color hex string
 */
const name2hex = (name) => {
  const colorhex = NAME_HEX_MAP[name];
  if (!colorhex) throw new Error(`not exists color name: ${name}`);
  return colorhex;
};

/**
 * color name convert to formated rgb value.
 *
 * @param {string} color name
 * @param {*} [format={}]
 * @returns {*} formated rgb value
 */
const name2rgb = (name, format={}) => {
  const colorhex = NAME_HEX_MAP[name];
  if (!colorhex) throw new Error(`not exists color name: ${name}`);
  const rgb = hex2rgb(colorhex, format);
  return rgb;
};

// export api.
module.exports = {
  hex2rgb: hex2rgb,
  rgb2hex: rgb2hex,
  name2hex: name2hex,
  name2rgb: name2rgb,
  NAME_HEX_MAP: NAME_HEX_MAP,
};

const _createNameHexMap = () => {
  (async () => {
    const url = "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value";
    const html = await (await fetch(url)).text();
    const dom = new DOMParser().parseFromString(html, "text/html");

    let nameHexMap = Object.create(null);
    Array.from(dom.querySelectorAll("#colors_table tbody tr"))
      .forEach(e => {
        const codes = e.querySelectorAll('code'),
              name = codes[0].innerHTML,
              hex = codes[1].innerHTML;
        nameHexMap[name] = hex;
      });
    console.log(`const NAME_HEX_MAP = ${JSON.stringify(nameHexMap)};`);
  })();
};
// _createNameHexMap();
