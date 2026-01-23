# Utah Bills App

This website is a culmination of my good-citizen desire to know what bills are being passed every year through the Utah State legislature. Due to the amount of bills that are passed, I wanted to create a website that focused on findability and discovery. During the legislative session every year, bills are flying through both chambers and the public has any time to react to them. 

My website solves this by showing the status of all bills, included prefiled bill which are submitted before the legislature starts. Then bills can be filtered by status as the move past committees and get voted on in both chambers and then signed or vetoed by the Governor. Another aspect of my website was educational. 

It was just as difficult to learn about the legislative process as it was to program this website. Due to the fact that the state's official "Legislative Guide" is a 404 page, and because there is no one source of truth (besides reading the legal mumbo jumbo in the Utah Constitution). I found many great resources though and the homepage is a culmination of those. I even went so far as to travel by train to the Utah State Capitol, and find a small basement room where I could buy the "Utah State Government: A Citizen's Guide," from some lovely office ladies. 

I chose Vue as the foundation for this website. I initially planned on using React but since I had a better experience with Vue I transferred the beginnings of my app to that framework. I found that Vue provided me with exceptional reactivity and simplicity which is what I needed to handle all the data manipulation I needed to do before displaying the bills. I think it's the perfect framework for this type of website. 

I spent nearly 15 hours on the research portion of this website before I felt like I had enough knowledge and information to logically structure the legislative process in and website and display bills. Then the process of using scripts to programmatically merge two sources of data. One source was a government hosted public API of bills, committees and legislators, but it was incomplete and missing information about votes for each bill. The other source was the public, free version of the LegiScan API, which collects state legislature information for all states. This data source was also incomplete, as it did not have the descriptions or details of each bill but did have bill status codes. These and other difference made me decide to combine the outputted JSON files into one source so that it would be easier to work with in Vue. Due to servers and databases being out of scope for this class, I put all the data in the App's public folder. This is not a longterm solution and I plan on developing a server with a database that automatically integrates changes from the API's in the future. 


## Features 
1. Home page explaining the bill passing process:

    a. Ability to select your representatives and save them in the browser's localStorage. 

    b. Interactive learning cards that display a picture before clicking them to show more information. 

    c. Guided step-by-step learning section for the bill passing process that opens different informative cards as you progress. User's can also select 
    which chamber to start the process in and the rest of the section is conditional will react to match. 

2. Bills page

    a. Status buttons to filter the bills based on their point in the legislative process

    b. Ability to add multiple subjects that filters bills, delete them with a click, and clear all applied subjects. 

    c. Pagination of the list of bills

    d. Reactive display of how many bills there are for that status/filter, and how many pages it covers

    e. Pagination buttons with two buttons that increment forward and backward, two bottoms that take you to the first page and last page, and an input that a user can type in the desired page number. 

3. Bill Detailed Display

    a. Each bill is clickable and opens a page to display more information on the bill. 

    b. The bill display includes two collaspable cards with further details or information about any allocated budget. 

    c. Displays the bill number, which is converted from 'HB0001' to 'H.B.0001'

    d. Displays the bill sponser and floor sponsor, which concatenates the role data (Rep. or Sen.), name, and party intial. 

    e. Displays the committees the bill was seen in through a regex search of the history of the bill that showed it's location, along with any interim committee's if there are any. 

    f. Displays a link to the Salt Lake Tribune which partned with a company called Seer, using AI to generate summaries and information about bills, to provide summaries for all the bill's in the 2024 legislative session. 

    g. Displays a link to the official government website for the bill where a user can find the full bill text and other information. 

    h. Displays the status of the bill and the last action taken, including the date.


Nearly every one of these features used data that needed to be manipulated, either through the synthesing two API data sources or within the app itself. I really loved it because it's going to prepare me well for my final project which also includes displaying complicated information from a datasource. 

I took the home page photo at a rally after 'Roe v Wade' was overturned. The photos I took went viral on Imgur. It might be too polazing for a Utah Bills website, but I already bought the www.utahbills.com domain for $10 so once I get this connected to a server and database, fix bugs and add additional security methods I'll be able to release it to the public.




