import merge from 'deepmerge';
import { TableStyles, Theme, Themes } from './types';
import { defaultThemes } from './themes';

export const defaultStyles = (theme: Theme): TableStyles => ({
  table: {
    style: {
      color: theme.text.primary,
      backgroundColor: theme.background.default,
    },
  },
  tableWrapper: {
    style: {
      display: 'table',
    },
  },
  responsiveWrapper: {
    style: {
      boxShadow: 'rgba(0, 0, 0, 0.02) 0px 0px 0px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 0px',
    },
  },
  header: {
    style: {
      fontSize: '22px',
      color: theme.text.primary,
      backgroundColor: theme.background.default,
      minHeight: '56px',
      paddingLeft: '16px',
      paddingRight: '8px',
    },
  },
  subHeader: {
    style: {
      backgroundColor: theme.background.default,
      minHeight: '52px',
    },
  },
  head: {
    style: {
      color: theme.text.primary,
      fontSize: '14px',
      fontWeight: 500,
    },
  },
  headRow: {
    style: {
      background: theme.background.headRow,
      boxShadow: 'rgba(0, 0, 0, 0.02) 0px 0px 0px 1px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
      backdropFilter: 'blur(5px)',
      minHeight: '60px',
      borderBottomStyle: 'none',
      color: theme.text.primary,
      borderRadius: '4px',
    },
    denseStyle: {
      minHeight: '32px',
    },
  },
  headCells: {
    style: {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
    draggingStyle: {
      cursor: 'move',
    },
  },
  contextMenu: {
    style: {
      backgroundColor: theme.context.background,
      fontSize: '18px',
      fontWeight: 400,
      color: theme.context.text,
      paddingLeft: '16px',
      paddingRight: '8px',
      transform: 'translate3d(0, -100%, 0)',
      transitionDuration: '125ms',
      transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
      willChange: 'transform',
    },
    activeStyle: {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  cells: {
    style: {
      paddingLeft: '16px',
      paddingRight: '16px',
      wordBreak: 'break-word',
      // textTransform: 'lowercase',
    },
    draggingStyle: {},
  },
  rows: {
    style: {
      fontSize: '12px',
      fontWeight: 400,
      color: theme.text.secondary,
      backgroundColor: theme.background.default,
      minHeight: '40px',
      borderBottom: '0px',
      borderRadius: '6px',
      margin: '2px 0px',
      padding: '10px 0px',
      '&:not(:last-of-type)': {
        // borderBottomStyle: 'solid',
        borderBottomWidth: '0px',
        // borderBottomColor: theme.divider.default,
      },
    },
    denseStyle: {
      minHeight: '32px',
      padding: '5px 0px',
    },
    selectedHighlightStyle: {
      // use nth-of-type(n) to override other nth selectors
      '&:nth-of-type(n)': {
        color: theme.selected.text,
        backgroundColor: theme.selected.default,
        borderBottomColor: theme.background.default,
      },
    },
    highlightOnHoverStyle: {
      color: theme.highlightOnHover.text,
      backgroundColor: theme.highlightOnHover.default,
      transitionDuration: '0.15s',
      transitionProperty: 'background-color',
      borderBottomColor: theme.background.default,
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: theme.background.default,
    },
    stripedStyle: {
      color: theme.striped.text,
      backgroundColor: theme.highlightOnHover.light,
    },
  },
  expanderRow: {
    style: {
      color: theme.text.primary,
      backgroundColor: theme.background.default,
    },
  },
  expanderCell: {
    style: {
      flex: '0 0 48px',
    },
  },
  expanderButton: {
    style: {
      color: theme.button.default,
      fill: theme.button.default,
      backgroundColor: 'transparent',
      borderRadius: '2px',
      transition: '0.25s',
      height: '100%',
      width: '100%',
      '&:hover:enabled': {
        cursor: 'pointer',
      },
      '&:disabled': {
        color: theme.button.disabled,
      },
      '&:hover:not(:disabled)': {
        cursor: 'pointer',
        backgroundColor: theme.button.hover,
      },
      '&:focus': {
        outline: 'none',
        backgroundColor: theme.button.focus,
      },
      svg: {
        margin: 'auto',
      },
    },
  },
  pagination: {
    style: {
      color: theme.text.secondary,
      fontSize: '13px',
      minHeight: '56px',
      backgroundColor: theme.background.default,
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      borderTopColor: theme.divider.default,
    },
    pageButtonsStyle: {
      borderRadius: '50%',
      height: '40px',
      width: '40px',
      padding: '8px',
      margin: '2px',
      cursor: 'pointer',
      transition: '0.4s',
      color: theme.button.default,
      fill: theme.button.default,
      backgroundColor: 'transparent',
      '&:disabled': {
        cursor: 'unset',
        color: theme.button.disabled,
        fill: theme.button.disabled,
      },
      '&:hover:not(:disabled)': {
        backgroundColor: theme.button.hover,
      },
      '&:focus': {
        outline: 'none',
        backgroundColor: theme.button.focus,
      },
    },
  },
  noData: {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.text.primary,
      backgroundColor: theme.background.default,
    },
  },
  progress: {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.text.primary,
      backgroundColor: theme.background.default,
    },
  },
});
export const defaultStylesSm = (theme: Theme): TableStyles => ({
  table: {
    style: {
      color: theme.text.primary,
      backgroundColor: theme.background.default,
    },
  },
  tableWrapper: {
    style: {
      display: 'table',
    },
  },
  responsiveWrapper: {
    style: {
      // borderRadius: '8px',
      // boxShadow: '0 0 12px 2px hsla(0,0%,50%,.2)',
      boxShadow: 'rgba(0, 0, 0, 0.02) 0px 0px 0px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 0px',
    },
  },
  header: {
    style: {
      fontSize: '22px',
      color: theme.text.primary,
      backgroundColor: theme.background.default,
      minHeight: '56px',
      paddingLeft: '16px',
      paddingRight: '8px',
    },
  },
  subHeader: {
    style: {
      backgroundColor: theme.background.default,
      minHeight: '52px',
    },
  },
  head: {
    style: {
      color: theme.text.primary,
      fontSize: '14px',
      fontWeight: 500,
    },
  },
  headRow: {
    style: {
      // background: '#f17300',
      background: theme.background.headRow,
      // background: '#005f73',
      // background: '#335c67',
      // background: '#006d77',
      boxShadow: 'rgba(0, 0, 0, 0.02) 0px 0px 0px 1px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
      backdropFilter: 'blur(5px)',
      // backgroundColor: alpha(theme.palette['primary'].lighter, 0.5),
      minHeight: '60px',
      // borderBottomWidth: '1px',
      // borderBottomColor: theme.divider.default,
      borderBottomStyle: 'none',
      color: theme.text.primary,
      borderRadius: '4px',
    },
    denseStyle: {
      minHeight: '32px',
    },
  },
  headCells: {
    style: {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
    draggingStyle: {
      cursor: 'move',
    },
  },
  contextMenu: {
    style: {
      backgroundColor: theme.context.background,
      fontSize: '18px',
      fontWeight: 400,
      color: theme.context.text,
      paddingLeft: '16px',
      paddingRight: '8px',
      transform: 'translate3d(0, -100%, 0)',
      transitionDuration: '125ms',
      transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
      willChange: 'transform',
    },
    activeStyle: {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  cells: {
    style: {
      paddingLeft: '0px',
      paddingRight: '0px',
      wordBreak: 'break-word',
      // textTransform: 'lowercase',
    },
    draggingStyle: {},
  },
  rows: {
    style: {
      fontSize: '12px',
      fontWeight: 400,
      color: theme.text.secondary,
      // backgroundColor: theme.background.default,
      minHeight: '40px',
      borderBottom: '0px',
      borderRadius: '6px',
      margin: '2px 0px',
      padding: '10px 0px',
      '&:not(:last-of-type)': {
        // borderBottomStyle: 'solid',
        borderBottomWidth: '0px',
        // borderBottomColor: theme.divider.default,
      },
    },
    denseStyle: {
      minHeight: '32px',
      padding: '5px 0px',
    },
    selectedHighlightStyle: {
      // use nth-of-type(n) to override other nth selectors
      '&:nth-of-type(n)': {
        color: theme.selected.text,
        backgroundColor: theme.selected.default,
        borderBottomColor: theme.background.default,
      },
    },
    highlightOnHoverStyle: {
      color: theme.highlightOnHover.text,
      backgroundColor: theme.highlightOnHover.default,
      transitionDuration: '0.15s',
      transitionProperty: 'background-color',
      borderBottomColor: theme.background.default,
      outlineStyle: 'solid',
      outlineWidth: '1px',
      outlineColor: theme.background.default,
    },
    // stripedStyle: {
    //   color: theme.striped.text,
    //   backgroundColor: theme.highlightOnHover.light,
    // },
  },
  expanderRow: {
    style: {
      color: theme.text.primary,
      backgroundColor: theme.background.default,
    },
  },
  expanderCell: {
    style: {
      flex: '0 0 48px',
    },
  },
  expanderButton: {
    style: {
      color: theme.button.default,
      fill: theme.button.default,
      backgroundColor: 'transparent',
      borderRadius: '2px',
      transition: '0.25s',
      height: '100%',
      width: '100%',
      '&:hover:enabled': {
        cursor: 'pointer',
      },
      '&:disabled': {
        color: theme.button.disabled,
      },
      '&:hover:not(:disabled)': {
        cursor: 'pointer',
        backgroundColor: theme.button.hover,
      },
      '&:focus': {
        outline: 'none',
        backgroundColor: theme.button.focus,
      },
      svg: {
        margin: 'auto',
      },
    },
  },
  pagination: {
    style: {
      color: theme.text.secondary,
      fontSize: '13px',
      minHeight: '56px',
      backgroundColor: theme.background.default,
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      borderTopColor: theme.divider.default,
    },
    pageButtonsStyle: {
      borderRadius: '50%',
      height: '40px',
      width: '40px',
      padding: '8px',
      margin: '2px',
      cursor: 'pointer',
      transition: '0.4s',
      color: theme.button.default,
      fill: theme.button.default,
      backgroundColor: 'transparent',
      '&:disabled': {
        cursor: 'unset',
        color: theme.button.disabled,
        fill: theme.button.disabled,
      },
      '&:hover:not(:disabled)': {
        backgroundColor: theme.button.hover,
      },
      '&:focus': {
        outline: 'none',
        backgroundColor: theme.button.focus,
      },
    },
  },
  noData: {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.text.primary,
      backgroundColor: theme.background.default,
    },
  },
  progress: {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.text.primary,
      backgroundColor: theme.background.default,
    },
  },
});
export const createStyles = (
  customStyles: TableStyles = {},
  themeName = 'default',
  inherit: Themes = 'default'
): TableStyles => {
  const themeType = defaultThemes[themeName] ? themeName : inherit;

  return merge(defaultStyles(defaultThemes[themeType]), customStyles);
};
export const createStylesSm = (
  customStyles: TableStyles = {},
  themeName = 'defaultsm',
  inherit: Themes = 'defaultsm'
): TableStyles => {
  const themeType = defaultThemes[themeName] ? themeName : inherit;

  return merge(defaultStylesSm(defaultThemes[themeType]), customStyles);
};
