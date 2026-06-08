import { RefreshCw, Clock, CalendarX2 } from 'lucide-react';
import type { RecurrenceRule } from '../types/tasks.types';

interface RecurrenceSelectorProps {
    value: RecurrenceRule | null;
    onChange: (rule: RecurrenceRule | null) => void;
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const defaultRule = (): RecurrenceRule => ({
    frequency: 'WEEKLY',
    interval: 1,
    daysOfWeek: [],
});

const RecurrenceSelector = ({ value, onChange }: RecurrenceSelectorProps) => {
    const enabled = value !== null;

    const update = (patch: Partial<RecurrenceRule>) => {
        onChange({ ...(value ?? defaultRule()), ...patch });
    };

    const toggleDay = (day: number) => {
        const current = value?.daysOfWeek ?? [];
        const next = current.includes(day) ? current.filter(d => d !== day) : [...current, day].sort();
        update({ daysOfWeek: next });
    };

    const unitLabel = (freq: RecurrenceRule['frequency'], n: number) => {
        const map = { DAILY: 'day', WEEKLY: 'week', MONTHLY: 'month' };
        const base = map[freq];
        return n === 1 ? base : `${base}s`;
    };

    return (
        <div className="bg-slate-50 rounded-[1.5rem] p-5 space-y-4">
            <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                    onClick={() => onChange(enabled ? null : defaultRule())}
                    className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-slate-900' : 'bg-slate-200'}`}
                >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </div>
                <div className="flex items-center gap-2">
                    <RefreshCw size={16} className={enabled ? 'text-slate-900' : 'text-slate-400'} />
                    <span className={`font-bold text-sm ${enabled ? 'text-slate-900' : 'text-slate-400'}`}>
                        Repeat this task
                    </span>
                </div>
            </label>

            {enabled && value && (
                <div className="space-y-4 pt-1">
                    {/* Frequency */}
                    <div className="flex gap-2">
                        {(['DAILY', 'WEEKLY', 'MONTHLY'] as const).map(freq => (
                            <button
                                key={freq}
                                type="button"
                                onClick={() => update({ frequency: freq, daysOfWeek: freq === 'WEEKLY' ? (value.daysOfWeek ?? []) : undefined })}
                                className={`flex-1 py-2.5 rounded-2xl text-xs font-black transition-all ${
                                    value.frequency === freq
                                        ? 'bg-slate-900 text-white shadow'
                                        : 'bg-white text-slate-500 border border-slate-100 hover:border-slate-300'
                                }`}
                            >
                                {freq.charAt(0) + freq.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>

                    {/* Interval */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-500">Every</span>
                        <input
                            type="number"
                            min={1}
                            max={99}
                            value={value.interval}
                            onChange={e => update({ interval: Math.max(1, parseInt(e.target.value) || 1) })}
                            className="w-16 text-center p-2 bg-white rounded-xl border border-slate-100 font-black text-slate-900 outline-none focus:border-slate-400"
                        />
                        <span className="text-sm font-bold text-slate-500">
                            {unitLabel(value.frequency, value.interval)}
                        </span>
                    </div>

                    {/* Days of week (WEEKLY only) */}
                    {value.frequency === 'WEEKLY' && (
                        <div className="flex gap-1.5 justify-between">
                            {DAYS.map((label, day) => (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => toggleDay(day)}
                                    className={`flex-1 aspect-square rounded-xl text-xs font-black transition-all ${
                                        value.daysOfWeek?.includes(day)
                                            ? 'bg-slate-900 text-white shadow'
                                            : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-300'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Time of day */}
                    <div className="flex items-center gap-3">
                        <Clock size={16} className="text-slate-400 shrink-0" />
                        <span className="text-sm font-bold text-slate-500 w-12">Time</span>
                        <input
                            type="time"
                            value={value.timeOfDay ?? ''}
                            onChange={e => update({ timeOfDay: e.target.value || undefined })}
                            className="flex-1 p-2 bg-white rounded-xl border border-slate-100 font-medium text-slate-900 outline-none focus:border-slate-400 text-sm"
                        />
                        {value.timeOfDay && (
                            <button type="button" onClick={() => update({ timeOfDay: undefined })} className="text-slate-300 hover:text-slate-500 text-xs font-bold">
                                clear
                            </button>
                        )}
                    </div>

                    {/* End date */}
                    <div className="flex items-center gap-3">
                        <CalendarX2 size={16} className="text-slate-400 shrink-0" />
                        <span className="text-sm font-bold text-slate-500 w-12">Ends</span>
                        <input
                            type="date"
                            value={value.endDate ?? ''}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={e => update({ endDate: e.target.value || undefined })}
                            className="flex-1 p-2 bg-white rounded-xl border border-slate-100 font-medium text-slate-900 outline-none focus:border-slate-400 text-sm"
                        />
                        {value.endDate && (
                            <button type="button" onClick={() => update({ endDate: undefined })} className="text-slate-300 hover:text-slate-500 text-xs font-bold">
                                clear
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecurrenceSelector;
