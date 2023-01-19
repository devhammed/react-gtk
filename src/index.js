const { Gtk } = imports.gi;
import { createRoot } from './reconciler';
import { useEffect, useMemo, useRef, useState } from 'react';

function MyApp(props) {
  const [count, setCount] = useState(0);
  const hasClickedFiveTimes = useMemo(() => count === 5, [count]);

  return (
    <gtk-window defaultHeight={600} defaultWidth={800} title='My App'>
      <gtk-box orientation={Gtk.Orientation.VERTICAL} spacing={50}>
        <gtk-label label={count.toString()} />

        <gtk-button
          label={hasClickedFiveTimes ? 'You are now a developer!' : 'Click Me'}
          onClicked={
            hasClickedFiveTimes ? null : () => setCount((count) => count + 1)
          }
        />
      </gtk-box>
    </gtk-window>
  );
}

const root = createRoot({
  id: 'com.github.devhammed.reactGTK',
});

root.render(<MyApp />);
