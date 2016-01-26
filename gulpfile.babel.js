// generated on 2015-09-14 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins(
      { pattern: '*' }
      );
const reload = browserSync.reload;

var runSequence = require('run-sequence');

gulp.task( 'doc-generation', () => {
  gulp.src("./app/scripts/**/*.js")
  .pipe($.yuidoc())
  .pipe(gulp.dest("./docs"));
});

gulp.task( 'jade', () => {
  var YOUR_LOCALS;
  return gulp.src(['./app/jade/*.jade'])
  .pipe($.jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
  // .pipe($.if('*.xml.html', $.rename("sitemap.xml") ))
  .pipe($.if('*.modal.html', $.rename({ extname: '.block'})))
  .pipe($.if('*.screen.html', $.rename({ extname: '.block'})))
  .pipe($.if('*.uielement.html', $.rename({ extname: '.block'})))
  .pipe($.if('*.block', gulp.dest('app/data'), gulp.dest('app')));
});

// gulp.task('test', function() {
//     return gulp.src('./app/tests/test-runner.html')
//         .pipe($.qunit());
// });

gulp.task('styles', () => {
    return gulp.src(['app/styles/*.scss', 'app/styles/browser-fixes/*.scss'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError) )
    .pipe($.autoprefixer({browsers: ['last 2 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint(['app/scripts/**/*.js','!app/scripts/plugins/*.js','!app/scripts/inline-assets.js']));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));


gulp.task('html', ['styles'], () => {
  const assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});
  return gulp.src(['app/*.html', 'app/**/*.*'])
    .pipe(assets)
    .pipe($.if(argv.stripdebug, stripConsoleOutput()))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.inlineSource()))
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe($.if('*.html', ext_replace('.php') ))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'fonts', 'jade'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components',
        '/node_modules': 'node_modules'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*',
    '.tmp/styles/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.**', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
  gulp.watch('app/jade/**/*.jade', ['jade']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap.js'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

// gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
//   return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
// });

gulp.task('copy-vendor-libraries', () => {
        return gulp.src(['app/vendor/**/*'], {
            base: 'app'
        }).pipe(gulp.dest('dist'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});


gulp.task('build', function( cb ) {
  runSequence('nuke',
    'jade',
    'lint',
    'html',
    'minify-css',
    'images',
    'extras',
    'copy-vendor-libraries',
    cb
    )
});

gulp.task('minify-css', ['styles'], function() {
  return gulp.src('dist/styles/**/*.css')
    .pipe($.minifyCss({compatibility: '*'}))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('nuke', function(cb) {
  del(['dist'], cb);
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

gulp.task('inlinesource', function () {
   // console.log( 'Plugins:', $.inlineSource );
    var options = {
        compress: false
    };

    return gulp.src('./app/*.html')
        .pipe($.inlineSource())
        .pipe(gulp.dest('./dist'));
});
