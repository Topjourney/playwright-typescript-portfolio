import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';

const repositoryRoot = process.cwd();

function markdownFilesIn(path) {
  if (!existsSync(path)) {
    return [];
  }

  if (statSync(path).isFile()) {
    return extname(path) === '.md' ? [path] : [];
  }

  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const child = resolve(path, entry.name);
    return entry.isDirectory() ? markdownFilesIn(child) : extname(child) === '.md' ? [child] : [];
  });
}

function githubHeadingAnchors(markdown) {
  const anchors = new Set();
  const duplicates = new Map();

  for (const line of markdown.split('\n')) {
    const match = /^(?:#{1,6})\s+(.+)$/.exec(line);
    if (!match) {
      continue;
    }

    const base = match[1]
      .replace(/<[^>]+>/g, '')
      .replace(/[`*_~]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}\- ]/gu, '')
      .replace(/\s+/g, '-');
    const count = duplicates.get(base) ?? 0;
    duplicates.set(base, count + 1);
    anchors.add(count === 0 ? base : `${base}-${count}`);
  }

  return anchors;
}

const markdownFiles = [
  ...markdownFilesIn(resolve(repositoryRoot, 'README.md')),
  ...markdownFilesIn(resolve(repositoryRoot, 'CONTRIBUTING.md')),
  ...markdownFilesIn(resolve(repositoryRoot, 'docs')),
  ...markdownFilesIn(resolve(repositoryRoot, '.github')),
];

const failures = [];
let checkedLinks = 0;

for (const markdownFile of markdownFiles) {
  const markdown = readFileSync(markdownFile, 'utf8');
  const links = markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g);

  for (const link of links) {
    const rawTarget = link[1].trim().replace(/^<|>$/g, '');
    if (/^(?:https?:|mailto:)/.test(rawTarget)) {
      continue;
    }

    const [pathPart = '', fragment] = rawTarget.split('#', 2);
    const decodedPath = decodeURIComponent(pathPart);
    const targetFile = decodedPath ? resolve(dirname(markdownFile), decodedPath) : markdownFile;
    checkedLinks += 1;

    if (!existsSync(targetFile)) {
      failures.push(`${markdownFile}: missing file for ${rawTarget}`);
      continue;
    }

    if (fragment && extname(targetFile) === '.md') {
      const anchors = githubHeadingAnchors(readFileSync(targetFile, 'utf8'));
      if (!anchors.has(decodeURIComponent(fragment))) {
        failures.push(`${markdownFile}: missing heading for ${rawTarget}`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error(`Documentation validation failed:\n${failures.join('\n')}`);
  process.exit(1);
}

console.log(
  `Validated ${checkedLinks} local documentation links across ${markdownFiles.length} Markdown files.`,
);
