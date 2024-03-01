// Locates node modules for bundling
import resolve from '@rollup/plugin-node-resolve';

// Converts Common JS modules to ES6 for Rollup bundling
import commonjs from '@rollup/plugin-commonjs';

// Minifies the code base
import terser from '@rollup/plugin-terser';

// Builds a single executable
import execute from "rollup-plugin-execute";

// Variable injection
import replace from '@rollup/plugin-replace';

// Local app config
import config from "./conf/build.js";

// Set enviroment based on flag passed in to rollup configuration
const environment = process.env.production === "true" ? "production" : "development";

export default [
    {
        input: 'src/main.js',
        external: ['healthchart'],
        output: {
            file: 'dist/js/healthchart.js',
            format: 'iife',
            globals: {
                d3: 'd3',
                healthchart: 'healthchart'
            },
        },
        plugins: [
            resolve(),
            commonjs(),
            replace({
                preventAssignment: true,
                __BUILD_ENVIRONMENT__: JSON.stringify(environment),
                __LOGGING_URI__:       JSON.stringify(config.logging),
                __PDF_GEN_HOST__:      JSON.stringify(config[environment].pdfGenHost)
            }),
            //terser(),
            execute([
                "mkdir -p dist",
                "cp -R css dist/",
                "cp -R images dist/",
                "cat lib/healthchart.js dist/js/healthchart.js > dist/js/healthchart.bundle.js",
            ])
        ],
    },
    {
        input: 'src/launch.js',
        external: ['healthchart'],
        output: {
            file: 'dist/js/launch.js',
            format: 'iife'
        },
        plugins: [
            resolve(),
            commonjs(),
            replace({
                preventAssignment: true,
                __CLIENT_ID__:         JSON.stringify(config[environment].clientId),
                __BUILD_ENVIRONMENT__: JSON.stringify(environment),
                __LOGGING_URI__:       JSON.stringify(config.logging)
            }),
            //terser()
        ]
    }
];