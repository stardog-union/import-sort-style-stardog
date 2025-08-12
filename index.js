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

  function endsWith(...suffixes) {
    return (text) => {
      return suffixes.some((suffix) => text.endsWith(suffix));
    };
  }

  return [
    // import "foo";
    { match: and(hasNoMember, isAbsoluteModule) },
    { separator: true },

    // import "./foo";
    { match: and(hasNoMember, isRelativeModule) },
    { separator: true },

    // import … from "foo";
    {
      match: and(
        isAbsoluteModule,
        not(moduleName(startsWith('bones'))),
        not(moduleName(startsWith('src')))
      ),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import … from "bones/foo";
    {
      match: and(isAbsoluteModule, moduleName(startsWith('bones'))),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },

    // import … from "src/foo";
    {
      match: and(
        isAbsoluteModule,
        moduleName(startsWith('src')),
        not(moduleName(endsWith('.module.scss')))
      ),
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

    // import … from "src/foo";
    {
      match: and(
        isAbsoluteModule,
        moduleName(startsWith('src')),
        moduleName(endsWith('.module.scss'))
      ),
      sort: moduleName(naturally),
      sortNamedMembers: alias(unicode),
    },
    { separator: true },
  ];
};
