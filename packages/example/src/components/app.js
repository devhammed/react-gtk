import {
  GtkBox,
  GtkButton,
  GtkEntry,
  GtkLabel,
  GtkStack,
  GtkStackPage,
  GtkTextView,
  GtkWindow,
} from 'react-gtk-renderer';
import { useEffect, useMemo, useRef, useState } from 'react';

const { Gtk } = imports.gi;

export function MyApp(props) {
  const stackRef = useRef(null);
  const firstPageRef = useRef(null);
  const secondPageRef = useRef(null);
  const secondWinRef = useRef(null);
  const [count, setCount] = useState(0);
  const hasClickedSixTimes = useMemo(() => count === 6, [count]);

  return (
    <>
      <GtkWindow defaultHeight={600} defaultWidth={800} title='My App'>
        <GtkStack
          ref={stackRef}
          transitionType={Gtk.StackTransitionType.SLIDE_RIGHT}>
          <GtkStackPage
            ref={firstPageRef}
            marginStart={25}
            marginEnd={25}
            spacing={25}
            valign={Gtk.Align.CENTER}
            halign={Gtk.Align.CENTER}
            orientation={Gtk.Orientation.VERTICAL}>
            <GtkLabel label='Hello World' />

            {hasClickedSixTimes &&
              '<i>Hi World, testing insertBefore and text instance!</i>'}

            <GtkEntry
              onChanged={(entry) => {
                console.log(entry.buffer.text);
              }}
            />

            <GtkButton
              onClicked={
                hasClickedSixTimes
                  ? () => {
                      secondWinRef.current?.present();
                      setCount(0);
                    }
                  : () => setCount((prev) => prev + 1)
              }>
              {hasClickedSixTimes
                ? `You are now a developer, click again!`
                : `You have clicked me ${count} times`}
            </GtkButton>

            <GtkButton
              onClicked={() => {
                const stack = stackRef.current;
                const secondPage = secondPageRef.current;

                if (stack && secondPage) {
                  stack.set_visible_child(secondPage);
                }
              }}>
              Next page
            </GtkButton>
          </GtkStackPage>

          <GtkStackPage
            ref={secondPageRef}
            marginStart={25}
            marginEnd={25}
            spacing={25}
            valign={Gtk.Align.CENTER}
            halign={Gtk.Align.CENTER}
            orientation={Gtk.Orientation.VERTICAL}>
            <GtkLabel label='Hi World' />

            <GtkButton
              label='Previous page'
              onClicked={() => {
                const stack = stackRef.current;
                const firstPage = firstPageRef.current;

                if (stack && firstPage) {
                  stack.set_visible_child(firstPage);
                }
              }}
            />
          </GtkStackPage>
        </GtkStack>
      </GtkWindow>

      <GtkWindow
        modal
        ref={secondWinRef}
        defaultHeight={500}
        defaultWidth={500}
        title='Royal Hotness'>
        <GtkBox
          marginStart={25}
          marginEnd={25}
          spacing={25}
          valign={Gtk.Align.CENTER}
          halign={Gtk.Align.CENTER}
          orientation={Gtk.Orientation.VERTICAL}>
          <GtkLabel label='I am here to tell you that your head is hot.' />

          <GtkButton onClicked={() => secondWinRef.current?.close()}>
            Close Me
          </GtkButton>
        </GtkBox>
      </GtkWindow>
    </>
  );
}
