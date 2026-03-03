import { useState } from "react";

const ignoreNoise = new Set(["profile", "picture", "profilepicture"]);

function normalizeUsername(raw) {
  if (!raw) return "";
  let trimmed = String(raw).trim();
  if (trimmed.startsWith("@")) {
    trimmed = trimmed.slice(1);
  }
  return trimmed.toLowerCase();
}

function parseUsernames(raw) {
  if (!raw) return new Set();
  const parts = String(raw).split(/[\n,;\s]+/g);
  const set = new Set();
  parts.forEach((part) => {
    if (!part) return;
    const norm = normalizeUsername(part);
    if (!norm) return;
    if (ignoreNoise.has(norm)) return;
    set.add(norm);
  });
  return set;
}

function setDifference(aSet, bSet) {
  const result = [];
  aSet.forEach((value) => {
    if (!bSet.has(value)) {
      result.push(value);
    }
  });
  return result;
}

function sortUsernames(list) {
  return list.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
}

function formatList(list) {
  if (!list || list.length === 0) return "";
  return list.map((u) => `@${u}`).join("\n");
}

function Tracker() {
  const [followingInput, setFollowingInput] = useState("");
  const [followersInput, setFollowersInput] = useState("");
  const [notFollowingBack, setNotFollowingBack] = useState([]);
  const [youDontFollowBack, setYouDontFollowBack] = useState([]);

  const handleCompute = () => {
    const following = parseUsernames(followingInput);
    const followers = parseUsernames(followersInput);

    const notBack = sortUsernames(setDifference(following, followers));
    const youDontBack = sortUsernames(setDifference(followers, following));

    setNotFollowingBack(notBack);
    setYouDontFollowBack(youDontBack);
  };

  const handleClear = () => {
    setFollowingInput("");
    setFollowersInput("");
    setNotFollowingBack([]);
    setYouDontFollowBack([]);
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
      <h2 className="text-center text-5xl font-semibold">Get started</h2>

      <section>
        <p className="text-center text-lg">
          Paste two lists of Instagram usernames. Go to you instagram account in
          a web browser and scroll to the bottom of the page while copying the
          usernames. Comparison is case-insensitive.
        </p>

        <p className="text-center text-lg font-bold mt-5">
          Be aware that some users on Instagram could have two different
          usernames.
        </p>
      </section>

      <section className="flex flex-col items-center gap-3">
        <div className="text-xl font-medium">
          <label htmlFor="followingInput">Usernames you follow</label>
        </div>
        <div className="w-full">
          <textarea
            id="followingInput"
            rows="8"
            className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
            placeholder={"e.g. user1\nuser2, @user3"}
            value={followingInput}
            onChange={(e) => setFollowingInput(e.target.value)}
          />
        </div>
      </section>

      <section className="flex flex-col items-center gap-3">
        <div className="text-xl font-medium">
          <label htmlFor="followersInput">Usernames that follow you</label>
        </div>
        <div className="w-full">
          <textarea
            id="followersInput"
            rows="8"
            className="w-full rounded-lg border border-gray-300 p-3 text-base focus:border-black focus:outline-none focus:ring-2 focus:ring-black"
            placeholder={"e.g. user1\nuser4; @user5"}
            value={followersInput}
            onChange={(e) => setFollowersInput(e.target.value)}
          />
        </div>
      </section>

      <section className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleCompute}
          className="rounded-md bg-black px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          Compute
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="rounded-md border border-gray-400 px-5 py-3 text-base font-medium text-black transition duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Clear
        </button>
      </section>

      <section className="flex flex-col items-center gap-4 pb-16">
        <h3 className="text-2xl font-semibold">Results</h3>
        <div className="flex w-full flex-col gap-6 md:flex-row md:items-start md:justify-center">
          <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h4 className="text-lg font-semibold">
              You follow but they don&apos;t follow you back (
              <span>{notFollowingBack.length}</span>)
            </h4>
            <pre className="mt-2 whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-base">
              {formatList(notFollowingBack)}
            </pre>
          </div>

          <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <h4 className="text-lg font-semibold">
              They follow you but you don&apos;t follow back (
              <span>{youDontFollowBack.length}</span>)
            </h4>
            <pre className="mt-2 whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-base">
              {formatList(youDontFollowBack)}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Tracker;
