# BeautifulSoup

### Minimum Viable Product
- As a core application the user chooses how they are feeling (a mood) as soon as they enter the website, and based on the mood selection a song playlist is generated.
- User story: "I want to select how I am feeling and be provided a playlist of music that matches my current mood."

### Features
1. We at BeautifulSoup understand that people's personalities influence the music they like. We want to be able to distinguish between personalities and let people select a mood that suggests music tailored to their personality.

2. The user can share their mood with a friend, and the friend can suggest a song to appropriately support or modify the given mood.
For example: User 1 selects (😢) and shares the song and the mood (😢) with a friend (User 2). User 2 suggests a song with mood (😄) to User 1. User 1 listens to the recommended song and updates mood from (😢) to (🤔) and eventually (😆).

3. Allow the user to import playlists from different platforms, then use his/her suggestions to sort the songs into different mood categories.

4. User can elect to include, in addition to their current mood, how they would like to feel. The resulting playlist would contain music likely to facilitate that transition.

5. Provide a feedback mechanism to the user to communicate whether a song or playlist is having the desired effect.

### NOTE: This is just the front end application for the project. To get user authenticatied you have to go to our backend repository and follow instructions to get the backend server running.

HERE IS THE LINK TO BACKEND REPO:

https://github.com/kishanankara/beautifulSoup-backend

### Prototype (2/23/18)
- Watch our prototype video: https://youtu.be/IEqeHqXzRTM
- To run our current code for the first time, use the following steps:

1. Create a local clone of this repository

```
git clone https://github.com/kishanankara/beautifulSoup.git

```

2. Using your command line interface, navigate to your local repository and the directory 'upliftme' and switch branches using the command 

```
git checkout develop
```

3. Run the command to install dependencies

```
npm install
```

4. Run the command to start front end
```
npm start
```

5. Open your web browser (preferably Chrome) and enter 'localhost:3000' into the address bar. You should now be viewing the welcome page of our web application!

- For subsequent runs of this code, simply repeat steps 2, 4, and 5.



[![Join the chat at https://gitter.im/beautiful_Soup/Lobby](https://badges.gitter.im/beautiful_Soup/Lobby.svg)](https://gitter.im/beautiful_Soup/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
