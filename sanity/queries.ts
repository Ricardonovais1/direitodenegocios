export const siteSettingsQuery = `*[_type == "siteSettings"][0]`

export const practiceAreasQuery = `*[_type == "practiceArea"] | order(order asc) {
  _id,
  number,
  title,
  "slug": slug.current,
  description
}`

export const practiceAreaBySlugQuery = `*[_type == "practiceArea" && slug.current == $slug][0] {
  _id,
  number,
  title,
  "slug": slug.current,
  description,
  fullContent,
  coverImage,
  seo
}`

export const faqsQuery = `*[_type == "faq"] | order(order asc) {
  _id,
  question,
  answer
}`

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
  _id,
  name,
  role,
  company,
  location,
  quote,
  photo
}`

export const coursesQuery = `*[_type == "course"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  eyebrow,
  headline,
  subheadline,
  shortDescription,
  audience,
  modules,
  faqs,
  price,
  guarantee,
  bonus
}`

export const courseBySlugQuery = `*[_type == "course" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  eyebrow,
  headline,
  subheadline,
  shortDescription,
  audience,
  modules,
  faqs,
  price,
  guarantee,
  bonus,
  seo
}`

export const attorneysQuery = `*[_type == "attorney"] | order(order asc) {
  _id,
  name,
  "slug": slug.current,
  title,
  photo,
  specialties
}`

export const attorneyBySlugQuery = `*[_type == "attorney" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  title,
  photo,
  bio,
  specialties,
  barMemberships,
  education,
  email,
  phone,
  seo
}`

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  coverImage,
  categories
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  coverImage,
  body,
  categories,
  seo
}`

export const caseResultsQuery = `*[_type == "caseResult"] | order(order asc) {
  _id,
  highlight,
  label,
  description
}`

export const allSlugsQuery = `{
  "practiceAreas": *[_type == "practiceArea" && defined(slug.current)]{ "slug": slug.current },
  "attorneys": *[_type == "attorney" && defined(slug.current)]{ "slug": slug.current },
  "posts": *[_type == "post" && defined(slug.current)]{ "slug": slug.current, publishedAt },
  "courses": *[_type == "course" && defined(slug.current)]{ "slug": slug.current }
}`
