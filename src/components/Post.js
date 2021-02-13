import Head from 'next/head'
import PageTitle from '@/components/PageTitle'
import tinytime from 'tinytime'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

export const mdxComponents = {
  pre: ({ className, ...props }) => (
    <pre className={`${className} rounded-md bg-gray-800 py-3 px-4 overflow-x-auto`} {...props} />
  ),
  'pre.code': ({ className, ...props }) => (
    <code className={`${className} text-gray-200`} {...props} />
  ),
}

const postDateTemplate = tinytime('{dddd}, {MMMM} {DD}, {YYYY}')

export default function Post({ meta, children, posts }) {
  const router = useRouter()
  const postIndex = posts.findIndex(post => post.link === router.pathname)
  var previous = posts[postIndex + 1]
  const next = posts[postIndex - 1]

  return (
    <article className="xl:divide-y xl:divide-gray-200">
      <Head>
        <title>{meta.title} – Tailwind CSS</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lumontec" />
        <meta name="twitter:creator" content="@lumontec" />
        <meta name="twitter:title" content={`${meta.title} – blog.lumontec`} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={`https://blog.lumontec.com${meta.image}`} />
        <meta property="og:url" content={`https://blog.lumontec.com${router.pathname}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${meta.title} – blog.lumontec`} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={`https://blog.lumontec.com${meta.image}`} />
        <meta name="description" content={meta.description}></meta>
      </Head>
      <header className="pt-4 xl:pb-10   xl:grid xl:grid-cols-6 xl:col-gap-6  ">
        <div className="space-y-1 text-start  xl:col-start-2  xl:col-span-4">
          <dl className="space-y-10">
            <div>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base leading-10 font-medium text-gray-500">
                <time dateTime={meta.date}>{postDateTemplate.render(new Date(meta.date))}</time>
              </dd>
            </div>
          </dl>
          <div>
            <PageTitle>{meta.title}</PageTitle>
          </div>
        </div>
      </header>
      <div
        className="divide-y xl:divide-y-0 divide-gray-200 xl:grid xl:grid-cols-8 xl:col-gap-6 pb-16 xl:pb-20"
        style={{ gridTemplateRows: 'auto 1fr' }}
      >
        <dl className="pt-6 pb-8 xl:pt-11 xl:border-b xl:border-gray-200 xl:col-start-1 xl:col-span-2">
          <dt className="sr-only">Authors</dt>
          <dd>
            <ul className="flex justify-start xl:block space-x-8 sm:space-x-12 xl:space-x-0 xl:space-y-8">
              {meta.authors.map(author => (
                <li key={author.github} className="flex items-center space-x-2">
                  <a href={'https://github.com/' + author.github}>
                    <img
                      src={author.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full border-2 border-teal-200"
                    />
                  </a>
                  <dl className="text-sm font-medium leading-5 whitespace-no-wrap">
                    <dt className="sr-only">Name</dt>
                    <dd className="text-gray-900">{author.name}</dd>
                    <dt className="sr-only">Twitter</dt>
                    <dd>
                      <a
                        href={`https://github.com/${author.github}`}
                        className="text-teal-500 hover:text-teal-600"
                      >
                        {author.github}
                      </a>
                    </dd>
                  </dl>
                </li>
              ))}
            </ul>
          </dd>
        </dl>
        <div className="divide-y-gray-200 xl:pb-0 xl:col-end-7 xl:col-span-4 xl:row-span-2">
          <div className="text-md prose max-w-none font-normal  text-gray-700 pt-10 pb-8">
            {/* <MDXProvider components={mdxComponents}>{children}</MDXProvider> */}
            <MDXProvider>{children}</MDXProvider>
          </div>
          {meta.discussion && (
            <div className="pt-6 pb-16">
              <p>
                Want to talk about this post?{' '}
                <a href={meta.discussion} className="font-medium text-teal-500 hover:text-teal-600">
                  Discuss this on Medium &rarr;
                </a>
              </p>
            </div>
          )}
        </div>
        <footer className="text-sm font-medium leading-5 divide-y divide-gray-200 xl:col-start-1 xl:col-span-2 xl:row-start-2">
          {(next || previous) && (
            <div className="space-y-4 py-4">
              {next && (
                <div>
                  <div>{(previous = false)}</div>
                  <h2 className="text-xs tracking-wide uppercase text-gray-500">Next Article</h2>
                  <div className="text-normal text-teal-500 hover:text-teal-600">
                    <Link href={next.link}>
                      <a>{next.title}</a>
                    </Link>
                  </div>
                </div>
              )}
              {previous && (
                <div>
                  <h2 className="text-xs tracking-wide uppercase text-gray-500">
                    Previous Article
                  </h2>
                  <div className="text-normal text-teal-500 hover:text-teal-600">
                    <Link href={previous.link}>
                      <a>{previous.title}</a>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="pt-4">
            <Link href="/">
              <a className="text-teal-500 hover:text-teal-600">&larr; Back to the blog</a>
            </Link>
          </div>
        </footer>
      </div>
    </article>
  )
}
