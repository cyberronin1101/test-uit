import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle, ThemeProvider } from "styled-components";
import {QueryClient, QueryClientProvider} from 'react-query';


const theme = {
  main: {
    color: '#333'
  }
}

type ThemeType = typeof theme;

const GlobalStyle = createGlobalStyle<{theme: ThemeType}>`
  body {
    margin: 0;
    padding: 0;
  }
  html {
    margin: 0;
    padding: 0;
    font-size: 14px;
    line-height: 1.2em;
    font-family: Tahoma,serif;
    color: ${props => props.theme.main.color};
  }
`

const queryClient = new QueryClient();

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider  theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
