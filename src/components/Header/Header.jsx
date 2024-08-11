import './Header.css';

function Header() {
  return (
    <div id="Header">
        <div class='Website-Name'>
            <h2>PDF-Reader</h2>
        </div>
        <div class='navigation'>
            <nav>
                <a href="/css/">Home</a>
                <a href="/html/">Sign In</a>
                <a href="/js/">Upload Files</a>
                <a href="/python/">Chat</a>
            </nav>
        </div>
    </div>
  )
}

export default Header