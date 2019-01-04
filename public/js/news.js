function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
  
    // Begin building an object to contain our API call's query parameters
    // Set the API key
    var queryParams = { "api-key": "b9f91d369ff59547cd47b931d8cbc56b:0:74623931"};
  
    // Grab text the user typed into the search input, add to the queryParams object
    queryParams.q = 'alzheimers'
  
    // Logging the URL so we have access to it for troubleshooting
    return queryURL + $.param(queryParams);
  }
  
  function updatePage(NYTData) {
    // Get from the form the number of results to display
    // API doesn't have a "limit" parameter, so we have to do this ourselves
  
  
    for (var i = 0; i < 10; i++) {
      // Get specific article info for current index
      var article = NYTData.response.docs[i];
  
      // Increase the articleCount (track article # - starting at 1)
      var articleCount = i + 1;
  
      // Create the  list group to contain the articles and add the article content for each
      var $articleList = $("<ul>");
      $articleList.addClass("list-group");
  
      // Add the newly created element to the DOM
      $("#article-section").append($articleList);
  
      // If the article has a headline, log and append to $articleList
      var headline = article.headline;
      var $articleListItem = $("<li class='list-group-item articleHeadline'>");
  
      if (headline && headline.main) {
        $articleListItem.append(
          "<span class='label label-primary'>" +
            articleCount +
            ". </span>" +
            "<strong><a href='" + article.web_url + "'> " +
            headline.main +
            "</a></strong>"
        );
      }
  
      // If the article has a byline, log and append to $articleList
      var byline = article.byline;
  
      if (byline && byline.original) {
        $articleListItem.append("<h5>" + byline.original + "</h5>");
      }
  
      // Append the article
      $articleList.append($articleListItem);
    }
  }
  
  // Function to empty out the articles
  function clear() {
    $("#article-section").empty();
  }
  
  
  $(document).ready(function() {
  
    // Empty the region associated with the articles
    clear();
  
    // Build the query URL for the ajax request to the NYT API
    var queryURL = buildQueryURL();
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(updatePage);
  });