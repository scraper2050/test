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
  { title: 'Pending', icon: IconPending, color: '#828282' },
  { title: 'Started', icon: IconStarted, color: '#00AAFF' },
  { title: 'Paused', icon: IconPaused, color: '#FA8029'},
  { title: 'Completed', icon: IconCompleted, color: '#50AE55'},
  { title: 'Cancelled', icon: IconCancelled, color: '#A107FF'},
  { title: 'Rescheduled', icon: IconRescheduled, color: '#828282' },
  { title: 'Incomplete', icon: IconIncomplete, color: '#F50057'},
];
