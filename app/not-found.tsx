
export default function NotFound() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                textAlign: "center",
                padding: "0 20px",
            }}
        >
            <h1>404 - Page Not Found</h1>
            <p>The page you’re looking for doesn’t exist.</p>
            <a href="/" style={{ color: "#0070f3", textDecoration: "underline" }}>
                Return Homey
            </a>
        </div>
    );
}
