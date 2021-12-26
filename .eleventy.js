module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("_includes/assets/");
  eleventyConfig.addPassthroughCopy('functions/');  
  return {
    dir: {
      input: "pages",
      includes: "_includes",
      output: "_site"            
    }
  }
};