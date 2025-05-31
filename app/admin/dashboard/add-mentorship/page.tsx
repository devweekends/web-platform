"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Trash2, Edit, Plus, Search, X, ArrowLeft } from "lucide-react"
import { Suspense } from "react"

type PersonType = "mentor" | "mentee"
type Mode = "create" | "edit" | "list"

interface Person {
  _id: string
  name: string
  email: string
  phone?: string
  linkedin?: string
  github?: string
  leetcode?: string
  university?: string
  picture?: string
  mentor?: string | { _id: string; name: string; university?: string; picture?: string }
  mentees?: Array<string | { _id: string; name: string; university?: string; picture?: string }>
  isMentor?: boolean
}

interface FormData {
  name: string
  email: string
  phone?: string
  linkedin?: string
  github?: string
  leetcode?: string
  university?: string
  picture?: string
  mentor?: string
  isMentor?: boolean
}

function MentorshipManagementContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const editId = searchParams.get("edit")
  const editType = searchParams.get("type")

  const [mode, setMode] = useState<Mode>(editId ? "edit" : "list")
  const [personType, setPersonType] = useState<PersonType>((editType as PersonType) || "mentor")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mentors, setMentors] = useState<Person[]>([])
  const [mentees, setMentees] = useState<Person[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [editPerson, setEditPerson] = useState<Person | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (editId && editType) {
      fetchPersonForEdit(editId, editType as PersonType)
    }
  }, [editId, editType])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [mentorsRes, menteesRes] = await Promise.all([fetch("/api/admin/mentors"), fetch("/api/admin/mentees")])

      if (!mentorsRes.ok || !menteesRes.ok) {
        throw new Error("Failed to fetch data")
      }

      const [mentorsData, menteesData] = await Promise.all([mentorsRes.json(), menteesRes.json()])

      console.log("Fetched Mentors:", mentorsData)
      console.log("Fetched Mentees:", menteesData)

      setMentors(mentorsData)
      setMentees(menteesData)
    } catch (err) {
      setError("Failed to load data")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchPersonForEdit = async (id: string, type: PersonType) => {
    setLoading(true)
    setPersonType(type)
    setMode("edit")
    try {
      const endpoint = type === "mentor" ? `/api/admin/mentors?id=${id}` : `/api/admin/mentees?id=${id}`
      const response = await fetch(endpoint)

      if (!response.ok) {
        throw new Error("Failed to fetch person data")
      }

      const data = await response.json()
      console.log("Edit Person Data:", data)
      setEditPerson(data)
    } catch (err) {
      setError("Failed to load person data for editing")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      const data: FormData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: (formData.get("phone") as string) || undefined,
        linkedin: (formData.get("linkedin") as string) || undefined,
        github: (formData.get("github") as string) || undefined,
        leetcode: (formData.get("leetcode") as string) || undefined,
        university: (formData.get("university") as string) || undefined,
      }

      if (personType === "mentee") {
        data.mentor = formData.get("mentor") as string
        data.isMentor = formData.get("isMentor") === "true"
      }

      // Handle file upload if a file is selected
      if (selectedFile) {
        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onloadend = async () => {
          const base64data = reader.result as string
          data.picture = base64data
          await submitData(data)
        }
      } else {
        // Keep existing picture if in edit mode and no new file selected
        if (mode === "edit" && editPerson?.picture) {
          data.picture = editPerson.picture
        }
        await submitData(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save data")
      setLoading(false)
    }
  }

  const submitData = async (data: FormData) => {
    try {
      const isEdit = mode === "edit" && editPerson?._id
      const endpoint =
        personType === "mentor"
          ? `/api/admin/mentors${isEdit ? `?id=${editPerson?._id}` : ""}`
          : `/api/admin/mentees${isEdit ? `?id=${editPerson?._id}` : ""}`

      const method = isEdit ? "PUT" : "POST"

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to save data")
      }

      await fetchData()
      setMode("list")
      setEditPerson(null)
      
      // Notify other tabs about the data change
      try {
        const actionType = isEdit ? 'update' : 'create'
        localStorage.setItem('mentorship-data-updated', JSON.stringify({
          type: personType,
          action: actionType,
          timestamp: Date.now()
        }));
        localStorage.removeItem('mentorship-data-updated'); // Trigger storage event
        
        window.dispatchEvent(new CustomEvent('mentorship-data-updated', {
          detail: { type: personType, action: actionType }
        }));
      } catch (error) {
        console.warn('Cross-tab communication not available:', error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save data")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, type: PersonType) => {
    if (!confirm("Are you sure you want to delete this person? This cannot be undone.")) {
      return
    }

    setLoading(true)
    try {
      const endpoint = type === "mentor" ? `/api/admin/mentors?id=${id}` : `/api/admin/mentees?id=${id}`
      const response = await fetch(endpoint, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete")
      }

      await fetchData()
      
      // Notify other tabs about the deletion
      try {
        localStorage.setItem('mentorship-data-updated', JSON.stringify({
          type: type,
          action: 'delete',
          timestamp: Date.now()
        }));
        localStorage.removeItem('mentorship-data-updated'); // Trigger storage event
        
        window.dispatchEvent(new CustomEvent('mentorship-data-updated', {
          detail: { type: type, action: 'delete' }
        }));
      } catch (error) {
        console.warn('Cross-tab communication not available:', error);
      }
    } catch (err) {
      setError("Failed to delete. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("File size should be less than 5MB")
        e.target.value = ""
        return
      }
      setSelectedFile(file)
    }
  }

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mentor.email && mentor.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (mentor.university && mentor.university.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const filteredMentees = mentees.filter(
    (mentee) =>
      mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mentee.email && mentee.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (mentee.university && mentee.university.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const renderFormSection = () => {
    return (
      <div className="border rounded-lg p-6 bg-card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {mode === "edit"
              ? `Edit ${personType === "mentor" ? "Mentor" : "Mentee"}`
              : `Add New ${personType === "mentor" ? "Mentor" : "Mentee"}`}
          </h2>
          <button
            type="button"
            onClick={() => {
              setMode("list")
              setEditPerson(null)
            }}
            className="flex items-center gap-2 px-4 py-2 text-foreground/80 rounded-lg hover:bg-muted"
          >
            <ArrowLeft size={16} />
            Back to List
          </button>
        </div>

        {mode === "create" && (
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setPersonType("mentor")}
              className={`px-4 py-2 rounded-lg ${
                personType === "mentor" ? "bg-primary text-primary-foreground" : "border hover:bg-muted"
              }`}
            >
              Mentor
            </button>
            <button
              onClick={() => setPersonType("mentee")}
              className={`px-4 py-2 rounded-lg ${
                personType === "mentee" ? "bg-primary text-primary-foreground" : "border hover:bg-muted"
              }`}
            >
              Mentee
            </button>
          </div>
        )}

        {error && <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                name="name"
                required
                defaultValue={editPerson?.name || ""}
                className="w-full px-3 py-2 border rounded-lg bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                required
                defaultValue={editPerson?.email || ""}
                className="w-full px-3 py-2 border rounded-lg bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                defaultValue={editPerson?.phone || ""}
                className="w-full px-3 py-2 border rounded-lg bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">University</label>
              <input
                type="text"
                name="university"
                defaultValue={editPerson?.university || ""}
                className="w-full px-3 py-2 border rounded-lg bg-background"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
              <input
                type="url"
                name="linkedin"
                defaultValue={editPerson?.linkedin || ""}
                className="w-full px-3 py-2 border rounded-lg bg-background"
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">GitHub Profile</label>
              <input
                type="url"
                name="github"
                defaultValue={editPerson?.github || ""}
                className="w-full px-3 py-2 border rounded-lg bg-background"
                placeholder="https://github.com/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">LeetCode Profile</label>
              <input
                type="url"
                name="leetcode"
                defaultValue={editPerson?.leetcode || ""}
                className="w-full px-3 py-2 border rounded-lg bg-background"
                placeholder="https://leetcode.com/username"
              />
            </div>

            {personType === "mentee" && (
              <div>
                <label className="block text-sm font-medium mb-1">Mentor *</label>
                <select
                  name="mentor"
                  required
                  defaultValue={
                    typeof editPerson?.mentor === "object"
                      ? editPerson?.mentor?._id?.toString()
                      : editPerson?.mentor?.toString() || ""
                  }
                  className="w-full px-3 py-2 border rounded-lg bg-background"
                >
                  <option value="">Select a mentor</option>
                  {mentors.map((mentor) => (
                    <option key={mentor._id} value={mentor._id}>
                      {mentor.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Profile Picture</label>
            <div className="flex items-center gap-4">
              {mode === "edit" && editPerson?.picture && (
                <img
                  src={editPerson.picture || "/placeholder.svg"}
                  alt={editPerson.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded-lg bg-background"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => {
                setMode("list")
                setEditPerson(null)
              }}
              className="px-4 py-2 border rounded-lg hover:bg-muted"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    )
  }

  const renderListSection = () => {
    return (
      <div className="space-y-6">
        <div className="border rounded-lg p-6 bg-card">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-semibold">Manage Mentorship Network</h2>
            <div className="flex space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-lg bg-background"
                />
                <Search className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="absolute right-3 top-2.5 text-muted-foreground">
                    <X size={18} />
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setMode("create")
                  setPersonType("mentor")
                  setEditPerson(null)
                }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2"
              >
                <Plus size={18} />
                Add New
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-4">Mentors ({filteredMentors.length})</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        University
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Mentees
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {filteredMentors.map((mentor) => (
                      <tr key={mentor._id} className="hover:bg-muted/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={mentor.picture || "/avatar.svg"}
                              alt={mentor.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="ml-3 font-medium">{mentor.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{mentor.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                          {mentor.university || "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                          {mentor.mentees && Array.isArray(mentor.mentees)
                            ? mentor.mentees.length
                            : mentees.filter((m) => {
                                if (typeof m.mentor === "object") {
                                  return m.mentor._id?.toString() === mentor._id.toString()
                                } else {
                                  return m.mentor?.toString() === mentor._id.toString()
                                }
                              }).length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => fetchPersonForEdit(mentor._id, "mentor")}
                              className="text-primary hover:text-primary/80"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(mentor._id, "mentor")}
                              className="text-destructive hover:text-destructive/80"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredMentors.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-muted-foreground">
                          No mentors found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">Mentees ({filteredMentees.length})</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        University
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Mentor
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {filteredMentees.map((mentee) => {
                      const mentorObject =
                        typeof mentee.mentor === "object"
                          ? mentee.mentor
                          : mentors.find((m) => m._id.toString() === mentee.mentor?.toString())

                      return (
                        <tr key={mentee._id} className="hover:bg-muted/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={mentee.picture || "/avatar.svg"}
                                alt={mentee.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <span className="ml-3 font-medium">{mentee.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{mentee.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                            {mentee.university || "-"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                            {mentorObject ? mentorObject.name : "No mentor"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => fetchPersonForEdit(mentee._id, "mentee")}
                                className="text-primary hover:text-primary/80"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(mentee._id, "mentee")}
                                className="text-destructive hover:text-destructive/80"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                    {filteredMentees.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-muted-foreground">
                          No mentees found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center">
        <Link href="/admin/dashboard/mentorship" className="text-primary hover:text-primary/80 mr-2">
          Mentorship Network
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="ml-2 font-medium">{mode === "list" ? "Manage" : mode === "edit" ? "Edit" : "Add New"}</span>
      </div>

      {mode === "list" ? renderListSection() : renderFormSection()}
    </div>
  )
}

export default function MentorshipManagementPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MentorshipManagementContent />
    </Suspense>
  )
}
