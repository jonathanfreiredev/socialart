import Link from "next/link"

export default function ButtonNavbar({link, name}){
    return <div>
        <Link href={link}>
            <a>
                <p>
                    {name}
                </p>
            </a>
        </Link>
    </div>
}