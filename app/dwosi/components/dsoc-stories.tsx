import connectImpactDB from "@/lib/impact-db"
import { getImpactStoryModel } from "@/models/ImpactStory"
import { DWOSI_LINKS } from "../data"
import { TextLink } from "./cta"

interface DsocStory {
  _id: string
  name: string
  role: string
  cohort?: string
  content: string
  imageUrl?: string
}

/** Approved, public DSOC stories from the impact-stories admin. Real quotes only. */
async function getDsocStories(): Promise<DsocStory[]> {
  if (!process.env.IMPACT_MONGODB_URI) return []

  try {
    const connection = await connectImpactDB()
    const ImpactStory = getImpactStoryModel(connection)
    const stories = await ImpactStory.find({
      program: "dsoc",
      isApproved: true,
      visibility: { $in: ["public", "featured"] },
    })
      .select("name role cohort content imageUrl featuredRank createdAt")
      .sort({ featuredRank: 1, createdAt: -1 })
      .limit(3)
      .lean()

    return JSON.parse(JSON.stringify(stories))
  } catch (error) {
    console.error("Unable to load DSOC stories:", error)
    return []
  }
}

function excerpt(text: string, max = 280) {
  const clean = text.replace(/\s+/g, " ").trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,.;:!?-]+$/, "")}…`
}

export async function DsocStories() {
  const stories = await getDsocStories()
  if (stories.length === 0) return null

  return (
    <div className="mt-16">
      <div className="grid gap-6 md:grid-cols-3">
        {stories.map((story) => (
          <figure key={story._id} className="flex flex-col rounded-2xl border bg-card p-6">
            <blockquote className="dw-body flex-1">“{excerpt(story.content)}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <img
                src={story.imageUrl || "/avatar.svg"}
                alt=""
                width={40}
                height={40}
                className="dw-img-outline h-10 w-10 shrink-0 rounded-full object-cover"
              />
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{story.name}</span>
                <span className="dw-label block truncate text-muted-foreground">
                  {[story.role, story.cohort].filter(Boolean).join(" · ")}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-6 text-center">
        <TextLink href={DWOSI_LINKS.stories}>Read more stories</TextLink>
      </div>
    </div>
  )
}
