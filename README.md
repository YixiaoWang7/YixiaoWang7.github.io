# Yixiao Wang’s personal website

A static academic website for research in robot learning. Published with GitHub Pages at <https://yixiaowang7.github.io/>.

## Preview

No dependencies or build step are required:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open <http://localhost:8000>. You can also open `index.html` directly.

## Structure and maintenance

- `index.html`: introduction, recent updates, research perspective, selected work, additional publications, and contact.
- `stylesheet.css`: responsive layout, typography, keyboard focus, and print styles. No motion effects or autoplay.
- `images/`: portrait and research media. `structure_ver.png` is the browser-compatible rendering of the existing PDF figure.
- `data/YixiaoWang_CV.pdf`: the original downloadable CV.
- `mipnerf/`, `mipnerf360/`, and `zipnerf/`: inherited project pages, preserved at their existing URLs.

Content is plain HTML and works without JavaScript. Add papers directly to the appropriate publication section, retaining full author lists and descriptive image alt text. Keep three recent news entries visible, with the rest inside the native “Earlier updates” `details` disclosure. Demo links open the original videos on demand.

## Design direction

The introduction establishes the research perspective. A compact recent-updates section follows immediately, before the research questions and representative work. The three selected papers foreground generalization, representation, and policy structure. The other publications remain accessible immediately below. Warm paper, dark ink, muted green, serif headings, and open publication rows create a quiet reading experience. Fonts are supplied by the operating system.

This pass focuses on structure and visual style. Existing biography, publication facts, and news are retained; the updated research-scientist résumé was read for context, with factual updates deferred. New framing reflects the requested emphasis on fundamental problems in learning.

Design references: [Wenli Xiao](https://wenlixiao.com/), [Tairan He](https://tairanhe.com/), [Ran Tian](https://thomasrantian.github.io/), and [Zhengyi Luo](https://www.zhengyiluo.com/). The original site was based on [Jon Barron’s website](https://github.com/jonbarron/jonbarron_website).
