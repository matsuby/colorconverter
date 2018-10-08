const colorconverter = require('../src/colorconverter');

describe('hex2rgb()', () => {
  describe('hex param test', () => {
    describe('normal', () => {
      test('six digits, has "#": 123abc', () => {
        expect(colorconverter.hex2rgb('#123abc')).toEqual({r: 18, g: 58, b: 188});
      });
      test('six digits, has not "#": 123abc', () => {
        expect(colorconverter.hex2rgb('123abc')).toEqual({r: 18, g: 58, b: 188});
      });
      test('three digits, has "#": #FFF', () => {
        expect(colorconverter.hex2rgb('#FFF')).toEqual({r: 255, g: 255, b: 255});
      });
      test('three digits, has not "#": 000', () => {
        expect(colorconverter.hex2rgb('000')).toEqual({r: 0, g: 0, b: 0});
      });
    });
    describe('exception', () => {
      test('invalid value: null', () => {
        expect(() => {
          colorconverter.hex2rgb(null);
        }).toThrow();
      });
      test('invalid format: four digits: "#ffff"', () => {
        expect(() => {
          colorconverter.hex2rgb('#ffff');
        }).toThrow();
      });
      test('invalid format: out of hex: "#gggggg"', () => {
        expect(() => {
          colorconverter.hex2rgb('#gggggg');
        }).toThrow();
      });
    });
  });

  describe('format param test', () => {
    describe('normal', () => {
      test('literal: {}', () => {
        expect(colorconverter.hex2rgb('#123abc', {})).toEqual({r: 18, g: 58, b: 188});
      });
      test('literal: []', () => {
        expect(colorconverter.hex2rgb('#123abc', [])).toEqual([18, 58, 188]);
      });
      test('literal: ""', () => {
        expect(colorconverter.hex2rgb('#123abc', "")).toBe("18,58,188");
      });
      test('string: "object"', () => {
        expect(colorconverter.hex2rgb('#123abc', "object")).toEqual({r: 18, g: 58, b: 188});
      });
      test('string: "array"', () => {
        expect(colorconverter.hex2rgb('#123abc', "array")).toEqual([18, 58, 188]);
      });
      test('string: "string"', () => {
        expect(colorconverter.hex2rgb('#123abc', "string")).toBe("18,58,188");
      });
      test('funtion: (r, g, b) => `rgb(${r},${g},${b})`', () => {
        expect(colorconverter.hex2rgb('#123abc', (r, g, b) => `rgb(${r},${g},${b})`)).toBe("rgb(18,58,188)");
      });
      test('funtion: (r, g, b) => r + g + b', () => {
        expect(colorconverter.hex2rgb('#123abc', (r, g, b) => r + g + b)).toBe(18 + 58 + 188);
      });
    });
    describe('exception', () => {
      test('invalid value: null', () => {
        expect(() => {
          colorconverter.hex2rgb('#123abc', null);
        }).toThrow();
      });
    });
  });
});
