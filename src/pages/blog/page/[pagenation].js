import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/layout'
import Seo from "../components/seo"
import * as style from "../styles/blog.module.scss"
import { getAllBlogs, blogsPerPage } from "../../../utils/mdQueries"

const Blog = (props) => {
  return (
    <Layout>
      <Seo title="ブログ" description="これはブログページです" />
      <div>
        <div>
          <h1>Blog</h1>
          <p>エンジニアの日常生活をお届けします</p>
          {props.blogs.map((blog, index) => {
            return (
              <div key={index}>
                <div>
                  <h3>{blog.frontmatter.title}</h3>
                  <p>{blog.frontmatter.excerpt}</p>
                  <p>{blog.frontmatter.date}</p>
                  <Link href={`../blog/${blog.slug}`}><a href={`../blog/${blog.slug}`}>Read More</a></Link> 
                </div>
                <div>
                <Image src={blog.frontmatter.image} alt="card-image" height={300} width={1000} quality={90} />
                </div>
              </div>
            )}
          )}
        </div>
      </div> 
    </Layout> 
  )
}

export default Blog;

export default function getStaticPaths() {
  const { numberPages } = await getAllBlogs()

  let paths = []
  Array.from({ length: numberPages }).slice(0, 1).forEach((_, i) => paths.push(`/blog/page/${i + 2}`))

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { orderedBlogs, numberPages } = await getAllBlogs() 
  const currentPage = context.params.pagination
  const limitedBlogs = orderedBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage)
    /*const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
    const value = values[index]
    const document = matter(value.default)
    return {
      frontmatter: document.data,
      slug: slug,
    }
    })
    return data*/
  
  //const { orderedBlogs } = await getAllBlogs()

  return {
    props: {
      blogs: limitedBlogs,
      numberPages: numberPages,
    }
  }
}