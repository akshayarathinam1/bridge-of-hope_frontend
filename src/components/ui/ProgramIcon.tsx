import {
  FiActivity,
  FiAward,
  FiBookOpen,
  FiHeart,
  FiHome,
  FiSmile,
  FiStar,
  FiUsers,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';

const FI_ICONS: Record<string, IconType> = {
  FiActivity, FiAward, FiBookOpen, FiHeart, FiHome, FiSmile, FiStar, FiUsers,
};

/**
 * A program's icon from the dashboard: an icon name like "FiBookOpen", or an emoji (what the
 * dashboard's Icon field asks for). Falls back to a heart.
 */
export default function ProgramIcon({ icon, className }: { icon?: string | null; className?: string }) {
  const value = icon?.trim();
  const Icon = value ? FI_ICONS[value] : undefined;
  if (Icon) return <Icon className={className} />;
  if (value) {
    return (
      <span aria-hidden className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, fontSize: '1.1em', width: 'auto', height: 'auto' }}>
        {value}
      </span>
    );
  }
  return <FiHeart className={className} />;
}
