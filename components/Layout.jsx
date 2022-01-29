import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout({children, title, refTitle}){
    return <div>
        <Navbar title={title} refTitle={refTitle} />
        <main>
            {children}
        </main>
        <Footer />
    </div>
}