import { MapPin, Calendar, Pencil, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
export interface Experience {
  id: string;
  title: string;
  company: string;
  type: string;
  logoUrl: string;
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  duration: string;
}

interface Props {
  experience: Experience;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ExperienceCard({ experience, onEdit, onDelete }: Props) {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 text-left relative">
      <div className="w-12 h-12 relative">
        <img
          src={`https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(experience.company)}`}
          alt={`${experience.company} logo`}
          className="rounded object-contain"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-[#2C3333]">{experience.title}</h3>
        <p className="text-sm text-[#395B64]">{experience.company} · {experience.type}</p>
        <p className="text-sm text-[#395B64] flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {format(parseISO(experience.startDate), 'MMMM yyyy')} –{' '}
          {experience.isCurrent ? 'Present' : format(parseISO(experience.endDate!), 'MMMM yyyy')} · {experience.duration}
        </p>
        <p className="text-sm text-[#395B64] flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {experience.location}
        </p>
      </div>

      {(onEdit || onDelete) && (
        <div className="absolute top-2 right-2 flex gap-2">
          {onEdit && (
            <button onClick={onEdit} className="text-gray-400 hover:text-blue-600">
              <Pencil className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button onClick={onDelete} className="text-gray-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
