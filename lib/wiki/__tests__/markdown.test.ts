import { describe, it, expect } from 'vitest'
import { transformWikiLinks, transformWikiStyleLinks, processMarkdown, extractExcerpt, stripLeadingH1 } from '../markdown'

describe('markdown', () => {
  describe('transformWikiLinks', () => {
    it('converts absolute wiki URLs to internal /docs/ routes', () => {
      const input = '[Setup Guide](https://github.com/gfargo/doorman/wiki/Getting-Started)'
      const result = transformWikiLinks(input)
      expect(result).toBe('[Setup Guide](/docs/getting-started)')
    })

    it('leaves unrecognised wiki URLs as-is', () => {
      const input = '[Unknown](https://github.com/gfargo/doorman/wiki/Unknown-Page)'
      const result = transformWikiLinks(input)
      expect(result).toBe(input)
    })

    it('leaves non-wiki URLs untouched', () => {
      const input = '[Google](https://google.com)'
      const result = transformWikiLinks(input)
      expect(result).toBe(input)
    })

    it('handles multiple wiki links in one string', () => {
      const input =
        'See [Getting Started](https://github.com/gfargo/doorman/wiki/Getting-Started) and [Config](https://github.com/gfargo/doorman/wiki/Configuration).'
      const result = transformWikiLinks(input)
      expect(result).toContain('/docs/getting-started')
      expect(result).toContain('/docs/configuration')
    })
  })

  describe('transformWikiStyleLinks', () => {
    it('converts [[Page Title]] to internal links', () => {
      const input = 'See [[Getting Started]] for setup.'
      const result = transformWikiStyleLinks(input)
      expect(result).toBe('See [Getting Started](/docs/getting-started) for setup.')
    })

    it('matches by wikiPath when title does not match', () => {
      const input = 'See [[Commands-Overview]] for details.'
      const result = transformWikiStyleLinks(input)
      expect(result).toContain('/docs/commands-overview')
    })

    it('leaves unrecognised [[links]] as-is', () => {
      const input = 'See [[Unknown Page]] for details.'
      const result = transformWikiStyleLinks(input)
      expect(result).toBe(input)
    })
  })

  describe('processMarkdown', () => {
    it('strips the leading H1', () => {
      const input = '# Commands Overview\n\nSome content here.'
      const result = processMarkdown(input)
      expect(result).not.toContain('# Commands Overview')
      expect(result).toContain('Some content here.')
    })

    it('only strips the first H1, not subsequent ones', () => {
      const input = '# First Title\n\nContent.\n\n# Second Title\n\nMore content.'
      const result = processMarkdown(input)
      expect(result).not.toMatch(/^#\s+First Title/)
      expect(result).toContain('# Second Title')
    })

    it('transforms both link types by default', () => {
      const input = '[[Getting Started]] and [Config](https://github.com/gfargo/doorman/wiki/Configuration)'
      const result = processMarkdown(input)
      expect(result).toContain('/docs/getting-started')
      expect(result).toContain('/docs/configuration')
    })

    it('skips link transformation when disabled', () => {
      const input = '[[Getting Started]]'
      const result = processMarkdown(input, { transformLinks: false })
      expect(result).toBe(input)
    })
  })

  describe('stripLeadingH1', () => {
    it('removes the first H1 heading', () => {
      const input = '# Getting Started\n\nSome content.'
      expect(stripLeadingH1(input)).toBe('Some content.')
    })

    it('handles leading whitespace before H1', () => {
      const input = '  # Title\n\nContent.'
      expect(stripLeadingH1(input)).toBe('Content.')
    })

    it('leaves content without H1 untouched', () => {
      const input = '## Subheading\n\nContent.'
      expect(stripLeadingH1(input)).toBe(input)
    })

    it('only removes the first H1', () => {
      const input = '# First\n\n# Second\n\nContent.'
      const result = stripLeadingH1(input)
      expect(result).not.toContain('# First')
      expect(result).toContain('# Second')
    })

    it('strips trailing blank lines after the H1', () => {
      const input = '# Title\n\n\n\nContent.'
      expect(stripLeadingH1(input)).toBe('Content.')
    })
  })

  describe('extractExcerpt', () => {
    it('extracts the first prose paragraph', () => {
      const content = `# Title

Some description text here.

## Another heading
`
      const result = extractExcerpt(content)
      expect(result).toBe('Some description text here.')
    })

    it('skips headings, lists, blockquotes, and code blocks', () => {
      const content = `# Title

## Subtitle

- list item
- another item

> blockquote

\`\`\`bash
code block
\`\`\`

This is the actual description.
`
      const result = extractExcerpt(content)
      expect(result).toBe('This is the actual description.')
    })

    it('truncates long paragraphs', () => {
      const longText = 'A'.repeat(200)
      const content = `# Title\n\n${longText}`
      const result = extractExcerpt(content, 50)
      expect(result.length).toBeLessThanOrEqual(50)
      expect(result).toContain('…')
    })

    it('returns empty string for content with no prose', () => {
      const content = `# Title

- list
- items
`
      const result = extractExcerpt(content)
      expect(result).toBe('')
    })

    it('strips markdown formatting from excerpt', () => {
      const content = `# Title

This has **bold** and [links](http://example.com) and \`code\`.
`
      const result = extractExcerpt(content)
      expect(result).not.toContain('**')
      expect(result).not.toContain('[')
      expect(result).not.toContain('`')
    })
  })
})
