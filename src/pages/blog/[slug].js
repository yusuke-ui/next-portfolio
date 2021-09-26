import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/layout'
import Seo from "../components/seo"
import * as style from "../styles/common.module.scss"
import { getAllBlogs, getSingleBlog } from "../../utils/mdQueries"
import PrevNext from '../../components/prevNext'

const SingleBlog = ({ frontmatter, markdownBody, prev, next }) => {
  const { title, date, excerpt, image } = frontmatter
  return (
    <Layout>
      <Seo title={title} description={excerpt} />
      <div className={style.hero}>
        <Image src={props.frontmatter.image} alt="blog-image" height="500" width="1000" />
      </div>
      <div className={style.wrapper}>
        <div className={style.container}>
          <h1>{title}</h1>
          <p>{date}</p>
        <ReactMarkdown children={props.markdownBody} />
        </div>
          <PrevNext prev={prev} next={next} />
      </div>
    </Layout>
  )
}

export default SingleBlog;

export async function getStaticPaths() {
  const { orderedBlogs } = await getAllBlogs()
  const paths = orderedBlogs.map((orderedBlog) => `/blog/${orderedBlog.slug}`)
  /*const Allpaths = JSON.stringify(paths)*/

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { singleDocument } = await getSingleBlog(context)
  const prev = orderedBlogs.filter(orderedBlog => orderedBlog.frontmatter.id === singleDocument.data.id - 1)
  const next = orderedBlogs.filter(orderedBlog => orderedBlog.frontmatter.id === singleDocument.data.id + 1)
  
  return {
    props: {
      frontmatter: singleDocument.data,
      markdownBody: singleDocument.content,
      prev,
      next,
    }
  }
}

/*import Link from 'next/link';

const MyCustom404Page = (props) => {
  return (
    <div>
      <h1>404</h1>
      <h2>
        <Link href="../blog/" as="../blog/{slug}">
          <a>Go To Home Page</a>
        </Link>
      </h2>
      <p>Sorry, the content you are looking for could not be found.</p>
    </div>
  );
};

export default MyCustom404Page;*/