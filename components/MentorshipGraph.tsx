"use client"

import React, { useEffect, useRef, useState } from "react"
import ForceGraph2D from "react-force-graph-2d"
import type { ForceGraphMethods as ForceGraph2DMethods, NodeObject, LinkObject } from "react-force-graph-2d"
import { useTheme } from "next-themes"
import { X, Linkedin, Github, Code, Mail, Phone, ChevronDown, ChevronUp, Tag as TagIcon } from "lucide-react"
import NextImage from 'next/image'

interface ITag {
  _id: string
  name: string
  description?: string
  color: string
}

interface IMentor {
  _id: string | number
  name: string
  picture?: string
  university?: string
  email: string
  phone?: string
  linkedin?: string
  github?: string
  leetcode?: string
  tags?: ITag[]
}

interface IMentee {
  _id: string | number
  name: string
  picture?: string
  university?: string
  email?: string
  phone?: string
  linkedin?: string
  github?: string
  leetcode?: string
  mentor?: string | number | { _id: string | number; name: string; university?: string; picture?: string }
  tags?: ITag[]
}

interface GraphNode {
  id: string
  name: string
  type: "mentor" | "mentee"
  picture?: string
  university?: string
  email?: string
  phone?: string
  linkedin?: string
  github?: string
  leetcode?: string
  mentor?: string | { _id: string | number; name: string; university?: string; picture?: string }
  tags?: ITag[]
  x?: number
  y?: number
}

interface GraphLink {
  source: GraphNode
  target: GraphNode
}

interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

interface MentorshipGraphProps {
  mentors: IMentor[]
  mentees: IMentee[]
  isAdmin?: boolean
  useImages?: boolean
  nodeSpacing?: number
  onNodeClick?: (node: GraphNode) => void
  autoFit?: boolean
  view?: string
}

