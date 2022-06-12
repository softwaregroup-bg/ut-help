const tap = require('tap');

tap.test('require', async(assert) => {
    const help = require('.');
    assert.ok(help, 'require');
    const sidebar = await help.presets[0][1].docs.sidebarItemsGenerator({
        defaultSidebarItemsGenerator: () => [{items: [{}]}]
    });
    assert.ok(sidebar, 'sidebar');
});
