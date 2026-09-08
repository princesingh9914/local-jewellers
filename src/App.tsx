import React, { useState, useEffect, useCallback } from 'react';
import { AppView, Vendor } from './types';
import { storageService } from './services/storage';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { PublicStorefront } from './components/store/PublicStorefront';
import { VendorDashboard } from './components/vendor/VendorDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { PolicyPage } from './components/policies/PolicyPage';
import { PolicyType } from './types';
import { MasterAdminBar } from './components/common/MasterAdminBar';
import { AdminAccessModal } from './components/common/AdminAccessModal';
import { CreateStoreModal } from './components/common/CreateStoreModal';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>({ type: 'landing' });
  const [activeVendor, setActiveVendor] = useState<Vendor | undefined>(undefined);
  const [isMasterAdmin, setIsMasterAdmin] = useState<boolean>(() => storageService.isMasterAdmin());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isCreateStoreModalOpen, setIsCreateStoreModalOpen] = useState<boolean>(false);

  // Initialize view from URL if query params exist
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const storeSlug = params.get('store');
    const viewParam = params.get('view');
    const vendorIdParam = params.get('vendorId');
    const policyParam = params.get('policy') as PolicyType | null;

    if (viewParam === 'policy') {
      setCurrentView({ 
        type: 'policy', 
        policyType: (policyParam || 'privacy') as PolicyType,
        vendorSlug: storeSlug || undefined
      });
    } else if (storeSlug) {
      setCurrentView({ type: 'store', vendorSlug: storeSlug });
    } else if (viewParam === 'admin') {
      setCurrentView({ type: 'admin' });
      setIsMasterAdmin(true);
      storageService.setMasterAdmin(true);
    } else if (viewParam === 'vendor') {
      const defaultVendor = storageService.getVendors()[0];
      setCurrentView({ type: 'vendor', vendorId: vendorIdParam || defaultVendor?.id || 'vendor_rajwada' });
    }
  }, []);

  // Keyboard shortcut: Alt+A or Ctrl+Shift+A for Admin shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        if (storageService.isMasterAdmin()) {
          handleNavigate({ type: 'admin' });
        } else {
          setIsAuthModalOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update active vendor when view changes to store or policy
  useEffect(() => {
    if (currentView.type === 'store') {
      const v = storageService.getVendorBySlug(currentView.vendorSlug);
      setActiveVendor(v);
    } else if (currentView.type === 'policy' && currentView.vendorSlug) {
      const v = storageService.getVendorBySlug(currentView.vendorSlug);
      setActiveVendor(v);
    } else if (currentView.type === 'vendor') {
      const v = storageService.getVendorById(currentView.vendorId);
      setActiveVendor(v);
    } else {
      setActiveVendor(undefined);
    }
  }, [currentView]);

  const handleNavigate = (view: AppView) => {
    if (view.type === 'admin') {
      setIsMasterAdmin(true);
      storageService.setMasterAdmin(true);
    }

    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update query string for easy sharing / reload
    const url = new URL(window.location.href);
    if (view.type === 'store') {
      url.searchParams.set('store', view.vendorSlug);
      url.searchParams.delete('view');
      url.searchParams.delete('vendorId');
      url.searchParams.delete('policy');
    } else if (view.type === 'policy') {
      url.searchParams.set('view', 'policy');
      url.searchParams.set('policy', view.policyType);
      if (view.vendorSlug) {
        url.searchParams.set('store', view.vendorSlug);
      } else {
        url.searchParams.delete('store');
      }
      url.searchParams.delete('vendorId');
    } else if (view.type === 'admin') {
      url.searchParams.set('view', 'admin');
      url.searchParams.delete('store');
      url.searchParams.delete('vendorId');
      url.searchParams.delete('policy');
    } else if (view.type === 'vendor') {
      url.searchParams.set('view', 'vendor');
      url.searchParams.set('vendorId', view.vendorId);
      url.searchParams.delete('store');
      url.searchParams.delete('policy');
    } else {
      url.searchParams.delete('store');
      url.searchParams.delete('view');
      url.searchParams.delete('vendorId');
      url.searchParams.delete('policy');
    }
    window.history.replaceState({}, '', url.toString());
  };

  // Check if current view is a vendor's website (storefront or vendor-specific policy page)
  const isVendorWebsite = currentView.type === 'store' || (currentView.type === 'policy' && !!currentView.vendorSlug);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1915]">
      {/* Vendor website has strictly no Admin Topbar as requested */}

      {/* Top Auspicious & Navigation Bar - Hidden on Vendor's Website */}
      {!isVendorWebsite && (
        <Header
          currentView={currentView}
          onNavigate={handleNavigate}
          activeVendor={activeVendor}
          onOpenAdminAccess={() => setIsAuthModalOpen(true)}
          onOpenCreateStore={() => setIsCreateStoreModalOpen(true)}
        />
      )}

      {/* Main View Container */}
      <main className="flex-1">
        {currentView.type === 'landing' && (
          <LandingPage 
            onNavigate={handleNavigate} 
            onOpenCreateStore={() => setIsCreateStoreModalOpen(true)}
            onOpenAdminAccess={() => setIsAuthModalOpen(true)}
          />
        )}

        {currentView.type === 'store' && (
          <PublicStorefront
            vendorSlug={currentView.vendorSlug}
            onNavigate={handleNavigate}
            onOpenAdminAccess={() => setIsAuthModalOpen(true)}
          />
        )}

        {currentView.type === 'vendor' && (
          <VendorDashboard
            vendorId={currentView.vendorId}
            onNavigate={handleNavigate}
          />
        )}

        {currentView.type === 'admin' && (
          <AdminDashboard onNavigate={handleNavigate} />
        )}

        {currentView.type === 'policy' && (
          <PolicyPage 
            policyType={currentView.policyType}
            vendorSlug={currentView.vendorSlug}
            onNavigate={handleNavigate}
            onOpenAdminAccess={() => setIsAuthModalOpen(true)}
          />
        )}
      </main>

      {/* Global Indian Theme Footer - Hidden on Vendor's Website */}
      {!isVendorWebsite && (
        <Footer onNavigate={handleNavigate} />
      )}

      {/* Master Admin & Staff Authentication Modal */}
      <AdminAccessModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        activeVendor={activeVendor}
        onNavigate={handleNavigate}
        onAdminAuthenticated={() => setIsMasterAdmin(true)}
      />

      {/* Create Jewellery Store Modal */}
      <CreateStoreModal
        isOpen={isCreateStoreModalOpen}
        onClose={() => setIsCreateStoreModalOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
