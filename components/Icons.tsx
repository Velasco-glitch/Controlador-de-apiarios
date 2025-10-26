
import React from 'react';

type IconProps = {
  className?: string;
};

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 18 9 12 15 6"></polyline></svg>
);

export const BarChartIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
);

export const HomeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);

export const BeeIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 12.586L12 12.586M12 12.586C10.63 12.586 9.42 13.045 8.41 13.816M12 12.586C13.37 12.586 14.58 13.045 15.59 13.816M12 12.586L12 16.5M12 16.5L10 18.5M12 16.5L14 18.5M8 9.833C8 8.27 9.79 7 12 7C14.21 7 16 8.27 16 9.833C16 11.397 14.21 12.667 12 12.667C9.79 12.667 8 11.397 8 9.833Z" strokeWidth="1.5" /><path d="M6.5 10C4.5 11 3 12.5 3 15" strokeWidth="1.5" strokeLinecap="round" /><path d="M17.5 10C19.5 11 21 12.5 21 15" strokeWidth="1.5" strokeLinecap="round" /></svg>
);

export const HoneyPotIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 10h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1z" /><path d="M5 10V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" /><path d="M5 17a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1H5v1z" /></svg>
);

export const BugIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20c-3.87 0-7-3.13-7-7a7 7 0 0 1 7-7h.17A6.97 6.97 0 0 1 19 13c0 3.87-3.13 7-7 7z" /><path d="M12 20v-4" /><path d="m6.5 12-4 1" /><path d="m17.5 12 4 1" /><path d="M12 6V4" /><path d="m16.5 7.5 2-2" /><path d="m7.5 7.5-2-2" /></svg>
);

export const HeartPulseIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19.5 12.5c-2.31 0-4.32 1.5-5.5 3.5c-1.18-2-3.19-3.5-5.5-3.5C4.52 12.5 2 15.02 2 17.5C2 21.1 6.5 22 12 22s10-.9 10-4.5c0-2.48-2.52-5-6.5-5Z" /><path d="M2.5 9.5c0-3.31 2.69-6 6-6c2.37 0 4.4 1.39 5.5 3.39C15.1 4.89 17.13 3.5 19.5 3.5c3.31 0 6 2.69 6 6" /><path d="M22 10h-2" /><path d="M2 8h2" /><path d="M12 18v-4" /></svg>
);
export const BookOpenIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);
export const CrownIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path></svg>
);
