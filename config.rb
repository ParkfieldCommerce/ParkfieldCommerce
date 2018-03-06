# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions
activate :directory_indexes
activate :livereload
activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end



# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false



# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

helpers do
  def isCurrentNewsPage(pageLink, currentPage)
    if(pageLink == currentPage)
      return true
    else
      return false
    end
  end
end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

configure :development do
  require 'sprockets/es6'

  activate :dato, live_reload: true
  activate :pagination
  dato.tap do |dato|
    dato.case_studies.each do |caseStudy|
      proxy "/case-studies/#{caseStudy.handle}/index.html", "case-study.html", 
      locals: { caseStudy: caseStudy },
      ignore: true
    end

    dato.migration_pages.each do |migrationPage|
      proxy "/#{migrationPage.handle}/index.html", "migration-page.html", 
      locals: { migrationPage: migrationPage },
      ignore: true
    end

    paginate dato.articles, "/news", "/news.html", per_page: 8
    dato.articles.each do |article|
      proxy "/articles/#{article.handle}/index.html", "article.html", 
      locals: { article: article },
      ignore: true
    end
  end
end

configure :build do
  activate :dato, 
  live_reload: true,
  token: ENV['DATO_API_TOKEN']
  activate :minify_css
  activate :pagination
  #activate :minify_javascript
  dato.tap do |dato|
    dato.case_studies.each do |caseStudy|
      proxy "/case-studies/#{caseStudy.handle}/index.html", "case-study.html", 
      locals: { caseStudy: caseStudy },
      ignore: true
    end

    dato.migration_pages.each do |migrationPage|
      proxy "/#{migrationPage.handle}/index.html", "migration-page.html", 
      locals: { migrationPage: migrationPage },
      ignore: true
    end

    paginate dato.articles, "/news", "/news.html", per_page: 8
    dato.articles.each do |article|
      proxy "/articles/#{article.handle}/index.html", "article.html", 
      locals: { article: article },
      ignore: true
    end
  end
end
