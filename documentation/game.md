# Documentation for game.jsx
This is the hardest part of the project. It took me two months to finish the mechanics.
The following will be an explanation of my very ugly spaghetti code.

## Plan
Set a timer for 3 seconds before the game actually starts.
Create 20 questions with a randomizer.
Set a timer for how long the player would take to answer.
The user should be able to press enter and click a button to submit their answer.
After they submit it, the next question would then be presented to them.

## Scoring
This is how the score should be calculated by their type:
    addition *1
    subtraction *1.2
    mulitplication *1.5
    division *1.7

This is how the score should be calculated by their range (max range - min range):
    difference of 1-5 + *0.5
    difference of 6-20 + *1
    difference of 21-50 + *1.5
    difference of 51-100 + *1.8
    difference of 101-500 + *2.2
    difference of 501-1000 + *2.5

This is how the score should be calculated by time (time it took to answer)
    if (timeTaken <= 1) {
        basePoints = 200;
    } else if (timeTaken <= 2) {
        basePoints = 150;
    } else if (timeTaken <= 5) {
        basePoints = 90;
    } else if (timeTaken <= 7) {
        basePoints = 70;
    } else if (timeTaken > 10) {
        basePoints = 50;
    }

For example they got an addition type question right in 2 seconds flat, the question being 10 + 100:
    Base Score (time): 150
    Type Multiplier (type): 1
    Difference Bonus (difference): +80%
    Offset Points: Additional 1 to 50 points
    Total Score: (((150 * 1) * 1.8) + (Offset Points))

## Setting up the page
I used useEffect to check whether the parsedChallenges are valid. The parsedChallenges being the object saved to localStorage in
the Challenge Select page. After that, I will then generate 20 questions for the game with random values and operations based on 
parsedChallenges. I then set a three second countdown before the game starts.