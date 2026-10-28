import { withSocial } from "@/lib/seo"

import { Communities, Products } from "@/components/home/sections-mid"
import { Partnerships, Qantara, Resources, Voices } from "@/components/home/sections-bottom"
import { StartHere } from "@/components/site/start-here"
import { Hero, Impact, Network, Outcomes, Reach } from "@/components/home/sections-top"
import "./home.css"

const title = "Dev Weekends | Great engineers. Greater impact."

export const metadata = withSocial({
  title: { absolute: title },
  description:
    "Great engineers. Greater impact. Dev Weekends is a free community of engineers with programs, mentorship, open source and partnerships that open doors to the world.",
  alternates: { canonical: "/" },
  openGraph: { title },
  twitter: { title },
})

/** The header and footer come from the root layout, shared with every other page. */
export default function HomePage() {
  return (
    <div data-home className="overflow-x-clip bg-white text-[#0A0A0A] antialiased">
      <Hero />
      <Reach />
      <Network />
      <Impact />
      <Outcomes />
      <Voices />
      <StartHere />
      <Products />
      <Qantara />
      <Partnerships />
      <Resources />
      <Communities />
    </div>
  )
}
