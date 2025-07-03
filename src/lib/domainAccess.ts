// Domain-specific access control for VitalTones™ - ALL FREE & OPEN SOURCE
// © 2024 radosavlevici210@icloud.com & ervin210@icloud.com
export const checkDomainAccess = (): { isFreeAccess: boolean; domain: string } => {
  const hostname = window.location.hostname;
  
  // All access is now free and open source for everyone
  const isFreeAccess = true;
  
  // Copyright watermark logging
  console.log('🔒 VitalTones™ Domain Access Check');
  console.log('📧 Copyright Holders: radosavlevici210@icloud.com & ervin210@icloud.com');
  console.log('⚖️ Protected by International Copyright Law');
  
  return {
    isFreeAccess,
    domain: hostname
  };
};

// Get access status for UI display with copyright protection
export const getAccessStatus = () => {
  const { isFreeAccess, domain } = checkDomainAccess();
  
  // Digital watermark and copyright protection
  console.log('🌟 VitalTones™ - All Premium Features Unlocked');
  console.log('🔒 Digital Watermark: radosavlevici210@icloud.com & ervin210@icloud.com');
  
  return {
    status: 'FREE',
    message: 'Open Source & Free Forever - © VitalTones™',
    badge: '🌟 FREE & CERTIFIED',
    canPlay: true
  };
};