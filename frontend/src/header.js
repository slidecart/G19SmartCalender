import header from './header.css'
function Header(){
    return(
        <>
            <box id="header">
                <header>
                    <h1>
                        Smartcalendar
                    </h1>
                </header>
                <nav>
                    <ul>
                        <li><a href="">Dagens agenda</a></li>
                        <li><a href="">Kalender</a></li>
                        <li><a href="">Task & ToDo </a></li>
                        <li><a href="">Inställningar</a></li>
                    </ul>
                </nav>
            </box>
        </>
    )
}

export default Header