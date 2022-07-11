import React, { useEffect } from "react"
import "../css/page-css/about.css"

export default function About(props) {
    let mode = props.viewMode;
    
    useEffect(() => {
        document.title = "PriMath | About us"
    }, [])

    return (
        <div className={`about-container ${mode}`}>
            <main className={`about-art ${mode}`}>
                <h1 className="about-headers">About Primath</h1>
                <p className="about-content">
                    Primath is a 20-question quiz web-game with the intention to be challenging yet easy to get into.
                    By being based like a quiz game, the game is intended for everyone who knows the four 
                    basic math operations. The tally of points are based on multiple factors: time taken to answer the question,
                    the absolute difference of the two values used, and the type of operation used for the question.
                </p>
            </main>

            <footer className={`msg-footer ${mode}`}>
                <h1 id="msg-header" className="about-headers">Message from the Creator</h1>
                <p className="about-msg">
                    Hey everyone! Thanks for checking out my website. I started to create this around June 2022.
                    I learned a lot throughout the process of building this site. 
                    If you guys were to ever start encountering bugs, you can hit me up on my socials, 
                    and I'll do my best to fix them for as fast as I could.
                </p>
                <ul>
                    <a className="about-link" target={"_blank"} href="https://github.com/CoderTofu"><li>Github</li></a>
                    <a className="about-link" target={"_blank"} href="https://twitter.com/junpulu"><li>Twitter</li></a>
                </ul>
            </footer>
        </div>
    )
}