((global) => {
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
   * @returns {string} color hex string.
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
      // rgb is csv string.
      [r, g, b] = rgb.split(",").map(v => +v.trim());
    } else if (Array.isArray(rgb) && rgb.length === 3) {
      // rgb is array.
      [r, g, b] = rgb.map(v => +v);
    } else if (RGB_KEYS.every(k => rgb.hasOwnProperty(k))) {
      // rgb is object.
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

  // export api.
  const colorconvertor = {
    hex2rgb: hex2rgb,
    rgb2hex: rgb2hex,
  };

  if (typeof define === "function" && define.amd) {
    define(() => colorconvertor);
  } else if (typeof exports === "object") {
    module.exports = colorconvertor;
  } else {
    global.colorconvertor = colorconvertor;
  }
})(this);
