# PicnicPlannerApp
  Make sure you run npm install before you start and then run node picnic-planner.js < city >

# Brief
  We would like you to write a picnic planner application. The app will be command line driven and will accept a single argument for the user’s city. The application is supposed to assess whether one or both of the weekend days are going to be dry and either suggest one of those days or recommend not going on a picnic. You should use live weather data from this API: https://www.metaweather.com/api/ (please respect their request to keep your average number of requests fairly low).

# Cases:
 If the next Saturday and Sunday are expected to be rainy or cold (<10 deg C), then theresponse should be “The weather isn’t looking very good this weekend, maybe stayindoors.”
 If either Saturday or Sunday is dry and not too cold, then the response should be “You should have your picnic on < day >.”
 If both Saturday and Sunday are due to be dry and not too cold, then the responseshould be “This weekend looks nice for a picnic, < day > is best because it’s < reason >.”; you have free rein to decide upon sensible reasons to favour one day over another.
