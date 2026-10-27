/**
 * The Dev Weekends story, told as "we". The founder appears once, briefly.
 * Every fact here comes from the founder's own written account and the 2026
 * fellowship report; do not add numbers that are not in those sources.
 */
const timeline = [
  { year: "2018", text: "Weekend sessions begin at university in Pakistan." },
  { year: "2025", text: "The Fellowship launches, with tracks, milestones and accountability." },
  { year: "2026", text: "1,072 fellows selected from 3,000+ applicants, and 9 Google Summer of Code selections." },
]

export function FounderStory() {
  return (
    <section id="story" className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
        <div className="flex flex-wrap gap-x-16 gap-y-8">
          <div className="min-w-0 flex-[1_1_320px] lg:max-w-[420px]">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5C5C5C]">Our story</p>
            <h2 className="mt-3.5 text-[clamp(32px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
              Started on a weekend. Still going because of people.
            </h2>
          </div>

          <div className="min-w-0 flex-[1.6_1_480px] space-y-6 text-[19px] leading-[1.7] text-[#262626]">
            <p>
              In 2018, Zeeshan Adil was finishing university. Good mentors had found him early, and four years of running sessions
              there, more than 200 of them through the IT Society and the Microsoft Student Partner program, had taught him how to
              teach. His question was simple: what happens to the people who were not that lucky? The working engineer with no time
              to figure it out alone. The student with real talent and no map.
            </p>
            <p>
              Dev Weekends began as sessions on weekends, because that is when working people could show up. The name stayed after the
              schedule stopped being only weekends. It began in Pakistan, and today members come from 30 countries and something
              happens almost every day.
            </p>
            <p>
              We kept seeing the same things. Universities teach syntax more than how real systems work. Talented people have no
              roadmap and no one to ask. Learning alone is lonely, so people drift or burn out. So we built a place to learn
              together, with people who have done it before and a reason to keep showing up. It is free and nonprofit, on purpose.
              The people who need this most are the ones who cannot pay.
            </p>
            <p>
              Not everything worked. Recorded lectures did not work. We once promised jobs in three months, and today we do not
              promise placement. Casual drop-in let people drift, so in early 2025 we launched the Fellowship, with tracks, milestones
              and accountability. In 2026, more than 3,000 people applied and we selected 1,072 fellows, from 222 universities in 30
              countries.
            </p>
            <p className="font-semibold text-[#0A0A0A]">
              More than 30,000 people are part of Dev Weekends, and 2026 brought nine Google Summer of Code selections. Today&apos;s
              mentors were mentees first.
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
