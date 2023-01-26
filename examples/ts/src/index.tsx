import { MyApp } from './components/app';
import { createRoot } from 'react-gtk-renderer';

declare const imports: any;

imports.package.init({
  name: '@PACKAGE_ID@',
  version: '@PACKAGE_VERSION@',
  prefix: '@PREFIX@',
  libdir: '@LIBDIR@',
  pkgdatadir: '@PKGDATADIR@',
});

imports.package.run({
  main: function (argv: string[]) {
    const root = createRoot({
      id: '@PACKAGE_ID@',
    });

    root.render(<MyApp />, argv);
  },
});
