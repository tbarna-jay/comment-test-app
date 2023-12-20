import getWordCount from "../helpers/getWordsCount";

describe("getWordCount", () => {
  it("should count the words in a string", () => {
    const text =
      "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium";
    expect(getWordCount(text)).toBe(21);
  });

  it("should count the words in a string", () => {
    const text = "asefasdf asdfasdfa";
    expect(getWordCount(text)).toBe(2);
  });

  it("should count the words in a string", () => {
    const text = "asefasdf\nasdfasdfa";
    expect(getWordCount(text)).toBe(2);
  });

  it("should return 0 for an empty string", () => {
    expect(getWordCount("")).toBe(0);
  });
});
