'use strict';

// Task switcher for the Latent RL Priors card. The clips and posters in images/latent-rl-prior/
// are copied unchanged from the project page (assets/videos, assets/images). The readouts restate
// the paper's demonstration-efficiency results against full-data VLA baselines. Nothing plays
// until the visitor picks a task or presses play. Without JavaScript the door clip still plays.
(function () {
  const root = document.getElementById('task-videos');
  if (!root) return;

  const TASKS = {
    door: {
      name: 'door lifting',
      readout: '<strong>10×</strong> fewer demos',
      label: 'Door lifting: a dexterous robot hand lifts a door to reveal a cube behind it',
    },
    assembly: {
      name: 'bimanual assembly',
      readout: '<strong>5×</strong> fewer demos',
      label: 'Bimanual assembly: two robot arms with dexterous hands grasp and assemble complementary parts',
    },
    pose: {
      name: 'target pose alignment',
      readout: 'Unseen object',
      label: 'Target pose alignment: a robot hand aligns an unseen blue brush to its target pose',
    },
  };

  const video = root.querySelector('video');
  const readout = root.querySelector('.task-videos-readout');
  const playButton = root.querySelector('.task-videos-play');
  const buttons = [...root.querySelectorAll('button[data-task]')];

  // The poster carries a single play button; the native controls appear once a clip has started,
  // so the control bar does not cover the small poster.
  function showControls() {
    video.controls = true;
    playButton.hidden = true;
  }

  function play() {
    showControls();
    video.play().catch(() => {}); // If playback is blocked, the native controls remain usable.
  }

  function select(task) {
    const info = TASKS[task];
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.task === task)));
    readout.innerHTML = info.readout;
    if (video.dataset.task !== task) {
      video.dataset.task = task;
      video.poster = `images/latent-rl-prior/${task}.webp`;
      video.src = `images/latent-rl-prior/${task}.mp4`; // Takes precedence over the <source> fallback.
      video.setAttribute('aria-label', info.label);
      playButton.setAttribute('aria-label', `Play ${info.name} video`);
    }
    play();
  }

  buttons.forEach((button) => button.addEventListener('click', () => select(button.dataset.task)));
  playButton.addEventListener('click', play);
  video.addEventListener('play', showControls);
  video.controls = false;
  playButton.hidden = false;
  root.querySelector('.task-videos-bar').hidden = false;
})();
