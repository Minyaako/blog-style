export const SITE = {
  origin: 'https://example.com',
  title: 'Astro Blog Style',
  name: 'Demo Author',
  author: 'Demo Author',
  id: '@demo',
  avatar: '/images/profile/avatar-geometric.svg',
  themeStorageKey: 'astro-blog-style-theme',
  description: '一个用于验证博客视觉与交互的中性演示站点。',
  lang: 'zh-CN',
  navigation: [
    { label: '首页', href: '/' },
    { label: '归档', href: '/archives' },
    { label: '项目', href: '/projects' },
    { label: '关于', href: '/about' },
    { label: '搜索', href: '/search' }
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/', icon: 'simple-icons:github' },
    { label: 'RSS', href: '/rss.xml', icon: 'lucide:rss' }
  ]
} as const
