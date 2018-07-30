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

    dato.super_case_studies.each do |caseStudy|
      proxy "/case-studies+/#{caseStudy.handle}/index.html", "super-case-study.html", 
      locals: { caseStudy: caseStudy },
      ignore: true
    end

    dato.migration_pages.each do |migrationPage|
      proxy "/migration/#{migrationPage.handle}/index.html", "migration-page.html", 
      locals: { migrationPage: migrationPage },
      ignore: true
    end

    dato.agreements.each do |agreementPage|
      proxy "/#{agreementPage.handle}/index.html", "agreement-pages.html", 
      locals: { agreementPage: agreementPage },
      ignore: true
    end

    paginate dato.articles, "/ecommerce-best-practices", "/ecommerce-best-practices.html", per_page: 8
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

    dato.super_case_studies.each do |caseStudy|
      proxy "/case-studies+/#{caseStudy.handle}/index.html", "super-case-study.html", 
      locals: { caseStudy: caseStudy },
      ignore: true
    end
    
    dato.migration_pages.each do |migrationPage|
      proxy "/migration/#{migrationPage.handle}/index.html", "migration-page.html", 
      locals: { migrationPage: migrationPage },
      ignore: true
    end

    dato.agreements.each do |agreementPage|
      proxy "/#{agreementPage.handle}/index.html", "agreement-pages.html", 
      locals: { agreementPage: agreementPage },
      ignore: true
    end

    paginate dato.articles, "/ecommerce-best-practices", "/ecommerce-best-practices.html", per_page: 8
    dato.articles.each do |article|
      proxy "/articles/#{article.handle}/index.html", "article.html", 
      locals: { article: article },
      ignore: true
    end
  end
end

