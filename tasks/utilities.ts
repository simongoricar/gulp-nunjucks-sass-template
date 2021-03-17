import path from "path";

/**
 * Returns the file name (without extension) of the path passed to it.
 * @param stringPath: filepath
 * @return file name (without extension)
 */
function getFilepathFilenameNoExt(stringPath: string): string {
    const base = path.basename(stringPath);
    return base.substr(0, base.lastIndexOf("."));
}

// eslint-disable-next-line import/prefer-default-export
export { getFilepathFilenameNoExt };
