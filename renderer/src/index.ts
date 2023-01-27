// Interfaces
export type { GtkWidgetProps } from '@/widgets/gtk-widget';
export type { GtkBoxProps } from '@/widgets/gtk-box';
export type { GtkWindowProps } from '@/widgets/gtk-window';
export type { GtkLabelProps } from '@/widgets/gtk-label';
export type { GtkButtonProps } from '@/widgets/gtk-button';
export type { GtkEntryProps } from '@/widgets/gtk-entry';
export type { GtkStackProps } from '@/widgets/gtk-stack';
export type { GtkTooltip } from '@/contracts/gtk-tooltip';
export type { GtkStackPageProps } from '@/widgets/gtk-stack-page';
export type { RootInstance, RootProps } from '@/utils/reconciler';

// Widgets & Implementations
export { GtkWidget, GtkWidgetImpl } from '@/widgets/gtk-widget';
export { GtkBox, GtkBoxImpl } from '@/widgets/gtk-box';
export { GtkWindow, GtkWindowImpl } from '@/widgets/gtk-window';
export { GtkLabel, GtkLabelImpl } from '@/widgets/gtk-label';
export { GtkButton, GtkButtonImpl } from '@/widgets/gtk-button';
export { GtkEntry, GtkEntryImpl } from '@/widgets/gtk-entry';
export { GtkStack, GtkStackImpl } from '@/widgets/gtk-stack';
export { GtkStackPage, GtkStackPageImpl } from '@/widgets/gtk-stack-page';

// Enumerations
export { GtkAlign } from '@/enums/gtk-align';
export { GtkOverflow } from '@/enums/gtk-overflow';
export { GtkStateFlags } from '@/enums/gtk-state-flags';
export { GtkOrientation } from '@/enums/gtk-orientation';
export { GtkTextDirection } from '@/enums/gtk-text-direction';
export { GtkDirectionType } from '@/enums/gtk-direction-type';
export { GtkAccessibleRole } from '@/enums/gtk-accessible-role';
export { GtkStackTransitionType } from '@/enums/gtk-stack-transition-type';

// Renderer
export { createRoot } from '@/utils/reconciler';
