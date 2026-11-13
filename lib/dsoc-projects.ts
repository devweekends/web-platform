import connectDB from '@/lib/db'
import '@/models/DSOCMentor'
import '@/models/DSOCMentee'
import { DSOCProject } from '@/models/DSOCProject'

/**
 * DSOC projects read on the server, so a project page arrives with its
 * content already in the HTML and search engines can read it. Both functions
 * give up quietly when the database cannot be reached: the page then loads the
 * project in the browser, as it always did.
 */

const OBJECT_ID = /^[a-f0-9]{24}$/i

/**
 * One active project as plain data. `null` means there is no such project;
 * `undefined` means the database could not be read, which is not the same
 * thing. Mentor email addresses are left out of the page.
 */
export async function getDsocProject(id: string): Promise<Record<string, unknown> | null | undefined> {
  if (!OBJECT_ID.test(id)) return null
  try {
    await connectDB()
    const project = await DSOCProject.findOne({ _id: id, isActive: true })
      .populate('mentors', 'name picture company jobTitle bio linkedin github')
      .populate('selectedMentees', 'name picture university')
      .lean()
    return project ? JSON.parse(JSON.stringify(project)) : null
  } catch (error) {
    console.error('Could not read the DSOC project on the server:', error)
    return undefined
  }
}

/** Ids of the active projects with the date each last changed, for the sitemap */
export async function listDsocProjects(): Promise<{ id: string; updatedAt?: Date }[]> {
  try {
    await connectDB()
    const projects = await DSOCProject.find({ isActive: true }).select('_id updatedAt').lean()
    return projects.map((project) => ({ id: String(project._id), updatedAt: project.updatedAt }))
  } catch (error) {
    console.error('Could not list DSOC projects for the sitemap:', error)
    return []
  }
}
