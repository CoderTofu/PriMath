import "../css/page-css/home.css"

export default function Home(props) {
    let mode = props.viewMode

    return (
        <div className="home-container">
            <div>
                <h1 className={`title ${mode}`}>PriMath</h1>
                <h3 className={`site-title ${mode}`}>For all the math lovers</h3>
            </div>
            <button className={`generate-btn ${mode}`}>generate a problem</button>
        </div>
    )
}