import { StudioClient } from '@/app/studio/StudioClient'

export const dynamic = 'force-dynamic'
export { metadata, viewport } from 'next-sanity/studio'

function SetupGuide() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 560, margin: '80px auto', padding: '0 24px', color: '#1f2933' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Sanity Studio Setup Required</h1>
      <p style={{ color: '#667085', marginBottom: 28 }}>
        No Sanity project is connected yet. Follow these steps to activate your CMS backend.
      </p>
      <ol style={{ lineHeight: 2.2, paddingLeft: 20, color: '#374151' }}>
        <li>
          Create a project at <strong>sanity.io/manage</strong> or run{' '}
          <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>npx sanity init</code>
        </li>
        <li>
          Copy <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>.env.local.example</code>
          {' '}→{' '}
          <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>.env.local</code>
        </li>
        <li>
          Fill in <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>NEXT_PUBLIC_SANITY_PROJECT_ID</code>{' '}
          and <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>NEXT_PUBLIC_SANITY_DATASET</code>
        </li>
        <li>Restart the dev server — this page becomes your full CMS</li>
      </ol>
      <p style={{ marginTop: 28, color: '#667085', fontSize: 14 }}>
        Once configured you can manage site settings, attorneys, blog posts, practice areas, case results, and more from this Studio.
      </p>
    </div>
  )
}

export default function StudioPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) return <SetupGuide />
  return <StudioClient />
}
