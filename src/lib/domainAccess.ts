// Domain-specific access control for VitalTones
export const checkDomainAccess = (): { isFreeAccess: boolean; domain: string } => {
  const hostname = window.location.hostname;
  
  // Check if accessing from spacecloud.tel domain
  const isFreeAccess = hostname.includes('spacecloud.tel') || 
                      hostname === 'localhost' || 
                      hostname.includes('lovable.app');
  
  return {
    isFreeAccess,
    domain: hostname
  };
};

// Get access status for UI display
export const getAccessStatus = () => {
  const { isFreeAccess, domain } = checkDomainAccess();
  
  if (isFreeAccess) {
    return {
      status: 'FREE',
      message: 'All Premium Features Unlocked',
      badge: '🎉 FREE PREMIUM ACCESS',
      canPlay: true
    };
  }
  
  return {
    status: 'PREMIUM',
    message: 'Premium Access Required',
    badge: '🔒 PREMIUM REQUIRED',
    canPlay: false
  };
};