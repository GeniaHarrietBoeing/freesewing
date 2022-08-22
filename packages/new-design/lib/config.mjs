export const config = {
  node: 14, // Minimum node version
  fileUri: 'https://raw.githubusercontent.com',
  repo: process.env.FS_REPO || 'freesewing/freesewing', // Repository to download from
  branch: process.env.FS_BRANCH || 'main', // Branch to download from
  i18n: [
    'account',
    'common',
    'patrons',
    'themes',
    'workbench',
    'errors',
    'i18n',
    'lab',
    'measurements',
    'optiongroups',
    'o_bella',
    'o_bent',
    'o_breanna',
    'o_brian',
    'o_titan',
    'parts',
    'plugin',
    'settings',
    'welcome',
  ],
  fetch: {
    sites: [
      "shared/utils.mjs",
      "shared/config/freesewing.mjs",
      "shared/config/i18n.config.mjs",
      "shared/config/next.mjs",
      "shared/config/postcss.config.js",
      "shared/config/tailwind.config.js",
      "shared/prebuild/contributors.mjs",
      "shared/hooks/useGist.js",
      "shared/hooks/useLocalStorage.js",
      "shared/hooks/useTheme.js",
      "shared/styles/code.css",
      "shared/styles/globals.css",
      "shared/styles/svg-freesewing-draft.css",
      "shared/themes/dark.js",
      "shared/themes/hax0r.js",
      "shared/themes/index.js",
      "shared/themes/lgbtq.js",
      "shared/themes/light.js",
      "shared/themes/runtime.js",
      "shared/themes/trans.js",
      "shared/components/copy-to-clipboard.js",
      "shared/components/json.js",
      "shared/components/lightbox.js",
      "shared/components/locale-picker.js",
      "shared/components/modal.js",
      "shared/components/page-link.js",
      "shared/components/pinked-ribbon.js",
      "shared/components/popout.js",
      "shared/components/raw-span.js",
      "shared/components/theme-picker.js",
      "shared/components/web-link.js",
      "shared/components/yaml.js",
      "shared/components/layouts/default.js",
      "shared/components/icons/box.js",
      "shared/components/icons/camera.js",
      "shared/components/icons/clear.js",
      "shared/components/icons/close.js",
      "shared/components/icons/cog.js",
      "shared/components/icons/community.js",
      "shared/components/icons/copy.js",
      "shared/components/icons/design.js",
      "shared/components/icons/discord.js",
      "shared/components/icons/docs.js",
      "shared/components/icons/down.js",
      "shared/components/icons/edit.js",
      "shared/components/icons/export.js",
      "shared/components/icons/facebook.js",
      "shared/components/icons/filter.js",
      "shared/components/icons/freesewing.js",
      "shared/components/icons/github.js",
      "shared/components/icons/google.js",
      "shared/components/icons/guide.js",
      "shared/components/icons/heart.js",
      "shared/components/icons/help.js",
      "shared/components/icons/i18n.js",
      "shared/components/icons/instagram.js",
      "shared/components/icons/left.js",
      "shared/components/icons/menu.js",
      "shared/components/icons/note.js",
      "shared/components/icons/options.js",
      "shared/components/icons/page-size.js",
      "shared/components/icons/page.js",
      "shared/components/icons/print.js",
      "shared/components/icons/reddit.js",
      "shared/components/icons/right.js",
      "shared/components/icons/rss.js",
      "shared/components/icons/search.js",
      "shared/components/icons/settings.js",
      "shared/components/icons/theme.js",
      "shared/components/icons/tip.js",
      "shared/components/icons/tutorial.js",
      "shared/components/icons/twitter.js",
      "shared/components/icons/user.js",
      "shared/components/icons/versions.js",
      "shared/components/icons/with-breasts.js",
      "shared/components/icons/without-breasts.js",
      "shared/components/icons/xray.js",
      "shared/components/logos/cc-by.js",
      "shared/components/logos/cc.js",
      "shared/components/logos/freesewing.js",
      "shared/components/logos/osi.js",
      "shared/components/navigation/aside.js",
      "shared/components/navigation/primary.js",
      "shared/components/picker.js",
      "shared/components/robot/index.js",
      "shared/components/robot/poses.js",
      "shared/components/wrappers/img.js",
      "shared/components/wrappers/mdx.js",
      "shared/components/wrappers/page.js",
      "shared/components/wrappers/toc.js",
      "shared/components/wrappers/workbench.js",
      "shared/components/mdx/index.js",
      "shared/components/workbench/default-settings.js",
      "shared/components/workbench/events.js",
      "shared/components/workbench/exporting/index.js",
      "shared/components/workbench/exporting/pdfExporter.js",
      "shared/components/workbench/json.js",
      "shared/components/workbench/preload.js",
      "shared/components/workbench/sample.js",
      "shared/components/workbench/yaml.js",
      "shared/components/workbench/inputs/design-option-count.js",
      "shared/components/workbench/inputs/design-option-list.js",
      "shared/components/workbench/inputs/design-option-pct-deg.js",
      "shared/components/workbench/inputs/measurement.js",
      "shared/components/workbench/measurements/index.js",
      "shared/components/workbench/measurements/non-human.js",
      "shared/components/workbench/draft/error.js",
      "shared/components/workbench/draft/index.js",
      "shared/components/workbench/draft/svg-wrapper.js",
      "shared/components/workbench/draft/utils.js",
      "shared/components/workbench/draft/circle/index.js",
      "shared/components/workbench/draft/defs/index.js",
      "shared/components/workbench/draft/part/index.js",
      "shared/components/workbench/draft/path/index.js",
      "shared/components/workbench/draft/point/index.js",
      "shared/components/workbench/draft/snippet/index.js",
      "shared/components/workbench/draft/svg/index.js",
      "shared/components/workbench/draft/text/index.js",
      "shared/components/workbench/draft/text-on-path/index.js",
      "shared/components/error/error-boundary.js",
      "shared/components/error/error-boundary.js",
      "shared/components/error/reset-buttons.js",
      "shared/components/error/view.js",
      "shared/components/workbench/layout/draft/index.js",
      "shared/components/workbench/layout/draft/part.js",
      "shared/components/workbench/layout/cut/index.js",
      "shared/components/workbench/layout/cut/settings.js",
      "shared/components/workbench/layout/print/index.js",
      "shared/components/workbench/layout/print/orientation-picker.js",
      "shared/components/workbench/layout/print/pagesize-picker.js",
      "shared/components/workbench/layout/print/plugin.js",
      "shared/components/workbench/layout/print/settings.js",
      "shared/components/workbench/menu/index.js",
      "shared/components/workbench/menu/view.js",
      "shared/components/workbench/menu/core-settings/core-setting-bool.js",
      "shared/components/workbench/menu/core-settings/core-setting-list.js",
      "shared/components/workbench/menu/core-settings/core-setting-mm.js",
      "shared/components/workbench/menu/core-settings/core-setting-nr.js",
      "shared/components/workbench/menu/core-settings/core-setting-only.js",
      "shared/components/workbench/menu/core-settings/core-setting-sa-bool.js",
      "shared/components/workbench/menu/core-settings/core-setting-sa-mm.js",
      "shared/components/workbench/menu/core-settings/index.js",
      "shared/components/workbench/menu/core-settings/setting.js",
      "shared/components/workbench/menu/design-options/index.js",
      "shared/components/workbench/menu/design-options/option-group.js",
      "shared/components/workbench/menu/design-options/option-input.js",
      "shared/components/workbench/menu/design-options/option-value.js",
      "shared/components/workbench/menu/design-options/option.js",
      "shared/components/workbench/menu/test-design-options/index.js",
      "shared/components/workbench/menu/test-design-options/option-group.js",
      "shared/components/workbench/menu/test-design-options/option-sub-group.js",
      "shared/components/workbench/menu/test-design-options/option.js",
      "shared/components/workbench/menu/xray/attributes.js",
      "shared/components/workbench/menu/xray/disable.js",
      "shared/components/workbench/menu/xray/index.js",
      "shared/components/workbench/menu/xray/list.js",
      "shared/components/workbench/menu/xray/log.js",
      "shared/components/workbench/menu/xray/path-ops.js",
      "shared/components/workbench/menu/xray/path.js",
      "shared/components/workbench/menu/xray/point.js",
      "shared/components/workbench/menu/xray/reset.js",
      "lab/components/footer.js",
      "lab/components/wrappers/layout.js",
      "lab/components/wrappers/page.js"
    ],
    config: [
      {
        from: 'measurements.mjs',
        to: 'shared/config/measurements.mjs'
      }
    ],
  },
  gitignore: `
# See https://help.github.com/ignore-files/ for more about ignoring files.

# dependencies
node_modules

# builds
dist
.next

# misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
`,
}
