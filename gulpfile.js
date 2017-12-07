const gulp = require("gulp"),
  ts = require("gulp-typescript"),
  tsProject = ts.createProject("tsconfig.json"),
  del = require("del"),
  util = require("util"),
  nodemon = require("gulp-nodemon");

let watcher = gulp.watch("src/**/*.ts", ["clean", "compile"]);

gulp.task("clean", cb => {
  return del(["dist"]);
});

gulp.task("compile", ["clean"], () => {
  return tsProject
    .src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"));
});

gulp.task("watch", () => {
  watcher.on("change", event => {
    console.log("change detected, cleaning and recompiling to the dist folder");
  });
})

gulp.task("nodemon", ["compile"], cb => {
  nodemon({
    script: "dist/api/server.js"
  })
})

gulp.task("default", ["clean", "compile", "watch", "nodemon"], () => {
  return util.log("default task executed.");
});
