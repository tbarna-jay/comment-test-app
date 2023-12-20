const getWordCount = (body: string): number =>
  body.replace(/\n/g, " ").split(/\s+/).length;
export default getWordCount;
