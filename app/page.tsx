import type { Metadata } from "next"

import { Communities, Products, Programs } from "@/components/home/sections-mid"
import { Partnerships, Qantara, Resources, Voices } from "@/components/home/sections-bottom"
import { StartHere } from "@/components/site/start-here"
import { Hero, Impact, Network, Outcomes, Reach } from "@/components/home/sections-top"
import "./home.css"

export const metadata: Metadata = {
  description:
    "Great engineers. Greater impact. Dev Weekends is a free community of engineers with programs, mentorship, open source and partnerships that open doors to the world.",
  alternates: { canonical: "/" },
}

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
      <Programs />
      <Products />
      <StartHere />
      <Qantara />
      <Partnerships />
      <Resources />
      <Communities />
    </div>
  )
}
