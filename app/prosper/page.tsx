'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@rights/ui/card';
import { Button } from '@rights/ui/button';
import { Input } from '@rights/ui/input';
import { Label } from '@rights/ui/label';
import { Textarea } from '@rights/ui/textarea';
import { Badge } from '@rights/ui/badge';
import { Separator } from '@rights/ui/separator';

import { 
  FileText, 
  Users, 
  Building2, 
  Settings, 
  Link, 
  Copy, 
  Check,
  Eye,
  Download,
  Palette,
  Code,
  Globe,
  Mail,
  Calendar,
  Hash,
  Star,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  Info,
  Copyright,
  Zap,
  Shield,
  Lock,
  Leaf,
  DollarSign,
  Heart,
  Wrench,
  Database,
  Monitor,
  BarChart3,
  Cloud,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { codecraftStudioData } from '@rights/prosper-license/sample-data/codecraft-studio';
import type { IndividualAuthor, Organization, LicenseConfig } from '@rights/prosper-license/prosper-license-types';
import { licenseTypes, type LicenseType, type SampleLicense } from '@rights/prosper-license/license-types';

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, any> = {
  FileText, Code, Palette, Building2, Zap, Shield, Lock, Leaf, 
  DollarSign, Heart, Wrench, Database, Monitor, BarChart3, Cloud
};

export default function ProsperDashboard() {
  const [activeTab, setActiveTab] = useState('customize');
  const [selectedLicenseType, setSelectedLicenseType] = useState<LicenseType | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [customConfig, setCustomConfig] = useState<LicenseConfig>(codecraftStudioData.config);
  const [customAuthors, setCustomAuthors] = useState<IndividualAuthor[]>(codecraftStudioData.authors);
  const [customOrgs, setCustomOrgs] = useState<Organization[]>(codecraftStudioData.organizations);

  /**
 * Configurable API Key/Slug Generator
 * 
 * @param {string} baseId - The base string to generate from
 * @param {Object} options - Configuration options
 * @param {number} options.padLength - Total length of the generated key (default: 16)
 * @param {string} options.baseUrl - Optional base URL prefix (default: '')
 * @param {string} options.charset - Character set to use: 'alphanum', 'letters', 'numbers', 'alpha'
 * @param {string} options.separator - Separator between base and hash parts (default: '')
 * @param {boolean} options.preserveCase - Whether to preserve original case (default: false)
 * @param {number} options.baseMaxLength - Maximum length for the base part (default: 10)
 * @returns {string} Generated API key/slug
 */
const generateApiKey = (baseId, options = {} as any) => {
  const {
    padLength = 16,
    baseUrl = '',
    charset = 'alphanum',
    separator = '',
    baseMaxLength = 10
  } = options;

  // Define character sets
  const charsets = {
    alphanum: 'abcdefghijklmnopqrstuvwxyz0123456789',
    letters: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    alpha: 'abcdefghijklmnopqrstuvwxyz', // alias for letters
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    mixed: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  };

  const selectedCharset = charsets[charset] || charsets.alphanum;

  // Process base ID
  let processedBase = baseId;
  
    processedBase = processedBase.toLowerCase();
  
  // Remove characters not in the selected charset
  const charsetRegex = new RegExp(`[^${selectedCharset.replace(/[-\]\\]/g, '\\$&')}]`, 'g');
  processedBase = processedBase.replace(charsetRegex, '');
  
  // Limit base to specified length
  const baseSlug = processedBase.substring(0, baseMaxLength);

  // Generate random characters using selected charset
  const generateRandomChars = (length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += selectedCharset.charAt(Math.floor(Math.random() * selectedCharset.length));
    }
    return result;
  };

  // Calculate remaining length needed
  const separatorLength = separator.length;
  const baseLength = baseSlug.length;
  const remainingLength = padLength - baseLength - separatorLength;

  let finalKey = '';

  if (remainingLength > 0) {
    // Generate additional random characters
    const randomPart = generateRandomChars(remainingLength);
    finalKey = `${baseSlug}${separator}${randomPart}`;
  } else if (remainingLength === 0) {
    // Perfect fit
    finalKey = `${baseSlug}${separator}`;
  } else {
    // Base is too long, truncate and fill remainder
    const truncatedBase = baseSlug.substring(0, padLength - separatorLength);
    finalKey = `${truncatedBase}${separator}`;
    
    // If there's still space after separator, fill it
    const spaceLeft = padLength - finalKey.length;
    if (spaceLeft > 0) {
      finalKey += generateRandomChars(spaceLeft);
    }
  }

  // Ensure exact length
  if (finalKey.length > padLength) {
    finalKey = finalKey.substring(0, padLength);
  } else if (finalKey.length < padLength) {
    finalKey += generateRandomChars(padLength - finalKey.length);
  }

  // Add base URL if provided
  return baseUrl ? `${baseUrl}${finalKey}` : finalKey;
};

  const generateSampleLink = (sample: SampleLicense) => {
    if (typeof window === 'undefined') return '';
    const baseUrl = window.location.origin;
    const slug = generateApiKey(sample.id, {
      padLength: 16,
      baseUrl: '',
      charset: 'alphanum',
      separator: '',
      preserveCase: false,
      baseMaxLength: 10
    });
      
    return `${baseUrl}/prosper/${slug}`;
  };

  const copyToClipboard = async (text: string, linkId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(linkId);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const addAuthor = () => {
    setCustomAuthors([...customAuthors, { name: '', email: '', role: 'Contributor' }]);
  };

  const removeAuthor = (index: number) => {
    setCustomAuthors(customAuthors.filter((_, i) => i !== index));
  };

  const updateAuthor = (index: number, field: keyof IndividualAuthor, value: string) => {
    const updated = [...customAuthors];
    updated[index] = { ...updated[index], [field]: value };
    setCustomAuthors(updated);
  };

  const addOrganization = () => {
    setCustomOrgs([...customOrgs, { name: '', contact: '', role: 'Sponsor' }]);
  };

  const removeOrganization = (index: number) => {
    setCustomOrgs(customOrgs.filter((_, i) => i !== index));
  };

  const updateOrganization = (index: number, field: keyof Organization, value: string) => {
    const updated = [...customOrgs];
    updated[index] = { ...updated[index], [field]: value };
    setCustomOrgs(updated);
  };

  const generateCustomLink = () => {
    if (typeof window === 'undefined') return '';
    const baseUrl = window.location.origin;
    // Create a slug from the project name
    const projectName = customConfig.defaultProjectName || 'custom-project';
    const slug = generateApiKey(projectName, {
      padLength: 16,
      baseUrl: '',
      charset: 'alphanum',
      separator: '',
      preserveCase: false,
      baseMaxLength: 10
    });

    return `${baseUrl}/prosper/${slug}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-2 rounded-xl shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  PROSPER License Dashboard
                </h1>
                <p className="text-sm text-gray-600">Create and customize your PROSPER licenses</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* License Type Selection */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your License Type</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select from major license types to explore their features and sample configurations. Each license type offers different benefits and restrictions for your project.
            </p>
          </div>

          <div className="relative group">
            {/* Left Arrow */}
            <button 
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
              onClick={() => {
                const container = document.getElementById('license-scroll-container');
                if (container) {
                  container.scrollBy({ left: -400, behavior: 'smooth' });
                }
              }}
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>

            {/* Right Arrow */}
            <button 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110"
              onClick={() => {
                const container = document.getElementById('license-scroll-container');
                if (container) {
                  container.scrollBy({ left: 400, behavior: 'smooth' });
                }
              }}
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>

            {/* Scroll Container */}
            <div 
              id="license-scroll-container"
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {licenseTypes.map((licenseType) => {
              const Icon = iconMap[licenseType.icon];
              const isSelected = selectedLicenseType?.id === licenseType.id;
              
              return (
                <Card 
                  key={licenseType.id} 
                  className={`bg-white/80 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer flex-shrink-0 w-80 ${
                    isSelected ? 'ring-2 ring-indigo-500 shadow-2xl scale-105' : ''
                  }`}
                  onClick={() => setSelectedLicenseType(licenseType)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`bg-gradient-to-br ${licenseType.color} p-1.5 rounded-md`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {licenseType.category}
                        </Badge>
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-indigo-600" />}
                    </div>
                    <CardTitle className="text-base font-semibold text-gray-900">{licenseType.name}</CardTitle>
                    <p className="text-xs text-gray-600 line-clamp-2">{licenseType.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Key Features</h4>
                      <div className="space-y-1">
                        {licenseType.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="text-xs text-gray-600 flex items-center">
                            <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Restrictions</h4>
                      <div className="space-y-1">
                        {licenseType.restrictions.slice(0, 4).map((restriction, index) => (
                          <div key={index} className="text-xs text-gray-600 flex items-center">
                            <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
                            {restriction}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Sample Projects */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Sample Projects</h4>
                      <div className="flex flex-wrap gap-1">
                        {licenseType.samples.map((sample) => {
                          const hashlink = generateSampleLink(sample);
                          return (
                            <Badge 
                              key={sample.id}
                              variant="secondary" 
                              className="text-xs cursor-pointer hover:bg-indigo-100 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(hashlink, '_blank');
                              }}
                            >
                              Sample
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            </div>
          </div>
        </div>

        {/* Sample Licenses Section */}
        {selectedLicenseType && (
          <div className="space-y-6">



          </div>
        )}

          {/* Customize Tab */}
          <div className="space-y-6">

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Basic Configuration */}
              <Card className="bg-white/80 backdrop-blur-md border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-indigo-600" />
                    Basic Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="projectName">Project Name</Label>
                      <Input
                        id="projectName"
                        value={customConfig.defaultProjectName}
                        onChange={(e) => setCustomConfig({...customConfig, defaultProjectName: e.target.value})}
                        placeholder="My Awesome Project"
                      />
                    </div>
                    <div>
                      <Label htmlFor="appName">App Name</Label>
                      <Input
                        id="appName"
                        value={customConfig.defaultAppName}
                        onChange={(e) => setCustomConfig({...customConfig, defaultAppName: e.target.value})}
                        placeholder="My Awesome App"
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Copyright Year</Label>
                      <Input
                        id="year"
                        value={customConfig.defaultYear}
                        onChange={(e) => setCustomConfig({...customConfig, defaultYear: e.target.value})}
                        placeholder="2024"
                      />
                    </div>
                    <div>
                      <Label htmlFor="projectId">Project ID</Label>
                      <Input
                        id="projectId"
                        value={customConfig.defaultProjectId}
                        onChange={(e) => setCustomConfig({...customConfig, defaultProjectId: e.target.value})}
                        placeholder="proj_abc123"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="hashKey">Hash Key</Label>
                    <Input
                      id="hashKey"
                      value={customConfig.defaultHashKey}
                      onChange={(e) => setCustomConfig({...customConfig, defaultHashKey: e.target.value})}
                      placeholder="sha256:your-hash-here"
                    />
                  </div>
                  <div>
                    <Label htmlFor="logoUrl">Logo URL (Optional)</Label>
                    <Input
                      id="logoUrl"
                      value={customConfig.defaultLogoUrl || ''}
                      onChange={(e) => setCustomConfig({...customConfig, defaultLogoUrl: e.target.value})}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Authors Section */}
              <Card className="bg-white/80 backdrop-blur-md border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-green-600" />
                      Individual Authors
                    </div>
                    <Button size="sm" onClick={addAuthor}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Author
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {customAuthors.map((author, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Author {index + 1}</h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeAuthor(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div>
                          <Label>Name</Label>
                          <Input
                            value={author.name}
                            onChange={(e) => updateAuthor(index, 'name', e.target.value)}
                            placeholder="Full Name"
                          />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            value={author.email}
                            onChange={(e) => updateAuthor(index, 'email', e.target.value)}
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <Label>Role</Label>
                        <Input
                          value={author.role}
                          onChange={(e) => updateAuthor(index, 'role', e.target.value)}
                          placeholder="Lead Developer"
                        />
                      </div>
                    </div>
                  ))}
                  {customAuthors.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>No authors added yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Organizations Section */}
              <Card className="bg-white/80 backdrop-blur-md border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-purple-600" />
                      Organizations
                    </div>
                    <Button size="sm" onClick={addOrganization}>
                      <Plus className="h-4 w-4 mr-1" />
                      Add Organization
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {customOrgs.map((org, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Organization {index + 1}</h4>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeOrganization(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div>
                          <Label>Name</Label>
                          <Input
                            value={org.name}
                            onChange={(e) => updateOrganization(index, 'name', e.target.value)}
                            placeholder="Organization Name"
                          />
                        </div>
                        <div>
                          <Label>Contact</Label>
                          <Input
                            value={org.contact}
                            onChange={(e) => updateOrganization(index, 'contact', e.target.value)}
                            placeholder="contact@org.com"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <Label>Role</Label>
                        <Input
                          value={org.role}
                          onChange={(e) => updateOrganization(index, 'role', e.target.value)}
                          placeholder="Sponsor"
                        />
                      </div>
                    </div>
                  ))}
                  {customOrgs.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Building2 className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p>No organizations added yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Generate Custom Link */}
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Link className="h-5 w-5 mr-2 text-emerald-600" />
                  Generate Custom License Link
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-700">
                    Use this link to share your customized PROSPER license with others. The link contains all your configuration settings.
                  </p>
                  <div className="flex space-x-2">
                    <Input
                      value={generateCustomLink()}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      onClick={() => copyToClipboard(generateCustomLink(), 'custom')}
                      variant="outline"
                    >
                      {copiedLink === 'custom' ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      onClick={() => window.open(generateCustomLink(), '_blank')}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>  
  );
}