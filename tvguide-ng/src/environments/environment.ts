// Yet more angular nonesense: cannot use value from environment in index.html
// and cannot use an alternative index.html by specifying an alternative in
// angular.json.
// So to retain the ability to load guide pages from the assets directory
// during development but be able to locate the tvguide ng content in
// a sub-directory of the server in production it must be built using
//
// ng build --deploy-url /tvguide/tvgng/
//
// Notice how the value for deploy-url IS NOT ACTUALLY A FORKING URL!
// And, of course, this DOES NOT FORKING WORK - still tries to
// load the NG content from the server root!
//
// Seems this (undocumented anywhere I can find) form might work as required:
//
// ng build --deploy-url /tvguide/tvgng/ --base-href /tvguide/tvgng/
//
// Alternatively modify the 'build' option in package.json and use
//
// npm run build
//
// which is somewhat easier to remember.
export const environment = {
    production: true,

    // This is the path to the pages currently used
    // by the 'legacy' tvguide with references to the STB NG content
    tvgpath: "/tvguide/tv-ng/",
};
