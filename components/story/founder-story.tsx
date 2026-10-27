/**
 * The Dev Weekends story, told as "we". No individual is named here; people appear on the team cards.
 * Every fact here comes from the founder's own written account and the 2026
 * fellowship report; do not add numbers that are not in those sources.
 */
const timeline = [
  { year: "2018", text: "Weekend sessions begin at university in Pakistan." },
  { year: "2025", text: "The Fellowship launches: 300+ fellows trained in Q1, then 800 more." },
  { year: "2026", text: "One Fellowship a year from here: 1,072 trained from 3,000+ applicants, and 9 Google Summer of Code selections." },
]

export function FounderStory() {
  return (
    <section id="story" className="bg-[#F7F7F7]">
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <div className="flex flex-wrap gap-x-16 gap-y-8">
          <div className="min-w-0 flex-[1_1_320px] lg:max-w-[420px]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">Our story</p>
            <h2 className="mt-3.5 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
              Started on weekends. Kept going because of people.
            </h2>
          </div>

          <div className="min-w-0 flex-[1.6_1_480px] space-y-6 text-[19px] leading-[1.7] text-[#262626]">
            <p>
              We started in 2018, on weekends, because that is when working people could show up. We kept seeing the same gaps.
              Universities teach syntax, not systems. Talented people have no roadmap. Learning alone burns people out. We made it
              free and nonprofit on purpose, because the people who need it most cannot pay. We began in Pakistan, and today our
              members come from 30 countries.
            </p>
            <p>
              Some things did not work. Recorded lectures did not. Promising a job in three months did not, so we do not promise
              placement. Learning together did work, so in early 2025 we launched the Fellowship, with tracks, milestones and
              accountability. In 2025, 300+ fellows trained in the first quarter and 800 more after that. Since then we run one
              Fellowship a year. In 2026, more than 3,000 people applied and 1,072 were trained.
            </p>
            <p className="font-semibold text-[#0A0A0A]">
              More than 30,000 people are part of Dev Weekends today, 2,100+ of them trained through the Fellowship, and 2026
              brought nine Google Summer of Code selections.
            </p>
          </div>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-0 border-t border-[#0A0A0A] md:grid-cols-3">
          {timeline.map((item) => (
            <li key={item.year} className="border-b border-[#E6E6E6] py-6 md:border-b-0 md:pr-8">
              <p className="text-[40px] font-semibold leading-none tracking-[-0.04em]">{item.year}</p>
              <p className="mt-3 text-[15px] leading-[1.6] text-[#5C5C5C]">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
