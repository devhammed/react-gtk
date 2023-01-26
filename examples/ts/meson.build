project(
    'com.github.devhammed.reactGTKTS',
    'c',
    version: '1.0.0'
)

gnome = import('gnome')

app_id = meson.project_name()

source_conf = configuration_data()

source_conf.set('PACKAGE_ID', app_id)

source_conf.set('PACKAGE_NAME', 'React GTK TypeScript')

source_conf.set('RESOURCES_URI', 'resource:///com/github/devhammed/reactGTKTS')

source_conf.set('JS_MAIN_FILE', join_paths('build', app_id + '.js'))

source_conf.set(
    'JS_MAIN_URI',
    join_paths(
        source_conf.get('RESOURCES_URI'),
        source_conf.get('JS_MAIN_FILE')
    )
)

source_conf.set('PACKAGE_VERSION', meson.project_version())

source_conf.set('PREFIX', get_option('prefix'))

source_conf.set('LIBDIR', join_paths(get_option('prefix'), get_option('libdir')))

source_conf.set('PKGDATADIR', join_paths(get_option('prefix'), get_option('datadir'), app_id))

configure_file(
    input: join_paths('dist',  'index.js'),
    output: app_id + '.js',
    configuration: source_conf,
)

custom_target(
    'app',
    console: true,
    install: false,
    output: 'compile-app',
    command: [
        find_program('npm').path(), 'run', 'build', '&&',
        'meson', '--reconfigure', '&&',
        'meson', 'compile'
    ]
)

executable(
    app_id,
    configure_file(
        input: join_paths('data',  'program.c.in'),
        output: app_id + '.c',
        configuration: source_conf,
    ),
    gnome.compile_resources(
        app_id + '-resources',
        configure_file(
            input: join_paths('data',  'program.gresource.xml.in'),
            output: app_id + '.gresource.xml',
            configuration: source_conf,
        ),
    ),
    install: true,
    dependencies: [dependency('gjs-1.0')]
)

install_data(
    configure_file(
        input: join_paths('data', 'program.desktop.in'),
        output: app_id + '.desktop',
        configuration: source_conf,
    ),
    install_dir: join_paths(get_option('datadir'), 'applications'),
)

install_data(
    configure_file(
        input: join_paths('data', 'program.appdata.xml.in'),
        output: app_id + '.appdata.xml',
        configuration: source_conf,
    ),
    install_dir: join_paths(get_option('datadir'), 'metainfo'),
)
