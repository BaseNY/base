Npm.depends({
        'elasticsearch': '2.1.4' // Where x.x.x is the version, e.g. 0.3.2
});

Package.on_use(function (api) {
        api.add_files('elasticsearch.js', 'server'); // Or 'client', or ['server', 'client']
});
