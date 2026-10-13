'use strict';

// Interactive 4 x 4 x 4 task cube for the compositional-generalization paper. Rendering
// (colours, translucency, edges, lighting, labels, camera) is copied from the project page's
// viewer, assets/js/results.js, so the two cubes look the same. Per-task success is the
// three-seed mean (and SD) from the project page's results/data.json, experiments diag_b4,
// orthogonal, and full. Cells are ordered object * 16 + receptacle * 4 + button.
(function () {
  const root = document.getElementById('task-cube');
  if (!root) return;

  const SETS = {
    diag: { train: '1000000000000000000001000000000000000000001000000000000000000001', rates: [90.0,6.7,0.0,0.0,0.0,0.0,0.0,0.0,3.3,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,83.3,0.0,0.0,0.0,0.0,0.0,0.0,0.0,3.3,0.0,0.0,3.3,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,83.3,0.0,0.0,0.0,0.0,0.0,0.0,6.7,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,76.7], sd: [10.0,5.8,0.0,0.0,0.0,0.0,0.0,0.0,5.8,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,11.5,0.0,0.0,0.0,0.0,0.0,0.0,0.0,5.8,0.0,0.0,5.8,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,15.3,0.0,0.0,0.0,0.0,0.0,0.0,5.8,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,11.5], readout: 'Held-out <strong>0.4%</strong>' },
    orth: { train: '1000010000100001010010000001001000100001100001000001001001001000', rates: [73.3,80.0,93.3,66.7,80.0,86.7,66.7,80.0,73.3,53.3,93.3,100.0,66.7,66.7,60.0,53.3,100.0,73.3,73.3,80.0,73.3,80.0,80.0,66.7,100.0,73.3,86.7,86.7,80.0,60.0,73.3,73.3,73.3,66.7,93.3,73.3,80.0,80.0,66.7,66.7,100.0,73.3,60.0,100.0,86.7,60.0,80.0,100.0,100.0,93.3,66.7,93.3,73.3,46.7,86.7,73.3,73.3,100.0,100.0,73.3,73.3,86.7,86.7,100.0], sd: [11.5,20.0,11.5,11.5,0.0,11.5,11.5,20.0,11.5,11.5,11.5,0.0,11.5,11.5,0.0,11.5,0.0,11.5,11.5,0.0,11.5,20.0,0.0,11.5,0.0,11.5,11.5,11.5,20.0,20.0,11.5,11.5,11.5,11.5,11.5,11.5,0.0,0.0,11.5,23.1,0.0,11.5,0.0,0.0,11.5,0.0,0.0,0.0,0.0,11.5,11.5,11.5,23.1,30.6,11.5,46.2,11.5,0.0,0.0,11.5,23.1,11.5,11.5,0.0], readout: 'Held-out <strong>78.2%</strong>' },
    full: { train: '1111111111111111111111111111111111111111111111111111111111111111', rates: [90.0,83.3,80.0,56.7,73.3,80.0,70.0,73.3,76.7,60.0,83.3,76.7,73.3,83.3,70.0,63.3,76.7,86.7,73.3,80.0,86.7,83.3,76.7,70.0,90.0,63.3,83.3,83.3,66.7,76.7,83.3,93.3,80.0,90.0,100.0,70.0,86.7,80.0,66.7,63.3,93.3,90.0,86.7,83.3,76.7,66.7,80.0,73.3,90.0,90.0,83.3,96.7,73.3,63.3,90.0,73.3,70.0,83.3,66.7,80.0,86.7,66.7,90.0,76.7], sd: [10.0,5.8,0.0,5.8,15.3,20.0,10.0,25.2,5.8,17.3,5.8,15.3,11.5,20.8,26.5,37.9,20.8,11.5,5.8,0.0,5.8,15.3,5.8,10.0,10.0,5.8,5.8,20.8,5.8,5.8,15.3,5.8,10.0,10.0,0.0,10.0,5.8,17.3,11.5,37.9,11.5,10.0,5.8,20.8,5.8,11.5,20.0,11.5,17.3,10.0,20.8,5.8,11.5,15.3,10.0,23.1,10.0,5.8,30.6,20.0,5.8,25.2,10.0,25.2], readout: 'All trained <strong>79.0%</strong>' },
  };

  // Three.js (about 600 kB) loads only when the card comes near the viewport.
  function load() {
    const script = document.createElement('script');
    script.src = 'js/vendor/three-r128.min.js';
    script.onload = () => {
      try {
        init();
      } catch (error) {
        console.error(error); // The static image stays in place.
      }
    };
    document.head.appendChild(script);
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { observer.disconnect(); load(); }
    }, { rootMargin: '400px' });
    observer.observe(root);
  } else {
    load();
  }

  function init() {
    const OBJECTS = ['cross', 'cube', 'cylinder', 'milk'];
    const RECS = ['bin', 'mug', 'plate', 'mug_no_handle'];
    const COLORS = ['red', 'green', 'blue', 'yellow'];

    const vp = root.querySelector('.task-cube-view');
    const cvs = vp.querySelector('canvas');
    const ttEl = root.querySelector('.task-cube-tip');
    const readout = root.querySelector('.task-cube-readout');
    const buttons = Array.from(root.querySelectorAll('[data-set]'));

    const renderer = new THREE.WebGLRenderer({ canvas: cvs, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setClearColor(0xeef1f6, 1);

    const PITCH = 1.70;
    const POS = [-1.5, -.5, .5, 1.5].map((k) => k * PITCH);
    const EDGE = 1.5 * PITCH + 1.35;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, .1, 200);
    let camR = 18, camT = -0.55, camP = 0.45;
    const AIM = -0.55;

    function render() { renderer.render(scene, camera); }

    function setCam() {
      camera.position.set(
        AIM + camR * Math.sin(camT) * Math.cos(camP),
        AIM + camR * Math.sin(camP),
        AIM + camR * Math.cos(camT) * Math.cos(camP));
      camera.lookAt(AIM, AIM, AIM);
    }

    function fitCam() {
      const vFov = camera.fov * Math.PI / 180;
      const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
      // Tighter than the viewer's fit ((EDGE + 0.9) * SQRT2) so the cube fills the small card.
      const half = (EDGE + 0.9) * 1.3;
      camR = Math.max(half / Math.tan(vFov / 2), half / Math.tan(hFov / 2));
      setCam();
    }

    function resize() {
      const w = vp.clientWidth, h = vp.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      fitCam();
      render();
    }

    scene.add(new THREE.AmbientLight(0xffffff, .88));
    const sun = new THREE.DirectionalLight(0xffffff, .28);
    sun.position.set(7, 10, 8); scene.add(sun);
    const fill = new THREE.DirectionalLight(0xaab4d0, .12);
    fill.position.set(-5, -5, -7); scene.add(fill);

    function makeLabel(text, pos, color) {
      const c = document.createElement('canvas');
      c.width = 256; c.height = 64;
      const ctx = c.getContext('2d');
      ctx.font = 'bold 28px sans-serif';
      ctx.fillStyle = color || '#33415c';
      ctx.textAlign = 'center';
      ctx.fillText(text, 128, 40);
      const tex = new THREE.CanvasTexture(c);
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: .7 }));
      // 1.5x the viewer's label size, which would be unreadable at card size.
      sp.scale.set(3.3, .825, 1);
      sp.position.copy(pos);
      scene.add(sp);
    }

    OBJECTS.forEach((o, i) => makeLabel(o, new THREE.Vector3(POS[i], -EDGE, -EDGE)));
    RECS.forEach((r, i) => makeLabel(r.replace(/_/g, ' '), new THREE.Vector3(-EDGE, POS[i], -EDGE)));
    COLORS.forEach((c, i) => makeLabel(c, new THREE.Vector3(-EDGE, -EDGE, POS[i])));
    makeLabel('Object (X)', new THREE.Vector3(0, -EDGE - .7, -EDGE), '#2c3a52');
    makeLabel('Receptacle (Y)', new THREE.Vector3(-EDGE, 0, -EDGE - .7), '#2c3a52');
    makeLabel('Button (Z)', new THREE.Vector3(-EDGE - .9, -EDGE, 0), '#2c3a52');

    const S = .86;
    const GEO = new THREE.BoxGeometry(S, S, S);
    const EGEO = new THREE.EdgesGeometry(GEO);
    const ID_HUE = [.578, .36, .70, .46];
    const OOD_HUE = [.072, .70, .82, .63];
    const SERIES_ID_TEXT = '#3f6b91';
    const SERIES_OOD_TEXT = '#b9702f';

    function cellColor(isId, rate) {
      const h = isId ? ID_HUE : OOD_HUE;
      const c = new THREE.Color();
      c.setHSL(h[0], h[1], h[2] + (h[3] - h[2]) * rate / 100);
      return c.getHex();
    }

    function cellOpacity(isId) { return isId ? .78 : .50; }

    const blocks = [];
    let setKey = 'orth';

    function buildBlocks() {
      blocks.forEach((b) => { scene.remove(b.mesh); scene.remove(b.lines); b.mesh.material.dispose(); b.lines.material.dispose(); });
      blocks.length = 0;
      const set = SETS[setKey];
      for (let i = 0; i < 64; i++) {
        const isId = set.train[i] === '1';
        const col = cellColor(isId, set.rates[i]);
        const op = cellOpacity(isId);
        const mesh = new THREE.Mesh(GEO, new THREE.MeshLambertMaterial({
          color: col, transparent: true, opacity: op,
          side: THREE.DoubleSide, depthWrite: false,
        }));
        mesh.position.set(POS[Math.floor(i / 16)], POS[Math.floor(i / 4) % 4], POS[i % 4]);
        mesh.renderOrder = 1;
        const lines = new THREE.LineSegments(EGEO, new THREE.LineBasicMaterial({
          color: col, transparent: true, opacity: Math.min(.85, op + .2),
        }));
        lines.position.copy(mesh.position);
        lines.renderOrder = 2;
        mesh.userData.index = i;
        scene.add(mesh); scene.add(lines);
        blocks.push({ mesh, lines, index: i, isId, baseCol: col, baseOp: op });
      }
    }

    function selectSet(key) {
      setKey = key;
      buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.set === key)));
      readout.innerHTML = SETS[key].readout;
      hovBlk = null;
      ttEl.style.display = 'none';
      buildBlocks();
      render();
    }

    const RC = new THREE.Raycaster();
    const NDC = new THREE.Vector2();

    function rayHit(ex, ey) {
      const r = cvs.getBoundingClientRect();
      NDC.x = ((ex - r.left) / r.width) * 2 - 1;
      NDC.y = -((ey - r.top) / r.height) * 2 + 1;
      RC.setFromCamera(NDC, camera);
      const hits = RC.intersectObjects(blocks.map((b) => b.mesh));
      return hits.length ? blocks[hits[0].object.userData.index] : null;
    }

    let hovBlk = null;
    function setHover(b) {
      if (b === hovBlk) return;
      if (hovBlk) {
        hovBlk.lines.material.color.setHex(hovBlk.baseCol);
        hovBlk.lines.material.opacity = Math.min(.85, hovBlk.baseOp + .2);
      }
      hovBlk = b;
      if (b) { b.lines.material.color.setHex(0x111418); b.lines.material.opacity = 1; }
      render();
    }

    function showTooltip(blk, ex, ey) {
      if (!blk) { ttEl.style.display = 'none'; setHover(null); return; }
      setHover(blk);
      const set = SETS[setKey], i = blk.index;
      const task = OBJECTS[Math.floor(i / 16)] + ' into ' + RECS[Math.floor(i / 4) % 4].replace(/_/g, ' ') + ' press ' + COLORS[i % 4];
      const idLabel = blk.isId
        ? '<span class="tt-id" style="color:' + SERIES_ID_TEXT + '">Trained on this task</span>'
        : '<span class="tt-id" style="color:' + SERIES_OOD_TEXT + '">Held out &mdash; never trained on</span>';
      ttEl.innerHTML = '<div class="tt-task">' + task + '</div>'
        + '<div>' + idLabel + '</div>'
        + '<div><span class="tt-label">Success:</span> ' + set.rates[i].toFixed(1) + '% (sd ' + set.sd[i].toFixed(1) + ')</div>'
        + '<div class="tt-bar" style="width:' + Math.max(2, set.rates[i]) + '%;background:' + (blk.isId ? SERIES_ID_TEXT : SERIES_OOD_TEXT) + '"></div>';
      ttEl.style.display = 'block';
      const rect = cvs.getBoundingClientRect();
      let tx = ex - rect.left + 12, ty = ey - rect.top + 12;
      if (tx + ttEl.offsetWidth > rect.width) tx = Math.max(0, ex - rect.left - ttEl.offsetWidth - 12);
      if (ty + ttEl.offsetHeight > rect.height) ty = Math.max(0, ey - rect.top - ttEl.offsetHeight - 12);
      ttEl.style.left = tx + 'px'; ttEl.style.top = ty + 'px';
    }

    // Drag to orbit, as in the viewer; hover (or tap) to inspect a task. Wheel zoom is left
    // out so the page scrolls normally over the card.
    let drag = null;
    cvs.addEventListener('pointerdown', (e) => {
      drag = { x: e.clientX, y: e.clientY, dist: 0 };
      cvs.setPointerCapture(e.pointerId);
    });
    cvs.addEventListener('pointermove', (e) => {
      if (drag) {
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        drag.dist += Math.abs(dx) + Math.abs(dy);
        drag.x = e.clientX; drag.y = e.clientY;
        if (drag.dist < 4) return;
        camT -= dx * .011; camP += dy * .011;
        camP = Math.max(-1.3, Math.min(1.3, camP));
        setCam();
        ttEl.style.display = 'none';
        render();
      } else if (e.pointerType === 'mouse') {
        showTooltip(rayHit(e.clientX, e.clientY), e.clientX, e.clientY);
      }
    });
    cvs.addEventListener('pointerup', (e) => {
      if (drag && drag.dist < 4) showTooltip(rayHit(e.clientX, e.clientY), e.clientX, e.clientY);
      drag = null;
    });
    cvs.addEventListener('pointercancel', () => { drag = null; });
    cvs.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'mouse' && !drag) showTooltip(null);
    });
    cvs.addEventListener('keydown', (e) => {
      const step = { ArrowLeft: [.17, 0], ArrowRight: [-.17, 0], ArrowUp: [0, -.17], ArrowDown: [0, .17] }[e.key];
      if (!step) return;
      e.preventDefault();
      camT += step[0];
      camP = Math.max(-1.3, Math.min(1.3, camP + step[1]));
      setCam();
      render();
    });
    buttons.forEach((button) => button.addEventListener('click', () => selectSet(button.dataset.set)));

    // Legend swatches use the viewer's colours at 80% success.
    root.querySelector('.swatch.trained').style.background = '#' + cellColor(true, 80).toString(16).padStart(6, '0');
    root.querySelector('.swatch.held').style.background = '#' + cellColor(false, 80).toString(16).padStart(6, '0');

    root.classList.add('is-interactive');
    root.querySelectorAll('[hidden]').forEach((el) => { el.hidden = false; });
    setCam();
    selectSet(setKey);
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(vp);
    else window.addEventListener('resize', resize);
    resize();
  }
})();
