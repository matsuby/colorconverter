const colorconverter = require('../src/colorconverter');

describe('name2rgb()', () => {
  describe('name param test', () => {
    describe('normal', () => {
      test('exists color name: "powderblue"', () => {
        expect(colorconverter.name2rgb('powderblue')).toEqual({r: 176, g: 224, b: 230});
      });
    });
    describe('exception', () => {
      test('not exists color name: "invalid"', () => {
        expect(() => {
          colorconverter.name2rgb("invalid");
        }).toThrow();
      });
    });
  });

  describe('format param test', () => {
    describe('normal', () => {
      test('literal: {}', () => {
        expect(colorconverter.name2rgb('powderblue', {})).toEqual({r: 176, g: 224, b: 230});
      });
      test('literal: []', () => {
        expect(colorconverter.name2rgb('powderblue', [])).toEqual([176,224,230]);
      });
      test('literal: ""', () => {
        expect(colorconverter.name2rgb('powderblue', "")).toBe("176,224,230");
      });
      test('string: "string"', () => {
        expect(colorconverter.name2rgb('powderblue', "string")).toBe("176,224,230");
      });
      test('funtion: (r, g, b) => `rgb(${r},${g},${b})`', () => {
        expect(colorconverter.name2rgb('powderblue', (r, g, b) => `rgb(${r},${g},${b})`)).toBe("rgb(176,224,230)");
      });
    });
    describe('exception', () => {
      test('invalid value: null', () => {
        expect(() => {
          colorconverter.name2rgb('powderblue', null);
        }).toThrow();
      });
    });
  });
});
