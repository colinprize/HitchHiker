import image from "../images/Footer-HitchHiker.png"

export default function Footer() {
    return (
        <>
            <footer className="fixed bottom-0 h-40 right-0 left-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${image})`, }}>
            </footer>
        </>
    )
}
