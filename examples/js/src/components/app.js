import {
  GtkAlign,
  GtkBox,
  GtkButton,
  GtkEntry,
  GtkLabel,
  GtkOrientation,
  GtkStack,
  GtkStackPage,
  GtkStackTransitionType,
  GtkWindow,
} from 'react-gtk-renderer';
import { useEffect, useMemo, useRef, useState } from 'react';

export function MyApp() {
  const [count, setCount] = useState(0);
  const stackRef = useRef();
  const entryRef = useRef();
  const secondWinRef = useRef();
  const hasClickedSixTimes = useMemo(() => count === 6, [count]);

  useEffect(() => {
    entryRef.current.buffer.text = 'Hello World 1';
    entryRef.current.buffer.delete_text(11, -1);
    entryRef.current.buffer.insert_text(11, ', Hi World', -1);
  }, []);

  return (
    <>
      <GtkWindow defaultHeight={600} defaultWidth={800} title='My App'>
        <GtkStack
          ref={stackRef}
          transitionType={GtkStackTransitionType.SLIDE_RIGHT}>
          <GtkStackPage
            name='firstPage'
            marginStart={25}
            marginEnd={25}
            spacing={25}
            valign={GtkAlign.CENTER}
            halign={GtkAlign.CENTER}
            orientation={GtkOrientation.VERTICAL}>
            <GtkLabel label='Hello World' />

            {hasClickedSixTimes &&
              '<i>Hi World, testing insertBefore and text instance!</i>'}

            <GtkEntry
              ref={entryRef}
              attributes={[
                {
                  start: 0,
                  end: 5,
                  type: 'foreground',
                  value: 'red',
                },
                {
                  start: 5,
                  end: 11,
                  type: 'weight',
                  value: 'bold',
                },
              ]}
              onChanged={(entry) => {
                console.log(entry.text);
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
                stackRef.current.visibleChildName = 'secondPage';
              }}>
              Next page
            </GtkButton>
          </GtkStackPage>

          <GtkStackPage
            name='secondPage'
            marginStart={25}
            marginEnd={25}
            spacing={25}
            valign={GtkAlign.CENTER}
            halign={GtkAlign.CENTER}
            orientation={GtkOrientation.VERTICAL}>
            <GtkLabel label='Hi World' />

            <GtkButton
              label='Previous page'
              onClicked={() => {
                console.log(
                  'current stack page name:',
                  stackRef.current.visibleChildName
                );

                stackRef.current.visibleChildName = 'firstPage';
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
          valign={GtkAlign.CENTER}
          halign={GtkAlign.CENTER}
          orientation={GtkOrientation.VERTICAL}>
          <GtkLabel label='I am here to tell you that your head is hot.' />

          <GtkButton onClicked={() => secondWinRef.current?.close()}>
            Close Me
          </GtkButton>
        </GtkBox>
      </GtkWindow>
    </>
  );
}
