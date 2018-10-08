const colorconverter = require('../src/colorconverter');
const fetch = require('node-fetch');

describe('NAME_HEX_MAP', () => {
  test('NAME_HEX_MAP is latest', async () => {
    const url = 'https://developer.mozilla.org/en-US/docs/Web/CSS/color_value';
    const html = await (await fetch(url)).text();
    const dom = new DOMParser().parseFromString(html, 'text/html');

    let nameHexMap = Object.create(null);
    Array.from(dom.querySelectorAll('#colors_table tbody tr'))
      .forEach(e => {
        const codes = e.querySelectorAll('code'),
              name = codes[0].innerHTML,
              hex = codes[1].innerHTML.substring(1);
        nameHexMap[name] = hex;
      });
    expect(colorconverter.NAME_HEX_MAP).toEqual(nameHexMap);
    // console.log(`const NAME_HEX_MAP = ${JSON.stringify(nameHexMap)};`);
  }, 20000);
});
