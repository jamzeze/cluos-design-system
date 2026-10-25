# CSS-in-JS Setup (styled-components / emotion)

## 1. Install

```bash
npm install github:jamzeze/cluos-design-system#v1.0.0
```

## 2. Wrap your app

```tsx
import { ThemeProvider } from "styled-components";
import tokens from "@cluos/design-system";

export default function App({ children }) {
  return <ThemeProvider theme={tokens}>{children}</ThemeProvider>;
}
```

## 3. Use in styled components

```tsx
import styled from "styled-components";

export const Button = styled.button`
  background: ${({ theme }) => theme.action.primary.base};
  color: ${({ theme }) => theme.action.primary.text};
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: ${({ theme }) => theme.font.sans};
  transition: background ${({ theme }) => theme.motion.durFast} ${({ theme }) => theme.motion.easeOut};

  &:hover { background: ${({ theme }) => theme.action.primary.deep}; }
`;
```

## 4. Or import directly (no ThemeProvider)

```tsx
import tokens from "@cluos/design-system";

const Card = styled.div`
  background: var(--cluos-surface);
  border: 1px solid var(--cluos-line);
  border-radius: var(--cluos-radius-md);
  padding: var(--cluos-space-6);
`;
```

## 5. Point your LLM at the rules

```bash
ln -s node_modules/@cluos/design-system/DESIGN.md ./DESIGN.md
```
