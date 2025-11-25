import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
})

export function markdownToHtml(markdown: string) {
    return md.render(markdown)
}