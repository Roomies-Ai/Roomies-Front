import React from 'react';

interface DetailInputProps {
    label: string;
    icon: React.ReactNode;
    value: string;
    onChange: (val: string) => void;
    disabled: boolean;
    isEditing: boolean;
    placeholder?: string;
}

const DetailInput: React.FC<DetailInputProps> = ({ 
    label, icon, value, onChange, disabled, isEditing, placeholder 
}) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
        <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border transition-all ${isEditing ? 'border-primary bg-primary/5 shadow-sm' : 'border-slate-100 bg-slate-50/50'}`}>
            {icon}
            <input 
                disabled={disabled}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="bg-transparent border-none outline-none text-sm font-bold text-slate-900 w-full placeholder:font-medium placeholder:text-slate-300"
            />
        </div>
    </div>
);

export default DetailInput;
