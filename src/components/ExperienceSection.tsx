'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil } from 'lucide-react';
import ExperienceCard from './ExperienceCard';
import ExperienceModal from './ExperienceModal';
import { Experience } from '@/generated/prisma';

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);

  useEffect(() => {
    fetch('/api/experience')
      .then(res => res.json())
      .then(data => setExperiences(data))
      .catch(console.error);
  }, []);

  // Open add modal
  const handleAdd = () => {
    setEditingExp(null);
    setModalOpen(true);
  };

  // Open edit modal
  const handleEdit = (exp: Experience) => {
    setEditingExp(exp);
    setModalOpen(true);
  };

  // Save (add or edit)
  const handleSave = async (exp: Experience) => {
    const method = editingExp ? 'PUT' : 'POST';
    const url = editingExp ? `/api/experience/${exp.id}` : '/api/experience';
  
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exp),
    });
  
    const updated = await res.json();
  
    if (editingExp) {
      setExperiences(experiences.map(e => (e.id === updated.id ? updated : e)));
    } else {
      setExperiences([...experiences, updated]);
    }
  
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/experience/${id}`, { method: 'DELETE' });
    setExperiences(experiences.filter(exp => exp.id !== id));
  };
  

  return (
    <section className="w-full max-w-3xl bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#2C3333]">Experience</h2>
        <div className="flex gap-2">
          <button className="text-sm text-gray-600 hover:text-blue-600" onClick={handleAdd}>
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {experiences.map(exp => (
        <ExperienceCard
          key={exp.id}
          experience={exp}
          onEdit={() => handleEdit(exp)}
          onDelete={() => handleDelete(exp.id)} // optional
        />
      ))}

      {modalOpen && (
        <ExperienceModal
          experience={editingExp}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </section>
  );
}
