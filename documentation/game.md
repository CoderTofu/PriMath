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
    } else if (timeTaken <= 10) {
        basePoints = 50
    } else if (timeTaken > 10) {
        basePoints = 30;
    }

For example they got an addition type question right in 2 seconds flat, the question being 10 + 100:
    Base Score (time): 150
    Type Multiplier (type): 1
    Difference Bonus (difference): +80%
    Offset Points: Additional 1 to 50 points
    Total Score: (((150 * 1) * 1.8) + (Offset Points))

## Game Stats
The stats throughout the game will be 

## Setting up the page
I used useEffect to check whether the parsedChallenges are valid. The parsedChallenges being the object saved to localStorage in
the Challenge Select page. After that, I will then generate 20 questions for the game with random values and operations based on 
parsedChallenges. The 20 questions will be represented as an object. Each  individual questions will have the following keys: type,
first_value, second_value, symbol, answer, type_multiplier, and range multiplier. I then set a three second countdown before 
the game starts.

## Game Stage
Once the three second countdown is over, the game will start. The questions will be shown one by one. Everytime the user finishes
answering a question, the function updateQuestion would trigger. Using the previous question object it will add new keys namely;
time taken to answer, and the user's answer. It would then trigger the updateScore function. This function will check if the given 
answer is correct based on the answer key that the question object have. If it's correct the appropriate points will be added to the 
user's score. 

Back to the updateQuestion function, it will check if their's still a next question. If there is the current question will be changed 
to the next one. If not, we take the time that the game started and take the current time to find out how long it took the user to finish
all the 20 questions. And then we end the game by showing the end screen.

## End Screen
The end screen will feature the score, time taken, percentage of correct answers, and the individual stats for all selected challenge type.
There it will show the overall score they got for that specific type, ie: 3 out of 5. And also the range that they had previously selected.