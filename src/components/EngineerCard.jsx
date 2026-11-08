import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MapPin, Briefcase, Bookmark, ArrowRight } from 'lucide-react';
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
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-card hover:shadow-card-hover hover:border-cyan-400/60 dark:hover:border-cyan-500/60 transition-all duration-300 flex flex-col justify-between text-left">
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
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                engineer.availability === 'available'
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800'
                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800'
              }`}
            >
              {engineer.availability === 'available' ? 'Available' : 'Busy'}
            </span>
            <button
              type="button"
              onClick={handleFavoriteClick}
              className={`p-1.5 rounded-xl border transition-colors ${
                favorite
                  ? 'bg-red-50 text-red-500 border-red-200 dark:bg-red-950/50 dark:border-red-900'
                  : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:text-white'
              }`}
              title={favorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Bookmark className={`w-4 h-4 ${favorite ? 'fill-red-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Engineer Name & Title */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5">
            <Link
              to={`/engineer/${engineer.id}`}
              className="text-base font-bold text-slate-900 dark:text-white hover:text-brand-blue dark:hover:text-cyan-400 transition-colors"
            >
              {engineer.fullName}
            </Link>
            {engineer.status === 'approved' && (
              <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" title="Verified Consultant" />
            )}
          </div>
          <p className="text-xs font-semibold text-brand-blue dark:text-cyan-400 mt-0.5">
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
          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
            {engineer.bio}
          </p>
        )}

        {/* Skills pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(engineer.skills || []).slice(0, 4).map((skill, i) => (
            <Badge key={i} variant="cyan" size="sm">
              {skill}
            </Badge>
          ))}
          {(engineer.skills?.length || 0) > 4 && (
            <span className="text-[11px] text-slate-400 self-center font-medium">
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
            <Briefcase className="w-3.5 h-3.5 text-cyan-500" />
            <span>{engineer.completedProjectsCount || engineer.projects?.length || 0} projects</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-[11px] text-slate-400 block font-medium">Rate</span>
            <div className="text-base font-black text-slate-900 dark:text-white">
              ${engineer.hourlyRate}{' '}
              <span className="text-[11px] font-normal text-slate-500">/hr</span>
            </div>
          </div>

          <Link
            to={`/engineer/${engineer.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-blue-50 text-brand-blue hover:bg-brand-blue hover:text-white dark:bg-cyan-950/40 dark:text-cyan-300 dark:hover:bg-cyan-500 dark:hover:text-slate-950 transition-all duration-200"
          >
            <span>View Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
