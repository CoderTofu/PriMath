# Documentation
I do not know how to actually write a documentation.
All I know is that it is very IMPORTANT to document your work as so people can
understand what my line of thoughts were as I wrote the code.
Not to mention this would be of great help during maintenance.

## Note
This main.md serves only to tell you what my line of thoughts were before, during, and after creating important files in my site. If you want to know more about what I actually did in the specific file. You can go look for it in my documentation folder.

## Let's get started
I tried to divide my files as cleanly as possible so I created 3 folders in my src folder.
/src/components for components that will persist in all of my pages.
/src/css for the css throughout the entire website.
/src/pages for the pages of my website.

### Components

#### menu.jsx
I wasted a lot of time writing "cool" menus only to find out it sucked.
So in the end I just did the simplest one I could think of and by that I mean searching for the internet for the easiest one I could put in my site. By the first round of feedback they told me to put the dark mode settings in the menu so after 30 minutes of fixing it I left it in the menu
as a setting.

### Pages

#### home.jsx
I needed a landing page for my site so I went with a pretty generic one. Thought it looked nice being so minimalistic.

#### challenges.jsx
I had to first have a selection page before actually starting the game. I figured four buttons to select four types of challenges were enough. But eventually, I decided to add a way to edit the value range for more versatility. 

The hard part was actually changing and making sure that the values were valid. More on this later with this file's own documentation page.

### about.jsx
At this point I wanted the about page to be as simple as possible. I wanted the contents to be read and understood easily so
I used some nice fonts I found then configured the page to work with the two display modes I have

### not_found.jsx
A generic 404 page nothing to really talk about. Also added a redirect to home for convenience.
