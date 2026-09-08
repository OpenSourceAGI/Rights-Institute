export interface LicenseType {
  id: string;
  name: string;
  description: string;
  category: 'Open Source' | 'Commercial' | 'Proprietary' | 'Creative Commons' | 'Custom';
  icon: string;
  color: string;
  features: string[];
  restrictions: string[];
  useCases: string[];
  samples: SampleLicense[];
}

export interface SampleLicense {
  id: string;
  name: string;
  description: string;
  projectType: string;
  icon: string;
  params: Record<string, string>;
}

export const licenseTypes: LicenseType[] = [
  {
    id: 'prosper',
    name: 'PROSPER License',
    description: 'Publishing Rights of Open Source for Public & Enterprise Review - A modern license with blockchain-based attribution and dual licensing structure.',
    category: 'Open Source',
    icon: 'FileText',
    color: 'from-indigo-600 to-purple-600',
    features: [
      'Blockchain-based attribution tracking',
      'Dual licensing structure',
      'Automatic credit distribution',
      'Patent protection',
      'Commercial-friendly terms'
    ],
    restrictions: [
      'Must maintain attribution records',
      'Credit system compliance required'
    ],
    useCases: [
      'Software libraries and frameworks',
      'Open source projects with commercial components',
      'Projects requiring detailed attribution tracking'
    ],
    samples: [
      {
        id: 'codecraft-studio',
        name: 'CodeCraft Studio',
        description: 'Full-stack development studio with React, Node.js, and cloud architecture',
        projectType: 'Development',
        icon: 'Code',
        params: {
          year: '2024',
          fullname: 'Jane Developer',
          contact: 'jane@example.com',
          project: 'CodeCraft Studio',
          projectId: 'proj_abc123def456',
          hash: 'sha256:a1b2c3d4e5f6789012345678901234567890abcdef',
          appName: 'CodeCraft Studio',
          authors: JSON.stringify([
            { name: 'Jane Developer', email: 'jane@example.com', role: 'Lead Developer' },
            { name: 'Alex Chen', email: 'alex@designstudio.com', role: 'UI/UX Designer' }
          ]),
          orgs: JSON.stringify([
            { name: 'TechCorp Solutions', contact: 'opensource@techcorp.com', role: 'Sponsor' }
          ])
        }
      },
      {
        id: 'design-system',
        name: 'Design System Framework',
        description: 'Comprehensive design system for enterprise applications',
        projectType: 'Design',
        icon: 'Palette',
        params: {
          year: '2024',
          fullname: 'Alex Chen',
          contact: 'alex@designstudio.com',
          project: 'Design System Framework',
          projectId: 'proj_design_sys_789',
          hash: 'sha256:design123system456framework789xyz',
          appName: 'Design System Framework',
          authors: JSON.stringify([
            { name: 'Alex Chen', email: 'alex@designstudio.com', role: 'Creative Designer & Researcher' }
          ]),
          orgs: JSON.stringify([])
        }
      },
      {
        id: 'enterprise-platform',
        name: 'Enterprise Platform',
        description: 'Comprehensive business management platform',
        projectType: 'Enterprise',
        icon: 'Building2',
        params: {
          year: '2024',
          fullname: 'TechCorp Solutions',
          contact: 'opensource@techcorp.com',
          project: 'Enterprise Platform',
          projectId: 'proj_enterprise_456',
          hash: 'sha256:enterprise123platform456business789',
          appName: 'Enterprise Platform',
          authors: JSON.stringify([]),
          orgs: JSON.stringify([
            { name: 'TechCorp Solutions', contact: 'opensource@techcorp.com', role: 'Sponsor' }
          ])
        }
      }
    ]
  },
  {
    id: 'mit',
    name: 'MIT License',
    description: 'A permissive license that allows for maximum freedom while requiring only that the license and copyright notice be preserved.',
    category: 'Open Source',
    icon: 'Zap',
    color: 'from-green-600 to-emerald-600',
    features: [
      'Very permissive',
      'Commercial use allowed',
      'Modification allowed',
      'Distribution allowed',
      'Minimal restrictions'
    ],
    restrictions: [
      'Must include license and copyright notice',
      'No warranty provided'
    ],
    useCases: [
      'Personal projects',
      'Small libraries',
      'Quick prototypes',
      'Educational software'
    ],
    samples: [
      {
        id: 'react-component',
        name: 'React Component Library',
        description: 'Reusable React components for modern web applications',
        projectType: 'Frontend',
        icon: 'Code',
        params: {
          year: '2024',
          fullname: 'React Developer',
          contact: 'dev@reactlib.com',
          project: 'React Component Library',
          projectId: 'react_comp_lib_001',
          hash: 'sha256:react123component456library789',
          appName: 'React Component Library'
        }
      },
      {
        id: 'utility-tools',
        name: 'Utility Tools Package',
        description: 'Collection of helpful utility functions for JavaScript development',
        projectType: 'Utilities',
        icon: 'Wrench',
        params: {
          year: '2024',
          fullname: 'Tool Developer',
          contact: 'tools@devutils.com',
          project: 'Utility Tools Package',
          projectId: 'utils_pkg_002',
          hash: 'sha256:utility123tools456package789',
          appName: 'Utility Tools Package'
        }
      }
    ]
  },
  {
    id: 'apache-2',
    name: 'Apache License 2.0',
    description: 'A permissive license that provides an express grant of patent rights from contributors to users.',
    category: 'Open Source',
    icon: 'Shield',
    color: 'from-red-600 to-orange-600',
    features: [
      'Patent protection',
      'Commercial use allowed',
      'Modification allowed',
      'Distribution allowed',
      'Trademark protection'
    ],
    restrictions: [
      'Must include license and copyright notice',
      'Must state changes made',
      'Must include NOTICE file if present'
    ],
    useCases: [
      'Enterprise software',
      'Large open source projects',
      'Projects with patent concerns',
      'Commercial applications'
    ],
    samples: [
      {
        id: 'big-data-platform',
        name: 'Big Data Processing Platform',
        description: 'Scalable data processing and analytics platform',
        projectType: 'Data Science',
        icon: 'Database',
        params: {
          year: '2024',
          fullname: 'Data Corp',
          contact: 'opensource@datacorp.com',
          project: 'Big Data Platform',
          projectId: 'big_data_platform_001',
          hash: 'sha256:bigdata123platform456processing789',
          appName: 'Big Data Processing Platform'
        }
      }
    ]
  },
  {
    id: 'gpl-3',
    name: 'GNU GPL v3.0',
    description: 'A copyleft license that ensures the software remains free and open source.',
    category: 'Open Source',
    icon: 'Lock',
    color: 'from-blue-600 to-cyan-600',
    features: [
      'Copyleft protection',
      'Source code must be shared',
      'Derivative works must be GPL',
      'Commercial use allowed',
      'Strong community protection'
    ],
    restrictions: [
      'Must share source code',
      'Derivative works must be GPL',
      'Must include license text',
      'Must state changes made'
    ],
    useCases: [
      'Free software projects',
      'Community-driven development',
      'Projects requiring source sharing',
      'Educational software'
    ],
    samples: [
      {
        id: 'open-source-os',
        name: 'Open Source Operating System',
        description: 'Community-driven operating system for modern computing',
        projectType: 'System',
        icon: 'Monitor',
        params: {
          year: '2024',
          fullname: 'Open Source Community',
          contact: 'community@opensource.org',
          project: 'Open Source OS',
          projectId: 'open_source_os_001',
          hash: 'sha256:opensource123os456community789',
          appName: 'Open Source Operating System'
        }
      }
    ]
  },
  {
    id: 'bsd-3',
    name: 'BSD 3-Clause License',
    description: 'A permissive license similar to MIT but with additional clause about advertising.',
    category: 'Open Source',
    icon: 'Leaf',
    color: 'from-green-500 to-teal-500',
    features: [
      'Very permissive',
      'Commercial use allowed',
      'Modification allowed',
      'Distribution allowed',
      'Simple terms'
    ],
    restrictions: [
      'Must include license and copyright notice',
      'Cannot use author names for endorsement',
      'No warranty provided'
    ],
    useCases: [
      'Academic projects',
      'Research software',
      'Simple libraries',
      'Quick prototypes'
    ],
    samples: [
      {
        id: 'research-tool',
        name: 'Research Analysis Tool',
        description: 'Statistical analysis tool for academic research',
        projectType: 'Research',
        icon: 'BarChart3',
        params: {
          year: '2024',
          fullname: 'Research Institute',
          contact: 'research@institute.edu',
          project: 'Research Analysis Tool',
          projectId: 'research_tool_001',
          hash: 'sha256:research123tool456analysis789',
          appName: 'Research Analysis Tool'
        }
      }
    ]
  },
  {
    id: 'commercial',
    name: 'Commercial License',
    description: 'A proprietary license for commercial software with restricted usage rights.',
    category: 'Commercial',
    icon: 'DollarSign',
    color: 'from-yellow-600 to-amber-600',
    features: [
      'Commercial protection',
      'Revenue generation',
      'Usage restrictions',
      'Support included',
      'Warranty provided'
    ],
    restrictions: [
      'No redistribution allowed',
      'No modification allowed',
      'Usage limited to license terms',
      'Must pay for usage'
    ],
    useCases: [
      'Commercial software',
      'SaaS applications',
      'Enterprise solutions',
      'Proprietary tools'
    ],
    samples: [
      {
        id: 'enterprise-saas',
        name: 'Enterprise SaaS Platform',
        description: 'Cloud-based enterprise management solution',
        projectType: 'SaaS',
        icon: 'Cloud',
        params: {
          year: '2024',
          fullname: 'Enterprise Corp',
          contact: 'sales@enterprise.com',
          project: 'Enterprise SaaS Platform',
          projectId: 'enterprise_saas_001',
          hash: 'sha256:enterprise123saas456platform789',
          appName: 'Enterprise SaaS Platform'
        }
      }
    ]
  },
  {
    id: 'creative-commons',
    name: 'Creative Commons',
    description: 'A family of licenses for creative works, allowing various levels of sharing and modification.',
    category: 'Creative Commons',
    icon: 'Heart',
    color: 'from-pink-600 to-rose-600',
    features: [
      'Creative work protection',
      'Flexible sharing options',
      'Attribution requirements',
      'Non-commercial options',
      'Share-alike options'
    ],
    restrictions: [
      'Must attribute original author',
      'May have commercial restrictions',
      'May require share-alike terms'
    ],
    useCases: [
      'Creative content',
      'Educational materials',
      'Art and design',
      'Documentation'
    ],
    samples: [
      {
        id: 'design-assets',
        name: 'Design Asset Library',
        description: 'Collection of reusable design elements and templates',
        projectType: 'Design',
        icon: 'Palette',
        params: {
          year: '2024',
          fullname: 'Creative Designer',
          contact: 'design@creative.com',
          project: 'Design Asset Library',
          projectId: 'design_assets_001',
          hash: 'sha256:design123assets456library789',
          appName: 'Design Asset Library'
        }
      }
    ]
  }
]; 