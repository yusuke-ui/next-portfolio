import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header>
      <div>
        <div>
          <Link href="/">
            <a>
              <Image src="/images/logo.sng" alt="logo" width={50} height={50} />
            </a>
          </Link>
          <ul>
            <li><Link href="/blog"><a>Blog</a></Link></li>
            <li><Link href="/contact"><a>Contact</a></Link></li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header;