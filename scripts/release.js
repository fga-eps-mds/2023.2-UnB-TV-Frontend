const { Octokit } = require('@octokit/core');
const ghReleaseAssets = require('gh-release-assets');
const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const { SONAR_URL, REPO, OWNER } = require('./consts.js');

const { TOKEN, RELEASE_MAJOR, RELEASE_MINOR, RELEASE_FIX, DEVELOP } = process.env;

const octokit = new Octokit({ auth: TOKEN });

const now = new Date();
const year = now.getFullYear().toString();
const month = (now.getMonth() + 1).toString().padStart(2, '0');
const day = now.getDate().toString().padStart(2, '0');
const hours = now.getHours().toString().padStart(2, '0');
const minutes = now.getMinutes().toString().padStart(2, '0');
const seconds = now.getSeconds().toString().padStart(2, '0');

const getLatestRelease = async () => {
  const releases = await octokit.request('GET /repos/{owner}/{repo}/releases', {
    owner: OWNER,
    repo: REPO,
  });
  if (releases?.data.length > 0) {
    return releases?.data?.[0]?.tag_name;
  }
  return '0.0.0';
};

const newTagName = async () => {
  let oldTag = await getLatestRelease();
  oldTag = oldTag.split('.');

  if (RELEASE_MAJOR === 'true') {
    const majorTagNum = parseInt(oldTag[0]) + 1;
    return `${majorTagNum}.0.0`;
  }
  if (RELEASE_MINOR === 'true') {
    const minorTagNum = parseInt(oldTag[1]) + 1;
    return `${oldTag[0]}.${minorTagNum}.0`;
  }
  if (RELEASE_FIX === 'true') {
    const fixTagNum = parseInt(oldTag[2]) + 1;
    return `${oldTag[0]}.${oldTag[1]}.${fixTagNum}`;
  }
  if (DEVELOP === 'true') {
    return `develop`;
  }
  // Caso não tenha nenhuma flag de release, é feito um release de fix
  const fixTagNum = parseInt(oldTag[2]) + 1;
  return `${oldTag[0]}.${oldTag[1]}.${fixTagNum}`;
};

const createRelease = async () => {
  const tag = await newTagName();
  const res = await octokit.request('POST /repos/{owner}/{repo}/releases', {
    owner: OWNER,
    repo: REPO,
    tag_name: tag,
    name: tag,
  });
  return [res?.data?.upload_url, tag];
};

const saveSonarFile = async (tag) => {
  const dirPath = './analytics-raw-data/';
  let filePath = `${dirPath}fga-eps-mds-${REPO}-${month}-${day}-${year}-${hours}-${minutes}-${seconds}-v${tag}.json`;
  fs.mkdirSync(dirPath);
  if(tag === 'develop') {
    filePath = `${dirPath}fga-eps-mds-${REPO}-${month}-${day}-${year}-${hours}-${minutes}-${seconds}-${tag}.json`;
  }
  await axios.get(SONAR_URL).then((res) => {
    fs.writeFileSync(filePath, JSON.stringify(res?.data));
  });
};

const uploadSonarFile = async (release) => {
  await saveSonarFile(release[1]);
  ghReleaseAssets({
    url: release[0],
    token: [TOKEN],
    assets: [
      `./analytics-raw-data/fga-eps-mds-${REPO}-${month}-${day}-${year}-${hours}-${minutes}-${seconds}-v${release[1]}.json`,
      {
        name: `fga-eps-mds-${REPO}-${month}-${day}-${year}-${hours}-${minutes}-${seconds}-v${release[1]}.json`,
        path: '',
      },
    ],
  });
};

const script = async () => {
  if(DEVELOP === 'true') {
    await saveSonarFile('develop');
    return;
  }
  const release = await createRelease();
  await uploadSonarFile(release);
};

script();
