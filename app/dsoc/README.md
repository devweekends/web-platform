# DSOC - Dev Weekends Summer of Code

DSOC (Dev Weekends Summer of Code) is a GSoC-inspired open-source mentorship program that connects students with mentors to work on real-world projects.

## Features

- 🎨 **Neo-brutalism Design** - Bold, colorful UI with thick borders and shadows
- 📝 **Project Listings** - Browse projects with filters for difficulty, technology, and status
- 👨‍💻 **Mentor System** - Experienced developers guide mentees through projects
- 🎓 **Mentee Registration** - Students can apply and track their applications
- 📊 **Dashboards** - Role-based dashboards for mentors, mentees, and admins
- 🔐 **JWT Authentication** - Secure login for all user roles
- 💬 **Discord Integration** - All communication happens via Discord

## Pages

| Route | Description |
|-------|-------------|
| `/dsoc` | Landing page with program overview |
| `/dsoc/projects` | Browse all available projects |
| `/dsoc/projects/[id]` | View project details |
| `/dsoc/apply/[id]` | Submit application for a project |
| `/dsoc/register/mentee` | Mentee registration |
| `/dsoc/register/mentor` | Mentor registration |
| `/dsoc/login` | Login for mentors and mentees |
| `/dsoc/mentee/dashboard` | Mentee dashboard |
| `/dsoc/mentor/dashboard` | Mentor dashboard |
| `/admin/dsoc` | Admin management panel |
| `/admin/dsoc/projects/new` | Create new project |

## API Endpoints

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dsoc/projects` | List all projects (supports filters) |
| `POST` | `/api/dsoc/projects` | Create a new project |
| `GET` | `/api/dsoc/projects/[id]` | Get project details |
| `PUT` | `/api/dsoc/projects/[id]` | Update a project |
| `DELETE` | `/api/dsoc/projects/[id]` | Delete a project |

### Applications

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dsoc/applications` | List applications |
| `POST` | `/api/dsoc/applications` | Submit an application |
| `GET` | `/api/dsoc/applications/[id]` | Get application details |
| `PUT` | `/api/dsoc/applications/[id]` | Update application status |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/dsoc/auth/mentee/register` | Register as mentee |
| `POST` | `/api/dsoc/auth/mentee/login` | Mentee login |
| `POST` | `/api/dsoc/auth/mentor/register` | Register as mentor |
| `POST` | `/api/dsoc/auth/mentor/login` | Mentor login |
| `POST` | `/api/dsoc/auth/logout` | Logout (clears cookie) |

### Stats

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dsoc/stats` | Get program statistics |

## Database Models

### DSOCProject

```javascript
{
  title: String,
  description: String,
  longDescription: String,
  organization: String,
  repositoryUrl: String,
  websiteUrl: String,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  duration: String,
  technologies: [String],
  tags: [String],
  mentors: [ObjectId -> DSOCMentor],
  selectedMentees: [ObjectId -> DSOCMentee],
  maxMentees: Number,
  requirements: [String],
  learningOutcomes: [String],
  milestones: [{
    title: String,
    description: String,
    weekNumber: Number
  }],
  applicationDeadline: Date,
  startDate: Date,
  endDate: Date,
  status: 'draft' | 'open' | 'in-progress' | 'completed' | 'archived',
  season: String,
  discordChannel: String,
  discordCategoryId: String
}
```

### DSOCMentor

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  github: String,
  linkedin: String,
  bio: String,
  organization: String,
  expertise: [String],
  projects: [ObjectId -> DSOCProject],
  mentees: [ObjectId -> DSOCMentee],
  isVerified: Boolean,
  discordId: String,
  discordUsername: String,
  timezone: String,
  availableHoursPerWeek: Number
}
```

### DSOCMentee

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  github: String,
  linkedin: String,
  resume: String,
  bio: String,
  university: String,
  graduationYear: Number,
  skills: [String],
  applications: [ObjectId -> DSOCApplication],
  selectedProjects: [ObjectId -> DSOCProject],
  discordId: String,
  discordUsername: String,
  timezone: String
}
```

### DSOCApplication

```javascript
{
  mentee: ObjectId -> DSOCMentee,
  project: ObjectId -> DSOCProject,
  proposal: String,
  experience: String,
  motivation: String,
  weeklyAvailability: Number,
  startDate: Date,
  portfolioUrl: String,
  additionalInfo: String,
  status: 'pending' | 'under-review' | 'accepted' | 'rejected' | 'withdrawn',
  feedback: String,
  score: Number,
  reviewedBy: ObjectId -> DSOCMentor,
  reviewedAt: Date
}
```

## Styling

The DSOC module uses a custom Neo-brutalism theme with CSS variables:

```css
:root {
  --dsoc-primary: #FF6B35;    /* Orange */
  --dsoc-secondary: #004E89;  /* Blue */
  --dsoc-accent: #FFCB47;     /* Yellow */
  --dsoc-success: #2EC4B6;    /* Teal */
  --dsoc-purple: #7B2CBF;     /* Purple */
  --dsoc-pink: #E63946;       /* Pink/Red */
  --dsoc-dark: #1a1a2e;       /* Dark background */
  --dsoc-light: #FFFBF5;      /* Light background */
}
```

Key CSS classes:
- `.neo-brutal-card` - Cards with thick borders and shadows
- `.neo-brutal-btn` - Bold buttons with hover effects
- `.neo-brutal-input` - Form inputs with brutalist styling
- `.neo-brutal-badge` - Tags and status badges
- `.dsoc-stat-card` - Statistics display cards

## Environment Variables

No additional environment variables needed. Uses existing:

```env
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

## Development

1. All DSOC pages are in `/app/dsoc/`
2. Models are in `/models/` with `DSOC` prefix
3. APIs are in `/api/dsoc/`
4. Styles are in `/app/dsoc/styles.css`

## Discord Integration

Projects have fields for Discord channel and category IDs. Communication is expected to happen on Discord, keeping the platform lightweight.

## Future Enhancements

- [ ] Stipend management system
- [ ] Certificate generation
- [ ] Progress tracking with evaluations
- [ ] Mentor matching algorithm
- [ ] Public project showcase
- [ ] Statistics and analytics dashboard
