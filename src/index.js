import {
  createRoot,
  GtkBox,
  GtkButton,
  GtkLabel,
  GtkOrientation,
  GtkWindow,
} from './reconciler';
import { useEffect, useMemo, useRef, useState } from 'react';

function MyApp(props) {
  const [count, setCount] = useState(0);
  const hasClickedFiveTimes = useMemo(() => count === 5, [count]);

  return (
    <GtkWindow defaultHeight={600} defaultWidth={800} title='My App'>
      <GtkBox orientation={GtkOrientation.VERTICAL} spacing={50}>
        <GtkLabel label={count.toString()} />
        <GtkButton
          label={hasClickedFiveTimes ? 'You are now a developer!' : 'Click Me'}
          onClicked={
            hasClickedFiveTimes ? null : () => setCount((count) => count + 1)
          }
        />
      </GtkBox>
    </GtkWindow>
  );
}

const root = createRoot({
  id: 'com.github.devhammed.reactGTK',
});

root.render(<MyApp />);
