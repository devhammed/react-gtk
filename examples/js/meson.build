project(
    'com.github.devhammed.reactGTKJS',
    'c',
    version: '1.0.0'
)

gnome = import('gnome')

exec_name = 'React GTK JavaScript'

app_id = meson.project_name()

pkgdatadir = join_paths(get_option('datadir'), app_id)

libdir = join_paths(get_option('prefix'), get_option('libdir'))

exec_dir = join_paths(libdir, app_id)

source_conf = configuration_data()

source_conf.set('GJS', find_program('gjs').path())
source_conf.set('SH', find_program('sh').path())
source_conf.set('PACKAGE_NAME', app_id)
source_conf.set('PACKAGE_VERSION', meson.project_version())
source_conf.set('PREFIX', get_option('prefix'))
source_conf.set('LIBDIR', libdir)
source_conf.set('EXEC', join_paths(exec_dir, exec_name))
source_conf.set('PKGDATADIR', pkgdatadir)

install_data(
    configure_file(
        input: join_paths('data', app_id, '.in'),
        output: app_id,
        configuration: source_conf,
    ),
    install_dir: get_option('bindir'),
    install_mode: 'rwxr-xr-x'
)

install_data(
    configure_file(
        input: join_paths('dist', 'index.js'),
        output: exec_name,
        configuration: source_conf,
    ),
    install_dir: exec_dir,
)

install_data(
    configure_file(
        input: join_paths('data', app_id, '.desktop.in'),
        output: app_id + '.desktop',
        configuration: source_conf,
    ),
    install_dir: join_paths(get_option('datadir'), 'applications'),
)

install_data(
    configure_file(
        input: join_paths('data', app_id, '.appdata.xml.in'),
        output: app_id + '.appdata.xml',
        configuration: source_conf,
    ),
    install_dir: join_paths(get_option('datadir'), 'metainfo'),
)
