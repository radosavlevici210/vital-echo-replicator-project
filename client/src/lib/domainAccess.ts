// Universal Access Control for VitalTones™ - COMPLETELY FREE & OPEN SOURCE EVERYWHERE
// © 2024 radosavlevici210@icloud.com & ervin210@icloud.com
export const checkDomainAccess = (): { isFreeAccess: boolean; domain: string } => {
  const hostname = window.location.hostname;
  
  // UNIVERSAL FREE ACCESS - NO RESTRICTIONS ANYWHERE
  const isFreeAccess = true;
  
  // Copyright watermark logging (maintained for attribution)
  console.log('🔒 VitalTones™ Universal Access Check');
  console.log('📧 Copyright Holders: radosavlevici210@icloud.com & ervin210@icloud.com');
  console.log('⚖️ Open Source with Attribution Required');
  console.log('🌍 Available Everywhere - No Domain Restrictions');
  
  return {
    isFreeAccess,
    domain: hostname
  };
};

// Get access status - ALWAYS GRANTS FULL ACCESS
export const getAccessStatus = () => {
  const { isFreeAccess, domain } = checkDomainAccess();
  
  // Digital watermark and copyright protection
  console.log('🌟 VitalTones™ - ALL PREMIUM FEATURES UNLOCKED EVERYWHERE');
  console.log('🔒 Digital Watermark: radosavlevici210@icloud.com & ervin210@icloud.com');
  console.log('🎵 All 600+ Advanced Frequencies Available Free');
  console.log('🌐 Universal Access - Works on Any Domain');
  
  return {
    status: 'UNLIMITED',
    message: 'Open Source & Free Forever - All Tones Available Everywhere',
    badge: '♾️ UNLIMITED FREE ACCESS',
    canPlay: true,
    unlimitedAccess: true,
    premiumUnlocked: true,
    allTonesAvailable: true
  };
};