# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions


activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

activate :directory_indexes
activate :livereload

activate :external_pipeline,
   name: :webpack,
   command: build? ?  "yarn run build" : "yarn run start",
   source: "build",
   latency: 1 
# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

# helpers do
#   def some_helper
#     'Helping'
#   end
# end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

configure :development do
  activate :dato, live_reload: true
  dato.tap do |dato|
    dato.case_studies.each do |caseStudy|
      proxy "/case-studies/#{caseStudy.handle}/index.html", "case-study.html", 
      locals: { caseStudy: caseStudy },
      ignore: true
    end
    dato.articles.each do |article|
      proxy "/articles/#{article.handle}/index.html", "article.html", 
      locals: { article: article },
      ignore: true
    end
  end
end

configure :build do
  activate :dato, live_reload: true
  activate :minify_css
  activate :minify_javascript
  dato.tap do |dato|
    dato.case_studies.each do |caseStudy|
      proxy "/case-studies/#{caseStudy.handle}/index.html", "case-study.html", 
      locals: { caseStudy: caseStudy },
      ignore: true
    end
    dato.articles.each do |article|
      proxy "/articles/#{article.handle}/index.html", "article.html", 
      locals: { article: article },
      ignore: true
    end
  end
end
