import React from 'react';

interface AvatarProps {
    src?: string | null;
    name?: string;
    className?: string;
    alt?: string;
}

const COLORS = [
    'bg-rose-400', 'bg-amber-400', 'bg-emerald-400', 'bg-sky-400',
    'bg-violet-400', 'bg-pink-400', 'bg-indigo-400', 'bg-teal-400',
];

const getInitials = (name?: string) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getColor = (name?: string) => {
    if (!name) return COLORS[0];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return COLORS[hash % COLORS.length];
};

const Avatar: React.FC<AvatarProps> = ({ src, name, className = '', alt = 'Avatar' }) => {
    if (src) {
        return <img src={src} alt={alt} className={`object-cover ${className}`} />;
    }

    return (
        <div className={`flex items-center justify-center font-black text-white ${getColor(name)} ${className}`}>
            {getInitials(name)}
        </div>
    );
};

export default Avatar;
