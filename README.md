# BeautifulSoup

### Minimum Viable Product
- As a core application the user chooses how they are feeling (a mood) as soon as they enter the website, and based on the mood selection a song playlist is generated.
- User story: "I want to select how I am feeling and be provided a playlist of music that matches my current mood."

### Add-On Features
1. We at BeautifulSoup understand that people's personalities influence the music they like. We want users to be able to identify whether they like or dislike the songs they are provided. 'Disliked' songs will be less likely to appear again and 'liked' songs will be most likely to appear again.

2. The user can share their mood with a friend, and the friend can suggest a song to appropriately support or modify the given mood.
For example: User 1 selects (😢) and shares the song and the mood (😢) with a friend (User 2). User 2 suggests a song with mood (😄) to User 1. User 1 listens to the recommended song and updates mood from (😢) to (🤔) and eventually (😆).

3. Allow the user to import playlists from different platforms, then use his/her suggestions to sort the songs into different mood categories.

4. User can elect to include, in addition to their current mood, how they would like to feel. The resulting playlist would contain music likely to facilitate that transition.

5. Provide a feedback mechanism to the user to communicate whether a song or playlist is having the desired effect.


### NOTE: Make sure you have NODE installed in your system.

### NOTE: This is just the front end application for the project. To get user authenticatied you have to go to our backend repository and follow instructions to get the backend server running.

### BETA RELEASE LANDING PAGE: [Landing Page](https://www.acsu.buffalo.edu/~ayoolaob/landingpage.html)

### CHECK OUT OUR APP: [Upliftme](https://upliftme.herokuapp.com)

### Here is the YouTube Link to the Beta Release: [Beta Release](https://youtu.be/-8ixqKCNDDU)

### Frequently asked question: "Why am I listening to only 30 seconds of a song?"
 
Spotify provides full length songs to premium users. Developers have access to thirty second previews.

HERE IS THE LINK TO BACKEND REPO:

https://github.com/kishanankara/beautifulSoup-backend

1. Make a local directory and change directory

```
mkdir beautifulSoup_test
cd beautifulSoup_test
```

2. Initialize and clone repository


```
git init
git clone https://github.com/kishanankara/beautifulSoup.git
```

3. Change directory to beautifulSoup and checkout develop branch and finally change directory to the application.

```
cd beautifulSoup
git checkout develop
cd upliftme
```

4. Remove package-lock.json in the current directory
```
rm package-lock.json
```

5. Now install dependencies and start the app.
```
npm install
npm start
```

6. Go to the backend repo and follow instructions for getting the backend app running. [Here is the link](https://github.com/kishanankara/beautifulSoup-backend)

7. Once the backend application is up and running you should be able to click a mood and see playlists render. Enjoy!

- For subsequent runs of this code, simply repeat steps 2, 4, and 5.



[![Join the chat at https://gitter.im/beautiful_Soup/Lobby](https://badges.gitter.im/beautiful_Soup/Lobby.svg)](https://gitter.im/beautiful_Soup/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
