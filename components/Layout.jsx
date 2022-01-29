import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Layout({children, title, subtitle, refTitle, firstRef, firstName}){
    return <div>
        <Navbar title={title} subtitle={subtitle} refTitle={refTitle} firstRef={firstRef} firstName={firstName} />
        <main>
            {children}
        </main>
        <Footer />
    </div>
}