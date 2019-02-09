export const hashtagArray = data => {
  const re1 = '(")'; // Any Single Character 1
  const re2 = "(edges)"; // Word 1
  const re3 = '(")'; // Any Single Character 2
  const re4 = "(:)"; // Any Single Character 3
  const re5 = "(\\[)"; // Any Single Character 4
  const re6 = "(\\{)"; // Any Single Character 5
  const re7 = '(")'; // Any Single Character 6
  const re8 = "(node)"; // Word 2
  const re9 = '(")'; // Any Single Character 7
  const re10 = "(:)"; // Any Single Character 8
  const re11 = "(\\{)"; // Any Single Character 9
  const re12 = '(")'; // Any Single Character 10
  const re13 = "(text)"; // Word 3
  const re14 = '(")'; // Any Single Character 11
  const re15 = "(:)"; // Any Single Character 12
  const re16 = '(".*?")'; // Double Quote String 1
  const re17 = "(\\})"; // Any Single Character 13
  const p = new RegExp(
    re1 +
      re2 +
      re3 +
      re4 +
      re5 +
      re6 +
      re7 +
      re8 +
      re9 +
      re10 +
      re11 +
      re12 +
      re13 +
      re14 +
      re15 +
      re16 +
      re17,
    ["g"]
  );
  return data.match(p);
};

export const timeStamp = data => {
  const re1 = '(")'; // Any Single Character 1
  const re2 = "(taken)"; // Word 1
  const re3 = "(_)"; // Any Single Character 2
  const re4 = "(at)"; // Word 2
  const re5 = "(_)"; // Any Single Character 3
  const re6 = "(timestamp)"; // Word 3
  const re7 = '(")'; // Any Single Character 4
  const re8 = "(:)"; // Any Single Character 5
  const re9 = "(\\d+)"; // Integer Number 1

  const p = new RegExp(re1 + re2 + re3 + re4 + re5 + re6 + re7 + re8 + re9, [
    "g"
  ]);
  return data.match(p);
};

export const likeCount = data => {
  const re1 = '("edge_liked_by")'; // Double Quote String 1
  const re2 = "(:)"; // Any Single Character 1
  const re3 = "(\\{)"; // Any Single Character 2
  const re4 = '("count")'; // Double Quote String 2
  const re5 = "(:)"; // Any Single Character 3
  const re6 = "(\\d+)"; // Integer Number 1
  const re7 = "(\\})"; // Any Single Character 4

  const p = new RegExp(re1 + re2 + re3 + re4 + re5 + re6 + re7, ["g"]);
  return data.match(p);
};
