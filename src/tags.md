---
title: 'Tag Archive'
layout: 'layouts/feed.html'
pagination:
  data: collections
  size: 1
  alias: tag
  filter:
    [
      'all',
      'nav',
      'blog',
      'projects',
      'featuredProjects',
      'recentPosts',
      'rss',
    ]
permalink: '/tag/{{ tag | slug }}/'
---
