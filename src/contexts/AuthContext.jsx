import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase/config';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Helper function to map database fields (snake_case) to JS fields (camelCase)
function mapDbUserToProfile(dbUser) {
  if (!dbUser) return null;
  return {
    id: dbUser.id,
    email: dbUser.email,
    fullName: dbUser.full_name,
    phone: dbUser.phone,
    licenseNumber: dbUser.license_number,
    licenseExpiry: dbUser.license_expiry,
    address: dbUser.address,
    profilePicture: dbUser.profile_picture,
    favorites: dbUser.favorites || [],
    createdAt: dbUser.created_at,
    updatedAt: dbUser.updated_at
  };
}


export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signup(email, password, userData) {
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.fullName,
          phone: userData.phone,
          license_number: userData.licenseNumber,
          license_expiry: userData.licenseExpiry,
        }
      }
    });

    if (signUpError) throw signUpError;

    // If signup successful and we have a session, create the user profile
    if (authData.user) {
      // Create profile with the form data directly
      const profileData = {
        id: authData.user.id,
        email: email,
        full_name: userData.fullName || 'User',
        phone: userData.phone || '',
        license_number: userData.licenseNumber || '',
        license_expiry: userData.licenseExpiry || null,
        address: '',
        profile_picture: '',
        favorites: []
      };

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .upsert([profileData], { onConflict: 'id' })
        .select()
        .single();

      if (profileError) {
        console.log('Profile creation error:', profileError);
      } else {
        setUserProfile(profile);
      }
    }

    return authData.user;
  }

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async function logout() {
    try {
      // Clear state immediately to prevent race conditions
      setCurrentUser(null);
      setUserProfile(null);
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if signOut fails, we've cleared local state
      throw error;
    }
  }

  async function getUserProfile(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.log('Profile fetch error:', error);
        return null;
      }
      return mapDbUserToProfile(data);
    } catch (err) {
      console.log('Profile fetch exception:', err);
      return null;
    }
  }

  async function createUserProfile(user) {
    if (!user) return null;
    
    try {
      const profileData = {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || 'User',
        phone: user.user_metadata?.phone || '',
        license_number: user.user_metadata?.license_number || '',
        license_expiry: user.user_metadata?.license_expiry || null,
        address: '',
        profile_picture: '',
        favorites: []
      };

      const { data, error } = await supabase
        .from('users')
        .upsert([profileData], { onConflict: 'id' })
        .select()
        .single();

      if (error) {
        console.log('Profile create error:', error);
        // Return mock profile so app works
        return mapDbUserToProfile({ ...profileData, created_at: new Date().toISOString() });
      }
      return mapDbUserToProfile(data);
    } catch (err) {
      console.log('Profile create exception:', err);
      return null;
    }
  }

  async function updateUserProfile(userId, updates) {
    // Map camelCase fields to snake_case database columns
    const dbUpdates = {};
    
    if (updates.fullName !== undefined) dbUpdates.full_name = updates.fullName;
    if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
    if (updates.licenseNumber !== undefined) dbUpdates.license_number = updates.licenseNumber;
    // Convert empty string to null for date fields - PostgreSQL doesn't accept empty strings for dates
    if (updates.licenseExpiry !== undefined) {
      dbUpdates.license_expiry = updates.licenseExpiry || null;
    }
    if (updates.address !== undefined) dbUpdates.address = updates.address;
    if (updates.profilePicture !== undefined) dbUpdates.profile_picture = updates.profilePicture;
    if (updates.favorites !== undefined) dbUpdates.favorites = updates.favorites;
    
    dbUpdates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('users')
      .update(dbUpdates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    
    // Map snake_case response back to camelCase for React state
    const mappedData = mapDbUserToProfile(data);
    setUserProfile(mappedData);
    return mappedData;
  }

  async function uploadProfilePicture(userId, file) {
    if (!userId) {
      throw new Error('User ID is required for profile picture upload');
    }
    
    const fileExt = file.name.split('.').pop();
    // Store in folder structure: userId/profile.ext (required for RLS policies)
    const filePath = `${userId}/profile.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('profile-pictures')
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(filePath);

    await updateUserProfile(userId, { profilePicture: publicUrl });
    return publicUrl;
  }

  async function toggleFavorite(vehicleId) {
    if (!currentUser || !userProfile) return;
    
    const favorites = userProfile.favorites || [];
    const newFavorites = favorites.includes(vehicleId)
      ? favorites.filter(id => id !== vehicleId)
      : [...favorites, vehicleId];
    
    await updateUserProfile(currentUser.id, { favorites: newFavorites });
  }

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (session?.user) {
          setCurrentUser(session.user);
          let profile = await getUserProfile(session.user.id);
          if (!profile) {
            profile = await createUserProfile(session.user);
          }
          if (mounted) setUserProfile(profile);
        }
      } catch (err) {
        console.log('Init auth error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      console.log('Auth event:', event);
      
      if (session?.user) {
        setCurrentUser(session.user);
        let profile = await getUserProfile(session.user.id);
        if (!profile && event === 'SIGNED_IN') {
          profile = await createUserProfile(session.user);
        }
        if (mounted) setUserProfile(profile);
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    updateUserProfile,
    uploadProfilePicture,
    toggleFavorite,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
