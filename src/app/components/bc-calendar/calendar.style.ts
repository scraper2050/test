import {CALENDAR_BUTTON_COLOR, PRIMARY_BLUE} from "../../../constants";

export default (): any => ({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerDate: {
    fontSize: 18,
    fontWeight: 500,
    width: 130,
  },
  headerArrow: {
    backgroundColor: '#D0D3DC',
    borderRadius: 20,
    padding: 0,
    marginRight: 5,
  },
  headerArrowIcon: {
    color: 'white',
    fontSize: 24,
  },
  headerTodayButton: {
    color: CALENDAR_BUTTON_COLOR,
    borderRadius: 8,
  },

  monthSpinnerContainer: {
    background: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  monthContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  monthDayContainer: {
    border: 'solid #D0D3DC',
    borderWidth: '1px 0 0 1px',
    display: 'flex',
    flexDirection: 'column',
    width: '14.25%',
    height: '12.5vh',
    overflow: 'hidden',
  },
  monthDayContainerLastRow: {
    borderBottomWidth: 1,
  },
  monthDayContainerLastColumn: {
    borderRightWidth: 1,
  },
  dayName: {
    width: '14.25%',
    fontSize: '0.75rem',
    color: '#828282',
    padding: 10,
    margin: 0,
    borderTop: '1px solid #D0D3DC',
  },
  monthDayDateContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  monthDayDate: {
    padding: '0.25rem',
    fontSize: '0.75rem',
    margin: '5px 10px 0 5px',
    width: '1.75rem',
    lineHeight: '1.25rem',
    textAlign: 'center',
  },
  monthDayMonth: {
    padding: '0.25rem',
    fontSize: '0.8rem',
    margin: '5px 0 0 0',
    lineHeight: '1.25rem',
  },
  monthDayDateToday: {
    color: 'white',
    backgroundColor: PRIMARY_BLUE,
    borderRadius: 20,
  },
  dayEventContainer: {
    flex: 1,
    flexDirection: 'columns',
    padding: 4,
    overflowY: 'auto',
    scrollbarWidth: 2,

    '::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
      '-webkit-border-radius': 10,
      borderRadius: 10,
    },
    '::-webkit-scrollbar-thumb': {
      '-webkit-border-radius': 10,
      borderRadius: 10,
      background: 'rgba(255,0,0,0.8)',
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
    }
  },
  eventContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 4px',
    borderRadius: 3,
    marginBottom: 1,
    cursor: 'pointer',
  },
  eventContainerShadow: {
    boxShadow: '1px 1px 1px #bbb',
  },
  eventIcon: {
    width: 10,
    height: 10,
    marginRight: 6,
  },
  eventTitle: {
    fontSize: 10,
    color:'#4F4F4F',
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginRight: 5,
  },
  eventTime: {
    fontSize: 10,
    color:'#4F4F4F',
  },
  searchBox: {
    padding: '2px 5px',
    //border: `1px solid ${CALENDAR_BUTTON_COLOR}`,
    borderRadius: 8,
    boxShadow: `0 1px 2px 1px ${CALENDAR_BUTTON_COLOR}82`,
  },
  searchBoxFocused: {
    borderWidth: 2,
    borderColor: PRIMARY_BLUE,
  },
  searchBoxInput: {
    color: CALENDAR_BUTTON_COLOR,
  }
});
