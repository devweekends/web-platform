import React from 'react'
import MentorsPage from "../../components/MentorsPage"
const page = () => {
  return (
    <div>
      <div className="flex flex-col space-y-4 mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Our Expert Mentors</h1>
        <p className="text-muted-foreground text-lg max-w-[800px] mx-auto">
          Learn from industry professionals passionate about sharing their knowledge and helping you grow.
        </p>
      </div>
     <MentorsPage></MentorsPage>
     </div>
  )
}

export default page