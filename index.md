---
layout: default
title: notes
---

<ul class="list-posts">
  {% for post in site.posts %}
    <li title="{{post.content | strip_html | truncate: 100 }}"><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ site.url }}{{ post.url }}" >{{ post.title }}</a></li>
  {% endfor %}
</ul>

<!-- <div id="home">
   <ul class="posts noList">
    {% for post in paginator.posts %}
      <li>
        <span class="date">{{ post.date | date: '%B %d, %Y' }}</span>
        <h3><a href="{{ site.url }}{{ post.url }}">{{ post.title }}</a></h3>
        <p class="description">{% if post.description %}{{ post.description  | strip_html | strip_newlines | truncate: 100 }}{% else %}{{ post.content | strip_html | strip_newlines | truncate: 100 }}{% endif %}</p>
      </li>
    {% endfor %} 
  </ul>
  
  <div class="pagination">
    {% if paginator.previous_page %}
      <a href="{{ site.url }}{{ paginator.previous_page_path }}" class="previous button__outline">Newer Posts</a>
    {% endif %}
    {% if paginator.next_page %}
      <a href="{{ site.url }}{{ paginator.next_page_path }}" class="next button__outline">Older Posts</a>
    {% endif %}
  </div>
</div> -->
