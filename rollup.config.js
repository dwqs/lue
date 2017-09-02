import babel from 'rollup-plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
    input: 'src/index.js',
    name: 'Lue',
    output: {
        file: 'dist/lue.min.js',
        format: 'umd'
    },
    plugins: [
        commonjs(),
        resolve({
            customResolveOptions: 'node_modules',
            jsnext: true,
            main: true
        }),
        babel({
            exclude: 'node_modules/**',
            externalHelpers: false,
            runtimeHelpers: true,
            babelrc: false,
            presets: [
                [
                    'es2015',
                    {
                        'modules': false
                    }
                ],
                'stage-2'
            ],
            plugins: ['transform-runtime']
        }),
        cleanup(),
        uglify({}, minify)
    ]
};
