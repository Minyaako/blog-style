import { expect, test } from '@playwright/test'

test('archive cards keep images clipped and show the game sample cover', async ({ page }) => {
  await page.goto('/archives')

  const firstCard = page.locator('[data-post-card]').first()
  await expect(firstCard.getByRole('heading')).toBeVisible()
  await expect(firstCard.getByRole('link')).toHaveAttribute('href', /\/posts\//)

  const imageRegion = firstCard.locator('[data-card-image]')
  await expect(imageRegion).toBeVisible()
  expect(await imageRegion.evaluate((element) => getComputedStyle(element).overflow)).toBe('hidden')

  const gameCard = page.locator('[data-post-card]', { hasText: '游戏文章样例：叙事体验随想' })
  await expect(gameCard.locator('[data-card-image] img')).toHaveAttribute(
    'src',
    '/images/posts/games-cover.svg'
  )
})

test('all configured domain entrances resolve', async ({ page }) => {
  for (const domain of ['academic', 'engineering', 'life', 'games']) {
    const response = await page.goto(`/domains/${domain}`)
    expect(response?.status()).toBe(200)
  }
})
