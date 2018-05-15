# My project - Music Player with YouTube clip

### **Getting Started**

Download all relevant modules when you first start the project run `$npm install`.

To start the server run `$npm start` (listen on port 3000).

All actions of the client is performed on port 8080 and run `$gulp default` operation to run the tasks in the gulp file.

The project is based on a Single Page Application and design of the project is responsive (suitable for various sizes of screen).

For the tests I chose to use Mocha and Chai, run `$npm test` to run tests.

Has an attachment detailing the routes used for Server and the SQL file where all the data found in DB.

**Backend** is written in **NodeJS** and **Sequelize** as an ORM.

**Fronted** is written in **JavaScript (es6)**, **jQuery** and all the design of the project is using **SASS** and **Bootstrap**.
_______________

### **Details of the structure of the project**
#### **All Albums (Main Page) -**
This page contains all albums saved in DB. From this page you can delete, edit and play the album (listed below the explanation).
_______________

#### **Add New Album -**
This page contains a form that lets you create a new album and saved in the database, when the page is divided into two parts:

* **Part One-** General data for filling the album containing the name of the album, name of the artist who created the album, cover image of the album, the year in which the album is released, the genre to which it belongs and the description of the album.

* **Part Two-** Adding songs to the album with a feed of YouTube's unique identifier, when the length of the clip of the song is automatically updated according to the unique identifier of YouTube and complete the song entered manually.
The minimum number of songs that could be on the album is 5 and, if necessary, you can add or delete additional rows of fields to add songs.

In completing and maintaining the success of the album in the database (after perform validation checks), you will be notified that allows the user to go back to the default displays all albums saved in DB.
_______________

#### **Single Album -**
The part of the player can control playback of songs found on the album including operating execution, stop, lag switching between songs (to next song or to the previous song), the promotion of a particular point song or rewind to a point of the song and the strength of volume song on the player.

It is also possible to play a specific song by clicking it in the playlist and you can activate or pausing a song playback directly from the playlist itself or YouTube video shown of the song.

By clicking on the left menu 'Description', displays the description of the album with the album cover image and clicking the 'Playlist', found the full playlist will be displayed (on this option is set by default).

Also from this page, you can delete an album (if it is deleted from this page when user deletion finishes moves to the default displays all albums saved in DB) and edit the data of the album.
_______________

#### **Search Album -**
Album search window it is possible to perform a search of albums saved in DB.

When you enter data in the search window is displayed to the user suggestions for relevant search results, when you click specific offer delivered to the specific album page and when you press enter or click the search button is moved to the page that displays the search results from which to delete, edit and play the album which was carried out search operation.
_______________

#### **Edit Album -**
This page allows you to edit the data of saved in DB.

When the user wants to edit a specific album is going to edit the page containing the form of edit album it will display all of the data saved in DB and relevant to that album.

At the end of editing and saving in the album's success with the updated data (after validation checks), you will be notified that passes the user to a page that displays the details of the specific album to be updated.