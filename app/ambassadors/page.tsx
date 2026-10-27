import type { Metadata } from "next"
import AmbassadorsClient from "./ambassadorsClient"

export const metadata: Metadata = {
  alternates: { canonical: "/ambassadors" },
  title: "Ambassadors",
  description:
    "Meet the people who represent and grow the Dev Weekends community around the world.",
}

export default function AmbassadorsPage() {
  return <AmbassadorsClient />
}
