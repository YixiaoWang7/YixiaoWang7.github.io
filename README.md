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
- `images/`: portrait and research media. `structure_ver.png` is the browser-compatible rendering of the existing PDF figure; `compositional_generalization_cube.png` is the default view of the task cube, shown when JavaScript is off. `latent-rl-prior/` holds the three task clips and posters for the Latent RL Priors card, copied unchanged from that paper's project page (`assets/videos/`, `assets/images/*-poster.webp`).
- `js/task-cube.js`: the rotatable 4 × 4 × 4 task cube on the compositional-generalization card. Its rendering (colours, translucency, edges, labels, camera) is copied from the project page's viewer, with a tighter camera fit and larger labels for the card. It switches between three training sets (4 diagonal, 16 orthogonal, all 64 tasks) using three-seed means and SDs copied from the project page's `results/data.json`. `js/vendor/three-r128.min.js` (MIT, same copy as the project page) is loaded only when the card nears the viewport.
- `js/task-videos.js`: the Door / Assembly / Pose switcher on the Latent RL Priors card. Its readouts restate the paper's demonstration-efficiency results. A clip plays only when the visitor picks a task or presses the play button, after which the native controls appear. The clips are demonstration replays, not policy evaluations, and the card says so.
- `data/YixiaoWang_CV.pdf`: the current downloadable résumé, built with Tectonic from `resume/resume-research-scientist.tex` in the `my_resume` repository (commit `291ea03`) on November 11, 2026. The existing URL is retained.
- `mipnerf/`, `mipnerf360/`, and `zipnerf/`: inherited project pages, preserved at their existing URLs.

Content is plain HTML and works without JavaScript. The task cube and the task-video switcher are the only scripts: without JavaScript the cube falls back to a static image of its default view, and the video card plays the door-lifting clip with native controls. Add papers directly to the appropriate publication section, retaining full author lists and descriptive image alt text. Keep three recent news entries visible, with the rest inside the native “Earlier updates” `details` disclosure. Demo links open the original videos on demand.

## Design direction

The introduction establishes the research perspective. A compact recent-updates section follows immediately, before the research questions and representative work. The four selected papers foreground data efficiency, compositional generalization, representation, and policy structure. The newest, Latent RL Priors, comes first. The other publications follow, grouped into conference papers, journal and workshop papers, and preprints. Warm paper, dark ink, muted green, serif headings, and open publication rows create a quiet reading experience. Fonts are supplied by the operating system.

Content was synchronized with the author-provided `2026_resume-3.pdf` on October 10, 2026; the downloadable résumé was rebuilt from its source on November 11, 2026 (see above). The résumé is the source of truth for the research profile, industry descriptions, education, publication titles, author order and contribution markers, venues, and awards. BS and MS education dates are intentionally omitted from the homepage at the author’s request. The page contains all 22 publications and preprints while retaining full author names and existing paper, project, and demo links. Featured-paper summaries use the résumé’s research descriptions; the compositional-generalization summary is shortened for the page, and the Latent RL Priors summary restates its arXiv abstract. Technical expertise and older honors remain available in the résumé. News uses year-only dates where the acceptance or award month was not supplied.

Design references: [Wenli Xiao](https://wenlixiao.com/), [Tairan He](https://tairanhe.com/), [Ran Tian](https://thomasrantian.github.io/), and [Zhengyi Luo](https://www.zhengyiluo.com/). The original site was based on [Jon Barron’s website](https://github.com/jonbarron/jonbarron_website).
