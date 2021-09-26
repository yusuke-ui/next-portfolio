import Image from 'next/image'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Layout from '../../components/layout'
import * as style from "../styles/common.module.scss"

const SingleBlog = (props) => {
  return (
    <Layout>
    <div>
      <Image src={props.frontmatter.image} alt="blog-image" height="500" width="1000" />
    </div>
    <div>
      <div>
        <h1>{props.frontmatter.title}</h1>
        <p>{props.frontmatter.date}</p>
        <ReactMarkdown children={props.markdownBody} />
      </div>
    </div>
    </Layout>
  )
}

export default SingleBlog;

export async function getStaticPaths() {
  const blogSlugs = ((context) => {
    const keys = context.keys()
    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
      return slug
    })
    return data 
  })(require.context('../../data', true, /\.md$/))

  const paths = blogSlugs.map((blogSlug) => `/blog/${blogSlug}`)
  /*const Allpaths = JSON.stringify(paths)*/

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { slug } = context.params
  const data = await import(`../../data/${slug}.md`)
  const singleDocument = matter(data.default)
  
  return {
    props: {
      frontmatter: singleDocument.data,
      markdownBody: singleDocument.content,
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