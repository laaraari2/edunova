import { LayoutGrid, List } from "lucide-react";

interface StudentsToolbarProps {
  viewMode?: 'grid' | 'list';
  setViewMode?: (mode: 'grid' | 'list') => void;
  onNewStudent?: () => void;
}

export default function StudentsToolbar({ viewMode = 'grid', setViewMode, onNewStudent }: StudentsToolbarProps = {}) {
  return (
    <div className="flex items-center justify-between gap-4">

      <input
        type="text"
        placeholder="Rechercher un élève..."
        className="w-72 rounded-lg border border-slate-200 px-4 py-2 text-sm"
      />

      <div className="flex items-center gap-4">
        {/* View Toggle */}
        {setViewMode && (
          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`rounded-md p-1.5 transition-colors ${viewMode === 'grid'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`rounded-md p-1.5 transition-colors ${viewMode === 'list'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="flex gap-2">
          <button className="rounded-lg border px-4 py-2 text-sm">
            Importer
          </button>

          <button className="rounded-lg border px-4 py-2 text-sm">
            Exporter
          </button>

          <button onClick={onNewStudent} className="rounded-lg bg-[#ad2432] px-4 py-2 text-sm text-white">
            + Nouvel élève
          </button>
        </div>

      </div>
    </div>
  );
}