'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Experience } from '@/components/ExperienceCard';
import { differenceInMonths, differenceInYears, parse, format } from 'date-fns';
import MonthPicker from './MonthPicker';

interface Props {
  experience: Experience | null;
  onClose: () => void;
  onSave: (exp: Experience) => void;
}

export default function ExperienceModal({ experience, onClose, onSave }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Experience>({
    id: '',
    title: '',
    company: '',
    type: '',
    logoUrl: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    duration: '',
  });

  useEffect(() => {
    if (experience) setForm(experience);
  }, [experience]);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';
  
    return () => {
      // Re-enable scroll on cleanup
      document.body.style.overflow = '';
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setForm(prev => {
      if (name === 'isCurrent') {
        return {
          ...prev,
          isCurrent: checked,
          endDate: checked ? '' : prev.endDate, // clear endDate if checked
        };
      }

      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const requiredFields = ['title', 'company', 'type', 'location', 'startDate'];
    const missing = requiredFields.filter((field) => !form[field as keyof Experience]);
  
    if (!form.isCurrent && !form.endDate) {
      missing.push('endDate');
    }
  
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.join(', ')}`);
      return;
    }
    
    const start = parse(form.startDate, 'yyyy-MM', new Date());
    const end = form.isCurrent
    ? new Date()
    : parse(form.endDate || '', 'yyyy-MM', new Date());
    
    if (end < start) {
      setError('End date cannot be before start date.');
      return;
    }

    setError(null); // Clear error if all good
  
    const months = differenceInMonths(end, start);
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
  
    const duration =
      years > 0 && remainingMonths > 0
        ? `${years} yr ${remainingMonths} mo`
        : years > 0
        ? `${years} yr`
        : `${months} mo`;
  
    onSave({ ...form, id: experience?.id || Date.now().toString(), duration });
  };
  
  useEffect(() => {
    if (experience) {
      setForm({
        ...experience,
        startDate: experience.startDate?.slice(0, 7), // YYYY-MM
        endDate: experience.endDate?.slice(0, 7) || '', // YYYY-MM or empty
      });
    }
  }, [experience]);
  

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-black">
          {experience ? 'Edit Experience' : 'Add Experience'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="text-black w-full border px-4 py-2 rounded" />
          <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required className="text-black w-full border px-4 py-2 rounded" />
          <input name="type" placeholder="Type (e.g. Internship)" value={form.type} onChange={handleChange} className="text-black w-full border px-4 py-2 rounded" />
          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="text-black w-full border px-4 py-2 rounded" />
          <div className="flex w-full gap-2"> 
            <div className="w-1/2">
              <MonthPicker
                value={form.startDate ? new Date(form.startDate) : null}
                onChange={(date: Date | null) => {
                if (date) {
                  setForm(prev => ({ ...prev, startDate: format(date, 'yyyy-MM') }));
                }
              }}
            />
            </div>
            {!form.isCurrent && (
              <div className="w-1/2">
                <MonthPicker
                  value={form.endDate ? new Date(form.endDate) : null}
                  onChange={(date: Date | null) => {
                    if (date) {
                      setForm(prev => ({ ...prev, endDate: format(date, 'yyyy-MM') }));
                    }
                  }}
                />
              </div>
            )}
          </div>
          <label className="flex items-center gap-2 text-black">
            <input type="checkbox" name="isCurrent" checked={form.isCurrent} onChange={handleChange} />
            Current position
          </label>

          {error && (
            <div className="text-red-600 text-sm font-medium">{error}</div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#395B64] text-white px-6 py-2 rounded hover:bg-[#2C3333]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
