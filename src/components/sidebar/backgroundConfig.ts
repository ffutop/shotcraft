import type { IFill } from 'leafer-ui';

export interface BackgroundOption {
  class: string;
  fill: IFill;
}

const backgroundConfig: Record<string, BackgroundOption> = {
  default_1: {
    class: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0, color: '#6366f1' },
        { offset: 0.5, color: '#a855f7' },
        { offset: 1, color: '#ec4899' },
      ],
    },
  },
  default_2: {
    class: 'bg-gradient-to-r from-red-500 via-pink-500 to-violet-500',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0, color: '#ef4444' },
        { offset: 0.5, color: '#ec4899' },
        { offset: 1, color: '#8b5cf6' },
      ],
    },
  },
  default_3: {
    class: 'bg-gradient-to-r from-violet-800 via-pink-600 to-orange-500',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0, color: '#5b21b6' },
        { offset: 0.5, color: '#db2777' },
        { offset: 1, color: '#f97316' },
      ],
    },
  },
  default_4: {
    class: 'bg-gradient-to-r from-orange-400 to-rose-400',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0, color: '#fb923c' },
        { offset: 1, color: '#fb7185' },
      ],
    },
  },
  default_5: {
    class: 'bg-gradient-to-r from-[#4284DB] to-[#29EAC4]',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0, color: '#4284DB' },
        { offset: 1, color: '#29EAC4' },
      ],
    },
  },
  default_6: {
    class: 'bg-gradient-to-r from-[#fc00ff] to-[#00dbde]',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0, color: '#fc00ff' },
        { offset: 1, color: '#00dbde' },
      ],
    },
  },
  default_7: {
    class: 'bg-gradient-to-br from-[#eeddf3] via-[#ee92b1] to-[#6330b4]',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0, color: '#eeddf3' },
        { offset: 0.5, color: '#ee92b1' },
        { offset: 1, color: '#6330b4' },
      ],
    },
  },
  solid_1: {
    class: 'bg-transparent',
    fill: {
      type: 'solid',
      color: '#ffffff00',
    },
  },
  solid_2: {
    class: 'bg-slate-400',
    fill: {
      type: 'solid',
      color: '#94a3b8',
    },
  },
  solid_3: {
    class: 'bg-gray-400',
    fill: {
      type: 'solid',
      color: '#9ca3af',
    },
  },
  solid_4: {
    class: 'bg-stone-400',
    fill: {
      type: 'solid',
      color: '#a8a29e',
    },
  },
  solid_5: {
    class: 'bg-red-400',
    fill: {
      type: 'solid',
      color: '#f87171',
    },
  },
  solid_6: {
    class: 'bg-orange-400',
    fill: {
      type: 'solid',
      color: '#fb923c',
    },
  },
  solid_7: {
    class: 'bg-amber-400',
    fill: {
      type: 'solid',
      color: '#facc15',
    },
  },
  solid_8: {
    class: 'bg-yellow-400',
    fill: {
      type: 'solid',
      color: '#fbbf24',
    },
  },
  solid_9: {
    class: 'bg-lime-400',
    fill: {
      type: 'solid',
      color: '#a3e635',
    },
  },
  solid_10: {
    class: 'bg-green-400',
    fill: {
      type: 'solid',
      color: '#4ade80',
    },
  },
  solid_11: {
    class: 'bg-emerald-400',
    fill: {
      type: 'solid',
      color: '#34d399',
    },
  },
  solid_12: {
    class: 'bg-teal-400',
    fill: {
      type: 'solid',
      color: '#2dd4bf',
    },
  },
  solid_13: {
    class: 'bg-cyan-400',
    fill: {
      type: 'solid',
      color: '#22d3ee',
    },
  },
  solid_14: {
    class: 'bg-sky-400',
    fill: {
      type: 'solid',
      color: '#38bdf8',
    },
  },
  solid_15: {
    class: 'bg-blue-400',
    fill: {
      type: 'solid',
      color: '#60a5fa',
    },
  },
  solid_16: {
    class: 'bg-indigo-400',
    fill: {
      type: 'solid',
      color: '#818cf8',
    },
  },
  solid_17: {
    class: 'bg-violet-400',
    fill: {
      type: 'solid',
      color: '#a78bfa',
    },
  },
  solid_18: {
    class: 'bg-purple-400',
    fill: {
      type: 'solid',
      color: '#c084fc',
    },
  },
  solid_19: {
    class: 'bg-fuchsia-400',
    fill: {
      type: 'solid',
      color: '#e879f9',
    },
  },
  solid_20: {
    class: 'bg-pink-400',
    fill: {
      type: 'solid',
      color: '#f472b6',
    },
  },
  solid_21: {
    class: 'bg-rose-400',
    fill: {
      type: 'solid',
      color: '#fb7185',
    },
  },
  gradient_1: {
    class: 'bg-gradient-to-br from-[#ff6432] from-12.8% via-[#ff0065] via-43.52% to-[#7b2eff] to-84.34%',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0.12, color: '#ff6432' },
        { offset: 0.44, color: '#ff0065' },
        { offset: 0.84, color: '#7b2eff' },
      ],
    },
  },
  gradient_2: {
    class: 'bg-gradient-to-br from-[#69eacb] from-0% via-[#eaccf8] via-48% to-[#6654f1] to-100%',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0, color: '#69eacb' },
        { offset: 0.48, color: '#eaccf8' },
        { offset: 1, color: '#6654f1' },
      ],
    },
  },
  gradient_3: {
    class: 'bg-gradient-to-br from-[#f9f047] to-[#0fd850]',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0, color: '#f9f047' },
        { offset: 1, color: '#0fd850' },
      ],
    },
  },
  gradient_4: {
    class: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0, color: '#6366f1' },
        { offset: 0.5, color: '#a855f7' },
        { offset: 1, color: '#ec4899' },
      ],
    },
  },
  gradient_5: {
    class: 'bg-gradient-to-r from-red-500 via-pink-500 to-violet-500',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0, color: '#ef4444' },
        { offset: 0.5, color: '#ec4899' },
        { offset: 1, color: '#8b5cf6' },
      ],
    },
  },
  gradient_6: {
    class: 'bg-gradient-to-r from-violet-800 via-pink-600 to-orange-500',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0, color: '#5b21b6' },
        { offset: 0.5, color: '#db2777' },
        { offset: 1, color: '#f97316' },
      ],
    },
  },
  gradient_7: {
    class: 'bg-gradient-to-r from-orange-400 to-rose-400',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0, color: '#fb923c' },
        { offset: 1, color: '#fb7185' },
      ],
    },
  },
  gradient_8: {
    class: 'bg-gradient-to-r from-[#4284DB] to-[#29EAC4]',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0, color: '#4284DB' },
        { offset: 1, color: '#29EAC4' },
      ],
    },
  },
  gradient_9: {
    class: 'bg-gradient-to-r from-[#fc00ff] to-[#00dbde]',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0, color: '#fc00ff' },
        { offset: 1, color: '#00dbde' },
      ],
    },
  },
  gradient_10: {
    class: 'bg-gradient-to-br from-[#eeddf3] via-[#ee92b1] to-[#6330b4]',
    fill: {
      type: 'linear',
      stops: [
        { offset: 0, color: '#eeddf3' },
        { offset: 0.5, color: '#ee92b1' },
        { offset: 1, color: '#6330b4' },
      ],
    },
  },
};

export default backgroundConfig;