import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import { ExternalLinkIcon } from 'lucide-react'
import { CodeBlock } from './CodeBlock'
import type { Components } from 'react-markdown'

type DocsContentProps = {
  content: string
}

const components: Components = {
  h1: ({ children }) => <h1 className="text-3xl font-bold tracking-tight mb-6">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b border-gray-200">{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-semibold mt-8 mb-3">{children}</h3>,
  h4: ({ children }) => <h4 className="text-lg font-semibold mt-6 mb-2">{children}</h4>,
  p: ({ children }) => <p className="text-gray-600 leading-7 mb-4">{children}</p>,
  a: ({ href, children }) => {
    if (!href) return <span>{children}</span>

    // Internal docs links
    if (href.startsWith('/docs')) {
      return (
        <Link href={href} className="text-blue-600 hover:underline font-medium">
          {children}
        </Link>
      )
    }

    // External links
    if (href.startsWith('http')) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          {children}
          <ExternalLinkIcon className="w-3 h-3" />
        </a>
      )
    }

    // Relative or anchor links
    return (
      <Link href={href} className="text-blue-600 hover:underline font-medium">
        {children}
      </Link>
    )
  },
  ul: ({ children }) => <ul className="list-disc list-outside ml-6 mb-4 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-outside ml-6 mb-4 space-y-1">{children}</ol>,
  li: ({ children }) => <li className="text-gray-600 leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-500 my-4">{children}</blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-gray-50">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">{children}</th>
  ),
  td: ({ children }) => <td className="border border-gray-200 px-3 py-2 text-gray-600">{children}</td>,
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '')
    const isBlock = match || (typeof children === 'string' && children.includes('\n'))

    if (isBlock) {
      return <CodeBlock language={match?.[1] ?? ''} code={String(children).replace(/\n$/, '')} />
    }

    return (
      <code
        className="bg-gray-100 text-gray-800 font-mono text-sm px-1.5 py-0.5 rounded border border-gray-200"
        {...props}
      >
        {children}
      </code>
    )
  },
  pre: ({ children }) => <>{children}</>,
  img: ({ src, alt }) => (
    <img src={src} alt={alt ?? ''} className="rounded-lg border border-gray-200 my-4 max-w-full" />
  ),
  hr: () => <hr className="my-8 border-gray-200" />,
  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
}

export function DocsContent({ content }: DocsContentProps) {
  return (
    <div className="prose-doorman">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