export default function MentorshipGraph({ 
  mentors, 
  mentees, 
  isAdmin = false, 
  useImages = true, 
  nodeSpacing = 80, 
  onNodeClick, 
  autoFit = false,
  view = 'spider'
}: MentorshipGraphProps) {
  const { theme = 'system', systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'

  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] })
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null)
  const graph2DRef = useRef<ForceGraph2DMethods<NodeObject<GraphNode>, LinkObject<GraphNode, GraphLink>> | undefined>(undefined)
  const graphContainerRef = useRef<HTMLDivElement>(null)
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null)
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  // Graph parameters
  const mentorSize = 15
  const menteeSize = 12

  useEffect(() => {
    console.log("Initializing graph with mentors:", mentors);
    console.log("Initializing graph with mentees:", mentees);
  
    const nodes: GraphNode[] = []
    const links: GraphLink[] = []
    const mentorMap = new Map<string, GraphNode>()

    // Add mentor nodes first
    mentors.forEach((mentor) => {
      const mentorId = mentor._id.toString()
      console.log(`Creating mentor node: ${mentorId} - ${mentor.name}`);
      
      const mentorNode: GraphNode = {
        id: mentorId,
        name: mentor.name,
        type: "mentor" as const,
        picture: mentor.picture,
        university: mentor.university,
        email: mentor.email,
        phone: mentor.phone,
        linkedin: mentor.linkedin,
        github: mentor.github,
        leetcode: mentor.leetcode,
        tags: mentor.tags,
        x: Math.random() * 300,
        y: Math.random() * 300,
      }
      nodes.push(mentorNode)
      mentorMap.set(mentorId, mentorNode)
    })

    // Add mentee nodes and links
    mentees.forEach((mentee) => {
      const menteeId = mentee._id.toString()
      console.log(`Creating mentee node: ${menteeId} - ${mentee.name}`);
      
      const menteeNode: GraphNode = {
        id: menteeId,
        name: mentee.name,
        type: "mentee" as const,
        picture: mentee.picture,
        university: mentee.university,
        email: mentee.email,
        phone: mentee.phone,
        linkedin: mentee.linkedin,
        github: mentee.github,
        leetcode: mentee.leetcode,
        tags: mentee.tags,
        x: Math.random() * 300,
        y: Math.random() * 300,
      }
      
      // Properly store mentor information based on type
      if (mentee.mentor) {
        if (typeof mentee.mentor === 'object' && mentee.mentor._id) {
          // If mentor is an object, store it directly
          menteeNode.mentor = { ...mentee.mentor };
          console.log(`Mentee ${mentee.name} has mentor object:`, menteeNode.mentor);
        } else {
          // If mentor is an ID, store as string
          menteeNode.mentor = mentee.mentor.toString();
          console.log(`Mentee ${mentee.name} has mentor ID:`, menteeNode.mentor);
        }
      }
      
      nodes.push(menteeNode)

      if (mentee.mentor) {
        // Get mentor ID regardless of format
        const mentorId = typeof mentee.mentor === 'object' && mentee.mentor._id 
          ? mentee.mentor._id.toString() 
          : mentee.mentor.toString();
          
        console.log(`Looking for mentor node with ID: ${mentorId} for mentee: ${mentee.name}`);
        const mentorNode = mentorMap.get(mentorId)
        
        if (mentorNode) {
          console.log(`Creating link from mentor ${mentorNode.name} to mentee ${menteeNode.name}`);
          links.push({
            source: mentorNode,
            target: menteeNode
          })
        } else {
          console.log(`WARNING: Could not find mentor node with ID: ${mentorId}`);
        }
      }
    })

    console.log("Graph data built:", { nodes, links });
    setGraphData({ nodes, links })

    const currentGraph = graph2DRef.current
    if (currentGraph) {
      // Stronger repulsive force but with shorter range
      currentGraph.d3Force('charge')?.strength(-150).distanceMax(150)
      
      // Shorter link distance for a tighter web
      currentGraph.d3Force('link')?.distance(nodeSpacing || 100)
      
      // Lower center gravity for better distribution
      currentGraph.d3Force('center')?.strength(0.05)
      
      // Always fit graph to view on initial render
      setTimeout(() => {
        currentGraph.zoomToFit(400, 30)
      }, 500)
    }
  }, [mentors, mentees, nodeSpacing, autoFit])

  // Add event listener for graph controls
  useEffect(() => {
    const handleGraphControl = (event: any) => {
      const { action } = event.detail
      const graphRef = graph2DRef.current
      if (!graphRef) return
      
      switch (action) {
        case "zoomIn":
          graphRef.zoom(1.2)
          break
        case "zoomOut":
          graphRef.zoom(0.8)
          break
        case "center":
          graphRef.centerAt(0, 0)
          break
        case "fit":
          graphRef.zoomToFit(400, 30)
          break
        case "reset":
          graphRef.centerAt(0, 0)
          graphRef.zoom(1)
          break
        default:
          break
      }
    }
    
    window.addEventListener("mentorship-graph-control", handleGraphControl)
    
    return () => {
      window.removeEventListener("mentorship-graph-control", handleGraphControl)
    }
  }, [])

  const getNodeColor = (node: GraphNode) => {
    if (node === selectedNode || node === hoveredNode) return isDark ? "#ffffff" : "#000000"
    return node.type === "mentor"
      ? isDark
        ? "#3b82f6"
        : "#2563eb"
      : isDark
        ? "#10b981"
        : "#059669"
  }

  const getNodeRadius = (node: GraphNode) => {
    if (node === selectedNode || node === hoveredNode) 
      return node.type === "mentor" ? mentorSize * 1.2 : menteeSize * 1.2
    return node.type === "mentor" ? mentorSize : menteeSize
  }

  const handleNodeClick = (node: NodeObject) => {
    if (!node) return
    
    console.log("Node clicked:", node);
    
    // Find the node in our graph data
    const clickedNode = graphData.nodes.find(n => n.id === node.id)
    
    if (clickedNode) {
      console.log("Found matching node in graph data:", clickedNode);
      
      // For mentees, ensure mentor data is properly set
      if (clickedNode.type === "mentee" && clickedNode.mentor) {
        if (typeof clickedNode.mentor === "string") {
          // Try to find the mentor object to enrich the data
          const mentorId = clickedNode.mentor;
          const mentorData = mentors.find(m => m._id.toString() === mentorId);
          
          if (mentorData) {
            console.log("Enriching mentee node with mentor data:", mentorData);
            // Create a new node with the enriched data
            const enrichedNode = {
              ...clickedNode,
              mentor: {
                _id: mentorData._id,
                name: mentorData.name,
                picture: mentorData.picture,
                university: mentorData.university
              }
            };
            setSelectedNode(enrichedNode === selectedNode ? null : enrichedNode);
            if (onNodeClick) onNodeClick(enrichedNode);
            return;
          }
        }
      }
      
      setSelectedNode(clickedNode === selectedNode ? null : clickedNode)
      if (onNodeClick) onNodeClick(clickedNode)
    }
  }

  const handleNodeHover = (node: NodeObject | null) => {
    if (!node) {
      setHoveredNode(null)
      return
    }
    const hoveredNode = graphData.nodes.find(n => n.id === node.id)
    setHoveredNode(hoveredNode || null)
  }

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const nodeCanvasObject = (node: GraphNode, ctx: CanvasRenderingContext2D) => {
    const size = getNodeRadius(node) * 2
    const x = node.x || 0
    const y = node.y || 0

    ctx.save()

    // Draw circle background
    ctx.beginPath()
    ctx.arc(x, y, size, 0, 2 * Math.PI)
    ctx.fillStyle = getNodeColor(node)
    ctx.fill()

    // Draw image if available
    if (node.picture && useImages) {
      // Use browser's built-in Image constructor, not Next.js Image component
      const img = new globalThis.Image()
      img.src = node.picture
      
      // Create circular clip path
      ctx.beginPath()
      ctx.arc(x, y, size - 2, 0, 2 * Math.PI)
      ctx.clip()
      
      // Draw the image
      ctx.drawImage(img, x - size + 2, y - size + 2, (size - 2) * 2, (size - 2) * 2)
    } else if (useImages) {
      // If no picture available, draw a colored circle with initial
      ctx.fillStyle = node.type === "mentor" ? "#3b82f6" : "#10b981" // Blue for mentor, green for mentee
      ctx.beginPath()
      ctx.arc(x, y, size - 2, 0, 2 * Math.PI)
      ctx.fill()
      
      // Draw text (initial)
      const initial = node.name.charAt(0).toUpperCase()
      ctx.font = `${size * 0.7}px Arial`
      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(initial, x, y)
    }

    ctx.restore()

    // Draw name label if hovered or selected
    if (node === hoveredNode || node === selectedNode) {
      ctx.font = '12px Arial'
      ctx.fillStyle = isDark ? '#fff' : '#000'
      ctx.textAlign = 'center'
      ctx.fillText(node.name, x, y + size + 12)
    }
  }

  return (
    <div className="relative w-full h-full" ref={graphContainerRef}>
      <style jsx global>{`
        /* Custom scrollbar styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
        
        /* Dark mode scrollbar */
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
      
      {view === 'table' ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">University</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {mentors.map((mentor) => {
                const mentorId = mentor._id.toString()
                const mentorMentees = mentees.filter(m => m.mentor?.toString() === mentorId)
                return (
                  <React.Fragment key={mentorId}>
                    <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={mentor.picture || '/avatar.svg'} alt={mentor.name} className="w-8 h-8 rounded-full object-cover" />
                          <span className="ml-3 font-medium text-gray-900 dark:text-gray-100">{mentor.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">Mentor</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">{mentor.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">{mentor.university}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-48">
                          {mentor.tags && mentor.tags.length > 0 ? (
                            mentor.tags.map((tag) => (
                              <span 
                                key={tag._id}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                                style={{ backgroundColor: tag.color }}
                                title={tag.description}
                              >
                                {tag.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-gray-400">No tags</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {mentorMentees.length > 0 && (
                          <button
                            onClick={() => toggleRow(mentorId)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
                          >
                            {expandedRows.has(mentorId) ? (
                              <>
                                Hide Mentees <ChevronUp size={16} />
                              </>
                            ) : (
                              <>
                                View Mentees ({mentorMentees.length}) <ChevronDown size={16} />
                              </>
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                    {expandedRows.has(mentorId) && mentorMentees.length > 0 && (
                      <tr className="bg-gray-50 dark:bg-gray-800/50">
                        <td colSpan={6} className="px-6 py-4">
                          <div className="pl-11">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">Mentees</h4>
                            <div className="space-y-3">
                              {mentorMentees.map((mentee) => (
                                <div key={mentee._id.toString()} className="flex items-center gap-3 p-2 border rounded">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={mentee.picture || '/avatar.svg'} alt={mentee.name} className="w-6 h-6 rounded-full object-cover" />
                                  <div className="flex-1">
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{mentee.name}</span>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">({mentee.university})</span>
                                    {mentee.tags && mentee.tags.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {mentee.tags.map((tag) => (
                                          <span 
                                            key={tag._id}
                                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white"
                                            style={{ backgroundColor: tag.color }}
                                            title={tag.description}
                                          >
                                            {tag.name}
                                          </span>
                                        ))}
                                      </div>
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
                )
              })}
              {mentees.map((mentee) => (
                <tr key={mentee._id.toString()} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={mentee.picture || '/avatar.svg'} alt={mentee.name} className="w-8 h-8 rounded-full object-cover" />
                      <span className="ml-3 font-medium text-gray-900 dark:text-gray-100">{mentee.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">Mentee</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">{mentee.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">{mentee.university}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-48">
                      {mentee.tags && mentee.tags.length > 0 ? (
                        mentee.tags.map((tag) => (
                          <span 
                            key={tag._id}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                            style={{ backgroundColor: tag.color }}
                            title={tag.description}
                          >
                            {tag.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-400">No tags</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                    {mentors.find(m => m._id.toString() === mentee.mentor?.toString())?.name || 'No mentor'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ForceGraph2D
          ref={graph2DRef}
          graphData={graphData}
          nodeCanvasObject={nodeCanvasObject}
          nodePointerAreaPaint={(node: NodeObject, color, ctx) => {
            const graphNode = node as unknown as GraphNode
            const size = getNodeRadius(graphNode) * 2
            ctx.beginPath()
            ctx.arc(graphNode.x || 0, graphNode.y || 0, size, 0, 2 * Math.PI)
            ctx.fillStyle = color
            ctx.fill()
          }}
          linkColor={() => (isDark ? "rgba(156, 163, 175, 0.6)" : "rgba(75, 85, 99, 0.5)")}
          linkWidth={2}
          onNodeClick={handleNodeClick}
          onNodeHover={handleNodeHover}
          backgroundColor={isDark ? "#000000" : "#ffffff"}
          cooldownTicks={100}
          warmupTicks={50}
          d3AlphaDecay={0.015}
          d3VelocityDecay={0.1}
        />
      )}

      {/* Node details modal */}
      {selectedNode && (
        <div 
          className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedNode(null)}  // Close modal when clicking on the backdrop
        >
          <div 
            className="bg-white dark:bg-black rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}  // Prevent clicks inside the modal from closing it
          >
            {/* Header */}
            <div className={`relative p-6 bg-gradient-to-r ${
              selectedNode.type === "mentor" 
                ? "from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900" 
                : "from-green-600 to-green-800 dark:from-green-700 dark:to-green-900"
              }`}
            >
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute right-4 top-4 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-center gap-4">
                {selectedNode.picture ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={selectedNode.picture}
                    alt={selectedNode.name}
                    className="w-20 h-20 rounded-full border-4 border-white/20 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      // If image fails to load, hide it and show initial instead
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : (
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white ${
                    selectedNode.type === "mentor" 
                      ? "bg-blue-500 dark:bg-blue-600" 
                      : "bg-green-500 dark:bg-green-600"
                  }`}>
                    {selectedNode.name.charAt(0).toUpperCase()}
                  </div>
                )}
                {/* Hidden fallback element that will be shown if image fails to load */}
                {selectedNode.picture && (
                  <div className={`w-20 h-20 rounded-full hidden flex items-center justify-center text-2xl font-bold text-white ${
                    selectedNode.type === "mentor" 
                      ? "bg-blue-500 dark:bg-blue-600" 
                      : "bg-green-500 dark:bg-green-600"
                  }`}>
                    {selectedNode.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedNode.name}</h3>
                  <span className="inline-block px-3 py-1 mt-2 rounded-full text-sm font-medium bg-white/20 text-white">
                    {selectedNode.type === "mentor" ? "Mentor" : "Mentee"}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {/* University */}
              {selectedNode.university && (
                <div className="py-3 border-b border-gray-200 dark:border-gray-800">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">University</h4>
                  <p className="text-gray-900 dark:text-white">{selectedNode.university}</p>
                </div>
              )}

              {/* Contact Info - Only visible for Admin */}
              {isAdmin && (
                <div className="py-3 border-b border-gray-200 dark:border-gray-800">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Contact Information</h4>
                  {selectedNode.email && (
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 mb-2">
                      <Mail size={18} />
                      <a href={`mailto:${selectedNode.email}`} className="hover:text-primary">{selectedNode.email}</a>
                    </div>
                  )}
                  {selectedNode.phone && (
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <Phone size={18} />
                      <a href={`tel:${selectedNode.phone}`} className="hover:text-primary">{selectedNode.phone}</a>
                    </div>
                  )}
                </div>
              )}

              {/* Mentor/Mentees Section */}
              <div className="py-3 border-b border-gray-200 dark:border-gray-800">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                  {selectedNode.type === "mentor" ? "Mentees" : "Mentor"}
                </h4>
                <div className="space-y-3 max-h-[30vh] overflow-y-auto custom-scrollbar pr-2">
                  {selectedNode.type === "mentor" ? (
                    // Show mentees for a mentor
                    mentees
                      .filter(m => {
                        // Convert IDs to strings for consistent comparison
                        const menteeNodeId = selectedNode.id.toString();
                        
                        // Handle different mentor reference formats (string ID or object)
                        const mentorValue = m.mentor;
                        if (typeof mentorValue === 'object' && mentorValue && '_id' in mentorValue) {
                          return mentorValue._id.toString() === menteeNodeId;
                        }
                        return mentorValue?.toString() === menteeNodeId;
                      })
                      .map((mentee) => (
                        <div key={mentee._id.toString()} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg">
                          {mentee.picture ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img 
                              src={mentee.picture || '/avatar.svg'} 
                              alt={mentee.name}
                              className="w-8 h-8 rounded-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null; // Prevent infinite loop
                                target.src = ''; // Clear the broken image
                                target.classList.add('bg-green-500', 'dark:bg-green-600', 'flex', 'items-center', 'justify-center');
                                // Add initial inside the img element
                                target.style.display = 'flex';
                                target.style.alignItems = 'center';
                                target.style.justifyContent = 'center';
                                target.setAttribute('data-initial', mentee.name.charAt(0).toUpperCase());
                                target.setAttribute('role', 'presentation');
                                // Use a pseudo-element to show the initial
                                const style = document.createElement('style');
                                style.innerHTML = `
                                  [data-initial]::before {
                                    content: attr(data-initial);
                                    color: white;
                                    font-weight: bold;
                                  }
                                `;
                                document.head.appendChild(style);
                              }}
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center text-xs font-bold text-white">
                              {mentee.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{mentee.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{mentee.university}</div>
                          </div>
                        </div>
                      ))
                  ) : (
                    // Show mentor for a mentee
                    (() => {
                      console.log("Mentee node selected:", selectedNode);
                      console.log("Available mentors:", mentors);
                      
                      // First try to get the mentor from the selectedNode if it's an object
                      const mentorValue = selectedNode.mentor;
                      
                      // Better debug information to trace the issue
                      console.log("Mentor value type:", typeof mentorValue);
                      console.log("Mentor value:", mentorValue);
                      
                      if (typeof mentorValue === 'object' && mentorValue && '_id' in mentorValue) {
                        console.log("Found mentor as object:", mentorValue);
                        return (
                          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg">
                            {mentorValue.picture ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img 
                                src={mentorValue.picture || '/avatar.svg'} 
                                alt={mentorValue.name} 
                                className="w-8 h-8 rounded-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null; // Prevent infinite loop
                                  target.src = ''; // Clear the broken image
                                  target.classList.add('bg-blue-500', 'dark:bg-blue-600', 'flex', 'items-center', 'justify-center');
                                  // Add initial inside the img element
                                  target.style.display = 'flex';
                                  target.style.alignItems = 'center';
                                  target.style.justifyContent = 'center';
                                  target.setAttribute('data-initial', mentorValue.name.charAt(0).toUpperCase());
                                  target.setAttribute('role', 'presentation');
                                }}
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                                {mentorValue.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{mentorValue.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{mentorValue.university}</div>
                            </div>
                          </div>
                        );
                      }
                      
                      // If mentor is a string ID, try to find the mentor in the mentors array
                      if (mentorValue) {
                        const mentorId = mentorValue.toString();
                        console.log("Looking for mentor with ID:", mentorId);
                        
                        // Try to find matching mentor
                        const matchingMentor = mentors.find(m => {
                          const mentorIdStr = m._id.toString();
                          const matches = mentorIdStr === mentorId;
                          console.log(`Comparing ${mentorIdStr} with ${mentorId}:`, matches);
                          return matches;
                        });
                        
                        if (matchingMentor) {
                          console.log("Found matching mentor:", matchingMentor);
                          return (
                            <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg">
                              {matchingMentor.picture ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img 
                                  src={matchingMentor.picture || '/avatar.svg'} 
                                  alt={matchingMentor.name} 
                                  className="w-8 h-8 rounded-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null; // Prevent infinite loop
                                    target.src = ''; // Clear the broken image
                                    target.classList.add('bg-blue-500', 'dark:bg-blue-600', 'flex', 'items-center', 'justify-center');
                                    // Add initial inside the img element
                                    target.style.display = 'flex';
                                    target.style.alignItems = 'center';
                                    target.style.justifyContent = 'center';
                                    target.setAttribute('data-initial', matchingMentor.name.charAt(0).toUpperCase());
                                    target.setAttribute('role', 'presentation');
                                  }}
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                                  {matchingMentor.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{matchingMentor.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{matchingMentor.university}</div>
                              </div>
                            </div>
                          );
                        } else {
                          console.log("No mentor found with ID:", mentorId);
                          console.log("Available mentor IDs:", mentors.map(m => m._id.toString()));
                        }
                      }
                      
                      // If we got here, no mentor was found
                      console.log("No mentor was found for mentee");
                      return <p className="text-gray-500 dark:text-gray-400">No mentor assigned</p>;
                    })()
                  )}
                  {/* Show message if no mentees found */}
                  {selectedNode.type === "mentor" && 
                   mentees.filter(m => {
                     const mentorValue = m.mentor;
                     if (typeof mentorValue === 'object' && mentorValue && '_id' in mentorValue) {
                       return mentorValue._id.toString() === selectedNode.id.toString();
                     }
                     return mentorValue?.toString() === selectedNode.id.toString();
                   }).length === 0 && 
                   <p className="text-gray-500 dark:text-gray-400">No mentees found</p>}
                </div>
              </div>

              {/* Tags */}
              {selectedNode.tags && selectedNode.tags.length > 0 && (
                <div className="py-3 border-b border-gray-200 dark:border-gray-800">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                    <TagIcon size={16} />
                    Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.tags.map((tag) => (
                      <span 
                        key={tag._id}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: tag.color }}
                        title={tag.description}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div className="py-3 border-t border-gray-200 dark:border-gray-800">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Social Profiles</h4>
                <div className="flex gap-3">
                  {selectedNode.linkedin && (
                    <a
                      href={selectedNode.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 transition-colors"
                    >
                      <NextImage
                        src="/linkedin.png"
                        alt="LinkedIn"
                        width={20}
                        height={20}
                      />
                    </a>
                  )}
                  {selectedNode.github && (
                    <a
                      href={selectedNode.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  )}
                  {selectedNode.leetcode && (
                    <a
                      href={selectedNode.leetcode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 transition-colors"
                    >
                      <NextImage
                        src="/leetcode.png"
                        alt="LeetCode"
                        width={20}
                        height={20}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
