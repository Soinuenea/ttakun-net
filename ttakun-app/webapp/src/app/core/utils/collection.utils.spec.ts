import { concat, removeFromCollection, unique } from './collection.utils';

describe('Collection Utils', () => {

  describe('concat', () => {
    it('should return empty array when null param is given', () => {
      const concatArray = concat(null);

      const expected = [];

      expect(JSON.stringify(concatArray)).toBe(JSON.stringify(expected));
    });

    it('should concat the array values', () => {
      const concatArray = concat([1, 2, 3], [4, 5, 6], [7, 8, 9]);

      const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      expect(JSON.stringify(concatArray)).toBe(JSON.stringify(expected));
    });
  });

  describe('unique', () => {
    it ('should return empty array if null is given', () => {
      const uniqueResult = unique(null);

      const expected = [];

      expect(JSON.stringify(uniqueResult)).toBe(JSON.stringify(expected));
    });

    it ('should return empty unique element array if array is given', () => {
      const uniqueResult = unique([1, 2, 3, 4, 1, 2, 3, 4]);

      const expected = [1, 2, 3, 4];

      expect(JSON.stringify(uniqueResult)).toBe(JSON.stringify(expected));
    });
  });

  describe('removeFromCollection', () => {
    it ('should return null if null is given', () => {
      const result = removeFromCollection({}, null);

      const expected = null;

      expect(result).toBe(expected);
    });

    it ('should return same collection if unknown element is given', () => {
      const result = removeFromCollection(5, [1, 2, 3, 4]);

      const expected = [1, 2, 3, 4];

      expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
    });

    it ('should return collection with element removed if it is found', () => {
      const result = removeFromCollection(3, [1, 2, 3, 4]);

      const expected = [1, 2, 4];

      expect(JSON.stringify(result)).toBe(JSON.stringify(expected));
    });
  });
});
