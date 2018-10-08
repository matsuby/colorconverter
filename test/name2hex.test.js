const colorconverter = require('../src/colorconverter');

describe('name2hex()', () => {
  describe('name param test', () => {
    describe('normal', () => {
      test('exists color name: "powderblue"', () => {
        expect(colorconverter.name2hex('powderblue')).toEqual("#b0e0e6");
      });
    });
    describe('exception', () => {
      test('not exists color name: "invalid"', () => {
        expect(() => {
          colorconverter.name2hex("invalid");
        }).toThrow();
      });
    });
  });

  describe('addHash param test', () => {
    describe('normal', () => {
      test('addHash=true(default)', () => {
        expect(colorconverter.name2hex('powderblue', true)).toEqual("#b0e0e6");
      });
      test('addHash=false', () => {
        expect(colorconverter.name2hex('powderblue', false)).toEqual("b0e0e6");
      });
    });
  });
});
