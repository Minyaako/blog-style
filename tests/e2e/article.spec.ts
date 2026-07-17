import { expect, test } from '@playwright/test'

test('technical article renders metadata, toc, code, and math', async ({ page }) => {
  await page.goto('/posts/astro-content-architecture')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('内容架构')
  await expect(page.getByRole('navigation', { name: '文章目录' })).toBeVisible()
  await expect(page.locator('pre code').first()).toBeVisible()
  await expect(page.locator('.katex').first()).toBeVisible()
  await expect(page.locator('[data-page-key]')).toHaveAttribute('data-page-key', 'sample-engineering-architecture')
})

test('sample articles use their mapped neutral SVG headers', async ({ page }) => {
  const articles = [
    ['/posts/embodied-ai-reading', '/images/posts/academic-cover.svg'],
    ['/posts/astro-content-architecture', '/images/posts/engineering-cover.svg'],
    ['/posts/july-field-notes', '/images/posts/life-cover.svg']
  ] as const

  for (const [path, cover] of articles) {
    await page.goto(path)
    await expect(page.locator('.cover img')).toHaveAttribute('src', cover)
  }
})
