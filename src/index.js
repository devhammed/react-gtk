import { useEffect, useRef, useState } from 'react';
import { createRoot } from './reconciler';
const { Gtk } = imports.gi;

function MyApp(props) {
  const [count, setCount] = useState(0);

  return (
    <gtk-window defaultHeight={600} defaultWidth={800} title='My App'>
      <gtk-box orientation={Gtk.Orientation.VERTICAL} spacing={50}>
        <gtk-label label={`${count}`} />

        <gtk-button
          onClicked={count == 5 ? null : () => setCount((count) => count + 1)}
          label='Click Me'>
          <gtk-label label='Click me MF' />
        </gtk-button>
      </gtk-box>
    </gtk-window>
  );
}

const root = createRoot({
  id: 'com.github.devhammed.reactGTK',
});

root.render(<MyApp />);
