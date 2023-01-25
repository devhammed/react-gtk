import { MyApp } from './components/app';
import { createRoot } from 'react-gtk-renderer';

imports.package.init({
  name: '@PACKAGE_NAME@',
  version: '@PACKAGE_VERSION@',
  prefix: '@PREFIX@',
  libdir: '@LIBDIR@',
});

imports.package.run({
  main: function (argv) {
    const root = createRoot({
      id: '@PACKAGE_NAME@',
    });

    root.render(<MyApp />, argv);
  },
});
