"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Network,
  Table,
  Grid,
  ZoomIn,
  ZoomOut,
  Maximize2,
  RefreshCw,
  Target,
  ChevronUp,
  ChevronDown,
  Plus,
  Search,
  Filter,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TagAssignment from "@/components/TagAssignment";

// Import MentorshipGraph component dynamically with SSR disabled
const MentorshipGraph = dynamic(() => import("@/components/MentorshipGraph"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-[500px]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-muted rounded-full"></div>
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="text-muted-foreground">Loading graph visualization...</p>
      </div>
    </div>
  ),
});

const VIEW_OPTIONS = [
  { key: "spider", label: "Spider Web", icon: Network },
  { key: "table", label: "Table", icon: Table },
  { key: "gallery", label: "Gallery", icon: Grid },
];

function TableView({ mentors, mentees, onDataUpdate }: any) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const router = useRouter();

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const handleSetCredentials = (mentorId: string) => {
    router.push(`/admin/dashboard/mentor-credentials/${mentorId}`);
  };

  const handleTagsUpdated = (personId: string, personType: 'mentor' | 'mentee', updatedTags: any[]) => {
    onDataUpdate && onDataUpdate();
  };

  return (
    <div className="p-6 space-y-8">
      {/* Mentors Table */}
      <div>
        <h3 className="text-xl font-semibold mb-4 px-2">
          Mentors ({mentors.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  University
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Social Profiles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Mentees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mentors.map((mentor: any) => {
                const mentorMentees = mentees.filter((m: any) =>
                  typeof m.mentor === "object"
                    ? m.mentor._id?.toString() === mentor._id.toString()
                    : m.mentor?.toString() === mentor._id.toString()
                );

                return (
                  <React.Fragment key={mentor._id}>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Image
                            src={mentor.picture || "/avatar.svg"}
                            alt={mentor.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="ml-3 font-medium">
                            {mentor.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={`mailto:${mentor.email}`}
                          className="text-muted-foreground hover:text-primary"
                        >
                          {mentor.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                        {mentor.phone ? (
                          <a
                            href={`tel:${mentor.phone}`}
                            className="hover:text-primary"
                          >
                            {mentor.phone}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                        {mentor.university || "-"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-48">
                          <TagAssignment
                            personId={mentor._id}
                            personType="mentor"
                            personName={mentor.name}
                            currentTags={mentor.tags || []}
                            onTagsUpdated={(updatedTags) => handleTagsUpdated(mentor._id, 'mentor', updatedTags)}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {mentor.username ? (
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400">
                            {mentor.username}
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400">
                            Not set
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-3">
                          {mentor.linkedin && (
                            <>
                              <Link
                                href={mentor.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-8 mt-3 w-8 rounded-full"
                                title="LinkedIn"
                              >
                                <Image
                                  src="/linkedin.png"
                                  alt="LinkedIn"
                                  width={18}
                                  height={18}
                                  style={{ width: "18px", height: "18px" }}
                                />
                              </Link>
                            </>
                          )}
                          {mentor.github && (
                            <a
                              href={mentor.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-8 mt-3  w-8 rounded-full"
                              title="GitHub"
                            >
                              <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                                />
                              </svg>
                            </a>
                          )}
                          {mentor.leetcode && (
                            <a
                              href={mentor.leetcode}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-3 h-8 w-8 rounded-full"
                              title="LeetCode"
                            >
                              <Image
                                src="/leetcode.png"
                                alt="LeetCode"
                                width={18}
                                height={18}
                                style={{ width: "18px", height: "18px" }}
                              />
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className="inline-flex items-center cursor-pointer text-blue-500 hover:text-blue-700"
                          onClick={() => toggleRow(mentor._id)}
                        >
                          {mentorMentees.length}{" "}
                          {expandedRows.has(mentor._id) ? (
                            <ChevronUp className="h-4 w-4 ml-1" />
                          ) : (
                            <ChevronDown className="h-4 w-4 ml-1" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button 
                          size="sm" 
                          variant={mentor.username ? "outline" : "default"}
                          onClick={() => handleSetCredentials(mentor._id)}
                        >
                          {mentor.username ? "Update Credentials" : "Set Credentials"}
                        </Button>
                      </td>
                    </tr>
                    {expandedRows.has(mentor._id) &&
                      mentorMentees.length > 0 && (
                        <tr className="bg-muted/50">
                          <td colSpan={9} className="px-6 py-4">
                            <div className="pl-11">
                              <h4 className="text-sm font-medium mb-3">
                                Mentees
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {mentorMentees.map((mentee: any) => (
                                  <div
                                    key={mentee._id.toString()}
                                    className="flex flex-col gap-3 p-3 border rounded-lg bg-card"
                                  >
                                    <div className="flex items-center gap-3">
                                    <Image
                                      src={mentee.picture || "/avatar.svg"}
                                      alt={mentee.name}
                                      width={32}
                                      height={32}
                                      className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                      <div className="font-medium">
                                        {mentee.name}
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        {mentee.university || "No university"}
                                      </div>
                                      <a
                                        href={`mailto:${mentee.email}`}
                                        className="text-sm text-primary hover:underline"
                                      >
                                        {mentee.email}
                                      </a>
                                      {mentee.phone && (
                                        <div className="text-sm text-muted-foreground">
                                          <a
                                            href={`tel:${mentee.phone}`}
                                            className="hover:text-primary"
                                          >
                                            {mentee.phone}
                                          </a>
                                        </div>
                                      )}
                                      </div>
                                    </div>
                                    
                                    {/* Tags for mentee */}
                                    <div className="mt-2">
                                      <TagAssignment
                                        personId={mentee._id}
                                        personType="mentee"
                                        personName={mentee.name}
                                        currentTags={mentee.tags || []}
                                        onTagsUpdated={(updatedTags) => handleTagsUpdated(mentee._id, 'mentee', updatedTags)}
                                      />
                                    </div>

                                      {/* Social links */}
                                      <div className="flex space-x-3">
                                      {mentee.linkedin && (
                                          <a
                                          href={mentee.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1 rounded-full hover:opacity-80 transition-colors border flex items-center justify-center bg-white"
                                            title="LinkedIn"
                                          >
                                            <Image
                                              src="/linkedin.png"
                                              alt="LinkedIn"
                                              width={18}
                                              height={18}
                                              style={{
                                                width: "18px",
                                                height: "18px",
                                              }}
                                            />
                                          </a>
                                        )}
                                      {mentee.github && (
                                          <a
                                          href={mentee.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1 rounded-full hover:text-foreground flex items-center justify-center"
                                            title="GitHub"
                                          >
                                            <svg
                                              className="h-5 w-5"
                                              fill="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                                              />
                                            </svg>
                                          </a>
                                        )}
                                      {mentee.leetcode && (
                                          <a
                                          href={mentee.leetcode}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1 rounded-full hover:opacity-80 transition-colors border flex items-center justify-center bg-white"
                                            title="LeetCode"
                                          >
                                            <Image
                                              src="/leetcode.png"
                                              alt="LeetCode"
                                              width={18}
                                              height={18}
                                              style={{
                                                width: "18px",
                                                height: "18px",
                                              }}
                                            />
                                          </a>
                                        )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mentees Table */}
      <div>
        <h3 className="text-xl font-semibold mb-4 px-2">
          Mentees ({mentees.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  University
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Social Profiles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Mentor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mentees.map((mentee: any) => {
                // Find mentor info
                const mentorInfo =
                  typeof mentee.mentor === "object" &&
                  mentee.mentor &&
                  mentee.mentor._id
                    ? mentee.mentor
                    : null;

                return (
                  <tr key={mentee._id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Image
                          src={mentee.picture || "/avatar.svg"}
                          alt={mentee.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="ml-3 font-medium">
                          {mentee.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={`mailto:${mentee.email}`}
                        className="text-muted-foreground hover:text-primary"
                      >
                        {mentee.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {mentee.phone ? (
                        <a
                          href={`tel:${mentee.phone}`}
                          className="hover:text-primary"
                        >
                          {mentee.phone}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {mentee.university || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-48">
                        <TagAssignment
                          personId={mentee._id}
                          personType="mentee"
                          personName={mentee.name}
                          currentTags={mentee.tags || []}
                          onTagsUpdated={(updatedTags) => handleTagsUpdated(mentee._id, 'mentee', updatedTags)}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-3">
                        {mentee.linkedin && (
                          <a
                            href={mentee.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 mt-3 w-8 rounded-full"
                            title="LinkedIn"
                          >
                            <Image
                              src="/linkedin.png"
                              alt="LinkedIn"
                              width={18}
                              height={18}
                              style={{ width: "18px", height: "18px" }}
                            />
                          </a>
                        )}
                        {mentee.github && (
                          <a
                            href={mentee.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 mt-3 w-8 rounded-full"
                            title="GitHub"
                          >
                            <svg
                              className="h-5 w-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                              />
                            </svg>
                          </a>
                        )}
                        {mentee.leetcode && (
                          <a
                            href={mentee.leetcode}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 mt-3 w-8 rounded-full"
                            title="LeetCode"
                          >
                            <Image
                              src="/leetcode.png"
                              alt="LeetCode"
                              width={18}
                              height={18}
                              style={{ width: "18px", height: "18px" }}
                            />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {mentorInfo ? (
                        <div className="flex items-center">
                          <Image
                            src={mentorInfo.picture || "/avatar.svg"}
                            alt={mentorInfo.name}
                            width={24}
                            height={24}
                            className="w-6 h-6 rounded-full object-cover mr-2"
                          />
                          <span className="text-foreground">
                            {mentorInfo.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No mentor</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function GalleryView({ mentors, mentees }: any) {
  return (
    <div className="p-6">
      {/* Mentors Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 px-2">
          Mentors ({mentors.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mentors.map((mentor: any) => {
            const mentorMentees = mentees.filter((m: any) =>
              typeof m.mentor === "object"
                ? m.mentor._id?.toString() === mentor._id.toString()
                : m.mentor?.toString() === mentor._id.toString()
            );

            return (
              <div
                key={mentor._id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-all bg-card"
              >
                {/* Header with avatar and name */}
                <div className="p-4 border-b flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={mentor.picture || "/avatar.svg"}
                      alt={mentor.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover border-2 border-primary/20"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{mentor.name}</h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      Mentor
                    </span>
                  </div>
                </div>

                {/* Contact & University Info */}
                <div className="p-4 space-y-3">
                  {mentor.university && (
                    <div className="flex items-center text-sm">
                      <svg
                        className="h-5 w-5 text-muted-foreground mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span className="text-foreground">
                        {mentor.university}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center text-sm">
                    <svg
                      className="h-5 w-5 text-muted-foreground mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href={`mailto:${mentor.email}`}
                      className="text-foreground hover:text-primary"
                    >
                      {mentor.email}
                    </a>
                  </div>

                  {mentor.phone && (
                    <div className="flex items-center text-sm">
                      <svg
                        className="h-5 w-5 text-muted-foreground mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a
                        href={`tel:${mentor.phone}`}
                        className="text-foreground hover:text-primary"
                      >
                        {mentor.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="px-4 py-3 border-t flex justify-between">
                  <div className="flex space-x-3">
                    {mentor.linkedin && (
                      <a
                        href={mentor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-full hover:opacity-80 transition-colors border flex items-center justify-center bg-white"
                        title="LinkedIn"
                      >
                        <Image
                          src="/linkedin.png"
                          alt="LinkedIn"
                          width={18}
                          height={18}
                          style={{ width: "18px", height: "18px" }}
                        />
                      </a>
                    )}
                    {mentor.github && (
                      <a
                        href={mentor.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-full hover:text-foreground flex items-center justify-center"
                        title="GitHub"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                          />
                        </svg>
                      </a>
                    )}
                    {mentor.leetcode && (
                      <a
                        href={mentor.leetcode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded-full hover:opacity-80 transition-colors border flex items-center justify-center bg-white"
                        title="LeetCode"
                      >
                        <Image
                          src="/leetcode.png"
                          alt="LeetCode"
                          width={18}
                          height={18}
                          style={{ width: "18px", height: "18px" }}
                        />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground border rounded px-2 py-1">
                      {mentorMentees.length} mentee
                      {mentorMentees.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mentees Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4 px-2">
          Mentees ({mentees.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mentees.map((mentee: any) => {
            // Find mentor info
            const mentorInfo =
              typeof mentee.mentor === "object" &&
              mentee.mentor &&
              mentee.mentor._id
                ? mentee.mentor
                : null;

            return (
              <div
                key={mentee._id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-all bg-card"
              >
                {/* Header with avatar and name */}
                <div className="p-4 border-b flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={mentee.picture || "/avatar.svg"}
                      alt={mentee.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full object-cover border-2 border-secondary/20"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{mentee.name}</h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                      Mentee
                    </span>
                  </div>
                </div>

                {/* Contact & University Info */}
                <div className="p-4 space-y-3">
                  {mentee.university && (
                    <div className="flex items-center text-sm">
                      <svg
                        className="h-5 w-5 text-muted-foreground mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span className="text-foreground">
                        {mentee.university}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center text-sm">
                    <svg
                      className="h-5 w-5 text-muted-foreground mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href={`mailto:${mentee.email}`}
                      className="text-foreground hover:text-primary"
                    >
                      {mentee.email}
                    </a>
                  </div>

                  {mentee.phone && (
                    <div className="flex items-center text-sm">
                      <svg
                        className="h-5 w-5 text-muted-foreground mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a
                        href={`tel:${mentee.phone}`}
                        className="text-foreground hover:text-primary"
                      >
                        {mentee.phone}
                      </a>
                    </div>
                  )}

                  {mentorInfo && (
                    <div className="flex items-center text-sm">
                      <svg
                        className="h-5 w-5 text-muted-foreground mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="text-foreground">
                        Mentor: {mentorInfo.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="px-4 py-3 border-t flex justify-start space-x-3">
                  {mentee.linkedin && (
                    <a
                      href={mentee.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-full hover:opacity-80 transition-colors border flex items-center justify-center bg-white"
                      title="LinkedIn"
                    >
                      <Image
                        src="/linkedin.png"
                        alt="LinkedIn"
                        width={18}
                        height={18}
                        style={{ width: "18px", height: "18px" }}
                      />
                    </a>
                  )}
                  {mentee.github && (
                    <a
                      href={mentee.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-full hover:text-foreground flex items-center justify-center"
                      title="GitHub"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"
                        />
                      </svg>
                    </a>
                  )}
                  {mentee.leetcode && (
                    <a
                      href={mentee.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-full hover:opacity-80 transition-colors border flex items-center justify-center bg-white"
                      title="LeetCode"
                    >
                      <Image
                        src="/leetcode.png"
                        alt="LeetCode"
                        width={18}
                        height={18}
                        style={{ width: "18px", height: "18px" }}
                      />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AdvancedSearchBar({ onSearch }: { onSearch: (filters: any) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{
    role: string;
    university: string;
    mentorName: string;
  }>({
    role: "all", // "mentor", "mentee", "all"
    university: "",
    mentorName: "",
  });

  const handleSearch = () => {
    onSearch({
      searchTerm,
      ...filters,
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      role: "all",
      university: "",
      mentorName: "",
    });
    onSearch({
      searchTerm: "",
      role: "all",
      university: "",
      mentorName: "",
    });
  };

  return (
    <div className="mb-6 w-full">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full px-10 py-2 border rounded-lg focus:ring-primary focus:border-primary"
            placeholder="Search by name, email, university..."
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {(searchTerm ||
            filters.role !== "all" ||
            filters.university ||
            filters.mentorName) && (
            <button
              onClick={clearFilters}
              className="absolute inset-y-0 right-10 flex items-center pr-3"
              title="Clear filters"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
          <button
            onClick={handleSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            title="Search"
          >
            <div className="p-1 rounded-md hover:bg-muted">
              <Search className="w-4 h-4 text-primary" />
            </div>
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`px-4 py-2 border rounded-lg flex items-center gap-2 ${
            isOpen ? "bg-muted" : ""
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {isOpen && (
        <div className="mt-3 p-4 border rounded-lg bg-card shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                value={filters.role}
                onChange={(e) =>
                  setFilters({ ...filters, role: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All</option>
                <option value="mentor">Mentors only</option>
                <option value="mentee">Mentees only</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                University
              </label>
              <input
                type="text"
                value={filters.university}
                onChange={(e) =>
                  setFilters({ ...filters, university: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                placeholder="Filter by university..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Mentor Name
              </label>
              <input
                type="text"
                value={filters.mentorName}
                onChange={(e) =>
                  setFilters({ ...filters, mentorName: e.target.value })
                }
                className="w-full p-2 border rounded-md"
                placeholder="Filter by mentor name..."
              />
            </div>
          </div>

          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={clearFilters}
              className="px-3 py-1 border rounded-md hover:bg-muted"
            >
              Clear All
            </button>
            <button
              onClick={handleSearch}
              className="px-3 py-1 bg-primary text-primary-foreground rounded-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminMentorshipPage() {
  const [data, setData] = useState<{ mentors: any[]; mentees: any[] }>({
    mentors: [],
    mentees: [],
  });
  const [filteredData, setFilteredData] = useState<{
    mentors: any[];
    mentees: any[];
  }>({ mentors: [], mentees: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState("spider");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [mentorsRes, menteesRes] = await Promise.all([
          fetch("/api/admin/mentors"),
          fetch("/api/admin/mentees"),
        ]);
        if (!mentorsRes.ok || !menteesRes.ok)
          throw new Error("Failed to fetch data");
        const [mentors, mentees] = await Promise.all([
          mentorsRes.json(),
          menteesRes.json(),
        ]);
        setData({ mentors, mentees });
        setFilteredData({ mentors, mentees });
      } catch (err) {
        setError("Failed to load mentorship data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (filters: any) => {
    const { searchTerm, role, university, mentorName } = filters;

    // Filter mentors
    let filteredMentors = [...data.mentors];
    if (role === "mentee") {
      filteredMentors = [];
    } else if (searchTerm) {
      filteredMentors = filteredMentors.filter(
        (mentor) =>
          mentor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentor.university?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (university) {
      filteredMentors = filteredMentors.filter((mentor) =>
        mentor.university?.toLowerCase().includes(university.toLowerCase())
      );
    }
    if (mentorName) {
      filteredMentors = filteredMentors.filter((mentor) =>
        mentor.name?.toLowerCase().includes(mentorName.toLowerCase())
      );
    }

    // Filter mentees
    let filteredMentees = [...data.mentees];
    if (role === "mentor") {
      filteredMentees = [];
    } else if (searchTerm) {
      filteredMentees = filteredMentees.filter(
        (mentee) =>
          mentee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          mentee.university?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          // Search by mentor name
          (typeof mentee.mentor === "object" &&
            mentee.mentor?.name
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }
    if (university) {
      filteredMentees = filteredMentees.filter((mentee) =>
        mentee.university?.toLowerCase().includes(university.toLowerCase())
      );
    }
    if (mentorName) {
      filteredMentees = filteredMentees.filter((mentee) =>
        typeof mentee.mentor === "object" && mentee.mentor?.name
          ? mentee.mentor.name.toLowerCase().includes(mentorName.toLowerCase())
          : false
      );
    }

    setFilteredData({
      mentors: filteredMentors,
      mentees: filteredMentees,
    });
  };

  const handleGraphControl = (action: string) => {
    // Only dispatch event if window is defined (client-side)
    if (typeof window !== "undefined") {
      const event = new CustomEvent("mentorship-graph-control", {
        detail: { action },
      });
      window.dispatchEvent(event);
    }
  };

  const renderView = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full py-20">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-12 h-12">
              <div className="absolute top-0 left-0 w-12 h-12 border-4 border-muted rounded-full"></div>
              <div className="absolute top-0 left-0 w-12 h-12 border-4 border-t-primary rounded-full animate-spin"></div>
            </div>
            <p className="text-muted-foreground">Loading data...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-full py-20">
          <div className="text-center max-w-md p-6">
            <div className="text-destructive mb-2">⚠️</div>
            <h3 className="text-lg font-medium mb-2">Error Loading Data</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <button
              onClick={() =>
                typeof window !== "undefined" && window.location.reload()
              }
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    switch (view) {
      case "spider":
        return (
          <div className="relative w-full h-[calc(100vh-12rem)]">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
              <button
                onClick={() => handleGraphControl("zoomIn")}
                className="p-2 rounded-md bg-background/90 shadow-lg hover:bg-background transition-all"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleGraphControl("zoomOut")}
                className="p-2 rounded-md bg-background/90 shadow-lg hover:bg-background transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleGraphControl("center")}
                className="p-2 rounded-md bg-background/90 shadow-lg hover:bg-background transition-all"
                title="Center"
              >
                <Target className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleGraphControl("fit")}
                className="p-2 rounded-md bg-background/90 shadow-lg hover:bg-background transition-all"
                title="Fit"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleGraphControl("reset")}
                className="p-2 rounded-md bg-background/90 shadow-lg hover:bg-background transition-all"
                title="Reset"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            <MentorshipGraph
              mentors={filteredData.mentors}
              mentees={filteredData.mentees}
              isAdmin={true}
              useImages={true}
              nodeSpacing={150}
              view={view}
              autoFit={true}
            />
          </div>
        );
      case "table":
        return (
          <TableView
            mentors={filteredData.mentors}
            mentees={filteredData.mentees}
            onDataUpdate={() => handleSearch({ searchTerm: "", role: "all", university: "", mentorName: "" })}
          />
        );
      case "gallery":
        return (
          <GalleryView
            mentors={filteredData.mentors}
            mentees={filteredData.mentees}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-semibold">Mentorship Network</h1>

        <div className="flex items-center gap-2">
          <div className="flex space-x-2 border rounded-md overflow-hidden">
            {VIEW_OPTIONS.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.key}
                  onClick={() => setView(option.key)}
                  className={`
                    flex items-center px-3 py-1.5 text-sm font-medium transition-colors
                    ${
                      view === option.key
                        ? "bg-primary text-primary-foreground"
                        : "text-primary hover:bg-muted"
                    }
                  `}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {option.label}
                </button>
              );
            })}
          </div>

          <Link
            href="/admin/dashboard/add-mentorship"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1"
          >
            <Plus size={16} /> Add New
          </Link>
        </div>
      </div>

      <AdvancedSearchBar onSearch={handleSearch} />

      <div className="border rounded-lg overflow-hidden bg-card">
        {renderView()}
      </div>
    </div>
  );
}
