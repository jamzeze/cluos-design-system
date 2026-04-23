# CSS-in-JS Setup (styled-components / emotion)

## 1. Install

```bash
npm install github:jamzeze/cluos-design-system
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
  background: ${({ theme }) => theme.color.teal};
  color: ${({ theme }) => theme.color.textOnTeal};
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: ${({ theme }) => theme.font.sans};
  transition: background ${({ theme }) => theme.motion.durFast} ${({ theme }) => theme.motion.easeOut};

  &:hover { background: ${({ theme }) => theme.color.tealDeep}; }
`;
```

## 4. Or import directly (no ThemeProvider)

```tsx
import tokens from "@cluos/design-system";

const Card = styled.div`
  background: ${tokens.color.bg};
  border: 1px solid ${tokens.color.border};
  border-radius: ${tokens.radius.lg};
  padding: ${tokens.space[6]};
  box-shadow: ${tokens.shadow.sm};
`;
```

## 5. Point your LLM at the rules

```bash
ln -s node_modules/@cluos/design-system/DESIGN.md ./DESIGN.md
```
