'use client';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <div className="relative isolate bg-gray-900 max-h-screen overflow-hidden h-screen">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:py-48 lg:px-8">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2">
              <svg
                className="absolute inset-0 h-full w-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                    width={200}
                    height={200}
                    x="100%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <svg
                  x="100%"
                  y={-1}
                  className="overflow-visible fill-gray-800/20"
                >
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"
                />
              </svg>
              <svg
                className="absolute top-[calc(100%-13rem)] -left-56 w-[72.1875rem] transform-gpu blur-3xl lg:top-[calc(50%-7rem)] lg:left-[max(-14rem,calc(100%-59rem))]"
                viewBox="0 0 1155 678"
                aria-hidden="true"
              >
                <path
                  fill="url(#0a9a5302-e517-46c6-85f0-d826aa6a313e)"
                  fillOpacity=".2"
                  d="M317.219 159.025 203.852 0 0 239.659l317.219-80.634 204.172 286.402c1.307-132.337 45.083-346.658 209.733-145.248C936.936 551.942 882.053 772.234 1031.02 636.67c119.18-108.452 130.68-295.338 121.53-375.224L855 379l21.173-362.054-558.954 142.079Z"
                />
                <defs>
                  <linearGradient
                    id="0a9a5302-e517-46c6-85f0-d826aa6a313e"
                    x1="1155.49"
                    x2="-78.208"
                    y1="677.823"
                    y2="203.355"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4F46E5" />
                    <stop offset={1} stopColor="#80CAFF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Write me
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              I am Al Mamun and I am delighted I am here to presnet one of my
              works to you. This is built on promising web technologies like
              NextJs,ExpressJs,Prisma, Mongodb and many more. I appreciate your
              valuable suggestions and feedback. You are always welcome to write
              me a message.
            </p>
            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-300">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <EnvelopeIcon
                    className="h-7 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </dt>
                <dd>
                  <a
                    className="hover:text-white"
                    href="mailto:almamunkhan09@gmail.com"
                  >
                    almamunkhan09@gmail.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
