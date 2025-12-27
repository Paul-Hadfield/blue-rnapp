import { StyleSheet } from 'react-native-unistyles';

// Light theme
const lightTheme = {
  colors: {
    primary: '#1185fe',
    primaryHover: '#0d6ecd',
    background: '#ffffff',
    backgroundSecondary: '#f7f7f7',
    surface: '#ffffff',
    surfaceElevated: '#f0f0f0',
    text: '#14171a',
    textSecondary: '#657786',
    textTertiary: '#999999',
    border: '#e1e8ed',
    borderLight: '#ddd',
    success: '#17bf63',
    error: '#f4212e',
    warning: '#ffad1f',
    link: '#1185fe',
    buttonText: '#ffffff',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 13,
    md: 14,
    base: 15,
    lg: 16,
    xl: 20,
    xxl: 32,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

// Dark theme
const darkTheme = {
  colors: {
    primary: '#1d9bf0',
    primaryHover: '#1a8cd8',
    background: '#000000',
    backgroundSecondary: '#16181c',
    surface: '#16181c',
    surfaceElevated: '#1e2328',
    text: '#e7e9ea',
    textSecondary: '#71767b',
    textTertiary: '#5b5f63',
    border: '#2f3336',
    borderLight: '#38393d',
    success: '#00ba7c',
    error: '#f4212e',
    warning: '#ffad1f',
    link: '#1d9bf0',
    buttonText: '#ffffff',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 13,
    md: 14,
    base: 15,
    lg: 16,
    xl: 20,
    xxl: 32,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

// TypeScript setup
type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

// Configure Unistyles
StyleSheet.configure({
  themes: {
    light: lightTheme,
    dark: darkTheme,
  },
  breakpoints,
  settings: {
    adaptiveThemes: true,
  },
});
