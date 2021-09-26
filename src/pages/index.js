import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/layout'
import * as style from "../styles/blog.module.scss"

const Index = () => {
  return (
    <Layout>
      <div>
        <Image src="/images/index-hero.jpg" alt="hero" layout="fill" objectFit="cover" quality={90} />
        <div>
          <h1>I'm Machida Yusuke!</h1>
          <h3>JavaScript Developer</h3>
        </div>
      </div>
      <div>
        <div>
          <div>
            <h2>JavaScript Nerd</h2>
            <p>Lorem Ipsum is simply.......................................................................</p>
          </div>
          <Image src="/images/profile.jpg" alt="hero" height={1195} width={1000} quality={90} />
        </div>
        <div>
          <h2>Skills</h2>
          <div>
            <div><img src="/images/javascript.svg"/><span>JavaScript  /10years</span></div>
            <div><img src="/images/react.svg" alt="react" /><span>JavaScript  /5years</span></div>
            <div><img src="/images/gatsby.svg" alt="gatsby" /><span>Gatsby  /3years</span></div>
            <div><img src="/images/next.svg" alt="next" /><span>Next.JS  /3years</span></div>
          </div>
        </div>
        <div>
          <Link href="/contact">Make It Happen!</Link>
        </div>
      </div>
    </Layout>
  )
}

export default Index;
