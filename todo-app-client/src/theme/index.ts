import { colors, createTheme } from '@mui/material';

export const index = createTheme({
  palette: {
    orange: {
      main: colors.orange[500],
      light: colors.orange[400],
      dark: colors.orange[700],
    },
    green: {
      main: colors.green[600],
      light: colors.green[500],
      dark: colors.green[800],
    },
    red: {
      main: colors.red[600],
      light: colors.red[500],
      dark: colors.red[800],
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    orange: Palette['primary'];
    green: Palette['primary'];
    red: Palette['primary'];
  }

  interface PaletteOptions {
    orange?: PaletteOptions['primary'];
    green?: PaletteOptions['primary'];
    red?: PaletteOptions['primary'];
  }
}
