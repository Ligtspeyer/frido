const imageDirectory = 'Orlando Frido_Website_Bilder_1/';
const imageUrl = (filename) => imageDirectory + encodeURIComponent(filename);

const chapters = [
  { title: 'The beginning', indices: [0] },
  { title: 'Lines & creatures', indices: [1, 2, 20, 35, 36, 37] },
  { title: 'Body language', indices: [3, 9, 10] },
  { title: 'A moving canvas', indices: [4, 5, 6, 7, 8] },
  { title: 'Street stories', indices: [21, 22, 23, 24, 25, 26, 27, 28, 65] },
  { title: 'Objects in space', indices: [11, 29, 30, 38, 39, 40, 41] },
  { title: 'The room', indices: [12, 13, 16, 17, 18, 19, 64, 66, 67] },
  { title: 'The details', indices: [14, 15, 31, 32, 33] },
  { title: 'Among the ruins', indices: [34, 68, 69] },
  { title: 'In character', indices: [42, 72, 81, 94] },
  { title: 'Other forms', indices: [43, 58, 71, 73, 75, 77, 82] },
  { title: 'A second skin', indices: [44, 45, 46, 47, 76, 78, 79, 80] },
  { title: 'After hours', indices: [48, 50, 51, 56, 63, 83, 84] },
  { title: 'Between moments', indices: [49, 53, 61] },
  { title: 'Out in the open', indices: [52, 54, 55, 59, 60] },
  { title: 'Close encounters', indices: [57, 70] },
  { title: 'The transformation', indices: [62, 85, 86, 87] },
  { title: 'Doppel vision', indices: [88, 89, 90, 91] },
  { title: 'On the floor', indices: [74] },
  { title: 'Night moves', indices: [92, 93] },
];

const tileGrid = document.querySelector('#tile-grid');
const homeView = document.querySelector('#home-view');
const projectView = document.querySelector('#project-view');
const heroImage = document.querySelector('#hero-image');
const personaSwitch = document.querySelector('.persona-switch');
const aboutSwitch = document.querySelector('.about-switch');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');
const themeColor = document.querySelector('meta[name="theme-color"]');

const number = (index) => String(index + 1).padStart(2, '0');
const makeImage = (index, alt, lazy = true) => {
  const image = document.createElement('img');
  image.src = imageUrl(artworks[index]);
  image.alt = alt;
  if (lazy) image.loading = 'lazy';
  image.decoding = 'async';
  return image;
};

chapters.forEach((chapter, index) => {
  const tile = document.createElement('a');
  tile.className = 'tile';
  tile.href = `#project/${number(index)}`;
  tile.setAttribute('aria-label', `Open chapter ${number(index)}: ${chapter.title}`);
  const image = document.createElement('img');
  image.src = `thumbnails/${number(index)}.png`;
  image.alt = '';
  image.decoding = 'async';
  if (index > 7) image.loading = 'lazy';
  tile.append(image);
  const label = document.createElement('span');
  label.textContent = `${number(index)} / ${chapter.title}`;
  tile.append(label);
  tileGrid.append(tile);
});

function setPersona(dagma) {
  document.body.classList.toggle('dagma', dagma);
  personaSwitch.setAttribute('aria-pressed', String(dagma));
  personaSwitch.setAttribute('aria-label', dagma ? 'Switch to Orlando Frido mode' : 'Switch to Dagma Doppel D mode');
  personaSwitch.querySelector('.switch-label').textContent = dagma ? 'MEET ORLANDO' : 'MEET DAGMA';
  document.querySelector('.persona-name').textContent = dagma ? 'DAGMA DOPPEL D' : 'ORLANDO FRIDO';
  document.querySelector('.hero-identity').textContent = dagma ? 'DAGMA DOPPEL D / DRAG PERSONA' : 'ORLANDO FRIDO SIEBERT / ARTIST';
  document.querySelector('#hero-title').innerHTML = dagma ? 'DAGMA<br><em>DOPPEL D.</em>' : 'ART IS A<br><em>DRAG.</em>';
  document.querySelector('.tile-overlay').innerHTML = dagma
    ? '<span>DAGMA</span><span>DOPPEL</span><span>D</span>'
    : '<span>ORLANDO</span><span>FRIDO</span><span>SIEBERT</span>';
  aboutSwitch.innerHTML = dagma ? 'BACK TO ORLANDO FRIDO <span>↗</span>' : 'MEET DAGMA DOPPEL D <span>↗</span>';
  heroImage.src = dagma ? 'thumbnails/18.png' : imageUrl(artworks[13]);
  heroImage.alt = dagma ? 'Dagma Doppel D in an expressive drag look' : 'A figure in a brick-walled installation space';
  themeColor.content = dagma ? '#11100f' : '#e9e7db';
  try { localStorage.setItem('frido-persona', dagma ? 'dagma' : 'orlando'); } catch { /* Storage is optional. */ }
}

