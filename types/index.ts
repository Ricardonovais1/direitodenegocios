export interface PracticeArea {
  _id: string
  number: string
  title: string
  slug?: string
  description: string
}

export interface PracticeAreaFull extends PracticeArea {
  fullContent?: unknown[]
  coverImage?: SanityImage
  seo?: PageSEO
}

export interface FAQ {
  _id: string
  question: string
  answer: string
}

export interface Stat {
  value: string
  label: string
}

export interface HeroHighlight {
  value: string
  label: string
}

export interface Feature {
  title: string
  description: string
}

export interface ProcessStep {
  step: string
  title: string
  description: string
}

export interface Award {
  title: string
  organization: string
  year?: string
  logo?: SanityImage
}

export interface CaseResult {
  _id: string
  highlight: string
  label: string
  description?: string
}

export interface Testimonial {
  _id: string
  name: string
  role: string
  company: string
  location: string
  quote: string
  photo?: string
}

export interface CourseModule {
  title: string
  description: string
}

export interface CourseFaq {
  question: string
  answer: string
}

export interface Course {
  _id: string
  title: string
  slug?: string
  eyebrow?: string
  headline?: string
  subheadline?: string
  shortDescription?: string
  audience?: string
  modules?: CourseModule[]
  faqs?: CourseFaq[]
  price?: string
  guarantee?: string
  bonus?: string
  order?: number
}

export interface CourseFull extends Course {
  seo?: PageSEO
}

export interface Attorney {
  _id: string
  name: string
  slug: string
  title: string
  photo?: SanityImage
  specialties?: string[]
}

export interface AttorneyFull extends Attorney {
  bio?: unknown[]
  barMemberships?: string[]
  education?: string[]
  email?: string
  phone?: string
  seo?: { description?: string }
}

export interface Post {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  coverImage?: SanityImage
  categories?: string[]
}

export interface PostFull extends Post {
  body?: unknown[]
  seo?: PageSEO
}

export interface SanityImage {
  asset: { _ref: string; _type: string }
  hotspot?: { x: number; y: number; width: number; height: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
}

export interface PageSEO {
  title?: string
  description?: string
  ogImage?: SanityImage
}

export interface SiteData {
  name: string
  phone: string
  email: string
  address: string
  tagline: string
  officeHours: string[]
  hero: {
    eyebrow: string
    heading: string
    subheading: string
    highlights: HeroHighlight[]
  }
  about: {
    heading: string
    body: string
    features: Feature[]
    photo?: string
  }
  stats: Stat[]
  practiceAreas: PracticeArea[]
  process: ProcessStep[]
  testimonials: Testimonial[]
  faqs: FAQ[]
  awards?: Award[]
  caseResults?: CaseResult[]
  courses?: Course[]
  secondCta?: {
    heading: string
    body: string
  }
  footer: {
    disclaimer: string
  }
  seo?: {
    title?: string
    description?: string
    ogImage?: SanityImage
  }
}
