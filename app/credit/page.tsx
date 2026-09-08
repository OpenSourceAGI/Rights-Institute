/**
 * @fileoverview CREDIT Page
 * 
 * Route page for the LegalChain CREDIT platform.
 * Serves as the main entry point for the Creative Commons reimagined platform.
 * 
 * @features
 * - Renders the complete CREDIT component
 * - Provides route access to LegalChain platform
 * 
 * @author vtempest
 * @version 1.0.0
 * @since 2024
 */

import React from 'react';
import CREDIT from '@rights/credit/CREDIT';

/**
 * CREDIT Page Component
 * 
 * Main page component that renders the LegalChain CREDIT platform.
 * Provides route access to the Creative Commons reimagined platform.
 * 
 * @returns {JSX.Element} The CREDIT platform page
 */
export default function CreditPage() {
  return <CREDIT />;
} 