personaSwitch.addEventListener('click', () => setPersona(!document.body.classList.contains('dagma')));
aboutSwitch.addEventListener('click', () => {
  setPersona(!document.body.classList.contains('dagma'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
let savedPersona = false;
try { savedPersona = localStorage.getItem('frido-persona') === 'dagma'; } catch { /* Storage is optional. */ }
setPersona(savedPersona);

function renderProject(index) {
  const chapter = chapters[index];
  projectView.replaceChildren();

  const back = document.createElement('a');
  back.className = 'project-back';
  back.href = '#work';
  back.textContent = '← BACK TO THE WORK';

  const header = document.createElement('div');
  header.className = 'project-heading';
  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = `VISUAL CHAPTER ${number(index)} / ${chapter.indices.length} ${chapter.indices.length === 1 ? 'IMAGE' : 'IMAGES'}`;
  const title = document.createElement('h1');
  title.textContent = chapter.title;
  const intro = document.createElement('p');
  intro.className = 'project-intro';
  intro.textContent = 'A closer look into the archive of Orlando Frido Siebert / Dagma Doppel D.';
  header.append(eyebrow, title, intro);

  const gallery = document.createElement('div');
  gallery.className = 'project-gallery';
  chapter.indices.forEach((imageIndex, position) => {
    const button = document.createElement('button');
    button.className = 'artwork';
    button.type = 'button';
    button.setAttribute('aria-label', `Enlarge image ${position + 1} of ${chapter.indices.length} in ${chapter.title}`);
    const image = makeImage(imageIndex, `Artwork ${position + 1} from ${chapter.title}`);
    button.append(image);
    const label = document.createElement('span');
    label.textContent = `${number(index)} / ${String(position + 1).padStart(2, '0')} ↗`;
    button.append(label);
    button.addEventListener('click', () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.querySelector('p').textContent = `${chapter.title} / ${position + 1} of ${chapter.indices.length}`;
      lightbox.showModal();
    });
    gallery.append(button);
  });

  const next = document.createElement('a');
  next.className = 'next-project';
  next.href = `#project/${number((index + 1) % chapters.length)}`;
  next.innerHTML = `<span>NEXT CHAPTER / ${number((index + 1) % chapters.length)}</span><strong>${chapters[(index + 1) % chapters.length].title} ↗</strong>`;
  projectView.append(back, header, gallery, next);
}

function route() {
  const match = location.hash.match(/^#project\/(\d{2})$/);
  const index = match ? Number(match[1]) - 1 : -1;
  const isProject = index >= 0 && index < chapters.length;
  homeView.hidden = isProject;
  projectView.hidden = !isProject;
  if (isProject) {
    renderProject(index);
    document.title = `${chapters[index].title} / Orlando Frido Siebert`;
    window.scrollTo(0, 0);
    document.querySelector('#main').focus({ preventScroll: true });
  } else {
    document.title = 'Orlando Frido Siebert / Dagma Doppel D';
    if (location.hash === '#work' || location.hash === '#about') {
      requestAnimationFrame(() => document.querySelector(location.hash).scrollIntoView());
    } else if (location.hash === '#home') {
      window.scrollTo(0, 0);
    }
  }
}

lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
window.addEventListener('hashchange', route);
route();
