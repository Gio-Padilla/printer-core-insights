// ExternalServices.mjs
export default class ExternalServices {

  async getRedditTopPosts(
    subreddit = "3dprint",
    limit = 10,
    timeframe = "week",
    includeNSFW = false  // default = SFW mode
  ) {
    const url = `https://www.reddit.com/r/${subreddit}/top.json?t=${timeframe}&limit=${limit}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      let posts = data.data.children
        .map(post => {
          const p = post.data;

          const isNSFW = p.over_18 === true;

          // ❌ Skip any NSFW post when includeNSFW is false
          if (isNSFW && !includeNSFW) return null;

          let imageUrl = this.extractImage(p);

          return {
            id: p.id,                // short ID
            fullname: p.name,        // full ID
            title: p.title,
            url: "https://www.reddit.com" + p.permalink,
            image: imageUrl,
            score: p.score,
            author: p.author
            // Notice: nsfw flag removed
          };
        })
        .filter(post => post !== null); // remove nulls (skipped NSFW)

      return posts;

    } catch (error) {
      console.error("Error loading Reddit posts:", error);
      return [];
    }
  }

  // Extract first usable image
  extractImage(p) {
    // 1. Gallery post → first image
    if (p.is_gallery && p.gallery_data && p.media_metadata) {
      const firstItem = p.gallery_data.items[0];
      const media = p.media_metadata[firstItem.media_id];
      if (media?.s?.u) {
        return media.s.u.replace(/&amp;/g, "&");
      }
    }

    // 2. Preview full-size
    if (p.preview?.images?.[0]?.source?.url) {
      return p.preview.images[0].source.url.replace(/&amp;/g, "&");
    }

    // 3. Highest resolution available
    if (p.preview?.images?.[0]?.resolutions?.length > 0) {
      const best = p.preview.images[0].resolutions.slice(-1)[0];
      return best.url.replace(/&amp;/g, "&");
    }

    // 4. Direct URL (possible image)
    if (p.url_overridden_by_dest && this.isLikelyImage(p.url_overridden_by_dest)) {
      return p.url_overridden_by_dest.replace(/&amp;/g, "&");
    }

    // 5. Thumbnail
    if (p.thumbnail && this.isLikelyImage(p.thumbnail)) {
      return p.thumbnail.replace(/&amp;/g, "&");
    }

    // 6. Default placeholder
    return "/images/noImage.webp";
  }

  // Utility for image URL detection
  isLikelyImage(url) {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  }
}
