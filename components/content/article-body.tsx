import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Components } from "react-markdown"

/**
 * Markdown articles (guides and blog posts) in the site look: a 720px reading
 * column, generous line height and a small prose-like set of classes on the
 * wrapper. Used only by /guides/[slug] and /blog/[slug].
 */

const prose = [
  "mx-auto max-w-[720px] text-[18px] leading-[1.8] text-[#404040]",
  // headings
  "[&_h1]:mb-5 [&_h1]:mt-14 [&_h1]:text-[clamp(30px,4vw,40px)] [&_h1]:font-semibold [&_h1]:leading-[1.1] [&_h1]:tracking-[-0.04em] [&_h1]:text-[#0A0A0A]",
  "[&_h2]:mb-4 [&_h2]:mt-14 [&_h2]:text-[clamp(26px,3.4vw,34px)] [&_h2]:font-semibold [&_h2]:leading-[1.15] [&_h2]:tracking-[-0.035em] [&_h2]:text-[#0A0A0A]",
  "[&_h3]:mb-3 [&_h3]:mt-10 [&_h3]:text-[22px] [&_h3]:font-semibold [&_h3]:leading-[1.25] [&_h3]:tracking-[-0.02em] [&_h3]:text-[#0A0A0A]",
  "[&_h4]:mb-2 [&_h4]:mt-8 [&_h4]:text-[18px] [&_h4]:font-semibold [&_h4]:text-[#0A0A0A]",
  "[&>:first-child]:mt-0",
  // text
  "[&_p]:my-6 [&_strong]:font-semibold [&_strong]:text-[#0A0A0A] [&_em]:italic",
  // lists
  "[&_ul]:my-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
  "[&_li]:pl-1 [&_li::marker]:text-[#8A8A8A] [&_li>ul]:my-2 [&_li>ol]:my-2",
  // links
  "[&_a]:font-medium [&_a]:text-[#0A0A0A] [&_a]:underline [&_a]:decoration-[#B8B8B8] [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:decoration-[#0A0A0A]",
  "[&_a:focus-visible]:rounded-sm [&_a:focus-visible]:outline [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-[#0A0A0A]",
  // quotes and rules
  "[&_blockquote]:my-8 [&_blockquote]:rounded-r-[14px] [&_blockquote]:border-l-[3px] [&_blockquote]:border-[#0A0A0A] [&_blockquote]:bg-[#F7F7F7] [&_blockquote]:py-4 [&_blockquote]:pl-6 [&_blockquote]:pr-5 [&_blockquote]:text-[#404040]",
  "[&_blockquote_p]:my-3 [&_blockquote_p:first-child]:mt-0 [&_blockquote_p:last-child]:mb-0",
  "[&_hr]:my-14 [&_hr]:h-px [&_hr]:border-0 [&_hr]:bg-[#E6E6E6]",
  // code
  "[&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:bg-[#F2F2F2] [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[0.88em] [&_:not(pre)>code]:text-[#0A0A0A]",
  "[&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-[16px] [&_pre]:bg-[#0A0A0A] [&_pre]:p-5 [&_pre]:text-[15px] [&_pre]:leading-[1.7] [&_pre]:text-[#E6E6E6]",
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:font-mono",
  // images
  "[&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[20px]",
].join(" ")

const tableWrap = "my-10 overflow-x-auto rounded-[16px] border border-[#E6E6E6]"

type Props = {
  content: string
  /** Use next/image for raster images (blog). SVGs always use a plain img. */
  optimizeImages?: boolean
}

export function ArticleBody({ content, optimizeImages = false }: Props) {
  const components: Components = {
    p({ node, children }) {
      const hasImg = node?.children?.some((child) => "tagName" in child && child.tagName === "img")
      if (hasImg) return <div className="my-10">{children}</div>
      return <p>{children}</p>
    },
    img({ src = "", alt = "" }) {
      const url = typeof src === "string" ? src : ""
      if (optimizeImages && url && !url.endsWith(".svg")) {
        return (
          <Image
            src={url}
            alt={alt}
            width={1600}
            height={2000}
            sizes="(max-width: 768px) 100vw, 720px"
            className="block h-auto w-full rounded-[20px]"
          />
        )
      }
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt={alt} loading="lazy" className="block h-auto w-full rounded-[20px] border border-[#E6E6E6]" />
      )
    },
    a({ href, children }) {
      const external = Boolean(href?.startsWith("http"))
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      )
    },
    table({ children }) {
      return (
        <div className={tableWrap}>
          <table className="w-full border-collapse text-left text-[15px] leading-[1.6]">{children}</table>
        </div>
      )
    },
    thead({ children }) {
      return <thead className="bg-[#F7F7F7]">{children}</thead>
    },
    tbody({ children }) {
      return <tbody className="divide-y divide-[#E6E6E6]">{children}</tbody>
    },
    th({ children }) {
      return <th className="whitespace-nowrap px-4 py-3 align-top text-[13px] font-semibold uppercase tracking-[0.08em] text-[#5C5C5C]">{children}</th>
    },
    td({ children }) {
      return <td className="px-4 py-3 align-top text-[#404040]">{children}</td>
    },
  }

  return (
    <div className={prose}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
