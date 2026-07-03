# alexandraclarke.media-CMS
## Product Requirements Document (PRD)

Version: 1.0
Status: Planning
Project Type: Personal Creative Portfolio Website

---

# 1. Executive Summary

alexandraclarke.media-CMS is a premium personal creative portfolio website designed to showcase cinematic storytelling, photography, filmmaking, and creative direction through an immersive interactive experience.

The website's core interaction model consists of five horizontally arranged panels that dynamically expand and collapse. Each panel represents a primary website section and functions as an independent destination within a unified experience.

The goal is to create a portfolio that feels like an interactive digital exhibition rather than a traditional website.

---

# 2. Business Objectives

## Primary Goals

- Establish a premium personal brand
- Showcase creative work
- Generate qualified enquiries
- Demonstrate design and technical excellence
- Differentiate from traditional portfolio websites

## Secondary Goals

- Increase engagement time
- Encourage portfolio exploration
- Improve lead quality
- Support future content expansion

---

# 3. Target Audience

## Primary Audience

- Brands
- Agencies
- Creative Directors
- Marketing Teams
- Event Organisers

## Secondary Audience

- Collaborators
- Production Studios
- Media Companies
- Potential Employers

---

# 4. Core Experience

The entire website exists within a horizontal panel system.

### Total Panels

1. Home
2. About
3. Portfolio
4. Testimonials
5. Contact

### Interaction Model

Inactive panels:
- 10–20% width
- Visible preview state

Active panel:
- 70–85% width
- Primary focus

Transitions:
- Smooth
- Organic
- GSAP powered

---

# 5. Information Architecture

## Home

Purpose:
Create a strong first impression.

Content:

- Showreel video
- Hero headline
- Personal tagline
- Statistics
- Primary CTA

Example Headline:

ALEXANDRA CLARKE

Example Subheading:

Creative Director, Filmmaker & Visual Storyteller

---

## About

Purpose:
Build trust and personal connection.

Content:

- Portrait
- Biography
- Experience timeline
- Creative philosophy
- Process overview
- Equipment showcase

---

## Portfolio

Purpose:
Showcase work.

Categories:

- Commercial
- Fashion
- Documentary
- Events
- Social Media
- Music Videos

Content:

- Masonry gallery
- Featured projects
- Case studies
- Video previews

---

## Testimonials

Purpose:
Provide social proof.

Content:

- Client testimonials
- Client logos
- Metrics
- Success stories

---

## Contact

Purpose:
Generate enquiries.

Content:

- Contact form
- Social links
- Email
- Location
- Availability status

---

# 6. Functional Requirements

## Navigation

Must support:

- Mouse wheel
- Trackpad
- Swipe gestures
- Keyboard navigation
- Navigation menu
- Touch interaction

### Navigation Behaviour

Selecting a section:

- Expands corresponding panel
- Collapses adjacent panels
- Updates URL state

---

# 7. Motion Design System

## Required Animations

### Panel Expansion

Smooth width interpolation.

### Typography Reveal

- Split text
- Staggered characters
- Staggered lines

### Images

- Mask reveals
- Scale transitions
- Subtle parallax

### Cursor

Custom cursor states:

- View
- Open
- Play
- Contact

---

# 8. Design System

## Visual Style

Inspired by:

- Editorial design
- Fashion magazines
- Art galleries
- Modern creative studios

## Colour Palette

Primary:
#0A0A0A

Secondary:
#F7F5F0

Accent:
Warm Gold

Support:
Neutral greys

---

# 9. Typography System

## Headings

Large editorial typography.

Characteristics:

- Bold
- High contrast
- Oversized

## Body Copy

Readable modern sans-serif.

---

# 10. Component Library

Required components:

- Header
- Navigation
- Panel container
- Hero section
- Statistics block
- Biography section
- Timeline
- Portfolio grid
- Project card
- Testimonial card
- Contact form
- CTA button
- Custom cursor
- Progress indicator

---

# 11. Technology Stack

Framework:
Next.js 15

Language:
TypeScript

Styling:
Tailwind CSS

Animations:
GSAP

Scrolling:
Lenis

3D:
Three.js
React Three Fiber

Forms:
React Hook Form
Zod

Deployment:
Vercel

---

# 12. Responsive Requirements

## Desktop

Primary experience.

## Tablet

Adaptive panel widths.

## Mobile

Panels become vertically stacked interactive cards.

Maintain same design language.

---

# 13. Accessibility Requirements

Must support:

- Keyboard navigation
- Reduced motion mode
- Semantic HTML
- ARIA labels
- Focus states
- WCAG AA compliance

---

# 14. Performance Requirements

Target Lighthouse Scores:

Performance: 95+
Accessibility: 100
Best Practices: 100
SEO: 100

Target Load Time:

Under 2 seconds.

---

# 15. SEO Requirements

Implement:

- Metadata
- Open Graph
- Twitter Cards
- Structured Data
- Sitemap
- Robots.txt

---

# 16. Analytics

Track:

- Portfolio interactions
- Panel navigation
- CTA clicks
- Form submissions
- Video engagement

Recommended:

- Google Analytics
- Plausible

---

# 17. Future Enhancements

Phase 2:

- CMS integration
- Dynamic portfolio management
- Blog
- Project filtering
- Case study builder

Phase 3:

- Client portal
- Booking system
- AI assistant
- Interactive project presentations

---

# 18. Success Metrics

Primary KPIs:

- Contact form submissions
- Average session duration
- Portfolio views
- CTA click-through rate

Secondary KPIs:

- Returning visitors
- Scroll depth
- Engagement rate

---

# Final Vision

alexandraclarke.media-CMS should feel like a premium digital exhibition that combines cinematic storytelling, editorial design, immersive motion, and world-class interaction design into a memorable personal portfolio experience.
