export const types = {
  'OPEN_POPPER': 'openPopper',
  'CLOSE_POPPER': 'closePopper',
  'SET_SELECTED_EVENT': 'setSelectedEvent',
  'CLEAR_SELECTED_EVENT': 'clearSelectedEvent',
};

export interface CalendarState {
  selectedEvent: string | null;
  popperOpen: boolean;
  anchor: any,
  data: any,
}
