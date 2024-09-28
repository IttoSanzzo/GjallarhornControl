<h1 align="center">GjallarhornControl</h1>
<p align="center"><img alt="Login Page" src="https://i.imgur.com/zKuuAFy.png"></p>

<p align="center">
<img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=plastic&logo=html5&logoColor=white">
<img alt=CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?style=plastic&logo=css3&logoColor=white">
<img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=plastic&logo=javascript&logoColor=%23F7DF1E">
<img alt="NodeJS" src="https://img.shields.io/badge/node.js-6DA55F?style=plastic&logo=node.js&logoColor=white">
<img alt="NPM" src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=plastic&logo=npm&logoColor=white">
<img alt="Notion" src="https://img.shields.io/badge/Notion-%23000000.svg?style=plastic&logo=notion&logoColor=white">
</p>

<p align="center">
<img alt="Status" src="https://img.shields.io/badge/status-active-success.svg">
<a href="./LICENSE"><img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
</p>

<p align="center">A site to serve as fronted for Music and SFC in my <a>ChariotSanzzo</a> Discord Bot.</p>

---

## About it

-   Created for be used in my personal RPG campaings, it's a simple, yet super useful way of controling the musics and SFXs playing in my discord calls, communicating with my discord bots [ChariotSanzzo](https://discord.com/oauth2/authorize?client_id=1070103829934260344&permissions=8&integration_type=0&scope=bot+applications.commands) and [Gjallarhorn](https://discord.com/oauth2/authorize?client_id=1273070668451418122&permissions=3149056&integration_type=0&scope=bot) ([Their Github Repo](https://github.com/IttoSanzzo/ChariotSanzzo)).
-   It was done using HTML, CSS, Javascript, node, npm and the Notion API.

## How to Use

-   keep in mind that you have to be in a Voice Channel in a server which contains ChariotSanzzo, and Gjallarhorn if needed, and they need to have the permissions for the said Voice Channel.
-   Acess it at [GjallarhornControl.com](http://189.13.111.87:11760).
-   Select if you want to control Gjallarhorn or ChariotSanzzo.
-   Give your user ID (not your user name).
-   Optionally, you can provide the ID of one Text Channel in the server, to receive the messages of usage from the bot selected.
-   Once logged, it will then connect to the bot, and load our Music and SFX database for the appropriate bot.

<p align="center"><img alt="Login Page" src="https://i.imgur.com/EZP8oUe.png"></p>

-   Hovering over a play button will show it's description.
-   Pressing it will make send the bot a priority play command, which will then start playing the said track immediately.

## Seach Bar

-   Writing in the search bar will filter all track buttons, showing only the ones that correspond to the query.
-   Clearing the bar returns all buttons.
-   Pressing enter or the <img width=15px alt="" src="./assets/CircularPlayPauseIcon.png"> right play button while there's a query in the search bar, causes it to send the given query to the bot as a play request, and clears the search bar.
-   Pressing the <img width=20px alt="" src="./assets/CircularRemoveIcon.png"> cancel button, also clears the search bar.

## Action Buttons

Some of the Buttons are available only for ChariotSanzzo.

<img width=20px alt="" src="./assets/CircularPlayPauseIcon.png"> : Switches between the "paused" and "playing" states.

<img width=20px alt="" src="./assets/CircularPreviousTrackIcon.png"> :
Plays the previous track in the queue, if there's one.

<img width=20px alt="" src="./assets/CircularNextTrackIcon.png"> : Plays the previous track in the queue, if there's one.

<img width=20px alt="" src="./assets/CircularLoopIcon.png"> : Switches the loop state of the queue between "None", "Same Track" and "Full Queue".

<img width=20px alt="" src="./assets/CircularShuffleIcon.png"> : Shuffles the queue, and then plays the new first track of it.

<img width=20px alt="" src="./assets/CircularResetIcon.png"> : Stops the track, and cleans it's queue.

<img width=20px alt="" src="./assets/CircularRemoveIcon.png"> : Stops the track, cleans it's queue, and makes the bot exit the Voice Channel.
