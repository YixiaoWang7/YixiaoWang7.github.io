# Yixiao Wang’s personal website

A static academic website for research in robot learning. Published with GitHub Pages at <https://yixiaowang7.github.io/>.

## Preview

No dependencies or build step are required:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open <http://localhost:8000>. You can also open `index.html` directly.

## Structure and maintenance

- `index.html`: introduction, recent updates, research perspective, selected work, additional publications, background and service, and contact.
- `stylesheet.css`: responsive layout, typography, keyboard focus, and print styles. No motion effects or autoplay.
- `images/`: portrait and research media. `structure_ver.png` is the browser-compatible rendering of the existing PDF figure; `compositional_generalization.png` is an existing figure from the compositional-generalization project page.
- `data/YixiaoWang_CV.pdf`: the original downloadable CV.
- `mipnerf/`, `mipnerf360/`, and `zipnerf/`: inherited project pages, preserved at their existing URLs.

Content is plain HTML and works without JavaScript. Add papers directly to the appropriate publication section, retaining full author lists and descriptive image alt text. Keep three recent news entries visible, with the rest inside the native “Earlier updates” `details` disclosure. Demo links open the original videos on demand.

## Design direction

The introduction establishes the research perspective. A compact recent-updates section follows immediately, before the research questions and representative work. The three selected papers foreground compositional generalization, representation, and policy structure. The other publications follow, grouped into conference papers, journal and workshop papers, and preprints. Warm paper, dark ink, muted green, serif headings, and open publication rows create a quiet reading experience. Fonts are supplied by the operating system.

Content was synchronized with `resume-research-scientist.tex` on October 8, 2026: 20 publications and preprints, current research milestones, education, industry research, and professional service. Publication titles and author order follow the résumé and proceedings; full author names and additional links were checked against paper and project pages. News uses year-only dates where the acceptance or award month was not supplied. The downloadable CV PDF is intentionally unchanged while the résumé is being revised.

Design references: [Wenli Xiao](https://wenlixiao.com/), [Tairan He](https://tairanhe.com/), [Ran Tian](https://thomasrantian.github.io/), and [Zhengyi Luo](https://www.zhengyiluo.com/). The original site was based on [Jon Barron’s website](https://github.com/jonbarron/jonbarron_website).
