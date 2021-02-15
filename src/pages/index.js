import tinytime from 'tinytime'
import Link from 'next/link'
import Head from 'next/head'
import getAllPostPreviews from '@/getAllPostPreviews'
import { lumontec } from '@/authors'

const posts = getAllPostPreviews()

const postDateTemplate = tinytime('{MMMM} {DD}, {YYYY}')

export default function Home() {
  return (
    <div className="divide-y divide-gray-200">
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lumontec" />
        <meta name="twitter:creator" content="@lumontec" />
        <meta name="twitter:title" content="blog.lumontec" />
        <meta name="twitter:description" content="dips in my tech trips." />
        <meta name="twitter:image" content={`https://lumontec.com${lumontec.avatar}`} />
        <meta property="og:url" content="https://lumontec.com" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="blog.lumontec" />
        <meta property="og:description" content="dips in my tech trips." />
        <meta property="og:image" content={`https://blog.tailwindcss.com${lumontec.avatar}`} />
        <title>blog.lumontec</title>
        <meta name="description" content="dips in my tech trips." />

        {/* Global site tag (gtag.js) - Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LK0TLB3N0Z" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LK0TLB3N0Z');
        `,
          }}
        />
      </Head>

      <div className="md:grid md:grid-cols-10 gap-1 items-center pb-6 ">
        <div className="md:col-start-1 md:col-end-7">
          <h1 className="text-3xl leading-9 font-semibold text-gray-700 tracking-tight sm:text-3xl sm:leading-10 md:text-3xl md:leading-14">
            {/* <h1 className="text-3xl leading-9 font-semibold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"> */}
            blog.lumontec
          </h1>
          <p className="text-lg pt-1 leading-9 text-gray-500">dips in my tech trips ↵</p>
        </div>

        {/* <div className="items-end justify-end hidden xl:inline-flex xl:col-end-6 xl:col-span-1">

          <a className="w-6 transform hover:scale-105"
            href={"https://github.com/" + lumontec.github}>
            <img src={linkedinLogo} className="opacity-60 hover:opacity-80" />
          </a>

          <a className="w-9 transform hover:scale-105"
            href={"https://github.com/" + lumontec.github}>
            <img src={githubLogo} className="border-teal-600 opacity-50 hover:opacity-80" />
          </a>

          <a className="pb-0.5 pr-2.5 w-8 transform hover:scale-105"
            href={"https://github.com/" + lumontec.github}>
            <img src={mediumLogo} className="rounded-full border-2 border-gray-900 opacity-50 hover:opacity-70" />
          </a>

        </div>
 */}

        <div className="transform hover:scale-95 scale-90 hidden lg:inline-flex lg:col-end-11 lg:col-span-2 xl:col-end-11 xl:col-span-1">
          <a href={'https://github.com/' + lumontec.github}>
            <img src={lumontec.avatar} className="rounded-full border-2 border-gray-300" />
          </a>
        </div>
      </div>

      <ul className="divide-y divide-gray-200">
        {posts.map(({ link, module: { default: Component, meta } }) => {
          return (
            <li key={link} className="py-12">
              <article className="space-y-2 xl:grid xl:grid-cols-6 xl:space-y-0 xl:items-baseline">
                <dl>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500">
                    <time dateTime={meta.date}>{postDateTemplate.render(new Date(meta.date))}</time>
                  </dd>
                </dl>
                <div className="space-y-5 xl:col-span-4">
                  <div className="space-y-4">
                    <h2 className="text-2xl leading-8 font-normal tracking-medium">
                      <Link href={link}>
                        <a className="text-gray-700">{meta.title}</a>
                      </Link>
                    </h2>
                    <div className="text-md prose max-w-none font-normal text-gray-700">
                      <Component />
                    </div>
                  </div>
                  <div className="text-base leading-4 font-medium">
                    <Link href={link}>
                      <a
                        className="text-teal-500 hover:text-teal-600"
                        aria-label={`Read "${meta.title}"`}
                      >
                        Read more &rarr;
                      </a>
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
