import {
  createRoot,
  GtkBox,
  GtkButton,
  GtkLabel,
  GtkWindow,
} from './reconciler';
import { useEffect, useMemo, useRef, useState } from 'react';

const { Gtk } = imports.gi;

function MyApp(props) {
  const secondWinRef = useRef(null);
  const [count, setCount] = useState(0);
  const hasClickedFiveTimes = useMemo(() => count === 5, [count]);

  return (
    <>
      <GtkWindow defaultHeight={600} defaultWidth={800} title='My App'>
        <GtkBox
          marginStart={25}
          marginEnd={25}
          valign={Gtk.Align.CENTER}
          halign={Gtk.Align.CENTER}
          orientation={Gtk.Orientation.VERTICAL}
          spacing={25}>
          <GtkLabel label={count.toString()} />
          <GtkButton
            label={
              hasClickedFiveTimes
                ? 'You are now a developer, click again!'
                : 'Click Me'
            }
            onClicked={
              hasClickedFiveTimes
                ? () => secondWinRef.current?.present()
                : () => setCount((count) => count + 1)
            }
          />
        </GtkBox>
      </GtkWindow>

      <GtkWindow
        ref={secondWinRef}
        defaultHeight={600}
        defaultWidth={800}
        title='Royal Hotness'>
        <GtkBox
          marginStart={25}
          marginEnd={25}
          spacing={25}
          valign={Gtk.Align.CENTER}
          halign={Gtk.Align.CENTER}
          orientation={Gtk.Orientation.VERTICAL}>
          <GtkLabel label='I am here to tell you that your head is hot.' />
          <GtkButton
            onClicked={() => secondWinRef.current?.close()}
            label='Close Me'
          />
        </GtkBox>
      </GtkWindow>
    </>
  );
}

const root = createRoot({
  id: 'com.github.devhammed.reactGTK',
});

root.render(<MyApp />);
