'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Users, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function getCategoryValue(sessionCategory: string) {
  switch (sessionCategory.toLowerCase()) {
    case 'web': return 'web';
    case 'devops': return 'devops';
    case 'cloud': return 'cloud';
    case 'ai/ml':
    case 'ai':
    case 'ml': return 'ai';
    case 'cp & dsa': return 'cp';
    case 'remote job': return 'remote';
    case 'open source': return 'opensource';
    case 'other': return 'other';
    default: return sessionCategory.toLowerCase();
  }
}

export default function SessionsPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');

  useEffect(() => {
    fetch('/api/sessions')
      .then(res => res.json())
      .then(data => setSessions(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  // Get unique categories from session data
  const uniqueCategories = Array.from(
    new Set(sessions.map(s => getCategoryValue(s.category)))
  ).filter(Boolean);

  // Build dropdown options
  const topicOptions = [
    { value: 'all', label: 'All Topics' },
    ...uniqueCategories.map(cat => ({
      value: cat,
      label:
        cat === 'web' ? 'Web Development' :
        cat === 'devops' ? 'DevOps' :
        cat === 'cloud' ? 'Cloud Computing' :
        cat === 'ai' ? 'Machine Learning/AI' :
        cat === 'cp' ? 'CP & DSA' :
        cat === 'remote' ? 'Remote Job' :
        cat === 'opensource' ? 'Open Source' :
        cat.charAt(0).toUpperCase() + cat.slice(1)
    }))
  ];

  // Tabs to show (first 5, always include 'all')
  const tabCategories = ['all', ...uniqueCategories.slice(0, 4)];

  const filteredSessions = (cat: string) => {
    let filtered = sessions;
    if (cat !== 'all') {
      filtered = sessions.filter(s => getCategoryValue(s.category) === cat);
    }
    if (search.trim()) {
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.speaker.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filtered;
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-4 mb-10">
        <h1 className="text-4xl font-bold">Upcoming Sessions</h1>
        <p className="text-muted-foreground text-lg">
          Browse and register for our upcoming mentorship sessions led by industry experts. Filter by topic, date, or
          mentor to find the perfect session for your learning journey.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input placeholder="Search sessions..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              {topicOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="upcoming">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="past">Past Sessions</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Sessions Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="mb-6">
          {tabCategories.map(cat => (
            <TabsTrigger key={cat} value={cat}>
              {cat === 'all'
                ? 'All Sessions'
                : topicOptions.find(opt => opt.value === cat)?.label || cat.charAt(0).toUpperCase() + cat.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabCategories.map(cat => (
          <TabsContent key={cat} value={cat} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 w-20 bg-muted rounded mb-2"></div>
                      <div className="h-6 w-3/4 bg-muted rounded mb-2"></div>
                      <div className="h-4 w-full bg-muted rounded"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 w-1/2 bg-muted rounded"></div>
                        <div className="h-4 w-1/3 bg-muted rounded"></div>
                        <div className="h-4 w-2/3 bg-muted rounded"></div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="h-10 w-full bg-muted rounded"></div>
                    </CardFooter>
                  </Card>
                ))
              ) : filteredSessions(cat).length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center col-span-full">
                  <p className="text-muted-foreground">No sessions found matching your criteria</p>
                </div>
              ) : (
                filteredSessions(cat).map((session, idx) => (
                  <Card key={session._id || idx}>
                    <CardHeader>
                      <Badge className="w-fit mb-2">{session.category}</Badge>
                      <CardTitle>{session.name}</CardTitle>
                      <CardDescription>{session.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                        <Clock className="h-4 w-4" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Users className="h-4 w-4" />
                        <span>{session.speaker}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Calendar on Home Page to Join
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

