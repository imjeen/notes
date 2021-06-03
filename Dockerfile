FROM jekyll/jekyll

COPY . .

RUN bundle install

EXPOSE 4000