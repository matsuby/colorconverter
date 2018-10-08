const colorconverter = require('../src/colorconverter');

describe('rgb2hex()', () => {
  describe('rgb param test', () => {
    describe('normal', () => {
      test('type: string, and csv format', () => {
        expect(colorconverter.rgb2hex('18,58,188')).toEqual("#123abc");
      });
      test('type: array, and has three length', () => {
        expect(colorconverter.rgb2hex([18, 58, 188])).toEqual("#123abc");
      });
      test('type: array, and has three length and inner value is string', () => {
        expect(colorconverter.rgb2hex(["18", "58", "188"])).toEqual("#123abc");
      });
      test('type: object, and has "r", "g", "b" props', () => {
        expect(colorconverter.rgb2hex({r: 18, g: 58, b: 188})).toEqual("#123abc");
      });
      test('type: object, and has "r", "g", "b" props and inner value is string', () => {
        expect(colorconverter.rgb2hex({r: "18", g: "58", b: "188"})).toEqual("#123abc");
      });
    });
    describe('exception', () => {
      test('invalid value: null', () => {
        expect(() => {
          colorconverter.rgb2hex(null);
        }).toThrow();
      });
      test('invalid value for string: not csv', () => {
        expect(() => {
          colorconverter.rgb2hex("18/58/188");
        }).toThrow();
      });
      test('invalid value for string: has no number', () => {
        expect(() => {
          colorconverter.rgb2hex("18,invalid,188");
        }).toThrow();
      });
      test('invalid value for string: has digit number', () => {
        expect(() => {
          colorconverter.rgb2hex("18,58.5,188");
        }).toThrow();
      });
      test('invalid value for string: has out of range number(256)', () => {
        expect(() => {
          colorconverter.rgb2hex("18,256,188");
        }).toThrow();
      });
      test('invalid value for string: has out of range number(-1)', () => {
        expect(() => {
          colorconverter.rgb2hex("18,-1,188");
        }).toThrow();
      });
      test('invalid value for array: has not three length(less)', () => {
        expect(() => {
          colorconverter.rgb2hex([18, 58]);
        }).toThrow();
      });
      test('invalid value for array: has not three length(over)', () => {
        expect(() => {
          colorconverter.rgb2hex([18, 58, 188, 255]);
        }).toThrow();
      });
      test('invalid value for array: has no number', () => {
        expect(() => {
          colorconverter.rgb2hex([18, "invalid", 188]);
        }).toThrow();
      });
      test('invalid value for object: has not "r", "g", "b" props', () => {
        expect(() => {
          colorconverter.rgb2hex({r: 18, x: 58, b: 188});
        }).toThrow();
      });
      test('invalid value for array: has no number', () => {
        expect(() => {
          colorconverter.rgb2hex({r: 18, g: "invalid", b: 188});
        }).toThrow();
      });
    });
  });

  describe('addHash param test', () => {
    describe('normal', () => {
      test('addHash=true(default)', () => {
        expect(colorconverter.rgb2hex('18,58,188', true)).toEqual("#123abc");
      });
      test('addHash=false', () => {
        expect(colorconverter.rgb2hex('18,58,188', false)).toEqual("123abc");
      });
    });
  });
});
