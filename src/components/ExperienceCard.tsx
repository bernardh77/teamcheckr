import { MapPin, Calendar } from 'lucide-react';
import Image from 'next/image';

interface Experience {
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

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="flex gap-4 py-4 border-b border-gray-200 text-left">
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
          {experience.startDate} – {experience.isCurrent ? 'Present' : experience.endDate} · {experience.duration}
        </p>
        <p className="text-sm text-[#395B64] flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {experience.location}
        </p>
      </div>
    </div>
  );
}
