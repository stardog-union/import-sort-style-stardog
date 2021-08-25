module.exports = function (styleApi) {
  const {
    alias,
    and,
    dotSegmentCount,
    hasNoMember,
    isAbsoluteModule,
    isRelativeModule,
    moduleName,
    naturally,
    not,
    startsWith,
    unicode,
  } = styleApi;

  return [
    // import "foo";
    { match: and(hasNoMember, isAbsoluteModule) },
    { separator: true },

    // import "./foo";
    { match: and(hasNoMember, isRelativeModule) },
    { separator: true },

    // import … from "foo";
    {
      match: and(isAbsoluteModule, not(moduleName(startsWith("src")))),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import … from "src/foo";
    {
      match: and(isAbsoluteModule, moduleName(startsWith("src"))),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import … from "./foo";
    // import … from "../foo";
    {
      match: isRelativeModule,
      sort: [dotSegmentCount, moduleName(naturally)],
      sortNamedMembers: alias(unicode),
    },
    { separator: true },
  ];
};
