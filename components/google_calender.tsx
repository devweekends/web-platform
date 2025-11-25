"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const GoogleCalendar: React.FC = () => {
  const calendarSrc =
    "https://calendar.google.com/calendar/embed?src=devweekends%40gmail.com&ctz=Asia%2FKarachi"
  const addToCalendarLink =
    "https://calendar.google.com/calendar/u/0?cid=ZGV2d2Vla2VuZHNAZ21haWwuY29t"

  return (
    <Card className="w-full mt-5 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Stay Updated with Our Events</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={calendarSrc}
            style={{ border: 0 }}
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
        <Button className="mt-4" onClick={() => window.open(addToCalendarLink, "_blank")}>
          Add to Your Calendar
        </Button>
      </CardContent>
    </Card>
  )
}

export default GoogleCalendar

