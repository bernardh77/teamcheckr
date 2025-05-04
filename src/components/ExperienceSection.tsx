'use client';

import { useState } from 'react';
import { Plus, Pencil } from 'lucide-react';
import ExperienceCard from './ExperienceCard';

const dummyExperiences = [
  {
    id: '1',
    title: 'Software Developer',
    company: 'CitiTrails',
    type: 'Internship',
    logoUrl: '/logos/ct.png',
    location: 'Sydney, New South Wales, Australia',
    startDate: 'Feb 2025',
    isCurrent: true,
    duration: '4 mos',
  },
  {
    id: '2',
    title: 'Sponsorship and Fundraising',
    company: 'PPIA UNSW',
    type: 'Volunteer',
    logoUrl: '/logos/ppia.png',
    location: 'Sydney, New South Wales, Australia',
    startDate: 'Oct 2023',
    endDate: 'Oct 2024',
    duration: '1 yr 1 mo',
  },
];

export default function ExperienceSection() {
  const [experiences] = useState(dummyExperiences);

  return (
    <section className="w-full max-w-3xl bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#2C3333]">Experience</h2>
        <div className="flex gap-2">
          <button className="text-sm text-gray-600 hover:text-blue-600">
            <Plus className="w-5 h-5" />
          </button>
          <button className="text-sm text-gray-600 hover:text-blue-600">
            <Pencil className="w-5 h-5" />
          </button>
        </div>
      </div>

      {experiences.map(exp => (
        <ExperienceCard key={exp.id} experience={exp} />
      ))}
    </section>
  );
}
