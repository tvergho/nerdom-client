# Nerdom Client

I built a React application to interface with a custom API hosted at https://nerdom-server.herokuapp.com/. You can view the final product at http://nerdom.surge.sh/. The purpose of this application is to provide a way to crowdsource rankings about the relative strengths of characters from three popular fandoms: Star Wars, Harry Potter and the Lord of the Rings. It incorporates a database of 90 of the most well-known characters from the three fandoms, 30 from each universe. The more times the user initiates a "duel," the more accurate the rankings become!

The server is a custom Express/MongoDB/Node backend configured with an algorithm to update the characters' scores based on the results of a duel. The server uses Axios to query the corresponding HP/LOTR/Star Wars API and Cheerio to scrape the image URL off the character's wiki page. The client uses Bootstrap for styling, React Router for navigation, and Axios to communicate with the server. The client connects both to the custom server (code available at https://github.com/tvergho/nerdom-server) and then to the corresponding wiki page to download the image. The page is fully responsive for mobile screens.