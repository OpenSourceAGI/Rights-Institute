import React from 'react';

/**
 * The badge row from the repository README, reused at the top of the docs
 * landing page so it's the first thing visitors see there too.
 */
const DocsBadges: React.FC = () => {
  return (
    <p className="flex flex-wrap items-center justify-center gap-2 not-prose">
      <a href="https://doi.org/10.5281/zenodo.20676952">
        <img src="https://zenodo.org/badge/DOI/10.5281/zenodo.20676952.svg" alt="DOI" />
      </a>
      <a href="https://deepwiki.com/opensourceagi/rights-institute">
        <img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki" />
      </a>
      <a href="https://rights.institute/docs">
        <img src="https://img.shields.io/badge/Docs-blue?logo=ReadTheDocs&logoColor=white" alt="Documentation" />
      </a>
      <a href="https://rights.institute/docs">
        <img src="https://img.shields.io/badge/API-blue?logo=fastapi&logoColor=white" alt="API badge" />
      </a>
      <a href="https://youtu.be/YOUR_VIDEO_ID" target="_blank" rel="noopener noreferrer">
        <img height={20} src="https://img.shields.io/badge/YouTube-red?style=for-the-badge&logo=youtube&logoColor=white" alt="YouTube" />
      </a>
      <a href="https://deploy.workers.cloudflare.com/?url=https://github.com/opensourceagi/rights-institute" target="_blank" rel="noopener noreferrer">
        <img height={24} src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare Workers" />
      </a>
      <a href="https://github.com/opensourceagi/rights-institute/discussions">
        <img alt="GitHub Stars" src="https://img.shields.io/github/stars/opensourceagi/rights-institute" />
      </a>
      <a href="https://github.com/opensourceagi/rights-institute/graphs/contributors">
        <img src="https://img.shields.io/github/commit-activity/m/opensourceagi/rights-institute" alt="Activity" />
      </a>
      <a href="https://github.com/opensourceagi/rights-institute/commits/master/">
        <img src="https://img.shields.io/github/last-commit/opensourceagi/rights-institute.svg" alt="GitHub last commit" />
      </a>
      <a href="https://stats.uptimerobot.com/V3HfCBM9de">
        <img src="https://img.shields.io/badge/Uptime-Status-brightgreen?logo=uptimerobot&logoColor=white" alt="Uptime Status" />
      </a>
      <a href="https://codecov.io/gh/opensourceagi/rights-institute">
        <img src="https://codecov.io/gh/opensourceagi/rights-institute/graph/badge.svg" alt="Coverage" />
      </a>
      <a href="https://discord.gg/SJdBqBz3tV">
        <img src="https://img.shields.io/discord/1110227955554209923.svg?label=Chat&logo=Discord&colorB=7289da&style=flat" alt="Join Discord" />
      </a>
      <a href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request">
        <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" />
      </a>
      <img src="https://img.shields.io/badge/Claude-D97757?logo=claude&logoColor=fff" alt="Claude AI" />
      <img src="https://img.shields.io/badge/Cloudflare-F38020?logo=Cloudflare&logoColor=white" alt="Cloudflare" />
      <img src="https://img.shields.io/badge/Next.js-black" alt="Next.js" />
    </p>
  );
};

export default DocsBadges;
