
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NotificationToast as NotificationType } from '../types';

interface Props {
  notification: NotificationType;
  onClose: (id: string) => void;
}

export const NotificationToast: React.FC<Props> = ({ notification, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(notification.id), 500);
    }, 8000);
    return () => clearTimeout(timer);
  }, [notification, onClose]);

  return (
    <div className={`fixed top-24 right-4 z-[2000] w-full max-w-xs transition-all duration-500 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
      <div className="bg-white border-l-4 border-legit-red news-grid-shadow overflow-hidden rounded-r-lg">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black text-legit-red uppercase tracking-widest">Just Published</span>
            <button onClick={() => onClose(notification.id)} className="text-slate-300 hover:text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <Link to={`/article/${notification.slug}`} onClick={() => onClose(notification.id)}>
            <h4 className="text-sm font-black text-slate-900 leading-tight hover:text-legit-red transition-colors line-clamp-2 mb-3">
              {notification.title}
            </h4>
            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>Read Now</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </Link>
        </div>
        <div className="h-1 bg-slate-100 w-full">
           <div className="h-full bg-legit-red animate-[shimmer_8s_linear_infinite]" style={{ width: '100%' }} />
        </div>
      </div>
    </div>
  );
};
