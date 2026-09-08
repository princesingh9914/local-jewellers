export interface SuperAdminLoginResponse {
  success: boolean;
  token?: string;
  role?: string;
  message?: string;
  error?: string;
}

export interface VendorLoginResponse {
  success: boolean;
  token?: string;
  vendorId?: string;
  vendorName?: string;
  message?: string;
  error?: string;
}

const TOKEN_KEY_SUPER_ADMIN = 'sa_auth_token_v1';
const TOKEN_KEY_VENDOR = 'vendor_auth_token_v1';
const ACTIVE_VENDOR_ID_KEY = 'active_vendor_id_v1';

class AuthApiService {
  // -----------------------------------------------------------
  // Super Admin Authentication
  // -----------------------------------------------------------
  async loginSuperAdmin(phone: string, password: string, pin: string): Promise<SuperAdminLoginResponse> {
    try {
      const res = await fetch('/api/auth/super-admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password, pin }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.token) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(TOKEN_KEY_SUPER_ADMIN, data.token);
          localStorage.setItem('jwellers_master_admin_session_v1', 'true');
          sessionStorage.setItem('jwellers_master_admin_session_v1', 'true');
        }
        return data;
      }

      return {
        success: false,
        error: data.error || 'Authentication failed. Please verify Phone Number, Password, and PIN.',
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Unable to connect to authentication server.',
      };
    }
  }

  async verifySuperAdminSession(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    const token = sessionStorage.getItem(TOKEN_KEY_SUPER_ADMIN);
    if (!token) return false;

    try {
      const res = await fetch('/api/auth/super-admin/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        return Boolean(data.valid);
      }
      return false;
    } catch {
      // If offline or network error, fallback to session storage check
      return !!token;
    }
  }

  async logoutSuperAdmin(): Promise<void> {
    if (typeof window === 'undefined') return;
    const token = sessionStorage.getItem(TOKEN_KEY_SUPER_ADMIN);
    if (token) {
      try {
        await fetch('/api/auth/super-admin/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
      } catch {
        // ignore
      }
    }
    sessionStorage.removeItem(TOKEN_KEY_SUPER_ADMIN);
    sessionStorage.removeItem('jwellers_master_admin_session_v1');
    localStorage.removeItem('jwellers_master_admin_session_v1');
  }

  isSuperAdminLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return !!sessionStorage.getItem(TOKEN_KEY_SUPER_ADMIN) || sessionStorage.getItem('jwellers_master_admin_session_v1') === 'true';
  }

  // -----------------------------------------------------------
  // Multi-Tenant Vendor Authentication
  // -----------------------------------------------------------
  async loginVendor(phone: string, password: string, pin: string): Promise<VendorLoginResponse> {
    try {
      const res = await fetch('/api/auth/vendor/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password, pin }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.token) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(TOKEN_KEY_VENDOR, data.token);
          if (data.vendorId) {
            sessionStorage.setItem(ACTIVE_VENDOR_ID_KEY, data.vendorId);
            sessionStorage.setItem(`vendor_token_${data.vendorId}`, data.token);
          }
        }
        return data;
      }

      return {
        success: false,
        error: data.error || 'Vendor authentication failed. Incorrect Phone Number, Password, or PIN.',
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || 'Unable to connect to vendor authentication server.',
      };
    }
  }

  async verifyVendorSession(vendorId?: string): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    const targetVendorId = vendorId || sessionStorage.getItem(ACTIVE_VENDOR_ID_KEY);
    const token = targetVendorId 
      ? (sessionStorage.getItem(`vendor_token_${targetVendorId}`) || sessionStorage.getItem(TOKEN_KEY_VENDOR))
      : sessionStorage.getItem(TOKEN_KEY_VENDOR);

    if (!token) return false;

    try {
      const res = await fetch('/api/auth/vendor/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.valid) {
          if (!vendorId) return true;
          return data.vendorId === vendorId;
        }
      }
      return false;
    } catch {
      return !!token;
    }
  }

  async logoutVendor(vendorId?: string): Promise<void> {
    if (typeof window === 'undefined') return;
    const token = vendorId
      ? (sessionStorage.getItem(`vendor_token_${vendorId}`) || sessionStorage.getItem(TOKEN_KEY_VENDOR))
      : sessionStorage.getItem(TOKEN_KEY_VENDOR);

    if (token) {
      try {
        await fetch('/api/auth/vendor/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
      } catch {
        // ignore
      }
    }

    if (vendorId) {
      sessionStorage.removeItem(`vendor_token_${vendorId}`);
    }
    sessionStorage.removeItem(TOKEN_KEY_VENDOR);
    sessionStorage.removeItem(ACTIVE_VENDOR_ID_KEY);
  }

  isVendorLoggedIn(vendorId?: string): boolean {
    if (typeof window === 'undefined') return false;
    if (this.isSuperAdminLoggedIn()) return true; // Super admin has master privileges
    if (vendorId) {
      return !!sessionStorage.getItem(`vendor_token_${vendorId}`) || (sessionStorage.getItem(ACTIVE_VENDOR_ID_KEY) === vendorId && !!sessionStorage.getItem(TOKEN_KEY_VENDOR));
    }
    return !!sessionStorage.getItem(TOKEN_KEY_VENDOR);
  }

  getActiveVendorId(): string | null {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem(ACTIVE_VENDOR_ID_KEY);
  }

  // Register or update vendor credentials
  async registerVendorCredentials(
    vendorId: string, 
    vendorName: string, 
    phone: string, 
    password: string, 
    pin: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch('/api/auth/vendor/register-credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vendorId, vendorName, phone, password, pin }),
      });
      return await res.json();
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  // Fetch safe vendor hints
  async getVendorHints(): Promise<Array<{ vendorId: string; vendorName: string; phone: string }>> {
    try {
      const res = await fetch('/api/auth/vendor/hints');
      const data = await res.json();
      return data.vendors || [];
    } catch {
      return [];
    }
  }
}

export const authApi = new AuthApiService();
