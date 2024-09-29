const htmlmin = require('html-minifier')
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("date", (dateObj, format) => {
    if (dateObj === 'now') {
      dateObj = new Date();
    }
    if (!(dateObj instanceof Date) && typeof dateObj !== 'string' && typeof dateObj !== 'number') {
      console.warn("Invalid date input:", dateObj);
      return "Invalid Date";
    }
    const dt = (typeof dateObj === 'string' || typeof dateObj === 'number')
      ? DateTime.fromISO(dateObj)
      : DateTime.fromJSDate(dateObj);

    if (!dt.isValid) {
      console.warn("Invalid DateTime object created from:", dateObj);
      return "Invalid Date";
    }

    return dt.toFormat(format);
  });

  // Add this line to provide 'now' as a global data
  eleventyConfig.addGlobalData("now", () => new Date());
  /**
   * Upgrade helper
   * Uncomment if you need help upgrading to new major version.
   */
  //eleventyConfig.addPlugin(UpgradeHelper);

  /**
   * Files to copy
   * https://www.11ty.dev/docs/copy/
   */
  eleventyConfig.addPassthroughCopy('fonts')
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('assets') // Add this line to copy the assets directory

  /**
   * HTML Minifier for production builds
   */
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_ENV == 'production' &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }

    return content
  })

  return {
    dir: {
      input: "src",
      data: "../_data"
    }
  };
};
