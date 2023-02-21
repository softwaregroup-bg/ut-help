const fs = require('fs');
const path = require('path');
const recursiveReaddir = require('recursive-readdir');
const absoluteUrlRegExp = /(href|src)="(?!http[s]|ftp?:\/\/)\/a\/help\/([^"|#]+)"/g;
const isDirectory = dirPath => path.extname(dirPath) === '';

const replace = (content, filePath) =>
    content.replace(absoluteUrlRegExp, (_absoluteUrl, $1, $2) => {
        const currentDirPath = path.dirname(filePath);
        const relativeDirPath = currentDirPath === '.' ? '.' : path.relative(currentDirPath, '');

        let relativePath = path.join(relativeDirPath, $2);
        if (isDirectory(relativePath)) {
            relativePath = path.join(relativePath, 'index.html');
        }

        return `${$1}="${relativePath}"`;
    });

const extensions = ['.css', '.js', '.html', '.xml'];
const include = (filePath, stats) =>
    !(stats.isDirectory() || extensions.includes(path.extname(filePath)));

const relocate = async(buildDirectory = './dist/help') => {
    const filePaths = await recursiveReaddir(buildDirectory, [include]);
    filePaths.forEach(filePath =>
        fs.writeFileSync(
            filePath,
            replace(
                String(fs.readFileSync(filePath)),
                path.relative(buildDirectory, filePath)
            )
        )
    );
};

module.exports = async function relative(context, opts) {
    return {
        name: 'ut-help-relative',
        async postBuild(props) {
            await relocate(context.outDir);
        }
    };
};
