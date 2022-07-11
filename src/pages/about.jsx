import React, {useEffect} from "react"

export default function About() {

    useEffect(() => {
        document.title = "PriMath | About us"
    }, [])

    return (
        <div>
            <article>
                <h1>About Primath</h1>
                <p>
                    Primath is a 20-question quiz web-game with the intention to be challenging yet easy to get into.
                    By being based like a quiz game, the game is intended for everyone who knows the four 
                    basic math operations. The tally of points are based on multiple factors; time taken to answer the question,
                    the absolute difference of the two values used, and the type of operation used for the question.
                </p>
            </article>
            <footer>
                <h1>Message from the Creator</h1>
                <p>
                    Hi everyone! Thanks for checking out my website. I started to create this around June 2022.
                    I learned a lot throughout the process of building this site. 
                    If you guys were to ever start encountering bugs, you can hit me up in my socials, 
                    and I'll do my best to fix them for as fast as I could.
                </p>
                <ul>
                    <li><a href="https://github.com/CoderTofu">Github</a></li>
                    <li><a href="https://twitter.com/junpulu">Twitter</a></li>
                </ul>
            </footer>
        </div>
    )
}