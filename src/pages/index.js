import tinytime from 'tinytime'
import Link from 'next/link'
import Head from 'next/head'
import getAllPostPreviews from '@/getAllPostPreviews'
import {lumontec} from '@/authors'
import {cathegories} from '@/cathegories'
import React, {useState} from 'react';

const posts = getAllPostPreviews()

const postDateTemplate = tinytime('{MMMM} {DD}, {YYYY}')

export default function Home() {
	const [selCathegory, setSelCathegory] = useState('/.*/s');
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

			<div>

				<div className="md:grid md:grid-cols-10 gap-1 items-center ">

					<div className="md:col-start-1 md:col-end-8">
						<h1 className="text-5xl leading-9 font-semibold text-gray-700 tracking-tight sm:text-5xl sm:leading-10 md:text-4xl md:leading-14">
							blog.lumontec
						</h1>
						<p className="text-xl leading-9 text-gray-400 pb-7">dips in my tech trips ↵</p>
					</div>

					<div className="transform hover:scale-95 scale-90 hidden xl:inline-flex md:col-end-11 md:col-span-2 xl:col-end-11 xl:col-span-1">
						<a href={'https://github.com/' + lumontec.github}>
							<img src={lumontec.avatar} className="rounded-full border-2 border-gray-300" />
						</a>
					</div>

				</div>

				<div className="flex flex-wrap flex-row justify-start gap-x-16 gap-y-2 pb-3">
					{cathegories.elements.map(cathegory => {

						return (
							selCathegory == cathegory ? (
								<p key={cathegory} className="text-lg text-gray-500 cursor-pointer" onClick={() => setSelCathegory(cathegory)}>
									{cathegory}
								</p>
							) : (
								<p key={cathegory} className="text-lg text-gray-300 hover:text-gray-500 cursor-pointer" onClick={() => setSelCathegory(cathegory)}>
									{cathegory}
								</p>
							)
						)

					})}


				</div>

			</div >

			<ul className="divide-y divide-gray-200">
				{posts.map(({link, module: {default: Component, meta}}) => {

					// filter unselected cathegories
					if (selCathegory != '/.*/s' && selCathegory != meta.cathegory)
						return

					return (
						<li key={link} className="py-12">
							<article className="space-y-2 xl:grid xl:grid-cols-6 xl:space-y-0 xl:items-baseline">
								<dl>
									<dt className="sr-only">Published on</dt>
									<dd className="text-base leading-6 font-medium text-gray-500">
										<time dateTime={meta.date}>{postDateTemplate.render(new Date(meta.date))}</time>
									</dd>
									<dd className="text-md leading-10 font-normal text-gray-400">
										<label >{meta.cathegory}</label>
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
		</div >
	)
}
