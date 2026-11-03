import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MapPin, Briefcase, Bookmark, ArrowLeft } from 'lucide-react';
import StarRating from './StarRating';
import { SPECIALTY_LABELS, isFavoriteEngineer, toggleFavoriteEngineer } from '../services/storage';
import { Badge } from './ui/Badge';
import { Avatar } from './ui/Avatar';

export default function EngineerCard({ engineer, onFavoriteToggle }) {
  const [favorite, setFavorite] = useState(() => isFavoriteEngineer(engineer.id));

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isFav = toggleFavoriteEngineer(engineer.id);
    setFavorite(isFav);
    if (onFavoriteToggle) onFavoriteToggle(engineer.id, isFav);
  };

  const specialtyLabel = SPECIALTY_LABELS[engineer.specialty] || engineer.specialty;

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-card hover:shadow-card-hover hover:border-brand-blue/40 dark:hover:border-brand-blue/50 transition-all duration-300 flex flex-col justify-between">
      {/* Top action and avatar */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="relative">
            <Avatar
              src={engineer.avatar}
              name={engineer.fullName}
              size="lg"
              status={engineer.availability === 'available' ? 'online' : 'busy'}
            />
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                engineer.availability === 'available'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
              }`}
            >
              {engineer.availability === 'available' ? 'متاح للعمل' : 'مشغول حالياً'}
            </span>
            <button
              type="button"
              onClick={handleFavoriteClick}
              className={`p-1.5 rounded-xl border transition-colors ${
                favorite
                  ? 'bg-red-50 text-red-500 border-red-200 dark:bg-red-950/50 dark:border-red-900'
                  : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:text-white'
              }`}
              title={favorite ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
            >
              <Bookmark className={`w-4 h-4 ${favorite ? 'fill-red-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Engineer Name & Title */}
        <div className="mb-3 text-right">
          <div className="flex items-center gap-1.5 justify-start">
            <Link
              to={`/engineer/${engineer.id}`}
              className="text-base font-bold text-slate-900 dark:text-white hover:text-brand-blue dark:hover:text-brand-cyan transition-colors"
            >
              {engineer.fullName}
            </Link>
            {engineer.status === 'approved' && (
              <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0" title="مهندس معتمد" />
            )}
          </div>
          <p className="text-xs font-medium text-brand-blue dark:text-brand-cyan mt-0.5">
            {specialtyLabel}
          </p>
          {engineer.location && (
            <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 shrink-0" />
              <span>{engineer.location}</span>
            </p>
          )}
        </div>

        {/* Bio summary */}
        {engineer.bio && (
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4 text-right">
            {engineer.bio}
          </p>
        )}

        {/* Skills pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(engineer.skills || []).slice(0, 4).map((skill, i) => (
            <Badge key={i} variant="navy" size="sm">
              {skill}
            </Badge>
          ))}
          {(engineer.skills?.length || 0) > 4 && (
            <span className="text-[11px] text-slate-400 self-center">
              +{engineer.skills.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Footer Info & CTA */}
      <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3.5 mt-2">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-1">
            <StarRating rating={engineer.rating} size="sm" />
            <span className="text-slate-400">({engineer.reviewCount || 0})</span>
          </div>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            <span>{engineer.completedProjectsCount || engineer.projects?.length || 0} مشاريع</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="text-right">
            <span className="text-xs text-slate-400">سعر الساعة</span>
            <div className="text-base font-extrabold text-slate-900 dark:text-white">
              {engineer.hourlyRate}{' '}
              <span className="text-[11px] font-normal text-slate-500">ج.م/ساعة</span>
            </div>
          </div>

          <Link
            to={`/engineer/${engineer.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-xl bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white dark:bg-brand-blue/20 dark:text-blue-300 dark:hover:bg-brand-blue dark:hover:text-white transition-all duration-200"
          >
            <span>الملف الشخصي</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