proxy "_redirects", "netlify-redirects", ignore: true
proxy "googlebe0c108108bc72d8.html.erb", "googlebe0c108108bc72d8.html", ignore: true
redirect "pages/ecommerce-web-design.html", to: "/ecommerce-web-design"
redirect "pages/marketing.html", to: "/marketing"
redirect "pages/merida-studio.html", to: "/case-studies/merida"
redirect "pages/new-york-shopify-experts.html", to: "/long-island-shopify-experts"
redirect "pages/long-island-shopify-expert.html", to: "/long-island-shopify-experts"
redirect "pages/homenature.html", to: "/case-studies/homenature"
redirect "pages/ecommerce-services.html", to: "/ecommerce-web-design"
redirect "blogs/news.html", to: "/news"
redirect "blogs/news/how-the-internet-has-changed-the-beauty-industry.html", to: "/articles/how-the-internet-has-changed-the-beauty-industry"
redirect "blogs/news/growth-of-the-ecommerce-market.html", to: "/articles/growth-of-the-ecommerce-market"
redirect "blogs/news/ecommerce-trends-for-2018.html", to: "/articles/ecommerce-trends-for-2018"
redirect "pages/work-ecommerce-portfolio.html", to: "/portfolio"
redirect "pages/rebdolls.html", to: "/case-studies/rebdolls"
redirect "pages/project-form.html", to: "/contact"
redirect "pages/migrating-from-magento-to-shopify-has-never-been-easier.html", to: "/migration/magento-to-shopify-migration"
redirect "blogs/news/running-a-successful-ecommerce-business.html", to: "/articles/running-a-successful-ecommerce-business"
redirect "blogs/news/top-5-shopify-apps-may-2017.html", to: "/articles/top-5-bigcommerce-apps-may-2017"
redirect "blogs/news/parkfield-commerce-partners-with-clutch.html", to: "/articles/parkfield-commerce-partners-with-clutch"
redirect "pages/eva-nyc.html", to: "/case-studies/eva-nyc"
redirect "blogs/news/lets-talk-dropshipping-on-bigcommerce-and-shopify.html", to: "/articles/let-s-talk-dropshipping-for-bigcommerce-and-shopify"
redirect "pages/fervor-bay-case-study.html", to: "/case-studies/fervor-bay"
redirect "blogs/news/5-keys-to-mastering-ecommerce-shipping.html", to: "/articles/5-components-to-mastering-ecommerce-shipping"
redirect "pages/eldridge-orchard-case-study.html", to: "/case-studies/eldridge-and-orchard"
redirect "pages/about-ecommerce-agency.html", to: "/about"
redirect "pages/store-migration-replatforming.html", to: "/migration"
redirect "pages/case-study-whiskey-stills.html", to: "/portfolio"
redirect "pages/kiini.html", to: "/case-studies/kiini"
redirect "pages/portolano-case-study.html", to: "/case-studies/portolano"
redirect "blogs/news/why-you-should-migrate-from-magento-and-magento-2-to-shopify-plus.html", to: "/articles/why-you-should-migrate-from-magento-to-shopify-plus"
redirect "pages/artware-editions.html", to: "/case-studies/artware-editions"
redirect "blogs/news/best-ecommerce-platform-for-small-business.html", to: "/articles/best-ecommerce-platform-for-small-business"
redirect "pages/7-artisan-street.html", to: "/case-studies/7-artisan-street"
redirect "contact-us.html", to: "/contact/"
redirect "blogs/news/how-personalization-is-key-to-ecommerce-success.html", to: "/articles/why-is-mobile-commerce-so-important-for-ecommerce-s"
redirect "pages/netaya-case-study.html", to: "/case-studies/netaya"
redirect "pages/etonic.html", to: "/case-studies/etonic"
redirect "pages/jefferson-lane.html", to: "/case-studies/jefferson-lane"
redirect "pages/contact-us.html", to: "/contact"
redirect "pages/ecommerce-store-migration-replatforming.html", to: "/migration"
redirect "blogs/news/top-5-bigcommerce-apps-may-2017.html", to: "/articles/top-5-bigcommerce-apps-may-2017"
redirect "pages/ecommerce-photography.html", to: "/ecommerce-web-design"
redirect "blogs/news/top-5-shopify-apps-may-2017.html", to: "/articles/top-5-shopify-apps-may-2017"
redirect "pages/home-patterns.html", to: "/portfolio"
redirect "pages/scalisi-skincare.html", to: "/case-studies/scalisi-skincare"
redirect "pages/paige-novick.html", to: "/case-studies/paige-novick"
redirect "blogs/news/market-demand-benefits-of-ecommerce.html", to: "/articles/market-demand-and-benefits-of-ecommerce"
redirect "pages/kulani-kinis-case-study.html", to: "/case-studies/kulani-kinis"
redirect "pages/new-york-ecommerce-design-agency.html", to: "/about"
redirect "blogs/news/top-review-apps-for-bigcommerce-and-shopify.html", to: "/articles/top-review-apps-for-bigcommerce-and-shopify"
redirect "pages/curtain-bluff.html", to: "/case-studies/curtain-bluff"
redirect "pages/photography.html", to: "/ecommerce-web-design"
redirect "pages/photography-for-ecommerce-ny.html", to: "/ecommerce-web-design"
redirect "pages/ecommerce-migration-replatforming.html", to: "/migration"
redirect "pages/photography-for-ecommerce.html", to: "/ecommerce-web-design"
redirect "blogs/news/2017-canada-ecommerce-market.html", to: "/articles/2017-canada-ecommerce-market-facts-key-stats-and-in"
redirect "pages/terms-of-service.html", to: "/terms-and-conditions"
redirect "pages/privacy-policy.html", to: "/privacy-policy"
redirect "blogs/news/why-is-mobile-commerce-so-important-for-ecommerce-success.html", to: "/articles/why-is-mobile-commerce-so-important-for-ecommerce-s"
redirect "pages/the-hour.html", to: "/case-studies/the-hour"
redirect "articles/is-the-future-of-ecommerce-3d-products-shopify-thin.html", to: "/articles/is-the-future-of-ecommerce-3d-products-shopify-thinks-so"
redirect "custom-app-development.html", to: "/custom-shopify-app-development"
redirect "news.html", to: "/ecommerce-best-practices"
redirect "case-studies/maximira.html", to: "/portfolio"
redirect "case-studies/scalisi-skincare.html", to: "/portfolio"
redirect "case-studies/jefferson-lane.html", to: "/portfolio"
redirect "case-studies/artware-editions.html", to: "/portfolio"
redirect "case-studies/eldridge-and-orchard.html", to: "/portfolio"
redirect "case-studies/etonic.html", to: "/portfolio"
redirect "case-studies/7-artisan-street.html", to: "/portfolio"
redirect "homeware-textiles.html", to: "/long-island-shopify-experts"
redirect "marketing.html", to: "/ecommerce-web-design"





