const getWordCount = (body: string): number => {
  if (body.length === 0) {
    return 0;
  }
  return body.replace(/\n/g, " ").split(/\s+/).length;
};

export default getWordCount;
