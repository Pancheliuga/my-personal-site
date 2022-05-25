const rssPlugin = require('@11ty/eleventy-plugin-rss');
const safeLinks = require('@sardine/eleventy-plugin-external-links');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

module.exports = config => {

    // Plugins
    config.addPlugin(rssPlugin);
    config.addPlugin(safeLinks);
    config.addPlugin(syntaxHighlight);

    // Add filters
    config.addFilter('dateFilter', dateFilter);
    config.addFilter('w3DateFilter', w3DateFilter);

    // Set directories to pass through to the dist folder
    config.addPassthroughCopy('./src/images/');
    config.addPassthroughCopy('./src/assets/');

    // Only minify HTML if we are in production because it slows builds _right_ down
    if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
    }

    // Returns work items, sorted by display order
    config.addCollection('projects', collection => {
        return sortByDisplayOrder(collection.getFilteredByGlob('./src/projects/*.md'));
    });
    
    // Returns work items, sorted by display order then filtered by featured
    config.addCollection('featuredProjects', collection => {
        return sortByDisplayOrder(collection.getFilteredByGlob('./src/projects/*.md')).filter(
        x => x.data.featured
        );
    });

    // Returns a collection of blog posts in reverse date order
    config.addCollection('blog', collection => {
        return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
    });

    // Returns a collection of recent 3 posts in reverse date order
    config.addCollection('recentPosts', (collection) => {
        return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse().slice(0,3);
    });

    // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
    config.setUseGitIgnore(false);

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
          input: 'src',
          output: 'dist'
        }
      };
  };