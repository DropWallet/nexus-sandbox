/**
 * Icon name mapping - maps common icon names to actual filenames
 * Add mappings as you discover them during design translation
 */
export const iconMap: Record<string, string> = {
  // Common actions
  close: 'close_24px',
  cancel: 'cancel_24px',
  check: 'check_24px',
  add: 'add_24px',
  delete: 'delete_24px',
  edit: 'edit_24px',
  save: 'save_24px',
  clear: 'clear_24px',
  
  // Navigation
  arrowBack: 'arrow_back_24px',
  arrowForward: 'arrow_forward_24px',
  arrowLeft: 'arrow_left_24px',
  arrowRight: 'arrow_right_24px',
  keyboardArrowRight: 'keyboard_arrow_right_24px',
  chevronLeft: 'chevron_left_24px',
  chevronRight: 'chevron_right_24px',
  keyboardArrowDown: 'keyboard_arrow_down_24px',
  
  // UI elements
  menu: 'menu_24px',
  search: 'search_24px',
  filter: 'filter_24px',
  settings: 'settings_24px',
  more: 'more_vert_24px',
  
  // Status
  info: 'info_24px',
  warning: 'warning_24px',
  error: 'error_24px',
  success: 'check_circle_24px',
  
  // Actions
  download: 'get_app_24px', // Using get_app as download icon
  upload: 'backup_24px', // Using backup as upload icon
  account: 'account_circle_24px',
  notification: 'notification_important_24px',
  
  // Add more as needed...
}

/**
 * Get icon filename from a common name
 */
export function getIconName(name: string): string {
  return iconMap[name] || name
}

/**
 * Icon size variants matching Figma spec
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/**
 * Size mappings to design tokens
 */
export const iconSizes: Record<IconSize, string> = {
  xs: '3',   // 12px - size-3
  sm: '4',   // 16px - size-4
  md: '5',   // 20px - size-5
  lg: '6',   // 24px - size-6
  xl: '8',   // 32px - size-8
  '2xl': '12', // 48px - size-12
}

