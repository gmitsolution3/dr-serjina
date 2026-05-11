import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function BlogPage() {
  return (
    <div>
      <h3>Blog page</h3>
      <Button asChild>
        <Link href="/admin-dashboard/blogs/new">Write new</Link>
      </Button>
    </div>
  )
}
