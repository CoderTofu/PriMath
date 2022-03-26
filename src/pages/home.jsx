import "../css/page-css/home.css"

export default function Home() {
    return (
        <div className="home-container">
            <div>
                <h1 className="title">PriMath</h1>
                <h3 className="site-title">For all the math lovers</h3>
            </div>
            <button className="generate-btn">generate a problem</button>
        </div>
    )
}