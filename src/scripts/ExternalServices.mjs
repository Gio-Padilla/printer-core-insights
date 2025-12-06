// ExternalServices.mjs
export default class ExternalServices {
  async getRedditTopPosts(subreddit = "functionalprint", limit = 5, time = "week") {
    const url = `https://www.reddit.com/r/${subreddit}/top.json?t=${time}&limit=${limit}`;

    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "My3DPrintSite/1.0" }
      });

      if (!response.ok) throw new Error(`Reddit API error: ${response.status}`);

      const data = await response.json();

      return data.data.children.map(post => {
        const p = post.data;

        // Get highest quality preview image if it exists
        let previewImage = null;

        if (p.preview?.images?.length) {
          previewImage = p.preview.images[0].source.url.replace(/&amp;/g, "&");
        } else if (p.thumbnail?.startsWith("http")) {
          previewImage = p.thumbnail;
        }

        return {
          title: p.title,
          link: "https://reddit.com" + p.permalink,
          author: p.author,
          score: p.score,
          preview: previewImage
        };
      });

    } catch (err) {
      console.error("Error fetching Reddit posts:", err);
      return [];
    }
  }
}
