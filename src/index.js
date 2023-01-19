import { useEffect, useRef, useState } from 'react';
import { createRoot } from './reconciler';
const { Gtk } = imports.gi;

function MyApp(props) {
  const [count, setCount] = useState(0);

  return (
    <gtk-window defaultHeight={600} defaultWidth={800} title='My App'>
      <gtk-box orientation={Gtk.Orientation.VERTICAL} spacing={50}>
        {count >= 5 && <gtk-label label={`${count}`} />}
        <gtk-button onClicked={() => setCount(count + 1)} label='Click Me'>
          <gtk-box spacing={50}>
            {count < 5 && <gtk-label label={`${count}`} />}
            <gtk-label label='Click me MF' />
          </gtk-box>
        </gtk-button>
      </gtk-box>
    </gtk-window>
  );
}

const root = createRoot({
  id: 'com.github.devhammed.reactGTK',
});

root.render(<MyApp />);
