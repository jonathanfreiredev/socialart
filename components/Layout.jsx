import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout({children, title, subtitle, refTitle}){
    return <div>
        <Navbar title={title} subtitle={subtitle} refTitle={refTitle} />
        <main>
            {children}
        </main>
        <Footer />
    </div>
}