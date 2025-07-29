// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Language',
      items: [
        {
          type: 'doc',
          id: 'study-docs/java',
          label: 'JAVA'
        }
      ], 
    },    
    {
      type: 'category',
      label: 'Database',
      items: [
        {
          type: 'doc', // 단일 문서임을 명시
          id: 'study-docs/rdbms', // 실제 문서 경로 (ID)
          label: 'RDBMS' // 사이드바에 표시될 이름
        },
        {
          type: 'doc',
          id: 'study-docs/nosql',
          label: 'NoSQL'
        }
      ]
    },
    {
      type: 'category',
      label: 'Framework',
      items: [
        {
          type: 'doc',
          id: 'study-docs/spring',
          label: 'Spring'
        }
      ]
    },
    {
      type: 'category',
      label: 'Algorithm',
      items: [
        {
          type: 'doc',
          id: 'study-docs/algorithm_sorting',
          label: '정렬(Sorting)'
        },
        {
          type: 'doc',
          id: 'study-docs/algorithm_searching',
          label: '탐색(Searching)'
        }
      ]
    }    
  ],
};

export default sidebars;
