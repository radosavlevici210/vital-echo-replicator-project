// Domain-specific access control for VitalTones - ALL FREE & OPEN SOURCE
export const checkDomainAccess = (): { isFreeAccess: boolean; domain: string } => {
  const hostname = window.location.hostname;
  
  // All access is now free and open source for everyone
  const isFreeAccess = true;
  
  return {
    isFreeAccess,
    domain: hostname
  };
};

// Get access status for UI display
export const getAccessStatus = () => {
  const { isFreeAccess, domain } = checkDomainAccess();
  
  return {
    status: 'FREE',
    message: 'Open Source & Free Forever',
    badge: '🌟 FREE & OPEN SOURCE',
    canPlay: true
  };
};