import {ReactComponent as IconPending} from "../assets/img/icons/map/icon-pending.svg";
import {ReactComponent as IconStarted} from "../assets/img/icons/map/icon-started.svg";
import {ReactComponent as IconPaused} from "../assets/img/icons/map/icon-paused.svg";
import {ReactComponent as IconCompleted} from "../assets/img/icons/map/icon-completed.svg";
import {ReactComponent as IconCancelled} from "../assets/img/icons/map/icon-cancelled.svg";
import {ReactComponent as IconRescheduled} from "../assets/img/icons/map/icon-rescheduled.svg";
import {ReactComponent as IconIncomplete} from "../assets/img/icons/map/icon-incomplete.svg";

export enum SocketMessage {
    CREATESERVICETICKET= 'createServiceTicketMsg',
    CREATENOTIFICATION = 'notification_center',
}

export const STATUSES = [
  { id: 0, title: 'Pending', icon: IconPending, color: '#828282' },
  { id: 1, title: 'Started', icon: IconStarted, color: '#00AAFF' },
  { id: 5, title: 'Paused', icon: IconPaused, color: '#FA8029'},
  { id: 2, title: 'Completed', icon: IconCompleted, color: '#50AE55'},
  { id: 3, title: 'Cancelled', icon: IconCancelled, color: '#A107FF'},
  { id: 4, title: 'Rescheduled', icon: IconRescheduled, color: '#828282' },
  { id: 6, title: 'Incomplete', icon: IconIncomplete, color: '#F50057'},
];
